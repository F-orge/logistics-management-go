use super::sea_orm_active_enums::DriverScheduleReasonEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub driver_id: Uuid,
    pub start_date: Date,
    pub end_date: Date,
    pub reason: Option<DriverScheduleReasonEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
