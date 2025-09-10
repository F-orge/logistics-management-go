use chrono::{DateTime, Utc};
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "leads")]
pub enum Leads {
    Table,
    Id,
    Name,
    Email,
    LeadSource,
    Status,
    LeadScore,
    OwnerId,
    CampaignId,
    ConvertedAt,
    ConvertedContactId,
    ConvertedCompanyId,
    ConvertedOpportunityId,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct LeadsTable {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub lead_source: Option<String>,
    pub status: String,
    pub lead_score: Option<i32>,
    pub owner_id: Uuid,
    pub campaign_id: Option<Uuid>,
    pub converted_at: Option<DateTime<Utc>>,
    pub converted_contact_id: Option<Uuid>,
    pub converted_company_id: Option<Uuid>,
    pub converted_opportunity_id: Option<Uuid>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertLeadsInput {
    #[validate(length(min = 1))]
    pub name: String,
    #[validate(email)]
    pub email: String,
    pub lead_source: Option<String>,
    pub status: Option<String>,
    pub lead_score: Option<i32>,
    pub owner_id: Uuid,
    pub campaign_id: Option<Uuid>,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateLeadsInput {
    #[validate(length(min = 1))]
    pub name: Option<String>,
    #[validate(email)]
    pub email: Option<String>,
    pub lead_source: Option<Option<String>>,
    pub status: Option<String>,
    pub lead_score: Option<Option<i32>>,
    pub owner_id: Option<Uuid>,
    pub campaign_id: Option<Option<Uuid>>,
    pub converted_at: Option<Option<DateTime<Utc>>>,
    pub converted_contact_id: Option<Option<Uuid>>,
    pub converted_company_id: Option<Option<Uuid>>,
    pub converted_opportunity_id: Option<Option<Uuid>>,
}

impl From<InsertLeadsInput> for InsertStatement {
    fn from(value: InsertLeadsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Leads::Table))
            .columns([
                Leads::Name,
                Leads::Email,
                Leads::LeadSource,
                Leads::Status,
                Leads::LeadScore,
                Leads::OwnerId,
                Leads::CampaignId,
            ])
            .values([
                value.name.into(),
                value.email.into(),
                value.lead_source.into(),
                value.status.into(),
                value.lead_score.into(),
                value.owner_id.into(),
                value.campaign_id.into(),
            ])
            .expect("Failed to convert leads input to sea-query")
            .to_owned()
    }
}

impl From<UpdateLeadsInput> for UpdateStatement {
    fn from(value: UpdateLeadsInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Leads::Table));

        if let Some(name) = value.name {
            stmt = stmt.value(Leads::Name, name);
        }
        if let Some(email) = value.email {
            stmt = stmt.value(Leads::Email, email);
        }
        if let Some(lead_source) = value.lead_source.flatten() {
            stmt = stmt.value(Leads::LeadSource, lead_source);
        }
        if let Some(status) = value.status {
            stmt = stmt.value(Leads::Status, status);
        }
        if let Some(lead_score) = value.lead_score.flatten() {
            stmt = stmt.value(Leads::LeadScore, lead_score);
        }
        if let Some(owner_id) = value.owner_id {
            stmt = stmt.value(Leads::OwnerId, owner_id);
        }
        if let Some(campaign_id) = value.campaign_id.flatten() {
            stmt = stmt.value(Leads::CampaignId, campaign_id);
        }
        if let Some(converted_at) = value.converted_at.flatten() {
            stmt = stmt.value(Leads::ConvertedAt, converted_at);
        }
        if let Some(converted_contact_id) = value.converted_contact_id.flatten() {
            stmt = stmt.value(Leads::ConvertedContactId, converted_contact_id);
        }
        if let Some(converted_company_id) = value.converted_company_id.flatten() {
            stmt = stmt.value(Leads::ConvertedCompanyId, converted_company_id);
        }
        if let Some(converted_opportunity_id) = value.converted_opportunity_id.flatten() {
            stmt = stmt.value(Leads::ConvertedOpportunityId, converted_opportunity_id);
        }

        stmt.to_owned()
    }
}
