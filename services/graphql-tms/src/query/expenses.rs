use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::expenses;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsExpensesQuery")]
impl Query {
    async fn expenses(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<expenses::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, expenses::Model>("select * from tms.expenses limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn expense(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<expenses::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, expenses::Model>("select * from tms.expenses where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
