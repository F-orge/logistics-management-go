use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct CreateDmsProofOfDeliveryInput {
    pub delivery_task_id: Uuid,
    pub r#type: crate::models::enums::ProofOfDeliveryTypeEnum,
    pub file_path: Option<String>,
    pub signature_data: Option<String>,
    pub recipient_name: Option<String>,
    pub verification_code: Option<String>,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
    pub timestamp: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "DmsProofOfDeliveriesMutations")]
impl Mutation {
    async fn create_proof_of_delivery(
        &self,
        ctx: &Context<'_>,
        payload: CreateDmsProofOfDeliveryInput,
    ) -> async_graphql::Result<crate::models::proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::proof_of_deliveries::Model>(
            "insert into dms.proof_of_deliveries (delivery_task_id, type, file_path, signature_data, recipient_name, verification_code, latitude, longitude, timestamp) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *"
        )
        .bind(payload.delivery_task_id)
        .bind(payload.r#type)
        .bind(payload.file_path)
        .bind(payload.signature_data)
        .bind(payload.recipient_name)
        .bind(payload.verification_code)
        .bind(payload.latitude)
        .bind(payload.longitude)
        .bind(payload.timestamp)
        .fetch_one(db)
        .await?)
    }

    async fn update_proof_of_delivery_delivery_task_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        delivery_task_id: Uuid,
    ) -> async_graphql::Result<crate::models::proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::proof_of_deliveries::Model>(
            "update dms.proof_of_deliveries set delivery_task_id = $1 where id = $2 returning *",
        )
        .bind(delivery_task_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_proof_of_delivery_type(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        r#type: crate::models::enums::ProofOfDeliveryTypeEnum,
    ) -> async_graphql::Result<crate::models::proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as::<_, crate::models::proof_of_deliveries::Model>(
                "update dms.proof_of_deliveries set type = $1 where id = $2 returning *",
            )
            .bind(r#type)
            .bind(id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn update_proof_of_delivery_file_path(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        file_path: Option<String>,
    ) -> async_graphql::Result<crate::models::proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as::<_, crate::models::proof_of_deliveries::Model>(
                "update dms.proof_of_deliveries set file_path = $1 where id = $2 returning *",
            )
            .bind(file_path)
            .bind(id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn update_proof_of_delivery_signature_data(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        signature_data: Option<String>,
    ) -> async_graphql::Result<crate::models::proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as::<_, crate::models::proof_of_deliveries::Model>(
                "update dms.proof_of_deliveries set signature_data = $1 where id = $2 returning *",
            )
            .bind(signature_data)
            .bind(id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn update_proof_of_delivery_recipient_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        recipient_name: Option<String>,
    ) -> async_graphql::Result<crate::models::proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as::<_, crate::models::proof_of_deliveries::Model>(
                "update dms.proof_of_deliveries set recipient_name = $1 where id = $2 returning *",
            )
            .bind(recipient_name)
            .bind(id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn update_proof_of_delivery_verification_code(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        verification_code: Option<String>,
    ) -> async_graphql::Result<crate::models::proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::proof_of_deliveries::Model>(
            "update dms.proof_of_deliveries set verification_code = $1 where id = $2 returning *",
        )
        .bind(verification_code)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_proof_of_delivery_latitude(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        latitude: Option<f32>,
    ) -> async_graphql::Result<crate::models::proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as::<_, crate::models::proof_of_deliveries::Model>(
                "update dms.proof_of_deliveries set latitude = $1 where id = $2 returning *",
            )
            .bind(latitude)
            .bind(id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn update_proof_of_delivery_longitude(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        longitude: Option<f32>,
    ) -> async_graphql::Result<crate::models::proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as::<_, crate::models::proof_of_deliveries::Model>(
                "update dms.proof_of_deliveries set longitude = $1 where id = $2 returning *",
            )
            .bind(longitude)
            .bind(id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn update_proof_of_delivery_timestamp(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        timestamp: Option<chrono::DateTime<chrono::Utc>>,
    ) -> async_graphql::Result<crate::models::proof_of_deliveries::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as::<_, crate::models::proof_of_deliveries::Model>(
                "update dms.proof_of_deliveries set timestamp = $1 where id = $2 returning *",
            )
            .bind(timestamp)
            .bind(id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn remove_proof_of_delivery(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from dms.proof_of_deliveries where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete proof of delivery",
            ));
        }
        Ok("Proof of delivery removed successfully".into())
    }
}
