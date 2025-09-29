use std::sync::Arc;

use crate::models::warehouses;
use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use crate::models::products;

use super::enums::StockTransferStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "ImsStockTransfer", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    #[graphql(skip)]
    pub source_warehouse_id: Uuid,
    #[graphql(skip)]
    pub destination_warehouse_id: Uuid,
    pub quantity: i32,
    pub status: Option<StockTransferStatusEnum>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(products::PrimaryKey(self.product_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get product"))?)
    }
    async fn source_warehouse(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<warehouses::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(warehouses::PrimaryKey(self.source_warehouse_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find source warehouse"))?)
    }
    async fn destination_warehouse(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<warehouses::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(warehouses::PrimaryKey(self.destination_warehouse_id))
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find destination warehouse",
            ))?)
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
            "select * from ims.stock_transfers where id = ANY($1)",
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
