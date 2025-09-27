use super::sea_orm_active_enums::CarrierRateUnitEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub carrier_id: Uuid,
    pub service_type: Option<String>,
    pub origin: Option<String>,
    pub destination: Option<String>,
    pub rate: Decimal,
    pub unit: Option<CarrierRateUnitEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
