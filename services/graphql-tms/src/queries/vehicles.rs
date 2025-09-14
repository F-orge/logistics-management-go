use crate::entities::{
    _generated::vehicles,
    vehicles::{InsertVehicle, UpdateVehicle},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Vehicles")]
impl graphql_core::traits::GraphqlQuery<vehicles::Model, Uuid> for vehicles::Entity {
    #[graphql(name = "vehicles")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<vehicles::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let vehicles = vehicles::Entity::find().all(db).await.unwrap_or_default();
        Ok(vehicles)
    }
    #[graphql(name = "vehicle")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<vehicles::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let vehicle = vehicles::Entity::find_by_id(id).one(db).await?;
        Ok(vehicle)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsVehicleMutations")]
impl graphql_core::traits::GraphqlMutation<vehicles::Model, Uuid, InsertVehicle, UpdateVehicle>
    for Mutations
{
    #[graphql(name = "createVehicle")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertVehicle,
    ) -> async_graphql::Result<vehicles::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_vehicle = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_vehicle)
    }
    #[graphql(name = "updateVehicle")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateVehicle,
    ) -> async_graphql::Result<vehicles::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_vehicle = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_vehicle)
    }
    #[graphql(name = "deleteVehicle")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let vehicle = vehicles::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find vehicle"))?;
        let result = vehicle.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete vehicle"));
        }
        Ok(true)
    }
}
