use async_graphql::{ComplexObject, Context, SimpleObject};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use uuid::Uuid;

use crate::models::companies;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub job_title: Option<String>,
    pub company_id: Option<Uuid>,
    pub owner_id: Uuid,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<companies::Model> {
        todo!()
    }
    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        todo!()
    }
}
