use crate::entities::_generated::proof_of_deliveries;
use crate::entities::_generated::sea_orm_active_enums::ProofOfDeliveryTypeEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::filesystem::raw::FilePath;
use fake::faker::lorem::raw::{Sentence, Word};
use fake::faker::name::raw::Name;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
#[graphql(name = "DmsInsertProofOfDelivery")]
pub struct InsertProofOfDelivery {
    pub delivery_task_id: Uuid,
    // No  because ProofOfDeliveryTypeEnum does not implement Default
    pub r#type: ProofOfDeliveryTypeEnum,
    #[dummy(faker = "FilePath(EN)")]
    pub file_path: Option<String>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub signature_data: Option<String>,
    #[dummy(faker = "Name(EN)")]
    pub recipient_name: Option<String>,
    #[dummy(faker = "Word(EN)")]
    pub verification_code: Option<String>,
    #[dummy(faker = "-90.0..90.0")]
    pub latitude: Option<f32>,
    #[dummy(faker = "-180.0..180.0")]
    pub longitude: Option<f32>,

    pub timestamp: Option<sea_orm::prelude::DateTime>,
}

#[derive(Debug, Clone, InputObject)]
#[graphql(name = "DmsUpdateProofOfDelivery")]
pub struct UpdateProofOfDelivery {
    pub delivery_task_id: Option<Uuid>,
    pub r#type: Option<ProofOfDeliveryTypeEnum>,
    pub file_path: Option<Option<String>>,
    pub signature_data: Option<Option<String>>,
    pub recipient_name: Option<Option<String>>,
    pub verification_code: Option<Option<String>>,
    pub latitude: Option<Option<f32>>,
    pub longitude: Option<Option<f32>>,
    pub timestamp: Option<Option<sea_orm::prelude::DateTime>>,
}

impl IntoActiveModel<proof_of_deliveries::ActiveModel> for InsertProofOfDelivery {
    fn into_active_model(self) -> proof_of_deliveries::ActiveModel {
        let mut active_model = proof_of_deliveries::ActiveModel::new();
        active_model.delivery_task_id = Set(self.delivery_task_id);
        active_model.r#type = Set(self.r#type);
        active_model.file_path = Set(self.file_path);
        active_model.signature_data = Set(self.signature_data);
        active_model.recipient_name = Set(self.recipient_name);
        active_model.verification_code = Set(self.verification_code);
        active_model.latitude = Set(self.latitude);
        active_model.longitude = Set(self.longitude);
        active_model.timestamp = Set(self.timestamp);
        active_model
    }
}

impl IntoActiveModel<proof_of_deliveries::ActiveModel> for UpdateProofOfDelivery {
    fn into_active_model(self) -> proof_of_deliveries::ActiveModel {
        let mut active_model = proof_of_deliveries::ActiveModel::new();
        active_model.delivery_task_id = self.delivery_task_id.map(Set).unwrap_or(NotSet);
        active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
        active_model.file_path = self.file_path.map(Set).unwrap_or(NotSet);
        active_model.signature_data = self.signature_data.map(Set).unwrap_or(NotSet);
        active_model.recipient_name = self.recipient_name.map(Set).unwrap_or(NotSet);
        active_model.verification_code = self.verification_code.map(Set).unwrap_or(NotSet);
        active_model.latitude = self.latitude.map(Set).unwrap_or(NotSet);
        active_model.longitude = self.longitude.map(Set).unwrap_or(NotSet);
        active_model.timestamp = self.timestamp.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::delivery_tasks;
use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl proof_of_deliveries::Model {
    async fn delivery_task(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<delivery_tasks::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let result = delivery_tasks::Entity::find_by_id(self.delivery_task_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Delivery task not found")),
        }
    }
}
