use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::delivery_tasks;

#[derive(Debug, Clone, Default)]

pub struct Query;

#[Object(name = "DmsDeliveryTasksQuery")]
impl Query {
    async fn delivery_tasks(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<delivery_tasks::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, delivery_tasks::Model>(
            "select * from crm.delivery_tasks limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }
    async fn delivery_task(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<delivery_tasks::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, delivery_tasks::Model>(
            "select * from crm.delivery_tasks where id = $1",
        )
        .bind(id)
        .fetch_optional(db)
        .await?)
    }
}
