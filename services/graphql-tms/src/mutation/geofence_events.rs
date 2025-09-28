use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::{geofence_events, sea_orm_active_enums::GeofenceEventTypeEnum};

#[derive(Debug, Clone, InputObject)]
pub struct CreateGeofenceEventInput {
    pub vehicle_id: Uuid,
    pub geofence_id: Uuid,
    pub event_type: GeofenceEventTypeEnum,
    pub timestamp: DateTime<Utc>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsGeofenceEventsMutation")]
impl Mutation {
    async fn create_geofence_event(
        &self,
        ctx: &Context<'_>,
        payload: CreateGeofenceEventInput,
    ) -> async_graphql::Result<geofence_events::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, geofence_events::Model>(
            "insert into tms.geofence_events (vehicle_id, geofence_id, event_type, timestamp) values ($1, $2, $3, $4) returning *",
        )
        .bind(payload.vehicle_id)
        .bind(payload.geofence_id)
        .bind(payload.event_type)
        .bind(payload.timestamp)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_geofence_event(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.geofence_events where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove geofence event".into());
        }

        Ok("Geofence event removed".into())
    }
}
