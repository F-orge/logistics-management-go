use fake::Dummy;
use fake::faker::lorem::en::Paragraph;
use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use crate::models::{inbound_shipments, products};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq, Dummy)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "ImsInboundShipmentItems", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub inbound_shipment_id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    pub expected_quantity: i32,
    pub received_quantity: Option<i32>,
    pub discrepancy_quantity: Option<i32>,
    #[dummy(faker = "Paragraph(1..3)")]
    pub discrepancy_notes: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn inbound_shipment(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(inbound_shipments::PrimaryKey(self.inbound_shipment_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get inbound shipment"))?)
    }
    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(products::PrimaryKey(self.product_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get product"))?)
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
            "select * from ims.inbound_shipment_items where id = ANY($1)",
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
