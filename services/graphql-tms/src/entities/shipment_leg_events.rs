use crate::entities::_generated::shipment_leg_events;
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertShipmentLegEvent {
    pub shipment_leg_id: Uuid,
    pub status_message: Option<String>,
    pub location: Option<String>,
    pub event_timestamp: DateTime,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateShipmentLegEvent {
    pub shipment_leg_id: Option<Uuid>,
    pub status_message: Option<Option<String>>,
    pub location: Option<Option<String>>,
    pub event_timestamp: Option<DateTime>,
}

impl IntoActiveModel<shipment_leg_events::ActiveModel> for InsertShipmentLegEvent {
    fn into_active_model(self) -> shipment_leg_events::ActiveModel {
        let mut active_model = shipment_leg_events::ActiveModel::new();
        active_model.shipment_leg_id = Set(self.shipment_leg_id);
        active_model.status_message = Set(self.status_message);
        active_model.location = Set(self.location);
        active_model.event_timestamp = Set(self.event_timestamp);
        active_model
    }
}

impl IntoActiveModel<shipment_leg_events::ActiveModel> for UpdateShipmentLegEvent {
    fn into_active_model(self) -> shipment_leg_events::ActiveModel {
        let mut active_model = shipment_leg_events::ActiveModel::new();
        active_model.shipment_leg_id = self.shipment_leg_id.map(Set).unwrap_or(NotSet);
        active_model.status_message = self.status_message.map(Set).unwrap_or(NotSet);
        active_model.location = self.location.map(Set).unwrap_or(NotSet);
        active_model.event_timestamp = self.event_timestamp.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};
use crate::entities::_generated::shipment_legs;

#[ComplexObject]
impl shipment_leg_events::Model {
    async fn shipment_leg(&self, ctx: &Context<'_>) -> async_graphql::Result<shipment_legs::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = shipment_legs::Entity::find_by_id(self.shipment_leg_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("ShipmentLeg not found")),
        }
    }
}
