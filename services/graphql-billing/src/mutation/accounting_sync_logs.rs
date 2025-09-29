use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::{accounting_sync_log, enums::SyncStatusEnum};

#[derive(Debug, Clone, InputObject)]
pub struct CreateAccountingSyncLogInput {
    pub record_id: Uuid,
    pub record_type: String,
    pub external_system: String,
    pub external_id: Option<String>,
    pub status: Option<SyncStatusEnum>,
    pub error_message: Option<String>,
    pub request_payload: Option<String>,
    pub response_payload: Option<String>,
    pub last_sync_at: Option<DateTime<Utc>>,
    pub retry_count: Option<i32>,
    pub next_retry_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Default)]
pub struct AccountingSyncLogsMutation;

#[Object(name = "BillingAccountingSyncLogsMutation")]
impl AccountingSyncLogsMutation {
    async fn create_accounting_sync_log(
        &self,
        ctx: &Context<'_>,
        payload: CreateAccountingSyncLogInput,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "insert into billing.accounting_sync_log (record_id, record_type, external_system, external_id, status, error_message, request_payload, response_payload, last_sync_at, retry_count, next_retry_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *",
        )
        .bind(payload.record_id)
        .bind(payload.record_type)
        .bind(payload.external_system)
        .bind(payload.external_id)
        .bind(payload.status)
        .bind(payload.error_message)
        .bind(payload.request_payload)
        .bind(payload.response_payload)
        .bind(payload.last_sync_at)
        .bind(payload.retry_count)
        .bind(payload.next_retry_at)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_record_id(
        &self,
        ctx: &Context<'_>,
        record_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set record_id = $1 where id = $2 returning *",
        )
        .bind(record_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_record_type(
        &self,
        ctx: &Context<'_>,
        record_type: String,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set record_type = $1 where id = $2 returning *",
        )
        .bind(record_type)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_external_system(
        &self,
        ctx: &Context<'_>,
        external_system: String,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set external_system = $1 where id = $2 returning *",
        )
        .bind(external_system)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_external_id(
        &self,
        ctx: &Context<'_>,
        external_id: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set external_id = $1 where id = $2 returning *",
        )
        .bind(external_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_status(
        &self,
        ctx: &Context<'_>,
        status: SyncStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_error_message(
        &self,
        ctx: &Context<'_>,
        error_message: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set error_message = $1 where id = $2 returning *",
        )
        .bind(error_message)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_request_payload(
        &self,
        ctx: &Context<'_>,
        request_payload: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set request_payload = $1 where id = $2 returning *",
        )
        .bind(request_payload)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_response_payload(
        &self,
        ctx: &Context<'_>,
        response_payload: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set response_payload = $1 where id = $2 returning *",
        )
        .bind(response_payload)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_last_sync_at(
        &self,
        ctx: &Context<'_>,
        last_sync_at: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set last_sync_at = $1 where id = $2 returning *",
        )
        .bind(last_sync_at)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_retry_count(
        &self,
        ctx: &Context<'_>,
        retry_count: Option<i32>,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set retry_count = $1 where id = $2 returning *",
        )
        .bind(retry_count)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_accounting_sync_log_next_retry_at(
        &self,
        ctx: &Context<'_>,
        next_retry_at: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, accounting_sync_log::Model>(
            "update billing.accounting_sync_log set next_retry_at = $1 where id = $2 returning *",
        )
        .bind(next_retry_at)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_accounting_sync_log(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.accounting_sync_log where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to remove accounting sync log",
            ));
        }

        Ok("Accounting sync log removed successfully".into())
    }
}
