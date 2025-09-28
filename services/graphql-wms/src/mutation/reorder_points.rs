use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::reorder_points;

#[derive(Debug, Clone, InputObject)]
pub struct CreateReorderPointInput {
    pub product_id: Uuid,
    pub warehouse_id: Uuid,
    pub threshold: i32,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsReorderPointsMutation")]
impl Mutation {
    async fn create_reorder_point(
        &self,
        ctx: &Context<'_>,
        payload: CreateReorderPointInput,
    ) -> async_graphql::Result<reorder_points::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, reorder_points::Model>(
            "insert into ims.reorder_points (product_id, warehouse_id, threshold) values ($1, $2, $3) returning *",
        )
        .bind(payload.product_id)
        .bind(payload.warehouse_id)
        .bind(payload.threshold)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_reorder_point_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<reorder_points::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, reorder_points::Model>(
            "update ims.reorder_points set product_id = $1 where id = $2 returning *",
        )
        .bind(product_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_reorder_point_warehouse_id(
        &self,
        ctx: &Context<'_>,
        warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<reorder_points::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, reorder_points::Model>(
            "update ims.reorder_points set warehouse_id = $1 where id = $2 returning *",
        )
        .bind(warehouse_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_reorder_point_threshold(
        &self,
        ctx: &Context<'_>,
        threshold: i32,
        id: Uuid,
    ) -> async_graphql::Result<reorder_points::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, reorder_points::Model>(
            "update ims.reorder_points set threshold = $1 where id = $2 returning *",
        )
        .bind(threshold)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn remove_reorder_point(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query("delete from ims.reorder_points where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;
        trx.commit().await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove reorder point"));
        }
        Ok("Reorder point removed successfully".into())
    }
}
