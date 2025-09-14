use crate::entities::_generated::carriers;
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};

#[derive(Debug, Clone, InputObject)]
pub struct InsertCarrier {
    pub name: String,
    pub contact_details: Option<String>,
    pub services_offered: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCarrier {
    pub name: Option<String>,
    pub contact_details: Option<Option<String>>,
    pub services_offered: Option<Option<String>>,
}

impl IntoActiveModel<carriers::ActiveModel> for InsertCarrier {
    fn into_active_model(self) -> carriers::ActiveModel {
        let mut active_model = carriers::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.contact_details = Set(self.contact_details);
        active_model.services_offered = Set(self.services_offered);
        active_model
    }
}

impl IntoActiveModel<carriers::ActiveModel> for UpdateCarrier {
    fn into_active_model(self) -> carriers::ActiveModel {
        let mut active_model = carriers::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.contact_details = self.contact_details.map(Set).unwrap_or(NotSet);
        active_model.services_offered = self.services_offered.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl carriers::Model {

}
