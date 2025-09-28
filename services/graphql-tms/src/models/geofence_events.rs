use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use std::sync::Arc;
use uuid::Uuid;

use crate::models::{geofences, vehicles};

use super::sea_orm_active_enums::GeofenceEventTypeEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "TmsGeofenceEvent")]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub vehicle_id: Uuid,
    #[graphql(skip)]
    pub geofence_id: Uuid,
    pub event_type: GeofenceEventTypeEnum,
    pub timestamp: DateTime<Utc>,
}

#[ComplexObject]
impl Model {
    async fn vehicle(&self, ctx: &Context<'_>) -> async_graphql::Result<vehicles::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(vehicles::PrimaryKey(self.vehicle_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get vehicle"))?)
    }
    async fn geofence(&self, ctx: &Context<'_>) -> async_graphql::Result<geofences::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(geofences::PrimaryKey(self.geofence_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get geofence"))?)
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
            "select * from tms.geofence_events where id = ANY($1)",
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
