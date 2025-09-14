use crate::entities::_generated::sales_orders;
use crate::entities::_generated::sea_orm_active_enums::SalesOrderStatusEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertSalesOrder {
    pub order_number: String,
    pub client_id: Uuid,
    pub crm_opportunity_id: Option<Uuid>,
    pub status: Option<SalesOrderStatusEnum>,
    pub shipping_address: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateSalesOrder {
    pub order_number: Option<String>,
    pub client_id: Option<Uuid>,
    pub crm_opportunity_id: Option<Option<Uuid>>,
    pub status: Option<Option<SalesOrderStatusEnum>>,
    pub shipping_address: Option<Option<String>>,
}

impl IntoActiveModel<sales_orders::ActiveModel> for InsertSalesOrder {
    fn into_active_model(self) -> sales_orders::ActiveModel {
        let mut active_model = sales_orders::ActiveModel::new();
        active_model.order_number = Set(self.order_number);
        active_model.client_id = Set(self.client_id);
        active_model.crm_opportunity_id = Set(self.crm_opportunity_id);
        active_model.status = Set(self.status);
        active_model.shipping_address = Set(self.shipping_address);
        active_model
    }
}

impl IntoActiveModel<sales_orders::ActiveModel> for UpdateSalesOrder {
    fn into_active_model(self) -> sales_orders::ActiveModel {
        let mut active_model = sales_orders::ActiveModel::new();
        active_model.order_number = self.order_number.map(Set).unwrap_or(NotSet);
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.crm_opportunity_id = self.crm_opportunity_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.shipping_address = self.shipping_address.map(Set).unwrap_or(NotSet);
        active_model
    }
}
