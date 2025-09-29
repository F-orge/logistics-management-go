use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{enums::SalesOrderStatusEnum, sales_order_items, sales_orders};

#[derive(Debug, Clone, InputObject)]
pub struct CreateSalesOrderInput {
    pub order_number: String,
    pub client_id: Uuid,
    pub crm_opportunity_id: Option<Uuid>,
    pub status: Option<SalesOrderStatusEnum>,
    pub shipping_address: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateSalesOrderItemInput {
    pub product_id: Uuid,
    pub quantity_ordered: i32,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsSalesOrdersMutation")]
impl Mutation {
    async fn create_sales_order(
        &self,
        ctx: &Context<'_>,
        payload: CreateSalesOrderInput,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, sales_orders::Model>(
            "insert into ims.sales_orders (order_number, client_id, crm_opportunity_id, status, shipping_address) values ($1, $2, $3, $4, $5) returning *",
        )
        .bind(payload.order_number)
        .bind(payload.client_id)
        .bind(payload.crm_opportunity_id)
        .bind(payload.status)
        .bind(payload.shipping_address)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_sales_order_order_number(
        &self,
        ctx: &Context<'_>,
        order_number: String,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, sales_orders::Model>(
            "update ims.sales_orders set order_number = $1 where id = $2 returning *",
        )
        .bind(order_number)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_sales_order_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, sales_orders::Model>(
            "update ims.sales_orders set client_id = $1 where id = $2 returning *",
        )
        .bind(client_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_sales_order_opportunity_id(
        &self,
        ctx: &Context<'_>,
        opportunity_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, sales_orders::Model>(
            "update ims.sales_orders set crm_opportunity_id = $1 where id = $2 returning *",
        )
        .bind(opportunity_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_sales_order_status(
        &self,
        ctx: &Context<'_>,
        status: SalesOrderStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, sales_orders::Model>(
            "update ims.sales_orders set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_sales_order_shipping_address(
        &self,
        ctx: &Context<'_>,
        shipping_address: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, sales_orders::Model>(
            "update ims.sales_orders set shipping_address = $1 where id = $2 returning *",
        )
        .bind(shipping_address)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn remove_sales_order(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query("delete from ims.sales_orders where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;
        trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove sales order"));
        }

        Ok("Sales order removed successfully".into())
    }

    // sub item
    async fn add_sales_order_item(
        &self,
        ctx: &Context<'_>,
        sales_order_id: Uuid,
        payload: CreateSalesOrderItemInput,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        _ = sqlx::query_as::<_, sales_order_items::Model>(
            "insert into ims.sales_order_items (sales_order_id, product_id, quantity_ordered) values ($1, $2, $3) returning *",
        )
        .bind(sales_order_id)
        .bind(payload.product_id)
        .bind(payload.quantity_ordered)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;

        Ok(
            sqlx::query_as::<_, sales_orders::Model>(
                "select * from ims.sales_orders where id = $1",
            )
            .bind(sales_order_id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn update_sales_order_item_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let item = sqlx::query_as::<_, sales_order_items::Model>(
            "update ims.sales_order_items set product_id = $1 where id = $2 returning *",
        )
        .bind(product_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;

        Ok(
            sqlx::query_as::<_, sales_orders::Model>(
                "select * from ims.sales_orders where id = $1",
            )
            .bind(item.sales_order_id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn update_sales_order_item_quantity_ordered(
        &self,
        ctx: &Context<'_>,
        quantity_ordered: i32,
        id: Uuid,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let item = sqlx::query_as::<_, sales_order_items::Model>(
            "update ims.sales_order_items set quantity_ordered = $1 where id = $2 returning *",
        )
        .bind(quantity_ordered)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;

        Ok(
            sqlx::query_as::<_, sales_orders::Model>(
                "select * from ims.sales_orders where id = $1",
            )
            .bind(item.sales_order_id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn remove_sales_order_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query("delete from ims.sales_order_items where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;
        trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to remove sales order item",
            ));
        }

        Ok("Sales order item removed successfully".into())
    }
}
