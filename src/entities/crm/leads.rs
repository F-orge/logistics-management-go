use async_graphql::InputObject;
use sea_orm::ActiveValue::Set;
use sea_orm::IntoActiveModel;
use sea_orm::entity::prelude::*;

use super::_generated::leads::*;
use super::_generated::sea_orm_active_enums::LeadStatus;

#[derive(Debug, Clone, InputObject)]
pub struct CreateLead {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub company_name: Option<String>,
    pub lead_source: Option<String>,
    pub lead_status: LeadStatus,
    pub lead_score: i32,
    pub converted_to_contact_id: Option<Uuid>,
}

impl IntoActiveModel<ActiveModel> for CreateLead {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.first_name = Set(self.first_name);
        active_model.last_name = Set(self.last_name);
        active_model.email = Set(self.email);
        active_model.phone_number = Set(self.phone_number);
        active_model.company_name = Set(self.company_name);
        active_model.lead_source = Set(self.lead_source);
        active_model.lead_status = Set(self.lead_status);
        active_model.lead_score = Set(self.lead_score);
        active_model.converted_to_contact_id = Set(self.converted_to_contact_id);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateLead {
    pub id: Uuid,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<Option<String>>,
    pub company_name: Option<Option<String>>,
    pub lead_source: Option<Option<String>>,
    pub lead_status: Option<LeadStatus>,
    pub lead_score: Option<i32>,
    pub converted_to_contact_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<ActiveModel> for UpdateLead {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);

        if let Some(first_name) = self.first_name {
            active_model.first_name = Set(first_name);
        }
        if let Some(last_name) = self.last_name {
            active_model.last_name = Set(last_name);
        }
        if let Some(email) = self.email {
            active_model.email = Set(email);
        }
        if let Some(phone_number) = self.phone_number {
            active_model.phone_number = Set(phone_number);
        }
        if let Some(company_name) = self.company_name {
            active_model.company_name = Set(company_name);
        }
        if let Some(lead_source) = self.lead_source {
            active_model.lead_source = Set(lead_source);
        }
        if let Some(lead_status) = self.lead_status {
            active_model.lead_status = Set(lead_status);
        }
        if let Some(lead_score) = self.lead_score {
            active_model.lead_score = Set(lead_score);
        }
        if let Some(converted_to_contact_id) = self.converted_to_contact_id {
            active_model.converted_to_contact_id = Set(converted_to_contact_id);
        }

        active_model
    }
}
