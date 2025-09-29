use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::client_accounts;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "BillingClientAccountsQuery")]
impl Query {
    async fn client_accounts(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<client_accounts::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, client_accounts::Model>(
            "select * from billing.client_accounts limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn client_account(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<client_accounts::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, client_accounts::Model>("select * from billing.client_accounts where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
