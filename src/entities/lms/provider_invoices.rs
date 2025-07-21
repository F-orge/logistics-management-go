// Create/Update structs for lms_provider_invoices

use crate::entities::_generated::lms_provider_invoices::*;
use crate::entities::_generated::sea_orm_active_enums::LmsProviderInvoiceStatus;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateProviderInvoice {
    pub provider_id: Uuid,
    pub invoice_number: String,
    pub invoice_date: Date,
    pub due_date: Date,
    pub subtotal: Decimal,
    pub tax_amount: Option<Decimal>,
    pub currency: String,
    pub status: LmsProviderInvoiceStatus,
    pub payment_date: Option<Date>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateProviderInvoice {
    pub id: Uuid,
    pub provider_id: Option<Uuid>,
    pub invoice_number: Option<String>,
    pub invoice_date: Option<Date>,
    pub due_date: Option<Date>,
    pub subtotal: Option<Decimal>,
    pub tax_amount: Option<Option<Decimal>>,
    pub currency: Option<String>,
    pub status: Option<LmsProviderInvoiceStatus>,
    pub payment_date: Option<Option<Date>>,
}

impl IntoActiveModel<ActiveModel> for CreateProviderInvoice {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.provider_id = Set(self.provider_id);
        active_model.invoice_number = Set(self.invoice_number);
        active_model.invoice_date = Set(self.invoice_date);
        active_model.due_date = Set(self.due_date);
        active_model.subtotal = Set(self.subtotal);
        active_model.tax_amount = Set(self.tax_amount);
        active_model.currency = Set(self.currency);
        active_model.status = Set(self.status);
        active_model.payment_date = Set(self.payment_date);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateProviderInvoice {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(provider_id) = self.provider_id {
            active_model.provider_id = Set(provider_id);
        }
        if let Some(invoice_number) = self.invoice_number {
            active_model.invoice_number = Set(invoice_number);
        }
        if let Some(invoice_date) = self.invoice_date {
            active_model.invoice_date = Set(invoice_date);
        }
        if let Some(due_date) = self.due_date {
            active_model.due_date = Set(due_date);
        }
        if let Some(subtotal) = self.subtotal {
            active_model.subtotal = Set(subtotal);
        }
        if let Some(tax_amount) = self.tax_amount {
            active_model.tax_amount = Set(tax_amount);
        }

        if let Some(currency) = self.currency {
            active_model.currency = Set(currency);
        }
        if let Some(status) = self.status {
            active_model.status = Set(status);
        }
        if let Some(payment_date) = self.payment_date {
            active_model.payment_date = Set(payment_date);
        }
        active_model
    }
}
