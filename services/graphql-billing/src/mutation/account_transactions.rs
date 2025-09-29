use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::{account_transactions, enums::TransactionTypeEnum};

#[derive(Debug, Clone, InputObject)]
pub struct CreateAccountTransactionInput {
    pub client_account_id: Uuid,
    pub r#type: TransactionTypeEnum,
    pub amount: f64,
    pub running_balance: Option<f64>,
    pub source_record_id: Option<Uuid>,
    pub source_record_type: Option<String>,
    pub description: Option<String>,
    pub reference_number: Option<String>,
    pub transaction_date: Option<DateTime<Utc>>,
    pub processed_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, Default)]
pub struct AccountTransactionsMutation;

#[Object(name = "BillingAccountTransactionsMutation")]
impl AccountTransactionsMutation {
    async fn create_account_transaction(
        &self,
        ctx: &Context<'_>,
        payload: CreateAccountTransactionInput,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "insert into billing.account_transactions (client_account_id, type, amount, running_balance, source_record_id, source_record_type, description, reference_number, transaction_date, processed_by_user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *",
        )
        .bind(payload.client_account_id)
        .bind(payload.r#type)
        .bind(payload.amount)
        .bind(payload.running_balance)
        .bind(payload.source_record_id)
        .bind(payload.source_record_type)
        .bind(payload.description)
        .bind(payload.reference_number)
        .bind(payload.transaction_date)
        .bind(payload.processed_by_user_id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_account_transaction_client_account_id(
        &self,
        ctx: &Context<'_>,
        client_account_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "update billing.account_transactions set client_account_id = $1 where id = $2 returning *",
        )
        .bind(client_account_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_account_transaction_type(
        &self,
        ctx: &Context<'_>,
        r#type: TransactionTypeEnum,
        id: Uuid,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "update billing.account_transactions set type = $1 where id = $2 returning *",
        )
        .bind(r#type)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_account_transaction_amount(
        &self,
        ctx: &Context<'_>,
        amount: f64,
        id: Uuid,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "update billing.account_transactions set amount = $1 where id = $2 returning *",
        )
        .bind(amount)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_account_transaction_running_balance(
        &self,
        ctx: &Context<'_>,
        running_balance: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "update billing.account_transactions set running_balance = $1 where id = $2 returning *",
        )
        .bind(running_balance)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_account_transaction_source_record_id(
        &self,
        ctx: &Context<'_>,
        source_record_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "update billing.account_transactions set source_record_id = $1 where id = $2 returning *",
        )
        .bind(source_record_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_account_transaction_source_record_type(
        &self,
        ctx: &Context<'_>,
        source_record_type: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "update billing.account_transactions set source_record_type = $1 where id = $2 returning *",
        )
        .bind(source_record_type)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_account_transaction_description(
        &self,
        ctx: &Context<'_>,
        description: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "update billing.account_transactions set description = $1 where id = $2 returning *",
        )
        .bind(description)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_account_transaction_reference_number(
        &self,
        ctx: &Context<'_>,
        reference_number: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "update billing.account_transactions set reference_number = $1 where id = $2 returning *",
        )
        .bind(reference_number)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_account_transaction_transaction_date(
        &self,
        ctx: &Context<'_>,
        transaction_date: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "update billing.account_transactions set transaction_date = $1 where id = $2 returning *",
        )
        .bind(transaction_date)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_account_transaction_processed_by_user_id(
        &self,
        ctx: &Context<'_>,
        processed_by_user_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, account_transactions::Model>(
            "update billing.account_transactions set processed_by_user_id = $1 where id = $2 returning *",
        )
        .bind(processed_by_user_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_account_transaction(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.account_transactions where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to remove account transaction",
            ));
        }

        Ok("Account transaction removed successfully".into())
    }
}
