use crate::entities::_generated::credit_notes;
use async_graphql::InputObject;
use rust_decimal::Decimal;
// --- fake imports ---
use fake::Dummy;
use fake::locales::EN;
use fake::decimal::PositiveDecimal;
use fake::faker::lorem::raw::{Sentence, Word};
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertCreditNote {
    pub invoice_id: Uuid,
    pub dispute_id: Option<Uuid>,
    #[dummy(faker = "Word(EN)")]
    pub credit_note_number: String,
    #[dummy(faker = "PositiveDecimal")]
    pub amount: Decimal,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub reason: String,
    pub issue_date: sea_orm::prelude::Date,
    pub applied_at: Option<sea_orm::prelude::DateTime>,
    #[dummy(faker = "Word(EN)")]
    pub currency: Option<String>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
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

use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};
use crate::entities::_generated::{invoices, disputes};

#[ComplexObject]
impl credit_notes::Model {
    async fn invoice(&self, ctx: &Context<'_>) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = invoices::Entity::find_by_id(self.invoice_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Invoice not found")),
        }
    }

    async fn dispute(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<disputes::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(did) = self.dispute_id {
            let res = disputes::Entity::find_by_id(did).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }
}
