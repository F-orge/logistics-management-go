use crate::entities::{
    _generated::gps_pings,
    gps_pings::{InsertGpsPing, UpdateGpsPing},
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

#[Object(name = "GpsPings")]
impl graphql_core::traits::GraphqlQuery<gps_pings::Model, Uuid> for gps_pings::Entity {
    #[graphql(
        name = "gpsPings",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::FleetManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<gps_pings::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let gps_pings = gps_pings::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(gps_pings)
    }
    #[graphql(
        name = "gpsPing",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::FleetManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<gps_pings::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let gps_ping = gps_pings::Entity::find_by_id(id).one(db).await?;
        Ok(gps_ping)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsGpsPingMutations")]
impl graphql_core::traits::GraphqlMutation<gps_pings::Model, Uuid, InsertGpsPing, UpdateGpsPing>
    for Mutations
{
    // System actions: use SystemGuard for automated inserts/updates
    #[graphql(
        name = "createGpsPing",
        guard = "SystemGuard.or(RoleGuard::new(UserRole::Admin))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertGpsPing,
    ) -> async_graphql::Result<gps_pings::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_gps_ping = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_gps_ping)
    }
    #[graphql(
        name = "updateGpsPing",
        guard = "SystemGuard.or(RoleGuard::new(UserRole::Admin))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateGpsPing,
    ) -> async_graphql::Result<gps_pings::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_gps_ping = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_gps_ping)
    }
    #[graphql(name = "deleteGpsPing", guard = "RoleGuard::new(UserRole::Admin)")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let gps_ping = gps_pings::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find gps ping"))?;
        let result = gps_ping.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete gps ping"));
        }
        Ok(true)
    }
}
