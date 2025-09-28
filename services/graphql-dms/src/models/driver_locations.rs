use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use graphql_tms::models::drivers;
use sqlx::prelude::FromRow;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject, FromRow)]
#[graphql(name = "DmsDriverLocations", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub driver_id: Uuid,
    pub latitude: f32,
    pub longitude: f32,
    pub altitude: Option<f32>,
    pub accuracy: Option<f32>,
    pub speed_kmh: Option<f32>,
    pub heading: Option<f32>,
    pub timestamp: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn driver(&self, ctx: &Context<'_>) -> async_graphql::Result<drivers::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(drivers::PrimaryKey(self.driver_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find driver"))?)
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
            "select * from dms.driver_locations where id = ANY($1)",
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
