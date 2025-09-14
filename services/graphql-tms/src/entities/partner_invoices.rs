use crate::entities::_generated::{partner_invoices, sea_orm_active_enums::PartnerInvoiceStatusEnum};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{ActiveValue::{NotSet, Set}, IntoActiveModel};
use uuid::Uuid;
use rust_decimal::Decimal;

#[derive(Debug, Clone, InputObject)]
pub struct InsertPartnerInvoice {
    pub carrier_id: Uuid,
    pub invoice_number: String,
    pub invoice_date: Date,
    pub total_amount: Decimal,
    pub status: Option<PartnerInvoiceStatusEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePartnerInvoice {
    pub carrier_id: Option<Uuid>,
    pub invoice_number: Option<String>,
    pub invoice_date: Option<Date>,
    pub total_amount: Option<Decimal>,
    pub status: Option<Option<PartnerInvoiceStatusEnum>>,
}

impl IntoActiveModel<partner_invoices::ActiveModel> for InsertPartnerInvoice {
    fn into_active_model(self) -> partner_invoices::ActiveModel {
        let mut active_model = partner_invoices::ActiveModel::new();
        active_model.carrier_id = Set(self.carrier_id);
        active_model.invoice_number = Set(self.invoice_number);
        active_model.invoice_date = Set(self.invoice_date);
        active_model.total_amount = Set(self.total_amount);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<partner_invoices::ActiveModel> for UpdatePartnerInvoice {
    fn into_active_model(self) -> partner_invoices::ActiveModel {
        let mut active_model = partner_invoices::ActiveModel::new();
        active_model.carrier_id = self.carrier_id.map(Set).unwrap_or(NotSet);
        active_model.invoice_number = self.invoice_number.map(Set).unwrap_or(NotSet);
        active_model.invoice_date = self.invoice_date.map(Set).unwrap_or(NotSet);
        active_model.total_amount = self.total_amount.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}
