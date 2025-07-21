use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

use crate::entities::_generated::org_department_users::*;

#[derive(Debug, Clone, InputObject)]
pub struct CreateDepartmentUser {
    pub department_id: Uuid,
    pub user_id: Uuid,
    pub role: String,
    pub assigned_date: Date,
    pub is_active: bool,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDepartmentUser {
    pub id: Uuid,
    pub department_id: Option<Uuid>,
    pub user_id: Option<Uuid>,
    pub role: Option<String>,
    pub assigned_date: Option<Date>,
    pub is_active: Option<bool>,
}

impl IntoActiveModel<ActiveModel> for CreateDepartmentUser {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.department_id = Set(self.department_id);
        active_model.user_id = Set(self.user_id);
        active_model.role = Set(self.role);
        active_model.assigned_date = Set(self.assigned_date);
        active_model.is_active = Set(self.is_active);
        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateDepartmentUser {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());
        if let Some(department_id) = self.department_id {
            active_model.department_id = Set(department_id);
        }
        if let Some(user_id) = self.user_id {
            active_model.user_id = Set(user_id);
        }
        if let Some(role) = self.role {
            active_model.role = Set(role);
        }
        if let Some(assigned_date) = self.assigned_date {
            active_model.assigned_date = Set(assigned_date);
        }
        if let Some(is_active) = self.is_active {
            active_model.is_active = Set(is_active);
        }
        active_model
    }
}
