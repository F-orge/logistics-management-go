use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::{inventory_stock, sea_orm_active_enums::LocationTypeEnum, warehouses};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "WmsLocations", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub warehouse_id: Uuid,
    #[graphql(skip)]
    pub parent_location_id: Option<Uuid>,
    pub name: String,
    pub barcode: Option<String>,
    pub r#type: LocationTypeEnum,
    pub level: Option<i32>,
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
    async fn warehouse(&self, _ctx: &Context<'_>) -> async_graphql::Result<warehouses::Model> {
        todo!()
    }

    async fn parent_location(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<Box<Model>>> {
        todo!()
    }

    async fn children_locations(&self, _ctx: &Context<'_>) -> async_graphql::Result<Vec<Model>> {
        todo!()
    }

    async fn inventory_stock(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<inventory_stock::Model>> {
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
