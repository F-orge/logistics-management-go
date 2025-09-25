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
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(contacts::PrimaryKey(self.contact_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find contact"))?)
    }
    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(user::PrimaryKey(self.user_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find user"))?)
    }
    async fn case(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<cases::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.case_id {
            Ok(loader.load_one(cases::PrimaryKey(id)).await?)
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
        let keys = keys.iter().map(|k| k.0).collect::<Vec<_>>();

        let results =
            sqlx::query_as::<_, Self::Value>("select * from crm.interactions where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
