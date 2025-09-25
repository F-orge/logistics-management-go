use crate::entities::{
    _generated::task_items,
    task_items::{InsertTaskItem, UpdateTaskItem},
};
use async_graphql::Object;
use graphql_auth::guards::{RoleGuard, SystemGuard};
use graphql_auth::models::user::UserRole;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "TaskItems")]
impl graphql_core::traits::GraphqlQuery<task_items::Model, Uuid> for task_items::Entity {
    #[graphql(
        name = "taskItems",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager)).or(RoleGuard::new(UserRole::WarehouseOperator)).or(RoleGuard::new(UserRole::Picker)).or(RoleGuard::new(UserRole::Packer))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<task_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = task_items::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(
        name = "taskItem",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager)).or(RoleGuard::new(UserRole::WarehouseOperator)).or(RoleGuard::new(UserRole::Picker)).or(RoleGuard::new(UserRole::Packer))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<task_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = task_items::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "WmsTaskItemMutations")]
impl graphql_core::traits::GraphqlMutation<task_items::Model, Uuid, InsertTaskItem, UpdateTaskItem>
    for Mutations
{
    #[graphql(
        name = "createTaskItem",
        guard = "SystemGuard.or(RoleGuard::new(UserRole::Admin)).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertTaskItem,
    ) -> async_graphql::Result<task_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(
        name = "updateTaskItem",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager)).or(RoleGuard::new(UserRole::WarehouseOperator)).or(RoleGuard::new(UserRole::Picker)).or(RoleGuard::new(UserRole::Packer))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateTaskItem,
    ) -> async_graphql::Result<task_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(
        name = "deleteTaskItem",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = task_items::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find task_item"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete task_item"));
        }
        Ok(true)
    }
}
