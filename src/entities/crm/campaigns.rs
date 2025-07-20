use crate::entities::_generated::crm_campaigns::*;
use crate::entities::_generated::sea_orm_active_enums::CrmCampaignStatus;
use async_graphql::InputObject;
use chrono::Utc;
use sea_orm::ActiveValue::Set;
use sea_orm::IntoActiveModel;
use sea_orm::entity::prelude::*;
use sqlx::types::chrono::NaiveDate;

#[derive(Debug, Clone, InputObject)]
pub struct CreateCampaign {
    pub name: String,
    pub description: Option<String>,
    pub start_date: NaiveDate,
    pub end_date: Option<NaiveDate>,
    pub budget: Option<Decimal>,
    pub status: CrmCampaignStatus,
}

impl IntoActiveModel<ActiveModel> for CreateCampaign {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.name = Set(self.name);
        active_model.description = Set(self.description);
        active_model.start_date = Set(self.start_date);
        active_model.end_date = Set(self.end_date);
        active_model.budget = Set(self.budget);
        active_model.status = Set(self.status);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCampaign {
    pub id: Uuid,
    pub name: Option<String>,
    pub description: Option<String>,
    pub start_date: Option<NaiveDate>,
    pub end_date: Option<NaiveDate>,
    pub budget: Option<Decimal>,
    pub status: Option<CrmCampaignStatus>,
}

impl IntoActiveModel<ActiveModel> for UpdateCampaign {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);
        active_model.updated = Set(Utc::now().fixed_offset());

        if let Some(name) = self.name {
            active_model.name = Set(name);
        }

        active_model.description = Set(self.description);

        if let Some(start_date) = self.start_date {
            active_model.start_date = Set(start_date);
        }

        active_model.end_date = Set(self.end_date);
        active_model.budget = Set(self.budget);

        if let Some(status) = self.status {
            active_model.status = Set(status);
        }

        active_model
    }
}
