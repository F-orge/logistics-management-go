use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::ActiveValue::Set;
use sea_orm::{IntoActiveModel, entity::prelude::*};

use super::_generated::department_permissions::*;
use super::_generated::sea_orm_active_enums::PermissionStatus;

#[derive(Clone, Debug, InputObject)]
pub struct CreateDepartmentPermission {
    pub department_id: Uuid,
    pub resource: String,
    pub action: PermissionStatus,
}

impl IntoActiveModel<ActiveModel> for CreateDepartmentPermission {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.department_id = Set(self.department_id);
        active_model.resource = Set(self.resource);
        active_model.action = Set(self.action);

        active_model
    }
}

#[derive(Clone, Debug, InputObject)]
pub struct UpdateDepartmentPermission {
    pub id: Uuid,
    pub department_id: Option<Uuid>,
    pub resource: Option<String>,
    pub action: Option<PermissionStatus>,
}

impl IntoActiveModel<ActiveModel> for UpdateDepartmentPermission {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());

        if let Some(department_id) = self.department_id {
            active_model.department_id = Set(department_id);
        }

        if let Some(resource) = self.resource {
            active_model.resource = Set(resource);
        }

        if let Some(action) = self.action {
            active_model.action = Set(action);
        }

        active_model
    }
}
