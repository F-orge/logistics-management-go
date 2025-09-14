use crate::entities::_generated::rate_rules;
use crate::entities::_generated::sea_orm_active_enums::PricingModelEnum;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertRateRule {
    pub rate_card_id: Uuid,
    pub condition: String,
    pub value: String,
    pub price: Decimal,
    pub pricing_model: PricingModelEnum,
    pub min_value: Option<Decimal>,
    pub max_value: Option<Decimal>,
    pub priority: Option<i32>,
    pub is_active: Option<bool>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateRateRule {
    pub rate_card_id: Option<Uuid>,
    pub condition: Option<String>,
    pub value: Option<String>,
    pub price: Option<Decimal>,
    pub pricing_model: Option<PricingModelEnum>,
    pub min_value: Option<Option<Decimal>>,
    pub max_value: Option<Option<Decimal>>,
    pub priority: Option<Option<i32>>,
    pub is_active: Option<Option<bool>>,
}

impl IntoActiveModel<rate_rules::ActiveModel> for InsertRateRule {
    fn into_active_model(self) -> rate_rules::ActiveModel {
        let mut active_model = rate_rules::ActiveModel::new();
        active_model.rate_card_id = Set(self.rate_card_id);
        active_model.condition = Set(self.condition);
        active_model.value = Set(self.value);
        active_model.price = Set(self.price);
        active_model.pricing_model = Set(self.pricing_model);
        active_model.min_value = Set(self.min_value);
        active_model.max_value = Set(self.max_value);
        active_model.priority = Set(self.priority);
        active_model.is_active = Set(self.is_active);
        active_model
    }
}

impl IntoActiveModel<rate_rules::ActiveModel> for UpdateRateRule {
    fn into_active_model(self) -> rate_rules::ActiveModel {
        let mut active_model = rate_rules::ActiveModel::new();
        active_model.rate_card_id = self.rate_card_id.map(Set).unwrap_or(NotSet);
        active_model.condition = self.condition.map(Set).unwrap_or(NotSet);
        active_model.value = self.value.map(Set).unwrap_or(NotSet);
        active_model.price = self.price.map(Set).unwrap_or(NotSet);
        active_model.pricing_model = self.pricing_model.map(Set).unwrap_or(NotSet);
        active_model.min_value = self.min_value.map(Set).unwrap_or(NotSet);
        active_model.max_value = self.max_value.map(Set).unwrap_or(NotSet);
        active_model.priority = self.priority.map(Set).unwrap_or(NotSet);
        active_model.is_active = self.is_active.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};
use crate::entities::_generated::rate_cards;

#[ComplexObject]
impl rate_rules::Model {
    async fn rate_card(&self, ctx: &Context<'_>) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = rate_cards::Entity::find_by_id(self.rate_card_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("RateCard not found")),
        }
    }

}
