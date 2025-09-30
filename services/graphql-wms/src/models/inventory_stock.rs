use fake::Dummy;
use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::{enums::InventoryStockStatusEnum, inventory_batches, locations, products};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq, Dummy)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "WmsInventoryStock", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub location_id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    #[graphql(skip)]
    pub batch_id: Option<Uuid>,
    pub quantity: i32,
    pub reserved_quantity: i32,
    pub available_quantity: Option<i32>,
    pub status: Option<InventoryStockStatusEnum>,
    pub last_counted_at: Option<DateTime<Utc>>,
    pub last_movement_at: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn location(&self, ctx: &Context<'_>) -> async_graphql::Result<locations::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(locations::PrimaryKey(self.location_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get location"))?)
    }

    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(products::PrimaryKey(self.product_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get product"))?)
    }

    async fn batch(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<inventory_batches::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.batch_id {
            Ok(loader.load_one(inventory_batches::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
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
            "select * from wms.inventory_stock where id = ANY($1)",
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
