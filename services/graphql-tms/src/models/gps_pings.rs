#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub vehicle_id: Uuid,
    pub latitude: f32,
    pub longitude: f32,
    pub timestamp: DateTime,
}
