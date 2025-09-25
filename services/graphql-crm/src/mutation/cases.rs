use async_graphql::{Context, InputObject, Object};
use chrono::DateTime;
use chrono::Utc;
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::cases;
use crate::models::enums::{CasePriority, CaseStatus, CaseType};

#[derive(Debug, Clone, InputObject)]
pub struct CreateCaseInput {
    pub case_number: String,
    pub status: Option<CaseStatus>,
    pub priority: Option<CasePriority>,
    pub r#type: Option<CaseType>,
    pub owner_id: Uuid,
    pub contact_id: Option<Uuid>,
    pub description: Option<String>,
}

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmCasesMutations")]
impl Mutation {
    async fn create_case(
        &self,
        ctx: &Context<'_>,
        payload: CreateCaseInput,
    ) -> async_graphql::Result<cases::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, cases::Model>(
            "insert into crm.cases (case_number, status, priority, type, owner_id, contact_id, description) values ($1,$2,$3,$4,$5,$6,$7) returning *"
        )
        .bind(payload.case_number)
        .bind(payload.status)
        .bind(payload.priority)
        .bind(payload.r#type)
        .bind(payload.owner_id)
        .bind(payload.contact_id)
        .bind(payload.description)
        .fetch_one(db)
        .await?)
    }
    async fn update_case_number(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        case_number: String,
    ) -> async_graphql::Result<cases::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, cases::Model>(
            "update crm.cases set case_number = $1 where id = $2 returning *",
        )
        .bind(case_number)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_case_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: Option<CaseStatus>,
    ) -> async_graphql::Result<cases::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, cases::Model>(
            "update crm.cases set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_case_priority(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        priority: Option<CasePriority>,
    ) -> async_graphql::Result<cases::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, cases::Model>(
            "update crm.cases set priority = $1 where id = $2 returning *",
        )
        .bind(priority)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_case_type(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        r#type: Option<CaseType>,
    ) -> async_graphql::Result<cases::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, cases::Model>(
            "update crm.cases set type = $1 where id = $2 returning *",
        )
        .bind(r#type)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_case_owner_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        owner_id: Uuid,
    ) -> async_graphql::Result<cases::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, cases::Model>(
            "update crm.cases set owner_id = $1 where id = $2 returning *",
        )
        .bind(owner_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_case_contact_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        contact_id: Option<Uuid>,
    ) -> async_graphql::Result<cases::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, cases::Model>(
            "update crm.cases set contact_id = $1 where id = $2 returning *",
        )
        .bind(contact_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_case_description(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        description: Option<String>,
    ) -> async_graphql::Result<cases::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, cases::Model>(
            "update crm.cases set description = $1 where id = $2 returning *",
        )
        .bind(description)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn remove_case(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<PgPool>()?;
        let result = sqlx::query("delete from crm.cases where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete case"));
        }
        Ok("Case removed successfully".into())
    }
}
