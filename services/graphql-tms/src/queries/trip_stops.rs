use crate::entities::{
    _generated::trip_stops,
    trip_stops::{InsertTripStop, UpdateTripStop},
};
use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_auth::models::user::UserRole;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "TripStops")]
impl graphql_core::traits::GraphqlQuery<trip_stops::Model, Uuid> for trip_stops::Entity {
    #[graphql(
        name = "tripStops",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::FleetManager)).or(RoleGuard::new(UserRole::Driver))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<trip_stops::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trip_stops = trip_stops::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(trip_stops)
    }
    #[graphql(
        name = "tripStop",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::FleetManager)).or(RoleGuard::new(UserRole::Driver))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<trip_stops::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trip_stop = trip_stops::Entity::find_by_id(id).one(db).await?;
        Ok(trip_stop)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsTripStopMutations")]
impl graphql_core::traits::GraphqlMutation<trip_stops::Model, Uuid, InsertTripStop, UpdateTripStop>
    for Mutations
{
    #[graphql(
        name = "createTripStop",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertTripStop,
    ) -> async_graphql::Result<trip_stops::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_trip_stop = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_trip_stop)
    }
    #[graphql(
        name = "updateTripStop",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::Driver))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateTripStop,
    ) -> async_graphql::Result<trip_stops::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_trip_stop = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_trip_stop)
    }
    #[graphql(
        name = "deleteTripStop",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let trip_stop = trip_stops::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find trip stop"))?;
        let result = trip_stop.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete trip stop"));
        }
        Ok(true)
    }
}
