use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::geofences;

#[derive(Debug, Clone, InputObject)]
pub struct CreateGeofenceInput {
    pub name: String,
    pub coordinates: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsGeofencesMutation")]
impl Mutation {
    async fn create_geofence(
        &self,
        ctx: &Context<'_>,
        payload: CreateGeofenceInput,
    ) -> async_graphql::Result<geofences::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, geofences::Model>(
            "insert into tms.geofences (name, coordinates) values ($1, $2) returning *",
        )
        .bind(payload.name)
        .bind(payload.coordinates)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_geofence(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateGeofenceInput,
    ) -> async_graphql::Result<geofences::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, geofences::Model>(
            "update tms.geofences set name = $1, coordinates = $2 where id = $3 returning *",
        )
        .bind(payload.name)
        .bind(payload.coordinates)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_geofence(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.geofences where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove geofence".into());
        }

        Ok("Geofence removed".into())
    }
}
