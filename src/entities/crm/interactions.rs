use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::{ActiveValue::Set, IntoActiveModel, prelude::*};

use crate::entities::_generated::crm_interactions::*;
use crate::entities::_generated::sea_orm_active_enums::CrmInteractionType;

#[derive(Debug, Clone, InputObject)]
pub struct CreateInteraction {
    pub r#type: CrmInteractionType,
    pub subject: Option<String>,
    pub description: Option<String>,
    pub interaction_date: DateTimeWithTimeZone,
    pub contact_id: Option<Uuid>,
    pub opportunity_id: Option<Uuid>,
}

impl IntoActiveModel<ActiveModel> for CreateInteraction {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.r#type = Set(self.r#type);
        active_model.subject = Set(self.subject);
        active_model.description = Set(self.description);
        active_model.interaction_date = Set(self.interaction_date);
        active_model.contact_id = Set(self.contact_id);
        active_model.opportunity_id = Set(self.opportunity_id);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInteraction {
    pub id: Uuid,
    pub r#type: Option<CrmInteractionType>,
    pub subject: Option<Option<String>>,
    pub description: Option<Option<String>>,
    pub interaction_date: Option<DateTimeWithTimeZone>,
    pub contact_id: Option<Option<Uuid>>,
    pub opportunity_id: Option<Option<Uuid>>,
}
impl IntoActiveModel<ActiveModel> for UpdateInteraction {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());

        if let Some(r#type) = self.r#type {
            active_model.r#type = Set(r#type);
        }

        if let Some(subject) = self.subject {
            active_model.subject = Set(subject);
        }

        if let Some(description) = self.description {
            active_model.description = Set(description);
        }

        if let Some(interaction_date) = self.interaction_date {
            active_model.interaction_date = Set(interaction_date);
        }

        if let Some(contact_id) = self.contact_id {
            active_model.contact_id = Set(contact_id);
        }

        if let Some(opportunity_id) = self.opportunity_id {
            active_model.opportunity_id = Set(opportunity_id);
        }

        active_model
    }
}
