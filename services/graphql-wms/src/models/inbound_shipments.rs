use fake::Dummy;
use std::sync::Arc;

use crate::models::warehouses;
use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, NaiveDate, Utc};
use graphql_core::PostgresDataLoader;
use graphql_crm::models::companies;
use uuid::Uuid;

use crate::models::inbound_shipment_items;

use super::enums::InboundShipmentStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq, Dummy)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "ImsInboundShipments", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub client_id: Option<Uuid>,
    #[graphql(skip)]
    pub warehouse_id: Uuid,
    pub status: Option<InboundShipmentStatusEnum>,
    pub expected_arrival_date: Option<NaiveDate>,
    pub actual_arrival_date: Option<NaiveDate>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
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

    async fn items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<inbound_shipment_items::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, inbound_shipment_items::Model>(
            "select * from ims.inbound_shipment_items where inbound_shipment_id = $1",
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

        let results = sqlx::query_as::<_, Self::Value>(
            "select * from ims.inbound_shipments where id = ANY($1)",
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
