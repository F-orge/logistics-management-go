use crate::entities::_generated::geofences;
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};

#[derive(Debug, Clone, InputObject)]
pub struct InsertGeofence {
    pub name: String,
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

use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use crate::entities::_generated::geofence_events;

#[ComplexObject]
impl geofences::Model {
    async fn geofence_events(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<geofence_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = geofence_events::Entity::find()
            .filter(geofence_events::Column::GeofenceId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
