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
}

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmInvoicesMutations")]
impl Mutation {
    async fn create_invoice(
        &self,
        ctx: &Context<'_>,
        payload: CreateInvoiceInput,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }
    async fn update_invoice_opportunity_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        opportunity_id: Option<Uuid>,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }
    async fn update_invoice_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: Option<InvoiceStatus>,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }
    async fn update_invoice_total(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        total: Option<Decimal>,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }
    async fn update_invoice_issue_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        issue_date: Option<NaiveDate>,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }
    async fn update_invoice_due_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        due_date: Option<NaiveDate>,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }
    async fn update_invoice_sent_at(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        sent_at: Option<DateTime<Utc>>,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }
    async fn update_invoice_paid_at(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        paid_at: Option<DateTime<Utc>>,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }
    async fn update_invoice_payment_method(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payment_method: Option<PaymentMethod>,
    ) -> async_graphql::Result<invoices::Model> {
        todo!()
    }
    async fn remove_invoice(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        todo!()
    }
}
