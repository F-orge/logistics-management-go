use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::delivery_tasks,
    delivery_tasks::{InsertDeliveryTask, UpdateDeliveryTask},
};
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;

#[Object(name = "DeliveryTasks")]
impl graphql_core::traits::GraphqlQuery<delivery_tasks::Model, Uuid> for delivery_tasks::Entity {
    #[graphql(
        name = "deliveryTasks",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::LogisticsPlanner)).or(RoleGuard::new(UserRole::Driver)).or(RoleGuard::new(UserRole::LogisticsCoordinator))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<delivery_tasks::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = delivery_tasks::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(
        name = "deliveryTask",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::LogisticsPlanner)).or(RoleGuard::new(UserRole::Driver)).or(RoleGuard::new(UserRole::LogisticsCoordinator))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<delivery_tasks::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = delivery_tasks::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "DmsDeliveryTaskMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        delivery_tasks::Model,
        Uuid,
        InsertDeliveryTask,
        UpdateDeliveryTask,
    > for Mutations
{
    #[graphql(
        name = "createDeliveryTask",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::LogisticsPlanner))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertDeliveryTask,
    ) -> async_graphql::Result<delivery_tasks::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(
        name = "updateDeliveryTask",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::LogisticsPlanner)).or(RoleGuard::new(UserRole::Driver))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateDeliveryTask,
    ) -> async_graphql::Result<delivery_tasks::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(
        name = "deleteDeliveryTask",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Dispatcher))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = delivery_tasks::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find delivery_task"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete delivery_task"));
        }
        Ok(true)
    }
}
