use crate::entities::_generated::inventory_stock;
use crate::entities::_generated::sea_orm_active_enums::InventoryStockStatusEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertInventoryStock {
    pub location_id: Uuid,
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub quantity: i32,
    pub reserved_quantity: i32,
    pub available_quantity: Option<i32>,
    pub status: Option<InventoryStockStatusEnum>,
    pub last_counted_at: Option<sea_orm::prelude::DateTime>,
    pub last_movement_at: Option<sea_orm::prelude::DateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInventoryStock {
    pub location_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub batch_id: Option<Option<Uuid>>,
    pub quantity: Option<i32>,
    pub reserved_quantity: Option<i32>,
    pub available_quantity: Option<Option<i32>>,
    pub status: Option<Option<InventoryStockStatusEnum>>,
    pub last_counted_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub last_movement_at: Option<Option<sea_orm::prelude::DateTime>>,
}

impl IntoActiveModel<inventory_stock::ActiveModel> for InsertInventoryStock {
    fn into_active_model(self) -> inventory_stock::ActiveModel {
        let mut active_model = inventory_stock::ActiveModel::new();
        active_model.location_id = Set(self.location_id);
        active_model.product_id = Set(self.product_id);
        active_model.batch_id = Set(self.batch_id);
        active_model.quantity = Set(self.quantity);
        active_model.reserved_quantity = Set(self.reserved_quantity);
        active_model.available_quantity = Set(self.available_quantity);
        active_model.status = Set(self.status);
        active_model.last_counted_at = Set(self.last_counted_at);
        active_model.last_movement_at = Set(self.last_movement_at);
        active_model
    }
}

impl IntoActiveModel<inventory_stock::ActiveModel> for UpdateInventoryStock {
    fn into_active_model(self) -> inventory_stock::ActiveModel {
        let mut active_model = inventory_stock::ActiveModel::new();
        active_model.location_id = self.location_id.map(Set).unwrap_or(NotSet);
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.batch_id = self.batch_id.map(Set).unwrap_or(NotSet);
        active_model.quantity = self.quantity.map(Set).unwrap_or(NotSet);
        active_model.reserved_quantity = self.reserved_quantity.map(Set).unwrap_or(NotSet);
        active_model.available_quantity = self.available_quantity.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.last_counted_at = self.last_counted_at.map(Set).unwrap_or(NotSet);
        active_model.last_movement_at = self.last_movement_at.map(Set).unwrap_or(NotSet);
        active_model
    }
}
