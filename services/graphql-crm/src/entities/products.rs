use crate::entities::_generated::products;
use crate::entities::_generated::sea_orm_active_enums::ProductType;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::prelude::*;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};

use fake::Dummy;
use fake::decimal::PositiveDecimal;
use fake::faker::lorem::raw::{Sentence, Word};
use fake::faker::number::raw::NumberWithFormat;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertProduct {
    #[dummy(faker = "Word(EN)")]
    pub name: String,
    #[dummy(faker = "NumberWithFormat(EN, \"SKU-#####\")")]
    pub sku: Option<String>,
    #[dummy(faker = "PositiveDecimal")]
    pub price: Decimal,

    pub r#type: Option<ProductType>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub description: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateProduct {
    pub name: Option<String>,
    pub sku: Option<Option<String>>,
    pub price: Option<Decimal>,
    pub r#type: Option<Option<ProductType>>,
    pub description: Option<Option<String>>,
}

impl IntoActiveModel<products::ActiveModel> for InsertProduct {
    fn into_active_model(self) -> products::ActiveModel {
        let mut active_model = products::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.sku = Set(self.sku);
        active_model.price = Set(self.price);
        active_model.r#type = Set(self.r#type);
        active_model.description = Set(self.description);
        active_model
    }
}

impl IntoActiveModel<products::ActiveModel> for UpdateProduct {
    fn into_active_model(self) -> products::ActiveModel {
        let mut active_model = products::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.sku = self.sku.map(Set).unwrap_or(NotSet);
        active_model.price = self.price.map(Set).unwrap_or(NotSet);
        active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
        active_model.description = self.description.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{invoice_items, opportunity_products};
use async_graphql::{ComplexObject, Context};

#[ComplexObject]
impl products::Model {
    async fn invoice_items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<invoice_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = invoice_items::Entity::find()
            .filter(invoice_items::Column::ProductId.eq(self.id))
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
            .filter(opportunity_products::Column::ProductId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
