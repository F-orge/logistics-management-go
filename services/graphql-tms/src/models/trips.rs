use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use std::sync::Arc;
use uuid::Uuid;

use crate::models::{drivers, trip_stops, vehicles};

use super::sea_orm_active_enums::TripStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "TmsTrips")]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub driver_id: Option<Uuid>,
    #[graphql(skip)]
    pub vehicle_id: Option<Uuid>,
    pub status: Option<TripStatusEnum>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn driver(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<drivers::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.driver_id {
            Ok(loader.load_one(drivers::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    async fn vehicle(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<vehicles::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.vehicle_id {
            Ok(loader.load_one(vehicles::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    async fn stops(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<trip_stops::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, trip_stops::Model>(
            "select * from tms.trip_stops where trip_id = $1 limit $2 offset $3",
        )
        .bind(self.id)
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
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
            sqlx::query_as::<_, Self::Value>("select * from tms.trips where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
