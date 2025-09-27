use std::sync::Arc;

use async_graphql::dataloader::Loader;
use graphql_core::PostgresDataLoader;

use chrono::{DateTime, Utc};
use uuid::Uuid;

use super::enums::OutboundShipmentStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
pub struct Model {
    pub id: Uuid,
    pub sales_order_id: Uuid,
    pub warehouse_id: Uuid,
    pub status: Option<OutboundShipmentStatusEnum>,
    pub tracking_number: Option<String>,
    pub carrier: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
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
            "select * from ims.outbound_shipments where id = ANY($1)",
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
