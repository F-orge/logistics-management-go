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

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "CrmOpportunitiesMutations")]
impl Mutation {
    async fn create_opportunity(
        &self,
        ctx: &Context<'_>,
        payload: CreateOpportunityInput,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "insert into crm.opportunities (name, stage, deal_value, probability, expected_close_date, lost_reason, source, owner_id, contact_id, company_id, campaign_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *"
        )
        .bind(payload.name)
        .bind(payload.stage)
        .bind(payload.deal_value)
        .bind(payload.probability)
        .bind(payload.expected_close_date)
        .bind(payload.lost_reason)
        .bind(payload.source)
        .bind(payload.owner_id)
        .bind(payload.contact_id)
        .bind(payload.company_id)
        .bind(payload.campaign_id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_stage(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        stage: Option<OpportunityStage>,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set stage = $1 where id = $2 returning *",
        )
        .bind(stage)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_deal_value(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        deal_value: Option<Decimal>,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set deal_value = $1 where id = $2 returning *",
        )
        .bind(deal_value)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_probability(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        probability: Option<f32>,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set probability = $1 where id = $2 returning *",
        )
        .bind(probability)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_expected_close_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        expected_close_date: Option<NaiveDate>,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set expected_close_date = $1 where id = $2 returning *",
        )
        .bind(expected_close_date)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_lost_reason(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        lost_reason: Option<String>,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set lost_reason = $1 where id = $2 returning *",
        )
        .bind(lost_reason)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_source(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        source: Option<OpportunitySource>,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set source = $1 where id = $2 returning *",
        )
        .bind(source)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_owner_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        owner_id: Uuid,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set owner_id = $1 where id = $2 returning *",
        )
        .bind(owner_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_contact_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        contact_id: Option<Uuid>,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set contact_id = $1 where id = $2 returning *",
        )
        .bind(contact_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_company_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        company_id: Option<Uuid>,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set company_id = $1 where id = $2 returning *",
        )
        .bind(company_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_opportunity_campaign_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        campaign_id: Option<Uuid>,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, opportunities::Model>(
            "update crm.opportunities set campaign_id = $1 where id = $2 returning *",
        )
        .bind(campaign_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn remove_opportunity(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from crm.opportunities where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete opportunity"));
        }
        Ok("Opportunity removed successfully".into())
    }
}
