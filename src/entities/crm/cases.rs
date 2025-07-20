use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{
    ActiveModelBehavior, ActiveValue::Set, IntoActiveModel, prelude::DateTimeWithTimeZone,
};
use uuid::Uuid;

use crate::entities::_generated::crm_cases::*;
use crate::entities::_generated::sea_orm_active_enums::{CrmCasePriority, CrmCaseStatus};

#[derive(Debug, Clone, InputObject)]
pub struct CreateCase {
    pub subject: String,
    pub description: String,
    pub status: CrmCaseStatus,
    pub priority: CrmCasePriority,
    pub contact_id: Option<Uuid>,
    pub closed_at: Option<DateTimeWithTimeZone>,
}

impl IntoActiveModel<ActiveModel> for CreateCase {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.subject = Set(self.subject);
        active_model.description = Set(self.description);
        active_model.status = Set(self.status);
        active_model.priority = Set(self.priority);
        active_model.contact_id = Set(self.contact_id);

        self.closed_at
            .and_then(|closed_at| Some(closed_at.fixed_offset()))
            .map(|closed_at| active_model.closed_at = Set(Some(closed_at)));

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCase {
    pub id: Uuid,
    pub subject: Option<String>,
    pub description: Option<String>,
    pub status: Option<CrmCaseStatus>,
    pub priority: Option<CrmCasePriority>,
    pub contact_id: Option<Uuid>,
    pub closed_at: Option<DateTimeWithTimeZone>,
}

impl IntoActiveModel<ActiveModel> for UpdateCase {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());

        if let Some(subject) = self.subject {
            active_model.subject = Set(subject);
        }

        if let Some(description) = self.description {
            active_model.description = Set(description);
        }

        if let Some(status) = self.status {
            active_model.status = Set(status);
        }

        if let Some(priority) = self.priority {
            active_model.priority = Set(priority);
        }

        active_model.contact_id = Set(self.contact_id);

        self.closed_at
            .and_then(|closed_at| Some(closed_at.fixed_offset()))
            .map(|closed_at| active_model.closed_at = Set(Some(closed_at)));

        active_model
    }
}
