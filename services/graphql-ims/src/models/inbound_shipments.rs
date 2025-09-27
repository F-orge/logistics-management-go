use std::sync::Arc;

use async_graphql::dataloader::Loader;
use chrono::{DateTime, NaiveDate, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::enums::InboundShipmentStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
pub struct Model {
    pub id: Uuid,
    pub client_id: Option<Uuid>,
    pub warehouse_id: Uuid,
    pub status: Option<InboundShipmentStatusEnum>,
    pub expected_arrival_date: Option<NaiveDate>,
    pub actual_arrival_date: Option<NaiveDate>,
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
            "select * from ims.inbound_shipments where id = ANY($1)",
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
