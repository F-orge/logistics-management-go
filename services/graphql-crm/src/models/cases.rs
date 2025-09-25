use async_graphql::ComplexObject;
use async_graphql::Context;
use async_graphql::SimpleObject;
use chrono::DateTime;
use chrono::Utc;
use graphql_auth::models::user;
use uuid::Uuid;

use crate::models::contacts;

use super::enums::CasePriority;
use super::enums::CaseStatus;
use super::enums::CaseType;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub case_number: String,
    pub status: Option<CaseStatus>,
    pub priority: Option<CasePriority>,
    pub r#type: Option<CaseType>,
    #[graphql(skip)]
    pub owner_id: Uuid,
    #[graphql(skip)]
    pub contact_id: Option<Uuid>,
    pub description: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        todo!()
    }
    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<contacts::Model> {
        todo!()
    }
}
