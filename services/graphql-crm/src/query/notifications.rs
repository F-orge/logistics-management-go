use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::notifications;

#[derive(Debug, Clone)]
pub struct Query;

#[Object(name = "CrmNotificationsQuery")]
impl Query {

    async fn notifications(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<notifications::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, notifications::Model>(
            "select * from crm.notifications limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn notification(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<notifications::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, notifications::Model>("select * from crm.notifications where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
