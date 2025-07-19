use super::_generated::department_transport_modes::*;
use async_graphql::InputObject;
use sea_orm::{ActiveModelBehavior, ActiveValue::Set, IntoActiveModel};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct CreateDepartmentTransportMode {
    pub department_id: Uuid,
    pub transport_mode: String,
    pub is_primary: bool,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDepartmentTransportMode {
    pub id: Uuid,
    pub department_id: Option<Uuid>,
    pub transport_mode: Option<String>,
    pub is_primary: Option<bool>,
}

impl IntoActiveModel<ActiveModel> for CreateDepartmentTransportMode {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.department_id = Set(self.department_id);
        active_model.transport_mode = Set(self.transport_mode);
        active_model.is_primary = Set(self.is_primary);

        active_model
    }
}

impl IntoActiveModel<ActiveModel> for UpdateDepartmentTransportMode {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);

        if let Some(department_id) = self.department_id {
            active_model.department_id = Set(department_id);
        }

        if let Some(transport_mode) = self.transport_mode {
            active_model.transport_mode = Set(transport_mode);
        }

        if let Some(is_primary) = self.is_primary {
            active_model.is_primary = Set(is_primary);
        }

        active_model
    }
}
