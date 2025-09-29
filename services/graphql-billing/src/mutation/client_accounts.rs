use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use uuid::Uuid;

use crate::models::client_accounts;

#[derive(Debug, Clone, InputObject)]
pub struct CreateClientAccountInput {
    pub client_id: Uuid,
    pub credit_limit: Option<f64>,
    pub available_credit: Option<f64>,
    pub wallet_balance: Option<f64>,
    pub currency: Option<String>,
    pub payment_terms_days: Option<i32>,
    pub is_credit_approved: Option<bool>,
    pub last_payment_date: Option<NaiveDate>,
}

#[derive(Debug, Clone, Default)]
pub struct ClientAccountsMutation;

#[Object(name = "BillingClientAccountsMutation")]
impl ClientAccountsMutation {
    async fn create_client_account(
        &self,
        ctx: &Context<'_>,
        payload: CreateClientAccountInput,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, client_accounts::Model>(
            "insert into billing.client_accounts (client_id, credit_limit, available_credit, wallet_balance, currency, payment_terms_days, is_credit_approved, last_payment_date) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
        )
        .bind(payload.client_id)
        .bind(payload.credit_limit)
        .bind(payload.available_credit)
        .bind(payload.wallet_balance)
        .bind(payload.currency)
        .bind(payload.payment_terms_days)
        .bind(payload.is_credit_approved)
        .bind(payload.last_payment_date)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_client_account_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, client_accounts::Model>(
            "update billing.client_accounts set client_id = $1 where id = $2 returning *",
        )
        .bind(client_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_client_account_credit_limit(
        &self,
        ctx: &Context<'_>,
        credit_limit: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, client_accounts::Model>(
            "update billing.client_accounts set credit_limit = $1 where id = $2 returning *",
        )
        .bind(credit_limit)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_client_account_available_credit(
        &self,
        ctx: &Context<'_>,
        available_credit: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, client_accounts::Model>(
            "update billing.client_accounts set available_credit = $1 where id = $2 returning *",
        )
        .bind(available_credit)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_client_account_wallet_balance(
        &self,
        ctx: &Context<'_>,
        wallet_balance: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, client_accounts::Model>(
            "update billing.client_accounts set wallet_balance = $1 where id = $2 returning *",
        )
        .bind(wallet_balance)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_client_account_currency(
        &self,
        ctx: &Context<'_>,
        currency: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, client_accounts::Model>(
            "update billing.client_accounts set currency = $1 where id = $2 returning *",
        )
        .bind(currency)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_client_account_payment_terms_days(
        &self,
        ctx: &Context<'_>,
        payment_terms_days: Option<i32>,
        id: Uuid,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, client_accounts::Model>(
            "update billing.client_accounts set payment_terms_days = $1 where id = $2 returning *",
        )
        .bind(payment_terms_days)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_client_account_is_credit_approved(
        &self,
        ctx: &Context<'_>,
        is_credit_approved: Option<bool>,
        id: Uuid,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, client_accounts::Model>(
            "update billing.client_accounts set is_credit_approved = $1 where id = $2 returning *",
        )
        .bind(is_credit_approved)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_client_account_last_payment_date(
        &self,
        ctx: &Context<'_>,
        last_payment_date: Option<NaiveDate>,
        id: Uuid,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, client_accounts::Model>(
            "update billing.client_accounts set last_payment_date = $1 where id = $2 returning *",
        )
        .bind(last_payment_date)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_client_account(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.client_accounts where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove client account"));
        }

        Ok("Client account removed successfully".into())
    }
}
