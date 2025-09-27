use super::sea_orm_active_enums::VehicleServiceTypeEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub vehicle_id: Uuid,
    pub service_date: Date,
    pub service_type: Option<VehicleServiceTypeEnum>,
    pub cost: Option<Decimal>,
    pub notes: Option<String>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
