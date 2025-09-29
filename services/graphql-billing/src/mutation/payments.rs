use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::{
    enums::{PaymentMethodEnum, PaymentStatusEnum},
    payments,
};

#[derive(Debug, Clone, InputObject)]
pub struct CreatePaymentInput {
    pub invoice_id: Uuid,
    pub amount: f64,
    pub payment_method: PaymentMethodEnum,
    pub transaction_id: Option<String>,
    pub gateway_reference: Option<String>,
    pub status: Option<PaymentStatusEnum>,
    pub payment_date: Option<DateTime<Utc>>,
    pub processed_at: Option<DateTime<Utc>>,
    pub currency: Option<String>,
    pub exchange_rate: Option<f64>,
    pub fees: Option<f64>,
    pub notes: Option<String>,
    pub processed_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, Default)]
pub struct PaymentsMutation;

#[Object(name = "BillingPaymentsMutation")]
impl PaymentsMutation {
    async fn create_payment(
        &self,
        ctx: &Context<'_>,
        payload: CreatePaymentInput,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "insert into billing.payments (invoice_id, amount, payment_method, transaction_id, gateway_reference, status, payment_date, processed_at, currency, exchange_rate, fees, notes, processed_by_user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *",
        )
        .bind(payload.invoice_id)
        .bind(payload.amount)
        .bind(payload.payment_method)
        .bind(payload.transaction_id)
        .bind(payload.gateway_reference)
        .bind(payload.status)
        .bind(payload.payment_date)
        .bind(payload.processed_at)
        .bind(payload.currency)
        .bind(payload.exchange_rate)
        .bind(payload.fees)
        .bind(payload.notes)
        .bind(payload.processed_by_user_id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_invoice_id(
        &self,
        ctx: &Context<'_>,
        invoice_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set invoice_id = $1 where id = $2 returning *",
        )
        .bind(invoice_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_amount(
        &self,
        ctx: &Context<'_>,
        amount: f64,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set amount = $1 where id = $2 returning *",
        )
        .bind(amount)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_payment_method(
        &self,
        ctx: &Context<'_>,
        payment_method: PaymentMethodEnum,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set payment_method = $1 where id = $2 returning *",
        )
        .bind(payment_method)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_transaction_id(
        &self,
        ctx: &Context<'_>,
        transaction_id: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set transaction_id = $1 where id = $2 returning *",
        )
        .bind(transaction_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_gateway_reference(
        &self,
        ctx: &Context<'_>,
        gateway_reference: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set gateway_reference = $1 where id = $2 returning *",
        )
        .bind(gateway_reference)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_status(
        &self,
        ctx: &Context<'_>,
        status: PaymentStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_payment_date(
        &self,
        ctx: &Context<'_>,
        payment_date: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set payment_date = $1 where id = $2 returning *",
        )
        .bind(payment_date)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_processed_at(
        &self,
        ctx: &Context<'_>,
        processed_at: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set processed_at = $1 where id = $2 returning *",
        )
        .bind(processed_at)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_currency(
        &self,
        ctx: &Context<'_>,
        currency: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set currency = $1 where id = $2 returning *",
        )
        .bind(currency)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_exchange_rate(
        &self,
        ctx: &Context<'_>,
        exchange_rate: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set exchange_rate = $1 where id = $2 returning *",
        )
        .bind(exchange_rate)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_fees(
        &self,
        ctx: &Context<'_>,
        fees: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set fees = $1 where id = $2 returning *",
        )
        .bind(fees)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_notes(
        &self,
        ctx: &Context<'_>,
        notes: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set notes = $1 where id = $2 returning *",
        )
        .bind(notes)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_payment_processed_by_user_id(
        &self,
        ctx: &Context<'_>,
        processed_by_user_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<payments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, payments::Model>(
            "update billing.payments set processed_by_user_id = $1 where id = $2 returning *",
        )
        .bind(processed_by_user_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_payment(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.payments where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove payment"));
        }

        Ok("Payment removed successfully".into())
    }
}
