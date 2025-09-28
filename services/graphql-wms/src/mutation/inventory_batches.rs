use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use uuid::Uuid;

use crate::models::inventory_batches;

#[derive(Debug, Clone, InputObject)]
pub struct CreateInventoryBatchInput {
    pub product_id: Uuid,
    pub batch_number: String,
    pub expiration_date: Option<NaiveDate>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsInventoryBatchesMutation")]
impl Mutation {
    async fn create_inventory_batch(
        &self,
        ctx: &Context<'_>,
        payload: CreateInventoryBatchInput,
    ) -> async_graphql::Result<inventory_batches::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_batches::Model>(
            "insert into ims.inventory_batches (product_id, batch_number, expiration_date) values ($1, $2, $3) returning *",
        )
        .bind(payload.product_id)
        .bind(payload.batch_number)
        .bind(payload.expiration_date)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_inventory_batch_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inventory_batches::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_batches::Model>(
            "update ims.inventory_batches set product_id = $1 where id = $2 returning *",
        )
        .bind(product_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_inventory_batch_number(
        &self,
        ctx: &Context<'_>,
        batch_number: String,
        id: Uuid,
    ) -> async_graphql::Result<inventory_batches::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_batches::Model>(
            "update ims.inventory_batches set batch_number = $1 where id = $2 returning *",
        )
        .bind(batch_number)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_inventory_batch_expiration_date(
        &self,
        ctx: &Context<'_>,
        expiration_date: NaiveDate,
        id: Uuid,
    ) -> async_graphql::Result<inventory_batches::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inventory_batches::Model>(
            "update ims.inventory_batches set expiration_date = $1 where id = $2 returning *",
        )
        .bind(expiration_date)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn remove_inventory_batch(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<inventory_batches::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        // Fetch the batch before deleting to return it
        let batch = sqlx::query_as::<_, inventory_batches::Model>(
            "select * from ims.inventory_batches where id = $1",
        )
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let result = sqlx::query("delete from ims.inventory_batches where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to remove inventory batch",
            ));
        }

        Ok(batch)
    }
}
