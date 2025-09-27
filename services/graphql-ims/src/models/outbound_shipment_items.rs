use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use crate::models::{inventory_batches, outbound_shipments, products, sales_order_items};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "ImsOutboundShipmentItems", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub outbound_shipment_id: Uuid,
    #[graphql(skip)]
    pub sales_order_item_id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    #[graphql(skip)]
    pub batch_id: Option<Uuid>,
    pub quantity_shipped: i32,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        todo!()
    }
    async fn outbound_shipment(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        todo!()
    }
    async fn sales_order_item(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<sales_order_items::Model> {
        todo!()
    }
    async fn batch(&self, ctx: &Context<'_>) -> async_graphql::Result<inventory_batches::Model> {
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

        let results = sqlx::query_as::<_, Self::Value>(
            "select * from ims.outbound_shipment_items where id = ANY($1)",
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
