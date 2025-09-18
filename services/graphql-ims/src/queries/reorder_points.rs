use crate::entities::{
    _generated::reorder_points,
    reorder_points::{InsertReorderPoint, UpdateReorderPoint},
};
use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "ReorderPoints")]
impl graphql_core::traits::GraphqlQuery<reorder_points::Model, Uuid> for reorder_points::Entity {
    #[graphql(name = "reorderPoints", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::InventoryManager)).or(RoleGuard::new(UserRole::AccountManager))")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<reorder_points::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = reorder_points::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "reorderPoint", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::InventoryManager)).or(RoleGuard::new(UserRole::AccountManager))")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<reorder_points::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = reorder_points::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsReorderPointMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        reorder_points::Model,
        Uuid,
        InsertReorderPoint,
        UpdateReorderPoint,
    > for Mutations
{
    #[graphql(name = "createReorderPoint", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::InventoryManager)).or(RoleGuard::new(UserRole::AccountManager))")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertReorderPoint,
    ) -> async_graphql::Result<reorder_points::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateReorderPoint", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::InventoryManager)).or(RoleGuard::new(UserRole::AccountManager))")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateReorderPoint,
    ) -> async_graphql::Result<reorder_points::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteReorderPoint", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::InventoryManager)).or(RoleGuard::new(UserRole::AccountManager))")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = reorder_points::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find reorder_point"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete reorder_point"));
        }
        Ok(true)
    }
}
