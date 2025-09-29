use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, NaiveDate, Utc};
use sqlx::Row;
use uuid::Uuid;

use crate::models::{enums::InvoiceStatusEnum, invoices};

#[derive(Debug, Clone, InputObject)]
pub struct CreateBillingInvoiceInput {
    pub client_id: Uuid,
    pub quote_id: Option<Uuid>,
    pub invoice_number: String,
    pub status: Option<InvoiceStatusEnum>,
    pub issue_date: NaiveDate,
    pub due_date: NaiveDate,
    pub total_amount: f64,
    pub amount_paid: Option<f64>,
    pub currency: Option<String>,
    pub tax_amount: Option<f64>,
    pub discount_amount: Option<f64>,
    pub subtotal: Option<f64>,
    pub payment_terms: Option<String>,
    pub notes: Option<String>,
    pub sent_at: Option<DateTime<Utc>>,
    pub paid_at: Option<DateTime<Utc>>,
    pub created_by_user_id: Option<Uuid>,
    pub items: Vec<CreateBillingInvoiceLineItemInput>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateBillingInvoiceLineItemInput {
    pub product_id: Uuid,
    pub source_record_id: Option<Uuid>,
    pub source_record_type: Option<String>,
    pub description: String,
    pub quantity: f64,
    pub unit_price: f64,
    pub tax_rate: Option<f64>,
    pub discount_rate: Option<f64>,
}

#[derive(Debug, Clone, Default)]
pub struct InvoicesMutation;

#[Object(name = "BillingInvoicesMutation")]
impl InvoicesMutation {
    async fn create_invoice(
        &self,
        ctx: &Context<'_>,
        payload: CreateBillingInvoiceInput,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "insert into billing.invoices (client_id, quote_id, invoice_number, status, issue_date, due_date, total_amount, amount_paid, currency, tax_amount, discount_amount, subtotal, payment_terms, notes, sent_at, paid_at, created_by_user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning *",
        )
        .bind(payload.client_id)
        .bind(payload.quote_id)
        .bind(payload.invoice_number)
        .bind(payload.status)
        .bind(payload.issue_date)
        .bind(payload.due_date)
        .bind(payload.total_amount)
        .bind(payload.amount_paid)
        .bind(payload.currency)
        .bind(payload.tax_amount)
        .bind(payload.discount_amount)
        .bind(payload.subtotal)
        .bind(payload.payment_terms)
        .bind(payload.notes)
        .bind(payload.sent_at)
        .bind(payload.paid_at)
        .bind(payload.created_by_user_id)
        .fetch_one(&mut *trx)
        .await?;

        for item in payload.items {
            _ = sqlx::query("insert into billing.invoice_line_items (invoice_id, product_id, source_record_id, source_record_type, description, quantity, unit_price, tax_rate, discount_rate) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *")
            .bind(result.id.clone())
            .bind(item.product_id)
            .bind(item.source_record_id)
            .bind(item.source_record_type)
            .bind(item.description)
            .bind(item.quantity)
            .bind(item.unit_price)
            .bind(item.tax_rate)
            .bind(item.discount_rate)
            .execute(&mut *trx).await?;
        }

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_invoice_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set client_id = $1 where id = $2 returning *",
        )
        .bind(client_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_quote_id(
        &self,
        ctx: &Context<'_>,
        quote_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set quote_id = $1 where id = $2 returning *",
        )
        .bind(quote_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_invoice_number(
        &self,
        ctx: &Context<'_>,
        invoice_number: String,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set invoice_number = $1 where id = $2 returning *",
        )
        .bind(invoice_number)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_status(
        &self,
        ctx: &Context<'_>,
        status: InvoiceStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_issue_date(
        &self,
        ctx: &Context<'_>,
        issue_date: NaiveDate,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set issue_date = $1 where id = $2 returning *",
        )
        .bind(issue_date)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_due_date(
        &self,
        ctx: &Context<'_>,
        due_date: NaiveDate,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set due_date = $1 where id = $2 returning *",
        )
        .bind(due_date)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_total_amount(
        &self,
        ctx: &Context<'_>,
        total_amount: f64,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set total_amount = $1 where id = $2 returning *",
        )
        .bind(total_amount)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_amount_paid(
        &self,
        ctx: &Context<'_>,
        amount_paid: f64,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set amount_paid = $1 where id = $2 returning *",
        )
        .bind(amount_paid)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_currency(
        &self,
        ctx: &Context<'_>,
        currency: String,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set currency = $1 where id = $2 returning *",
        )
        .bind(currency)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_tax_amount(
        &self,
        ctx: &Context<'_>,
        tax_amount: f64,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set tax_amount = $1 where id = $2 returning *",
        )
        .bind(tax_amount)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_discount_amount(
        &self,
        ctx: &Context<'_>,
        discount_amount: f64,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set discount_amount = $1 where id = $2 returning *",
        )
        .bind(discount_amount)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_subtotal(
        &self,
        ctx: &Context<'_>,
        subtotal: f64,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set subtotal = $1 where id = $2 returning *",
        )
        .bind(subtotal)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_payment_terms(
        &self,
        ctx: &Context<'_>,
        payment_terms: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set payment_terms = $1 where id = $2 returning *",
        )
        .bind(payment_terms)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_notes(
        &self,
        ctx: &Context<'_>,
        notes: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set notes = $1 where id = $2 returning *",
        )
        .bind(notes)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_sent_at(
        &self,
        ctx: &Context<'_>,
        sent_at: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set sent_at = $1 where id = $2 returning *",
        )
        .bind(sent_at)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_paid_at(
        &self,
        ctx: &Context<'_>,
        paid_at: Option<DateTime<Utc>>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set paid_at = $1 where id = $2 returning *",
        )
        .bind(paid_at)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_invoice_created_by_user_id(
        &self,
        ctx: &Context<'_>,
        created_by_user_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, invoices::Model>(
            "update billing.invoices set created_by_user_id = $1 where id = $2 returning *",
        )
        .bind(created_by_user_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_invoice(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        // Delete associated invoice line items first due to foreign key constraint
        sqlx::query("delete from billing.invoice_line_items where invoice_id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        let result = sqlx::query("delete from billing.invoices where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        _ = trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove invoice"));
        }

        Ok("Invoice removed successfully".into())
    }

    // Invoice Line Item Mutations
    async fn add_invoice_line_item(
        &self,
        ctx: &Context<'_>,
        invoice_id: Uuid,
        payload: CreateBillingInvoiceLineItemInput,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        sqlx::query("insert into billing.invoice_line_items (invoice_id, product_id, source_record_id, source_record_type, description, quantity, unit_price, tax_rate, discount_rate) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *")
            .bind(invoice_id)
            .bind(payload.product_id)
            .bind(payload.source_record_id)
            .bind(payload.source_record_type)
            .bind(payload.description)
            .bind(payload.quantity)
            .bind(payload.unit_price)
            .bind(payload.tax_rate)
            .bind(payload.discount_rate)
            .execute(&mut *trx).await?;

        _ = trx.commit().await?;

        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from billing.invoices where id = $1")
                .bind(invoice_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_invoice_line_item_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query(
            "update billing.invoice_line_items set product_id = $1 where id = $2 returning invoice_id",
        )
        .bind(product_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let invoice_id: Uuid = item.get("invoice_id");

        _ = trx.commit().await?;

        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from billing.invoices where id = $1")
                .bind(invoice_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_invoice_line_item_source_record_id(
        &self,
        ctx: &Context<'_>,
        source_record_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query(
            "update billing.invoice_line_items set source_record_id = $1 where id = $2 returning invoice_id",
        )
        .bind(source_record_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let invoice_id: Uuid = item.get("invoice_id");

        _ = trx.commit().await?;

        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from billing.invoices where id = $1")
                .bind(invoice_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_invoice_line_item_source_record_type(
        &self,
        ctx: &Context<'_>,
        source_record_type: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query(
            "update billing.invoice_line_items set source_record_type = $1 where id = $2 returning invoice_id",
        )
        .bind(source_record_type)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let invoice_id: Uuid = item.get("invoice_id");

        _ = trx.commit().await?;

        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from billing.invoices where id = $1")
                .bind(invoice_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_invoice_line_item_description(
        &self,
        ctx: &Context<'_>,
        description: String,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query(
            "update billing.invoice_line_items set description = $1 where id = $2 returning invoice_id",
        )
        .bind(description)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let invoice_id: Uuid = item.get("invoice_id");

        _ = trx.commit().await?;

        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from billing.invoices where id = $1")
                .bind(invoice_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_invoice_line_item_quantity(
        &self,
        ctx: &Context<'_>,
        quantity: f64,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query(
            "update billing.invoice_line_items set quantity = $1 where id = $2 returning invoice_id",
        )
        .bind(quantity)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let invoice_id: Uuid = item.get("invoice_id");

        _ = trx.commit().await?;

        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from billing.invoices where id = $1")
                .bind(invoice_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_invoice_line_item_unit_price(
        &self,
        ctx: &Context<'_>,
        unit_price: f64,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query(
            "update billing.invoice_line_items set unit_price = $1 where id = $2 returning invoice_id",
        )
        .bind(unit_price)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let invoice_id: Uuid = item.get("invoice_id");

        _ = trx.commit().await?;

        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from billing.invoices where id = $1")
                .bind(invoice_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_invoice_line_item_tax_rate(
        &self,
        ctx: &Context<'_>,
        tax_rate: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query(
            "update billing.invoice_line_items set tax_rate = $1 where id = $2 returning invoice_id",
        )
        .bind(tax_rate)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let invoice_id: Uuid = item.get("invoice_id");

        _ = trx.commit().await?;

        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from billing.invoices where id = $1")
                .bind(invoice_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_invoice_line_item_discount_rate(
        &self,
        ctx: &Context<'_>,
        discount_rate: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query(
            "update billing.invoice_line_items set discount_rate = $1 where id = $2 returning invoice_id",
        )
        .bind(discount_rate)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let invoice_id: Uuid = item.get("invoice_id");

        _ = trx.commit().await?;

        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from billing.invoices where id = $1")
                .bind(invoice_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn remove_invoice_line_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query("select invoice_id from billing.invoice_line_items where id = $1")
            .bind(id)
            .fetch_optional(&mut *trx)
            .await?;

        if item.is_none() {
            return Err(async_graphql::Error::new("Invoice line item not found"));
        }

        let invoice_id: Uuid = item.unwrap().get("invoice_id");

        let result = sqlx::query("delete from billing.invoice_line_items where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        _ = trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to remove invoice line item",
            ));
        }

        Ok(
            sqlx::query_as::<_, invoices::Model>("select * from billing.invoices where id = $1")
                .bind(invoice_id)
                .fetch_one(db)
                .await?,
        )
    }
}
