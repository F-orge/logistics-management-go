use async_graphql::InputObject;
use sea_orm::{ActiveModelBehavior, ActiveValue::{NotSet, Set}, IntoActiveModel};
use uuid::Uuid;
use crate::entities::_generated::contacts;

#[derive(Debug, Clone, InputObject)]
pub struct InsertContact {
    pub name: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub job_title: Option<String>,
    pub company_id: Option<Uuid>,
    pub owner_id: Uuid,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateContact {
    pub name: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<Option<String>>,
    pub job_title: Option<Option<String>>,
    pub company_id: Option<Option<Uuid>>,
    pub owner_id: Option<Uuid>,
}

impl IntoActiveModel<contacts::ActiveModel> for InsertContact {
    fn into_active_model(self) -> contacts::ActiveModel {
        let mut active_model = contacts::ActiveModel::new();
    active_model.name = Set(self.name);
    active_model.email = Set(self.email);
    active_model.phone_number = Set(self.phone_number);
    active_model.job_title = Set(self.job_title);
    active_model.company_id = Set(self.company_id);
    active_model.owner_id = Set(self.owner_id);
        active_model
    }
}

impl IntoActiveModel<contacts::ActiveModel> for UpdateContact {
    fn into_active_model(self) -> contacts::ActiveModel {
        let mut active_model = contacts::ActiveModel::new();
    active_model.name = self.name.map(Set).unwrap_or(NotSet);
    active_model.email = self.email.map(Set).unwrap_or(NotSet);
    active_model.phone_number = self.phone_number.map(Set).unwrap_or(NotSet);
    active_model.job_title = self.job_title.map(Set).unwrap_or(NotSet);
    active_model.company_id = self.company_id.map(Set).unwrap_or(NotSet);
    active_model.owner_id = self.owner_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}
