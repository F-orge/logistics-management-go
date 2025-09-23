use crate::entities::_generated::payments;
use crate::entities::_generated::sea_orm_active_enums::{PaymentMethodEnum, PaymentStatusEnum};
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
pub struct InsertPayment {
    pub invoice_id: Uuid,
    #[dummy(faker = "PositiveDecimal")]
    pub amount: Decimal,
    pub payment_method: PaymentMethodEnum,
    #[dummy(faker = "Word(EN)")]
    pub transaction_id: Option<String>,
    #[dummy(faker = "Word(EN)")]
    pub gateway_reference: Option<String>,
    pub status: Option<PaymentStatusEnum>,
    pub payment_date: Option<sea_orm::prelude::DateTime>,
    pub processed_at: Option<sea_orm::prelude::DateTime>,
    #[dummy(faker = "Word(EN)")]
    pub currency: Option<String>,
    #[dummy(faker = "PositiveDecimal")]
    pub exchange_rate: Option<Decimal>,
    #[dummy(faker = "PositiveDecimal")]
    pub fees: Option<Decimal>,
    #[dummy(faker = "PositiveDecimal")]
    pub net_amount: Option<Decimal>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub notes: Option<String>,
    pub processed_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePayment {
    pub invoice_id: Option<Uuid>,
    pub amount: Option<Decimal>,
    pub payment_method: Option<PaymentMethodEnum>,
    pub transaction_id: Option<Option<String>>,
    pub gateway_reference: Option<Option<String>>,
    pub status: Option<Option<PaymentStatusEnum>>,
    pub payment_date: Option<Option<sea_orm::prelude::DateTime>>,
    pub processed_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub currency: Option<Option<String>>,
    pub exchange_rate: Option<Option<Decimal>>,
    pub fees: Option<Option<Decimal>>,
    pub net_amount: Option<Option<Decimal>>,
    pub notes: Option<Option<String>>,
    pub processed_by_user_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<payments::ActiveModel> for InsertPayment {
    fn into_active_model(self) -> payments::ActiveModel {
        let mut active_model = payments::ActiveModel::new();
        active_model.invoice_id = Set(self.invoice_id);
        active_model.amount = Set(self.amount);
        active_model.payment_method = Set(self.payment_method);
        active_model.transaction_id = Set(self.transaction_id);
        active_model.gateway_reference = Set(self.gateway_reference);
        active_model.status = Set(self.status);
        active_model.payment_date = Set(self.payment_date);
        active_model.processed_at = Set(self.processed_at);
        active_model.currency = Set(self.currency);
        active_model.exchange_rate = Set(self.exchange_rate);
        active_model.fees = Set(self.fees);
        active_model.net_amount = Set(self.net_amount);
        active_model.notes = Set(self.notes);
        active_model.processed_by_user_id = Set(self.processed_by_user_id);
        active_model
    }
}

impl IntoActiveModel<payments::ActiveModel> for UpdatePayment {
    fn into_active_model(self) -> payments::ActiveModel {
        let mut active_model = payments::ActiveModel::new();
        active_model.invoice_id = self.invoice_id.map(Set).unwrap_or(NotSet);
        active_model.amount = self.amount.map(Set).unwrap_or(NotSet);
        active_model.payment_method = self.payment_method.map(Set).unwrap_or(NotSet);
        active_model.transaction_id = self.transaction_id.map(Set).unwrap_or(NotSet);
        active_model.gateway_reference = self.gateway_reference.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.payment_date = self.payment_date.map(Set).unwrap_or(NotSet);
        active_model.processed_at = self.processed_at.map(Set).unwrap_or(NotSet);
        active_model.currency = self.currency.map(Set).unwrap_or(NotSet);
        active_model.exchange_rate = self.exchange_rate.map(Set).unwrap_or(NotSet);
        active_model.fees = self.fees.map(Set).unwrap_or(NotSet);
        active_model.net_amount = self.net_amount.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model.processed_by_user_id = self.processed_by_user_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::invoices;
use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl payments::Model {
    async fn invoice(&self, ctx: &Context<'_>) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = invoices::Entity::find_by_id(self.invoice_id)
            .one(db)
            .await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Invoice not found")),
        }
    }
}
