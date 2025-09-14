use crate::entities::_generated::invoice_items;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertInvoiceItem {
    pub invoice_id: Uuid,
    pub product_id: Uuid,
    pub quantity: i32,
    pub price: Decimal,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInvoiceItem {
    pub invoice_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub quantity: Option<i32>,
    pub price: Option<Decimal>,
}

impl IntoActiveModel<invoice_items::ActiveModel> for InsertInvoiceItem {
    fn into_active_model(self) -> invoice_items::ActiveModel {
        let mut active_model = invoice_items::ActiveModel::new();
        active_model.invoice_id = Set(self.invoice_id);
        active_model.product_id = Set(self.product_id);
        active_model.quantity = Set(self.quantity);
        active_model.price = Set(self.price);
        active_model
    }
}

impl IntoActiveModel<invoice_items::ActiveModel> for UpdateInvoiceItem {
    fn into_active_model(self) -> invoice_items::ActiveModel {
        let mut active_model = invoice_items::ActiveModel::new();
        active_model.invoice_id = self.invoice_id.map(Set).unwrap_or(NotSet);
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.quantity = self.quantity.map(Set).unwrap_or(NotSet);
        active_model.price = self.price.map(Set).unwrap_or(NotSet);
        active_model
    }
}
