use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::gps_pings;

#[derive(Debug, Clone, InputObject)]
pub struct CreateGpsPingInput {
    pub vehicle_id: Uuid,
    pub latitude: f32,
    pub longitude: f32,
    pub timestamp: DateTime<Utc>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsGpsPingsMutation")]
impl Mutation {
    async fn create_gps_ping(
        &self,
        ctx: &Context<'_>,
        payload: CreateGpsPingInput,
    ) -> async_graphql::Result<gps_pings::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, gps_pings::Model>(
            "insert into tms.gps_pings (vehicle_id, latitude, longitude, timestamp) values ($1, $2, $3, $4) returning *",
        )
        .bind(payload.vehicle_id)
        .bind(payload.latitude)
        .bind(payload.longitude)
        .bind(payload.timestamp)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_gps_ping(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.gps_pings where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove gps ping".into());
        }

        Ok("Gps ping removed".into())
    }
}
