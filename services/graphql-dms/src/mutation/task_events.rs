use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct CreateTaskEventInput {
    pub delivery_task_id: Uuid,
    pub status: crate::models::enums::TaskEventStatusEnum,
    pub reason: Option<String>,
    pub notes: Option<String>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub timestamp: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "DmsTaskEventsMutations")]
impl Mutation {
    async fn create_task_event(
        &self,
        ctx: &Context<'_>,
        payload: CreateTaskEventInput,
    ) -> async_graphql::Result<crate::models::task_events::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::task_events::Model>(
            "insert into dms.task_events (delivery_task_id, status, reason, notes, latitude, longitude, timestamp) values ($1, $2, $3, $4, $5, $6, $7) returning *"
        )
        .bind(payload.delivery_task_id)
        .bind(payload.status)
        .bind(payload.reason)
        .bind(payload.notes)
        .bind(payload.latitude)
        .bind(payload.longitude)
        .bind(payload.timestamp)
        .fetch_one(db)
        .await?)
    }

    async fn update_task_event_delivery_task_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        delivery_task_id: Uuid,
    ) -> async_graphql::Result<crate::models::task_events::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::task_events::Model>(
            "update dms.task_events set delivery_task_id = $1 where id = $2 returning *",
        )
        .bind(delivery_task_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_task_event_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: crate::models::enums::TaskEventStatusEnum,
    ) -> async_graphql::Result<crate::models::task_events::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::task_events::Model>(
            "update dms.task_events set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_task_event_reason(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        reason: Option<String>,
    ) -> async_graphql::Result<crate::models::task_events::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::task_events::Model>(
            "update dms.task_events set reason = $1 where id = $2 returning *",
        )
        .bind(reason)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_task_event_notes(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        notes: Option<String>,
    ) -> async_graphql::Result<crate::models::task_events::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::task_events::Model>(
            "update dms.task_events set notes = $1 where id = $2 returning *",
        )
        .bind(notes)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_task_event_latitude(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        latitude: Option<f32>,
    ) -> async_graphql::Result<crate::models::task_events::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::task_events::Model>(
            "update dms.task_events set latitude = $1 where id = $2 returning *",
        )
        .bind(latitude)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_task_event_longitude(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        longitude: Option<f32>,
    ) -> async_graphql::Result<crate::models::task_events::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::task_events::Model>(
            "update dms.task_events set longitude = $1 where id = $2 returning *",
        )
        .bind(longitude)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_task_event_timestamp(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        timestamp: Option<chrono::DateTime<chrono::Utc>>,
    ) -> async_graphql::Result<crate::models::task_events::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::task_events::Model>(
            "update dms.task_events set timestamp = $1 where id = $2 returning *",
        )
        .bind(timestamp)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_task_event(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from dms.task_events where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete task event"));
        }
        Ok("Task event removed successfully".into())
    }
}
