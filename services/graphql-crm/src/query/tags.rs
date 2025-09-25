use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::tags;

#[derive(Debug, Clone)]
pub struct Query;

#[Object(name = "CrmTagsQuery")]
impl Query {
    async fn tags(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<tags::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, tags::Model>("select * from crm.tags limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn tag(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Option<tags::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, tags::Model>("select * from crm.tags where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
