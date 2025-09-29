use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::rate_cards;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "BillingRateCardsQuery")]
impl Query {
    async fn rate_cards(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<rate_cards::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, rate_cards::Model>(
            "select * from billing.rate_cards limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn rate_card(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<rate_cards::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, rate_cards::Model>("select * from billing.rate_cards where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
