use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, NaiveDate, Utc};
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::enums::{InvoiceStatus, PaymentMethod};
use crate::models::invoices;

#[derive(Debug, Clone, InputObject)]
pub struct CreateInvoiceInput {
    pub opportunity_id: Option<Uuid>,
    pub status: Option<InvoiceStatus>,
    pub total: Option<Decimal>,
    pub issue_date: Option<NaiveDate>,
    pub due_date: Option<NaiveDate>,
    pub sent_at: Option<DateTime<Utc>>,
    pub paid_at: Option<DateTime<Utc>>,
    pub payment_method: Option<PaymentMethod>,
    pub items: Vec<CreateInvoiceItemInput>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateInvoiceItemInput {
    pub quantity: i32,
    pub price: Decimal,
    pub product_id: Uuid,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "CrmInvoicesMutations")]
impl Mutation {
    async fn create_invoice(
        &self,
        ctx: &Context<'_>,
        payload: CreateInvoiceInput,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, invoices::Model>(
            "insert into crm.invoices (opportunity_id, status, total, issue_date, due_date, sent_at, paid_at, payment_method) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *"
        )
        .bind(payload.opportunity_id)
        .bind(payload.status)
        .bind(payload.total)
        .bind(payload.issue_date)
        .bind(payload.due_date)
        .bind(payload.sent_at)
        .bind(payload.paid_at)
        .bind(payload.payment_method)
        .fetch_one(db)
        .await?)
    }
    async fn update_invoice_opportunity_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        opportunity_id: Option<Uuid>,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, invoices::Model>(
            "update crm.invoices set opportunity_id = $1 where id = $2 returning *",
        )
        .bind(opportunity_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_invoice_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: Option<InvoiceStatus>,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, invoices::Model>(
            "update crm.invoices set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_invoice_total(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        total: Option<Decimal>,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, invoices::Model>(
            "update crm.invoices set total = $1 where id = $2 returning *",
        )
        .bind(total)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_invoice_issue_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        issue_date: Option<NaiveDate>,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, invoices::Model>(
            "update crm.invoices set issue_date = $1 where id = $2 returning *",
        )
        .bind(issue_date)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_invoice_due_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        due_date: Option<NaiveDate>,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, invoices::Model>(
            "update crm.invoices set due_date = $1 where id = $2 returning *",
        )
        .bind(due_date)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_invoice_sent_at(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        sent_at: Option<DateTime<Utc>>,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, invoices::Model>(
            "update crm.invoices set sent_at = $1 where id = $2 returning *",
        )
        .bind(sent_at)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_invoice_paid_at(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        paid_at: Option<DateTime<Utc>>,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, invoices::Model>(
            "update crm.invoices set paid_at = $1 where id = $2 returning *",
        )
        .bind(paid_at)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_invoice_payment_method(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payment_method: Option<PaymentMethod>,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, invoices::Model>(
            "update crm.invoices set payment_method = $1 where id = $2 returning *",
        )
        .bind(payment_method)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn add_invoice_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateInvoiceItemInput,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }

    async fn remove_invoice_item(
        &self,
        ctx: &Context<'_>,
        item_id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }

    async fn remove_invoice(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from crm.invoices where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete invoice"));
        }
        Ok("Invoice removed successfully".into())
    }
}
