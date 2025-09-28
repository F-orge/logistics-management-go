use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use sqlx::prelude::FromRow;
use uuid::Uuid;

use crate::models::delivery_tasks;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject, FromRow)]
#[graphql(name = "DmsCustomerTrackingLinks", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub delivery_task_id: Uuid,
    pub tracking_token: String,
    pub is_active: Option<bool>,
    pub access_count: Option<i32>,
    pub last_accessed_at: Option<DateTime<Utc>>,
    pub expires_at: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn delivery_task(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<delivery_tasks::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(delivery_tasks::PrimaryKey(self.delivery_task_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find delivery task"))?)
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

        let results = sqlx::query_as::<_, Self::Value>(
            "select * from dms.customer_tracking_links where id = ANY($1)",
        )
        .bind(&keys)
        .fetch_all(&self.pool)
        .await?
        .into_iter()
        .map(|model| (PrimaryKey(model.id), model))
        .collect::<_>();

        Ok(results)
    }
}
