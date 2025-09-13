use crate::entities::_generated::opportunity_products;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertOpportunityProduct {
    pub opportunity_id: Uuid,
    pub product_id: Uuid,
    pub quantity: i32,
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
