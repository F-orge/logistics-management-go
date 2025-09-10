use chrono::{DateTime, NaiveDate, Utc};
use rust_decimal::Decimal;
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "campaigns")]
pub enum Campaigns {
    Table,
    Id,
    Name,
    Budget,
    StartDate,
    EndDate,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct CampaignsTable {
    pub id: Uuid,
    pub name: String,
    pub budget: Decimal,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertCampaignsInput {
    #[validate(length(min = 1))]
    pub name: String,
    pub budget: Decimal,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateCampaignsInput {
    #[validate(length(min = 1))]
    pub name: Option<String>,
    pub budget: Option<Decimal>,
    pub start_date: Option<NaiveDate>,
    pub end_date: Option<NaiveDate>,
}

impl From<InsertCampaignsInput> for InsertStatement {
    fn from(value: InsertCampaignsInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Campaigns::Table))
            .columns([
                Campaigns::Name,
                Campaigns::Budget,
                Campaigns::StartDate,
                Campaigns::EndDate,
            ])
            .values([
                value.name.into(),
                value.budget.to_string().into(),
                value.start_date.into(),
                value.end_date.into(),
            ])
            .expect("Failed to convert campaigns input to sea-query")
            .to_owned()
    }
}

impl From<UpdateCampaignsInput> for UpdateStatement {
    fn from(value: UpdateCampaignsInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Campaigns::Table));

        if let Some(name) = value.name {
            stmt = stmt.value(Campaigns::Name, name);
        }
        if let Some(budget) = value.budget {
            stmt = stmt.value(Campaigns::Budget, budget.to_string());
        }
        if let Some(start_date) = value.start_date {
            stmt = stmt.value(Campaigns::StartDate, start_date);
        }
        if let Some(end_date) = value.end_date {
            stmt = stmt.value(Campaigns::EndDate, end_date);
        }

        stmt.to_owned()
    }
}
