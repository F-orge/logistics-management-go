use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::lorem::raw::Sentence;
use fake::locales::EN;

use crate::entities::_generated::inbound_shipment_items;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertInboundShipmentItem {
    pub inbound_shipment_id: Uuid,

    pub product_id: Uuid,
    #[dummy(faker = "1..100")]
    pub expected_quantity: i32,
    #[dummy(faker = "1..100")]
    pub received_quantity: Option<i32>,
    #[dummy(faker = "-10..10")]
    pub discrepancy_quantity: Option<i32>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub discrepancy_notes: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInboundShipmentItem {
    pub inbound_shipment_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub expected_quantity: Option<i32>,
    pub received_quantity: Option<Option<i32>>,
    pub discrepancy_quantity: Option<Option<i32>>,
    pub discrepancy_notes: Option<Option<String>>,
}

impl IntoActiveModel<inbound_shipment_items::ActiveModel> for InsertInboundShipmentItem {
    fn into_active_model(self) -> inbound_shipment_items::ActiveModel {
        let mut active_model = inbound_shipment_items::ActiveModel::new();
        active_model.inbound_shipment_id = Set(self.inbound_shipment_id);
        active_model.product_id = Set(self.product_id);
        active_model.expected_quantity = Set(self.expected_quantity);
        active_model.received_quantity = Set(self.received_quantity);
        active_model.discrepancy_quantity = Set(self.discrepancy_quantity);
        active_model.discrepancy_notes = Set(self.discrepancy_notes);
        active_model
    }
}

impl IntoActiveModel<inbound_shipment_items::ActiveModel> for UpdateInboundShipmentItem {
    fn into_active_model(self) -> inbound_shipment_items::ActiveModel {
        let mut active_model = inbound_shipment_items::ActiveModel::new();
        active_model.inbound_shipment_id = self.inbound_shipment_id.map(Set).unwrap_or(NotSet);
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.expected_quantity = self.expected_quantity.map(Set).unwrap_or(NotSet);
        active_model.received_quantity = self.received_quantity.map(Set).unwrap_or(NotSet);
        active_model.discrepancy_quantity = self.discrepancy_quantity.map(Set).unwrap_or(NotSet);
        active_model.discrepancy_notes = self.discrepancy_notes.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{inbound_shipments, products};
use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl inbound_shipment_items::Model {
    async fn inbound_shipment(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let result = inbound_shipments::Entity::find_by_id(self.inbound_shipment_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Inbound shipment not found")),
        }
    }

    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let result = products::Entity::find_by_id(self.product_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Product not found")),
        }
    }
}
