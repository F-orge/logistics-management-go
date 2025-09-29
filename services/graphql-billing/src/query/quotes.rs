use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::quotes;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "BillingQuotesQuery")]
impl Query {
    async fn quotes(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<quotes::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, quotes::Model>(
            "select * from billing.quotes limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn quote(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<quotes::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, quotes::Model>("select * from billing.quotes where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
