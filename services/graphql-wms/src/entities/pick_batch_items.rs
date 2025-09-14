use crate::entities::_generated::pick_batch_items;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertPickBatchItem {
    pub pick_batch_id: Uuid,
    pub sales_order_id: Uuid,
    pub order_priority: Option<i32>,
    pub estimated_pick_time: Option<i32>,
    pub actual_pick_time: Option<i32>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePickBatchItem {
    pub pick_batch_id: Option<Uuid>,
    pub sales_order_id: Option<Uuid>,
    pub order_priority: Option<Option<i32>>,
    pub estimated_pick_time: Option<Option<i32>>,
    pub actual_pick_time: Option<Option<i32>>,
}

impl IntoActiveModel<pick_batch_items::ActiveModel> for InsertPickBatchItem {
    fn into_active_model(self) -> pick_batch_items::ActiveModel {
        let mut active_model = pick_batch_items::ActiveModel::new();
        active_model.pick_batch_id = Set(self.pick_batch_id);
        active_model.sales_order_id = Set(self.sales_order_id);
        active_model.order_priority = Set(self.order_priority);
        active_model.estimated_pick_time = Set(self.estimated_pick_time);
        active_model.actual_pick_time = Set(self.actual_pick_time);
        active_model
    }
}

impl IntoActiveModel<pick_batch_items::ActiveModel> for UpdatePickBatchItem {
    fn into_active_model(self) -> pick_batch_items::ActiveModel {
        let mut active_model = pick_batch_items::ActiveModel::new();
        active_model.pick_batch_id = self.pick_batch_id.map(Set).unwrap_or(NotSet);
        active_model.sales_order_id = self.sales_order_id.map(Set).unwrap_or(NotSet);
        active_model.order_priority = self.order_priority.map(Set).unwrap_or(NotSet);
        active_model.estimated_pick_time = self.estimated_pick_time.map(Set).unwrap_or(NotSet);
        active_model.actual_pick_time = self.actual_pick_time.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl pick_batch_items::Model {

}
