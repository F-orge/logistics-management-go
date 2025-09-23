use crate::entities::_generated::driver_locations;
use crate::entities::_generated::drivers;
use async_graphql::InputObject;
use async_graphql::{ComplexObject, Context};
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use sea_orm::{DatabaseConnection, EntityTrait};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertDriverLocation {
    pub driver_id: Uuid,
    #[dummy(faker = "-90.0..90.0")]
    pub latitude: f32,
    #[dummy(faker = "-180.0..180.0")]
    pub longitude: f32,
    #[dummy(faker = "0.0..1000.0")]
    pub altitude: Option<f32>,
    #[dummy(faker = "0.0..100.0")]
    pub accuracy: Option<f32>,
    #[dummy(faker = "0.0..200.0")]
    pub speed_kmh: Option<f32>,
    #[dummy(faker = "0.0..360.0")]
    pub heading: Option<f32>,

    pub timestamp: Option<sea_orm::prelude::DateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDriverLocation {
    pub driver_id: Option<Uuid>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub altitude: Option<Option<f32>>,
    pub accuracy: Option<Option<f32>>,
    pub speed_kmh: Option<Option<f32>>,
    pub heading: Option<Option<f32>>,
    pub timestamp: Option<Option<sea_orm::prelude::DateTime>>,
}

impl IntoActiveModel<driver_locations::ActiveModel> for InsertDriverLocation {
    fn into_active_model(self) -> driver_locations::ActiveModel {
        let mut active_model = driver_locations::ActiveModel::new();
        active_model.driver_id = Set(self.driver_id);
        active_model.latitude = Set(self.latitude);
        active_model.longitude = Set(self.longitude);
        active_model.altitude = Set(self.altitude);
        active_model.accuracy = Set(self.accuracy);
        active_model.speed_kmh = Set(self.speed_kmh);
        active_model.heading = Set(self.heading);
        active_model.timestamp = Set(self.timestamp);
        active_model
    }
}

impl IntoActiveModel<driver_locations::ActiveModel> for UpdateDriverLocation {
    fn into_active_model(self) -> driver_locations::ActiveModel {
        let mut active_model = driver_locations::ActiveModel::new();
        active_model.driver_id = self.driver_id.map(Set).unwrap_or(NotSet);
        active_model.latitude = self.latitude.map(Set).unwrap_or(NotSet);
        active_model.longitude = self.longitude.map(Set).unwrap_or(NotSet);
        active_model.altitude = self.altitude.map(Set).unwrap_or(NotSet);
        active_model.accuracy = self.accuracy.map(Set).unwrap_or(NotSet);
        active_model.speed_kmh = self.speed_kmh.map(Set).unwrap_or(NotSet);
        active_model.heading = self.heading.map(Set).unwrap_or(NotSet);
        active_model.timestamp = self.timestamp.map(Set).unwrap_or(NotSet);
        active_model
    }
}

#[ComplexObject]
impl driver_locations::Model {
    async fn driver(&self, ctx: &Context<'_>) -> async_graphql::Result<drivers::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let result = drivers::Entity::find_by_id(self.driver_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Driver not found")),
        }
    }
}
