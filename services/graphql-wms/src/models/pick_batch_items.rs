use fake::Dummy;
use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::{pick_batches, sales_orders};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq, Dummy)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "WmsPickBatchItems", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub pick_batch_id: Uuid,
    #[graphql(skip)]
    pub sales_order_id: Uuid,
    pub order_priority: Option<i32>,
    pub estimated_pick_time: Option<i32>,
    pub actual_pick_time: Option<i32>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn pick_batch(&self, ctx: &Context<'_>) -> async_graphql::Result<pick_batches::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(pick_batches::PrimaryKey(self.pick_batch_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get pick batch"))?)
    }

    async fn sales_order(&self, ctx: &Context<'_>) -> async_graphql::Result<sales_orders::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(sales_orders::PrimaryKey(self.sales_order_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get sales order"))?)
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
            "select * from wms.pick_batch_items where id = ANY($1)",
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
