use sea_orm::ActiveModelBehavior;
use serde::Deserialize;
use ts_rs::TS;
use uuid::Uuid;
use validator::Validate;

pub use crate::_generated::roles::*;

#[derive(Debug, Deserialize, TS, Validate)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct CreateRoleModel {
    #[validate(length(min = 3, message = "name is too short"))]
    name: String,
    #[validate(length(min = 10, message = "description is too short"))]
    description: Option<String>,
}

#[derive(Debug, Deserialize, TS, Validate)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
#[ts(optional_fields)]
pub struct UpdateRoleModel {
    pub id: Uuid,
    #[validate(length(min = 3, message = "Role name is too short"))]
    name: Option<String>,
    #[validate(length(min = 10, message = "description is too short"))]
    description: Option<String>,
}

impl ActiveModelBehavior for ActiveModel {}
