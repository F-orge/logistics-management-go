use crate::entities::_generated::suppliers;
use async_graphql::InputObject;
use chrono::{DateTime, Utc};
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};

#[derive(Debug, Clone, InputObject)]
pub struct InsertSupplier {
    pub name: String,
    pub contact_person: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateSupplier {
    pub name: Option<String>,
    pub contact_person: Option<Option<String>>,
    pub email: Option<Option<String>>,
    pub phone_number: Option<Option<String>>,
    pub created_at: Option<Option<DateTime<Utc>>>,
    pub updated_at: Option<Option<DateTime<Utc>>>,
}

impl IntoActiveModel<suppliers::ActiveModel> for InsertSupplier {
    fn into_active_model(self) -> suppliers::ActiveModel {
        let mut active_model = suppliers::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.contact_person = Set(self.contact_person);
        active_model.email = Set(self.email);
        active_model.phone_number = Set(self.phone_number);
        active_model
    }
}

impl IntoActiveModel<suppliers::ActiveModel> for UpdateSupplier {
    fn into_active_model(self) -> suppliers::ActiveModel {
        let mut active_model = suppliers::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.contact_person = self.contact_person.map(Set).unwrap_or(NotSet);
        active_model.email = self.email.map(Set).unwrap_or(NotSet);
        active_model.phone_number = self.phone_number.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl suppliers::Model {

}
