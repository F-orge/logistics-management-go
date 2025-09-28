use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::{
    pick_batch_items,
    sea_orm_active_enums::{PickBatchStatusEnum, PickStrategyEnum},
    warehouses,
};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "WmsPickBatches", complex)]
pub struct Model {
    pub id: Uuid,
    pub batch_number: String,
    #[graphql(skip)]
    pub warehouse_id: Uuid,
    pub status: Option<PickBatchStatusEnum>,
    pub strategy: PickStrategyEnum,
    pub priority: Option<i32>,
    #[graphql(skip)]
    pub assigned_user_id: Option<Uuid>,
    pub wave_id: Option<String>,
    pub zone_restrictions: Option<Vec<String>>,
    pub estimated_duration: Option<i32>,
    pub actual_duration: Option<i32>,
    pub total_items: Option<i32>,
    pub completed_items: Option<i32>,
    pub started_at: Option<DateTime<Utc>>,
    pub completed_at: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn warehouse(&self, _ctx: &Context<'_>) -> async_graphql::Result<warehouses::Model> {
        todo!()
    }

    async fn assigned_user(&self, _ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }

    async fn items(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<pick_batch_items::Model>> {
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
            sqlx::query_as::<_, Self::Value>("select * from wms.pick_batches where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
