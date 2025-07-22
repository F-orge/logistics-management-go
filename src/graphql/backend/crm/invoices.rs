use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_invoices::{
    Column as InvoiceColumn, Entity as InvoiceEntity, Model as InvoiceModel,
};
use crate::entities::crm::invoices::{CreateInvoice, UpdateInvoice};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct InvoicesSort {
    pub column: InvoiceColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct InvoiceFilter {
    pub column: InvoiceColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct InvoicesQuery;

#[Object]
impl InvoicesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<InvoicesSort>>,
        filter_by: Option<Vec<InvoiceFilter>>,
    ) -> Vec<InvoiceModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let mut query = InvoiceEntity::find();
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
        let invoices = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await
            .unwrap_or_default();
        invoices
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<InvoiceModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let invoice = InvoiceEntity::find_by_id(id).one(db).await.unwrap_or(None);
        invoice
    }
}

#[derive(Default)]
pub struct InvoicesMutation;

#[Object]
impl InvoicesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateInvoice,
    ) -> anyhow::Result<InvoiceModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let invoice = payload.into_active_model();
        let invoice = invoice.insert(db).await?;
        Ok(invoice)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateInvoice,
    ) -> anyhow::Result<InvoiceModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_invoice = active_model.update(db).await?;
        Ok(updated_invoice)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        InvoiceEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete invoice: {}", e))?;
        Ok(format!("Deleted invoice with ID: {}", id))
    }
}
