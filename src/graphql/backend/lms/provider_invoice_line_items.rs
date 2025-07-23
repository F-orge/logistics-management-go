use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_invoice_line_items::{
    Column as ProviderInvoiceLineItemColumn, Entity as ProviderInvoiceLineItemEntity,
    Model as ProviderInvoiceLineItemModel,
};
use crate::entities::_generated::prelude::LmsProviderInvoices;
use crate::entities::lms::provider_invoice_line_items::{
    CreateProviderInvoiceLineItem, UpdateProviderInvoiceLineItem,
};
use crate::entities::{FilterOperator, SortOrder};
use crate::graphql::backend::lms::provider_invoices::ProviderInvoiceNode;

#[derive(Debug, Clone, InputObject)]
pub struct ProviderInvoiceLineItemsSort {
    pub column: ProviderInvoiceLineItemColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct ProviderInvoiceLineItemFilter {
    pub column: ProviderInvoiceLineItemColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct ProviderInvoiceLineItemNode {
    pub model: ProviderInvoiceLineItemModel,
}

#[Object]
impl ProviderInvoiceLineItemNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn provider_invoice(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<ProviderInvoiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let invoice = LmsProviderInvoices::find_by_id(self.model.provider_invoice_id)
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Provider invoice not found"))?;
        Ok(ProviderInvoiceNode { model: invoice })
    }
    async fn description(&self) -> &str {
        &self.model.description
    }
    async fn quantity(&self) -> i32 {
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
pub struct ProviderInvoiceLineItemsMutation;

#[Object]
impl ProviderInvoiceLineItemsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateProviderInvoiceLineItem,
    ) -> async_graphql::Result<ProviderInvoiceLineItemNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ProviderInvoiceLineItemNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateProviderInvoiceLineItem,
    ) -> async_graphql::Result<ProviderInvoiceLineItemNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(ProviderInvoiceLineItemNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        ProviderInvoiceLineItemEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete provider invoice line item: {}", e))?;
        Ok(format!(
            "Deleted provider invoice line item with ID: {}",
            id
        ))
    }
}
