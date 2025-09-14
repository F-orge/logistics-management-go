use crate::entities::_generated::rate_cards;
use crate::entities::_generated::sea_orm_active_enums::ServiceTypeEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertRateCard {
    pub name: String,
    pub service_type: ServiceTypeEnum,
    pub is_active: Option<bool>,
    pub valid_from: sea_orm::prelude::Date,
    pub valid_to: Option<sea_orm::prelude::Date>,
    pub description: Option<String>,
    pub created_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateRateCard {
    pub name: Option<String>,
    pub service_type: Option<ServiceTypeEnum>,
    pub is_active: Option<Option<bool>>,
    pub valid_from: Option<sea_orm::prelude::Date>,
    pub valid_to: Option<Option<sea_orm::prelude::Date>>,
    pub description: Option<Option<String>>,
    pub created_by_user_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<rate_cards::ActiveModel> for InsertRateCard {
    fn into_active_model(self) -> rate_cards::ActiveModel {
        let mut active_model = rate_cards::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.service_type = Set(self.service_type);
        active_model.is_active = Set(self.is_active);
        active_model.valid_from = Set(self.valid_from);
        active_model.valid_to = Set(self.valid_to);
        active_model.description = Set(self.description);
        active_model.created_by_user_id = Set(self.created_by_user_id);
        active_model
    }
}

impl IntoActiveModel<rate_cards::ActiveModel> for UpdateRateCard {
    fn into_active_model(self) -> rate_cards::ActiveModel {
        let mut active_model = rate_cards::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.service_type = self.service_type.map(Set).unwrap_or(NotSet);
        active_model.is_active = self.is_active.map(Set).unwrap_or(NotSet);
        active_model.valid_from = self.valid_from.map(Set).unwrap_or(NotSet);
        active_model.valid_to = self.valid_to.map(Set).unwrap_or(NotSet);
        active_model.description = self.description.map(Set).unwrap_or(NotSet);
        active_model.created_by_user_id = self.created_by_user_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}
