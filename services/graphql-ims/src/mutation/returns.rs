use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{
    enums::{ReturnItemConditionEnum, ReturnStatusEnum},
    return_items, returns,
};

#[derive(Debug, Clone, InputObject)]
pub struct CreateReturnInput {
    pub return_number: String,
    pub sales_order_id: Option<Uuid>,
    pub client_id: Uuid,
    pub status: Option<ReturnStatusEnum>,
    pub reason: Option<String>,
    pub items: Vec<CreateReturnItemInput>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateReturnItemInput {
    pub product_id: Uuid,
    pub quantity_expected: i32,
    pub quantity_received: Option<i32>,
    pub quantity_variance: Option<i32>,
    pub condition: Option<ReturnItemConditionEnum>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsReturnsMutation")]
impl Mutation {
    async fn create_return(
        &self,
        ctx: &Context<'_>,
        payload: CreateReturnInput,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, returns::Model>(
            "insert into ims.returns (return_number, sales_order_id, client_id, status, reason) values ($1, $2, $3, $4, $5) returning *",
        )
        .bind(payload.return_number)
        .bind(payload.sales_order_id)
        .bind(payload.client_id)
        .bind(payload.status)
        .bind(payload.reason)
        .fetch_one(&mut *trx)
        .await?;

        for item in payload.items {
            _ = sqlx::query("insert into ims.return_items (return_id, product_id, quantity_expected, quantity_received, quantity_variance, condition) values ($1, $2, $3, $4, $5, $6)")
            .bind(result.id.clone())
            .bind(item.product_id)
            .bind(item.quantity_expected)
            .bind(item.quantity_received)
            .bind(item.quantity_variance)
            .bind(item.condition)
            .execute(&mut *trx).await?;
        }

        trx.commit().await?;

        Ok(result)
    }

    async fn update_return_number(
        &self,
        ctx: &Context<'_>,
        return_number: String,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, returns::Model>(
            "update ims.returns set return_number = $1 where id = $2 returning *",
        )
        .bind(return_number)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_return_sales_order_id(
        &self,
        ctx: &Context<'_>,
        sales_order_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, returns::Model>(
            "update ims.returns set sales_order_id = $1 where id = $2 returning *",
        )
        .bind(sales_order_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_return_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, returns::Model>(
            "update ims.returns set client_id = $1 where id = $2 returning *",
        )
        .bind(client_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_return_status(
        &self,
        ctx: &Context<'_>,
        status: ReturnStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, returns::Model>(
            "update ims.returns set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_return_reason(
        &self,
        ctx: &Context<'_>,
        reason: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, returns::Model>(
            "update ims.returns set reason = $1 where id = $2 returning *",
        )
        .bind(reason)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn remove_return(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query("delete from ims.returns where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove return"));
        }

        Ok("Return removed successfully".into())
    }

    // sub item
    async fn add_return_item(
        &self,
        ctx: &Context<'_>,
        return_id: Uuid,
        payload: CreateReturnItemInput,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        _ = sqlx::query_as::<_, return_items::Model>("insert into ims.return_items (return_id, product_id, quantity_expected, quantity_received, quantity_variance, condition) values ($1, $2, $3, $4, $5, $6) returning *")
            .bind(return_id)
            .bind(payload.product_id)
            .bind(payload.quantity_expected)
            .bind(payload.quantity_received)
            .bind(payload.quantity_variance)
            .bind(payload.condition)
            .fetch_one(&mut *trx).await?;

        trx.commit().await?;

        Ok(
            sqlx::query_as::<_, returns::Model>("select * from ims.returns where id = $1")
                .bind(return_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_return_item_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let item = sqlx::query_as::<_, return_items::Model>(
            "update ims.return_items set product_id = $1 where id = $2 returning *",
        )
        .bind(product_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;

        Ok(
            sqlx::query_as::<_, returns::Model>("select * from ims.returns where id = $1")
                .bind(item.return_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_return_item_quantity_expected(
        &self,
        ctx: &Context<'_>,
        quantity_expected: i32,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let item = sqlx::query_as::<_, return_items::Model>(
            "update ims.return_items set quantity_expected = $1 where id = $2 returning *",
        )
        .bind(quantity_expected)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;

        Ok(
            sqlx::query_as::<_, returns::Model>("select * from ims.returns where id = $1")
                .bind(item.return_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_return_item_quantity_received(
        &self,
        ctx: &Context<'_>,
        quantity_received: i32,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let item = sqlx::query_as::<_, return_items::Model>(
            "update ims.return_items set quantity_received = $1 where id = $2 returning *",
        )
        .bind(quantity_received)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;

        Ok(
            sqlx::query_as::<_, returns::Model>("select * from ims.returns where id = $1")
                .bind(item.return_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_return_item_quantity_variance(
        &self,
        ctx: &Context<'_>,
        quantity_variance: i32,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let item = sqlx::query_as::<_, return_items::Model>(
            "update ims.return_items set quantity_variance = $1 where id = $2 returning *",
        )
        .bind(quantity_variance)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;

        Ok(
            sqlx::query_as::<_, returns::Model>("select * from ims.returns where id = $1")
                .bind(item.return_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_return_item_condition(
        &self,
        ctx: &Context<'_>,
        condition: ReturnItemConditionEnum,
        id: Uuid,
    ) -> async_graphql::Result<returns::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let item = sqlx::query_as::<_, return_items::Model>(
            "update ims.return_items set condition = $1 where id = $2 returning *",
        )
        .bind(condition)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;

        Ok(
            sqlx::query_as::<_, returns::Model>("select * from ims.returns where id = $1")
                .bind(item.return_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn remove_return_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query("delete from ims.return_items where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove return item"));
        }

        Ok("Return item removed successfully".into())
    }
}
