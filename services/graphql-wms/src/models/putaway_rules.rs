use super::sea_orm_active_enums::LocationTypeEnum;

#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub product_id: Uuid,
    pub client_id: Option<Uuid>,
    pub warehouse_id: Uuid,
    pub preferred_location_id: Option<Uuid>,
    pub location_type: Option<LocationTypeEnum>,
    pub priority: i32,
    pub min_quantity: Option<i32>,
    pub max_quantity: Option<i32>,
    pub weight_threshold: Option<f32>,
    pub volume_threshold: Option<f32>,
    pub requires_temperature_control: Option<bool>,
    pub requires_hazmat_approval: Option<bool>,
    pub is_active: Option<bool>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
