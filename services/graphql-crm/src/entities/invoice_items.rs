use crate::entities::_generated::invoice_items;
use async_graphql::InputObject;
use async_graphql::{ComplexObject, Context};
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
    prelude::*,
};
use uuid::Uuid;

use fake::Dummy;
use fake::decimal::PositiveDecimal;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertInvoiceItem {
    #[dummy(default)]
    pub invoice_id: Uuid,
    #[dummy(default)]
    pub product_id: Uuid,
    #[dummy(faker = "1..10")]
    pub quantity: i32,
    #[dummy(faker = "PositiveDecimal")]
    pub price: Decimal,
}

use crate::entities::_generated::{invoices, products};

#[ComplexObject]
impl invoice_items::Model {
    async fn invoice(&self, ctx: &Context<'_>) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = invoices::Entity::find_by_id(self.invoice_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Invoice not found")),
        }
    }

    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = products::Entity::find_by_id(self.product_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Product not found")),
        }
    }
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
