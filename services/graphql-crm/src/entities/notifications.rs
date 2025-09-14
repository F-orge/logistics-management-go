use crate::entities::_generated::notifications;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertNotification {
    pub user_id: Uuid,
    pub message: String,
    pub is_read: Option<bool>,
    pub link: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateNotification {
    pub user_id: Option<Uuid>,
    pub message: Option<String>,
    pub is_read: Option<Option<bool>>,
    pub link: Option<Option<String>>,
}

impl IntoActiveModel<notifications::ActiveModel> for InsertNotification {
    fn into_active_model(self) -> notifications::ActiveModel {
        let mut active_model = notifications::ActiveModel::new();
        active_model.user_id = Set(self.user_id);
        active_model.message = Set(self.message);
        active_model.is_read = Set(self.is_read);
        active_model.link = Set(self.link);
        active_model
    }
}

impl IntoActiveModel<notifications::ActiveModel> for UpdateNotification {
    fn into_active_model(self) -> notifications::ActiveModel {
        let mut active_model = notifications::ActiveModel::new();
        active_model.user_id = self.user_id.map(Set).unwrap_or(NotSet);
        active_model.message = self.message.map(Set).unwrap_or(NotSet);
        active_model.is_read = self.is_read.map(Set).unwrap_or(NotSet);
        active_model.link = self.link.map(Set).unwrap_or(NotSet);
        active_model
    }
}
