use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::suppliers;

#[derive(Debug, Clone, InputObject)]
pub struct CreateSupplierInput {
    pub id: Uuid,
    pub name: String,
    pub contact_person: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsSuppliersMutation")]
impl Mutation {
    async fn create_supplier(
        &self,
        ctx: &Context<'_>,
        payload: CreateSupplierInput,
    ) -> async_graphql::Result<suppliers::Model> {
        todo!()
    }

    async fn update_supplier_name(
        &self,
        ctx: &Context<'_>,
        name: String,
        id: Uuid,
    ) -> async_graphql::Result<suppliers::Model> {
        todo!()
    }

    async fn update_supplier_contact_person(
        &self,
        ctx: &Context<'_>,
        contact_person: String,
        id: Uuid,
    ) -> async_graphql::Result<suppliers::Model> {
        todo!()
    }

    async fn update_supplier_email(
        &self,
        ctx: &Context<'_>,
        email: String,
        id: Uuid,
    ) -> async_graphql::Result<suppliers::Model> {
        todo!()
    }

    async fn update_supplier_phone_number(
        &self,
        ctx: &Context<'_>,
        phone_number: String,
        id: Uuid,
    ) -> async_graphql::Result<suppliers::Model> {
        todo!()
    }

    async fn remove_supplier(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        todo!()
    }
}
