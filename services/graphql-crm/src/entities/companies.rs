use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Iden)]
#[iden(rename = "companies")]
pub enum Companies {
    Table,
    Id,
    Name,
    Street,
    City,
    State,
    PostalCode,
    Country,
    PhoneNumber,
    Industry,
    Website,
    AnnualRevenue,
    OwnerId,
    CreatedAt,
    UpdatedAt,
}

#[derive(Clone, Debug, FromRow)]
pub struct CompaniesTable {
    pub id: Uuid,
    pub name: String,
    pub street: String,
    pub city: String,
    pub state: String,
    pub postal_code: String,
    pub country: String,
    pub phone_number: String,
    pub industry: String,
    pub website: String,
    pub annual_revenue: Decimal,
    pub owner_id: Uuid,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Clone, Debug, Validate)]
pub struct InsertCompaniesInput {
    #[validate(length(min = 1))]
    pub name: String,
    #[validate(length(min = 1))]
    pub street: String,
    #[validate(length(min = 1))]
    pub city: String,
    #[validate(length(min = 1))]
    pub state: String,
    #[validate(length(min = 1))]
    pub postal_code: String,
    #[validate(length(min = 1))]
    pub country: String,
    #[validate(length(min = 1))]
    pub phone_number: String,
    #[validate(length(min = 1))]
    pub industry: String,
    #[validate(url)]
    pub website: String,
    pub annual_revenue: Decimal,
    pub owner_id: Uuid,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateCompaniesInput {
    #[validate(length(min = 1))]
    pub name: Option<String>,
    #[validate(length(min = 1))]
    pub street: Option<String>,
    #[validate(length(min = 1))]
    pub city: Option<String>,
    #[validate(length(min = 1))]
    pub state: Option<String>,
    #[validate(length(min = 1))]
    pub postal_code: Option<String>,
    #[validate(length(min = 1))]
    pub country: Option<String>,
    #[validate(length(min = 1))]
    pub phone_number: Option<String>,
    #[validate(length(min = 1))]
    pub industry: Option<String>,
    #[validate(url)]
    pub website: Option<String>,
    pub annual_revenue: Option<Decimal>,
    pub owner_id: Option<Uuid>,
}

impl From<InsertCompaniesInput> for InsertStatement {
    fn from(value: InsertCompaniesInput) -> Self {
        Query::insert()
            .into_table((Alias::new("crm"), Companies::Table))
            .columns([
                Companies::Name,
                Companies::Street,
                Companies::City,
                Companies::State,
                Companies::PostalCode,
                Companies::Country,
                Companies::PhoneNumber,
                Companies::Industry,
                Companies::Website,
                Companies::AnnualRevenue,
                Companies::OwnerId,
            ])
            .values([
                value.name.into(),
                value.street.into(),
                value.city.into(),
                value.state.into(),
                value.postal_code.into(),
                value.country.into(),
                value.phone_number.into(),
                value.industry.into(),
                value.website.into(),
                value.annual_revenue.to_string().into(),
                value.owner_id.into(),
            ])
            .expect("Failed to convert companies input to sea-query")
            .to_owned()
    }
}

impl From<UpdateCompaniesInput> for UpdateStatement {
    fn from(value: UpdateCompaniesInput) -> Self {
        let mut stmt = Query::update();

        let mut stmt = stmt.table((Alias::new("crm"), Companies::Table));

        if let Some(name) = value.name {
            stmt = stmt.value(Companies::Name, name);
        }
        if let Some(street) = value.street {
            stmt = stmt.value(Companies::Street, street);
        }
        if let Some(city) = value.city {
            stmt = stmt.value(Companies::City, city);
        }
        if let Some(state) = value.state {
            stmt = stmt.value(Companies::State, state);
        }
        if let Some(postal_code) = value.postal_code {
            stmt = stmt.value(Companies::PostalCode, postal_code);
        }
        if let Some(country) = value.country {
            stmt = stmt.value(Companies::Country, country);
        }
        if let Some(phone_number) = value.phone_number {
            stmt = stmt.value(Companies::PhoneNumber, phone_number);
        }
        if let Some(industry) = value.industry {
            stmt = stmt.value(Companies::Industry, industry);
        }
        if let Some(website) = value.website {
            stmt = stmt.value(Companies::Website, website);
        }
        if let Some(annual_revenue) = value.annual_revenue {
            stmt = stmt.value(Companies::AnnualRevenue, annual_revenue.to_string());
        }
        if let Some(owner_id) = value.owner_id {
            stmt = stmt.value(Companies::OwnerId, owner_id);
        }
        stmt.to_owned()
    }
}
