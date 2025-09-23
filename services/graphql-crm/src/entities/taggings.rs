use crate::entities::_generated::taggings;
use crate::entities::_generated::{sea_orm_active_enums::RecordType, tags};
use async_graphql::InputObject;
use async_graphql::{ComplexObject, Context};
use sea_orm::prelude::*;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

use fake::Dummy;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertTagging {
    #[dummy(default)]
    pub tag_id: Uuid,
    #[dummy(default)]
    pub record_id: Uuid,
    pub record_type: RecordType,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTagging {
    pub tag_id: Option<Uuid>,
    pub record_id: Option<Uuid>,
    pub record_type: Option<RecordType>,
}

impl IntoActiveModel<taggings::ActiveModel> for InsertTagging {
    fn into_active_model(self) -> taggings::ActiveModel {
        let mut active_model = taggings::ActiveModel::new();
        active_model.tag_id = Set(self.tag_id);
        active_model.record_id = Set(self.record_id);
        active_model.record_type = Set(self.record_type);
        active_model
    }
}

impl IntoActiveModel<taggings::ActiveModel> for UpdateTagging {
    fn into_active_model(self) -> taggings::ActiveModel {
        let mut active_model = taggings::ActiveModel::new();
        active_model.tag_id = self.tag_id.map(Set).unwrap_or(NotSet);
        active_model.record_id = self.record_id.map(Set).unwrap_or(NotSet);
        active_model.record_type = self.record_type.map(Set).unwrap_or(NotSet);
        active_model
    }
}

#[ComplexObject]
impl taggings::Model {
    async fn tag(&self, ctx: &Context<'_>) -> async_graphql::Result<tags::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = tags::Entity::find_by_id(self.tag_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Tag not found")),
        }
    }
}
