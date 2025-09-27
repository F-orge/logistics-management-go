use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct CreateDeliveryTaskInput {
    pub package_id: Uuid,
    pub delivery_route_id: Uuid,
    pub route_sequence: i32,
    pub delivery_address: String,
    pub recipient_name: Option<String>,
    pub recipient_phone: Option<String>,
    pub delivery_instructions: Option<String>,
    pub estimated_arrival_time: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "DmsDeliveryTasksMutations")]
impl Mutation {
    async fn create_delivery_task(
        &self,
        ctx: &Context<'_>,
        payload: CreateDeliveryTaskInput,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "insert into dms.delivery_tasks (package_id, delivery_route_id, route_sequence, delivery_address, recipient_name, recipient_phone, delivery_instructions, estimated_arrival_time) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *"
        )
        .bind(payload.package_id)
        .bind(payload.delivery_route_id)
        .bind(payload.route_sequence)
        .bind(payload.delivery_address)
        .bind(payload.recipient_name)
        .bind(payload.recipient_phone)
        .bind(payload.delivery_instructions)
        .bind(payload.estimated_arrival_time)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_package_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        package_id: Uuid,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set package_id = $1 where id = $2 returning *",
        )
        .bind(package_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_delivery_route_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        delivery_route_id: Uuid,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set delivery_route_id = $1 where id = $2 returning *",
        )
        .bind(delivery_route_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_route_sequence(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        route_sequence: i32,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set route_sequence = $1 where id = $2 returning *",
        )
        .bind(route_sequence)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_delivery_address(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        delivery_address: String,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set delivery_address = $1 where id = $2 returning *",
        )
        .bind(delivery_address)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_recipient_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        recipient_name: Option<String>,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set recipient_name = $1 where id = $2 returning *",
        )
        .bind(recipient_name)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_recipient_phone(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        recipient_phone: Option<String>,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set recipient_phone = $1 where id = $2 returning *",
        )
        .bind(recipient_phone)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_delivery_instructions(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        delivery_instructions: Option<String>,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set delivery_instructions = $1 where id = $2 returning *",
        )
        .bind(delivery_instructions)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_estimated_arrival_time(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        estimated_arrival_time: Option<chrono::DateTime<chrono::Utc>>,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set estimated_arrival_time = $1 where id = $2 returning *",
        )
        .bind(estimated_arrival_time)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_actual_arrival_time(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        actual_arrival_time: Option<chrono::DateTime<chrono::Utc>>,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set actual_arrival_time = $1 where id = $2 returning *",
        )
        .bind(actual_arrival_time)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_delivery_time(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        delivery_time: Option<chrono::DateTime<chrono::Utc>>,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set delivery_time = $1 where id = $2 returning *",
        )
        .bind(delivery_time)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: Option<crate::models::enums::DeliveryTaskStatusEnum>,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_failure_reason(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        failure_reason: Option<crate::models::enums::DeliveryFailureReasonEnum>,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set failure_reason = $1 where id = $2 returning *",
        )
        .bind(failure_reason)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_task_attempt_count(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        attempt_count: Option<i32>,
    ) -> async_graphql::Result<crate::models::delivery_tasks::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_tasks::Model>(
            "update dms.delivery_tasks set attempt_count = $1 where id = $2 returning *",
        )
        .bind(attempt_count)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_delivery_task(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from dms.delivery_tasks where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete delivery task"));
        }
        Ok("Delivery task removed successfully".into())
    }
}
