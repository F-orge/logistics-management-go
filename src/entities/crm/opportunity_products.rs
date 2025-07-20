use async_graphql::InputObject;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

use crate::entities::_generated::crm_opportunity_products::*;

#[derive(Debug, Clone, InputObject)]
pub struct CreateOpportunityProduct {
    pub opportunity_id: Uuid,
    pub product_id: Uuid,
    pub quantity: Decimal,
    pub unit_price: Decimal,
}

impl IntoActiveModel<ActiveModel> for CreateOpportunityProduct {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.opportunity_id = Set(self.opportunity_id);
        active_model.product_id = Set(self.product_id);
        active_model.quantity = Set(self.quantity);
        active_model.unit_price = Set(self.unit_price);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateOpportunityProduct {
    pub id: Uuid,
    pub opportunity_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub quantity: Option<Decimal>,
    pub unit_price: Option<Decimal>,
}

impl IntoActiveModel<ActiveModel> for UpdateOpportunityProduct {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);

        if let Some(opportunity_id) = self.opportunity_id {
            active_model.opportunity_id = Set(opportunity_id);
        }
        if let Some(product_id) = self.product_id {
            active_model.product_id = Set(product_id);
        }
        if let Some(quantity) = self.quantity {
            active_model.quantity = Set(quantity);
        }
        if let Some(unit_price) = self.unit_price {
            active_model.unit_price = Set(unit_price);
        }

        active_model
    }
}
