use chrono::{DateTime, Utc};
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

#[derive(Iden)]
#[iden(rename = "interactions")]
pub enum Interactions {
    Table,
    Id,
    ContactId,
    UserId,
    CaseId,
    Type,
    Outcome,
    Notes,
    InteractionDate,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct InteractionsTable {
    pub id: Uuid,
    pub contact_id: Uuid,
    pub user_id: Uuid,
    pub case_id: Option<Uuid>,
    pub r#type: String,
    pub outcome: String,
    pub notes: String,
    pub interaction_date: DateTime<Utc>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertInteractionsInput {
    pub contact_id: Uuid,
    pub user_id: Uuid,
    pub case_id: Option<Uuid>,
    #[validate(length(min = 1))]
    pub r#type: String,
    #[validate(length(min = 1))]
    pub outcome: String,
    pub notes: String,
    pub interaction_date: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateInteractionsInput {
    pub contact_id: Option<Uuid>,
    pub user_id: Option<Uuid>,
    pub case_id: Option<Option<Uuid>>,
    #[validate(length(min = 1))]
    pub r#type: Option<String>,
    #[validate(length(min = 1))]
    pub outcome: Option<String>,
    pub notes: Option<String>,
    pub interaction_date: Option<DateTime<Utc>>,
}

impl From<InsertInteractionsInput> for InsertStatement {
    fn from(value: InsertInteractionsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Interactions::Table))
            .columns([
                Interactions::ContactId,
                Interactions::UserId,
                Interactions::CaseId,
                Interactions::Type,
                Interactions::Outcome,
                Interactions::Notes,
                Interactions::InteractionDate,
            ])
            .values([
                value.contact_id.into(),
                value.user_id.into(),
                value.case_id.into(),
                value.r#type.into(),
                value.outcome.into(),
                value.notes.into(),
                value.interaction_date.into(),
            ])
            .expect("Failed to convert interactions input to sea-query")
            .to_owned()
    }
}

impl From<UpdateInteractionsInput> for UpdateStatement {
    fn from(value: UpdateInteractionsInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Interactions::Table));

        if let Some(contact_id) = value.contact_id {
            stmt = stmt.value(Interactions::ContactId, contact_id);
        }
        if let Some(user_id) = value.user_id {
            stmt = stmt.value(Interactions::UserId, user_id);
        }
        if let Some(case_id) = value.case_id.flatten() {
            stmt = stmt.value(Interactions::CaseId, case_id);
        }
        if let Some(r#type) = value.r#type {
            stmt = stmt.value(Interactions::Type, r#type);
        }
        if let Some(outcome) = value.outcome {
            stmt = stmt.value(Interactions::Outcome, outcome);
        }
        if let Some(notes) = value.notes {
            stmt = stmt.value(Interactions::Notes, notes);
        }
        if let Some(interaction_date) = value.interaction_date {
            stmt = stmt.value(Interactions::InteractionDate, interaction_date);
        }

        stmt.to_owned()
    }
}
