use crate::entities::_generated::invoices;
use crate::entities::_generated::sea_orm_active_enums::InvoiceStatusEnum;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertInvoice {
    pub client_id: Uuid,
    pub quote_id: Option<Uuid>,
    pub invoice_number: String,
    pub status: Option<InvoiceStatusEnum>,
    pub issue_date: sea_orm::prelude::Date,
    pub due_date: sea_orm::prelude::Date,
    pub total_amount: Decimal,
    pub amount_paid: Option<Decimal>,
    pub amount_outstanding: Option<Decimal>,
    pub currency: Option<String>,
    pub tax_amount: Option<Decimal>,
    pub discount_amount: Option<Decimal>,
    pub subtotal: Option<Decimal>,
    pub payment_terms: Option<String>,
    pub notes: Option<String>,
    pub sent_at: Option<sea_orm::prelude::DateTime>,
    pub paid_at: Option<sea_orm::prelude::DateTime>,
    pub created_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInvoice {
    pub client_id: Option<Uuid>,
    pub quote_id: Option<Option<Uuid>>,
    pub invoice_number: Option<String>,
    pub status: Option<Option<InvoiceStatusEnum>>,
    pub issue_date: Option<sea_orm::prelude::Date>,
    pub due_date: Option<sea_orm::prelude::Date>,
    pub total_amount: Option<Decimal>,
    pub amount_paid: Option<Option<Decimal>>,
    pub amount_outstanding: Option<Option<Decimal>>,
    pub currency: Option<Option<String>>,
    pub tax_amount: Option<Option<Decimal>>,
    pub discount_amount: Option<Option<Decimal>>,
    pub subtotal: Option<Option<Decimal>>,
    pub payment_terms: Option<Option<String>>,
    pub notes: Option<Option<String>>,
    pub sent_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub paid_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub created_by_user_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<invoices::ActiveModel> for InsertInvoice {
    fn into_active_model(self) -> invoices::ActiveModel {
        let mut active_model = invoices::ActiveModel::new();
        active_model.client_id = Set(self.client_id);
        active_model.quote_id = Set(self.quote_id);
        active_model.invoice_number = Set(self.invoice_number);
        active_model.status = Set(self.status);
        active_model.issue_date = Set(self.issue_date);
        active_model.due_date = Set(self.due_date);
        active_model.total_amount = Set(self.total_amount);
        active_model.amount_paid = Set(self.amount_paid);
        active_model.amount_outstanding = Set(self.amount_outstanding);
        active_model.currency = Set(self.currency);
        active_model.tax_amount = Set(self.tax_amount);
        active_model.discount_amount = Set(self.discount_amount);
        active_model.subtotal = Set(self.subtotal);
        active_model.payment_terms = Set(self.payment_terms);
        active_model.notes = Set(self.notes);
        active_model.sent_at = Set(self.sent_at);
        active_model.paid_at = Set(self.paid_at);
        active_model.created_by_user_id = Set(self.created_by_user_id);
        active_model
    }
}

impl IntoActiveModel<invoices::ActiveModel> for UpdateInvoice {
    fn into_active_model(self) -> invoices::ActiveModel {
        let mut active_model = invoices::ActiveModel::new();
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.quote_id = self.quote_id.map(Set).unwrap_or(NotSet);
        active_model.invoice_number = self.invoice_number.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.issue_date = self.issue_date.map(Set).unwrap_or(NotSet);
        active_model.due_date = self.due_date.map(Set).unwrap_or(NotSet);
        active_model.total_amount = self.total_amount.map(Set).unwrap_or(NotSet);
        active_model.amount_paid = self.amount_paid.map(Set).unwrap_or(NotSet);
        active_model.amount_outstanding = self.amount_outstanding.map(Set).unwrap_or(NotSet);
        active_model.currency = self.currency.map(Set).unwrap_or(NotSet);
        active_model.tax_amount = self.tax_amount.map(Set).unwrap_or(NotSet);
        active_model.discount_amount = self.discount_amount.map(Set).unwrap_or(NotSet);
        active_model.subtotal = self.subtotal.map(Set).unwrap_or(NotSet);
        active_model.payment_terms = self.payment_terms.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model.sent_at = self.sent_at.map(Set).unwrap_or(NotSet);
        active_model.paid_at = self.paid_at.map(Set).unwrap_or(NotSet);
        active_model.created_by_user_id = self.created_by_user_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl invoices::Model {

}
