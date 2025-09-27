use async_graphql::{ComplexObject, Context};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::delivery_tasks;

use super::enums::TaskEventStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub delivery_task_id: Uuid,
    pub status: TaskEventStatusEnum,
    pub reason: Option<String>,
    pub notes: Option<String>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub timestamp: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn delivery_task(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<delivery_tasks::Model> {
        todo!()
    }
}
