use std::collections::HashSet;

use chrono::Utc;
use fake::Dummy;
use sea_orm::{
    ActiveEnum, ActiveModelBehavior, ActiveValue, DeriveActiveEnum, EnumIter, IntoActiveModel,
};
use serde::Deserialize;
use ts_rs::TS;
use uuid::Uuid;
use validator::{Validate, ValidationError};

pub use crate::_generated::role_permissions::*;
use crate::_generated::sea_orm_active_enums::TablePermissionEnum;

#[derive(Debug, Deserialize, TS, DeriveActiveEnum, EnumIter, Dummy)]
#[serde(rename_all = "PascalCase")]
#[sea_orm(rs_type = "String", db_type = "Text", enum_name = "Tables")]
#[ts(export)]
pub enum Tables {
    #[sea_orm(string_value = "users")]
    Users,
    #[sea_orm(string_value = "roles")]
    Roles,
    #[sea_orm(string_value = "role_permissions")]
    RolePermissions,
}

#[derive(Debug, Deserialize, TS, Validate, Dummy)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct CreateRolePermissionModel {
    pub target_table: Tables,
    #[validate(custom(function = check_unique_permission))]
    pub permission: Vec<TablePermissionEnum>,
}

impl IntoActiveModel<ActiveModel> for CreateRolePermissionModel {
    fn into_active_model(self) -> ActiveModel {
        let now = Utc::now().fixed_offset();
        ActiveModel {
            id: ActiveValue::Set(Uuid::new_v4()),
            role_id: ActiveValue::NotSet,
            target_table: ActiveValue::Set(self.target_table.into_value()),
            permission: ActiveValue::Set(self.permission),
            created: ActiveValue::Set(now),
            updated: ActiveValue::Set(now),
        }
    }
}

#[derive(Debug, Deserialize, TS, Validate)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
#[ts(optional_fields)]
pub struct UpdateRolePermissionModel {
    pub target_table: Option<Tables>,
    pub permission: Option<Vec<TablePermissionEnum>>,
}

impl IntoActiveModel<ActiveModel> for UpdateRolePermissionModel {
    fn into_active_model(self) -> ActiveModel {
        let now = Utc::now().fixed_offset();
        ActiveModel {
            id: ActiveValue::NotSet,
            role_id: ActiveValue::NotSet,
            target_table: self
                .target_table
                .map_or(ActiveValue::NotSet, |v| ActiveValue::Set(v.into_value())),
            permission: self
                .permission
                .map_or(ActiveValue::NotSet, |v| ActiveValue::Set(v)),
            created: ActiveValue::NotSet,
            updated: ActiveValue::Set(now),
        }
    }
}

impl ActiveModelBehavior for ActiveModel {}

fn check_unique_permission(field: &Vec<TablePermissionEnum>) -> Result<(), ValidationError> {
    let mut seen = HashSet::new();

    for permission in field {
        if !seen.insert(permission) {
            let mut err = ValidationError::new("duplicate_permission")
            .with_message(format!(
                "Permissions must be unique. The permission '{:?}' was specified more than once.",
                permission
            ).into());

            err.add_param("value".into(), permission);

            return Err(err);
        }
    }

    Ok(())
}
