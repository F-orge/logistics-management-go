// Create/Update structs for lms_shipments

use crate::entities::_generated::lms_shipments::*;
use crate::entities::_generated::sea_orm_active_enums::{LmsShipmentStatus, LmsTransportMode};
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateShipment {
    pub tracking_number: String,
    pub sender_company_id: Option<Uuid>,
    pub sender_contact_id: Option<Uuid>,
    pub sender_address_id: Uuid,
    pub receiver_company_id: Option<Uuid>,
    pub receiver_contact_id: Option<Uuid>,
    pub receiver_address_id: Uuid,
    pub service_id: Uuid,
    pub assigned_department_id: Option<Uuid>,
    pub primary_transport_mode: LmsTransportMode,
    pub status: LmsShipmentStatus,
    pub total_weight: Decimal,
    pub total_value: Option<Decimal>,
    pub insurance_amount: Option<Decimal>,
    pub shipping_cost: Option<Decimal>,
    pub currency: String,
    pub pickup_date: Option<Date>,
    pub delivery_date: Option<Date>,
    pub estimated_delivery_date: Option<Date>,
    pub special_instructions: Option<String>,
    pub created_by: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateShipment {
    pub id: Uuid,
    pub tracking_number: Option<String>,
    pub sender_company_id: Option<Option<Uuid>>,
    pub sender_contact_id: Option<Option<Uuid>>,
    pub sender_address_id: Option<Uuid>,
    pub receiver_company_id: Option<Option<Uuid>>,
    pub receiver_contact_id: Option<Option<Uuid>>,
    pub receiver_address_id: Option<Uuid>,
    pub service_id: Option<Uuid>,
    pub assigned_department_id: Option<Option<Uuid>>,
    pub primary_transport_mode: Option<LmsTransportMode>,
    pub status: Option<LmsShipmentStatus>,
    pub total_weight: Option<Decimal>,
    pub total_value: Option<Option<Decimal>>,
    pub insurance_amount: Option<Option<Decimal>>,
    pub shipping_cost: Option<Option<Decimal>>,
    pub currency: Option<String>,
    pub pickup_date: Option<Option<Date>>,
    pub delivery_date: Option<Option<Date>>,
    pub estimated_delivery_date: Option<Option<Date>>,
    pub special_instructions: Option<Option<String>>,
    pub created_by: Option<Option<Uuid>>,
}

impl IntoActiveModel<ActiveModel> for CreateShipment {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.tracking_number = Set(self.tracking_number);
        active_model.sender_company_id = Set(self.sender_company_id);
        active_model.sender_contact_id = Set(self.sender_contact_id);
        active_model.sender_address_id = Set(self.sender_address_id);
        active_model.receiver_company_id = Set(self.receiver_company_id);
        active_model.receiver_contact_id = Set(self.receiver_contact_id);
        active_model.receiver_address_id = Set(self.receiver_address_id);
        active_model.service_id = Set(self.service_id);
        active_model.assigned_department_id = Set(self.assigned_department_id);
        active_model.primary_transport_mode = Set(self.primary_transport_mode);
        active_model.status = Set(self.status);
        active_model.total_weight = Set(self.total_weight);
        active_model.total_value = Set(self.total_value);
        active_model.insurance_amount = Set(self.insurance_amount);
        active_model.shipping_cost = Set(self.shipping_cost);
        active_model.currency = Set(self.currency);
        active_model.pickup_date = Set(self.pickup_date);
        active_model.delivery_date = Set(self.delivery_date);
        active_model.estimated_delivery_date = Set(self.estimated_delivery_date);
        active_model.special_instructions = Set(self.special_instructions);
        active_model.created_by = Set(self.created_by);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateShipment {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(tracking_number) = self.tracking_number {
            active_model.tracking_number = Set(tracking_number);
        }
        if let Some(sender_company_id) = self.sender_company_id {
            active_model.sender_company_id = Set(sender_company_id);
        }
        if let Some(sender_contact_id) = self.sender_contact_id {
            active_model.sender_contact_id = Set(sender_contact_id);
        }
        if let Some(sender_address_id) = self.sender_address_id {
            active_model.sender_address_id = Set(sender_address_id);
        }
        if let Some(receiver_company_id) = self.receiver_company_id {
            active_model.receiver_company_id = Set(receiver_company_id);
        }
        if let Some(receiver_contact_id) = self.receiver_contact_id {
            active_model.receiver_contact_id = Set(receiver_contact_id);
        }
        if let Some(receiver_address_id) = self.receiver_address_id {
            active_model.receiver_address_id = Set(receiver_address_id);
        }
        if let Some(service_id) = self.service_id {
            active_model.service_id = Set(service_id);
        }
        if let Some(assigned_department_id) = self.assigned_department_id {
            active_model.assigned_department_id = Set(assigned_department_id);
        }
        if let Some(primary_transport_mode) = self.primary_transport_mode {
            active_model.primary_transport_mode = Set(primary_transport_mode);
        }
        if let Some(status) = self.status {
            active_model.status = Set(status);
        }
        if let Some(total_weight) = self.total_weight {
            active_model.total_weight = Set(total_weight);
        }
        if let Some(total_value) = self.total_value {
            active_model.total_value = Set(total_value);
        }
        if let Some(insurance_amount) = self.insurance_amount {
            active_model.insurance_amount = Set(insurance_amount);
        }
        if let Some(shipping_cost) = self.shipping_cost {
            active_model.shipping_cost = Set(shipping_cost);
        }
        if let Some(currency) = self.currency {
            active_model.currency = Set(currency);
        }
        if let Some(pickup_date) = self.pickup_date {
            active_model.pickup_date = Set(pickup_date);
        }
        if let Some(delivery_date) = self.delivery_date {
            active_model.delivery_date = Set(delivery_date);
        }
        if let Some(estimated_delivery_date) = self.estimated_delivery_date {
            active_model.estimated_delivery_date = Set(estimated_delivery_date);
        }
        if let Some(special_instructions) = self.special_instructions {
            active_model.special_instructions = Set(special_instructions);
        }
        if let Some(created_by) = self.created_by {
            active_model.created_by = Set(created_by);
        }
        active_model
    }
}
