use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

use crate::entities::_generated::org_departments::*;

#[derive(Debug, Clone, InputObject)]
pub struct CreateDepartment {
    pub name: String,
    pub code: String,
    pub description: Option<String>,
    pub department_type: String,
    pub manager_id: Option<uuid::Uuid>,
    pub phone_number: Option<String>,
    pub email: Option<String>,
    pub budget: Option<Decimal>,
    pub is_active: bool,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDepartment {
    pub id: uuid::Uuid,
    pub name: Option<String>,
    pub code: Option<String>,
    pub description: Option<Option<String>>,
    pub department_type: Option<String>,
    pub manager_id: Option<Option<uuid::Uuid>>,
    pub phone_number: Option<Option<String>>,
    pub email: Option<Option<String>>,
    pub budget: Option<Option<Decimal>>,
    pub is_active: Option<bool>,
}

impl IntoActiveModel<ActiveModel> for CreateDepartment {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.name = Set(self.name);
        active_model.code = Set(self.code);
        active_model.description = Set(self.description);
        active_model.department_type = Set(self.department_type);
        active_model.manager_id = Set(self.manager_id);
        active_model.phone_number = Set(self.phone_number);
        active_model.email = Set(self.email);
        active_model.budget = Set(self.budget);
        active_model.is_active = Set(self.is_active);

        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateDepartment {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());

        if let Some(name) = self.name {
            active_model.name = Set(name);
        }

        if let Some(code) = self.code {
            active_model.code = Set(code);
        }

        if let Some(description) = self.description {
            active_model.description = Set(description);
        }

        if let Some(department_type) = self.department_type {
            active_model.department_type = Set(department_type);
        }

        if let Some(manager_id) = self.manager_id {
            active_model.manager_id = Set(manager_id);
        }

        if let Some(phone_number) = self.phone_number {
            active_model.phone_number = Set(phone_number);
        }

        if let Some(email) = self.email {
            active_model.email = Set(email);
        }

        if let Some(budget) = self.budget {
            active_model.budget = Set(budget);
        }

        if let Some(is_active) = self.is_active {
            active_model.is_active = Set(is_active);
        }

        active_model
    }
}
