use crate::entities::_generated::inbound_shipments;
use crate::entities::_generated::sea_orm_active_enums::InboundShipmentStatusEnum;
use async_graphql::InputObject;
use chrono::NaiveDate;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertInboundShipment {
    pub client_id: Option<Uuid>,
    pub warehouse_id: Uuid,
    pub status: Option<InboundShipmentStatusEnum>,
    pub expected_arrival_date: Option<NaiveDate>,
    pub actual_arrival_date: Option<NaiveDate>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInboundShipment {
    pub client_id: Option<Option<Uuid>>,
    pub warehouse_id: Option<Uuid>,
    pub status: Option<Option<InboundShipmentStatusEnum>>,
    pub expected_arrival_date: Option<Option<NaiveDate>>,
    pub actual_arrival_date: Option<Option<NaiveDate>>,
}

impl IntoActiveModel<inbound_shipments::ActiveModel> for InsertInboundShipment {
    fn into_active_model(self) -> inbound_shipments::ActiveModel {
        let mut active_model = inbound_shipments::ActiveModel::new();
        active_model.client_id = Set(self.client_id);
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.status = Set(self.status);
        active_model.expected_arrival_date = Set(self.expected_arrival_date);
        active_model.actual_arrival_date = Set(self.actual_arrival_date);
        active_model
    }
}

impl IntoActiveModel<inbound_shipments::ActiveModel> for UpdateInboundShipment {
    fn into_active_model(self) -> inbound_shipments::ActiveModel {
        let mut active_model = inbound_shipments::ActiveModel::new();
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.warehouse_id = self.warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.expected_arrival_date = self.expected_arrival_date.map(Set).unwrap_or(NotSet);
        active_model.actual_arrival_date = self.actual_arrival_date.map(Set).unwrap_or(NotSet);
        active_model
    }
}
