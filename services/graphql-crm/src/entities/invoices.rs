use async_graphql::InputObject;
use sea_orm::{ActiveModelBehavior, ActiveValue::{NotSet, Set}, IntoActiveModel};
use uuid::Uuid;
use rust_decimal::Decimal;
use sea_orm::prelude::{DateTimeWithTimeZone, Date};
use crate::entities::_generated::invoices;
use crate::entities::_generated::sea_orm_active_enums::{InvoiceStatus, PaymentMethod};

#[derive(Debug, Clone, InputObject)]
pub struct InsertInvoice {
    pub opportunity_id: Option<Uuid>,
    pub status: Option<InvoiceStatus>,
    pub total: Option<Decimal>,
    pub issue_date: Option<Date>,
    pub due_date: Option<Date>,
    pub sent_at: Option<DateTimeWithTimeZone>,
    pub paid_at: Option<DateTimeWithTimeZone>,
    pub payment_method: Option<PaymentMethod>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInvoice {
    pub opportunity_id: Option<Option<Uuid>>,
    pub status: Option<Option<InvoiceStatus>>,
    pub total: Option<Option<Decimal>>,
    pub issue_date: Option<Option<Date>>,
    pub due_date: Option<Option<Date>>,
    pub sent_at: Option<Option<DateTimeWithTimeZone>>,
    pub paid_at: Option<Option<DateTimeWithTimeZone>>,
    pub payment_method: Option<Option<PaymentMethod>>,
}

impl IntoActiveModel<invoices::ActiveModel> for InsertInvoice {
    fn into_active_model(self) -> invoices::ActiveModel {
        let mut active_model = invoices::ActiveModel::new();
    active_model.opportunity_id = Set(self.opportunity_id);
    active_model.status = Set(self.status);
    active_model.total = Set(self.total);
    active_model.issue_date = Set(self.issue_date);
    active_model.due_date = Set(self.due_date);
    active_model.sent_at = Set(self.sent_at);
    active_model.paid_at = Set(self.paid_at);
    active_model.payment_method = Set(self.payment_method);
        active_model
    }
}

impl IntoActiveModel<invoices::ActiveModel> for UpdateInvoice {
    fn into_active_model(self) -> invoices::ActiveModel {
        let mut active_model = invoices::ActiveModel::new();
    active_model.opportunity_id = self.opportunity_id.map(Set).unwrap_or(NotSet);
    active_model.status = self.status.map(Set).unwrap_or(NotSet);
    active_model.total = self.total.map(Set).unwrap_or(NotSet);
    active_model.issue_date = self.issue_date.map(Set).unwrap_or(NotSet);
    active_model.due_date = self.due_date.map(Set).unwrap_or(NotSet);
    active_model.sent_at = self.sent_at.map(Set).unwrap_or(NotSet);
    active_model.paid_at = self.paid_at.map(Set).unwrap_or(NotSet);
    active_model.payment_method = self.payment_method.map(Set).unwrap_or(NotSet);
        active_model
    }
}
