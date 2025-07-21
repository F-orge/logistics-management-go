// Create/Update structs for lms_packages

use crate::entities::_generated::lms_packages::*;
use crate::entities::_generated::sea_orm_active_enums::LmsPackageType;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

#[derive(Debug, Clone, InputObject)]
pub struct CreatePackage {
    pub shipment_id: Uuid,
    pub package_number: String,
    pub weight: Decimal,
    pub length: Option<Decimal>,
    pub width: Option<Decimal>,
    pub height: Option<Decimal>,
    pub package_type: LmsPackageType,
    pub contents_description: Option<String>,
    pub declared_value: Option<Decimal>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePackage {
    pub id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub package_number: Option<String>,
    pub weight: Option<Decimal>,
    pub length: Option<Option<Decimal>>,
    pub width: Option<Option<Decimal>>,
    pub height: Option<Option<Decimal>>,
    pub package_type: Option<LmsPackageType>,
    pub contents_description: Option<Option<String>>,
    pub declared_value: Option<Option<Decimal>>,
}

impl IntoActiveModel<ActiveModel> for CreatePackage {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.shipment_id = Set(self.shipment_id);
        active_model.package_number = Set(self.package_number);
        active_model.weight = Set(self.weight);
        active_model.length = Set(self.length);
        active_model.width = Set(self.width);
        active_model.height = Set(self.height);
        active_model.package_type = Set(self.package_type);
        active_model.contents_description = Set(self.contents_description);
        active_model.declared_value = Set(self.declared_value);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdatePackage {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(shipment_id) = self.shipment_id {
            active_model.shipment_id = Set(shipment_id);
        }
        if let Some(package_number) = self.package_number {
            active_model.package_number = Set(package_number);
        }
        if let Some(weight) = self.weight {
            active_model.weight = Set(weight);
        }
        if let Some(length) = self.length {
            active_model.length = Set(length);
        }
        if let Some(width) = self.width {
            active_model.width = Set(width);
        }
        if let Some(height) = self.height {
            active_model.height = Set(height);
        }
        if let Some(package_type) = self.package_type {
            active_model.package_type = Set(package_type);
        }
        if let Some(contents_description) = self.contents_description {
            active_model.contents_description = Set(contents_description);
        }
        if let Some(declared_value) = self.declared_value {
            active_model.declared_value = Set(declared_value);
        }
        active_model
    }
}
