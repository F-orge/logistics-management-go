use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{sea_orm_active_enums::VehicleStatusEnum, vehicles};

#[derive(Debug, Clone, InputObject)]
pub struct CreateVehicleInput {
    pub registration_number: String,
    pub model: Option<String>,
    pub capacity_volume: Option<f32>,
    pub capacity_weight: Option<f32>,
    pub status: Option<VehicleStatusEnum>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsVehiclesMutation")]
impl Mutation {
    async fn create_vehicle(
        &self,
        ctx: &Context<'_>,
        payload: CreateVehicleInput,
    ) -> async_graphql::Result<vehicles::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, vehicles::Model>(
            "insert into tms.vehicles (registration_number, model, capacity_volume, capacity_weight, status) values ($1, $2, $3, $4, $5) returning *",
        )
        .bind(payload.registration_number)
        .bind(payload.model)
        .bind(payload.capacity_volume)
        .bind(payload.capacity_weight)
        .bind(payload.status)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_vehicle(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateVehicleInput,
    ) -> async_graphql::Result<vehicles::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, vehicles::Model>(
            "update tms.vehicles set registration_number = $1, model = $2, capacity_volume = $3, capacity_weight = $4, status = $5 where id = $6 returning *",
        )
        .bind(payload.registration_number)
        .bind(payload.model)
        .bind(payload.capacity_volume)
        .bind(payload.capacity_weight)
        .bind(payload.status)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_vehicle(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.vehicles where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove vehicle".into());
        }

        Ok("Vehicle removed".into())
    }
}
