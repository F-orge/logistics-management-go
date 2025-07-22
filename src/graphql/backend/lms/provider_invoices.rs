use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_invoices::{
    Column as ProviderInvoiceColumn, Entity as ProviderInvoiceEntity, Model as ProviderInvoiceModel,
};
use crate::entities::lms::provider_invoices::{CreateProviderInvoice, UpdateProviderInvoice};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct ProviderInvoicesSort {
    pub column: ProviderInvoiceColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct ProviderInvoiceFilter {
    pub column: ProviderInvoiceColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct ProviderInvoiceNode {
    pub model: ProviderInvoiceModel,
}

#[Object]
impl ProviderInvoiceNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn provider_id(&self) -> Uuid {
        self.model.provider_id
    }
    async fn invoice_number(&self) -> &str {
        &self.model.invoice_number
    }
    async fn invoice_date(&self) -> chrono::NaiveDate {
        self.model.invoice_date
    }
    async fn due_date(&self) -> chrono::NaiveDate {
        self.model.due_date
    }
    async fn total_amount(&self) -> Option<sea_orm::entity::prelude::Decimal> {
        self.model.total_amount
    }
    async fn status(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::LmsProviderInvoiceStatus {
        &self.model.status
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct ProviderInvoicesQuery;

#[Object]
impl ProviderInvoicesQuery {
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Option<ProviderInvoiceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = ProviderInvoiceEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| ProviderInvoiceNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<ProviderInvoicesSort>>,
        filter_by: Option<Vec<ProviderInvoiceFilter>>,
    ) -> async_graphql::Result<Vec<ProviderInvoiceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderInvoiceEntity::find();

        // Sorting
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let order = match sort.order {
                    SortOrder::Asc => sea_orm::Order::Asc,
                    SortOrder::Desc => sea_orm::Order::Desc,
                };
                query = query.order_by(sort.column, order);
            }
        }

        // Filtering
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

        let items = query.paginate(db, limit).fetch_page(page).await?;
        Ok(items
            .into_iter()
            .map(|m| ProviderInvoiceNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct ProviderInvoicesMutation;

#[Object]
impl ProviderInvoicesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateProviderInvoice,
    ) -> async_graphql::Result<ProviderInvoiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ProviderInvoiceNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateProviderInvoice,
    ) -> async_graphql::Result<ProviderInvoiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(ProviderInvoiceNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        ProviderInvoiceEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete provider invoice: {}", e))?;
        Ok(format!("Deleted provider invoice with ID: {}", id))
    }
}
