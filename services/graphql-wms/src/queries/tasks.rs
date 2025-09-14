use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel, ModelTrait, TransactionTrait};
use uuid::Uuid;
use crate::entities::{_generated::tasks, tasks::{InsertTask, UpdateTask}};

#[Object(name = "Tasks")]
impl graphql_core::traits::GraphqlQuery<tasks::Model, Uuid> for tasks::Entity {
    #[graphql(name = "tasks")]
    async fn list(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Vec<tasks::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = tasks::Entity::find().all(db).await.unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "task")]
    async fn view(&self, ctx: &async_graphql::Context<'_>, id: Uuid) -> async_graphql::Result<Option<tasks::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = tasks::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "WmsTaskMutations")]
impl graphql_core::traits::GraphqlMutation<tasks::Model, Uuid, InsertTask, UpdateTask> for Mutations {
    #[graphql(name = "createTask")]
    async fn create(&self, ctx: &async_graphql::Context<'_>, value: InsertTask) -> async_graphql::Result<tasks::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateTask")]
    async fn update(&self, ctx: &async_graphql::Context<'_>, id: Uuid, value: UpdateTask) -> async_graphql::Result<tasks::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteTask")]
    async fn delete(&self, ctx: &async_graphql::Context<'_>, id: Uuid) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = tasks::Entity::find_by_id(id).one(&trx).await?.ok_or(async_graphql::Error::new("Unable to find task"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete task"));
        }
        Ok(true)
    }
}
