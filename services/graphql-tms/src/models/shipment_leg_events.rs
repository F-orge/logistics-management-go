#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub shipment_leg_id: Uuid,
    pub status_message: Option<String>,
    pub location: Option<String>,
    pub event_timestamp: DateTime,
}
