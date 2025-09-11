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

#[cfg(test)]
mod tests {
    use super::*;
    use crate::entities::companies::{Companies, InsertCompaniesInput};
    use chrono::Utc;
    use graphql_auth::entities::user::{InsertUserInput, User};
    use rstest::{fixture, rstest};
    use sea_query::{InsertStatement, PostgresQueryBuilder, Query};
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
            annual_revenue: rust_decimal::Decimal::new(1000000, 2),
            owner_id: Uuid::new_v4(),
        }
    }

    #[fixture]
    fn dummy_contact() -> InsertContactsInput {
        InsertContactsInput {
            name: "Alice Smith".to_string(),
            email: "alice@acme.com".to_string(),
            phone_number: "555-5678".to_string(),
            job_title: "Manager".to_string(),
            company_id: Uuid::new_v4(),
            owner_id: Uuid::new_v4(),
        }
    }

    #[rstest]
    #[case::valid(InsertContactsInput {
        name: "Bob".to_string(),
        email: "bob@acme.com".to_string(),
        phone_number: "555-0000".to_string(),
        job_title: "Engineer".to_string(),
        company_id: Uuid::new_v4(),
        owner_id: Uuid::new_v4(),
    }, true)]
    #[case::empty_name(InsertContactsInput {
        name: "".to_string(),
        email: "bob@acme.com".to_string(),
        phone_number: "555-0000".to_string(),
        job_title: "Engineer".to_string(),
        company_id: Uuid::new_v4(),
        owner_id: Uuid::new_v4(),
    }, false)]
    #[case::invalid_email(InsertContactsInput {
        name: "Bob".to_string(),
        email: "not-an-email".to_string(),
        phone_number: "555-0000".to_string(),
        job_title: "Engineer".to_string(),
        company_id: Uuid::new_v4(),
        owner_id: Uuid::new_v4(),
    }, false)]
    #[case::empty_job_title(InsertContactsInput {
        name: "Bob".to_string(),
        email: "bob@acme.com".to_string(),
        phone_number: "555-0000".to_string(),
        job_title: "".to_string(),
        company_id: Uuid::new_v4(),
        owner_id: Uuid::new_v4(),
    }, false)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_insert_contacts(
        dummy_owner: InsertStatement,
        mut dummy_company: InsertCompaniesInput,
        #[case] mut input: InsertContactsInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        // 1. Create the owner and get its ID
        let (user_id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_owner.to_string(PostgresQueryBuilder))
            .fetch_one(&pool)
            .await?;

        // 2. Create the company and get its ID
        dummy_company.owner_id = user_id;
        let insert_company_sql = InsertStatement::from(dummy_company)
            .returning(Query::returning().column(Companies::Id))
            .to_string(PostgresQueryBuilder);
        let (company_id,) = sqlx::query_as::<_, (Uuid,)>(&insert_company_sql)
            .fetch_one(&pool)
            .await?;

        // 3. Set the foreign keys for the contact
        input.company_id = company_id;
        input.owner_id = user_id;

        // 4. Validate input
        if input.validate().is_ok() == success {
            return Ok(());
        }

        // 5. Insert contact
        let sql = InsertStatement::from(input).to_string(PostgresQueryBuilder);
        let result = pool.execute(&*sql).await;
        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());
        Ok(())
    }

    #[rstest]
    #[case::valid(UpdateContactsInput {
        name: Some("Bob Updated".to_string()),
        email: Some("bob.updated@acme.com".to_string()),
        phone_number: Some("555-1111".to_string()),
        job_title: Some("Lead Engineer".to_string()),
        company_id: None,
        owner_id: None,
    }, true)]
    #[case::empty_name(UpdateContactsInput {
        name: Some("".to_string()),
        email: None,
        phone_number: None,
        job_title: None,
        company_id: None,
        owner_id: None,
    }, false)]
    #[case::invalid_email(UpdateContactsInput {
        name: None,
        email: Some("not-an-email".to_string()),
        phone_number: None,
        job_title: None,
        company_id: None,
        owner_id: None,
    }, false)]
    #[case::nulls(UpdateContactsInput {
        name: None,
        email: None,
        phone_number: None,
        job_title: None,
        company_id: None,
        owner_id: None,
    }, true)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_update_contacts(
        dummy_owner: InsertStatement,
        mut dummy_company: InsertCompaniesInput,
        mut dummy_contact: InsertContactsInput,
        #[case] input: UpdateContactsInput,
        #[case] success: bool,
        #[ignore] pool: PgPool,
    ) -> anyhow::Result<()> {
        // 1. Create the owner and get its ID
        let (user_id,) = sqlx::query_as::<_, (Uuid,)>(&dummy_owner.to_string(PostgresQueryBuilder))
            .fetch_one(&pool)
            .await?;

        // 2. Create the company and get its ID
        dummy_company.owner_id = user_id;
        let insert_company_sql = InsertStatement::from(dummy_company)
            .returning(Query::returning().column(Companies::Id))
            .to_string(PostgresQueryBuilder);
        let (company_id,) = sqlx::query_as::<_, (Uuid,)>(&insert_company_sql)
            .fetch_one(&pool)
            .await?;

        // 3. Set the foreign keys for the contact
        dummy_contact.company_id = company_id;
        dummy_contact.owner_id = user_id;

        // 4. Insert a dummy contact to update
        let insert_contact_sql = InsertStatement::from(dummy_contact)
            .returning(Query::returning().column(Contacts::Id))
            .to_string(PostgresQueryBuilder);
        let (contact_id,) = sqlx::query_as::<_, (Uuid,)>(&insert_contact_sql)
            .fetch_one(&pool)
            .await?;

        // 5. Validate input
        if input.validate().is_ok() == success {
            return Ok(());
        }

        // 6. Create the update statement and add a WHERE clause
        let mut stmt: UpdateStatement = input.into();
        // If no fields are set, skip DB update
        let sql = stmt
            .and_where(sea_query::Expr::col(Contacts::Id).eq(contact_id))
            .to_string(PostgresQueryBuilder);
        // Check if the SQL contains any SET clause
        if !sql.contains("SET") {
            assert!(
                success,
                "No fields to update, but should succeed as a no-op"
            );
            return Ok(());
        }

        // 7. Execute and assert
        let result = pool.execute(&*sql).await;
        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());
        Ok(())
    }
}
