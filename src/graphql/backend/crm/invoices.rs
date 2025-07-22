use async_graphql::{Context, InputObject, Object};
use sea_orm::entity::prelude::Decimal;
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

pub struct InvoiceNode {
    pub model: InvoiceModel,
}

#[Object]
impl InvoiceNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn invoice_number(&self) -> &str {
        &self.model.invoice_number
    }
    async fn company_id(&self) -> Option<Uuid> {
        self.model.company_id
    }
    async fn contact_id(&self) -> Option<Uuid> {
        self.model.contact_id
    }
    async fn invoice_date(&self) -> chrono::NaiveDate {
        self.model.invoice_date
    }
    async fn due_date(&self) -> chrono::NaiveDate {
        self.model.due_date
    }
    async fn subtotal(&self) -> &Decimal {
        &self.model.subtotal
    }
    async fn tax_amount(&self) -> &Decimal {
        &self.model.tax_amount
    }
    async fn total_amount(&self) -> &Decimal {
        &self.model.total_amount
    }
    async fn currency(&self) -> &str {
        &self.model.currency
    }
    async fn status(&self) -> &crate::entities::_generated::sea_orm_active_enums::CrmInvoiceStatus {
        &self.model.status
    }
    async fn payment_terms(&self) -> Option<&str> {
        self.model.payment_terms.as_deref()
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[Object]
impl InvoicesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<InvoicesSort>>,
        filter_by: Option<Vec<InvoiceFilter>>,
    ) -> async_graphql::Result<Vec<InvoiceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
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
            .await?;
        Ok(invoices
            .into_iter()
            .map(|model| InvoiceNode { model })
            .collect())
    }
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<InvoiceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let invoice = InvoiceEntity::find_by_id(id).one(db).await?;
        Ok(invoice.map(|model| InvoiceNode { model }))
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
    ) -> async_graphql::Result<InvoiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let invoice = payload.into_active_model();
        let invoice = invoice.insert(db).await?;
        Ok(InvoiceNode { model: invoice })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateInvoice,
    ) -> async_graphql::Result<InvoiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_invoice = active_model.update(db).await?;
        Ok(InvoiceNode {
            model: updated_invoice,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        InvoiceEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete invoice: {}", e))?;
        Ok(format!("Deleted invoice with ID: {}", id))
    }
}
