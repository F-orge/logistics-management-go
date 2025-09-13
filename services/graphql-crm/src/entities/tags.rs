use crate::entities::_generated::tags;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};

#[derive(Debug, Clone, InputObject)]
pub struct InsertTag {
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
