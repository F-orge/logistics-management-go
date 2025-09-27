use super::sea_orm_active_enums::ReturnItemConditionEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub return_id: Uuid,
    pub product_id: Uuid,
    pub quantity_expected: i32,
    pub quantity_received: Option<i32>,
    pub quantity_variance: Option<i32>,
    pub condition: Option<ReturnItemConditionEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
