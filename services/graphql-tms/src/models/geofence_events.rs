use super::sea_orm_active_enums::GeofenceEventTypeEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub vehicle_id: Uuid,
    pub geofence_id: Uuid,
    pub event_type: GeofenceEventTypeEnum,
    pub timestamp: DateTime,
}
