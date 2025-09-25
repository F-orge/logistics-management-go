use std::sync::Arc;

use async_graphql::{ComplexObject, Context, SimpleObject, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use sqlx::FromRow;
use uuid::Uuid;

use crate::models::companies;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow)]
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
