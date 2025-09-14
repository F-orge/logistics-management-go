use crate::entities::_generated::campaigns;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::prelude::Date;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
    prelude::*,
};

#[derive(Debug, Clone, InputObject)]
pub struct InsertCampaign {
    pub name: String,
    pub budget: Option<Decimal>,
    pub start_date: Option<Date>,
    pub end_date: Option<Date>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCampaign {
    pub name: Option<String>,
    pub budget: Option<Option<Decimal>>,
    pub start_date: Option<Option<Date>>,
    pub end_date: Option<Option<Date>>,
}

impl IntoActiveModel<campaigns::ActiveModel> for InsertCampaign {
    fn into_active_model(self) -> campaigns::ActiveModel {
        let mut active_model = campaigns::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.budget = Set(self.budget);
        active_model.start_date = Set(self.start_date);
        active_model.end_date = Set(self.end_date);
        active_model
    }
}

impl IntoActiveModel<campaigns::ActiveModel> for UpdateCampaign {
    fn into_active_model(self) -> campaigns::ActiveModel {
        let mut active_model = campaigns::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.budget = self.budget.map(Set).unwrap_or(NotSet);
        active_model.start_date = self.start_date.map(Set).unwrap_or(NotSet);
        active_model.end_date = self.end_date.map(Set).unwrap_or(NotSet);
        active_model
    }
}
use crate::entities::_generated::{leads, opportunities};
use async_graphql::{ComplexObject, Context};

#[ComplexObject]
impl campaigns::Model {
    async fn leads(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<leads::Model>> {
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        let results = leads::Entity::find()
            .filter(leads::Column::CampaignId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn opportunities(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<opportunities::Model>> {
        let db = ctx.data::<sea_orm::DatabaseConnection>()?;
        let results = opportunities::Entity::find()
            .filter(opportunities::Column::CampaignId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
