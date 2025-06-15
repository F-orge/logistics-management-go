use chrono::Utc;
use sea_orm::{ActiveModelBehavior, ActiveValue, IntoActiveModel};
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

impl IntoActiveModel<ActiveModel> for CreateRoleModel {
    fn into_active_model(self) -> ActiveModel {
        let now = Utc::now().fixed_offset();

        ActiveModel {
            id: ActiveValue::Set(Uuid::new_v4()),
            name: ActiveValue::Set(self.name),
            description: ActiveValue::Set(self.description),
            created: ActiveValue::Set(now),
            updated: ActiveValue::Set(now),
        }
    }
}

impl IntoActiveModel<ActiveModel> for UpdateRoleModel {
    fn into_active_model(self) -> ActiveModel {
        let now = Utc::now().fixed_offset();

        ActiveModel {
            id: ActiveValue::Set(self.id),
            name: self.name.map_or(ActiveValue::NotSet, ActiveValue::Set),
            description: self
                .description
                .map_or(ActiveValue::NotSet, |v| ActiveValue::Set(Some(v))),
            updated: ActiveValue::Set(now),
            created: ActiveValue::NotSet,
        }
    }
}

impl ActiveModelBehavior for ActiveModel {}
