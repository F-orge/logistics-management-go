use crate::entities::_generated::{
    expenses,
    sea_orm_active_enums::{CurrencyEnum, ExpenseStatusEnum, ExpenseTypeEnum},
};
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertExpense {
    pub trip_id: Option<Uuid>,
    pub driver_id: Option<Uuid>,
    pub r#type: Option<ExpenseTypeEnum>,
    pub amount: Decimal,
    pub currency: Option<CurrencyEnum>,
    pub receipt_url: Option<String>,
    pub fuel_quantity: Option<f32>,
    pub odometer_reading: Option<i32>,
    pub status: Option<ExpenseStatusEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateExpense {
    pub trip_id: Option<Option<Uuid>>,
    pub driver_id: Option<Option<Uuid>>,
    pub r#type: Option<Option<ExpenseTypeEnum>>,
    pub amount: Option<Decimal>,
    pub currency: Option<Option<CurrencyEnum>>,
    pub receipt_url: Option<Option<String>>,
    pub fuel_quantity: Option<Option<f32>>,
    pub odometer_reading: Option<Option<i32>>,
    pub status: Option<Option<ExpenseStatusEnum>>,
}

impl IntoActiveModel<expenses::ActiveModel> for InsertExpense {
    fn into_active_model(self) -> expenses::ActiveModel {
        let mut active_model = expenses::ActiveModel::new();
        active_model.trip_id = Set(self.trip_id);
        active_model.driver_id = Set(self.driver_id);
        active_model.r#type = Set(self.r#type);
        active_model.amount = Set(self.amount);
        active_model.currency = Set(self.currency);
        active_model.receipt_url = Set(self.receipt_url);
        active_model.fuel_quantity = Set(self.fuel_quantity);
        active_model.odometer_reading = Set(self.odometer_reading);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<expenses::ActiveModel> for UpdateExpense {
    fn into_active_model(self) -> expenses::ActiveModel {
        let mut active_model = expenses::ActiveModel::new();
        active_model.trip_id = self.trip_id.map(Set).unwrap_or(NotSet);
        active_model.driver_id = self.driver_id.map(Set).unwrap_or(NotSet);
        active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
        active_model.amount = self.amount.map(Set).unwrap_or(NotSet);
        active_model.currency = self.currency.map(Set).unwrap_or(NotSet);
        active_model.receipt_url = self.receipt_url.map(Set).unwrap_or(NotSet);
        active_model.fuel_quantity = self.fuel_quantity.map(Set).unwrap_or(NotSet);
        active_model.odometer_reading = self.odometer_reading.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}
