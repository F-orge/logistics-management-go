use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use fake::Dummy;
use fake::faker::address::en::CityName;
use graphql_core::PostgresDataLoader;
use std::sync::Arc;
use uuid::Uuid;

use crate::models::{carriers, shipment_leg_events, trips};

use super::sea_orm_active_enums::ShipmentLegStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "TmsShipmentLegs")]
pub struct Model {
    pub id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub leg_sequence: i32,
    #[dummy(faker = "CityName()")]
    pub start_location: Option<String>,
    #[dummy(faker = "CityName()")]
    pub end_location: Option<String>,
    #[graphql(skip)]
    pub carrier_id: Option<Uuid>,
    #[graphql(skip)]
    pub internal_trip_id: Option<Uuid>,
    pub status: Option<ShipmentLegStatusEnum>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn carrier(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<carriers::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.carrier_id {
            Ok(loader.load_one(carriers::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    async fn internal_trip(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<trips::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.internal_trip_id {
            Ok(loader.load_one(trips::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    async fn events(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<shipment_leg_events::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, shipment_leg_events::Model>(
            "select * from tms.shipment_leg_events where shipment_leg_id = $1 limit $2 offset $3",
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
            sqlx::query_as::<_, Self::Value>("select * from tms.shipment_legs where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
