use crate::entities::_generated::{proof_of_deliveries, sea_orm_active_enums::ProofTypeEnum};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertProofOfDelivery {
    pub trip_stop_id: Uuid,
    pub r#type: Option<ProofTypeEnum>,
    pub file_path: Option<String>,
    pub timestamp: DateTime,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateProofOfDelivery {
    pub trip_stop_id: Option<Uuid>,
    pub r#type: Option<Option<ProofTypeEnum>>,
    pub file_path: Option<Option<String>>,
    pub timestamp: Option<DateTime>,
    pub latitude: Option<Option<f32>>,
    pub longitude: Option<Option<f32>>,
}

impl IntoActiveModel<proof_of_deliveries::ActiveModel> for InsertProofOfDelivery {
    fn into_active_model(self) -> proof_of_deliveries::ActiveModel {
        let mut active_model = proof_of_deliveries::ActiveModel::new();
        active_model.trip_stop_id = Set(self.trip_stop_id);
        active_model.r#type = Set(self.r#type);
        active_model.file_path = Set(self.file_path);
        active_model.timestamp = Set(self.timestamp);
        active_model.latitude = Set(self.latitude);
        active_model.longitude = Set(self.longitude);
        active_model
    }
}

impl IntoActiveModel<proof_of_deliveries::ActiveModel> for UpdateProofOfDelivery {
    fn into_active_model(self) -> proof_of_deliveries::ActiveModel {
        let mut active_model = proof_of_deliveries::ActiveModel::new();
        active_model.trip_stop_id = self.trip_stop_id.map(Set).unwrap_or(NotSet);
        active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
        active_model.file_path = self.file_path.map(Set).unwrap_or(NotSet);
        active_model.timestamp = self.timestamp.map(Set).unwrap_or(NotSet);
        active_model.latitude = self.latitude.map(Set).unwrap_or(NotSet);
        active_model.longitude = self.longitude.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};
use crate::entities::_generated::trip_stops;

#[ComplexObject]
impl proof_of_deliveries::Model {
    async fn trip_stop(&self, ctx: &Context<'_>) -> async_graphql::Result<trip_stops::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = trip_stops::Entity::find_by_id(self.trip_stop_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("TripStop not found")),
        }
    }
}
