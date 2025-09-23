use crate::entities::_generated::tags;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
    prelude::*,
};

use fake::Dummy;
use fake::faker::lorem::raw::Word;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertTag {
    #[dummy(faker = "Word(EN)")]
    pub name: String,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTag {
    pub name: Option<String>,
}

impl IntoActiveModel<tags::ActiveModel> for InsertTag {
    fn into_active_model(self) -> tags::ActiveModel {
        let mut active_model = tags::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model
    }
}

impl IntoActiveModel<tags::ActiveModel> for UpdateTag {
    fn into_active_model(self) -> tags::ActiveModel {
        let mut active_model = tags::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::taggings;
use async_graphql::{ComplexObject, Context};

#[ComplexObject]
impl tags::Model {
    async fn taggings(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<taggings::Model>> {
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        let results = taggings::Entity::find()
            .filter(taggings::Column::TagId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
