use crate::entities::_generated::opportunities;
use crate::entities::_generated::sea_orm_active_enums::{OpportunitySource, OpportunityStage};
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::prelude::Date;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertOpportunity {
    pub name: String,
    pub stage: Option<OpportunityStage>,
    pub deal_value: Option<Decimal>,
    pub probability: Option<f32>,
    pub expected_close_date: Option<Date>,
    pub lost_reason: Option<String>,
    pub source: Option<OpportunitySource>,
    pub owner_id: Uuid,
    pub contact_id: Option<Uuid>,
    pub company_id: Option<Uuid>,
    pub campaign_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateOpportunity {
    pub name: Option<String>,
    pub stage: Option<Option<OpportunityStage>>,
    pub deal_value: Option<Option<Decimal>>,
    pub probability: Option<Option<f32>>,
    pub expected_close_date: Option<Option<Date>>,
    pub lost_reason: Option<Option<String>>,
    pub source: Option<Option<OpportunitySource>>,
    pub owner_id: Option<Uuid>,
    pub contact_id: Option<Option<Uuid>>,
    pub company_id: Option<Option<Uuid>>,
    pub campaign_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<opportunities::ActiveModel> for InsertOpportunity {
    fn into_active_model(self) -> opportunities::ActiveModel {
        let mut active_model = opportunities::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.stage = Set(self.stage);
        active_model.deal_value = Set(self.deal_value);
        active_model.probability = Set(self.probability);
        active_model.expected_close_date = Set(self.expected_close_date);
        active_model.lost_reason = Set(self.lost_reason);
        active_model.source = Set(self.source);
        active_model.owner_id = Set(self.owner_id);
        active_model.contact_id = Set(self.contact_id);
        active_model.company_id = Set(self.company_id);
        active_model.campaign_id = Set(self.campaign_id);
        active_model
    }
}

impl IntoActiveModel<opportunities::ActiveModel> for UpdateOpportunity {
    fn into_active_model(self) -> opportunities::ActiveModel {
        let mut active_model = opportunities::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.stage = self.stage.map(Set).unwrap_or(NotSet);
        active_model.deal_value = self.deal_value.map(Set).unwrap_or(NotSet);
        active_model.probability = self.probability.map(Set).unwrap_or(NotSet);
        active_model.expected_close_date = self.expected_close_date.map(Set).unwrap_or(NotSet);
        active_model.lost_reason = self.lost_reason.map(Set).unwrap_or(NotSet);
        active_model.source = self.source.map(Set).unwrap_or(NotSet);
        active_model.owner_id = self.owner_id.map(Set).unwrap_or(NotSet);
        active_model.contact_id = self.contact_id.map(Set).unwrap_or(NotSet);
        active_model.company_id = self.company_id.map(Set).unwrap_or(NotSet);
        active_model.campaign_id = self.campaign_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}
