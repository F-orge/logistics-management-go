use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::interactions;

#[derive(Debug, Clone)]
pub struct Query;

#[Object(name = "CrmInteractionsQuery")]
impl Query {

    async fn interactions(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<interactions::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, interactions::Model>(
            "select * from crm.interactions limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn interaction(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<interactions::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, interactions::Model>("select * from crm.interactions where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
