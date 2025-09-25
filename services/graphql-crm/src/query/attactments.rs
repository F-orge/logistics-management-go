use async_graphql::{Context, Object};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::attachments;

#[derive(Debug, Clone, Default)]
pub struct Query;

#[Object(name = "CrmAttachmentsQuery")]
impl Query {
    async fn attachments(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<attachments::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, attachments::Model>(
            "select * from crm.attachments limit $1 offset $2",
        )
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }

    async fn attachment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<attachments::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(
            sqlx::query_as::<_, attachments::Model>("select * from crm.attachments where id = $1")
                .bind(id)
                .fetch_optional(db)
                .await?,
        )
    }
}
