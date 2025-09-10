use chrono::{DateTime, Utc};
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "contacts")]
pub enum Contacts {
    Table,
    Id,
    Name,
    Email,
    PhoneNumber,
    JobTitle,
    CompanyId,
    OwnerId,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct ContactsTable {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub phone_number: String,
    pub job_title: String,
    pub company_id: Uuid,
    pub owner_id: Uuid,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertContactsInput {
    #[validate(length(min = 1))]
    pub name: String,
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 1))]
    pub phone_number: String,
    #[validate(length(min = 1))]
    pub job_title: String,
    pub company_id: Uuid,
    pub owner_id: Uuid,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateContactsInput {
    #[validate(length(min = 1))]
    pub name: Option<String>,
    #[validate(email)]
    pub email: Option<String>,
    #[validate(length(min = 1))]
    pub phone_number: Option<String>,
    #[validate(length(min = 1))]
    pub job_title: Option<String>,
    pub company_id: Option<Uuid>,
    pub owner_id: Option<Uuid>,
}

impl From<InsertContactsInput> for InsertStatement {
    fn from(value: InsertContactsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Contacts::Table))
            .columns([
                Contacts::Name,
                Contacts::Email,
                Contacts::PhoneNumber,
                Contacts::JobTitle,
                Contacts::CompanyId,
                Contacts::OwnerId,
            ])
            .values([
                value.name.into(),
                value.email.into(),
                value.phone_number.into(),
                value.job_title.into(),
                value.company_id.into(),
                value.owner_id.into(),
            ])
            .expect("Failed to convert contacts input to sea-query")
            .to_owned()
    }
}

impl From<UpdateContactsInput> for UpdateStatement {
    fn from(value: UpdateContactsInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Contacts::Table));

        if let Some(name) = value.name {
            stmt = stmt.value(Contacts::Name, name);
        }
        if let Some(email) = value.email {
            stmt = stmt.value(Contacts::Email, email);
        }
        if let Some(phone_number) = value.phone_number {
            stmt = stmt.value(Contacts::PhoneNumber, phone_number);
        }
        if let Some(job_title) = value.job_title {
            stmt = stmt.value(Contacts::JobTitle, job_title);
        }
        if let Some(company_id) = value.company_id {
            stmt = stmt.value(Contacts::CompanyId, company_id);
        }
        if let Some(owner_id) = value.owner_id {
            stmt = stmt.value(Contacts::OwnerId, owner_id);
        }
        stmt.to_owned()
    }
}
