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

#[cfg(test)]
mod tests {
    use super::*;
    use graphql_auth::entities::user::{InsertUserInput, User};
    use rstest::{fixture, rstest};
    use rust_decimal::Decimal;
    use sea_query::{InsertStatement, PostgresQueryBuilder, Query, UpdateStatement};
    use sqlx::{Executor, PgPool};
    use uuid::Uuid;

    #[fixture]
    fn dummy_owner() -> InsertStatement {
        InsertStatement::from(InsertUserInput {
            name: "john doe".into(),
            email: "johndoe@email.com".into(),
            email_verified: false,
            image: None,
            role: None,
            banned: false,
            ban_reason: None,
            ban_expires: None,
        })
        .returning(Query::returning().column(User::Id))
        .to_owned()
    }

    #[fixture]
    fn dummy_company() -> InsertCompaniesInput {
        InsertCompaniesInput {
            name: "Acme Corp".to_string(),
            street: "123 Main St".to_string(),
            city: "Metropolis".to_string(),
            state: "NY".to_string(),
            postal_code: "10001".to_string(),
            country: "USA".to_string(),
            phone_number: "555-1234".to_string(),
            industry: "Manufacturing".to_string(),
            website: "https://acme.com".to_string(),
            annual_revenue: Decimal::new(1000000, 2),
            owner_id: Uuid::new_v4(),
        }
    }

    #[rstest]
    #[case::minimal(InsertCompaniesInput {
        name: "A".to_string(),
        street: "B".to_string(),
        city: "C".to_string(),
        state: "D".to_string(),
        postal_code: "E".to_string(),
        country: "F".to_string(),
        phone_number: "G".to_string(),
        industry: "H".to_string(),
        website: "https://a.com".to_string(),
        annual_revenue: Decimal::new(1, 0),
        owner_id: Uuid::new_v4(),
    }, true)]
    #[case::all_fields(dummy_company(), true)]
    #[case::empty_name(InsertCompaniesInput {
        name: "".to_string(),
        street: "B".to_string(),
        city: "C".to_string(),
        state: "D".to_string(),
        postal_code: "E".to_string(),
        country: "F".to_string(),
        phone_number: "G".to_string(),
        industry: "H".to_string(),
        website: "https://a.com".to_string(),
        annual_revenue: Decimal::new(1, 0),
        owner_id: Uuid::new_v4(),
    }, false)]
    #[case::invalid_website(InsertCompaniesInput {
        name: "A".to_string(),
        street: "B".to_string(),
        city: "C".to_string(),
        state: "D".to_string(),
        postal_code: "E".to_string(),
        country: "F".to_string(),
        phone_number: "G".to_string(),
        industry: "H".to_string(),
        website: "not-a-url".to_string(),
        annual_revenue: Decimal::new(1, 0),
        owner_id: Uuid::new_v4(),
    }, false)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_insert_companies(
        dummy_owner: InsertStatement,
        #[case] mut input: InsertCompaniesInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        let (user_id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_owner.to_string(PostgresQueryBuilder))
            .fetch_one(&pool)
            .await?;

        input.owner_id = user_id;

        if input.validate().is_ok() == success {
            return Ok(());
        }

        let sql = InsertStatement::from(input).to_string(PostgresQueryBuilder);

        let result = pool.execute(&*sql).await;

        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());

        Ok(())
    }

    #[rstest]
    #[case::minimal(UpdateCompaniesInput {
        name: Some("A".to_string()),
        street: Some("B".to_string()),
        city: Some("C".to_string()),
        state: Some("D".to_string()),
        postal_code: Some("E".to_string()),
        country: Some("F".to_string()),
        phone_number: Some("G".to_string()),
        industry: Some("H".to_string()),
        website: Some("https://a.com".to_string()),
        annual_revenue: Some(Decimal::new(1, 0)),
        owner_id: Some(Uuid::new_v4()),
    }, true)]
    #[case::empty_name(UpdateCompaniesInput {
        name: Some("".to_string()),
        street: None,
        city: None,
        state: None,
        postal_code: None,
        country: None,
        phone_number: None,
        industry: None,
        website: None,
        annual_revenue: None,
        owner_id: None,
    }, false)]
    #[case::invalid_website(UpdateCompaniesInput {
        name: Some("A".to_string()),
        street: None,
        city: None,
        state: None,
        postal_code: None,
        country: None,
        phone_number: None,
        industry: None,
        website: Some("not-a-url".to_string()),
        annual_revenue: None,
        owner_id: None,
    }, false)]
    #[case::nulls(UpdateCompaniesInput {
        name: None,
        street: None,
        city: None,
        state: None,
        postal_code: None,
        country: None,
        phone_number: None,
        industry: None,
        website: None,
        annual_revenue: None,
        owner_id: None,
    }, true)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_update_companies(
        dummy_owner: InsertStatement,
        mut dummy_company: InsertCompaniesInput,
        #[case] input: UpdateCompaniesInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        let (user_id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_owner.to_string(PostgresQueryBuilder))
            .fetch_one(&pool)
            .await?;

        dummy_company.owner_id = user_id;

        let insert_sql = InsertStatement::from(dummy_company)
            .returning(Query::returning().column(Companies::Id))
            .to_string(PostgresQueryBuilder);

        let (id,) = sqlx::query_as::<_, (Uuid,)>(&insert_sql)
            .fetch_one(&pool)
            .await?;

        if input.validate().is_ok() == success {
            return Ok(());
        }

        let mut stmt: UpdateStatement = input.into();

        let sql = stmt
            .and_where(sea_query::Expr::col(Companies::Id).eq(id))
            .to_string(PostgresQueryBuilder);

        let result = pool.execute(&*sql).await;

        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());

        Ok(())
    }
}
