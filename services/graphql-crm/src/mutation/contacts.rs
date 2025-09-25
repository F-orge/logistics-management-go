use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::contacts;

#[derive(Debug, Clone, InputObject)]
pub struct CreateContactInput {
    pub name: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub job_title: Option<String>,
    pub company_id: Option<Uuid>,
    pub owner_id: Uuid,
}

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmContactsMutations")]
impl Mutation {
    async fn create_contact(
        &self,
        ctx: &Context<'_>,
        payload: CreateContactInput,
    ) -> async_graphql::Result<contacts::Model> {
        todo!()
    }
    async fn update_contact_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<contacts::Model> {
        todo!()
    }
    async fn update_contact_email(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        email: String,
    ) -> async_graphql::Result<contacts::Model> {
        todo!()
    }
    async fn update_contact_phone_number(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        phone_number: Option<String>,
    ) -> async_graphql::Result<contacts::Model> {
        todo!()
    }
    async fn update_contact_job_title(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        job_title: Option<String>,
    ) -> async_graphql::Result<contacts::Model> {
        todo!()
    }
    async fn update_contact_company_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        company_id: Option<Uuid>,
    ) -> async_graphql::Result<contacts::Model> {
        todo!()
    }
    async fn update_contact_owner_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        owner_id: Uuid,
    ) -> async_graphql::Result<contacts::Model> {
        todo!()
    }
    async fn remove_contact(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        todo!()
    }
}
