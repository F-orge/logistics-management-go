use async_graphql::{Context, Object};
use sea_orm::entity::prelude::Decimal;
use sea_orm::prelude::Expr;
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_invoices::{
    Column as InvoiceColumn, Entity as InvoiceEntity, Model as InvoiceModel,
};
use crate::entities::_generated::{
    crm_companies::{Column as CompanyColumn, Entity as CompanyEntity},
    crm_contacts::{Column as ContactColumn, Entity as ContactEntity},
    crm_invoice_line_items::{
        Column as InvoiceLineItemColumn, Entity as InvoiceLineItemEntity,
        Model as InvoiceLineItemModel,
    },
};
use crate::entities::crm::invoices::{CreateInvoice, UpdateInvoice};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::crm::companies::CompanyNode;
use crate::graphql::backend::crm::contacts::ContactNode;
use crate::graphql::backend::crm::invoice_line_items::InvoiceLineItemNode;

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
    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<CompanyNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let company = CompanyEntity::find()
            .filter(Expr::col(CompanyColumn::Id).eq(self.model.company_id))
            .one(db)
            .await?;
        Ok(company.map(|model| CompanyNode { model }))
    }
    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<ContactNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let contact = ContactEntity::find()
            .filter(Expr::col(ContactColumn::Id).eq(self.model.contact_id))
            .one(db)
            .await?;
        Ok(contact.map(|model| ContactNode { model }))
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

    async fn line_items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<InvoiceLineItemNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let line_items = InvoiceLineItemEntity::find()
            .filter(Expr::col(InvoiceLineItemColumn::InvoiceId).eq(self.model.id))
            .all(db)
            .await?;
        Ok(line_items
            .into_iter()
            .map(|model| InvoiceLineItemNode { model })
            .collect())
    }
}

#[Object]
impl InvoicesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<InvoiceColumn>>>,
        filter_by: Option<Vec<FilterGeneric<InvoiceColumn>>>,
    ) -> async_graphql::Result<Vec<InvoiceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = InvoiceEntity::find();
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let (column, order) = sort.sort();
                query = query.order_by(column, order);
            }
        }
        if let Some(filters) = filter_by {
            for filter in filters {
                query = query.filter(filter.filter());
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
