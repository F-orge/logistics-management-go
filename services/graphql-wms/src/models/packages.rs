use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use uuid::Uuid;

use super::{package_items, sales_orders, warehouses};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "WmsPackages", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub sales_order_id: Uuid,
    pub package_number: String,
    #[graphql(skip)]
    pub warehouse_id: Uuid,
    pub package_type: Option<String>,
    pub weight: Option<f32>,
    pub length: Option<f32>,
    pub width: Option<f32>,
    pub height: Option<f32>,
    pub volume: Option<f32>,
    pub tracking_number: Option<String>,
    pub carrier: Option<String>,
    pub service_level: Option<String>,
    #[graphql(skip)]
    pub packed_by_user_id: Option<Uuid>,
    pub packed_at: Option<DateTime<Utc>>,
    pub shipped_at: Option<DateTime<Utc>>,
    pub is_fragile: Option<bool>,
    pub is_hazmat: Option<bool>,
    pub requires_signature: Option<bool>,
    pub insurance_value: Option<Decimal>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn sales_order(&self, ctx: &Context<'_>) -> async_graphql::Result<sales_orders::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(sales_orders::PrimaryKey(self.sales_order_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get sales order"))?)
    }

    async fn warehouse(&self, ctx: &Context<'_>) -> async_graphql::Result<warehouses::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(warehouses::PrimaryKey(self.warehouse_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find warehouse"))?)
    }

    async fn packed_by_user(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<user::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.packed_by_user_id {
            Ok(loader.load_one(user::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    async fn items(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<package_items::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, package_items::Model>(
            "select * from wms.package_items where package_id = $1",
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
            sqlx::query_as::<_, Self::Value>("select * from wms.packages where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
