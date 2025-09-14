use crate::entities::_generated::documents;
use crate::entities::_generated::sea_orm_active_enums::DocumentTypeEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertDocument {
    pub record_id: Uuid,
    pub record_type: String,
    pub document_type: DocumentTypeEnum,
    pub file_path: String,
    pub file_name: String,
    pub file_size: Option<i32>,
    pub mime_type: Option<String>,
    pub uploaded_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDocument {
    pub record_id: Option<Uuid>,
    pub record_type: Option<String>,
    pub document_type: Option<DocumentTypeEnum>,
    pub file_path: Option<String>,
    pub file_name: Option<String>,
    pub file_size: Option<Option<i32>>,
    pub mime_type: Option<Option<String>>,
    pub uploaded_by_user_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<documents::ActiveModel> for InsertDocument {
    fn into_active_model(self) -> documents::ActiveModel {
        let mut active_model = documents::ActiveModel::new();
        active_model.record_id = Set(self.record_id);
        active_model.record_type = Set(self.record_type);
        active_model.document_type = Set(self.document_type);
        active_model.file_path = Set(self.file_path);
        active_model.file_name = Set(self.file_name);
        active_model.file_size = Set(self.file_size);
        active_model.mime_type = Set(self.mime_type);
        active_model.uploaded_by_user_id = Set(self.uploaded_by_user_id);
        active_model
    }
}

impl IntoActiveModel<documents::ActiveModel> for UpdateDocument {
    fn into_active_model(self) -> documents::ActiveModel {
        let mut active_model = documents::ActiveModel::new();
        active_model.record_id = self.record_id.map(Set).unwrap_or(NotSet);
        active_model.record_type = self.record_type.map(Set).unwrap_or(NotSet);
        active_model.document_type = self.document_type.map(Set).unwrap_or(NotSet);
        active_model.file_path = self.file_path.map(Set).unwrap_or(NotSet);
        active_model.file_name = self.file_name.map(Set).unwrap_or(NotSet);
        active_model.file_size = self.file_size.map(Set).unwrap_or(NotSet);
        active_model.mime_type = self.mime_type.map(Set).unwrap_or(NotSet);
        active_model.uploaded_by_user_id = self.uploaded_by_user_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl documents::Model {

}
