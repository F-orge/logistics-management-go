use crate::entities::_generated::reorder_points;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertReorderPoint {
    pub product_id: Uuid,
    pub warehouse_id: Uuid,
    pub threshold: i32,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateReorderPoint {
    pub product_id: Option<Uuid>,
    pub warehouse_id: Option<Uuid>,
    pub threshold: Option<i32>,
}

impl IntoActiveModel<reorder_points::ActiveModel> for InsertReorderPoint {
    fn into_active_model(self) -> reorder_points::ActiveModel {
        let mut active_model = reorder_points::ActiveModel::new();
        active_model.product_id = Set(self.product_id);
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.threshold = Set(self.threshold);
        active_model
    }
}

impl IntoActiveModel<reorder_points::ActiveModel> for UpdateReorderPoint {
    fn into_active_model(self) -> reorder_points::ActiveModel {
        let mut active_model = reorder_points::ActiveModel::new();
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.warehouse_id = self.warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.threshold = self.threshold.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl reorder_points::Model {

}
