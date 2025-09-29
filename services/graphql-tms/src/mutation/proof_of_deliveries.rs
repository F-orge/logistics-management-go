use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::{proof_of_deliveries, sea_orm_active_enums::ProofTypeEnum};

#[derive(Debug, Clone, InputObject)]
pub struct CreateProofOfDeliveryInput {
    pub trip_stop_id: Uuid,
    pub r#type: Option<ProofTypeEnum>,
    pub file_path: Option<String>,
    pub timestamp: DateTime<Utc>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsProofOfDeliveriesMutation")]
impl Mutation {
    async fn create_proof_of_delivery(
        &self,
        ctx: &Context<'_>,
        payload: CreateProofOfDeliveryInput,
    ) -> async_graphql::Result<proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, proof_of_deliveries::Model>(
            "insert into tms.proof_of_deliveries (trip_stop_id, type, file_path, timestamp, latitude, longitude) values ($1, $2, $3, $4, $5, $6) returning *",
        )
        .bind(payload.trip_stop_id)
        .bind(payload.r#type)
        .bind(payload.file_path)
        .bind(payload.timestamp)
        .bind(payload.latitude)
        .bind(payload.longitude)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_proof_of_delivery(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateProofOfDeliveryInput,
    ) -> async_graphql::Result<proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, proof_of_deliveries::Model>(
            "update tms.proof_of_deliveries set trip_stop_id = $1, type = $2, file_path = $3, timestamp = $4, latitude = $5, longitude = $6 where id = $7 returning *",
        )
        .bind(payload.trip_stop_id)
        .bind(payload.r#type)
        .bind(payload.file_path)
        .bind(payload.timestamp)
        .bind(payload.latitude)
        .bind(payload.longitude)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_proof_of_delivery(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.proof_of_deliveries where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove proof of delivery".into());
        }

        Ok("Proof of delivery removed".into())
    }
}
