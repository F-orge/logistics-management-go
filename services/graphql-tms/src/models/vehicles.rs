use async_graphql::dataloader::Loader;
use chrono::{DateTime, Utc};
use fake::Dummy;
use fake::faker::{lorem::en::Word, number::en::NumberWithFormat};
use graphql_core::PostgresDataLoader;
use std::sync::Arc;
use uuid::Uuid;

use super::sea_orm_active_enums::VehicleStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "TmsVehicles")]
pub struct Model {
    pub id: Uuid,
    #[dummy(faker = "NumberWithFormat(\"##-###-##\")")]
    pub registration_number: String,
    #[dummy(faker = "Word()")]
    pub model: Option<String>,
    pub capacity_volume: Option<f32>,
    pub capacity_weight: Option<f32>,
    pub status: Option<VehicleStatusEnum>,
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
