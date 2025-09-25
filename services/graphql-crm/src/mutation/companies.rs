use async_graphql::{Context, InputObject, Object};
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::companies;

#[derive(Debug, Clone, InputObject)]
pub struct CreateCompanyInput {
    pub name: String,
    pub street: Option<String>,
    pub city: Option<String>,
    pub state: Option<String>,
    pub postal_code: Option<String>,
    pub country: Option<String>,
    pub phone_number: Option<String>,
    pub industry: Option<String>,
    pub website: Option<String>,
    pub annual_revenue: Option<Decimal>,
    pub owner_id: Option<Uuid>,
}

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmCompaniesMutations")]
impl Mutation {
    async fn create_company(
        &self,
        ctx: &Context<'_>,
        payload: CreateCompanyInput,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_street(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        street: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_city(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        city: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_state(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        state: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_postal_code(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        postal_code: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_country(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        country: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_phone_number(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        phone_number: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_industry(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        industry: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_website(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        website: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_annual_revenue(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        annual_revenue: Option<Decimal>,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn update_company_owner_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        owner_id: Option<Uuid>,
    ) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn remove_company(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        todo!()
    }
}
