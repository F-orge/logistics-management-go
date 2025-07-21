// Create/Update structs for lms_transport_legs

use crate::entities::_generated::lms_transport_legs::*;
use crate::entities::_generated::sea_orm_active_enums::{LmsLegStatus, LmsTransportLegType};
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateTransportLeg {
    pub shipment_id: Uuid,
    pub leg_sequence: i32,
    pub transport_type: LmsTransportLegType,
    pub provider_id: Option<Uuid>,
    pub provider_service_id: Option<Uuid>,
    pub provider_tracking_number: Option<String>,
    pub vehicle_id: Option<Uuid>,
    pub driver_id: Option<Uuid>,
    pub origin_warehouse_id: Option<Uuid>,
    pub destination_warehouse_id: Option<Uuid>,
    pub origin_address_id: Option<Uuid>,
    pub destination_address_id: Option<Uuid>,
    pub scheduled_pickup: Option<DateTimeWithTimeZone>,
    pub actual_pickup: Option<DateTimeWithTimeZone>,
    pub scheduled_delivery: Option<DateTimeWithTimeZone>,
    pub actual_delivery: Option<DateTimeWithTimeZone>,
    pub cost: Option<Decimal>,
    pub currency: Option<String>,
    pub status: LmsLegStatus,
    pub special_instructions: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTransportLeg {
    pub id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub leg_sequence: Option<i32>,
    pub transport_type: Option<LmsTransportLegType>,
    pub provider_id: Option<Option<Uuid>>,
    pub provider_service_id: Option<Option<Uuid>>,
    pub provider_tracking_number: Option<Option<String>>,
    pub vehicle_id: Option<Option<Uuid>>,
    pub driver_id: Option<Option<Uuid>>,
    pub origin_warehouse_id: Option<Option<Uuid>>,
    pub destination_warehouse_id: Option<Option<Uuid>>,
    pub origin_address_id: Option<Option<Uuid>>,
    pub destination_address_id: Option<Option<Uuid>>,
    pub scheduled_pickup: Option<Option<DateTimeWithTimeZone>>,
    pub actual_pickup: Option<Option<DateTimeWithTimeZone>>,
    pub scheduled_delivery: Option<Option<DateTimeWithTimeZone>>,
    pub actual_delivery: Option<Option<DateTimeWithTimeZone>>,
    pub cost: Option<Option<Decimal>>,
    pub currency: Option<Option<String>>,
    pub status: Option<LmsLegStatus>,
    pub special_instructions: Option<Option<String>>,
}

impl IntoActiveModel<ActiveModel> for CreateTransportLeg {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.shipment_id = Set(self.shipment_id);
        active_model.leg_sequence = Set(self.leg_sequence);
        active_model.transport_type = Set(self.transport_type);
        active_model.provider_id = Set(self.provider_id);
        active_model.provider_service_id = Set(self.provider_service_id);
        active_model.provider_tracking_number = Set(self.provider_tracking_number);
        active_model.vehicle_id = Set(self.vehicle_id);
        active_model.driver_id = Set(self.driver_id);
        active_model.origin_warehouse_id = Set(self.origin_warehouse_id);
        active_model.destination_warehouse_id = Set(self.destination_warehouse_id);
        active_model.origin_address_id = Set(self.origin_address_id);
        active_model.destination_address_id = Set(self.destination_address_id);
        active_model.scheduled_pickup = Set(self.scheduled_pickup);
        active_model.actual_pickup = Set(self.actual_pickup);
        active_model.scheduled_delivery = Set(self.scheduled_delivery);
        active_model.actual_delivery = Set(self.actual_delivery);
        active_model.cost = Set(self.cost);
        active_model.currency = Set(self.currency);
        active_model.status = Set(self.status);
        active_model.special_instructions = Set(self.special_instructions);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateTransportLeg {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(shipment_id) = self.shipment_id {
            active_model.shipment_id = Set(shipment_id);
        }
        if let Some(leg_sequence) = self.leg_sequence {
            active_model.leg_sequence = Set(leg_sequence);
        }
        if let Some(transport_type) = self.transport_type {
            active_model.transport_type = Set(transport_type);
        }
        if let Some(provider_id) = self.provider_id {
            active_model.provider_id = Set(provider_id);
        }
        if let Some(provider_service_id) = self.provider_service_id {
            active_model.provider_service_id = Set(provider_service_id);
        }
        if let Some(provider_tracking_number) = self.provider_tracking_number {
            active_model.provider_tracking_number = Set(provider_tracking_number);
        }
        if let Some(vehicle_id) = self.vehicle_id {
            active_model.vehicle_id = Set(vehicle_id);
        }
        if let Some(driver_id) = self.driver_id {
            active_model.driver_id = Set(driver_id);
        }
        if let Some(origin_warehouse_id) = self.origin_warehouse_id {
            active_model.origin_warehouse_id = Set(origin_warehouse_id);
        }
        if let Some(destination_warehouse_id) = self.destination_warehouse_id {
            active_model.destination_warehouse_id = Set(destination_warehouse_id);
        }
        if let Some(origin_address_id) = self.origin_address_id {
            active_model.origin_address_id = Set(origin_address_id);
        }
        if let Some(destination_address_id) = self.destination_address_id {
            active_model.destination_address_id = Set(destination_address_id);
        }
        if let Some(scheduled_pickup) = self.scheduled_pickup {
            active_model.scheduled_pickup = Set(scheduled_pickup);
        }
        if let Some(actual_pickup) = self.actual_pickup {
            active_model.actual_pickup = Set(actual_pickup);
        }
        if let Some(scheduled_delivery) = self.scheduled_delivery {
            active_model.scheduled_delivery = Set(scheduled_delivery);
        }
        if let Some(actual_delivery) = self.actual_delivery {
            active_model.actual_delivery = Set(actual_delivery);
        }
        if let Some(cost) = self.cost {
            active_model.cost = Set(cost);
        }
        if let Some(currency) = self.currency {
            active_model.currency = Set(currency);
        }
        if let Some(status) = self.status {
            active_model.status = Set(status);
        }
        if let Some(special_instructions) = self.special_instructions {
            active_model.special_instructions = Set(special_instructions);
        }
        active_model
    }
}
