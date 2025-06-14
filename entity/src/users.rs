use argon2::{
    Argon2,
    password_hash::{PasswordHasher, PasswordVerifier, SaltString, rand_core::OsRng},
};
use chrono::Utc;
use sea_orm::{
    ActiveModelBehavior, ActiveValue::Set, DbErr, IntoActiveModel,
    prelude::async_trait::async_trait,
};
use serde::Serialize;
use ts_rs::TS;
use uuid::Uuid;

pub use crate::_generated::users::*;

#[derive(Debug, Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct CreateUserModel {
    pub name: String,
    pub email: String,
    pub password: String,
    pub confirm_password: String,
}

impl CreateUserModel {
    pub fn verify_password(&self) -> bool {
        self.password == self.confirm_password
    }
}

#[derive(Debug, Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
#[ts(optional_fields)]
pub struct UpdateUserModel {
    pub id: Uuid,
    pub name: Option<String>,
    pub email: Option<String>,
    pub password: Option<String>,
    pub confirm_password: Option<String>,
}

impl IntoActiveModel<ActiveModel> for CreateUserModel {
    fn into_active_model(self) -> ActiveModel {
        let now = Utc::now();

        ActiveModel {
            id: Set(Uuid::new_v4()),
            name: Set(self.name),
            email: Set(self.email),
            password: Set(self.password),
            created: Set(now.fixed_offset()),
            updated: Set(now.fixed_offset()),
        }
    }
}

impl IntoActiveModel<ActiveModel> for UpdateUserModel {
    fn into_active_model(self) -> ActiveModel {
        let now = Utc::now();
        ActiveModel {
            id: Set(self.id),
            name: self.name.map_or(sea_orm::ActiveValue::NotSet, Set),
            email: self.email.map_or(sea_orm::ActiveValue::NotSet, Set),
            password: self.password.map_or(sea_orm::ActiveValue::NotSet, Set),
            created: sea_orm::ActiveValue::NotSet,
            updated: Set(now.fixed_offset()),
        }
    }
}

#[async_trait]
impl ActiveModelBehavior for ActiveModel {
    async fn before_save<C>(mut self, _: &C, _: bool) -> Result<Self, sea_orm::DbErr>
    where
        C: sea_orm::ConnectionTrait,
    {
        let salt = SaltString::generate(&mut OsRng);

        self.password = Set(Argon2::default()
            .hash_password(
                self.password
                    .into_value()
                    .ok_or(DbErr::AttrNotSet("password".into()))?
                    .to_string()
                    .as_bytes(),
                &salt,
            )
            .map_err(|_| DbErr::RecordNotUpdated)?
            .to_string());

        Ok(self)
    }
}
