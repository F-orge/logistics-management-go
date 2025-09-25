use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::contacts;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "CrmContactsQuery")]
impl Query {
    async fn contacts(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<contacts::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, contacts::Model>("select * from crm.contacts limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn contact(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<contacts::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, contacts::Model>("select * from crm.contacts where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
