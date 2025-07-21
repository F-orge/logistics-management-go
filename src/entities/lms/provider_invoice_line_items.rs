// Create/Update structs for lms_provider_invoice_line_items

use crate::entities::_generated::lms_provider_invoice_line_items::*;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreateProviderInvoiceLineItem {
    pub provider_invoice_id: Uuid,
    pub transport_leg_id: Uuid,
    pub description: String,
    pub quantity: i32,
    pub unit_price: Decimal,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateProviderInvoiceLineItem {
    pub id: Uuid,
    pub provider_invoice_id: Option<Uuid>,
    pub transport_leg_id: Option<Uuid>,
    pub description: Option<String>,
    pub quantity: Option<i32>,
    pub unit_price: Option<Decimal>,
}

impl IntoActiveModel<ActiveModel> for CreateProviderInvoiceLineItem {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.provider_invoice_id = Set(self.provider_invoice_id);
        active_model.transport_leg_id = Set(self.transport_leg_id);
        active_model.description = Set(self.description);
        active_model.quantity = Set(self.quantity);
        active_model.unit_price = Set(self.unit_price);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateProviderInvoiceLineItem {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(provider_invoice_id) = self.provider_invoice_id {
            active_model.provider_invoice_id = Set(provider_invoice_id);
        }
        if let Some(transport_leg_id) = self.transport_leg_id {
            active_model.transport_leg_id = Set(transport_leg_id);
        }
        if let Some(description) = self.description {
            active_model.description = Set(description);
        }
        if let Some(quantity) = self.quantity {
            active_model.quantity = Set(quantity);
        }
        if let Some(unit_price) = self.unit_price {
            active_model.unit_price = Set(unit_price);
        }

        active_model
    }
}
