use chrono::{DateTime, NaiveDate, Utc};
use rust_decimal::Decimal;
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Clone, Debug, sqlx::Type, Iden, Deserialize, Serialize)]
#[sqlx(type_name = "crm.invoice_status", rename_all = "kebab-case")]
pub enum InvoiceStatus {
    Draft,
    Sent,
    Paid,
    Overdue,
    Cancelled,
}

#[derive(Clone, Debug, sqlx::Type, Iden, Deserialize, Serialize)]
#[sqlx(type_name = "crm.payment_method", rename_all = "kebab-case")]
pub enum InvoicePaymentMethod {
    CreditCard,
    BankTransfer,
    Cash,
    Check,
    Paypal,
    Stripe,
    WireTransfer,
}

#[derive(Iden)]
#[iden(rename = "invoices")]
pub enum Invoices {
    Table,
    Id,
    OpportunityId,
    Status,
    Total,
    IssueDate,
    DueDate,
    SentAt,
    PaidAt,
    PaymentMethod,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct InvoicesTable {
    pub id: Uuid,
    pub opportunity_id: Option<Uuid>,
    pub status: InvoiceStatus,
    pub total: Option<Decimal>,
    pub issue_date: Option<NaiveDate>,
    pub due_date: Option<NaiveDate>,
    pub sent_at: Option<DateTime<Utc>>,
    pub paid_at: Option<DateTime<Utc>>,
    pub payment_method: Option<InvoicePaymentMethod>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertInvoicesInput {
    pub opportunity_id: Option<Uuid>,
    pub status: Option<InvoiceStatus>,
    pub total: Option<Decimal>,
    pub issue_date: Option<NaiveDate>,
    pub due_date: Option<NaiveDate>,
    pub sent_at: Option<DateTime<Utc>>,
    pub paid_at: Option<DateTime<Utc>>,
    pub payment_method: Option<InvoicePaymentMethod>,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateInvoicesInput {
    pub opportunity_id: Option<Option<Uuid>>,
    pub status: Option<InvoiceStatus>,
    pub total: Option<Option<Decimal>>,
    pub issue_date: Option<Option<NaiveDate>>,
    pub due_date: Option<Option<NaiveDate>>,
    pub sent_at: Option<Option<DateTime<Utc>>>,
    pub paid_at: Option<Option<DateTime<Utc>>>,
    pub payment_method: Option<Option<InvoicePaymentMethod>>,
}

impl From<InsertInvoicesInput> for InsertStatement {
    fn from(value: InsertInvoicesInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Invoices::Table))
            .columns([
                Invoices::OpportunityId,
                Invoices::Status,
                Invoices::Total,
                Invoices::IssueDate,
                Invoices::DueDate,
                Invoices::SentAt,
                Invoices::PaidAt,
                Invoices::PaymentMethod,
            ])
            .values([
                value.opportunity_id.into(),
                value.status.map(|v| v.to_string()).into(),
                value.total.into(),
                value.issue_date.into(),
                value.due_date.into(),
                value.sent_at.into(),
                value.paid_at.into(),
                value.payment_method.map(|v| v.to_string()).into(),
            ])
            .expect("Failed to convert invoices input to sea-query")
            .to_owned()
    }
}

impl From<UpdateInvoicesInput> for UpdateStatement {
    fn from(value: UpdateInvoicesInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Invoices::Table));

        if let Some(opportunity_id) = value.opportunity_id.flatten() {
            stmt = stmt.value(Invoices::OpportunityId, opportunity_id);
        }
        if let Some(status) = value.status {
            stmt = stmt.value(Invoices::Status, status.to_string());
        }
        if let Some(total) = value.total.flatten() {
            stmt = stmt.value(Invoices::Total, total);
        }
        if let Some(issue_date) = value.issue_date.flatten() {
            stmt = stmt.value(Invoices::IssueDate, issue_date);
        }
        if let Some(due_date) = value.due_date.flatten() {
            stmt = stmt.value(Invoices::DueDate, due_date);
        }
        if let Some(sent_at) = value.sent_at.flatten() {
            stmt = stmt.value(Invoices::SentAt, sent_at);
        }
        if let Some(paid_at) = value.paid_at.flatten() {
            stmt = stmt.value(Invoices::PaidAt, paid_at);
        }
        if let Some(payment_method) = value.payment_method.flatten() {
            stmt = stmt.value(Invoices::PaymentMethod, payment_method.to_string());
        }

        stmt.to_owned()
    }
}
