use super::sea_orm_active_enums::TripStopStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub trip_id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub sequence: i32,
    pub address: Option<String>,
    pub status: Option<TripStopStatusEnum>,
    pub estimated_arrival_time: Option<DateTime>,
    pub actual_arrival_time: Option<DateTime>,
    pub estimated_departure_time: Option<DateTime>,
    pub actual_departure_time: Option<DateTime>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
