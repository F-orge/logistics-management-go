// Create/Update structs for lms_tracking_events

use crate::entities::_generated::lms_tracking_events::*;
use crate::entities::_generated::sea_orm_active_enums::LmsTrackingEventType;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateTrackingEvent {
    pub shipment_id: Uuid,
    pub event_type: LmsTrackingEventType,
    pub event_description: String,
    pub event_location: Option<String>,
    pub event_timestamp: DateTimeWithTimeZone,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTrackingEvent {
    pub id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub event_type: Option<LmsTrackingEventType>,
    pub event_description: Option<String>,
    pub event_location: Option<Option<String>>,
    pub event_timestamp: Option<DateTimeWithTimeZone>,
}

impl IntoActiveModel<ActiveModel> for CreateTrackingEvent {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.shipment_id = Set(self.shipment_id);
        active_model.event_type = Set(self.event_type);
        active_model.event_description = Set(self.event_description);
        active_model.event_location = Set(self.event_location);
        active_model.event_timestamp = Set(self.event_timestamp);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateTrackingEvent {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(shipment_id) = self.shipment_id {
            active_model.shipment_id = Set(shipment_id);
        }
        if let Some(event_type) = self.event_type {
            active_model.event_type = Set(event_type);
        }
        if let Some(event_description) = self.event_description {
            active_model.event_description = Set(event_description);
        }
        if let Some(event_location) = self.event_location {
            active_model.event_location = Set(event_location);
        }
        if let Some(event_timestamp) = self.event_timestamp {
            active_model.event_timestamp = Set(event_timestamp);
        }
        active_model
    }
}
