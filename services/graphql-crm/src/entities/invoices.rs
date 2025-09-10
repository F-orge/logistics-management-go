use chrono::{DateTime, NaiveDate, Utc};
use rust_decimal::Decimal;
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

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
    pub status: String,
    pub total: Option<Decimal>,
    pub issue_date: Option<NaiveDate>,
    pub due_date: Option<NaiveDate>,
    pub sent_at: Option<DateTime<Utc>>,
    pub paid_at: Option<DateTime<Utc>>,
    pub payment_method: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertInvoicesInput {
    pub opportunity_id: Option<Uuid>,
    pub status: Option<String>,
    pub total: Option<Decimal>,
    pub issue_date: Option<NaiveDate>,
    pub due_date: Option<NaiveDate>,
    pub sent_at: Option<DateTime<Utc>>,
    pub paid_at: Option<DateTime<Utc>>,
    pub payment_method: Option<String>,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateInvoicesInput {
    pub opportunity_id: Option<Option<Uuid>>,
    pub status: Option<String>,
    pub total: Option<Option<Decimal>>,
    pub issue_date: Option<Option<NaiveDate>>,
    pub due_date: Option<Option<NaiveDate>>,
    pub sent_at: Option<Option<DateTime<Utc>>>,
    pub paid_at: Option<Option<DateTime<Utc>>>,
    pub payment_method: Option<Option<String>>,
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
                value.status.into(),
                value.total.map(|d| d.to_string()).into(),
                value.issue_date.into(),
                value.due_date.into(),
                value.sent_at.into(),
                value.paid_at.into(),
                value.payment_method.into(),
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
            stmt = stmt.value(Invoices::Status, status);
        }
        if let Some(total) = value.total.flatten() {
            stmt = stmt.value(Invoices::Total, total.to_string());
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
            stmt = stmt.value(Invoices::PaymentMethod, payment_method);
        }

        stmt.to_owned()
    }
}
