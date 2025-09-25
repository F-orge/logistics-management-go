use crate::entities::{
    _generated::carriers,
    carriers::{InsertCarrier, UpdateCarrier},
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

#[Object(name = "Carriers")]
impl graphql_core::traits::GraphqlQuery<carriers::Model, Uuid> for carriers::Entity {
    #[graphql(
        name = "carriers",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::LogisticsManager)).or(RoleGuard::new(UserRole::LogisticsPlanner)).or(RoleGuard::new(UserRole::Dispatcher))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<carriers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let carriers = carriers::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(carriers)
    }
    #[graphql(
        name = "carrier",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::LogisticsManager)).or(RoleGuard::new(UserRole::LogisticsPlanner)).or(RoleGuard::new(UserRole::Dispatcher))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<carriers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let carrier = carriers::Entity::find_by_id(id).one(db).await?;
        Ok(carrier)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsCarrierMutations")]
impl graphql_core::traits::GraphqlMutation<carriers::Model, Uuid, InsertCarrier, UpdateCarrier>
    for Mutations
{
    #[graphql(
        name = "createCarrier",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::LogisticsManager))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertCarrier,
    ) -> async_graphql::Result<carriers::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_carrier = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_carrier)
    }
    #[graphql(
        name = "updateCarrier",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::LogisticsManager))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateCarrier,
    ) -> async_graphql::Result<carriers::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_carrier = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_carrier)
    }
    #[graphql(
        name = "deleteCarrier",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::LogisticsManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let carrier = carriers::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find carrier"))?;
        let result = carrier.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete carrier"));
        }
        Ok(true)
    }
}
