use async_graphql::{ComplexObject, Context, SimpleObject};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use rust_decimal::Decimal;
use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub street: Option<String>,
    pub city: Option<String>,
    pub state: Option<String>,
    pub postal_code: Option<String>,
    pub country: Option<String>,
    pub phone_number: Option<String>,
    pub industry: Option<String>,
    pub website: Option<String>,
    pub annual_revenue: Option<Decimal>,
    #[graphql(skip)]
    pub owner_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<user::Model>> {
        todo!()
    }
}
