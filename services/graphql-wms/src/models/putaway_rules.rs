use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use graphql_crm::models::companies;
use uuid::Uuid;

use super::{enums::LocationTypeEnum, locations, products, warehouses};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq, Dummy)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "WmsPutawayRules", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    #[graphql(skip)]
    pub client_id: Option<Uuid>,
    #[graphql(skip)]
    pub warehouse_id: Uuid,
    #[graphql(skip)]
    pub preferred_location_id: Option<Uuid>,
    pub location_type: Option<LocationTypeEnum>,
    pub priority: i32,
    pub min_quantity: Option<i32>,
    pub max_quantity: Option<i32>,
    pub weight_threshold: Option<f32>,
    pub volume_threshold: Option<f32>,
    pub requires_temperature_control: Option<bool>,
    pub requires_hazmat_approval: Option<bool>,
    pub is_active: Option<bool>,
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

    async fn client(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<companies::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.client_id {
            Ok(loader.load_one(companies::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    async fn warehouse(&self, ctx: &Context<'_>) -> async_graphql::Result<warehouses::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(warehouses::PrimaryKey(self.warehouse_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find warehouse"))?)
    }

    async fn preferred_location(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<locations::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.preferred_location_id {
            Ok(loader.load_one(locations::PrimaryKey(id)).await?)
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

        let results =
            sqlx::query_as::<_, Self::Value>("select * from wms.putaway_rules where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
