use crate::entities::_generated::return_items;
use crate::entities::_generated::sea_orm_active_enums::ReturnItemConditionEnum;
use async_graphql::InputObject;
use chrono::{DateTime, Utc};
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertReturnItem {
    pub return_id: Uuid,
    pub product_id: Uuid,
    pub quantity_expected: i32,
    pub quantity_received: Option<i32>,
    pub quantity_variance: Option<i32>,
    pub condition: Option<ReturnItemConditionEnum>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateReturnItem {
    pub return_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub quantity_expected: Option<i32>,
    pub quantity_received: Option<Option<i32>>,
    pub quantity_variance: Option<Option<i32>>,
    pub condition: Option<Option<ReturnItemConditionEnum>>,
    pub created_at: Option<Option<DateTime<Utc>>>,
    pub updated_at: Option<Option<DateTime<Utc>>>,
}

impl IntoActiveModel<return_items::ActiveModel> for InsertReturnItem {
    fn into_active_model(self) -> return_items::ActiveModel {
        let mut active_model = return_items::ActiveModel::new();
        active_model.return_id = Set(self.return_id);
        active_model.product_id = Set(self.product_id);
        active_model.quantity_expected = Set(self.quantity_expected);
        active_model.quantity_received = Set(self.quantity_received);
        active_model.quantity_variance = Set(self.quantity_variance);
        active_model.condition = Set(self.condition);
        active_model
    }
}

impl IntoActiveModel<return_items::ActiveModel> for UpdateReturnItem {
    fn into_active_model(self) -> return_items::ActiveModel {
        let mut active_model = return_items::ActiveModel::new();
        active_model.return_id = self.return_id.map(Set).unwrap_or(NotSet);
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.quantity_expected = self.quantity_expected.map(Set).unwrap_or(NotSet);
        active_model.quantity_received = self.quantity_received.map(Set).unwrap_or(NotSet);
        active_model.quantity_variance = self.quantity_variance.map(Set).unwrap_or(NotSet);
        active_model.condition = self.condition.map(Set).unwrap_or(NotSet);
        active_model
    }
}
