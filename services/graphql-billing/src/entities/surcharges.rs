use crate::entities::_generated::sea_orm_active_enums::SurchargeCalculationMethodEnum;
use crate::entities::_generated::surcharges;
use async_graphql::InputObject;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertSurcharge {
    pub name: String,
    pub r#type: String,
    pub amount: Decimal,
    pub calculation_method: SurchargeCalculationMethodEnum,
    pub is_active: Option<bool>,
    pub valid_from: Option<sea_orm::prelude::Date>,
    pub valid_to: Option<sea_orm::prelude::Date>,
    pub description: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateSurcharge {
    pub name: Option<String>,
    pub r#type: Option<String>,
    pub amount: Option<Decimal>,
    pub calculation_method: Option<SurchargeCalculationMethodEnum>,
    pub is_active: Option<Option<bool>>,
    pub valid_from: Option<Option<sea_orm::prelude::Date>>,
    pub valid_to: Option<Option<sea_orm::prelude::Date>>,
    pub description: Option<Option<String>>,
}

impl IntoActiveModel<surcharges::ActiveModel> for InsertSurcharge {
    fn into_active_model(self) -> surcharges::ActiveModel {
        let mut active_model = surcharges::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.r#type = Set(self.r#type);
        active_model.amount = Set(self.amount);
        active_model.calculation_method = Set(self.calculation_method);
        active_model.is_active = Set(self.is_active);
        active_model.valid_from = Set(self.valid_from);
        active_model.valid_to = Set(self.valid_to);
        active_model.description = Set(self.description);
        active_model
    }
}

impl IntoActiveModel<surcharges::ActiveModel> for UpdateSurcharge {
    fn into_active_model(self) -> surcharges::ActiveModel {
        let mut active_model = surcharges::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
        active_model.amount = self.amount.map(Set).unwrap_or(NotSet);
        active_model.calculation_method = self.calculation_method.map(Set).unwrap_or(NotSet);
        active_model.is_active = self.is_active.map(Set).unwrap_or(NotSet);
        active_model.valid_from = self.valid_from.map(Set).unwrap_or(NotSet);
        active_model.valid_to = self.valid_to.map(Set).unwrap_or(NotSet);
        active_model.description = self.description.map(Set).unwrap_or(NotSet);
        active_model
    }
}
