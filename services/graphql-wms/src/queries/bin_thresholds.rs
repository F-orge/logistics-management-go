use crate::entities::{
    _generated::bin_thresholds,
    bin_thresholds::{InsertBinThreshold, UpdateBinThreshold},
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

#[Object(name = "BinThresholds")]
impl graphql_core::traits::GraphqlQuery<bin_thresholds::Model, Uuid> for bin_thresholds::Entity {
    #[graphql(
        name = "binThresholds",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<bin_thresholds::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = bin_thresholds::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(
        name = "binThreshold",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<bin_thresholds::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = bin_thresholds::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "WmsBinThresholdMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        bin_thresholds::Model,
        Uuid,
        InsertBinThreshold,
        UpdateBinThreshold,
    > for Mutations
{
    #[graphql(
        name = "createBinThreshold",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertBinThreshold,
    ) -> async_graphql::Result<bin_thresholds::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(
        name = "updateBinThreshold",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateBinThreshold,
    ) -> async_graphql::Result<bin_thresholds::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(
        name = "deleteBinThreshold",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = bin_thresholds::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find bin_threshold"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete bin_threshold"));
        }
        Ok(true)
    }
}
