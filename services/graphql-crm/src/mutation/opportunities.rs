use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, NaiveDate, Utc};
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::enums::{OpportunitySource, OpportunityStage};
use crate::models::opportunities;

#[derive(Debug, Clone, InputObject)]
pub struct CreateOpportunityInput {
    pub name: String,
    pub stage: Option<OpportunityStage>,
    pub deal_value: Option<Decimal>,
    pub probability: Option<f32>,
    pub expected_close_date: Option<NaiveDate>,
    pub lost_reason: Option<String>,
    pub source: Option<OpportunitySource>,
    pub owner_id: Uuid,
    pub contact_id: Option<Uuid>,
    pub company_id: Option<Uuid>,
    pub campaign_id: Option<Uuid>,
}

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmOpportunitiesMutations")]
impl Mutation {
    async fn create_opportunity(
        &self,
        ctx: &Context<'_>,
        payload: CreateOpportunityInput,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_stage(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        stage: Option<OpportunityStage>,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_deal_value(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        deal_value: Option<Decimal>,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_probability(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        probability: Option<f32>,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_expected_close_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        expected_close_date: Option<NaiveDate>,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_lost_reason(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        lost_reason: Option<String>,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_source(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        source: Option<OpportunitySource>,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_owner_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        owner_id: Uuid,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_contact_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        contact_id: Option<Uuid>,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_company_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        company_id: Option<Uuid>,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn update_opportunity_campaign_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        campaign_id: Option<Uuid>,
    ) -> async_graphql::Result<opportunities::Model> {
        todo!()
    }
    async fn remove_opportunity(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        todo!()
    }
}
