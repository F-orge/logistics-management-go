use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::opportunities;

#[derive(Debug, Clone)]
pub struct Query;

#[Object(name = "CrmLeadsQuery")]
impl Query {

    async fn opportunities(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<opportunities::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "select * from crm.opportunities limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn opportunity(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<opportunities::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, opportunities::Model>("select * from crm.opportunities where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
