use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct CreateDeliveryRouteInput {
    pub driver_id: Uuid,
    pub route_date: chrono::NaiveDate,
    pub status: Option<crate::models::enums::DeliveryRouteStatusEnum>,
    pub optimized_route_data: Option<String>,
    pub total_distance_km: Option<f32>,
    pub estimated_duration_minutes: Option<i32>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "DmsDeliveryRoutesMutations")]
impl Mutation {
    async fn create_delivery_route(
        &self,
        ctx: &Context<'_>,
        payload: CreateDeliveryRouteInput,
    ) -> async_graphql::Result<crate::models::delivery_routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_routes::Model>(
            "insert into dms.delivery_routes (driver_id, route_date, status, optimized_route_data,total_distance_km,estimated_duration_minutes) values ($1, $2, $3, $4, $5, $6) returning *"
        )
        .bind(payload.driver_id)
        .bind(payload.route_date)
        .bind(payload.status)
        .bind(payload.optimized_route_data)
        .bind(payload.total_distance_km)
        .bind(payload.estimated_duration_minutes)
        .fetch_one(db)
        .await?)
    }

    async fn update_delivery_route_driver_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        driver_id: Uuid,
    ) -> async_graphql::Result<crate::models::delivery_routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_routes::Model>(
            "update dms.delivery_routes set driver_id = $1 where id = $2 returning *",
        )
        .bind(driver_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_delivery_route_route_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        route_date: chrono::NaiveDate,
    ) -> async_graphql::Result<crate::models::delivery_routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_routes::Model>(
            "update dms.delivery_routes set route_date = $1 where id = $2 returning *",
        )
        .bind(route_date)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_delivery_route_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: Option<crate::models::enums::DeliveryRouteStatusEnum>,
    ) -> async_graphql::Result<crate::models::delivery_routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_routes::Model>(
            "update dms.delivery_routes set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_delivery_route_optimized_route_data(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        optimized_route_data: Option<String>,
    ) -> async_graphql::Result<crate::models::delivery_routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_routes::Model>(
            "update dms.delivery_routes set optimized_route_data = $1 where id = $2 returning *",
        )
        .bind(optimized_route_data)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_delivery_route_total_distance_km(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        total_distance_km: Option<f32>,
    ) -> async_graphql::Result<crate::models::delivery_routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_routes::Model>(
            "update dms.delivery_routes set total_distance_km = $1 where id = $2 returning *",
        )
        .bind(total_distance_km)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_delivery_route_estimated_duration_minutes(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        estimated_duration_minutes: Option<i32>,
    ) -> async_graphql::Result<crate::models::delivery_routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_routes::Model>(
            "update dms.delivery_routes set estimated_duration_minutes = $1 where id = $2 returning *",
        )
        .bind(estimated_duration_minutes)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_delivery_route_actual_duration_minutes(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        actual_duration_minutes: Option<i32>,
    ) -> async_graphql::Result<crate::models::delivery_routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_routes::Model>(
            "update dms.delivery_routes set actual_duration_minutes = $1 where id = $2 returning *",
        )
        .bind(actual_duration_minutes)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_delivery_route_started_at(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        started_at: Option<chrono::DateTime<chrono::Utc>>,
    ) -> async_graphql::Result<crate::models::delivery_routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_routes::Model>(
            "update dms.delivery_routes set started_at = $1 where id = $2 returning *",
        )
        .bind(started_at)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_delivery_route_completed_at(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        completed_at: Option<chrono::DateTime<chrono::Utc>>,
    ) -> async_graphql::Result<crate::models::delivery_routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::delivery_routes::Model>(
            "update dms.delivery_routes set completed_at = $1 where id = $2 returning *",
        )
        .bind(completed_at)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_delivery_route(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from dms.delivery_routes where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete delivery route"));
        }

        Ok("Delivery route removed successfully".into())
    }
}
