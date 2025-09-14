use crate::entities::_generated::products;
use crate::entities::_generated::sea_orm_active_enums::ProductStatusEnum;
use async_graphql::InputObject;
use chrono::{DateTime, Utc};
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertProduct {
    pub name: String,
    pub sku: String,
    pub barcode: Option<String>,
    pub description: Option<String>,
    pub cost_price: Option<Decimal>,
    pub length: Option<f32>,
    pub width: Option<f32>,
    pub height: Option<f32>,
    pub volume: Option<f32>,
    pub weight: Option<f32>,
    pub status: Option<ProductStatusEnum>,
    pub supplier_id: Option<Uuid>,
    pub client_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateProduct {
    pub name: Option<String>,
    pub sku: Option<String>,
    pub barcode: Option<Option<String>>,
    pub description: Option<Option<String>>,
    pub cost_price: Option<Option<Decimal>>,
    pub length: Option<Option<f32>>,
    pub width: Option<Option<f32>>,
    pub height: Option<Option<f32>>,
    pub volume: Option<Option<f32>>,
    pub weight: Option<Option<f32>>,
    pub status: Option<Option<ProductStatusEnum>>,
    pub supplier_id: Option<Option<Uuid>>,
    pub client_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<products::ActiveModel> for InsertProduct {
    fn into_active_model(self) -> products::ActiveModel {
        let mut active_model = products::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.sku = Set(self.sku);
        active_model.barcode = Set(self.barcode);
        active_model.description = Set(self.description);
        active_model.cost_price = Set(self.cost_price);
        active_model.length = Set(self.length);
        active_model.width = Set(self.width);
        active_model.height = Set(self.height);
        active_model.volume = Set(self.volume);
        active_model.weight = Set(self.weight);
        active_model.status = Set(self.status);
        active_model.supplier_id = Set(self.supplier_id);
        active_model.client_id = Set(self.client_id);
        active_model
    }
}

impl IntoActiveModel<products::ActiveModel> for UpdateProduct {
    fn into_active_model(self) -> products::ActiveModel {
        let mut active_model = products::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.sku = self.sku.map(Set).unwrap_or(NotSet);
        active_model.barcode = self.barcode.map(Set).unwrap_or(NotSet);
        active_model.description = self.description.map(Set).unwrap_or(NotSet);
        active_model.cost_price = self.cost_price.map(Set).unwrap_or(NotSet);
        active_model.length = self.length.map(Set).unwrap_or(NotSet);
        active_model.width = self.width.map(Set).unwrap_or(NotSet);
        active_model.height = self.height.map(Set).unwrap_or(NotSet);
        active_model.volume = self.volume.map(Set).unwrap_or(NotSet);
        active_model.weight = self.weight.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.supplier_id = self.supplier_id.map(Set).unwrap_or(NotSet);
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}
