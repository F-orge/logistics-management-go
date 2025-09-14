use crate::entities::_generated::invoice_line_items;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertInvoiceLineItem {
    pub invoice_id: Uuid,
    pub source_record_id: Option<Uuid>,
    pub source_record_type: Option<String>,
    pub description: String,
    pub quantity: Decimal,
    pub unit_price: Decimal,
    pub total_price: Option<Decimal>,
    pub tax_rate: Option<Decimal>,
    pub tax_amount: Option<Decimal>,
    pub discount_rate: Option<Decimal>,
    pub discount_amount: Option<Decimal>,
    pub line_total: Option<Decimal>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInvoiceLineItem {
    pub invoice_id: Option<Uuid>,
    pub source_record_id: Option<Option<Uuid>>,
    pub source_record_type: Option<Option<String>>,
    pub description: Option<String>,
    pub quantity: Option<Decimal>,
    pub unit_price: Option<Decimal>,
    pub total_price: Option<Option<Decimal>>,
    pub tax_rate: Option<Option<Decimal>>,
    pub tax_amount: Option<Option<Decimal>>,
    pub discount_rate: Option<Option<Decimal>>,
    pub discount_amount: Option<Option<Decimal>>,
    pub line_total: Option<Option<Decimal>>,
}

impl IntoActiveModel<invoice_line_items::ActiveModel> for InsertInvoiceLineItem {
    fn into_active_model(self) -> invoice_line_items::ActiveModel {
        let mut active_model = invoice_line_items::ActiveModel::new();
        active_model.invoice_id = Set(self.invoice_id);
        active_model.source_record_id = Set(self.source_record_id);
        active_model.source_record_type = Set(self.source_record_type);
        active_model.description = Set(self.description);
        active_model.quantity = Set(self.quantity);
        active_model.unit_price = Set(self.unit_price);
        active_model.total_price = Set(self.total_price);
        active_model.tax_rate = Set(self.tax_rate);
        active_model.tax_amount = Set(self.tax_amount);
        active_model.discount_rate = Set(self.discount_rate);
        active_model.discount_amount = Set(self.discount_amount);
        active_model.line_total = Set(self.line_total);
        active_model
    }
}

impl IntoActiveModel<invoice_line_items::ActiveModel> for UpdateInvoiceLineItem {
    fn into_active_model(self) -> invoice_line_items::ActiveModel {
        let mut active_model = invoice_line_items::ActiveModel::new();
        active_model.invoice_id = self.invoice_id.map(Set).unwrap_or(NotSet);
        active_model.source_record_id = self.source_record_id.map(Set).unwrap_or(NotSet);
        active_model.source_record_type = self.source_record_type.map(Set).unwrap_or(NotSet);
        active_model.description = self.description.map(Set).unwrap_or(NotSet);
        active_model.quantity = self.quantity.map(Set).unwrap_or(NotSet);
        active_model.unit_price = self.unit_price.map(Set).unwrap_or(NotSet);
        active_model.total_price = self.total_price.map(Set).unwrap_or(NotSet);
        active_model.tax_rate = self.tax_rate.map(Set).unwrap_or(NotSet);
        active_model.tax_amount = self.tax_amount.map(Set).unwrap_or(NotSet);
        active_model.discount_rate = self.discount_rate.map(Set).unwrap_or(NotSet);
        active_model.discount_amount = self.discount_amount.map(Set).unwrap_or(NotSet);
        active_model.line_total = self.line_total.map(Set).unwrap_or(NotSet);
        active_model
    }
}
