use super::sea_orm_active_enums::PricingModelEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub rate_card_id: Uuid,
    pub condition: String,
    pub value: String,
    pub price: Decimal,
    pub pricing_model: PricingModelEnum,
    pub min_value: Option<Decimal>,
    pub max_value: Option<Decimal>,
    pub priority: Option<i32>,
    pub is_active: Option<bool>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
