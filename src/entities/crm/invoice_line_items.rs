use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};
use uuid::Uuid;

use crate::entities::_generated::crm_invoice_line_items::*;

#[derive(Debug, Clone, InputObject)]
pub struct CreateInvoiceLineItem {
    pub invoice_id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub description: String,
    pub quantity: Decimal,
    pub unit_price: Decimal,
}

impl IntoActiveModel<ActiveModel> for CreateInvoiceLineItem {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.invoice_id = Set(self.invoice_id);
        active_model.shipment_id = Set(self.shipment_id);
        active_model.description = Set(self.description);
        active_model.quantity = Set(self.quantity);
        active_model.unit_price = Set(self.unit_price);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInvoiceLineItem {
    pub id: Uuid,
    pub invoice_id: Option<Uuid>,
    pub shipment_id: Option<Option<Uuid>>,
    pub description: Option<String>,
    pub quantity: Option<Decimal>,
    pub unit_price: Option<Decimal>,
}

impl IntoActiveModel<ActiveModel> for UpdateInvoiceLineItem {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());

        if let Some(invoice_id) = self.invoice_id {
            active_model.invoice_id = Set(invoice_id);
        }

        if let Some(shipment_id) = self.shipment_id {
            active_model.shipment_id = Set(shipment_id);
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
