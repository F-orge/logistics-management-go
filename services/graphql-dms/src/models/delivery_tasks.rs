use async_graphql::ComplexObject;
use async_graphql::Context;
use chrono::DateTime;
use chrono::Utc;
use uuid::Uuid;

use crate::models::delivery_routes;

use super::enums::DeliveryFailureReasonEnum;
use super::enums::DeliveryTaskStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
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
    async fn package(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }
    async fn delivery_route(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<delivery_routes::Model> {
        todo!()
    }
}
