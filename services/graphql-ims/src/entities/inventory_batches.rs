use crate::entities::_generated::inventory_batches;
use async_graphql::InputObject;
use chrono::NaiveDate;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::number::raw::NumberWithFormat;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertInventoryBatch {
    pub product_id: Uuid,
    #[dummy(faker = "NumberWithFormat(EN, \"BATCH-#####\")")]
    pub batch_number: String,

    pub expiration_date: Option<NaiveDate>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateInventoryBatch {
    pub product_id: Option<Uuid>,
    pub batch_number: Option<String>,
    pub expiration_date: Option<Option<NaiveDate>>,
}

impl IntoActiveModel<inventory_batches::ActiveModel> for InsertInventoryBatch {
    fn into_active_model(self) -> inventory_batches::ActiveModel {
        let mut active_model = inventory_batches::ActiveModel::new();
        active_model.product_id = Set(self.product_id);
        active_model.batch_number = Set(self.batch_number);
        active_model.expiration_date = Set(self.expiration_date);
        active_model
    }
}

impl IntoActiveModel<inventory_batches::ActiveModel> for UpdateInventoryBatch {
    fn into_active_model(self) -> inventory_batches::ActiveModel {
        let mut active_model = inventory_batches::ActiveModel::new();
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.batch_number = self.batch_number.map(Set).unwrap_or(NotSet);
        active_model.expiration_date = self.expiration_date.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::products;
use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl inventory_batches::Model {
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
}
