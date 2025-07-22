use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_invoice_line_items::{
    Column as InvoiceLineItemColumn, Entity as InvoiceLineItemEntity, Model as InvoiceLineItemModel,
};
use crate::entities::crm::invoice_line_items::{CreateInvoiceLineItem, UpdateInvoiceLineItem};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct InvoiceLineItemsSort {
    pub column: InvoiceLineItemColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct InvoiceLineItemFilter {
    pub column: InvoiceLineItemColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct InvoiceLineItemsQuery;

#[Object]
impl InvoiceLineItemsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<InvoiceLineItemsSort>>,
        filter_by: Option<Vec<InvoiceLineItemFilter>>,
    ) -> Vec<InvoiceLineItemModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let mut query = InvoiceLineItemEntity::find();
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let order = match sort.order {
                    SortOrder::Asc => sea_orm::Order::Asc,
                    SortOrder::Desc => sea_orm::Order::Desc,
                };
                query = query.order_by(sort.column, order);
            }
        }
        if let Some(filters) = filter_by {
            for filter in filters {
                query = match filter.operator {
                    FilterOperator::Equals => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .eq(filter.value.clone()),
                    ),
                    FilterOperator::Contains => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("%{}%", filter.value)),
                    ),
                    FilterOperator::StartsWith => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("{}%", filter.value)),
                    ),
                    FilterOperator::EndsWith => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("%{}", filter.value)),
                    ),
                };
            }
        }
        let items = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await
            .unwrap_or_default();
        items
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<InvoiceLineItemModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let item = InvoiceLineItemEntity::find_by_id(id)
            .one(db)
            .await
            .unwrap_or(None);
        item
    }
}

#[derive(Default)]
pub struct InvoiceLineItemsMutation;

#[Object]
impl InvoiceLineItemsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateInvoiceLineItem,
    ) -> anyhow::Result<InvoiceLineItemModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(item)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateInvoiceLineItem,
    ) -> anyhow::Result<InvoiceLineItemModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(updated_item)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        InvoiceLineItemEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete invoice line item: {}", e))?;
        Ok(format!("Deleted invoice line item with ID: {}", id))
    }
}
