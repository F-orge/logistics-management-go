use crate::entities::_generated::opportunities;
use crate::entities::_generated::sea_orm_active_enums::{OpportunitySource, OpportunityStage};
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::prelude::Date;
use sea_orm::prelude::*;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

use fake::Dummy;
use fake::decimal::PositiveDecimal;
use fake::faker::lorem::raw::{Sentence, Word};
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertOpportunity {
    #[dummy(faker = "Word(EN)")]
    pub name: String,

    pub stage: Option<OpportunityStage>,
    #[dummy(faker = "PositiveDecimal")]
    pub deal_value: Option<Decimal>,
    #[dummy(faker = "0.0..1.0")]
    pub probability: Option<f32>,

    pub expected_close_date: Option<Date>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
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

use crate::entities::_generated::{
    campaigns, companies, contacts, invoices, leads, opportunity_products,
};
use async_graphql::{ComplexObject, Context};
use graphql_auth::entities::_generated::user;

#[ComplexObject]
impl opportunities::Model {
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
        if let Some(company_id) = self.company_id {
            let result = companies::Entity::find_by_id(company_id).one(db).await?;
            Ok(result)
        } else {
            Ok(None)
        }
    }

    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<contacts::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(contact_id) = self.contact_id {
            let result = contacts::Entity::find_by_id(contact_id).one(db).await?;
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

    async fn invoices(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<invoices::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = invoices::Entity::find()
            .filter(invoices::Column::OpportunityId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn leads(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<leads::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = leads::Entity::find()
            .filter(leads::Column::ConvertedOpportunityId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn opportunity_products(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<opportunity_products::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = opportunity_products::Entity::find()
            .filter(opportunity_products::Column::OpportunityId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
