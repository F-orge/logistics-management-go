use std::sync::Arc;

use async_graphql::{ComplexObject, Context, SimpleObject, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use sqlx::FromRow;
use uuid::Uuid;

use crate::models::{cases, contacts};

use super::enums::InteractionType;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow)]
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

impl Loader<PrimaryKey> for PostgresDataLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Model;

    async fn load(
        &self,
        keys: &[PrimaryKey],
    ) -> Result<std::collections::HashMap<PrimaryKey, Self::Value>, Self::Error> {
        todo!()
    }
}
