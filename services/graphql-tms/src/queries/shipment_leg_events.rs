use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel, ModelTrait, TransactionTrait};
use uuid::Uuid;
use crate::entities::{_generated::shipment_leg_events, shipment_leg_events::{InsertShipmentLegEvent, UpdateShipmentLegEvent}};

#[Object(name = "ShipmentLegEvents")]
impl graphql_core::traits::GraphqlQuery<shipment_leg_events::Model, Uuid> for shipment_leg_events::Entity {
    #[graphql(name = "shipmentLegEvents")]
    async fn list(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Vec<shipment_leg_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let shipment_leg_events = shipment_leg_events::Entity::find().all(db).await.unwrap_or_default();
        Ok(shipment_leg_events)
    }
    #[graphql(name = "shipmentLegEvent")]
    async fn view(&self, ctx: &async_graphql::Context<'_>, id: Uuid) -> async_graphql::Result<Option<shipment_leg_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let shipment_leg_event = shipment_leg_events::Entity::find_by_id(id).one(db).await?;
        Ok(shipment_leg_event)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsShipmentLegEventMutations")]
impl graphql_core::traits::GraphqlMutation<shipment_leg_events::Model, Uuid, InsertShipmentLegEvent, UpdateShipmentLegEvent> for Mutations {
    #[graphql(name = "createShipmentLegEvent")]
    async fn create(&self, ctx: &async_graphql::Context<'_>, value: InsertShipmentLegEvent) -> async_graphql::Result<shipment_leg_events::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_shipment_leg_event = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_shipment_leg_event)
    }
    #[graphql(name = "updateShipmentLegEvent")]
    async fn update(&self, ctx: &async_graphql::Context<'_>, id: Uuid, value: UpdateShipmentLegEvent) -> async_graphql::Result<shipment_leg_events::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_shipment_leg_event = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_shipment_leg_event)
    }
    #[graphql(name = "deleteShipmentLegEvent")]
    async fn delete(&self, ctx: &async_graphql::Context<'_>, id: Uuid) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let shipment_leg_event = shipment_leg_events::Entity::find_by_id(id).one(&trx).await?.ok_or(async_graphql::Error::new("Unable to find shipment leg event"))?;
        let result = shipment_leg_event.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete shipment leg event"));
        }
        Ok(true)
    }
}
