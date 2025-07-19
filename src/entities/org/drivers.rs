use super::_generated::drivers::*;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{
    ActiveModelBehavior, ActiveValue::Set, IntoActiveModel, prelude::DateTimeWithTimeZone,
};
use uuid::Uuid;

use crate::entities::org::_generated::sea_orm_active_enums::DriverStatus;

#[derive(Debug, Clone, PartialEq, Eq, InputObject)]
pub struct CreateDriver {
    pub employee_id: String,
    pub first_name: String,
    pub last_name: String,
    pub license_number: String,
    pub phone_number: String,
    pub email: String,
    pub hire_date: DateTimeWithTimeZone,
    pub status: DriverStatus,
}

impl IntoActiveModel<ActiveModel> for CreateDriver {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.employee_id = Set(self.employee_id);
        active_model.first_name = Set(self.first_name);
        active_model.last_name = Set(self.last_name);
        active_model.license_number = Set(self.license_number);
        active_model.phone_number = Set(self.phone_number);
        active_model.email = Set(self.email);
        active_model.hire_date = Set(self.hire_date.date_naive());
        active_model.status = Set(self.status);

        active_model
    }
}

#[derive(Debug, Clone, PartialEq, Eq, InputObject)]
pub struct UpdateDriver {
    pub id: Uuid,
    pub employee_id: Option<String>,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub license_number: Option<String>,
    pub phone_number: Option<String>,
    pub email: Option<String>,
    pub hire_date: Option<DateTimeWithTimeZone>,
    pub status: Option<DriverStatus>,
}

impl IntoActiveModel<ActiveModel> for UpdateDriver {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());

        if let Some(employee_id) = self.employee_id {
            active_model.employee_id = Set(employee_id);
        }
        if let Some(first_name) = self.first_name {
            active_model.first_name = Set(first_name);
        }
        if let Some(last_name) = self.last_name {
            active_model.last_name = Set(last_name);
        }
        if let Some(license_number) = self.license_number {
            active_model.license_number = Set(license_number);
        }
        if let Some(phone_number) = self.phone_number {
            active_model.phone_number = Set(phone_number);
        }
        if let Some(email) = self.email {
            active_model.email = Set(email);
        }
        if let Some(hire_date) = self.hire_date {
            active_model.hire_date = Set(hire_date.date_naive());
        }
        if let Some(status) = self.status {
            active_model.status = Set(status);
        }

        active_model
    }
}
