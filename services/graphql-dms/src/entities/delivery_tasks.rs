use crate::entities::_generated::delivery_tasks;
use crate::entities::_generated::sea_orm_active_enums::{
    DeliveryFailureReasonEnum, DeliveryTaskStatusEnum,
};
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::address::raw::StreetName;
use fake::faker::lorem::raw::Sentence;
use fake::faker::name::raw::Name;
use fake::faker::phone_number::raw::PhoneNumber;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertDeliveryTask {
    #[dummy(default)]
    pub package_id: Uuid,
    #[dummy(default)]
    pub delivery_route_id: Uuid,
    #[dummy(faker = "1..20")]
    pub route_sequence: i32,
    #[dummy(faker = "StreetName(EN)")]
    pub delivery_address: String,
    #[dummy(faker = "Name(EN)")]
    pub recipient_name: Option<String>,
    #[dummy(faker = "PhoneNumber(EN)")]
    pub recipient_phone: Option<String>,
    #[dummy(faker = "Sentence(EN, 3..8)")]
    pub delivery_instructions: Option<String>,
    #[dummy(default)]
    pub estimated_arrival_time: Option<sea_orm::prelude::DateTime>,
    #[dummy(default)]
    pub actual_arrival_time: Option<sea_orm::prelude::DateTime>,
    #[dummy(default)]
    pub delivery_time: Option<sea_orm::prelude::DateTime>,
    #[dummy(default)]
    pub status: Option<DeliveryTaskStatusEnum>,
    #[dummy(default)]
    pub failure_reason: Option<DeliveryFailureReasonEnum>,
    #[dummy(faker = "1..5")]
    pub attempt_count: Option<i32>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateDeliveryTask {
    pub package_id: Option<Uuid>,
    pub delivery_route_id: Option<Uuid>,
    pub route_sequence: Option<i32>,
    pub delivery_address: Option<String>,
    pub recipient_name: Option<Option<String>>,
    pub recipient_phone: Option<Option<String>>,
    pub delivery_instructions: Option<Option<String>>,
    pub estimated_arrival_time: Option<Option<sea_orm::prelude::DateTime>>,
    pub actual_arrival_time: Option<Option<sea_orm::prelude::DateTime>>,
    pub delivery_time: Option<Option<sea_orm::prelude::DateTime>>,
    pub status: Option<Option<DeliveryTaskStatusEnum>>,
    pub failure_reason: Option<Option<DeliveryFailureReasonEnum>>,
    pub attempt_count: Option<Option<i32>>,
}

impl IntoActiveModel<delivery_tasks::ActiveModel> for InsertDeliveryTask {
    fn into_active_model(self) -> delivery_tasks::ActiveModel {
        let mut active_model = delivery_tasks::ActiveModel::new();
        active_model.package_id = Set(self.package_id);
        active_model.delivery_route_id = Set(self.delivery_route_id);
        active_model.route_sequence = Set(self.route_sequence);
        active_model.delivery_address = Set(self.delivery_address);
        active_model.recipient_name = Set(self.recipient_name);
        active_model.recipient_phone = Set(self.recipient_phone);
        active_model.delivery_instructions = Set(self.delivery_instructions);
        active_model.estimated_arrival_time = Set(self.estimated_arrival_time);
        active_model.actual_arrival_time = Set(self.actual_arrival_time);
        active_model.delivery_time = Set(self.delivery_time);
        active_model.status = Set(self.status);
        active_model.failure_reason = Set(self.failure_reason);
        active_model.attempt_count = Set(self.attempt_count);
        active_model
    }
}

impl IntoActiveModel<delivery_tasks::ActiveModel> for UpdateDeliveryTask {
    fn into_active_model(self) -> delivery_tasks::ActiveModel {
        let mut active_model = delivery_tasks::ActiveModel::new();
        active_model.package_id = self.package_id.map(Set).unwrap_or(NotSet);
        active_model.delivery_route_id = self.delivery_route_id.map(Set).unwrap_or(NotSet);
        active_model.route_sequence = self.route_sequence.map(Set).unwrap_or(NotSet);
        active_model.delivery_address = self.delivery_address.map(Set).unwrap_or(NotSet);
        active_model.recipient_name = self.recipient_name.map(Set).unwrap_or(NotSet);
        active_model.recipient_phone = self.recipient_phone.map(Set).unwrap_or(NotSet);
        active_model.delivery_instructions = self.delivery_instructions.map(Set).unwrap_or(NotSet);
        active_model.estimated_arrival_time =
            self.estimated_arrival_time.map(Set).unwrap_or(NotSet);
        active_model.actual_arrival_time = self.actual_arrival_time.map(Set).unwrap_or(NotSet);
        active_model.delivery_time = self.delivery_time.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.failure_reason = self.failure_reason.map(Set).unwrap_or(NotSet);
        active_model.attempt_count = self.attempt_count.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{
    customer_tracking_links, delivery_routes, packages, proof_of_deliveries, task_events,
};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl delivery_tasks::Model {
    async fn customer_tracking_links(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<customer_tracking_links::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let results = customer_tracking_links::Entity::find()
            .filter(customer_tracking_links::Column::DeliveryTaskId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();

        Ok(results)
    }

    async fn delivery_route(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<delivery_routes::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let result = delivery_routes::Entity::find_by_id(self.delivery_route_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Delivery route not found")),
        }
    }

    async fn package(&self, ctx: &Context<'_>) -> async_graphql::Result<packages::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let result = packages::Entity::find_by_id(self.package_id)
            .one(db)
            .await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Package not found")),
        }
    }

    async fn proof_of_deliveries(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<proof_of_deliveries::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let results = proof_of_deliveries::Entity::find()
            .filter(proof_of_deliveries::Column::DeliveryTaskId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();

        Ok(results)
    }

    async fn task_events(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<task_events::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let results = task_events::Entity::find()
            .filter(task_events::Column::DeliveryTaskId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();

        Ok(results)
    }
}
