use async_graphql::InputObject;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

use crate::entities::_generated::crm_products::*;

#[derive(Debug, Clone, InputObject)]
pub struct CreateProduct {
    pub name: String,
    pub description: Option<String>,
    pub price: Decimal,
    pub sku: Option<String>,
}

impl IntoActiveModel<ActiveModel> for CreateProduct {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.name = Set(self.name);
        active_model.description = Set(self.description);
        active_model.price = Set(self.price);
        active_model.sku = Set(self.sku);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateProduct {
    pub id: Uuid,
    pub name: Option<String>,
    pub description: Option<Option<String>>,
    pub price: Option<Decimal>,
    pub sku: Option<Option<String>>,
}

impl IntoActiveModel<ActiveModel> for UpdateProduct {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);

        if let Some(name) = self.name {
            active_model.name = Set(name);
        }
        if let Some(description) = self.description {
            active_model.description = Set(description);
        }
        if let Some(price) = self.price {
            active_model.price = Set(price);
        }
        if let Some(sku) = self.sku {
            active_model.sku = Set(sku);
        }

        active_model
    }
}
