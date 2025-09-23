use crate::entities::_generated::interactions;
use crate::entities::_generated::sea_orm_active_enums::InteractionType;
use async_graphql::InputObject;
use sea_orm::prelude::DateTimeWithTimeZone;
use sea_orm::prelude::*;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

use fake::Dummy;
use fake::faker::lorem::raw::{Word, Sentence};
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertInteraction {
    #[dummy(default)]
    pub contact_id: Uuid,
    #[dummy(default)]
    pub user_id: Uuid,
    #[dummy(default)]
    pub case_id: Option<Uuid>,
    #[dummy(default)]
    pub r#type: Option<InteractionType>,
    #[dummy(faker = "Word(EN)")]
    pub outcome: Option<String>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub notes: Option<String>,
    #[dummy(default)]
    pub interaction_date: Option<DateTimeWithTimeZone>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInteraction {
    pub contact_id: Option<Uuid>,
    pub user_id: Option<Uuid>,
    pub case_id: Option<Option<Uuid>>,
    pub r#type: Option<Option<InteractionType>>,
    pub outcome: Option<Option<String>>,
    pub notes: Option<Option<String>>,
    pub interaction_date: Option<Option<DateTimeWithTimeZone>>,
}

impl IntoActiveModel<interactions::ActiveModel> for InsertInteraction {
    fn into_active_model(self) -> interactions::ActiveModel {
        let mut active_model = interactions::ActiveModel::new();
        active_model.contact_id = Set(self.contact_id);
        active_model.user_id = Set(self.user_id);
        active_model.case_id = Set(self.case_id);
        active_model.r#type = Set(self.r#type);
        active_model.outcome = Set(self.outcome);
        active_model.notes = Set(self.notes);
        active_model.interaction_date = Set(self.interaction_date);
        active_model
    }
}

impl IntoActiveModel<interactions::ActiveModel> for UpdateInteraction {
    fn into_active_model(self) -> interactions::ActiveModel {
        let mut active_model = interactions::ActiveModel::new();
        active_model.contact_id = self.contact_id.map(Set).unwrap_or(NotSet);
        active_model.user_id = self.user_id.map(Set).unwrap_or(NotSet);
        active_model.case_id = self.case_id.map(Set).unwrap_or(NotSet);
        active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
        active_model.outcome = self.outcome.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model.interaction_date = self.interaction_date.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{cases, contacts};
use async_graphql::{ComplexObject, Context};
use graphql_auth::entities::_generated::user;

#[ComplexObject]
impl interactions::Model {
    async fn case(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<cases::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(case_id) = self.case_id {
            let result = cases::Entity::find_by_id(case_id).one(db).await?;
            Ok(result)
        } else {
            Ok(None)
        }
    }

    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<contacts::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = contacts::Entity::find_by_id(self.contact_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Contact not found")),
        }
    }

    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = user::Entity::find_by_id(self.user_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("User not found")),
        }
    }
}
