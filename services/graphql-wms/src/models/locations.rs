use super::sea_orm_active_enums::LocationTypeEnum;

#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub warehouse_id: Uuid,
    pub parent_location_id: Option<Uuid>,
    pub name: String,
    pub barcode: Option<String>,
    pub r#type: LocationTypeEnum,
    pub level: Option<i32>,
    pub path: Option<String>,
    pub max_weight: Option<f32>,
    pub max_volume: Option<f32>,
    pub max_pallets: Option<i32>,
    pub x_coordinate: Option<f32>,
    pub y_coordinate: Option<f32>,
    pub z_coordinate: Option<f32>,
    pub is_pickable: Option<bool>,
    pub is_receivable: Option<bool>,
    pub temperature_controlled: Option<bool>,
    pub hazmat_approved: Option<bool>,
    pub is_active: Option<bool>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
