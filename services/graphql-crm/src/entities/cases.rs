use chrono::{DateTime, Utc};
use sea_query::{Alias, Iden, InsertStatement, Query, UpdateStatement};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use validator::Validate;

#[derive(Clone, Debug, sqlx::Type, Iden, Deserialize, Serialize)]
#[sqlx(type_name = "crm.case_status", rename_all = "kebab-case")]
pub enum CaseStatus {
    New,
    InProgress,
    WaitingForCustomer,
    WaitingForInternal,
    Escalated,
    Resolved,
    Closed,
    Cancelled,
}

#[derive(Clone, Debug, sqlx::Type, Iden, Deserialize, Serialize)]
#[sqlx(type_name = "crm.case_priority", rename_all = "kebab-case")]
pub enum CasePriority {
    Critical,
    High,
    Medium,
    Low,
}

#[derive(Clone, Debug, sqlx::Type, Iden, Deserialize, Serialize)]
#[sqlx(type_name = "crm.case_type", rename_all = "kebab-case")]
pub enum CaseType {
    Question,
    Problem,
    Complaint,
    FeatureRequest,
    BugReport,
    TechnicalSupport,
}

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
    pub status: CaseStatus,
    pub priority: CasePriority,
    pub r#type: Option<CaseType>,
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
    pub status: Option<CaseStatus>,
    pub priority: Option<CasePriority>,
    pub r#type: Option<CaseType>,
    pub owner_id: Uuid,
    pub contact_id: Option<Uuid>,
    pub description: Option<String>,
}

#[derive(Clone, Debug, Validate)]
pub struct UpdateCasesInput {
    #[validate(length(min = 1))]
    pub case_number: Option<String>,
    pub status: Option<CaseStatus>,
    pub priority: Option<CasePriority>,
    pub r#type: Option<Option<CaseType>>,
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
                value.status.map(|v| v.to_string()).into(),
                value.priority.map(|v| v.to_string()).into(),
                value.r#type.map(|v| v.to_string()).into(),
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
            stmt = stmt.value(Cases::Status, status.to_string());
        }
        if let Some(priority) = value.priority {
            stmt = stmt.value(Cases::Priority, priority.to_string());
        }
        if let Some(r#type) = value.r#type.flatten() {
            stmt = stmt.value(Cases::Type, r#type.to_string());
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

#[cfg(test)]
mod tests {
    use super::*;
    use crate::entities::{
        companies::InsertCompaniesInput,
        contacts::{Contacts, InsertContactsInput},
    };
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

    #[fixture]
    fn dummy_case() -> InsertCasesInput {
        InsertCasesInput {
            case_number: "CASE-001".to_string(),
            status: Some(CaseStatus::New),
            priority: Some(CasePriority::High),
            r#type: Some(CaseType::Problem),
            owner_id: Uuid::new_v4(),
            contact_id: None,
            description: Some("Test case description".to_string()),
        }
    }

    #[rstest]
    #[case::valid(InsertCasesInput {
        case_number: "CASE-002".to_string(),
        status: Some(CaseStatus::New),
        priority: Some(CasePriority::High),
        r#type: Some(CaseType::Problem),
        owner_id: Uuid::new_v4(),
        contact_id: None,
        description: Some("Valid case".to_string()),
    }, true)]
    #[case::empty_case_number(InsertCasesInput {
        case_number: "".to_string(),
        status: Some(CaseStatus::New),
        priority: Some(CasePriority::High),
        r#type: Some(CaseType::Problem),
        owner_id: Uuid::new_v4(),
        contact_id: None,
        description: Some("Empty case number".to_string()),
    }, false)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_insert_cases(
        dummy_owner: InsertStatement,
        mut dummy_company: InsertCompaniesInput,
        mut dummy_contact: InsertContactsInput,
        #[case] mut input: InsertCasesInput,
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
            .returning(Query::returning().column(crate::entities::companies::Companies::Id))
            .to_string(PostgresQueryBuilder);
        let (company_id,) = sqlx::query_as::<_, (Uuid,)>(&insert_company_sql)
            .fetch_one(&pool)
            .await?;

        // 3. Create the contact and get its ID
        dummy_contact.owner_id = user_id;
        dummy_contact.company_id = company_id;
        let insert_contact_sql = InsertStatement::from(dummy_contact)
            .returning(Query::returning().column(Contacts::Id))
            .to_string(PostgresQueryBuilder);
        let (contact_id,) = sqlx::query_as::<_, (Uuid,)>(&insert_contact_sql)
            .fetch_one(&pool)
            .await?;

        // 4. Set the foreign keys for the case
        input.owner_id = user_id;
        input.contact_id = Some(contact_id);

        // 5. Validate input
        if input.validate().is_ok() == success {
            return Ok(());
        }

        // 6. Insert case
        let sql = InsertStatement::from(input).to_string(PostgresQueryBuilder);
        let result = pool.execute(&*sql).await;
        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());
        Ok(())
    }

    #[rstest]
    #[case::valid(UpdateCasesInput {
        case_number: Some("CASE-003-UPDATED".to_string()),
        status: Some(CaseStatus::Closed),
        priority: Some(CasePriority::Low),
        r#type: Some(Some(CaseType::FeatureRequest)),
        owner_id: None,
        contact_id: None,
        description: Some(Some("Updated description".to_string())),
    }, true)]
    #[case::empty_case_number(UpdateCasesInput {
        case_number: Some("".to_string()),
        status: None,
        priority: None,
        r#type: None,
        owner_id: None,
        contact_id: None,
        description: None,
    }, false)]
    #[case::nulls(UpdateCasesInput {
        case_number: None,
        status: None,
        priority: None,
        r#type: None,
        owner_id: None,
        contact_id: None,
        description: None,
    }, true)]
    #[sqlx::test(migrations = "../../migrations")]
    async fn test_update_cases(
        dummy_owner: InsertStatement,
        mut dummy_company: InsertCompaniesInput,
        mut dummy_contact: InsertContactsInput,
        mut dummy_case: InsertCasesInput,
        #[case] input: UpdateCasesInput,
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
            .returning(Query::returning().column(crate::entities::companies::Companies::Id))
            .to_string(PostgresQueryBuilder);
        let (company_id,) = sqlx::query_as::<_, (Uuid,)>(&insert_company_sql)
            .fetch_one(&pool)
            .await?;

        // 3. Create the contact and get its ID
        dummy_contact.owner_id = user_id;
        dummy_contact.company_id = company_id;
        let insert_contact_sql = InsertStatement::from(dummy_contact)
            .returning(Query::returning().column(Contacts::Id))
            .to_string(PostgresQueryBuilder);
        let (contact_id,) = sqlx::query_as::<_, (Uuid,)>(&insert_contact_sql)
            .fetch_one(&pool)
            .await?;

        // 4. Set the foreign keys for the case
        dummy_case.owner_id = user_id;
        dummy_case.contact_id = Some(contact_id);

        // 5. Insert a dummy case to update
        let insert_case_sql = InsertStatement::from(dummy_case)
            .returning(Query::returning().column(Cases::Id))
            .to_string(PostgresQueryBuilder);
        let (case_id,) = sqlx::query_as::<_, (Uuid,)>(&insert_case_sql)
            .fetch_one(&pool)
            .await?;

        // 5. Validate input
        if input.validate().is_ok() == success {
            return Ok(());
        }

        // 6. Create the update statement and add a WHERE clause
        let mut stmt: UpdateStatement = input.into();
        let sql = stmt
            .and_where(sea_query::Expr::col(Cases::Id).eq(case_id))
            .to_string(PostgresQueryBuilder);

        // 7. Execute and assert
        let result = pool.execute(&*sql).await;
        assert_eq!(result.is_ok(), success, "{}", result.unwrap_err());
        Ok(())
    }
}
