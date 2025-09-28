use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::tasks;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsTasksQuery")]
impl Query {
    async fn tasks(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<tasks::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, tasks::Model>(
                "select * from wms.tasks limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn task(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<tasks::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, tasks::Model>(
                "select * from wms.tasks where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}
