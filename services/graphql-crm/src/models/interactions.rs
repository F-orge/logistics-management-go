use async_graphql::{ComplexObject, Context, SimpleObject};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use uuid::Uuid;

use crate::models::{cases, contacts};

use super::enums::InteractionType;

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub contact_id: Uuid,
    #[graphql(skip)]
    pub user_id: Uuid,
    #[graphql(skip)]
    pub case_id: Option<Uuid>,
    pub r#type: Option<InteractionType>,
    pub outcome: Option<String>,
    pub notes: Option<String>,
    pub interaction_date: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<contacts::Model> {
        todo!()
    }
    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        todo!()
    }
    async fn case(&self, ctx: &Context<'_>) -> async_graphql::Result<cases::Model> {
        todo!()
    }
}
