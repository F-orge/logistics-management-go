use crate::entities::_generated::sea_orm_active_enums::{TaskStatusEnum, TaskTypeEnum};
use crate::entities::_generated::tasks;
use async_graphql::InputObject;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;
// --- fake imports ---
use fake::Dummy;
use fake::faker::lorem::raw::{Sentence, Word};
use fake::faker::number::raw::NumberWithFormat;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertTask {
    #[dummy(faker = "NumberWithFormat(EN, \"TASK-#####\")")]
    pub task_number: String,

    pub warehouse_id: Uuid,

    pub user_id: Option<Uuid>,

    pub r#type: TaskTypeEnum,

    pub status: Option<TaskStatusEnum>,
    #[dummy(faker = "1..10")]
    pub priority: Option<i32>,

    pub source_entity_id: Option<Uuid>,
    #[dummy(faker = "Word(EN)")]
    pub source_entity_type: Option<String>,

    pub pick_batch_id: Option<Uuid>,
    #[dummy(faker = "10..120")]
    pub estimated_duration: Option<i32>,
    #[dummy(faker = "10..120")]
    pub actual_duration: Option<i32>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub instructions: Option<String>,
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub notes: Option<String>,

    pub start_time: Option<sea_orm::prelude::DateTime>,

    pub end_time: Option<sea_orm::prelude::DateTime>,
    #[dummy(faker = "10..10000")]
    pub duration_seconds: Option<i32>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateTask {
    pub task_number: Option<String>,
    pub warehouse_id: Option<Uuid>,
    pub user_id: Option<Option<Uuid>>,
    pub r#type: Option<TaskTypeEnum>,
    pub status: Option<Option<TaskStatusEnum>>,
    pub priority: Option<Option<i32>>,
    pub source_entity_id: Option<Option<Uuid>>,
    pub source_entity_type: Option<Option<String>>,
    pub pick_batch_id: Option<Option<Uuid>>,
    pub estimated_duration: Option<Option<i32>>,
    pub actual_duration: Option<Option<i32>>,
    pub instructions: Option<Option<String>>,
    pub notes: Option<Option<String>>,
    pub start_time: Option<Option<sea_orm::prelude::DateTime>>,
    pub end_time: Option<Option<sea_orm::prelude::DateTime>>,
    pub duration_seconds: Option<Option<i32>>,
}

impl IntoActiveModel<tasks::ActiveModel> for InsertTask {
    fn into_active_model(self) -> tasks::ActiveModel {
        let mut active_model = tasks::ActiveModel::new();
        active_model.task_number = Set(self.task_number);
        active_model.warehouse_id = Set(self.warehouse_id);
        active_model.user_id = Set(self.user_id);
        active_model.r#type = Set(self.r#type);
        active_model.status = Set(self.status);
        active_model.priority = Set(self.priority);
        active_model.source_entity_id = Set(self.source_entity_id);
        active_model.source_entity_type = Set(self.source_entity_type);
        active_model.pick_batch_id = Set(self.pick_batch_id);
        active_model.estimated_duration = Set(self.estimated_duration);
        active_model.actual_duration = Set(self.actual_duration);
        active_model.instructions = Set(self.instructions);
        active_model.notes = Set(self.notes);
        active_model.start_time = Set(self.start_time);
        active_model.end_time = Set(self.end_time);
        active_model.duration_seconds = Set(self.duration_seconds);
        active_model
    }
}

impl IntoActiveModel<tasks::ActiveModel> for UpdateTask {
    fn into_active_model(self) -> tasks::ActiveModel {
        let mut active_model = tasks::ActiveModel::new();
        active_model.task_number = self.task_number.map(Set).unwrap_or(NotSet);
        active_model.warehouse_id = self.warehouse_id.map(Set).unwrap_or(NotSet);
        active_model.user_id = self.user_id.map(Set).unwrap_or(NotSet);
        active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.priority = self.priority.map(Set).unwrap_or(NotSet);
        active_model.source_entity_id = self.source_entity_id.map(Set).unwrap_or(NotSet);
        active_model.source_entity_type = self.source_entity_type.map(Set).unwrap_or(NotSet);
        active_model.pick_batch_id = self.pick_batch_id.map(Set).unwrap_or(NotSet);
        active_model.estimated_duration = self.estimated_duration.map(Set).unwrap_or(NotSet);
        active_model.actual_duration = self.actual_duration.map(Set).unwrap_or(NotSet);
        active_model.instructions = self.instructions.map(Set).unwrap_or(NotSet);
        active_model.notes = self.notes.map(Set).unwrap_or(NotSet);
        active_model.start_time = self.start_time.map(Set).unwrap_or(NotSet);
        active_model.end_time = self.end_time.map(Set).unwrap_or(NotSet);
        active_model.duration_seconds = self.duration_seconds.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{pick_batches, task_items, warehouses};
use async_graphql::{ComplexObject, Context};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

#[ComplexObject]
impl tasks::Model {
    async fn task_items(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<task_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = task_items::Entity::find()
            .filter(task_items::Column::TaskId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn user(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::user::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(user_id) = self.user_id {
            let res = crate::entities::_generated::user::Entity::find_by_id(user_id)
                .one(db)
                .await?;
            Ok(res)
        } else {
            Ok(None)
        }
    }

    async fn pick_batch(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<pick_batches::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(batch_id) = self.pick_batch_id {
            let res = pick_batches::Entity::find_by_id(batch_id).one(db).await?;
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
