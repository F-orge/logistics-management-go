use crate::entities::_generated::{sea_orm_active_enums::ShipmentLegStatusEnum, shipment_legs};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::lorem::raw::Sentence;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertShipmentLeg {
    pub shipment_id: Option<Uuid>,
    #[dummy(faker = "1..100")]
    pub leg_sequence: i32,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub start_location: Option<String>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub end_location: Option<String>,

    pub carrier_id: Option<Uuid>,

    pub internal_trip_id: Option<Uuid>,

    pub status: Option<ShipmentLegStatusEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateShipmentLeg {
    pub shipment_id: Option<Option<Uuid>>,
    pub leg_sequence: Option<i32>,
    pub start_location: Option<Option<String>>,
    pub end_location: Option<Option<String>>,
    pub carrier_id: Option<Option<Uuid>>,
    pub internal_trip_id: Option<Option<Uuid>>,
    pub status: Option<Option<ShipmentLegStatusEnum>>,
}

impl IntoActiveModel<shipment_legs::ActiveModel> for InsertShipmentLeg {
    fn into_active_model(self) -> shipment_legs::ActiveModel {
        let mut active_model = shipment_legs::ActiveModel::new();
        active_model.shipment_id = Set(self.shipment_id);
        active_model.leg_sequence = Set(self.leg_sequence);
        active_model.start_location = Set(self.start_location);
        active_model.end_location = Set(self.end_location);
        active_model.carrier_id = Set(self.carrier_id);
        active_model.internal_trip_id = Set(self.internal_trip_id);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<shipment_legs::ActiveModel> for UpdateShipmentLeg {
    fn into_active_model(self) -> shipment_legs::ActiveModel {
        let mut active_model = shipment_legs::ActiveModel::new();
        active_model.shipment_id = self.shipment_id.map(Set).unwrap_or(NotSet);
        active_model.leg_sequence = self.leg_sequence.map(Set).unwrap_or(NotSet);
        active_model.start_location = self.start_location.map(Set).unwrap_or(NotSet);
        active_model.end_location = self.end_location.map(Set).unwrap_or(NotSet);
        active_model.carrier_id = self.carrier_id.map(Set).unwrap_or(NotSet);
        active_model.internal_trip_id = self.internal_trip_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::outbound_shipments;
use crate::entities::_generated::{carriers, partner_invoice_items, shipment_leg_events, trips};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl shipment_legs::Model {
    async fn carrier(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<carriers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(carrier_id) = self.carrier_id {
            let res = carriers::Entity::find_by_id(carrier_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn outbound_shipment(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<outbound_shipments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(shipment_id) = self.shipment_id {
            let res = outbound_shipments::Entity::find_by_id(shipment_id)
                .one(db)
                .await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn partner_invoice_items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<partner_invoice_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = partner_invoice_items::Entity::find()
            .filter(partner_invoice_items::Column::ShipmentLegId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn shipment_leg_events(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<shipment_leg_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = shipment_leg_events::Entity::find()
            .filter(shipment_leg_events::Column::ShipmentLegId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn trip(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<trips::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(internal_id) = self.internal_trip_id {
            let res = trips::Entity::find_by_id(internal_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }
}
