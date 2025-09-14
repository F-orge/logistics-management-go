use crate::entities::_generated::packages;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertPackage {
    pub sales_order_id: Uuid,
    pub package_number: String,
    pub warehouse_id: Uuid,
    pub package_type: Option<String>,
    pub weight: Option<f32>,
    pub length: Option<f32>,
    pub width: Option<f32>,
    pub height: Option<f32>,
    pub volume: Option<f32>,
    pub tracking_number: Option<String>,
    pub carrier: Option<String>,
    pub service_level: Option<String>,
    pub packed_by_user_id: Option<Uuid>,
    pub packed_at: Option<sea_orm::prelude::DateTime>,
    pub shipped_at: Option<sea_orm::prelude::DateTime>,
    pub is_fragile: Option<bool>,
    pub is_hazmat: Option<bool>,
    pub requires_signature: Option<bool>,
    pub insurance_value: Option<Decimal>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePackage {
    pub sales_order_id: Option<Uuid>,
    pub package_number: Option<String>,
    pub warehouse_id: Option<Uuid>,
    pub package_type: Option<Option<String>>,
    pub weight: Option<Option<f32>>,
    pub length: Option<Option<f32>>,
    pub width: Option<Option<f32>>,
    pub height: Option<Option<f32>>,
    pub volume: Option<Option<f32>>,
    pub tracking_number: Option<Option<String>>,
    pub carrier: Option<Option<String>>,
    pub service_level: Option<Option<String>>,
    pub packed_by_user_id: Option<Option<Uuid>>,
    pub packed_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub shipped_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub is_fragile: Option<Option<bool>>,
    pub is_hazmat: Option<Option<bool>>,
    pub requires_signature: Option<Option<bool>>,
    pub insurance_value: Option<Option<Decimal>>,
}

impl IntoActiveModel<packages::ActiveModel> for InsertPackage {
    fn into_active_model(self) -> packages::ActiveModel {
        let mut active_model = packages::ActiveModel::new();
        active_model.sales_order_id = Set(self.sales_order_id);
        active_model.package_number = Set(self.package_number);
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.package_type = Set(self.package_type);
        active_model.weight = Set(self.weight);
        active_model.length = Set(self.length);
        active_model.width = Set(self.width);
        active_model.height = Set(self.height);
        active_model.volume = Set(self.volume);
        active_model.tracking_number = Set(self.tracking_number);
        active_model.carrier = Set(self.carrier);
        active_model.service_level = Set(self.service_level);
        active_model.packed_by_user_id = Set(self.packed_by_user_id);
        active_model.packed_at = Set(self.packed_at);
        active_model.shipped_at = Set(self.shipped_at);
        active_model.is_fragile = Set(self.is_fragile);
        active_model.is_hazmat = Set(self.is_hazmat);
        active_model.requires_signature = Set(self.requires_signature);
        active_model.insurance_value = Set(self.insurance_value);
        active_model
    }
}

impl IntoActiveModel<packages::ActiveModel> for UpdatePackage {
    fn into_active_model(self) -> packages::ActiveModel {
        let mut active_model = packages::ActiveModel::new();
        active_model.sales_order_id = self.sales_order_id.map(Set).unwrap_or(NotSet);
        active_model.package_number = self.package_number.map(Set).unwrap_or(NotSet);
        active_model.warehouse_id = self.warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.package_type = self.package_type.map(Set).unwrap_or(NotSet);
        active_model.weight = self.weight.map(Set).unwrap_or(NotSet);
        active_model.length = self.length.map(Set).unwrap_or(NotSet);
        active_model.width = self.width.map(Set).unwrap_or(NotSet);
        active_model.height = self.height.map(Set).unwrap_or(NotSet);
        active_model.volume = self.volume.map(Set).unwrap_or(NotSet);
        active_model.tracking_number = self.tracking_number.map(Set).unwrap_or(NotSet);
        active_model.carrier = self.carrier.map(Set).unwrap_or(NotSet);
        active_model.service_level = self.service_level.map(Set).unwrap_or(NotSet);
        active_model.packed_by_user_id = self.packed_by_user_id.map(Set).unwrap_or(NotSet);
        active_model.packed_at = self.packed_at.map(Set).unwrap_or(NotSet);
        active_model.shipped_at = self.shipped_at.map(Set).unwrap_or(NotSet);
        active_model.is_fragile = self.is_fragile.map(Set).unwrap_or(NotSet);
        active_model.is_hazmat = self.is_hazmat.map(Set).unwrap_or(NotSet);
        active_model.requires_signature = self.requires_signature.map(Set).unwrap_or(NotSet);
        active_model.insurance_value = self.insurance_value.map(Set).unwrap_or(NotSet);
        active_model
    }
}
