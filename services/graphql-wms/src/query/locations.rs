use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::locations;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsLocationsQuery")]
impl Query {
    async fn locations(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<locations::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, locations::Model>("select * from wms.locations limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn location(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<locations::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, locations::Model>("select * from wms.locations where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
