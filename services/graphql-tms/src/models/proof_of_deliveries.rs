use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use std::sync::Arc;
use uuid::Uuid;

use crate::models::trip_stops;

use super::sea_orm_active_enums::ProofTypeEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "TmsProofOfDeliveries")]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub trip_stop_id: Uuid,
    pub r#type: Option<ProofTypeEnum>,
    pub file_path: Option<String>,
    pub timestamp: DateTime<Utc>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn trip_stop(&self, ctx: &Context<'_>) -> async_graphql::Result<trip_stops::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(trip_stops::PrimaryKey(self.trip_stop_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get trip stop"))?)
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
            "select * from tms.proof_of_deliveries where id = ANY($1)",
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
