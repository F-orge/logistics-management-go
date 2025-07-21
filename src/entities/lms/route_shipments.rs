// Create/Update structs for lms_route_shipments

use crate::entities::_generated::lms_route_shipments::*;
use crate::entities::_generated::sea_orm_active_enums::LmsDeliveryStatus;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateRouteShipment {
    pub route_id: Uuid,
    pub shipment_id: Uuid,
    pub sequence_number: i32,
    pub delivery_date: Date,
    pub estimated_delivery: Option<DateTimeWithTimeZone>,
    pub actual_delivery: Option<DateTimeWithTimeZone>,
    pub delivery_status: LmsDeliveryStatus,
    pub signature_required: bool,
    pub recipient_signature: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateRouteShipment {
    pub id: Uuid,
    pub route_id: Option<Uuid>,
    pub shipment_id: Option<Uuid>,
    pub sequence_number: Option<i32>,
    pub delivery_date: Option<Date>,
    pub estimated_delivery: Option<Option<DateTimeWithTimeZone>>,
    pub actual_delivery: Option<Option<DateTimeWithTimeZone>>,
    pub delivery_status: Option<LmsDeliveryStatus>,
    pub signature_required: Option<bool>,
    pub recipient_signature: Option<Option<String>>,
}

impl IntoActiveModel<ActiveModel> for CreateRouteShipment {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.route_id = Set(self.route_id);
        active_model.shipment_id = Set(self.shipment_id);
        active_model.sequence_number = Set(self.sequence_number);
        active_model.delivery_date = Set(self.delivery_date);
        active_model.estimated_delivery = Set(self.estimated_delivery);
        active_model.actual_delivery = Set(self.actual_delivery);
        active_model.delivery_status = Set(self.delivery_status);
        active_model.signature_required = Set(self.signature_required);
        active_model.recipient_signature = Set(self.recipient_signature);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateRouteShipment {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(route_id) = self.route_id {
            active_model.route_id = Set(route_id);
        }
        if let Some(shipment_id) = self.shipment_id {
            active_model.shipment_id = Set(shipment_id);
        }
        if let Some(sequence_number) = self.sequence_number {
            active_model.sequence_number = Set(sequence_number);
        }
        if let Some(delivery_date) = self.delivery_date {
            active_model.delivery_date = Set(delivery_date);
        }
        if let Some(estimated_delivery) = self.estimated_delivery {
            active_model.estimated_delivery = Set(estimated_delivery);
        }
        if let Some(actual_delivery) = self.actual_delivery {
            active_model.actual_delivery = Set(actual_delivery);
        }
        if let Some(delivery_status) = self.delivery_status {
            active_model.delivery_status = Set(delivery_status);
        }
        if let Some(signature_required) = self.signature_required {
            active_model.signature_required = Set(signature_required);
        }
        if let Some(recipient_signature) = self.recipient_signature {
            active_model.recipient_signature = Set(recipient_signature);
        }
        active_model
    }
}
