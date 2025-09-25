use async_graphql::SimpleObject;
use chrono::{DateTime, NaiveDate, Utc};
use rust_decimal::Decimal;
use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub budget: Option<Decimal>,
    pub start_date: Option<NaiveDate>,
    pub end_date: Option<NaiveDate>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
