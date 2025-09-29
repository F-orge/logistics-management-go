use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, NaiveDate, Utc};
use uuid::Uuid;

use crate::models::credit_notes;

#[derive(Debug, Clone, InputObject)]
pub struct CreateCreditNoteInput {
    pub invoice_id: Uuid,
    pub dispute_id: Option<Uuid>,
    pub credit_note_number: String,
    pub amount: f64,
    pub reason: String,
    pub issue_date: NaiveDate,
    pub applied_at: Option<DateTime<Utc>>,
    pub currency: Option<String>,
    pub notes: Option<String>,
    pub created_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, Default)]
pub struct CreditNotesMutation;

#[Object(name = "BillingCreditNotesMutation")]
impl CreditNotesMutation {
    async fn create_credit_note(
        &self,
        ctx: &Context<'_>,
        payload: CreateCreditNoteInput,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "insert into billing.credit_notes (invoice_id, dispute_id, credit_note_number, amount, reason, issue_date, applied_at, currency, notes, created_by_user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *",
        )
        .bind(payload.invoice_id)
        .bind(payload.dispute_id)
        .bind(payload.credit_note_number)
        .bind(payload.amount)
        .bind(payload.reason)
        .bind(payload.issue_date)
        .bind(payload.applied_at)
        .bind(payload.currency)
        .bind(payload.notes)
        .bind(payload.created_by_user_id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_credit_note_invoice_id(
        &self,
        ctx: &Context<'_>,
        invoice_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "update billing.credit_notes set invoice_id = $1 where id = $2 returning *",
        )
        .bind(invoice_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_credit_note_dispute_id(
        &self,
        ctx: &Context<'_>,
        dispute_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "update billing.credit_notes set dispute_id = $1 where id = $2 returning *",
        )
        .bind(dispute_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_credit_note_credit_note_number(
        &self,
        ctx: &Context<'_>,
        credit_note_number: String,
        id: Uuid,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "update billing.credit_notes set credit_note_number = $1 where id = $2 returning *",
        )
        .bind(credit_note_number)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_credit_note_amount(
        &self,
        ctx: &Context<'_>,
        amount: f64,
        id: Uuid,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "update billing.credit_notes set amount = $1 where id = $2 returning *",
        )
        .bind(amount)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_credit_note_reason(
        &self,
        ctx: &Context<'_>,
        reason: String,
        id: Uuid,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "update billing.credit_notes set reason = $1 where id = $2 returning *",
        )
        .bind(reason)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_credit_note_issue_date(
        &self,
        ctx: &Context<'_>,
        issue_date: NaiveDate,
        id: Uuid,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "update billing.credit_notes set issue_date = $1 where id = $2 returning *",
        )
        .bind(issue_date)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_credit_note_applied_at(
        &self,
        ctx: &Context<'_>,
        applied_at: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "update billing.credit_notes set applied_at = $1 where id = $2 returning *",
        )
        .bind(applied_at)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_credit_note_currency(
        &self,
        ctx: &Context<'_>,
        currency: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "update billing.credit_notes set currency = $1 where id = $2 returning *",
        )
        .bind(currency)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_credit_note_notes(
        &self,
        ctx: &Context<'_>,
        notes: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "update billing.credit_notes set notes = $1 where id = $2 returning *",
        )
        .bind(notes)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_credit_note_created_by_user_id(
        &self,
        ctx: &Context<'_>,
        created_by_user_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<credit_notes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, credit_notes::Model>(
            "update billing.credit_notes set created_by_user_id = $1 where id = $2 returning *",
        )
        .bind(created_by_user_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_credit_note(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.credit_notes where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove credit note"));
        }

        Ok("Credit note removed successfully".into())
    }
}
