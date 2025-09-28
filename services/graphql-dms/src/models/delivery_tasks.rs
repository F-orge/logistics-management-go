use std::sync::Arc;

use async_graphql::ComplexObject;
use async_graphql::Context;
use async_graphql::dataloader::Loader;
use chrono::DateTime;
use chrono::Utc;
use graphql_core::PostgresDataLoader;
use sqlx::prelude::FromRow;
use uuid::Uuid;

use graphql_wms::models::packages;

use crate::models::delivery_routes;

use super::enums::DeliveryFailureReasonEnum;
use super::enums::DeliveryTaskStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject, FromRow)]
#[graphql(name = "DmsDeliveryTasks", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub package_id: Uuid,
    #[graphql(skip)]
    pub delivery_route_id: Uuid,
    pub route_sequence: i32,
    pub delivery_address: String,
    pub recipient_name: Option<String>,
    pub recipient_phone: Option<String>,
    pub delivery_instructions: Option<String>,
    pub estimated_arrival_time: Option<DateTime<Utc>>,
    pub actual_arrival_time: Option<DateTime<Utc>>,
    pub delivery_time: Option<DateTime<Utc>>,
    pub status: Option<DeliveryTaskStatusEnum>,
    pub failure_reason: Option<DeliveryFailureReasonEnum>,
    pub attempt_count: Option<i32>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn package(&self, ctx: &Context<'_>) -> async_graphql::Result<packages::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(packages::PrimaryKey(self.package_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find package"))?)
    }
    async fn delivery_route(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<delivery_routes::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(delivery_routes::PrimaryKey(self.delivery_route_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find delivery route"))?)
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
            sqlx::query_as::<_, Self::Value>("select * from dms.delivery_tasks where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
