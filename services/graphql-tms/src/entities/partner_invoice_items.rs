use crate::entities::_generated::partner_invoice_items;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::decimal::PositiveDecimal;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertPartnerInvoiceItem {
    pub partner_invoice_id: Uuid,

    pub shipment_leg_id: Uuid,
    #[dummy(faker = "PositiveDecimal")]
    pub amount: Decimal,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePartnerInvoiceItem {
    pub partner_invoice_id: Option<Uuid>,
    pub shipment_leg_id: Option<Uuid>,
    pub amount: Option<Decimal>,
}

impl IntoActiveModel<partner_invoice_items::ActiveModel> for InsertPartnerInvoiceItem {
    fn into_active_model(self) -> partner_invoice_items::ActiveModel {
        let mut active_model = partner_invoice_items::ActiveModel::new();
        active_model.partner_invoice_id = Set(self.partner_invoice_id);
        active_model.shipment_leg_id = Set(self.shipment_leg_id);
        active_model.amount = Set(self.amount);
        active_model
    }
}

impl IntoActiveModel<partner_invoice_items::ActiveModel> for UpdatePartnerInvoiceItem {
    fn into_active_model(self) -> partner_invoice_items::ActiveModel {
        let mut active_model = partner_invoice_items::ActiveModel::new();
        active_model.partner_invoice_id = self.partner_invoice_id.map(Set).unwrap_or(NotSet);
        active_model.shipment_leg_id = self.shipment_leg_id.map(Set).unwrap_or(NotSet);
        active_model.amount = self.amount.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{partner_invoices, shipment_legs};
use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl partner_invoice_items::Model {
    async fn partner_invoice(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<partner_invoices::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = partner_invoices::Entity::find_by_id(self.partner_invoice_id)
            .one(db)
            .await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("PartnerInvoice not found")),
        }
    }

    async fn shipment_leg(&self, ctx: &Context<'_>) -> async_graphql::Result<shipment_legs::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = shipment_legs::Entity::find_by_id(self.shipment_leg_id)
            .one(db)
            .await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("ShipmentLeg not found")),
        }
    }
}
