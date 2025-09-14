use crate::entities::{
    _generated::geofences,
    geofences::{InsertGeofence, UpdateGeofence},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Geofences")]
impl graphql_core::traits::GraphqlQuery<geofences::Model, Uuid> for geofences::Entity {
    #[graphql(name = "geofences")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<geofences::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let geofences = geofences::Entity::find().all(db).await.unwrap_or_default();
        Ok(geofences)
    }
    #[graphql(name = "geofence")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<geofences::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let geofence = geofences::Entity::find_by_id(id).one(db).await?;
        Ok(geofence)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsGeofenceMutations")]
impl graphql_core::traits::GraphqlMutation<geofences::Model, Uuid, InsertGeofence, UpdateGeofence>
    for Mutations
{
    #[graphql(name = "createGeofence")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertGeofence,
    ) -> async_graphql::Result<geofences::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_geofence = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_geofence)
    }
    #[graphql(name = "updateGeofence")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateGeofence,
    ) -> async_graphql::Result<geofences::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_geofence = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_geofence)
    }
    #[graphql(name = "deleteGeofence")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let geofence = geofences::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find geofence"))?;
        let result = geofence.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete geofence"));
        }
        Ok(true)
    }
}
