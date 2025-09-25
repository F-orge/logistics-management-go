use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::companies;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "CrmCompaniesQuery")]
impl Query {
    async fn companies(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<companies::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, companies::Model>("select * from crm.companies limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn company(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<companies::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, companies::Model>("select * from crm.companies where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
