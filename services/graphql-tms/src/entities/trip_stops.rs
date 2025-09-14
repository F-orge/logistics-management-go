use crate::entities::_generated::{sea_orm_active_enums::TripStopStatusEnum, trip_stops};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertTripStop {
    pub trip_id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub sequence: i32,
    pub address: Option<String>,
    pub status: Option<TripStopStatusEnum>,
    pub estimated_arrival_time: Option<DateTime>,
    pub actual_arrival_time: Option<DateTime>,
    pub estimated_departure_time: Option<DateTime>,
    pub actual_departure_time: Option<DateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTripStop {
    pub trip_id: Option<Uuid>,
    pub shipment_id: Option<Option<Uuid>>,
    pub sequence: Option<i32>,
    pub address: Option<Option<String>>,
    pub status: Option<Option<TripStopStatusEnum>>,
    pub estimated_arrival_time: Option<Option<DateTime>>,
    pub actual_arrival_time: Option<Option<DateTime>>,
    pub estimated_departure_time: Option<Option<DateTime>>,
    pub actual_departure_time: Option<Option<DateTime>>,
}

impl IntoActiveModel<trip_stops::ActiveModel> for InsertTripStop {
    fn into_active_model(self) -> trip_stops::ActiveModel {
        let mut active_model = trip_stops::ActiveModel::new();
        active_model.trip_id = Set(self.trip_id);
        active_model.shipment_id = Set(self.shipment_id);
        active_model.sequence = Set(self.sequence);
        active_model.address = Set(self.address);
        active_model.status = Set(self.status);
        active_model.estimated_arrival_time = Set(self.estimated_arrival_time);
        active_model.actual_arrival_time = Set(self.actual_arrival_time);
        active_model.estimated_departure_time = Set(self.estimated_departure_time);
        active_model.actual_departure_time = Set(self.actual_departure_time);
        active_model
    }
}

impl IntoActiveModel<trip_stops::ActiveModel> for UpdateTripStop {
    fn into_active_model(self) -> trip_stops::ActiveModel {
        let mut active_model = trip_stops::ActiveModel::new();
        active_model.trip_id = self.trip_id.map(Set).unwrap_or(NotSet);
        active_model.shipment_id = self.shipment_id.map(Set).unwrap_or(NotSet);
        active_model.sequence = self.sequence.map(Set).unwrap_or(NotSet);
        active_model.address = self.address.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.estimated_arrival_time =
            self.estimated_arrival_time.map(Set).unwrap_or(NotSet);
        active_model.actual_arrival_time = self.actual_arrival_time.map(Set).unwrap_or(NotSet);
        active_model.estimated_departure_time =
            self.estimated_departure_time.map(Set).unwrap_or(NotSet);
        active_model.actual_departure_time = self.actual_departure_time.map(Set).unwrap_or(NotSet);
        active_model
    }
}
