use chrono::Utc;
use password_auth::{generate_hash, verify_password};
use sea_orm::{
    ActiveModelBehavior, ActiveValue, DbErr, IntoActiveModel, prelude::async_trait::async_trait,
};
use serde::Deserialize;
use ts_rs::TS;
use uuid::Uuid;
use validator::Validate;

pub use crate::_generated::users::*;

#[derive(Debug, Deserialize, TS, fake::Dummy, Validate)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct CreateUserModel {
    #[validate(length(min = 3))]
    #[dummy(faker = "fake::faker::name::en::Name()")]
    pub name: String,
    #[validate(email(message = "Invalid email format"))]
    #[dummy(faker = "fake::faker::internet::en::SafeEmail()")]
    pub email: String,
    #[validate(
        length(min = 10, message = "Minimum password characters is 10"),
        must_match(
            other = "confirm_password",
            message = "Both Password and Confirm Password must match"
        )
    )]
    pub password: String,
    #[validate(
        length(min = 10, message = "Minimum password characters is 10"),
        must_match(
            other = "password",
            message = "Both Password and Confirm Password must match"
        )
    )]
    pub confirm_password: String,
}

impl CreateUserModel {
    pub fn verify_password(&self) -> bool {
        self.password == self.confirm_password
    }
}

#[derive(Debug, Deserialize, TS, Validate)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
#[ts(optional_fields)]
pub struct UpdateUserModel {
    #[validate(length(min = 3))]
    pub name: Option<String>,
    #[validate(email(message = "Invalid email format"))]
    pub email: Option<String>,
    pub role_id: Option<Uuid>,
    // note: separate this for better handling
    pub old_password: Option<String>,
    pub password: Option<String>,
    pub confirm_password: Option<String>,
}

impl IntoActiveModel<ActiveModel> for CreateUserModel {
    fn into_active_model(self) -> ActiveModel {
        let now = Utc::now();
        ActiveModel {
            id: ActiveValue::Set(Uuid::new_v4()),
            name: ActiveValue::Set(self.name),
            email: ActiveValue::Set(self.email),
            password: ActiveValue::Set(self.password),
            role_id: sea_orm::ActiveValue::NotSet,
            created: ActiveValue::Set(now.fixed_offset()),
            updated: ActiveValue::Set(now.fixed_offset()),
        }
    }
}

impl IntoActiveModel<ActiveModel> for UpdateUserModel {
    fn into_active_model(self) -> ActiveModel {
        let now = Utc::now();
        ActiveModel {
            id: sea_orm::ActiveValue::NotSet,
            name: self
                .name
                .map_or(sea_orm::ActiveValue::NotSet, ActiveValue::Set),
            email: self
                .email
                .map_or(sea_orm::ActiveValue::NotSet, ActiveValue::Set),
            password: self
                .password
                .map_or(sea_orm::ActiveValue::NotSet, ActiveValue::Set),
            role_id: self
                .role_id
                .map_or(sea_orm::ActiveValue::NotSet, |v| ActiveValue::Set(Some(v))),
            created: sea_orm::ActiveValue::NotSet,
            updated: ActiveValue::Set(now.fixed_offset()),
        }
    }
}

#[async_trait]
impl ActiveModelBehavior for ActiveModel {
    async fn before_save<C>(mut self, _: &C, _: bool) -> Result<Self, sea_orm::DbErr>
    where
        C: sea_orm::ConnectionTrait,
    {
        let pass = self
            .password
            .take()
            .ok_or(DbErr::AttrNotSet("password".into()))?;

        self.password = ActiveValue::Set(generate_hash(pass));

        Ok(self)
    }
}

impl Model {
    pub fn verify_password(&self, password: &str) -> bool {
        verify_password(password, &self.password).is_ok()
    }
}

#[derive(Debug, Deserialize, TS, Validate)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct AuthenticateUserModel {
    #[validate(email(message = "Invalid email format"))]
    pub email: String,
    #[validate(length(min = 10, message = "Minimum password characters is 10"))]
    pub password: String,
}
