use fake::Dummy;
use fake::faker::{address::en::CityName, filesystem::en::FilePath, lorem::en::Words, number::en::NumberWithFormat};
use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::{enums::LocationTypeEnum, inventory_stock, warehouses};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq, Dummy)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "WmsLocations", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub warehouse_id: Uuid,
    #[graphql(skip)]
    pub parent_location_id: Option<Uuid>,
    #[dummy(faker = "CityName()")] // or Words(1..3)
    pub name: String,
    #[dummy(faker = "NumberWithFormat("LOC-########")")]
    pub barcode: Option<String>,
    pub r#type: LocationTypeEnum,
    pub level: Option<i32>,
    #[dummy(faker = "FilePath()")]
    pub path: Option<String>,
    pub max_weight: Option<f32>,
    pub max_volume: Option<f32>,
    pub max_pallets: Option<i32>,
    pub x_coordinate: Option<f32>,
    pub y_coordinate: Option<f32>,
    pub z_coordinate: Option<f32>,
    pub is_pickable: Option<bool>,
    pub is_receivable: Option<bool>,
    pub temperature_controlled: Option<bool>,
    pub hazmat_approved: Option<bool>,
    pub is_active: Option<bool>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn warehouse(&self, ctx: &Context<'_>) -> async_graphql::Result<warehouses::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(warehouses::PrimaryKey(self.warehouse_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find warehouse"))?)
    }

    async fn parent_location(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<Box<Model>>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.parent_location_id {
            Ok(loader.load_one(PrimaryKey(id)).await?.map(Box::new))
        } else {
            Ok(None)
        }
    }

    async fn children_locations(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(
            sqlx::query_as::<_, Model>("select * from wms.locations where parent_location_id = $1")
                .bind(self.id)
                .fetch_all(db)
                .await?,
        )
    }

    async fn inventory_stock(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<inventory_stock::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, inventory_stock::Model>(
            "select * from wms.inventory_stock where location_id = $1",
        )
        .bind(self.id)
        .fetch_all(db)
        .await?)
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
            sqlx::query_as::<_, Self::Value>("select * from wms.locations where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
