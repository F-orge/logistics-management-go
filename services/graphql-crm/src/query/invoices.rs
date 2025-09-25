use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::invoices;

#[derive(Debug, Clone)]
pub struct Query;

#[Object(name = "CrmInvoicesQuery")]
impl Query {
    async fn invoices(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<invoices::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from crm.invoices limit $1 offset $2")
                .bind(limit as i64)
                .bind((page * limit) as i64)
                .fetch_all(db)
                .await?,
        )
    }

    async fn invoice(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<invoices::Model>> {
        let db = ctx.data::<PgPool>()?;
        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from crm.invoices where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
