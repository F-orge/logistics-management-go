use async_graphql::{Context, InputObject, Object};
use chrono::DateTime;
use chrono::Utc;
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
        todo!()
    }
    async fn update_case_number(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        case_number: String,
    ) -> async_graphql::Result<cases::Model> {
        todo!()
    }
    async fn update_case_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: Option<CaseStatus>,
    ) -> async_graphql::Result<cases::Model> {
        todo!()
    }
    async fn update_case_priority(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        priority: Option<CasePriority>,
    ) -> async_graphql::Result<cases::Model> {
        todo!()
    }
    async fn update_case_type(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        r#type: Option<CaseType>,
    ) -> async_graphql::Result<cases::Model> {
        todo!()
    }
    async fn update_case_owner_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        owner_id: Uuid,
    ) -> async_graphql::Result<cases::Model> {
        todo!()
    }
    async fn update_case_contact_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        contact_id: Option<Uuid>,
    ) -> async_graphql::Result<cases::Model> {
        todo!()
    }
    async fn update_case_description(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        description: Option<String>,
    ) -> async_graphql::Result<cases::Model> {
        todo!()
    }
    async fn remove_case(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        todo!()
    }
}
