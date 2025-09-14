use crate::entities::_generated::outbound_shipment_items;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertOutboundShipmentItem {
    pub outbound_shipment_id: Uuid,
    pub sales_order_item_id: Uuid,
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub quantity_shipped: i32,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateOutboundShipmentItem {
    pub outbound_shipment_id: Option<Uuid>,
    pub sales_order_item_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub batch_id: Option<Option<Uuid>>,
    pub quantity_shipped: Option<i32>,
}

impl IntoActiveModel<outbound_shipment_items::ActiveModel> for InsertOutboundShipmentItem {
    fn into_active_model(self) -> outbound_shipment_items::ActiveModel {
        let mut active_model = outbound_shipment_items::ActiveModel::new();
        active_model.outbound_shipment_id = Set(self.outbound_shipment_id);
        active_model.sales_order_item_id = Set(self.sales_order_item_id);
        active_model.product_id = Set(self.product_id);
        active_model.batch_id = Set(self.batch_id);
        active_model.quantity_shipped = Set(self.quantity_shipped);
        active_model
    }
}

impl IntoActiveModel<outbound_shipment_items::ActiveModel> for UpdateOutboundShipmentItem {
    fn into_active_model(self) -> outbound_shipment_items::ActiveModel {
        let mut active_model = outbound_shipment_items::ActiveModel::new();
        active_model.outbound_shipment_id = self.outbound_shipment_id.map(Set).unwrap_or(NotSet);
        active_model.sales_order_item_id = self.sales_order_item_id.map(Set).unwrap_or(NotSet);
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.batch_id = self.batch_id.map(Set).unwrap_or(NotSet);
        active_model.quantity_shipped = self.quantity_shipped.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};
use crate::entities::_generated::{outbound_shipments, sales_order_items, products, inventory_batches};

#[ComplexObject]
impl outbound_shipment_items::Model {
    async fn outbound_shipment(&self, ctx: &Context<'_>) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = outbound_shipments::Entity::find_by_id(self.outbound_shipment_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Outbound shipment not found")),
        }
    }

    async fn sales_order_item(&self, ctx: &Context<'_>) -> async_graphql::Result<sales_order_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = sales_order_items::Entity::find_by_id(self.sales_order_item_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Sales order item not found")),
        }
    }

    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = products::Entity::find_by_id(self.product_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Product not found")),
        }
    }

    async fn batch(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<inventory_batches::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(batch_id) = self.batch_id {
            let res = inventory_batches::Entity::find_by_id(batch_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

}
