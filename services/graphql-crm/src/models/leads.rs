use async_graphql::ComplexObject;
use async_graphql::Context;
use async_graphql::SimpleObject;
use chrono::DateTime;
use chrono::Utc;
use graphql_auth::models::user;
use uuid::Uuid;

use crate::models::campaigns;
use crate::models::contacts;
use crate::models::opportunities;

use super::enums::LeadSource;
use super::enums::LeadStatus;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub lead_source: Option<LeadSource>,
    pub status: Option<LeadStatus>,
    pub lead_score: Option<i32>,
    #[graphql(skip)]
    pub owner_id: Uuid,
    #[graphql(skip)]
    pub campaign_id: Option<Uuid>,
    pub converted_at: Option<DateTime<Utc>>,
    #[graphql(skip)]
    pub converted_contact_id: Option<Uuid>,
    #[graphql(skip)]
    pub converted_company_id: Option<Uuid>,
    #[graphql(skip)]
    pub converted_opportunity_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        todo!()
    }
    async fn campaign(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<campaigns::Model>> {
        todo!()
    }
    async fn converted_contact(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<contacts::Model>> {
        todo!()
    }
    async fn converted_opportunity(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<opportunities::Model>> {
        todo!()
    }
}
