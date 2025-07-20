use async_graphql::InputObject;
use sea_orm::{ActiveModelBehavior, ActiveValue::Set, IntoActiveModel};
use uuid::Uuid;

use crate::entities::_generated::crm_companies::*;

#[derive(Debug, Clone, InputObject)]
pub struct CreateCompany {
    pub name: String,
    pub description: Option<String>,
    pub email: Option<String>,
    pub website: Option<String>,
    pub industry: Option<String>,
    pub phone_number: Option<String>,
    pub address_id: Option<Uuid>,
}

impl IntoActiveModel<ActiveModel> for CreateCompany {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.name = Set(self.name);
        active_model.description = Set(self.description);
        active_model.email = Set(self.email);
        active_model.website = Set(self.website);
        active_model.industry = Set(self.industry);
        active_model.phone_number = Set(self.phone_number);
        active_model.address_id = Set(self.address_id);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCompany {
    pub id: Uuid,
    pub name: Option<String>,
    pub description: Option<Option<String>>,
    pub email: Option<Option<String>>,
    pub website: Option<Option<String>>,
    pub industry: Option<Option<String>>,
    pub phone_number: Option<Option<String>>,
    pub address_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<ActiveModel> for UpdateCompany {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(chrono::Utc::now().fixed_offset());

        if let Some(name) = self.name {
            active_model.name = Set(name);
        }

        if let Some(description) = self.description {
            active_model.description = Set(description);
        }

        if let Some(email) = self.email {
            active_model.email = Set(email);
        }

        if let Some(website) = self.website {
            active_model.website = Set(website);
        }

        if let Some(industry) = self.industry {
            active_model.industry = Set(industry);
        }

        if let Some(phone_number) = self.phone_number {
            active_model.phone_number = Set(phone_number);
        }

        if let Some(address_id) = self.address_id {
            active_model.address_id = Set(address_id);
        }

        active_model
    }
}
