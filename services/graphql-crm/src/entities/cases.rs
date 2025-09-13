use crate::entities::_generated::cases;
use crate::entities::_generated::sea_orm_active_enums::{CasePriority, CaseStatus, CaseType};
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertCase {
    pub case_number: String,
    pub status: Option<CaseStatus>,
    pub priority: Option<CasePriority>,
    pub r#type: Option<CaseType>,
    pub owner_id: Uuid,
    pub contact_id: Option<Uuid>,
    pub description: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCase {
    pub case_number: Option<String>,
    pub status: Option<Option<CaseStatus>>,
    pub priority: Option<Option<CasePriority>>,
    pub r#type: Option<Option<CaseType>>,
    pub owner_id: Option<Uuid>,
    pub contact_id: Option<Option<Uuid>>,
    pub description: Option<Option<String>>,
}

impl IntoActiveModel<cases::ActiveModel> for InsertCase {
    fn into_active_model(self) -> cases::ActiveModel {
        let mut active_model = cases::ActiveModel::new();
    active_model.case_number = Set(self.case_number);
    active_model.status = Set(self.status);
    active_model.priority = Set(self.priority);
    active_model.r#type = Set(self.r#type);
    active_model.owner_id = Set(self.owner_id);
    active_model.contact_id = Set(self.contact_id);
    active_model.description = Set(self.description);
        active_model
    }
}

impl IntoActiveModel<cases::ActiveModel> for UpdateCase {
    fn into_active_model(self) -> cases::ActiveModel {
        let mut active_model = cases::ActiveModel::new();
    active_model.case_number = self.case_number.map(Set).unwrap_or(NotSet);
    active_model.status = self.status.map(Set).unwrap_or(NotSet);
    active_model.priority = self.priority.map(Set).unwrap_or(NotSet);
    active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
    active_model.owner_id = self.owner_id.map(Set).unwrap_or(NotSet);
    active_model.contact_id = self.contact_id.map(Set).unwrap_or(NotSet);
    active_model.description = self.description.map(Set).unwrap_or(NotSet);
        active_model
    }
}
