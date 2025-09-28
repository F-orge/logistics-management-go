use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use std::sync::Arc;
use uuid::Uuid;

use crate::models::{carriers, trips};

use super::sea_orm_active_enums::ShipmentLegStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "TmsShipmentLegs")]
pub struct Model {
    pub id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub leg_sequence: i32,
    pub start_location: Option<String>,
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
        todo!()
    }

    async fn internal_trip(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<trips::Model>> {
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
        let keys = keys.iter().map(|k| k.0).collect::<Vec<_>>();

        let results =
            sqlx::query_as::<_, Self::Value>("select * from tms.carrier_rates where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
