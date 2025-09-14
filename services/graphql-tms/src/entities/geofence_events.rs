use crate::entities::_generated::{geofence_events, sea_orm_active_enums::GeofenceEventTypeEnum};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{ActiveValue::{NotSet, Set}, IntoActiveModel};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertGeofenceEvent {
    pub vehicle_id: Uuid,
    pub geofence_id: Uuid,
    pub event_type: GeofenceEventTypeEnum,
    pub timestamp: DateTime,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateGeofenceEvent {
    pub vehicle_id: Option<Uuid>,
    pub geofence_id: Option<Uuid>,
    pub event_type: Option<GeofenceEventTypeEnum>,
    pub timestamp: Option<DateTime>,
}

impl IntoActiveModel<geofence_events::ActiveModel> for InsertGeofenceEvent {
    fn into_active_model(self) -> geofence_events::ActiveModel {
        let mut active_model = geofence_events::ActiveModel::new();
        active_model.vehicle_id = Set(self.vehicle_id);
        active_model.geofence_id = Set(self.geofence_id);
        active_model.event_type = Set(self.event_type);
        active_model.timestamp = Set(self.timestamp);
        active_model
    }
}

impl IntoActiveModel<geofence_events::ActiveModel> for UpdateGeofenceEvent {
    fn into_active_model(self) -> geofence_events::ActiveModel {
        let mut active_model = geofence_events::ActiveModel::new();
        active_model.vehicle_id = self.vehicle_id.map(Set).unwrap_or(NotSet);
        active_model.geofence_id = self.geofence_id.map(Set).unwrap_or(NotSet);
        active_model.event_type = self.event_type.map(Set).unwrap_or(NotSet);
        active_model.timestamp = self.timestamp.map(Set).unwrap_or(NotSet);
        active_model
    }
}
