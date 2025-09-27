use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::models::customer_tracking_links;

#[derive(Debug, Clone, Default)]

pub struct Query;

#[Object(name = "DmsCustomerTrackingLinksQuery")]
impl Query {
    async fn customer_tracking_links(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<customer_tracking_links::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, customer_tracking_links::Model>(
            "select * from crm.customer_tracking_links limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }
    async fn customer_tracking_link(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<customer_tracking_links::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, customer_tracking_links::Model>(
            "select * from crm.customer_tracking_links where id = $1",
        )
        .bind(id)
        .fetch_optional(db)
        .await?)
    }
}
