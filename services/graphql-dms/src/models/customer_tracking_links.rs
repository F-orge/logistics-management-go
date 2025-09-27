use async_graphql::{ComplexObject, Context};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::delivery_tasks;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
#[graphql(name = "DmsCustomerTrackingLinks", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub delivery_task_id: Uuid,
    pub tracking_token: String,
    pub is_active: Option<bool>,
    pub access_count: Option<i32>,
    pub last_accessed_at: Option<DateTime<Utc>>,
    pub expires_at: Option<DateTime<Utc>>,
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
