use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use fake::Dummy;
use fake::faker::{
    filesystem::en::FilePath,
    name::en::Name,
    number::en::NumberWithFormat,
};
use graphql_core::PostgresDataLoader;
use sqlx::prelude::FromRow;
use uuid::Uuid;

use crate::models::delivery_tasks;

use super::enums::ProofOfDeliveryTypeEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject, FromRow, Dummy)]
#[graphql(name = "DmsProofOfDeliveries", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub delivery_task_id: Uuid,
    pub r#type: ProofOfDeliveryTypeEnum,
    #[dummy(faker = "FilePath()")]
    pub file_path: Option<String>,
    #[dummy(faker = "30..50")]
    pub signature_data: Option<String>,
    #[dummy(faker = "Name()")]
    pub recipient_name: Option<String>,
    #[dummy(faker = "NumberWithFormat(\"######\")")]
    pub verification_code: Option<String>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub timestamp: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn delivery_task(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<delivery_tasks::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(delivery_tasks::PrimaryKey(self.delivery_task_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find delivery task"))?)
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
            "select * from dms.proof_of_deliveries where id = ANY($1)",
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
