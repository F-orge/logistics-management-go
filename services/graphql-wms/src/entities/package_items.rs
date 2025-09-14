use crate::entities::_generated::package_items;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertPackageItem {
    pub package_id: Uuid,
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub quantity: i32,
    pub lot_number: Option<String>,
    pub serial_numbers: Option<Vec<String>>,
    pub expiry_date: Option<sea_orm::prelude::Date>,
    pub unit_weight: Option<f32>,
    pub total_weight: Option<f32>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePackageItem {
    pub package_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub batch_id: Option<Option<Uuid>>,
    pub quantity: Option<i32>,
    pub lot_number: Option<Option<String>>,
    pub serial_numbers: Option<Option<Vec<String>>>,
    pub expiry_date: Option<Option<sea_orm::prelude::Date>>,
    pub unit_weight: Option<Option<f32>>,
    pub total_weight: Option<Option<f32>>,
}

impl IntoActiveModel<package_items::ActiveModel> for InsertPackageItem {
    fn into_active_model(self) -> package_items::ActiveModel {
        let mut active_model = package_items::ActiveModel::new();
        active_model.package_id = Set(self.package_id);
        active_model.product_id = Set(self.product_id);
        active_model.batch_id = Set(self.batch_id);
        active_model.quantity = Set(self.quantity);
        active_model.lot_number = Set(self.lot_number);
        active_model.serial_numbers = Set(self.serial_numbers);
        active_model.expiry_date = Set(self.expiry_date);
        active_model.unit_weight = Set(self.unit_weight);
        active_model.total_weight = Set(self.total_weight);
        active_model
    }
}

impl IntoActiveModel<package_items::ActiveModel> for UpdatePackageItem {
    fn into_active_model(self) -> package_items::ActiveModel {
        let mut active_model = package_items::ActiveModel::new();
        active_model.package_id = self.package_id.map(Set).unwrap_or(NotSet);
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.batch_id = self.batch_id.map(Set).unwrap_or(NotSet);
        active_model.quantity = self.quantity.map(Set).unwrap_or(NotSet);
        active_model.lot_number = self.lot_number.map(Set).unwrap_or(NotSet);
        active_model.serial_numbers = self.serial_numbers.map(Set).unwrap_or(NotSet);
        active_model.expiry_date = self.expiry_date.map(Set).unwrap_or(NotSet);
        active_model.unit_weight = self.unit_weight.map(Set).unwrap_or(NotSet);
        active_model.total_weight = self.total_weight.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl package_items::Model {

}
