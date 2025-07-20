use async_graphql::InputObject;
use sea_orm::ActiveValue::Set;
use sea_orm::IntoActiveModel;
use sea_orm::entity::prelude::*;

use super::_generated::opportunities::*;
use super::_generated::sea_orm_active_enums::OpportunityStage;

#[derive(Debug, Clone, InputObject)]
pub struct CreateOpportunity {
    pub name: String,
    pub company_id: Option<Uuid>,
    pub primary_contact_id: Option<Uuid>,
    pub stage: OpportunityStage,
    pub amount: Decimal,
    pub close_date: Option<Date>,
    pub probability: Decimal,
}

impl IntoActiveModel<ActiveModel> for CreateOpportunity {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.name = Set(self.name);
        active_model.company_id = Set(self.company_id);
        active_model.primary_contact_id = Set(self.primary_contact_id);
        active_model.stage = Set(self.stage);
        active_model.amount = Set(self.amount);
        active_model.close_date = Set(self.close_date);
        active_model.probability = Set(self.probability);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateOpportunity {
    pub id: Uuid,
    pub name: Option<String>,
    pub company_id: Option<Option<Uuid>>,
    pub primary_contact_id: Option<Option<Uuid>>,
    pub stage: Option<OpportunityStage>,
    pub amount: Option<Decimal>,
    pub close_date: Option<Option<Date>>,
    pub probability: Option<Decimal>,
}

impl IntoActiveModel<ActiveModel> for UpdateOpportunity {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);

        if let Some(name) = self.name {
            active_model.name = Set(name);
        }
        if let Some(company_id) = self.company_id {
            active_model.company_id = Set(company_id);
        }
        if let Some(primary_contact_id) = self.primary_contact_id {
            active_model.primary_contact_id = Set(primary_contact_id);
        }
        if let Some(stage) = self.stage {
            active_model.stage = Set(stage);
        }
        if let Some(amount) = self.amount {
            active_model.amount = Set(amount);
        }
        if let Some(close_date) = self.close_date {
            active_model.close_date = Set(close_date);
        }
        if let Some(probability) = self.probability {
            active_model.probability = Set(probability);
        }

        active_model
    }
}
