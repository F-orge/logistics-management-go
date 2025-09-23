use crate::entities::_generated::opportunity_products;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
    prelude::*,
};
use uuid::Uuid;

use fake::Dummy;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertOpportunityProduct {
    pub opportunity_id: Uuid,

    pub product_id: Uuid,
    #[dummy(faker = "1..10")]
    pub quantity: i32,
}

use crate::entities::_generated::{opportunities, products};
use async_graphql::{ComplexObject, Context};

#[ComplexObject]
impl opportunity_products::Model {
    async fn opportunity(&self, ctx: &Context<'_>) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = opportunities::Entity::find_by_id(self.opportunity_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Opportunity not found")),
        }
    }

    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = products::Entity::find_by_id(self.product_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Product not found")),
        }
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateOpportunityProduct {
    pub opportunity_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub quantity: Option<i32>,
}

impl IntoActiveModel<opportunity_products::ActiveModel> for InsertOpportunityProduct {
    fn into_active_model(self) -> opportunity_products::ActiveModel {
        let mut active_model = opportunity_products::ActiveModel::new();
        active_model.opportunity_id = Set(self.opportunity_id);
        active_model.product_id = Set(self.product_id);
        active_model.quantity = Set(self.quantity);
        active_model
    }
}

impl IntoActiveModel<opportunity_products::ActiveModel> for UpdateOpportunityProduct {
    fn into_active_model(self) -> opportunity_products::ActiveModel {
        let mut active_model = opportunity_products::ActiveModel::new();
        active_model.opportunity_id = self.opportunity_id.map(Set).unwrap_or(NotSet);
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.quantity = self.quantity.map(Set).unwrap_or(NotSet);
        active_model
    }
}
