use crate::entities::_generated::partner_invoice_items;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertPartnerInvoiceItem {
    pub partner_invoice_id: Uuid,
    pub shipment_leg_id: Uuid,
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

use async_graphql::ComplexObject;

#[ComplexObject]
impl partner_invoice_items::Model {

}
