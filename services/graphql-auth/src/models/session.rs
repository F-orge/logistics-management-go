use std::sync::Arc;

use async_graphql::{
    ComplexObject, Context, SimpleObject,
    dataloader::{DataLoader, Loader},
};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use sqlx::{PgPool, prelude::FromRow};
use uuid::Uuid;

use crate::models::user;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(SimpleObject, Debug, Clone, FromRow)]
#[graphql(name = "AuthSession", complex)]
pub struct Model {
    pub id: Uuid,
    pub expires_at: DateTime<Utc>,
    pub token: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub ip_address: Option<String>,
    pub user_agent: Option<String>,
    #[graphql(skip)]
    pub user_id: Uuid,
    #[graphql(skip)]
    pub impersonated_by: Option<Uuid>,
}

impl Model {
    pub async fn paginate(page: u64, limit: u64, db: &PgPool) -> sqlx::Result<Vec<Model>> {
        sqlx::query_as::<_, Model>("select * from auth.session limit ? offset ?")
            .bind(page as i64)
            .bind(limit as i64)
            .fetch_all(db)
            .await
    }
    pub async fn one(id: &PrimaryKey, db: &PgPool) -> sqlx::Result<Option<Model>> {
        sqlx::query_as::<_, Model>("select * from auth.session where id = ?")
            .bind(id.0)
            .fetch_optional(db)
            .await
    }
}

#[ComplexObject]
impl Model {
    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let loader = ctx.data::<DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(user::PrimaryKey(self.user_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find user"))?)
    }
    async fn impersonated_by(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<user::Model>> {
        let loader = ctx.data::<DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.impersonated_by {
            Ok(loader.load_one(user::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
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
