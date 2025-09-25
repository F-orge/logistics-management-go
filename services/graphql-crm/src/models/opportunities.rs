use async_graphql::ComplexObject;
use async_graphql::Context;
use async_graphql::SimpleObject;
use chrono::DateTime;
use chrono::NaiveDate;
use chrono::Utc;
use graphql_auth::models::user;
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::campaigns;
use crate::models::companies;
use crate::models::contacts;

use super::enums::OpportunitySource;
use super::enums::OpportunityStage;

#[derive(Clone, Debug, PartialEq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub stage: Option<OpportunityStage>,
    pub deal_value: Option<Decimal>,
    pub probability: Option<f32>,
    pub expected_close_date: Option<NaiveDate>,
    pub lost_reason: Option<String>,
    pub source: Option<OpportunitySource>,
    #[graphql(skip)]
    pub owner_id: Uuid,
    #[graphql(skip)]
    pub contact_id: Option<Uuid>,
    #[graphql(skip)]
    pub company_id: Option<Uuid>,
    #[graphql(skip)]
    pub campaign_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        todo!()
    }
    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<contacts::Model>> {
        todo!()
    }
    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<companies::Model>> {
        todo!()
    }
    async fn campaign(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<campaigns::Model>> {
        todo!()
    }
}
