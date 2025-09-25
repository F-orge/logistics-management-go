use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::campaigns;

#[derive(Debug, Clone, InputObject)]
pub struct CreateCampaignInput {
    pub name: String,
    pub budget: Option<Decimal>,
    pub start_date: Option<NaiveDate>,
    pub end_date: Option<NaiveDate>,
}

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmCampaignsMutations")]
impl Mutation {
    async fn create_campaign(
        &self,
        ctx: &Context<'_>,
        payload: CreateCampaignInput,
    ) -> async_graphql::Result<campaigns::Model> {
        todo!()
    }
    async fn update_campaign_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<campaigns::Model> {
        todo!()
    }
    async fn update_campaign_budget(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        budget: Decimal,
    ) -> async_graphql::Result<campaigns::Model> {
        todo!()
    }
    async fn update_campaign_start_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        start_date: NaiveDate,
    ) -> async_graphql::Result<campaigns::Model> {
        todo!()
    }
    async fn update_campaign_end_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        end_date: NaiveDate,
    ) -> async_graphql::Result<campaigns::Model> {
        todo!()
    }
    async fn remove_campaign(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        todo!()
    }
}
