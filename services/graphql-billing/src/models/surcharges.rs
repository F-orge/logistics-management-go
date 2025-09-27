use super::sea_orm_active_enums::SurchargeCalculationMethodEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub r#type: String,
    pub amount: Decimal,
    pub calculation_method: SurchargeCalculationMethodEnum,
    pub is_active: Option<bool>,
    pub valid_from: Option<Date>,
    pub valid_to: Option<Date>,
    pub description: Option<String>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
