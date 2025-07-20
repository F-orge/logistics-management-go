use async_graphql::InputObject;
use sea_orm::{ActiveModelBehavior, ActiveValue::Set, IntoActiveModel};
use uuid::Uuid;

use crate::entities::_generated::crm_contacts::*;
use crate::entities::_generated::sea_orm_active_enums::CrmContactStatus;

#[derive(Debug, Clone, InputObject)]
pub struct CreateContact {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub job_title: Option<String>,
    pub lead_source: Option<String>,
    pub status: CrmContactStatus,
    pub birth_date: Option<chrono::NaiveDate>,
    pub company_id: Option<Uuid>,
    pub address_id: Option<Uuid>,
}

impl IntoActiveModel<ActiveModel> for CreateContact {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.first_name = Set(self.first_name);
        active_model.last_name = Set(self.last_name);
        active_model.email = Set(self.email);
        active_model.phone_number = Set(self.phone_number);
        active_model.job_title = Set(self.job_title);
        active_model.lead_source = Set(self.lead_source);
        active_model.status = Set(self.status);
        active_model.birth_date = Set(self.birth_date);
        active_model.company_id = Set(self.company_id);
        active_model.address_id = Set(self.address_id);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateContact {
    pub id: Uuid,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<Option<String>>,
    pub job_title: Option<Option<String>>,
    pub lead_source: Option<Option<String>>,
    pub status: Option<CrmContactStatus>,
    pub birth_date: Option<Option<chrono::NaiveDate>>,
    pub company_id: Option<Option<Uuid>>,
    pub address_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<ActiveModel> for UpdateContact {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(chrono::Utc::now().fixed_offset());

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

        if let Some(job_title) = self.job_title {
            active_model.job_title = Set(job_title);
        }

        if let Some(lead_source) = self.lead_source {
            active_model.lead_source = Set(lead_source);
        }

        if let Some(status) = self.status {
            active_model.status = Set(status);
        }

        if let Some(birth_date) = self.birth_date {
            active_model.birth_date = Set(birth_date);
        }

        if let Some(company_id) = self.company_id {
            active_model.company_id = Set(company_id);
        }

        if let Some(address_id) = self.address_id {
            active_model.address_id = Set(address_id);
        }

        active_model
    }
}
