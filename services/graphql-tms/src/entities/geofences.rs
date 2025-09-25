use crate::entities::_generated::geofences;
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};

// --- fake imports ---
use fake::Dummy;
use fake::faker::address::raw::StreetName;
use fake::faker::lorem::raw::Sentence;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertGeofence {
    #[dummy(faker = "StreetName(EN)")]
    pub name: String,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub coordinates: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateGeofence {
    pub name: Option<String>,
    pub coordinates: Option<Option<String>>,
}

impl IntoActiveModel<geofences::ActiveModel> for InsertGeofence {
    fn into_active_model(self) -> geofences::ActiveModel {
        let mut active_model = geofences::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.coordinates = Set(self.coordinates);
        active_model
    }
}

impl IntoActiveModel<geofences::ActiveModel> for UpdateGeofence {
    fn into_active_model(self) -> geofences::ActiveModel {
        let mut active_model = geofences::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.coordinates = self.coordinates.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::geofence_events;
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl geofences::Model {
    async fn geofence_events(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<geofence_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = geofence_events::Entity::find()
            .filter(geofence_events::Column::GeofenceId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
