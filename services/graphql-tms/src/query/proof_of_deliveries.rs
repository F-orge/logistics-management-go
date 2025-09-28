use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::proof_of_deliveries;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsProofOfDeliveriesQuery")]
impl Query {
    async fn proof_of_deliveries(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<proof_of_deliveries::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, proof_of_deliveries::Model>(
            "select * from tms.proof_of_deliveries limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn proof_of_delivery(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<proof_of_deliveries::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, proof_of_deliveries::Model>("select * from tms.proof_of_deliveries where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
