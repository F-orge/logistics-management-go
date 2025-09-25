use async_graphql::{Context, InputObject, Object};
use chrono::DateTime;
use chrono::Utc;
use uuid::Uuid;

use crate::models::enums::{LeadSource, LeadStatus};
use crate::models::leads;

#[derive(Debug, Clone, InputObject)]
pub struct CreateLeadInput {
    pub name: String,
    pub email: String,
    pub lead_source: Option<LeadSource>,
    pub status: Option<LeadStatus>,
    pub lead_score: Option<i32>,
    pub owner_id: Uuid,
    pub campaign_id: Option<Uuid>,
    pub converted_at: Option<DateTime<Utc>>,
    pub converted_contact_id: Option<Uuid>,
    pub converted_company_id: Option<Uuid>,
    pub converted_opportunity_id: Option<Uuid>,
}

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmLeadsMutations")]
impl Mutation {
    async fn create_lead(
        &self,
        ctx: &Context<'_>,
        payload: CreateLeadInput,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_email(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        email: String,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_lead_source(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        lead_source: Option<LeadSource>,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: Option<LeadStatus>,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_lead_score(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        lead_score: Option<i32>,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_owner_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        owner_id: Uuid,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_campaign_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        campaign_id: Option<Uuid>,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_converted_at(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        converted_at: Option<DateTime<Utc>>,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_converted_contact_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        converted_contact_id: Option<Uuid>,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_converted_company_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        converted_company_id: Option<Uuid>,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn update_lead_converted_opportunity_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        converted_opportunity_id: Option<Uuid>,
    ) -> async_graphql::Result<leads::Model> {
        todo!()
    }
    async fn remove_lead(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        todo!()
    }
}
