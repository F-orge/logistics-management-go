#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub trip_id: Uuid,
    pub optimized_route_data: Option<String>,
    pub total_distance: Option<f32>,
    pub total_duration: Option<f32>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
