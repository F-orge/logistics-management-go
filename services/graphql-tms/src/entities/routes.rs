use crate::entities::_generated::routes;
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::lorem::raw::Word;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertRoute {
    pub trip_id: Uuid,
    #[dummy(faker = "Word(EN)")]
    pub optimized_route_data: Option<String>,
    #[dummy(faker = "1.0..1000.0")]
    pub total_distance: Option<f32>,
    #[dummy(faker = "1.0..1000.0")]
    pub total_duration: Option<f32>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateRoute {
    pub trip_id: Option<Uuid>,
    pub optimized_route_data: Option<Option<String>>,
    pub total_distance: Option<Option<f32>>,
    pub total_duration: Option<Option<f32>>,
}

impl IntoActiveModel<routes::ActiveModel> for InsertRoute {
    fn into_active_model(self) -> routes::ActiveModel {
        let mut active_model = routes::ActiveModel::new();
        active_model.trip_id = Set(self.trip_id);
        active_model.optimized_route_data = Set(self.optimized_route_data);
        active_model.total_distance = Set(self.total_distance);
        active_model.total_duration = Set(self.total_duration);
        active_model
    }
}

impl IntoActiveModel<routes::ActiveModel> for UpdateRoute {
    fn into_active_model(self) -> routes::ActiveModel {
        let mut active_model = routes::ActiveModel::new();
        active_model.trip_id = self.trip_id.map(Set).unwrap_or(NotSet);
        active_model.optimized_route_data = self.optimized_route_data.map(Set).unwrap_or(NotSet);
        active_model.total_distance = self.total_distance.map(Set).unwrap_or(NotSet);
        active_model.total_duration = self.total_duration.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::trips;
use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl routes::Model {
    async fn trip(&self, ctx: &Context<'_>) -> async_graphql::Result<trips::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = trips::Entity::find_by_id(self.trip_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Trip not found")),
        }
    }
}
