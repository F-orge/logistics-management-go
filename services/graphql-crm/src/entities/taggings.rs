use crate::entities::_generated::sea_orm_active_enums::RecordType;
use crate::entities::_generated::taggings;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertTagging {
    pub tag_id: Uuid,
    pub record_id: Uuid,
    pub record_type: RecordType,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTagging {
    pub tag_id: Option<Uuid>,
    pub record_id: Option<Uuid>,
    pub record_type: Option<RecordType>,
}

impl IntoActiveModel<taggings::ActiveModel> for InsertTagging {
    fn into_active_model(self) -> taggings::ActiveModel {
        let mut active_model = taggings::ActiveModel::new();
        active_model.tag_id = Set(self.tag_id);
        active_model.record_id = Set(self.record_id);
        active_model.record_type = Set(self.record_type);
        active_model
    }
}

impl IntoActiveModel<taggings::ActiveModel> for UpdateTagging {
    fn into_active_model(self) -> taggings::ActiveModel {
        let mut active_model = taggings::ActiveModel::new();
        active_model.tag_id = self.tag_id.map(Set).unwrap_or(NotSet);
        active_model.record_id = self.record_id.map(Set).unwrap_or(NotSet);
        active_model.record_type = self.record_type.map(Set).unwrap_or(NotSet);
        active_model
    }
}
