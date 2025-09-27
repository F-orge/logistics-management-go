use super::sea_orm_active_enums::TripStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub driver_id: Option<Uuid>,
    pub vehicle_id: Option<Uuid>,
    pub status: Option<TripStatusEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
