use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::sales_orders;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "WmsSalesOrdersQuery")]
impl Query {
    async fn sales_orders(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<sales_orders::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, sales_orders::Model>(
            "select * from wms.sales_orders limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn sales_order(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<sales_orders::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, sales_orders::Model>(
                "select * from wms.sales_orders where id = $1",
            )
            .bind(id)
            .fetch_optional(db)
            .await?,
        )
    }
}
