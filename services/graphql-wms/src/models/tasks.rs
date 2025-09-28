use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::{
    pick_batches, sea_orm_active_enums::TaskStatusEnum, sea_orm_active_enums::TaskTypeEnum,
    task_items, warehouses,
};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "WmsTasks", complex)]
pub struct Model {
    pub id: Uuid,
    pub task_number: String,
    #[graphql(skip)]
    pub warehouse_id: Uuid,
    #[graphql(skip)]
    pub user_id: Option<Uuid>,
    pub r#type: TaskTypeEnum,
    pub status: Option<TaskStatusEnum>,
    pub priority: Option<i32>,
    pub source_entity_id: Option<Uuid>,
    pub source_entity_type: Option<String>,
    #[graphql(skip)]
    pub pick_batch_id: Option<Uuid>,
    pub estimated_duration: Option<i32>,
    pub actual_duration: Option<i32>,
    pub instructions: Option<String>,
    pub notes: Option<String>,
    pub start_time: Option<DateTime<Utc>>,
    pub end_time: Option<DateTime<Utc>>,
    pub duration_seconds: Option<i32>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn warehouse(&self, _ctx: &Context<'_>) -> async_graphql::Result<warehouses::Model> {
        todo!()
    }

    async fn user(&self, _ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }

    async fn pick_batch(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<pick_batches::Model>> {
        todo!()
    }

    async fn items(&self, _ctx: &Context<'_>) -> async_graphql::Result<Vec<task_items::Model>> {
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

        let results = sqlx::query_as::<_, Self::Value>("select * from wms.tasks where id = ANY($1)")
            .bind(&keys)
            .fetch_all(&self.pool)
            .await?
            .into_iter()
            .map(|model| (PrimaryKey(model.id), model))
            .collect::<_>();

        Ok(results)
    }
}
