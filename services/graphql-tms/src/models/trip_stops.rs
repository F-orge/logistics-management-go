use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use fake::Dummy;
use fake::faker::address::en::{BuildingNumber, StreetName};
use graphql_core::PostgresDataLoader;
use std::sync::Arc;
use uuid::Uuid;

use crate::models::trips;

use super::sea_orm_active_enums::TripStopStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "TmsTripStops")]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub trip_id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub sequence: i32,
    #[dummy(faker = "StreetName()")]
    pub address: Option<String>,
    pub status: Option<TripStopStatusEnum>,
    pub estimated_arrival_time: Option<DateTime<Utc>>,
    pub actual_arrival_time: Option<DateTime<Utc>>,
    pub estimated_departure_time: Option<DateTime<Utc>>,
    pub actual_departure_time: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn trip(&self, ctx: &Context<'_>) -> async_graphql::Result<trips::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(trips::PrimaryKey(self.trip_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get trip"))?)
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
            sqlx::query_as::<_, Self::Value>("select * from tms.trip_stops where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
