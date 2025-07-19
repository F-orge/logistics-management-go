use super::_generated::users::*;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveModelBehavior, ActiveValue::Set, IntoActiveModel};
use uuid::Uuid;

#[derive(Clone, InputObject)]
pub struct CreateUser {
    name: String,
    email: String,
    password: String,
    confirm_password: String,
}

impl IntoActiveModel<ActiveModel> for CreateUser {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        if self.password == self.confirm_password {
            active_model.password_hash = Set(self.password); // In a real application, you should hash the password
        }

        active_model.name = Set(self.name);
        active_model.email = Set(self.email);
        active_model.email_verified = Set(false); // Default to false, can be updated later

        active_model
    }
}

#[derive(Clone, InputObject)]
pub struct UpdateUser {
    pub id: Uuid,
    pub name: Option<String>,
    pub email: Option<String>,
    pub password: Option<String>,
    pub confirm_password: Option<String>,
}

impl IntoActiveModel<ActiveModel> for UpdateUser {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());

        if let Some(name) = self.name {
            active_model.name = Set(name);
        }
        if let Some(email) = self.email {
            active_model.email = Set(email);
            active_model.email_verified = Set(false);
        }

        if let Some(password) = self.password {
            if password == self.confirm_password.unwrap_or_default() {
                active_model.password_hash = Set(password); // In a real application, you should hash the password
            }
        }

        active_model
    }
}
