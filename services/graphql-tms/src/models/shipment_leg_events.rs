use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use std::sync::Arc;
use uuid::Uuid;

use crate::models::shipment_legs;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "TmsShipmentLegEvents")]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub shipment_leg_id: Uuid,
    pub status_message: Option<String>,
    pub location: Option<String>,
    pub event_timestamp: DateTime<Utc>,
}

#[ComplexObject]
impl Model {
    async fn shipment_leg(&self, ctx: &Context<'_>) -> async_graphql::Result<shipment_legs::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(shipment_legs::PrimaryKey(self.shipment_leg_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get shipment leg"))?)
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
            "select * from tms.shipment_leg_events where id = ANY($1)",
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
