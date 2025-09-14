use crate::entities::{
    _generated::trips,
    trips::{InsertTrip, UpdateTrip},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Trips")]
impl graphql_core::traits::GraphqlQuery<trips::Model, Uuid> for trips::Entity {
    #[graphql(name = "trips")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<trips::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trips = trips::Entity::find().all(db).await.unwrap_or_default();
        Ok(trips)
    }
    #[graphql(name = "trip")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<trips::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trip = trips::Entity::find_by_id(id).one(db).await?;
        Ok(trip)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsTripMutations")]
impl graphql_core::traits::GraphqlMutation<trips::Model, Uuid, InsertTrip, UpdateTrip>
    for Mutations
{
    #[graphql(name = "createTrip")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertTrip,
    ) -> async_graphql::Result<trips::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_trip = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_trip)
    }
    #[graphql(name = "updateTrip")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateTrip,
    ) -> async_graphql::Result<trips::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_trip = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_trip)
    }
    #[graphql(name = "deleteTrip")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let trip = trips::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find trip"))?;
        let result = trip.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete trip"));
        }
        Ok(true)
    }
}
