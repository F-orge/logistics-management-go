use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use uuid::Uuid;

use super::{package_items, warehouses};

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
    async fn sales_order(&self, _ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }

    async fn warehouse(&self, _ctx: &Context<'_>) -> async_graphql::Result<warehouses::Model> {
        todo!()
    }

    async fn packed_by_user(&self, _ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }

    async fn items(&self, _ctx: &Context<'_>) -> async_graphql::Result<Vec<package_items::Model>> {
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
