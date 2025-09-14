use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel, ModelTrait, TransactionTrait};
use uuid::Uuid;

use crate::entities::{
    _generated::driver_locations,
    driver_locations::{InsertDriverLocation, UpdateDriverLocation},
};

#[Object(name = "DriverLocations")]
impl graphql_core::traits::GraphqlQuery<driver_locations::Model, Uuid> for driver_locations::Entity {
    #[graphql(name = "driverLocations")]
    async fn list(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Vec<driver_locations::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = driver_locations::Entity::find().all(db).await.unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "driverLocation")]
    async fn view(&self, ctx: &async_graphql::Context<'_>, id: Uuid) -> async_graphql::Result<Option<driver_locations::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = driver_locations::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "DmsDriverLocationMutations")]
impl graphql_core::traits::GraphqlMutation<driver_locations::Model, Uuid, InsertDriverLocation, UpdateDriverLocation> for Mutations {
    #[graphql(name = "createDriverLocation")]
    async fn create(&self, ctx: &async_graphql::Context<'_>, value: InsertDriverLocation) -> async_graphql::Result<driver_locations::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateDriverLocation")]
    async fn update(&self, ctx: &async_graphql::Context<'_>, id: Uuid, value: UpdateDriverLocation) -> async_graphql::Result<driver_locations::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteDriverLocation")]
    async fn delete(&self, ctx: &async_graphql::Context<'_>, id: Uuid) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = driver_locations::Entity::find_by_id(id).one(&trx).await?.ok_or(async_graphql::Error::new("Unable to find driver_location"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete driver_location"));
        }
        Ok(true)
    }
}
