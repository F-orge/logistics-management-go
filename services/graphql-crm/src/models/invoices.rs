use async_graphql::ComplexObject;
use async_graphql::Context;
use async_graphql::SimpleObject;
use chrono::DateTime;
use chrono::NaiveDate;
use chrono::Utc;
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::opportunities;

use super::enums::InvoiceStatus;
use super::enums::PaymentMethod;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub opportunity_id: Option<Uuid>,
    pub status: Option<InvoiceStatus>,
    pub total: Option<Decimal>,
    pub issue_date: Option<NaiveDate>,
    pub due_date: Option<NaiveDate>,
    pub sent_at: Option<DateTime<Utc>>,
    pub paid_at: Option<DateTime<Utc>>,
    pub payment_method: Option<PaymentMethod>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn opportunity(&self, ctx: &Context<'_>) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
}
