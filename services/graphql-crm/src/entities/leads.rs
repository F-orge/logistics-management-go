use crate::entities::_generated::leads;
use crate::entities::_generated::sea_orm_active_enums::{LeadSource, LeadStatus};
use async_graphql::InputObject;
use sea_orm::prelude::DateTimeWithTimeZone;
use sea_orm::prelude::*;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertLead {
    pub name: String,
    pub email: String,
    pub lead_source: Option<LeadSource>,
    pub status: Option<LeadStatus>,
    pub lead_score: Option<i32>,
    pub owner_id: Uuid,
    pub campaign_id: Option<Uuid>,
    pub converted_at: Option<DateTimeWithTimeZone>,
    pub converted_contact_id: Option<Uuid>,
    pub converted_company_id: Option<Uuid>,
    pub converted_opportunity_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateLead {
    pub name: Option<String>,
    pub email: Option<String>,
    pub lead_source: Option<Option<LeadSource>>,
    pub status: Option<Option<LeadStatus>>,
    pub lead_score: Option<Option<i32>>,
    pub owner_id: Option<Uuid>,
    pub campaign_id: Option<Option<Uuid>>,
    pub converted_at: Option<Option<DateTimeWithTimeZone>>,
    pub converted_contact_id: Option<Option<Uuid>>,
    pub converted_company_id: Option<Option<Uuid>>,
    pub converted_opportunity_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<leads::ActiveModel> for InsertLead {
    fn into_active_model(self) -> leads::ActiveModel {
        let mut active_model = leads::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.email = Set(self.email);
        active_model.lead_source = Set(self.lead_source);
        active_model.status = Set(self.status);
        active_model.lead_score = Set(self.lead_score);
        active_model.owner_id = Set(self.owner_id);
        active_model.campaign_id = Set(self.campaign_id);
        active_model.converted_at = Set(self.converted_at);
        active_model.converted_contact_id = Set(self.converted_contact_id);
        active_model.converted_company_id = Set(self.converted_company_id);
        active_model.converted_opportunity_id = Set(self.converted_opportunity_id);
        active_model
    }
}

impl IntoActiveModel<leads::ActiveModel> for UpdateLead {
    fn into_active_model(self) -> leads::ActiveModel {
        let mut active_model = leads::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.email = self.email.map(Set).unwrap_or(NotSet);
        active_model.lead_source = self.lead_source.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.lead_score = self.lead_score.map(Set).unwrap_or(NotSet);
        active_model.owner_id = self.owner_id.map(Set).unwrap_or(NotSet);
        active_model.campaign_id = self.campaign_id.map(Set).unwrap_or(NotSet);
        active_model.converted_at = self.converted_at.map(Set).unwrap_or(NotSet);
        active_model.converted_contact_id = self.converted_contact_id.map(Set).unwrap_or(NotSet);
        active_model.converted_company_id = self.converted_company_id.map(Set).unwrap_or(NotSet);
        active_model.converted_opportunity_id =
            self.converted_opportunity_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{campaigns, companies, contacts, opportunities};
use async_graphql::{ComplexObject, Context};
use graphql_auth::entities::_generated::user;

#[ComplexObject]
impl leads::Model {
    async fn campaign(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<campaigns::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(campaign_id) = self.campaign_id {
            let result = campaigns::Entity::find_by_id(campaign_id).one(db).await?;
            Ok(result)
        } else {
            Ok(None)
        }
    }

    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<companies::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(company_id) = self.converted_company_id {
            let result = companies::Entity::find_by_id(company_id).one(db).await?;
            Ok(result)
        } else {
            Ok(None)
        }
    }

    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<contacts::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(contact_id) = self.converted_contact_id {
            let result = contacts::Entity::find_by_id(contact_id).one(db).await?;
            Ok(result)
        } else {
            Ok(None)
        }
    }

    async fn opportunity(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<opportunities::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(opportunity_id) = self.converted_opportunity_id {
            let result = opportunities::Entity::find_by_id(opportunity_id)
                .one(db)
                .await?;
            Ok(result)
        } else {
            Ok(None)
        }
    }

    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = user::Entity::find_by_id(self.owner_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Owner not found")),
        }
    }
}
