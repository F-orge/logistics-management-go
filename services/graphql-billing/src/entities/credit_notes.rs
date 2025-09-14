use crate::entities::_generated::credit_notes;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertCreditNote {
    pub invoice_id: Uuid,
    pub dispute_id: Option<Uuid>,
    pub credit_note_number: String,
    pub amount: Decimal,
    pub reason: String,
    pub issue_date: sea_orm::prelude::Date,
    pub applied_at: Option<sea_orm::prelude::DateTime>,
    pub currency: Option<String>,
    pub notes: Option<String>,
    pub created_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCreditNote {
    pub invoice_id: Option<Uuid>,
    pub dispute_id: Option<Option<Uuid>>,
    pub credit_note_number: Option<String>,
    pub amount: Option<Decimal>,
    pub reason: Option<String>,
    pub issue_date: Option<sea_orm::prelude::Date>,
    pub applied_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub currency: Option<Option<String>>,
    pub notes: Option<Option<String>>,
    pub created_by_user_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<credit_notes::ActiveModel> for InsertCreditNote {
    fn into_active_model(self) -> credit_notes::ActiveModel {
        let mut active_model = credit_notes::ActiveModel::new();
        active_model.invoice_id = Set(self.invoice_id);
        active_model.dispute_id = Set(self.dispute_id);
        active_model.credit_note_number = Set(self.credit_note_number);
        active_model.amount = Set(self.amount);
        active_model.reason = Set(self.reason);
        active_model.issue_date = Set(self.issue_date);
        active_model.applied_at = Set(self.applied_at);
        active_model.currency = Set(self.currency);
        active_model.notes = Set(self.notes);
        active_model.created_by_user_id = Set(self.created_by_user_id);
        active_model
    }
}

impl IntoActiveModel<credit_notes::ActiveModel> for UpdateCreditNote {
    fn into_active_model(self) -> credit_notes::ActiveModel {
        let mut active_model = credit_notes::ActiveModel::new();
        active_model.invoice_id = self.invoice_id.map(Set).unwrap_or(NotSet);
        active_model.dispute_id = self.dispute_id.map(Set).unwrap_or(NotSet);
        active_model.credit_note_number = self.credit_note_number.map(Set).unwrap_or(NotSet);
        active_model.amount = self.amount.map(Set).unwrap_or(NotSet);
        active_model.reason = self.reason.map(Set).unwrap_or(NotSet);
        active_model.issue_date = self.issue_date.map(Set).unwrap_or(NotSet);
        active_model.applied_at = self.applied_at.map(Set).unwrap_or(NotSet);
        active_model.currency = self.currency.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model.created_by_user_id = self.created_by_user_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}
