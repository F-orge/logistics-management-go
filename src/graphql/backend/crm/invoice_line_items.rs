use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder, entity::prelude::Decimal,
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

pub struct InvoiceLineItemNode {
    pub model: InvoiceLineItemModel,
}

#[Object]
impl InvoiceLineItemNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn invoice_id(&self) -> Uuid {
        self.model.invoice_id
    }
    async fn shipment_id(&self) -> Option<Uuid> {
        self.model.shipment_id
    }
    async fn description(&self) -> &str {
        &self.model.description
    }
    async fn quantity(&self) -> Decimal {
        self.model.quantity
    }
    async fn unit_price(&self) -> Decimal {
        self.model.unit_price
    }
    async fn line_total(&self) -> Option<Decimal> {
        self.model.line_total
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
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
    ) -> async_graphql::Result<InvoiceLineItemNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(InvoiceLineItemNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateInvoiceLineItem,
    ) -> async_graphql::Result<InvoiceLineItemNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(InvoiceLineItemNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        InvoiceLineItemEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete invoice line item: {}", e))?;
        Ok(format!("Deleted invoice line item with ID: {}", id))
    }
}
