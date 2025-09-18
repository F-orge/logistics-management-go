use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::task_events,
    task_events::{InsertTaskEvent, UpdateTaskEvent},
};
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;

#[Object(name = "TaskEvents")]
impl graphql_core::traits::GraphqlQuery<task_events::Model, Uuid> for task_events::Entity {
    #[graphql(
        name = "taskEvents",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::LogisticsPlanner)).or(RoleGuard::new(UserRole::Driver)).or(RoleGuard::new(UserRole::LogisticsCoordinator))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<task_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = task_events::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(
        name = "taskEvent",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::LogisticsPlanner)).or(RoleGuard::new(UserRole::Driver)).or(RoleGuard::new(UserRole::LogisticsCoordinator))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<task_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = task_events::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "DmsTaskEventMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        task_events::Model,
        Uuid,
        InsertTaskEvent,
        UpdateTaskEvent,
    > for Mutations
{
    #[graphql(
        name = "createTaskEvent",
        guard = "RoleGuard::new(UserRole::Driver).or(RoleGuard::new(UserRole::Admin)).or(RoleGuard::new(UserRole::Dispatcher))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertTaskEvent,
    ) -> async_graphql::Result<task_events::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateTaskEvent", guard = "RoleGuard::new(UserRole::Admin)")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateTaskEvent,
    ) -> async_graphql::Result<task_events::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteTaskEvent", guard = "RoleGuard::new(UserRole::Admin)")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = task_events::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find task_event"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete task_event"));
        }
        Ok(true)
    }
}
