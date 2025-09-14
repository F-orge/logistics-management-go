use crate::entities::_generated::{sea_orm_active_enums::TripStatusEnum, trips};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertTrip {
    pub driver_id: Option<Uuid>,
    pub vehicle_id: Option<Uuid>,
    pub status: Option<TripStatusEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTrip {
    pub driver_id: Option<Option<Uuid>>,
    pub vehicle_id: Option<Option<Uuid>>,
    pub status: Option<Option<TripStatusEnum>>,
}

impl IntoActiveModel<trips::ActiveModel> for InsertTrip {
    fn into_active_model(self) -> trips::ActiveModel {
        let mut active_model = trips::ActiveModel::new();
        active_model.driver_id = Set(self.driver_id);
        active_model.vehicle_id = Set(self.vehicle_id);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<trips::ActiveModel> for UpdateTrip {
    fn into_active_model(self) -> trips::ActiveModel {
        let mut active_model = trips::ActiveModel::new();
        active_model.driver_id = self.driver_id.map(Set).unwrap_or(NotSet);
        active_model.vehicle_id = self.vehicle_id.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{drivers, expenses, routes, shipment_legs, trip_stops, vehicles};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl trips::Model {
    async fn driver(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<drivers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(driver_id) = self.driver_id {
            let res = drivers::Entity::find_by_id(driver_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn vehicle(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<vehicles::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(vehicle_id) = self.vehicle_id {
            let res = vehicles::Entity::find_by_id(vehicle_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn expenses(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<expenses::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = expenses::Entity::find()
            .filter(expenses::Column::TripId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn routes(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<routes::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = routes::Entity::find()
            .filter(routes::Column::TripId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn shipment_legs(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<shipment_legs::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = shipment_legs::Entity::find()
            .filter(shipment_legs::Column::InternalTripId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn trip_stops(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<trip_stops::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = trip_stops::Entity::find()
            .filter(trip_stops::Column::TripId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
