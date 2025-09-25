use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::campaigns;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "CrmCampaignsQuery")]
impl Query {
    async fn campaigns(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<campaigns::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, campaigns::Model>("select * from crm.campaigns limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn campaign(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<campaigns::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, campaigns::Model>("select * from crm.campaigns where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
