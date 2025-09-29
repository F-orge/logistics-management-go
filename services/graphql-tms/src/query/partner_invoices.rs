use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::partner_invoices;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "TmsPartnerInvoicesQuery")]
impl Query {
    async fn partner_invoices(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<partner_invoices::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, partner_invoices::Model>(
            "select * from tms.partner_invoices limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn partner_invoice(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<partner_invoices::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, partner_invoices::Model>(
            "select * from tms.partner_invoices where id = $1",
        )
        .bind(id)
        .fetch_optional(db)
        .await?)
    }
}
