use super::sea_orm_active_enums::CurrencyEnum;
use super::sea_orm_active_enums::ExpenseStatusEnum;
use super::sea_orm_active_enums::ExpenseTypeEnum;

#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub trip_id: Option<Uuid>,
    pub driver_id: Option<Uuid>,
    pub r#type: Option<ExpenseTypeEnum>,
    pub amount: Decimal,
    pub currency: Option<CurrencyEnum>,
    pub receipt_url: Option<String>,
    pub fuel_quantity: Option<f32>,
    pub odometer_reading: Option<i32>,
    pub status: Option<ExpenseStatusEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
