use crate::entities::_generated::customer_tracking_links;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::lorem::raw::Word;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertCustomerTrackingLink {
    pub delivery_task_id: Uuid,
    #[dummy(faker = "Word(EN)")]
    pub tracking_token: String,

    pub is_active: Option<bool>,
    #[dummy(faker = "1..100")]
    pub access_count: Option<i32>,

    pub last_accessed_at: Option<sea_orm::prelude::DateTime>,

    pub expires_at: Option<sea_orm::prelude::DateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCustomerTrackingLink {
    pub delivery_task_id: Option<Uuid>,
    pub tracking_token: Option<String>,
    pub is_active: Option<Option<bool>>,
    pub access_count: Option<Option<i32>>,
    pub last_accessed_at: Option<Option<sea_orm::prelude::DateTime>>,
    pub expires_at: Option<Option<sea_orm::prelude::DateTime>>,
}

impl IntoActiveModel<customer_tracking_links::ActiveModel> for InsertCustomerTrackingLink {
    fn into_active_model(self) -> customer_tracking_links::ActiveModel {
        let mut active_model = customer_tracking_links::ActiveModel::new();
        active_model.delivery_task_id = Set(self.delivery_task_id);
        active_model.tracking_token = Set(self.tracking_token);
        active_model.is_active = Set(self.is_active);
        active_model.access_count = Set(self.access_count);
        active_model.last_accessed_at = Set(self.last_accessed_at);
        active_model.expires_at = Set(self.expires_at);
        active_model
    }
}

impl IntoActiveModel<customer_tracking_links::ActiveModel> for UpdateCustomerTrackingLink {
    fn into_active_model(self) -> customer_tracking_links::ActiveModel {
        let mut active_model = customer_tracking_links::ActiveModel::new();
        active_model.delivery_task_id = self.delivery_task_id.map(Set).unwrap_or(NotSet);
        active_model.tracking_token = self.tracking_token.map(Set).unwrap_or(NotSet);
        active_model.is_active = self.is_active.map(Set).unwrap_or(NotSet);
        active_model.access_count = self.access_count.map(Set).unwrap_or(NotSet);
        active_model.last_accessed_at = self.last_accessed_at.map(Set).unwrap_or(NotSet);
        active_model.expires_at = self.expires_at.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::delivery_tasks;
use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl customer_tracking_links::Model {
    async fn delivery_task(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<delivery_tasks::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let result = delivery_tasks::Entity::find_by_id(self.delivery_task_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Delivery task not found")),
        }
    }
}
