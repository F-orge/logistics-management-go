use crate::entities::_generated::sea_orm_active_enums::StockTransferStatusEnum;
use crate::entities::_generated::stock_transfers;
use async_graphql::InputObject;
use chrono::{DateTime, Utc};
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertStockTransfer {
    pub product_id: Uuid,
    pub source_warehouse_id: Uuid,
    pub destination_warehouse_id: Uuid,
    pub quantity: i32,
    pub status: Option<StockTransferStatusEnum>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateStockTransfer {
    pub product_id: Option<Uuid>,
    pub source_warehouse_id: Option<Uuid>,
    pub destination_warehouse_id: Option<Uuid>,
    pub quantity: Option<i32>,
    pub status: Option<Option<StockTransferStatusEnum>>,
    pub created_at: Option<Option<DateTime<Utc>>>,
    pub updated_at: Option<Option<DateTime<Utc>>>,
}

impl IntoActiveModel<stock_transfers::ActiveModel> for InsertStockTransfer {
    fn into_active_model(self) -> stock_transfers::ActiveModel {
        let mut active_model = stock_transfers::ActiveModel::new();
        active_model.product_id = Set(self.product_id);
        active_model.source_warehouse_id = Set(self.source_warehouse_id);
        active_model.destination_warehouse_id = Set(self.destination_warehouse_id);
        active_model.quantity = Set(self.quantity);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<stock_transfers::ActiveModel> for UpdateStockTransfer {
    fn into_active_model(self) -> stock_transfers::ActiveModel {
        let mut active_model = stock_transfers::ActiveModel::new();
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.source_warehouse_id = self.source_warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.destination_warehouse_id =
            self.destination_warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.quantity = self.quantity.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl stock_transfers::Model {

}
