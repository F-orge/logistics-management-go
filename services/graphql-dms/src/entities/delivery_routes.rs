use crate::entities::_generated::delivery_routes;
use crate::entities::_generated::sea_orm_active_enums::DeliveryRouteStatusEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertDeliveryRoute {
    pub driver_id: Uuid,
    pub route_date: sea_orm::prelude::Date,
    pub status: Option<DeliveryRouteStatusEnum>,
    pub optimized_route_data: Option<String>,
    pub total_distance_km: Option<f32>,
    pub estimated_duration_minutes: Option<i32>,
    pub actual_duration_minutes: Option<i32>,
    pub started_at: Option<sea_orm::prelude::DateTime>,
    pub completed_at: Option<sea_orm::prelude::DateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDeliveryRoute {
    pub driver_id: Option<Uuid>,
    pub route_date: Option<sea_orm::prelude::Date>,
    pub status: Option<Option<DeliveryRouteStatusEnum>>,
    pub optimized_route_data: Option<Option<String>>,
    pub total_distance_km: Option<Option<f32>>,
    pub estimated_duration_minutes: Option<Option<i32>>,
    pub actual_duration_minutes: Option<Option<i32>>,
    pub started_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub completed_at: Option<Option<sea_orm::prelude::DateTime>>,
}

impl IntoActiveModel<delivery_routes::ActiveModel> for InsertDeliveryRoute {
    fn into_active_model(self) -> delivery_routes::ActiveModel {
        let mut active_model = delivery_routes::ActiveModel::new();
        active_model.driver_id = Set(self.driver_id);
        active_model.route_date = Set(self.route_date);
        active_model.status = Set(self.status);
        active_model.optimized_route_data = Set(self.optimized_route_data);
        active_model.total_distance_km = Set(self.total_distance_km);
        active_model.estimated_duration_minutes = Set(self.estimated_duration_minutes);
        active_model.actual_duration_minutes = Set(self.actual_duration_minutes);
        active_model.started_at = Set(self.started_at);
        active_model.completed_at = Set(self.completed_at);
        active_model
    }
}

impl IntoActiveModel<delivery_routes::ActiveModel> for UpdateDeliveryRoute {
    fn into_active_model(self) -> delivery_routes::ActiveModel {
        let mut active_model = delivery_routes::ActiveModel::new();
        active_model.driver_id = self.driver_id.map(Set).unwrap_or(NotSet);
        active_model.route_date = self.route_date.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.optimized_route_data = self.optimized_route_data.map(Set).unwrap_or(NotSet);
        active_model.total_distance_km = self.total_distance_km.map(Set).unwrap_or(NotSet);
        active_model.estimated_duration_minutes =
            self.estimated_duration_minutes.map(Set).unwrap_or(NotSet);
        active_model.actual_duration_minutes =
            self.actual_duration_minutes.map(Set).unwrap_or(NotSet);
        active_model.started_at = self.started_at.map(Set).unwrap_or(NotSet);
        active_model.completed_at = self.completed_at.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl delivery_routes::Model {

}
