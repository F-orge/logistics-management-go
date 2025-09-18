use crate::entities::{
    _generated::geofence_events,
    geofence_events::{InsertGeofenceEvent, UpdateGeofenceEvent},
};
use async_graphql::Object;
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;
use graphql_auth::guards::{RoleGuard, SystemGuard};
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "GeofenceEvents")]
impl graphql_core::traits::GraphqlQuery<geofence_events::Model, Uuid> for geofence_events::Entity {
    #[graphql(
        name = "geofenceEvents",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::TransportManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<geofence_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let geofence_events = geofence_events::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(geofence_events)
    }
    #[graphql(
        name = "geofenceEvent",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::TransportManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<geofence_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let geofence_event = geofence_events::Entity::find_by_id(id).one(db).await?;
        Ok(geofence_event)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsGeofenceEventMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        geofence_events::Model,
        Uuid,
        InsertGeofenceEvent,
        UpdateGeofenceEvent,
    > for Mutations
{
    #[graphql(
        name = "createGeofenceEvent",
        guard = "SystemGuard.or(RoleGuard::new(UserRole::Admin))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertGeofenceEvent,
    ) -> async_graphql::Result<geofence_events::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_geofence_event = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_geofence_event)
    }
    #[graphql(
        name = "updateGeofenceEvent",
        guard = "SystemGuard.or(RoleGuard::new(UserRole::Admin))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateGeofenceEvent,
    ) -> async_graphql::Result<geofence_events::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_geofence_event = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_geofence_event)
    }
    #[graphql(
        name = "deleteGeofenceEvent",
        guard = "RoleGuard::new(UserRole::Admin)"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let geofence_event = geofence_events::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find geofence event"))?;
        let result = geofence_event.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete geofence event"));
        }
        Ok(true)
    }
}
