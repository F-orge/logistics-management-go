use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::{
    enums::{PickBatchStatusEnum, PickStrategyEnum},
    pick_batch_items, warehouses,
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
    async fn warehouse(&self, ctx: &Context<'_>) -> async_graphql::Result<warehouses::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(warehouses::PrimaryKey(self.warehouse_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find warehouse"))?)
    }

    async fn assigned_user(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<user::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.assigned_user_id {
            Ok(loader.load_one(user::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    async fn items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<pick_batch_items::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, pick_batch_items::Model>(
            "select * from wms.pick_batch_items where pick_batch_id = $1",
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
