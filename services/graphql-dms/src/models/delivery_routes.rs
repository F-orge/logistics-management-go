use async_graphql::{ComplexObject, Context};
use chrono::{DateTime, NaiveDate, Utc};
use uuid::Uuid;

use super::enums::DeliveryRouteStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
#[graphql(name = "DmsDeliveryRoutes", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub driver_id: Uuid,
    pub route_date: NaiveDate,
    pub status: Option<DeliveryRouteStatusEnum>,
    pub optimized_route_data: Option<String>,
    pub total_distance_km: Option<f32>,
    pub estimated_duration_minutes: Option<i32>,
    pub actual_duration_minutes: Option<i32>,
    pub started_at: Option<DateTime<Utc>>,
    pub completed_at: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn driver(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!("do drivers first")
    }
}
