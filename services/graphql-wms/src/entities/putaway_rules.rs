use crate::entities::_generated::putaway_rules;
use crate::entities::_generated::sea_orm_active_enums::LocationTypeEnum;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
// use fake::locales::EN; // removed: unused

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertPutawayRule {
    pub product_id: Uuid,

    pub client_id: Option<Uuid>,

    pub warehouse_id: Uuid,

    pub preferred_location_id: Option<Uuid>,

    pub location_type: Option<LocationTypeEnum>,
    #[dummy(faker = "1..10")]
    pub priority: i32,
    #[dummy(faker = "1..10")]
    pub min_quantity: Option<i32>,
    #[dummy(faker = "10..100")]
    pub max_quantity: Option<i32>,
    #[dummy(faker = "1.0..1000.0")]
    pub weight_threshold: Option<f32>,
    #[dummy(faker = "1.0..1000.0")]
    pub volume_threshold: Option<f32>,

    pub requires_temperature_control: Option<bool>,

    pub requires_hazmat_approval: Option<bool>,

    pub is_active: Option<bool>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdatePutawayRule {
    pub product_id: Option<Uuid>,
    pub client_id: Option<Option<Uuid>>,
    pub warehouse_id: Option<Uuid>,
    pub preferred_location_id: Option<Option<Uuid>>,
    pub location_type: Option<Option<LocationTypeEnum>>,
    pub priority: Option<i32>,
    pub min_quantity: Option<Option<i32>>,
    pub max_quantity: Option<Option<i32>>,
    pub weight_threshold: Option<Option<f32>>,
    pub volume_threshold: Option<Option<f32>>,
    pub requires_temperature_control: Option<Option<bool>>,
    pub requires_hazmat_approval: Option<Option<bool>>,
    pub is_active: Option<Option<bool>>,
}

impl IntoActiveModel<putaway_rules::ActiveModel> for InsertPutawayRule {
    fn into_active_model(self) -> putaway_rules::ActiveModel {
        let mut active_model = putaway_rules::ActiveModel::new();
        active_model.product_id = Set(self.product_id);
        active_model.client_id = Set(self.client_id);
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.preferred_location_id = Set(self.preferred_location_id);
        active_model.location_type = Set(self.location_type);
        active_model.priority = Set(self.priority);
        active_model.min_quantity = Set(self.min_quantity);
        active_model.max_quantity = Set(self.max_quantity);
        active_model.weight_threshold = Set(self.weight_threshold);
        active_model.volume_threshold = Set(self.volume_threshold);
        active_model.requires_temperature_control = Set(self.requires_temperature_control);
        active_model.requires_hazmat_approval = Set(self.requires_hazmat_approval);
        active_model.is_active = Set(self.is_active);
        active_model
    }
}

impl IntoActiveModel<putaway_rules::ActiveModel> for UpdatePutawayRule {
    fn into_active_model(self) -> putaway_rules::ActiveModel {
        let mut active_model = putaway_rules::ActiveModel::new();
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.client_id = self.client_id.map(Set).unwrap_or(NotSet);
        active_model.warehouse_id = self.warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.preferred_location_id = self.preferred_location_id.map(Set).unwrap_or(NotSet);
        active_model.location_type = self.location_type.map(Set).unwrap_or(NotSet);
        active_model.priority = self.priority.map(Set).unwrap_or(NotSet);
        active_model.min_quantity = self.min_quantity.map(Set).unwrap_or(NotSet);
        active_model.max_quantity = self.max_quantity.map(Set).unwrap_or(NotSet);
        active_model.weight_threshold = self.weight_threshold.map(Set).unwrap_or(NotSet);
        active_model.volume_threshold = self.volume_threshold.map(Set).unwrap_or(NotSet);
        active_model.requires_temperature_control =
            self.requires_temperature_control.map(Set).unwrap_or(NotSet);
        active_model.requires_hazmat_approval =
            self.requires_hazmat_approval.map(Set).unwrap_or(NotSet);
        active_model.is_active = self.is_active.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{companies, locations, products, warehouses};
use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl putaway_rules::Model {
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

    async fn client(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<companies::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(client_id) = self.client_id {
            let res = companies::Entity::find_by_id(client_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn preferred_location(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<locations::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(loc_id) = self.preferred_location_id {
            let res = locations::Entity::find_by_id(loc_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn warehouse(&self, ctx: &Context<'_>) -> async_graphql::Result<warehouses::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = warehouses::Entity::find_by_id(self.warehouse_id)
            .one(db)
            .await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Warehouse not found")),
        }
    }
}
