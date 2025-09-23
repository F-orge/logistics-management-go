use crate::entities::_generated::{sea_orm_active_enums::TripStopStatusEnum, trip_stops};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::address::raw::StreetName;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertTripStop {
    pub trip_id: Uuid,

    pub shipment_id: Option<Uuid>,
    #[dummy(faker = "1..100")]
    pub sequence: i32,
    #[dummy(faker = "StreetName(EN)")]
    pub address: Option<String>,

    pub status: Option<TripStopStatusEnum>,

    pub estimated_arrival_time: Option<DateTime>,

    pub actual_arrival_time: Option<DateTime>,

    pub estimated_departure_time: Option<DateTime>,

    pub actual_departure_time: Option<DateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTripStop {
    pub trip_id: Option<Uuid>,
    pub shipment_id: Option<Option<Uuid>>,
    pub sequence: Option<i32>,
    pub address: Option<Option<String>>,
    pub status: Option<Option<TripStopStatusEnum>>,
    pub estimated_arrival_time: Option<Option<DateTime>>,
    pub actual_arrival_time: Option<Option<DateTime>>,
    pub estimated_departure_time: Option<Option<DateTime>>,
    pub actual_departure_time: Option<Option<DateTime>>,
}

impl IntoActiveModel<trip_stops::ActiveModel> for InsertTripStop {
    fn into_active_model(self) -> trip_stops::ActiveModel {
        let mut active_model = trip_stops::ActiveModel::new();
        active_model.trip_id = Set(self.trip_id);
        active_model.shipment_id = Set(self.shipment_id);
        active_model.sequence = Set(self.sequence);
        active_model.address = Set(self.address);
        active_model.status = Set(self.status);
        active_model.estimated_arrival_time = Set(self.estimated_arrival_time);
        active_model.actual_arrival_time = Set(self.actual_arrival_time);
        active_model.estimated_departure_time = Set(self.estimated_departure_time);
        active_model.actual_departure_time = Set(self.actual_departure_time);
        active_model
    }
}

impl IntoActiveModel<trip_stops::ActiveModel> for UpdateTripStop {
    fn into_active_model(self) -> trip_stops::ActiveModel {
        let mut active_model = trip_stops::ActiveModel::new();
        active_model.trip_id = self.trip_id.map(Set).unwrap_or(NotSet);
        active_model.shipment_id = self.shipment_id.map(Set).unwrap_or(NotSet);
        active_model.sequence = self.sequence.map(Set).unwrap_or(NotSet);
        active_model.address = self.address.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.estimated_arrival_time =
            self.estimated_arrival_time.map(Set).unwrap_or(NotSet);
        active_model.actual_arrival_time = self.actual_arrival_time.map(Set).unwrap_or(NotSet);
        active_model.estimated_departure_time =
            self.estimated_departure_time.map(Set).unwrap_or(NotSet);
        active_model.actual_departure_time = self.actual_departure_time.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{proof_of_deliveries, trips};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl trip_stops::Model {
    async fn trip(&self, ctx: &Context<'_>) -> async_graphql::Result<trips::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = trips::Entity::find_by_id(self.trip_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Trip not found")),
        }
    }

    async fn shipment(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<graphql_ims::entities::_generated::outbound_shipments::Model>>
    {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(shipment_id) = self.shipment_id {
            let res = graphql_ims::entities::_generated::outbound_shipments::Entity::find_by_id(
                shipment_id,
            )
            .one(db)
            .await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn proof_of_deliveries(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<proof_of_deliveries::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = proof_of_deliveries::Entity::find()
            .filter(proof_of_deliveries::Column::TripStopId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
