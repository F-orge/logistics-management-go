use crate::entities::_generated::inventory_adjustments;
use crate::entities::_generated::sea_orm_active_enums::InventoryAdjustmentReasonEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::lorem::raw::Sentence;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertInventoryAdjustment {
    pub product_id: Uuid,

    pub warehouse_id: Uuid,

    pub user_id: Uuid,
    #[dummy(faker = "-100..100")]
    pub quantity_change: i32,

    pub reason: Option<InventoryAdjustmentReasonEnum>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub notes: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInventoryAdjustment {
    pub product_id: Option<Uuid>,
    pub warehouse_id: Option<Uuid>,
    pub user_id: Option<Uuid>,
    pub quantity_change: Option<i32>,
    pub reason: Option<Option<InventoryAdjustmentReasonEnum>>,
    pub notes: Option<Option<String>>,
}

impl IntoActiveModel<inventory_adjustments::ActiveModel> for InsertInventoryAdjustment {
    fn into_active_model(self) -> inventory_adjustments::ActiveModel {
        let mut active_model = inventory_adjustments::ActiveModel::new();
        active_model.product_id = Set(self.product_id);
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.user_id = Set(self.user_id);
        active_model.quantity_change = Set(self.quantity_change);
        active_model.reason = Set(self.reason);
        active_model.notes = Set(self.notes);
        active_model
    }
}

impl IntoActiveModel<inventory_adjustments::ActiveModel> for UpdateInventoryAdjustment {
    fn into_active_model(self) -> inventory_adjustments::ActiveModel {
        let mut active_model = inventory_adjustments::ActiveModel::new();
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.warehouse_id = self.warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.user_id = self.user_id.map(Set).unwrap_or(NotSet);
        active_model.quantity_change = self.quantity_change.map(Set).unwrap_or(NotSet);
        active_model.reason = self.reason.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::products;
use async_graphql::{ComplexObject, Context};
use graphql_auth::entities::_generated::user;
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl inventory_adjustments::Model {
    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = products::Entity::find_by_id(self.product_id)
            .one(db)
            .await?;
        match result {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Product not found")),
        }
    }

    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = user::Entity::find_by_id(self.user_id).one(db).await?;
        match result {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("User not found")),
        }
    }
}
