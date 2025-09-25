use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::leads;

#[derive(Debug, Clone)]
pub struct Query;

#[Object(name = "CrmLeadsQuery")]
impl Query {
    async fn leads(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<leads::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, leads::Model>("select * from crm.leads limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn lead(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<leads::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, leads::Model>("select * from crm.leads where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
