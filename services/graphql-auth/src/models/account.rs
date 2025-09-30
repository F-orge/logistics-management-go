use std::sync::Arc;

use async_graphql::{
    ComplexObject, Context, SimpleObject,
    dataloader::{DataLoader, Loader},
};
use chrono::{DateTime, Utc};
use fake::Dummy;
use fake::faker::{company::en::CompanyName, internet::en::Password, lorem::en::Words};
use graphql_core::PostgresDataLoader;
use sqlx::{PgPool, prelude::FromRow};
use uuid::Uuid;

use crate::models::user;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(Uuid);

#[derive(SimpleObject, Debug, Clone, FromRow, Dummy)]
#[graphql(name = "AuthAccount", complex)]
pub struct Model {
    pub id: Uuid,
    pub account_id: String,
    #[dummy(faker = "CompanyName()")]
    pub provider_id: String,
    #[graphql(skip)]
    pub user_id: Uuid,
    #[dummy(faker = "30..50")]
    pub access_token: Option<String>,
    #[dummy(faker = "30..50")]
    pub refresh_token: Option<String>,
    pub id_token: Option<String>,
    pub access_token_expires_at: Option<DateTime<Utc>>,
    pub refresh_token_expires_at: Option<DateTime<Utc>>,
    pub scope: Option<String>,
    #[graphql(secret, skip)]
    #[dummy(faker = "Password(8..20)")]
    pub password: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl Model {
    pub async fn paginate(page: u64, limit: u64, db: &PgPool) -> sqlx::Result<Vec<Model>> {
        sqlx::query_as::<_, Model>("select * from auth.account limit ? offset ?")
            .bind(page as i64)
            .bind(limit as i64)
            .fetch_all(db)
            .await
    }
    pub async fn one(id: &PrimaryKey, db: &PgPool) -> sqlx::Result<Option<Model>> {
        sqlx::query_as::<_, Model>("select * from auth.account where id = ?")
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
}

impl Loader<PrimaryKey> for PostgresDataLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Model;

    async fn load(
        &self,
        keys: &[PrimaryKey],
    ) -> Result<std::collections::HashMap<PrimaryKey, Self::Value>, Self::Error> {
        let keys = keys.iter().map(|k| k.0).collect::<Vec<_>>();

        let results =
            sqlx::query_as::<_, Self::Value>("select * from auth.account where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
