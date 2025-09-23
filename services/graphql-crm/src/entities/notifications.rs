use crate::entities::_generated::notifications;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
    prelude::*,
};
use uuid::Uuid;

use fake::Dummy;
use fake::faker::internet::raw::DomainSuffix;
use fake::faker::lorem::raw::Sentence;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertNotification {
    #[dummy(default)]
    pub user_id: Uuid,
    #[dummy(faker = "Sentence(EN, 3..8)")]
    pub message: String,
    #[dummy(default)]
    pub is_read: Option<bool>,
    #[dummy(faker = "DomainSuffix(EN)")]
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

use async_graphql::{ComplexObject, Context};
use graphql_auth::entities::_generated::user;

#[ComplexObject]
impl notifications::Model {
    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        let result = user::Entity::find_by_id(self.user_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("User not found")),
        }
    }
}
