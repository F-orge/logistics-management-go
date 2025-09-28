use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, NaiveDate, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::packages;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "WmsPackageItems", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub package_id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    #[graphql(skip)]
    pub batch_id: Option<Uuid>,
    pub quantity: i32,
    pub lot_number: Option<String>,
    pub serial_numbers: Option<Vec<String>>,
    pub expiry_date: Option<NaiveDate>,
    pub unit_weight: Option<f32>,
    pub total_weight: Option<f32>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn package(&self, _ctx: &Context<'_>) -> async_graphql::Result<packages::Model> {
        todo!()
    }

    async fn product(&self, _ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }

    async fn batch(&self, _ctx: &Context<'_>) -> async_graphql::Result<String> {
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
            sqlx::query_as::<_, Self::Value>("select * from wms.package_items where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
