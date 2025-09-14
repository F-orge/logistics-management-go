use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel, ModelTrait, TransactionTrait};
use uuid::Uuid;
use crate::entities::{_generated::shipment_legs, shipment_legs::{InsertShipmentLeg, UpdateShipmentLeg}};

#[Object(name = "ShipmentLegs")]
impl graphql_core::traits::GraphqlQuery<shipment_legs::Model, Uuid> for shipment_legs::Entity {
    #[graphql(name = "shipmentLegs")]
    async fn list(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Vec<shipment_legs::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let shipment_legs = shipment_legs::Entity::find().all(db).await.unwrap_or_default();
        Ok(shipment_legs)
    }
    #[graphql(name = "shipmentLeg")]
    async fn view(&self, ctx: &async_graphql::Context<'_>, id: Uuid) -> async_graphql::Result<Option<shipment_legs::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let shipment_leg = shipment_legs::Entity::find_by_id(id).one(db).await?;
        Ok(shipment_leg)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsShipmentLegMutations")]
impl graphql_core::traits::GraphqlMutation<shipment_legs::Model, Uuid, InsertShipmentLeg, UpdateShipmentLeg> for Mutations {
    #[graphql(name = "createShipmentLeg")]
    async fn create(&self, ctx: &async_graphql::Context<'_>, value: InsertShipmentLeg) -> async_graphql::Result<shipment_legs::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_shipment_leg = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_shipment_leg)
    }
    #[graphql(name = "updateShipmentLeg")]
    async fn update(&self, ctx: &async_graphql::Context<'_>, id: Uuid, value: UpdateShipmentLeg) -> async_graphql::Result<shipment_legs::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_shipment_leg = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_shipment_leg)
    }
    #[graphql(name = "deleteShipmentLeg")]
    async fn delete(&self, ctx: &async_graphql::Context<'_>, id: Uuid) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let shipment_leg = shipment_legs::Entity::find_by_id(id).one(&trx).await?.ok_or(async_graphql::Error::new("Unable to find shipment leg"))?;
        let result = shipment_leg.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete shipment leg"));
        }
        Ok(true)
    }
}
