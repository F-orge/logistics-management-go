use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, NaiveDate, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::{locations, sea_orm_active_enums::TaskItemStatusEnum, tasks};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "WmsTaskItems", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub task_id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    #[graphql(skip)]
    pub batch_id: Option<Uuid>,
    #[graphql(skip)]
    pub source_location_id: Option<Uuid>,
    #[graphql(skip)]
    pub destination_location_id: Option<Uuid>,
    pub quantity_required: i32,
    pub quantity_completed: i32,
    pub quantity_remaining: Option<i32>,
    pub status: Option<TaskItemStatusEnum>,
    pub lot_number: Option<String>,
    pub serial_numbers: Option<Vec<String>>,
    pub expiry_date: Option<NaiveDate>,
    pub notes: Option<String>,
    pub completed_at: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn task(&self, _ctx: &Context<'_>) -> async_graphql::Result<tasks::Model> {
        todo!()
    }

    async fn product(&self, _ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }

    async fn batch(&self, _ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }

    async fn source_location(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<locations::Model>> {
        todo!()
    }

    async fn destination_location(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<locations::Model>> {
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
            sqlx::query_as::<_, Self::Value>("select * from wms.task_items where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
