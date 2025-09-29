use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDateTime;
use uuid::Uuid;

use crate::models::{enums::{PickBatchStatusEnum, PickStrategyEnum}, pick_batches, pick_batch_items};

#[derive(Debug, Clone, InputObject)]
pub struct CreatePickBatchItemInput {
    pub sales_order_id: Uuid,
    pub order_priority: Option<i32>,
    pub estimated_pick_time: Option<i32>,
    pub actual_pick_time: Option<i32>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreatePickBatchInput {
    pub batch_number: String,
    pub warehouse_id: Uuid,
    pub status: Option<PickBatchStatusEnum>,
    pub strategy: PickStrategyEnum,
    pub priority: Option<i32>,
    pub assigned_user_id: Option<Uuid>,
    pub wave_id: Option<String>,
    pub zone_restrictions: Option<Vec<String>>,
    pub estimated_duration: Option<i32>,
    pub actual_duration: Option<i32>,
    pub total_items: Option<i32>,
    pub completed_items: Option<i32>,
    pub started_at: Option<NaiveDateTime>,
    pub completed_at: Option<NaiveDateTime>,
    pub items: Vec<CreatePickBatchItemInput>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "WmsPickBatchesMutation")]
impl Mutation {
    async fn create_pick_batch(
        &self,
        ctx: &Context<'_>,
        payload: CreatePickBatchInput,
    ) -> async_graphql::Result<pick_batches::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, pick_batches::Model>(
            "insert into wms.pick_batches (batch_number, warehouse_id, status, strategy, priority, assigned_user_id, wave_id, zone_restrictions, estimated_duration, actual_duration, total_items, completed_items, started_at, completed_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *",
        )
        .bind(payload.batch_number)
        .bind(payload.warehouse_id)
        .bind(payload.status)
        .bind(payload.strategy)
        .bind(payload.priority)
        .bind(payload.assigned_user_id)
        .bind(payload.wave_id)
        .bind(payload.zone_restrictions)
        .bind(payload.estimated_duration)
        .bind(payload.actual_duration)
        .bind(payload.total_items)
        .bind(payload.completed_items)
        .bind(payload.started_at)
        .bind(payload.completed_at)
        .fetch_one(&mut *trx)
        .await?;

        for item in payload.items {
            sqlx::query(
                "insert into wms.pick_batch_items (pick_batch_id, sales_order_id, order_priority, estimated_pick_time, actual_pick_time) values ($1, $2, $3, $4, $5)",
            )
            .bind(result.id)
            .bind(item.sales_order_id)
            .bind(item.order_priority)
            .bind(item.estimated_pick_time)
            .bind(item.actual_pick_time)
            .execute(&mut *trx)
            .await?;
        }

        trx.commit().await?;
        Ok(result)
    }

    async fn update_pick_batch_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: PickBatchStatusEnum,
    ) -> async_graphql::Result<pick_batches::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, pick_batches::Model>(
            "update wms.pick_batches set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_pick_batch(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.pick_batches where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() >= 1 {
            Ok("Pick batch removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove pick batch"))
        }
    }

    async fn add_pick_batch_item(
        &self,
        ctx: &Context<'_>,
        pick_batch_id: Uuid,
        payload: CreatePickBatchItemInput,
    ) -> async_graphql::Result<pick_batch_items::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, pick_batch_items::Model>(
            "insert into wms.pick_batch_items (pick_batch_id, sales_order_id, order_priority, estimated_pick_time, actual_pick_time) values ($1, $2, $3, $4, $5) returning *",
        )
        .bind(pick_batch_id)
        .bind(payload.sales_order_id)
        .bind(payload.order_priority)
        .bind(payload.estimated_pick_time)
        .bind(payload.actual_pick_time)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_pick_batch_item_priority(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        order_priority: i32,
    ) -> async_graphql::Result<pick_batch_items::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, pick_batch_items::Model>(
            "update wms.pick_batch_items set order_priority = $1 where id = $2 returning *",
        )
        .bind(order_priority)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_pick_batch_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.pick_batch_items where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 1 {
            Ok("Pick batch item removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove pick batch item"))
        }
    }
}