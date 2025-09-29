use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::{enums::QuoteStatusEnum, quotes};

#[derive(Debug, Clone, InputObject)]
pub struct CreateQuoteInput {
    pub client_id: Option<Uuid>,
    pub origin_details: String,
    pub destination_details: String,
    pub weight: Option<f64>,
    pub length: Option<f64>,
    pub width: Option<f64>,
    pub height: Option<f64>,
    pub quoted_price: f64,
    pub service_level: Option<String>,
    pub expires_at: Option<DateTime<Utc>>,
    pub status: Option<QuoteStatusEnum>,
    pub quote_number: Option<String>,
    pub notes: Option<String>,
    pub created_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, Default)]
pub struct QuotesMutation;

#[Object(name = "BillingQuotesMutation")]
impl QuotesMutation {
    async fn create_quote(
        &self,
        ctx: &Context<'_>,
        payload: CreateQuoteInput,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "insert into billing.quotes (client_id, origin_details, destination_details, weight, length, width, height, quoted_price, service_level, expires_at, status, quote_number, notes, created_by_user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *",
        )
        .bind(payload.client_id)
        .bind(payload.origin_details)
        .bind(payload.destination_details)
        .bind(payload.weight)
        .bind(payload.length)
        .bind(payload.width)
        .bind(payload.height)
        .bind(payload.quoted_price)
        .bind(payload.service_level)
        .bind(payload.expires_at)
        .bind(payload.status)
        .bind(payload.quote_number)
        .bind(payload.notes)
        .bind(payload.created_by_user_id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set client_id = $1 where id = $2 returning *",
        )
        .bind(client_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_origin_details(
        &self,
        ctx: &Context<'_>,
        origin_details: String,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set origin_details = $1 where id = $2 returning *",
        )
        .bind(origin_details)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_destination_details(
        &self,
        ctx: &Context<'_>,
        destination_details: String,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set destination_details = $1 where id = $2 returning *",
        )
        .bind(destination_details)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_weight(
        &self,
        ctx: &Context<'_>,
        weight: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set weight = $1 where id = $2 returning *",
        )
        .bind(weight)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_length(
        &self,
        ctx: &Context<'_>,
        length: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set length = $1 where id = $2 returning *",
        )
        .bind(length)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_width(
        &self,
        ctx: &Context<'_>,
        width: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set width = $1 where id = $2 returning *",
        )
        .bind(width)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_height(
        &self,
        ctx: &Context<'_>,
        height: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set height = $1 where id = $2 returning *",
        )
        .bind(height)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_quoted_price(
        &self,
        ctx: &Context<'_>,
        quoted_price: f64,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set quoted_price = $1 where id = $2 returning *",
        )
        .bind(quoted_price)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_service_level(
        &self,
        ctx: &Context<'_>,
        service_level: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set service_level = $1 where id = $2 returning *",
        )
        .bind(service_level)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_expires_at(
        &self,
        ctx: &Context<'_>,
        expires_at: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set expires_at = $1 where id = $2 returning *",
        )
        .bind(expires_at)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_status(
        &self,
        ctx: &Context<'_>,
        status: QuoteStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_quote_number(
        &self,
        ctx: &Context<'_>,
        quote_number: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set quote_number = $1 where id = $2 returning *",
        )
        .bind(quote_number)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_notes(
        &self,
        ctx: &Context<'_>,
        notes: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set notes = $1 where id = $2 returning *",
        )
        .bind(notes)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_quote_created_by_user_id(
        &self,
        ctx: &Context<'_>,
        created_by_user_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<quotes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, quotes::Model>(
            "update billing.quotes set created_by_user_id = $1 where id = $2 returning *",
        )
        .bind(created_by_user_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_quote(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.quotes where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove quote"));
        }

        Ok("Quote removed successfully".into())
    }
}
