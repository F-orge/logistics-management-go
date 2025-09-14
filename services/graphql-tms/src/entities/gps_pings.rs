use crate::entities::_generated::gps_pings;
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertGpsPing {
    pub vehicle_id: Uuid,
    pub latitude: f32,
    pub longitude: f32,
    pub timestamp: DateTime,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateGpsPing {
    pub vehicle_id: Option<Uuid>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub timestamp: Option<DateTime>,
}

impl IntoActiveModel<gps_pings::ActiveModel> for InsertGpsPing {
    fn into_active_model(self) -> gps_pings::ActiveModel {
        let mut active_model = gps_pings::ActiveModel::new();
        active_model.vehicle_id = Set(self.vehicle_id);
        active_model.latitude = Set(self.latitude);
        active_model.longitude = Set(self.longitude);
        active_model.timestamp = Set(self.timestamp);
        active_model
    }
}

impl IntoActiveModel<gps_pings::ActiveModel> for UpdateGpsPing {
    fn into_active_model(self) -> gps_pings::ActiveModel {
        let mut active_model = gps_pings::ActiveModel::new();
        active_model.vehicle_id = self.vehicle_id.map(Set).unwrap_or(NotSet);
        active_model.latitude = self.latitude.map(Set).unwrap_or(NotSet);
        active_model.longitude = self.longitude.map(Set).unwrap_or(NotSet);
        active_model.timestamp = self.timestamp.map(Set).unwrap_or(NotSet);
        active_model
    }
}
