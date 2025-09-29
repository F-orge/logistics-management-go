use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::{sea_orm_active_enums::VehicleServiceTypeEnum, vehicle_maintenance};

#[derive(Debug, Clone, InputObject)]
pub struct CreateVehicleMaintenanceInput {
    pub vehicle_id: Uuid,
    pub service_date: NaiveDate,
    pub service_type: Option<VehicleServiceTypeEnum>,
    pub cost: Option<Decimal>,
    pub notes: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsVehicleMaintenanceMutation")]
impl Mutation {
    async fn create_vehicle_maintenance(
        &self,
        ctx: &Context<'_>,
        payload: CreateVehicleMaintenanceInput,
    ) -> async_graphql::Result<vehicle_maintenance::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, vehicle_maintenance::Model>(
            "insert into tms.vehicle_maintenance (vehicle_id, service_date, service_type, cost, notes) values ($1, $2, $3, $4, $5) returning *",
        )
        .bind(payload.vehicle_id)
        .bind(payload.service_date)
        .bind(payload.service_type)
        .bind(payload.cost)
        .bind(payload.notes)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_vehicle_maintenance(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateVehicleMaintenanceInput,
    ) -> async_graphql::Result<vehicle_maintenance::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, vehicle_maintenance::Model>(
            "update tms.vehicle_maintenance set vehicle_id = $1, service_date = $2, service_type = $3, cost = $4, notes = $5 where id = $6 returning *",
        )
        .bind(payload.vehicle_id)
        .bind(payload.service_date)
        .bind(payload.service_type)
        .bind(payload.cost)
        .bind(payload.notes)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_vehicle_maintenance(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.vehicle_maintenance where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove vehicle maintenance record".into());
        }

        Ok("Vehicle maintenance record removed".into())
    }
}
