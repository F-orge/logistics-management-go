use crate::entities::_generated::outbound_shipments;
use crate::entities::_generated::sea_orm_active_enums::OutboundShipmentStatusEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertOutboundShipment {
    pub sales_order_id: Uuid,
    pub warehouse_id: Uuid,
    pub status: Option<OutboundShipmentStatusEnum>,
    pub tracking_number: Option<String>,
    pub carrier: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateOutboundShipment {
    pub sales_order_id: Option<Uuid>,
    pub warehouse_id: Option<Uuid>,
    pub status: Option<Option<OutboundShipmentStatusEnum>>,
    pub tracking_number: Option<Option<String>>,
    pub carrier: Option<Option<String>>,
}

impl IntoActiveModel<outbound_shipments::ActiveModel> for InsertOutboundShipment {
    fn into_active_model(self) -> outbound_shipments::ActiveModel {
        let mut active_model = outbound_shipments::ActiveModel::new();
        active_model.sales_order_id = Set(self.sales_order_id);
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.status = Set(self.status);
        active_model.tracking_number = Set(self.tracking_number);
        active_model.carrier = Set(self.carrier);
        active_model
    }
}

impl IntoActiveModel<outbound_shipments::ActiveModel> for UpdateOutboundShipment {
    fn into_active_model(self) -> outbound_shipments::ActiveModel {
        let mut active_model = outbound_shipments::ActiveModel::new();
        active_model.sales_order_id = self.sales_order_id.map(Set).unwrap_or(NotSet);
        active_model.warehouse_id = self.warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.tracking_number = self.tracking_number.map(Set).unwrap_or(NotSet);
        active_model.carrier = self.carrier.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use crate::entities::_generated::{outbound_shipment_items, sales_orders};

#[ComplexObject]
impl outbound_shipments::Model {
    async fn outbound_shipment_items(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<outbound_shipment_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = outbound_shipment_items::Entity::find()
            .filter(outbound_shipment_items::Column::OutboundShipmentId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn sales_order(&self, ctx: &Context<'_>) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = sales_orders::Entity::find_by_id(self.sales_order_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Sales order not found")),
        }
    }

}
