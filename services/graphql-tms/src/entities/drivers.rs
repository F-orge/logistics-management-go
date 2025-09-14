use crate::entities::_generated::{drivers, sea_orm_active_enums::DriverStatusEnum};
use async_graphql::InputObject;
use sea_orm::entity::prelude::*;
use sea_orm::{
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertDriver {
    pub user_id: Uuid,
    pub license_number: String,
    pub license_expiry_date: Option<Date>,
    pub status: Option<DriverStatusEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDriver {
    pub user_id: Option<Uuid>,
    pub license_number: Option<String>,
    pub license_expiry_date: Option<Option<Date>>,
    pub status: Option<Option<DriverStatusEnum>>,
}

impl IntoActiveModel<drivers::ActiveModel> for InsertDriver {
    fn into_active_model(self) -> drivers::ActiveModel {
        let mut active_model = drivers::ActiveModel::new();
        active_model.user_id = Set(self.user_id);
        active_model.license_number = Set(self.license_number);
        active_model.license_expiry_date = Set(self.license_expiry_date);
        active_model.status = Set(self.status);
        active_model
    }
}

impl IntoActiveModel<drivers::ActiveModel> for UpdateDriver {
    fn into_active_model(self) -> drivers::ActiveModel {
        let mut active_model = drivers::ActiveModel::new();
        active_model.user_id = self.user_id.map(Set).unwrap_or(NotSet);
        active_model.license_number = self.license_number.map(Set).unwrap_or(NotSet);
        active_model.license_expiry_date = self.license_expiry_date.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::ComplexObject;

#[ComplexObject]
impl drivers::Model {

}
