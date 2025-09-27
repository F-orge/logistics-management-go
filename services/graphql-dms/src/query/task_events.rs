use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::task_events;

#[derive(Debug, Clone, Default)]

pub struct Query;

#[Object(name = "DmsTaskEventsQuery")]
impl Query {
    async fn task_events(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<task_events::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, task_events::Model>(
            "select * from crm.task_events limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }
    async fn task_event(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<task_events::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(
            sqlx::query_as::<_, task_events::Model>("select * from crm.task_events where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
