use crate::entities::_generated::sea_orm_active_enums::TaskItemStatusEnum;
use crate::entities::_generated::task_items;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::lorem::raw::{Word, Words};
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertTaskItem {
    pub task_id: Uuid,

    pub product_id: Uuid,

    pub batch_id: Option<Uuid>,

    pub source_location_id: Option<Uuid>,

    pub destination_location_id: Option<Uuid>,
    #[dummy(faker = "1..10")]
    pub quantity_required: i32,
    #[dummy(faker = "1..10")]
    pub quantity_completed: i32,
    #[dummy(faker = "1..10")]
    pub quantity_remaining: Option<i32>,

    pub status: Option<TaskItemStatusEnum>,
    #[dummy(faker = "Word(EN)")]
    pub lot_number: Option<String>,
    #[dummy(faker = "Words(EN, 1..3)")]
    pub serial_numbers: Option<Vec<String>>,

    pub expiry_date: Option<sea_orm::prelude::Date>,
    #[dummy(faker = "Word(EN)")]
    pub notes: Option<String>,

    pub completed_at: Option<sea_orm::prelude::DateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTaskItem {
    pub task_id: Option<Uuid>,
    pub product_id: Option<Uuid>,
    pub batch_id: Option<Option<Uuid>>,
    pub source_location_id: Option<Option<Uuid>>,
    pub destination_location_id: Option<Option<Uuid>>,
    pub quantity_required: Option<i32>,
    pub quantity_completed: Option<i32>,
    pub quantity_remaining: Option<Option<i32>>,
    pub status: Option<Option<TaskItemStatusEnum>>,
    pub lot_number: Option<Option<String>>,
    pub serial_numbers: Option<Option<Vec<String>>>,
    pub expiry_date: Option<Option<sea_orm::prelude::Date>>,
    pub notes: Option<Option<String>>,
    pub completed_at: Option<Option<sea_orm::prelude::DateTime>>,
}

impl IntoActiveModel<task_items::ActiveModel> for InsertTaskItem {
    fn into_active_model(self) -> task_items::ActiveModel {
        let mut active_model = task_items::ActiveModel::new();
        active_model.task_id = Set(self.task_id);
        active_model.product_id = Set(self.product_id);
        active_model.batch_id = Set(self.batch_id);
        active_model.source_location_id = Set(self.source_location_id);
        active_model.destination_location_id = Set(self.destination_location_id);
        active_model.quantity_required = Set(self.quantity_required);
        active_model.quantity_completed = Set(self.quantity_completed);
        active_model.quantity_remaining = Set(self.quantity_remaining);
        active_model.status = Set(self.status);
        active_model.lot_number = Set(self.lot_number);
        active_model.serial_numbers = Set(self.serial_numbers);
        active_model.expiry_date = Set(self.expiry_date);
        active_model.notes = Set(self.notes);
        active_model.completed_at = Set(self.completed_at);
        active_model
    }
}

impl IntoActiveModel<task_items::ActiveModel> for UpdateTaskItem {
    fn into_active_model(self) -> task_items::ActiveModel {
        let mut active_model = task_items::ActiveModel::new();
        active_model.task_id = self.task_id.map(Set).unwrap_or(NotSet);
        active_model.product_id = self.product_id.map(Set).unwrap_or(NotSet);
        active_model.batch_id = self.batch_id.map(Set).unwrap_or(NotSet);
        active_model.source_location_id = self.source_location_id.map(Set).unwrap_or(NotSet);
        active_model.destination_location_id =
            self.destination_location_id.map(Set).unwrap_or(NotSet);
        active_model.quantity_required = self.quantity_required.map(Set).unwrap_or(NotSet);
        active_model.quantity_completed = self.quantity_completed.map(Set).unwrap_or(NotSet);
        active_model.quantity_remaining = self.quantity_remaining.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.lot_number = self.lot_number.map(Set).unwrap_or(NotSet);
        active_model.serial_numbers = self.serial_numbers.map(Set).unwrap_or(NotSet);
        active_model.expiry_date = self.expiry_date.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model.completed_at = self.completed_at.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{inventory_batches, locations, products, tasks};
use async_graphql::{ComplexObject, Context};
use sea_orm::{DatabaseConnection, EntityTrait};

#[ComplexObject]
impl task_items::Model {
    async fn task(&self, ctx: &Context<'_>) -> async_graphql::Result<tasks::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = tasks::Entity::find_by_id(self.task_id).one(db).await?;
        match res {
            Some(m) => Ok(m),
            None => Err(async_graphql::Error::new("Task not found")),
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

    async fn batch(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<inventory_batches::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(batch_id) = self.batch_id {
            let res = inventory_batches::Entity::find_by_id(batch_id)
                .one(db)
                .await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn source_location(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<locations::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(loc_id) = self.source_location_id {
            let res = locations::Entity::find_by_id(loc_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn destination_location(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<locations::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(loc_id) = self.destination_location_id {
            let res = locations::Entity::find_by_id(loc_id).one(db).await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }
}
