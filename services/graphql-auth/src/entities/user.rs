use crate::entities::_generated::{sea_orm_active_enums::UserRole, user};
use async_graphql::InputObject;
use chrono::{DateTime, Utc};
use fake::Dummy;
use fake::faker::{internet::raw::SafeEmail, name::raw::Name};
use fake::locales::EN;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
    entity::prelude::*,
};
use url::Url;

#[derive(Clone, Debug, InputObject, Dummy)]
pub struct InsertUserInput {
    #[dummy(faker = "Name(EN)")]
    pub name: String,

    #[dummy(faker = "SafeEmail(EN)")]
    pub email: String,

    pub email_verified: Option<bool>,

    pub image: Option<Url>,

    pub role: Option<UserRole>,
}

impl IntoActiveModel<user::ActiveModel> for InsertUserInput {
    fn into_active_model(self) -> user::ActiveModel {
        let mut active_model = user::ActiveModel::new();

        active_model.name = Set(self.name);
        active_model.email = Set(self.email);

        // set to false for new users
        active_model.email_verified = Set(Some(false));

        active_model.image = self
            .image
            .map(|url| Set(Some(url.to_string())))
            .unwrap_or(NotSet);

        active_model.role = self.role.map(|role| Set(Some(role))).unwrap_or(NotSet);

        active_model
    }
}

#[derive(Clone, Debug)]
pub struct UpdateUserInput {
    pub name: Option<String>,
    pub email: Option<String>,
    pub email_verified: Option<Option<bool>>,
    pub image: Option<Option<Url>>,
    pub role: Option<Option<UserRole>>,
    pub banned: Option<Option<bool>>,
    pub ban_reason: Option<Option<String>>,
    pub ban_expires: Option<Option<DateTime<Utc>>>,
}

impl IntoActiveModel<user::ActiveModel> for UpdateUserInput {
    fn into_active_model(self) -> user::ActiveModel {
        todo!()
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl user::Model {}
