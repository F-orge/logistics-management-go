use crate::entities::_generated::payments;
use crate::entities::_generated::sea_orm_active_enums::{PaymentMethodEnum, PaymentStatusEnum};
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertPayment {
    pub invoice_id: Uuid,
    pub amount: Decimal,
    pub payment_method: PaymentMethodEnum,
    pub transaction_id: Option<String>,
    pub gateway_reference: Option<String>,
    pub status: Option<PaymentStatusEnum>,
    pub payment_date: Option<sea_orm::prelude::DateTime>,
    pub processed_at: Option<sea_orm::prelude::DateTime>,
    pub currency: Option<String>,
    pub exchange_rate: Option<Decimal>,
    pub fees: Option<Decimal>,
    pub net_amount: Option<Decimal>,
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
