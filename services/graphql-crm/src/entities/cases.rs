use chrono::{DateTime, Utc};
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "cases")]
pub enum Cases {
    Table,
    Id,
    CaseNumber,
    Status,
    Priority,
    Type,
    OwnerId,
    ContactId,
    Description,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct CasesTable {
    pub id: Uuid,
    pub case_number: String,
    pub status: String,
    pub priority: String,
    pub r#type: Option<String>,
    pub owner_id: Uuid,
    pub contact_id: Option<Uuid>,
    pub description: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertCasesInput {
    #[validate(length(min = 1))]
    pub case_number: String,
    pub status: Option<String>,
    pub priority: Option<String>,
    pub r#type: Option<String>,
    pub owner_id: Uuid,
    pub contact_id: Option<Uuid>,
    pub description: Option<String>,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateCasesInput {
    #[validate(length(min = 1))]
    pub case_number: Option<String>,
    pub status: Option<String>,
    pub priority: Option<String>,
    pub r#type: Option<Option<String>>,
    pub owner_id: Option<Uuid>,
    pub contact_id: Option<Option<Uuid>>,
    pub description: Option<Option<String>>,
}

impl From<InsertCasesInput> for InsertStatement {
    fn from(value: InsertCasesInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Cases::Table))
            .columns([
                Cases::CaseNumber,
                Cases::Status,
                Cases::Priority,
                Cases::Type,
                Cases::OwnerId,
                Cases::ContactId,
                Cases::Description,
            ])
            .values([
                value.case_number.into(),
                value.status.into(),
                value.priority.into(),
                value.r#type.into(),
                value.owner_id.into(),
                value.contact_id.into(),
                value.description.into(),
            ])
            .expect("Failed to convert cases input to sea-query")
            .to_owned()
    }
}

impl From<UpdateCasesInput> for UpdateStatement {
    fn from(value: UpdateCasesInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Cases::Table));

        if let Some(case_number) = value.case_number {
            stmt = stmt.value(Cases::CaseNumber, case_number);
        }
        if let Some(status) = value.status {
            stmt = stmt.value(Cases::Status, status);
        }
        if let Some(priority) = value.priority {
            stmt = stmt.value(Cases::Priority, priority);
        }
        if let Some(r#type) = value.r#type.flatten() {
            stmt = stmt.value(Cases::Type, r#type);
        }
        if let Some(owner_id) = value.owner_id {
            stmt = stmt.value(Cases::OwnerId, owner_id);
        }
        if let Some(contact_id) = value.contact_id.flatten() {
            stmt = stmt.value(Cases::ContactId, contact_id);
        }
        if let Some(description) = value.description.flatten() {
            stmt = stmt.value(Cases::Description, description);
        }

        stmt.to_owned()
    }
}
