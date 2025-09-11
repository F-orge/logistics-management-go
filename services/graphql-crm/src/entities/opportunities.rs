use chrono::{DateTime, NaiveDate, Utc};
use rust_decimal::Decimal;
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Clone, Debug, sqlx::Type, Iden, Deserialize, Serialize)]
#[sqlx(type_name = "crm.opportunity_source", rename_all = "kebab-case")]
pub enum OpportunitySource {
    Website,
    Referral,
    SocialMedia,
    EmailCampaign,
    ColdCall,
    Event,
    Advertisement,
    Partner,
    ExistingCustomer,
    Other,
}

#[derive(Clone, Debug, sqlx::Type, Iden, Deserialize, Serialize)]
#[sqlx(type_name = "crm.opportunity_stage", rename_all = "kebab-case")]
pub enum OpportunityStage {
    Prospecting,
    Qualification,
    NeedAnalysis,
    Demo,
    Proposal,
    Negotiation,
    ClosedWon,
    ClosedLost,
}

#[derive(Iden)]
#[iden(rename = "opportunities")]
pub enum Opportunities {
    Table,
    Id,
    Name,
    Stage,
    DealValue,
    Probability,
    ExpectedCloseDate,
    LostReason,
    Source,
    OwnerId,
    ContactId,
    CompanyId,
    CampaignId,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct OpportunitiesTable {
    pub id: Uuid,
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
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertOpportunitiesInput {
    #[validate(length(min = 1))]
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

#[derive(Clone, Debug, Validate)]
pub struct UpdateOpportunitiesInput {
    #[validate(length(min = 1))]
    pub name: Option<String>,
    pub stage: Option<Option<OpportunityStage>>,
    pub deal_value: Option<Option<Decimal>>,
    pub probability: Option<Option<f32>>,
    pub expected_close_date: Option<Option<NaiveDate>>,
    pub lost_reason: Option<Option<String>>,
    pub source: Option<Option<OpportunitySource>>,
    pub owner_id: Option<Uuid>,
    pub contact_id: Option<Option<Uuid>>,
    pub company_id: Option<Option<Uuid>>,
    pub campaign_id: Option<Option<Uuid>>,
}

impl From<InsertOpportunitiesInput> for InsertStatement {
    fn from(value: InsertOpportunitiesInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Opportunities::Table))
            .columns([
                Opportunities::Name,
                Opportunities::Stage,
                Opportunities::DealValue,
                Opportunities::Probability,
                Opportunities::ExpectedCloseDate,
                Opportunities::LostReason,
                Opportunities::Source,
                Opportunities::OwnerId,
                Opportunities::ContactId,
                Opportunities::CompanyId,
                Opportunities::CampaignId,
            ])
            .values([
                value.name.into(),
                value.stage.map(|v| v.to_string()).into(),
                value.deal_value.map(|d| d.to_string()).into(),
                value.probability.into(),
                value.expected_close_date.into(),
                value.lost_reason.into(),
                value.source.map(|v| v.to_string()).into(),
                value.owner_id.into(),
                value.contact_id.into(),
                value.company_id.into(),
                value.campaign_id.into(),
            ])
            .expect("Failed to convert opportunities input to sea-query")
            .to_owned()
    }
}

impl From<UpdateOpportunitiesInput> for UpdateStatement {
    fn from(value: UpdateOpportunitiesInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Opportunities::Table));

        if let Some(name) = value.name {
            stmt = stmt.value(Opportunities::Name, name);
        }
        if let Some(stage) = value.stage.flatten() {
            stmt = stmt.value(Opportunities::Stage, stage.to_string());
        }
        if let Some(deal_value) = value.deal_value.flatten() {
            stmt = stmt.value(Opportunities::DealValue, deal_value.to_string());
        }
        if let Some(probability) = value.probability.flatten() {
            stmt = stmt.value(Opportunities::Probability, probability);
        }
        if let Some(expected_close_date) = value.expected_close_date.flatten() {
            stmt = stmt.value(Opportunities::ExpectedCloseDate, expected_close_date);
        }
        if let Some(lost_reason) = value.lost_reason.flatten() {
            stmt = stmt.value(Opportunities::LostReason, lost_reason);
        }
        if let Some(source) = value.source.flatten() {
            stmt = stmt.value(Opportunities::Source, source.to_string());
        }
        if let Some(owner_id) = value.owner_id {
            stmt = stmt.value(Opportunities::OwnerId, owner_id);
        }
        if let Some(contact_id) = value.contact_id.flatten() {
            stmt = stmt.value(Opportunities::ContactId, contact_id);
        }
        if let Some(company_id) = value.company_id.flatten() {
            stmt = stmt.value(Opportunities::CompanyId, company_id);
        }
        if let Some(campaign_id) = value.campaign_id.flatten() {
            stmt = stmt.value(Opportunities::CampaignId, campaign_id);
        }

        stmt.to_owned()
    }
}
