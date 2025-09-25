use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::notifications;

#[derive(Debug, Clone, InputObject)]
pub struct CreateNotificationInput {
    pub user_id: Uuid,
    pub message: String,
    pub is_read: Option<bool>,
    pub link: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "CrmNotificationsMutations")]
impl Mutation {
    async fn create_notification(
        &self,
        ctx: &Context<'_>,
        payload: CreateNotificationInput,
    ) -> async_graphql::Result<notifications::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, notifications::Model>(
            "insert into crm.notifications (user_id, message, is_read, link) values ($1,$2,$3,$4) returning *"
        )
        .bind(payload.user_id)
        .bind(payload.message)
        .bind(payload.is_read)
        .bind(payload.link)
        .fetch_one(db)
        .await?)
    }
    async fn update_notification_user_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        user_id: Uuid,
    ) -> async_graphql::Result<notifications::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, notifications::Model>(
            "update crm.notifications set user_id = $1 where id = $2 returning *",
        )
        .bind(user_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_notification_message(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        message: String,
    ) -> async_graphql::Result<notifications::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, notifications::Model>(
            "update crm.notifications set message = $1 where id = $2 returning *",
        )
        .bind(message)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_notification_is_read(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        is_read: Option<bool>,
    ) -> async_graphql::Result<notifications::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, notifications::Model>(
            "update crm.notifications set is_read = $1 where id = $2 returning *",
        )
        .bind(is_read)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_notification_link(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        link: Option<String>,
    ) -> async_graphql::Result<notifications::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, notifications::Model>(
            "update crm.notifications set link = $1 where id = $2 returning *",
        )
        .bind(link)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn remove_notification(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from crm.notifications where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete notification"));
        }
        Ok("Notification removed successfully".into())
    }
}
