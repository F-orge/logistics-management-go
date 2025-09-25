use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::cases;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "CrmCasesQuery")]
impl Query {
    async fn cases(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<cases::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, cases::Model>("select * from crm.cases limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn case(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<cases::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, cases::Model>("select * from crm.cases where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
