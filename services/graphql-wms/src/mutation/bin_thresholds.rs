use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::bin_thresholds;

#[derive(Debug, Clone, InputObject)]
pub struct CreateBinThresholdInput {
    pub location_id: Uuid,
    pub product_id: Uuid,
    pub min_quantity: i32,
    pub max_quantity: i32,
    pub reorder_quantity: Option<i32>,
    pub alert_threshold: Option<i32>,
    pub is_active: Option<bool>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "WmsBinThresholdsMutation")]
impl Mutation {
    async fn create_bin_threshold(
        &self,
        ctx: &Context<'_>,
        payload: CreateBinThresholdInput,
    ) -> async_graphql::Result<bin_thresholds::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, bin_thresholds::Model>(
            "insert into wms.bin_thresholds (location_id, product_id, min_quantity, max_quantity, reorder_quantity, alert_threshold, is_active) values ($1, $2, $3, $4, $5, $6, $7) returning *",
        )
        .bind(payload.location_id)
        .bind(payload.product_id)
        .bind(payload.min_quantity)
        .bind(payload.max_quantity)
        .bind(payload.reorder_quantity)
        .bind(payload.alert_threshold)
        .bind(payload.is_active)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_bin_threshold_min_quantity(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        min_quantity: i32,
    ) -> async_graphql::Result<bin_thresholds::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, bin_thresholds::Model>(
            "update wms.bin_thresholds set min_quantity = $1 where id = $2 returning *",
        )
        .bind(min_quantity)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_bin_threshold(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.bin_thresholds where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 1 {
            Ok("Bin threshold removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove bin threshold"))
        }
    }
}
