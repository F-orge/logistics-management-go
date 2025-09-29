use async_graphql::{Context, InputObject, Object};
use chrono::{NaiveDate, NaiveDateTime};
use uuid::Uuid;

use crate::models::{enums::{TaskItemStatusEnum, TaskStatusEnum, TaskTypeEnum}, task_items, tasks};

#[derive(Debug, Clone, InputObject)]
pub struct CreateTaskItemInput {
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub source_location_id: Option<Uuid>,
    pub destination_location_id: Option<Uuid>,
    pub quantity_required: i32,
    pub quantity_completed: i32,
    pub status: Option<TaskItemStatusEnum>,
    pub lot_number: Option<String>,
    pub serial_numbers: Option<Vec<String>>,
    pub expiry_date: Option<NaiveDate>,
    pub notes: Option<String>,
    pub completed_at: Option<NaiveDateTime>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateTaskInput {
    pub task_number: String,
    pub warehouse_id: Uuid,
    pub user_id: Option<Uuid>,
    pub type_: TaskTypeEnum,
    pub status: Option<TaskStatusEnum>,
    pub priority: Option<i32>,
    pub source_entity_id: Option<Uuid>,
    pub source_entity_type: Option<String>,
    pub pick_batch_id: Option<Uuid>,
    pub estimated_duration: Option<i32>,
    pub actual_duration: Option<i32>,
    pub instructions: Option<String>,
    pub notes: Option<String>,
    pub start_time: Option<NaiveDateTime>,
    pub end_time: Option<NaiveDateTime>,
    pub items: Vec<CreateTaskItemInput>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "WmsTasksMutation")]
impl Mutation {
    async fn create_task(
        &self,
        ctx: &Context<'_>,
        payload: CreateTaskInput,
    ) -> async_graphql::Result<tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, tasks::Model>(
            "insert into wms.tasks (task_number, warehouse_id, user_id, type, status, priority, source_entity_id, source_entity_type, pick_batch_id, estimated_duration, actual_duration, instructions, notes, start_time, end_time) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *",
        )
        .bind(payload.task_number)
        .bind(payload.warehouse_id)
        .bind(payload.user_id)
        .bind(payload.type_)
        .bind(payload.status)
        .bind(payload.priority)
        .bind(payload.source_entity_id)
        .bind(payload.source_entity_type)
        .bind(payload.pick_batch_id)
        .bind(payload.estimated_duration)
        .bind(payload.actual_duration)
        .bind(payload.instructions)
        .bind(payload.notes)
        .bind(payload.start_time)
        .bind(payload.end_time)
        .fetch_one(&mut *trx)
        .await?;

        for item in payload.items {
            sqlx::query(
                "insert into wms.task_items (task_id, product_id, batch_id, source_location_id, destination_location_id, quantity_required, quantity_completed, status, lot_number, serial_numbers, expiry_date, notes, completed_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
            )
            .bind(result.id)
            .bind(item.product_id)
            .bind(item.batch_id)
            .bind(item.source_location_id)
            .bind(item.destination_location_id)
            .bind(item.quantity_required)
            .bind(item.quantity_completed)
            .bind(item.status)
            .bind(item.lot_number)
            .bind(item.serial_numbers)
            .bind(item.expiry_date)
            .bind(item.notes)
            .bind(item.completed_at)
            .execute(&mut *trx)
            .await?;
        }

        trx.commit().await?;
        Ok(result)
    }

    async fn update_task_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: TaskStatusEnum,
    ) -> async_graphql::Result<tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, tasks::Model>(
            "update wms.tasks set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_task(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.tasks where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() >= 1 {
            Ok("Task removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove task"))
        }
    }

    async fn add_task_item(
        &self,
        ctx: &Context<'_>,
        task_id: Uuid,
        payload: CreateTaskItemInput,
    ) -> async_graphql::Result<task_items::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, task_items::Model>(
            "insert into wms.task_items (task_id, product_id, batch_id, source_location_id, destination_location_id, quantity_required, quantity_completed, status, lot_number, serial_numbers, expiry_date, notes, completed_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *",
        )
        .bind(task_id)
        .bind(payload.product_id)
        .bind(payload.batch_id)
        .bind(payload.source_location_id)
        .bind(payload.destination_location_id)
        .bind(payload.quantity_required)
        .bind(payload.quantity_completed)
        .bind(payload.status)
        .bind(payload.lot_number)
        .bind(payload.serial_numbers)
        .bind(payload.expiry_date)
        .bind(payload.notes)
        .bind(payload.completed_at)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_task_item_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: TaskItemStatusEnum,
    ) -> async_graphql::Result<task_items::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, task_items::Model>(
            "update wms.task_items set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_task_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.task_items where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 1 {
            Ok("Task item removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove task item"))
        }
    }
}