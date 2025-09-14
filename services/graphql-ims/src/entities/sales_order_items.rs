use crate::entities::_generated::sales_order_items;
use async_graphql::InputObject;
use chrono::{DateTime, Utc};
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertSalesOrderItem {
    pub sales_order_id: Uuid,
    pub product_id: Uuid,
    pub quantity_ordered: i32,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateSalesOrderItem {
    pub sales_order_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub quantity_ordered: Option<i32>,
    pub created_at: Option<Option<DateTime<Utc>>>,
    pub updated_at: Option<Option<DateTime<Utc>>>,
}

impl IntoActiveModel<sales_order_items::ActiveModel> for InsertSalesOrderItem {
    fn into_active_model(self) -> sales_order_items::ActiveModel {
        let mut active_model = sales_order_items::ActiveModel::new();
        active_model.sales_order_id = Set(self.sales_order_id);
        active_model.product_id = Set(self.product_id);
        active_model.quantity_ordered = Set(self.quantity_ordered);
        active_model
    }
}

impl IntoActiveModel<sales_order_items::ActiveModel> for UpdateSalesOrderItem {
    fn into_active_model(self) -> sales_order_items::ActiveModel {
        let mut active_model = sales_order_items::ActiveModel::new();
        active_model.sales_order_id = self.sales_order_id.map(Set).unwrap_or(NotSet);
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.quantity_ordered = self.quantity_ordered.map(Set).unwrap_or(NotSet);
        active_model
    }
}
