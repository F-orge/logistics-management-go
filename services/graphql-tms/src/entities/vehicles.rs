use crate::entities::_generated::{sea_orm_active_enums::VehicleStatusEnum, vehicles};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};

// --- fake imports ---
use fake::Dummy;
use fake::faker::lorem::raw::Word;
use fake::faker::number::raw::NumberWithFormat;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertVehicle {
    #[dummy(faker = "NumberWithFormat(EN, \"REG-#####\")")]
    pub registration_number: String,
    #[dummy(faker = "Word(EN)")]
    pub model: Option<String>,
    #[dummy(faker = "1.0..100.0")]
    pub capacity_volume: Option<f32>,
    #[dummy(faker = "1.0..10000.0")]
    pub capacity_weight: Option<f32>,

    pub status: Option<VehicleStatusEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateVehicle {
    pub registration_number: Option<String>,
    pub model: Option<Option<String>>,
    pub capacity_volume: Option<Option<f32>>,
    pub capacity_weight: Option<Option<f32>>,
    pub status: Option<Option<VehicleStatusEnum>>,
}

impl IntoActiveModel<vehicles::ActiveModel> for InsertVehicle {
    fn into_active_model(self) -> vehicles::ActiveModel {
        let mut active_model = vehicles::ActiveModel::new();
        active_model.registration_number = Set(self.registration_number);
        active_model.model = Set(self.model);
        active_model.capacity_volume = Set(self.capacity_volume);
        active_model.capacity_weight = Set(self.capacity_weight);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<vehicles::ActiveModel> for UpdateVehicle {
    fn into_active_model(self) -> vehicles::ActiveModel {
        let mut active_model = vehicles::ActiveModel::new();
        active_model.registration_number = self.registration_number.map(Set).unwrap_or(NotSet);
        active_model.model = self.model.map(Set).unwrap_or(NotSet);
        active_model.capacity_volume = self.capacity_volume.map(Set).unwrap_or(NotSet);
        active_model.capacity_weight = self.capacity_weight.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{geofence_events, gps_pings, trips, vehicle_maintenance};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl vehicles::Model {
    async fn geofence_events(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<geofence_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = geofence_events::Entity::find()
            .filter(geofence_events::Column::VehicleId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn gps_pings(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<gps_pings::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = gps_pings::Entity::find()
            .filter(gps_pings::Column::VehicleId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn trips(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<trips::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = trips::Entity::find()
            .filter(trips::Column::VehicleId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn vehicle_maintenance(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<vehicle_maintenance::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = vehicle_maintenance::Entity::find()
            .filter(vehicle_maintenance::Column::VehicleId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
