use super::sea_orm_active_enums::VehicleStatusEnum;

#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub registration_number: String,
    pub model: Option<String>,
    pub capacity_volume: Option<f32>,
    pub capacity_weight: Option<f32>,
    pub status: Option<VehicleStatusEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
