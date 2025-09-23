use crate::entities::_generated::attachments;
use crate::entities::_generated::sea_orm_active_enums::RecordType;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

use fake::Dummy;
use fake::faker::filesystem::raw::{FileName, FilePath, MimeType};
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertAttachment {
    #[dummy(faker = "FileName(EN)")]
    pub file_name: String,
    #[dummy(faker = "FilePath(EN)")]
    pub file_path: String,
    #[dummy(faker = "MimeType(EN)")]
    pub mime_type: Option<String>,

    pub record_id: Option<Uuid>,

    pub record_type: Option<RecordType>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateAttachment {
    pub file_name: Option<String>,
    pub file_path: Option<String>,
    pub mime_type: Option<Option<String>>,
    pub record_id: Option<Option<Uuid>>,
    pub record_type: Option<Option<RecordType>>,
}

impl IntoActiveModel<attachments::ActiveModel> for InsertAttachment {
    fn into_active_model(self) -> attachments::ActiveModel {
        let mut active_model = attachments::ActiveModel::new();
        active_model.file_name = Set(self.file_name);
        active_model.file_path = Set(self.file_path);
        active_model.mime_type = Set(self.mime_type);
        active_model.record_id = Set(self.record_id);
        active_model.record_type = Set(self.record_type);
        active_model
    }
}

impl IntoActiveModel<attachments::ActiveModel> for UpdateAttachment {
    fn into_active_model(self) -> attachments::ActiveModel {
        let mut active_model = attachments::ActiveModel::new();
        active_model.file_name = self.file_name.map(Set).unwrap_or(NotSet);
        active_model.file_path = self.file_path.map(Set).unwrap_or(NotSet);
        active_model.mime_type = self.mime_type.map(Set).unwrap_or(NotSet);
        active_model.record_id = self.record_id.map(Set).unwrap_or(NotSet);
        active_model.record_type = self.record_type.map(Set).unwrap_or(NotSet);
        active_model
    }
}
