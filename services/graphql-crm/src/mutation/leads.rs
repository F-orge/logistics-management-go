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
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "insert into crm.leads (name, email, lead_source, status, lead_score, owner_id, campaign_id, converted_at, converted_contact_id, converted_company_id, converted_opportunity_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *"
        )
        .bind(payload.name)
        .bind(payload.email)
        .bind(payload.lead_source)
        .bind(payload.status)
        .bind(payload.lead_score)
        .bind(payload.owner_id)
        .bind(payload.campaign_id)
        .bind(payload.converted_at)
        .bind(payload.converted_contact_id)
        .bind(payload.converted_company_id)
        .bind(payload.converted_opportunity_id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_email(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        email: String,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set email = $1 where id = $2 returning *",
        )
        .bind(email)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_lead_source(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        lead_source: Option<LeadSource>,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set lead_source = $1 where id = $2 returning *",
        )
        .bind(lead_source)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: Option<LeadStatus>,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_lead_score(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        lead_score: Option<i32>,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set lead_score = $1 where id = $2 returning *",
        )
        .bind(lead_score)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_owner_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        owner_id: Uuid,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set owner_id = $1 where id = $2 returning *",
        )
        .bind(owner_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_campaign_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        campaign_id: Option<Uuid>,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set campaign_id = $1 where id = $2 returning *",
        )
        .bind(campaign_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_converted_at(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        converted_at: Option<DateTime<Utc>>,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set converted_at = $1 where id = $2 returning *",
        )
        .bind(converted_at)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_converted_contact_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        converted_contact_id: Option<Uuid>,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set converted_contact_id = $1 where id = $2 returning *",
        )
        .bind(converted_contact_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_converted_company_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        converted_company_id: Option<Uuid>,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set converted_company_id = $1 where id = $2 returning *",
        )
        .bind(converted_company_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_lead_converted_opportunity_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        converted_opportunity_id: Option<Uuid>,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, leads::Model>(
            "update crm.leads set converted_opportunity_id = $1 where id = $2 returning *",
        )
        .bind(converted_opportunity_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn remove_lead(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from crm.leads where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete lead"));
        }
        Ok("Lead removed successfully".into())
    }
}
