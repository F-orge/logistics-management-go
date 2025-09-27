use super::sea_orm_active_enums::ShipmentLegStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub leg_sequence: i32,
    pub start_location: Option<String>,
    pub end_location: Option<String>,
    pub carrier_id: Option<Uuid>,
    pub internal_trip_id: Option<Uuid>,
    pub status: Option<ShipmentLegStatusEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
