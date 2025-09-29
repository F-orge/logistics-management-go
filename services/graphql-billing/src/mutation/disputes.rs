use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::{disputes, enums::DisputeStatusEnum};

#[derive(Debug, Clone, InputObject)]
pub struct CreateDisputeInput {
    pub line_item_id: Uuid,
    pub client_id: Uuid,
    pub reason: String,
    pub status: Option<DisputeStatusEnum>,
    pub disputed_amount: Option<f64>,
    pub resolution_notes: Option<String>,
    pub submitted_at: Option<DateTime<Utc>>,
    pub resolved_at: Option<DateTime<Utc>>,
    pub resolved_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, Default)]
pub struct DisputesMutation;

#[Object(name = "BillingDisputesMutation")]
impl DisputesMutation {
    async fn create_dispute(
        &self,
        ctx: &Context<'_>,
        payload: CreateDisputeInput,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, disputes::Model>(
            "insert into billing.disputes (line_item_id, client_id, reason, status, disputed_amount, resolution_notes, submitted_at, resolved_at, resolved_by_user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
        )
        .bind(payload.line_item_id)
        .bind(payload.client_id)
        .bind(payload.reason)
        .bind(payload.status)
        .bind(payload.disputed_amount)
        .bind(payload.resolution_notes)
        .bind(payload.submitted_at)
        .bind(payload.resolved_at)
        .bind(payload.resolved_by_user_id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_dispute_line_item_id(
        &self,
        ctx: &Context<'_>,
        line_item_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, disputes::Model>(
            "update billing.disputes set line_item_id = $1 where id = $2 returning *",
        )
        .bind(line_item_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_dispute_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, disputes::Model>(
            "update billing.disputes set client_id = $1 where id = $2 returning *",
        )
        .bind(client_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_dispute_reason(
        &self,
        ctx: &Context<'_>,
        reason: String,
        id: Uuid,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, disputes::Model>(
            "update billing.disputes set reason = $1 where id = $2 returning *",
        )
        .bind(reason)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_dispute_status(
        &self,
        ctx: &Context<'_>,
        status: DisputeStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, disputes::Model>(
            "update billing.disputes set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_dispute_disputed_amount(
        &self,
        ctx: &Context<'_>,
        disputed_amount: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, disputes::Model>(
            "update billing.disputes set disputed_amount = $1 where id = $2 returning *",
        )
        .bind(disputed_amount)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_dispute_resolution_notes(
        &self,
        ctx: &Context<'_>,
        resolution_notes: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, disputes::Model>(
            "update billing.disputes set resolution_notes = $1 where id = $2 returning *",
        )
        .bind(resolution_notes)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_dispute_submitted_at(
        &self,
        ctx: &Context<'_>,
        submitted_at: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, disputes::Model>(
            "update billing.disputes set submitted_at = $1 where id = $2 returning *",
        )
        .bind(submitted_at)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_dispute_resolved_at(
        &self,
        ctx: &Context<'_>,
        resolved_at: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, disputes::Model>(
            "update billing.disputes set resolved_at = $1 where id = $2 returning *",
        )
        .bind(resolved_at)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_dispute_resolved_by_user_id(
        &self,
        ctx: &Context<'_>,
        resolved_by_user_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, disputes::Model>(
            "update billing.disputes set resolved_by_user_id = $1 where id = $2 returning *",
        )
        .bind(resolved_by_user_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_dispute(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.disputes where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove dispute"));
        }

        Ok("Dispute removed successfully".into())
    }
}
