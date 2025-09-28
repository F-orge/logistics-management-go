use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::putaway_rules;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsPutawayRulesQuery")]
impl Query {
    async fn putaway_rules(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<putaway_rules::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, putaway_rules::Model>(
                "select * from wms.putaway_rules limit $1 offset $2",
            )
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await?,
        )
    }

    async fn putaway_rule(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<putaway_rules::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, putaway_rules::Model>(
                "select * from wms.putaway_rules where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}
