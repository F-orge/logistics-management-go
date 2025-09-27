#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub pick_batch_id: Uuid,
    pub sales_order_id: Uuid,
    pub order_priority: Option<i32>,
    pub estimated_pick_time: Option<i32>,
    pub actual_pick_time: Option<i32>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
