use async_graphql::InputObject;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

use crate::entities::_generated::org_department_user_permissions::*;

#[derive(Debug, Clone, InputObject)]
pub struct CreateDepartmentUserPermission {
    pub permission_id: Uuid,
    pub user_id: Uuid,
}

impl IntoActiveModel<ActiveModel> for CreateDepartmentUserPermission {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();
        active_model.permission_id = Set(self.permission_id);
        active_model.user_id = Set(self.user_id);
        active_model
    }
}
