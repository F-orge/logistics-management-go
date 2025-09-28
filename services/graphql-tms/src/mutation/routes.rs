use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::routes;

#[derive(Debug, Clone, InputObject)]
pub struct CreateRouteInput {
    pub trip_id: Uuid,
    pub optimized_route_data: Option<String>,
    pub total_distance: Option<f32>,
    pub total_duration: Option<f32>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsRoutesMutation")]
impl Mutation {
    async fn create_route(
        &self,
        ctx: &Context<'_>,
        payload: CreateRouteInput,
    ) -> async_graphql::Result<routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, routes::Model>(
            "insert into tms.routes (trip_id, optimized_route_data, total_distance, total_duration) values ($1, $2, $3, $4) returning *",
        )
        .bind(payload.trip_id)
        .bind(payload.optimized_route_data)
        .bind(payload.total_distance)
        .bind(payload.total_duration)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_route(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateRouteInput,
    ) -> async_graphql::Result<routes::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, routes::Model>(
            "update tms.routes set trip_id = $1, optimized_route_data = $2, total_distance = $3, total_duration = $4 where id = $5 returning *",
        )
        .bind(payload.trip_id)
        .bind(payload.optimized_route_data)
        .bind(payload.total_distance)
        .bind(payload.total_duration)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_route(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.routes where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove route".into());
        }

        Ok("Route removed".into())
    }
}
