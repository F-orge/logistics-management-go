use crate::entities::{
    _generated::notifications,
    notifications::{InsertNotification, UpdateNotification},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Notifications")]
impl GraphqlQuery<notifications::Model, Uuid> for notifications::Entity {
    #[graphql(name = "notifications")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<notifications::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let notifications = notifications::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(notifications)
    }
    #[graphql(name = "notification")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<notifications::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let notification = notifications::Entity::find_by_id(id).one(db).await?;
        Ok(notification)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmNotificationMutations")]
impl GraphqlMutation<notifications::Model, Uuid, InsertNotification, UpdateNotification>
    for Mutations
{
    #[graphql(name = "createNotification")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertNotification,
    ) -> async_graphql::Result<notifications::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_notification = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_notification)
    }
    #[graphql(name = "updateNotification")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateNotification,
    ) -> async_graphql::Result<notifications::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_notification = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_notification)
    }
    #[graphql(name = "deleteNotification")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let notification = notifications::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find notification"))?;
        let result = notification.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete notification"));
        }
        Ok(true)
    }
}
