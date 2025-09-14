use crate::entities::_generated::{sea_orm_active_enums::ShipmentLegStatusEnum, shipment_legs};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertShipmentLeg {
    pub shipment_id: Option<Uuid>,
    pub leg_sequence: i32,
    pub start_location: Option<String>,
    pub end_location: Option<String>,
    pub carrier_id: Option<Uuid>,
    pub internal_trip_id: Option<Uuid>,
    pub status: Option<ShipmentLegStatusEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateShipmentLeg {
    pub shipment_id: Option<Option<Uuid>>,
    pub leg_sequence: Option<i32>,
    pub start_location: Option<Option<String>>,
    pub end_location: Option<Option<String>>,
    pub carrier_id: Option<Option<Uuid>>,
    pub internal_trip_id: Option<Option<Uuid>>,
    pub status: Option<Option<ShipmentLegStatusEnum>>,
}

impl IntoActiveModel<shipment_legs::ActiveModel> for InsertShipmentLeg {
    fn into_active_model(self) -> shipment_legs::ActiveModel {
        let mut active_model = shipment_legs::ActiveModel::new();
        active_model.shipment_id = Set(self.shipment_id);
        active_model.leg_sequence = Set(self.leg_sequence);
        active_model.start_location = Set(self.start_location);
        active_model.end_location = Set(self.end_location);
        active_model.carrier_id = Set(self.carrier_id);
        active_model.internal_trip_id = Set(self.internal_trip_id);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<shipment_legs::ActiveModel> for UpdateShipmentLeg {
    fn into_active_model(self) -> shipment_legs::ActiveModel {
        let mut active_model = shipment_legs::ActiveModel::new();
        active_model.shipment_id = self.shipment_id.map(Set).unwrap_or(NotSet);
        active_model.leg_sequence = self.leg_sequence.map(Set).unwrap_or(NotSet);
        active_model.start_location = self.start_location.map(Set).unwrap_or(NotSet);
        active_model.end_location = self.end_location.map(Set).unwrap_or(NotSet);
        active_model.carrier_id = self.carrier_id.map(Set).unwrap_or(NotSet);
        active_model.internal_trip_id = self.internal_trip_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl shipment_legs::Model {

}
