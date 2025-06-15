use std::collections::HashSet;

use sea_orm::ActiveModelBehavior;
use serde::Deserialize;
use ts_rs::TS;
use uuid::Uuid;
use validator::{Validate, ValidationError};

pub use crate::_generated::role_permissions::*;
use crate::_generated::sea_orm_active_enums::TablePermissionEnum;

#[derive(Debug, Deserialize, TS)]
#[serde(rename_all = "PascalCase")]
#[ts(export)]
pub enum Tables {
    Users,
    Roles,
    RolePermissions,
}

#[derive(Debug, Deserialize, TS, Validate)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct CreateRolePermissionModel {
    pub role_id: Uuid,
    pub target_table: Tables,
    #[validate(custom(function = check_unique_permission))]
    pub permission: Vec<TablePermissionEnum>,
}

#[derive(Debug, Deserialize, TS, Validate)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
#[ts(optional_fields)]
pub struct UpdateRolePermissionModel {
    pub id: Uuid,
    pub role_id: Option<Uuid>,
    pub target_table: Option<String>,
    pub permission: Option<Vec<TablePermissionEnum>>,
}

impl ActiveModelBehavior for ActiveModel {}

fn check_unique_permission(field: &Vec<TablePermissionEnum>) -> Result<(), ValidationError> {
    let mut seen = HashSet::new();

    for permission in field {
        // .insert() returns false if the item was already in the set.
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
