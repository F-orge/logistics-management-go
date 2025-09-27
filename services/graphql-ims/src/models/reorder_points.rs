#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub product_id: Uuid,
    pub warehouse_id: Uuid,
    pub threshold: i32,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
