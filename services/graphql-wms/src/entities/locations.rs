use crate::entities::_generated::locations;
use crate::entities::_generated::sea_orm_active_enums::LocationTypeEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertLocation {
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
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateLocation {
    pub warehouse_id: Option<Uuid>,
    pub parent_location_id: Option<Option<Uuid>>,
    pub name: Option<String>,
    pub barcode: Option<Option<String>>,
    pub r#type: Option<LocationTypeEnum>,
    pub level: Option<Option<i32>>,
    pub path: Option<Option<String>>,
    pub max_weight: Option<Option<f32>>,
    pub max_volume: Option<Option<f32>>,
    pub max_pallets: Option<Option<i32>>,
    pub x_coordinate: Option<Option<f32>>,
    pub y_coordinate: Option<Option<f32>>,
    pub z_coordinate: Option<Option<f32>>,
    pub is_pickable: Option<Option<bool>>,
    pub is_receivable: Option<Option<bool>>,
    pub temperature_controlled: Option<Option<bool>>,
    pub hazmat_approved: Option<Option<bool>>,
    pub is_active: Option<Option<bool>>,
}

impl IntoActiveModel<locations::ActiveModel> for InsertLocation {
    fn into_active_model(self) -> locations::ActiveModel {
        let mut active_model = locations::ActiveModel::new();
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.parent_location_id = Set(self.parent_location_id);
        active_model.name = Set(self.name);
        active_model.barcode = Set(self.barcode);
        active_model.r#type = Set(self.r#type);
        active_model.level = Set(self.level);
        active_model.path = Set(self.path);
        active_model.max_weight = Set(self.max_weight);
        active_model.max_volume = Set(self.max_volume);
        active_model.max_pallets = Set(self.max_pallets);
        active_model.x_coordinate = Set(self.x_coordinate);
        active_model.y_coordinate = Set(self.y_coordinate);
        active_model.z_coordinate = Set(self.z_coordinate);
        active_model.is_pickable = Set(self.is_pickable);
        active_model.is_receivable = Set(self.is_receivable);
        active_model.temperature_controlled = Set(self.temperature_controlled);
        active_model.hazmat_approved = Set(self.hazmat_approved);
        active_model.is_active = Set(self.is_active);
        active_model
    }
}

impl IntoActiveModel<locations::ActiveModel> for UpdateLocation {
    fn into_active_model(self) -> locations::ActiveModel {
        let mut active_model = locations::ActiveModel::new();
        active_model.warehouse_id = self.warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.parent_location_id = self.parent_location_id.map(Set).unwrap_or(NotSet);
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.barcode = self.barcode.map(Set).unwrap_or(NotSet);
        active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
        active_model.level = self.level.map(Set).unwrap_or(NotSet);
        active_model.path = self.path.map(Set).unwrap_or(NotSet);
        active_model.max_weight = self.max_weight.map(Set).unwrap_or(NotSet);
        active_model.max_volume = self.max_volume.map(Set).unwrap_or(NotSet);
        active_model.max_pallets = self.max_pallets.map(Set).unwrap_or(NotSet);
        active_model.x_coordinate = self.x_coordinate.map(Set).unwrap_or(NotSet);
        active_model.y_coordinate = self.y_coordinate.map(Set).unwrap_or(NotSet);
        active_model.z_coordinate = self.z_coordinate.map(Set).unwrap_or(NotSet);
        active_model.is_pickable = self.is_pickable.map(Set).unwrap_or(NotSet);
        active_model.is_receivable = self.is_receivable.map(Set).unwrap_or(NotSet);
        active_model.temperature_controlled =
            self.temperature_controlled.map(Set).unwrap_or(NotSet);
        active_model.hazmat_approved = self.hazmat_approved.map(Set).unwrap_or(NotSet);
        active_model.is_active = self.is_active.map(Set).unwrap_or(NotSet);
        active_model
    }
}
