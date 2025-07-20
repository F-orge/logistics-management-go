use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

use crate::entities::_generated::crm_invoices::*;
use crate::entities::_generated::sea_orm_active_enums::CrmInvoiceStatus;

#[derive(Debug, Clone, InputObject)]
pub struct CreateInvoice {
    pub invoice_number: String,
    pub company_id: Option<Uuid>,
    pub contact_id: Option<Uuid>,
    pub invoice_date: Date,
    pub due_date: Date,
    pub subtotal: Decimal,
    pub tax_amount: Decimal,
    pub total_amount: Decimal,
    pub currency: String,
    pub status: CrmInvoiceStatus,
    pub payment_terms: Option<String>,
}

impl IntoActiveModel<ActiveModel> for CreateInvoice {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.invoice_number = Set(self.invoice_number);
        active_model.company_id = Set(self.company_id);
        active_model.contact_id = Set(self.contact_id);
        active_model.invoice_date = Set(self.invoice_date);
        active_model.due_date = Set(self.due_date);
        active_model.subtotal = Set(self.subtotal);
        active_model.tax_amount = Set(self.tax_amount);
        active_model.total_amount = Set(self.total_amount);
        active_model.currency = Set(self.currency);
        active_model.status = Set(self.status);
        active_model.payment_terms = Set(self.payment_terms);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInvoice {
    pub id: Uuid,
    pub invoice_number: Option<String>,
    pub company_id: Option<Option<Uuid>>,
    pub contact_id: Option<Option<Uuid>>,
    pub invoice_date: Option<Date>,
    pub due_date: Option<Date>,
    pub subtotal: Option<Decimal>,
    pub tax_amount: Option<Decimal>,
    pub total_amount: Option<Decimal>,
    pub currency: Option<String>,
    pub status: Option<CrmInvoiceStatus>,
    pub payment_terms: Option<Option<String>>,
}

impl IntoActiveModel<ActiveModel> for UpdateInvoice {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());

        if let Some(invoice_number) = self.invoice_number {
            active_model.invoice_number = Set(invoice_number);
        }

        if let Some(company_id) = self.company_id {
            active_model.company_id = Set(company_id);
        }

        if let Some(contact_id) = self.contact_id {
            active_model.contact_id = Set(contact_id);
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

        if let Some(total_amount) = self.total_amount {
            active_model.total_amount = Set(total_amount);
        }

        if let Some(currency) = self.currency {
            active_model.currency = Set(currency);
        }

        if let Some(status) = self.status {
            active_model.status = Set(status);
        }

        if let Some(payment_terms) = self.payment_terms {
            active_model.payment_terms = Set(payment_terms);
        }

        active_model
    }
}
