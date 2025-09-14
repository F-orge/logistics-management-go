use crate::entities::_generated::bin_thresholds;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertBinThreshold {
    pub location_id: Uuid,
    pub product_id: Uuid,
    pub min_quantity: i32,
    pub max_quantity: i32,
    pub reorder_quantity: Option<i32>,
    pub alert_threshold: Option<i32>,
    pub is_active: Option<bool>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateBinThreshold {
    pub location_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub min_quantity: Option<i32>,
    pub max_quantity: Option<i32>,
    pub reorder_quantity: Option<Option<i32>>,
    pub alert_threshold: Option<Option<i32>>,
    pub is_active: Option<Option<bool>>,
}

impl IntoActiveModel<bin_thresholds::ActiveModel> for InsertBinThreshold {
    fn into_active_model(self) -> bin_thresholds::ActiveModel {
        let mut active_model = bin_thresholds::ActiveModel::new();
        active_model.location_id = Set(self.location_id);
        active_model.product_id = Set(self.product_id);
        active_model.min_quantity = Set(self.min_quantity);
        active_model.max_quantity = Set(self.max_quantity);
        active_model.reorder_quantity = Set(self.reorder_quantity);
        active_model.alert_threshold = Set(self.alert_threshold);
        active_model.is_active = Set(self.is_active);
        active_model
    }
}

impl IntoActiveModel<bin_thresholds::ActiveModel> for UpdateBinThreshold {
    fn into_active_model(self) -> bin_thresholds::ActiveModel {
        let mut active_model = bin_thresholds::ActiveModel::new();
        active_model.location_id = self.location_id.map(Set).unwrap_or(NotSet);
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.min_quantity = self.min_quantity.map(Set).unwrap_or(NotSet);
        active_model.max_quantity = self.max_quantity.map(Set).unwrap_or(NotSet);
        active_model.reorder_quantity = self.reorder_quantity.map(Set).unwrap_or(NotSet);
        active_model.alert_threshold = self.alert_threshold.map(Set).unwrap_or(NotSet);
        active_model.is_active = self.is_active.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{locations, products};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl bin_thresholds::Model {
    async fn location(&self, ctx: &Context<'_>) -> async_graphql::Result<locations::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = locations::Entity::find_by_id(self.location_id)
            .one(db)
            .await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Location not found")),
        }
    }

    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = products::Entity::find_by_id(self.product_id)
            .one(db)
            .await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Product not found")),
        }
    }
}
