use async_graphql::{Context, InputObject, Object};
use sqlx::Row;
use uuid::Uuid;

use crate::models::{enums::OutboundShipmentStatusEnum, outbound_shipments};

#[derive(Debug, Clone, InputObject)]
pub struct CreateOutboundShipmentInput {
    pub sales_order_id: Uuid,
    pub warehouse_id: Uuid,
    pub status: Option<OutboundShipmentStatusEnum>,
    pub tracking_number: Option<String>,
    pub carrier: Option<String>,
    pub items: Vec<CreateOutboundShipmentItemInput>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateOutboundShipmentItemInput {
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub quantity_shipped: i32,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsOutboundShipmentsMutation")]
impl Mutation {
    async fn create_outbound_shipment(
        &self,
        ctx: &Context<'_>,
        payload: CreateOutboundShipmentInput,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, outbound_shipments::Model>(
            "insert into ims.outbound_shipments (sales_order_id, warehouse_id, status, tracking_number, carrier) values ($1, $2, $3, $4, $5) returning *",
        )
        .bind(payload.sales_order_id)
        .bind(payload.warehouse_id)
        .bind(payload.status)
        .bind(payload.tracking_number)
        .bind(payload.carrier)
        .fetch_one(&mut *trx)
        .await?;

        for item in payload.items {
            _ = sqlx::query("insert into ims.outbound_shipment_items (outbound_shipment_id, product_id, batch_id, quantity_shipped) values ($1, $2, $3, $4) returning *")
                .bind(result.id.clone())
                .bind(item.product_id)
                .bind(item.batch_id)
                .bind(item.quantity_shipped)
                .execute(&mut *trx).await?;
        }

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_outbound_shipment_sales_order_id(
        &self,
        ctx: &Context<'_>,
        sales_order_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, outbound_shipments::Model>(
            "update ims.outbound_shipments set sales_order_id = $1 where id = $2 returning *",
        )
        .bind(sales_order_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_outbound_shipment_warehouse_id(
        &self,
        ctx: &Context<'_>,
        warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, outbound_shipments::Model>(
            "update ims.outbound_shipments set warehouse_id = $1 where id = $2 returning *",
        )
        .bind(warehouse_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_outbound_shipment_status(
        &self,
        ctx: &Context<'_>,
        status: OutboundShipmentStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, outbound_shipments::Model>(
            "update ims.outbound_shipments set status = $1 where id = $2 returning *",
        )
        .bind(status)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_outbound_shipment_tracking_number(
        &self,
        ctx: &Context<'_>,
        tracking_number: String,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, outbound_shipments::Model>(
            "update ims.outbound_shipments set tracking_number = $1 where id = $2 returning *",
        )
        .bind(tracking_number)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_outbound_shipment_carrier(
        &self,
        ctx: &Context<'_>,
        carrier: String,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, outbound_shipments::Model>(
            "update ims.outbound_shipments set carrier = $1 where id = $2 returning *",
        )
        .bind(carrier)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn remove_outbound_shipment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        // Fetch the shipment before deleting for return value
        let shipment = sqlx::query_as::<_, outbound_shipments::Model>(
            "select * from ims.outbound_shipments where id = $1",
        )
        .bind(id)
        .fetch_optional(&mut *trx)
        .await?;

        if shipment.is_none() {
            return Err(async_graphql::Error::new(
                "Unable to remove outbound shipment: not found",
            ));
        }
        let shipment = shipment.unwrap();

        let result = sqlx::query("delete from ims.outbound_shipments where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        _ = trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to remove outbound shipment",
            ));
        }

        Ok(shipment)
    }

    // sub item
    async fn add_outbound_shipment_item(
        &self,
        ctx: &Context<'_>,
        payload: CreateOutboundShipmentItemInput,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let _item = sqlx::query(
            "insert into ims.outbound_shipment_items (outbound_shipment_id, product_id, batch_id, quantity_shipped) values ($1, $2, $3, $4) returning *",
        )
        .bind(id)
        .bind(payload.product_id)
        .bind(payload.batch_id)
        .bind(payload.quantity_shipped)
        .execute(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(sqlx::query_as::<_, outbound_shipments::Model>(
            "select * from ims.outbound_shipments where id = $1",
        )
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_outbound_shipment_item_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        // Update item
        let item = sqlx::query(
            "update ims.outbound_shipment_items set product_id = $1 where id = $2 returning outbound_shipment_id",
        )
        .bind(product_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let outbound_shipment_id: Uuid = item.get("outbound_shipment_id");

        _ = trx.commit().await?;

        Ok(sqlx::query_as::<_, outbound_shipments::Model>(
            "select * from ims.outbound_shipments where id = $1",
        )
        .bind(outbound_shipment_id)
        .fetch_one(db)
        .await?)
    }

    async fn update_outbound_shipment_item_batch_id(
        &self,
        ctx: &Context<'_>,
        batch_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query(
            "update ims.outbound_shipment_items set batch_id = $1 where id = $2 returning outbound_shipment_id",
        )
        .bind(batch_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let outbound_shipment_id: Uuid = item.get("outbound_shipment_id");

        _ = trx.commit().await?;

        Ok(sqlx::query_as::<_, outbound_shipments::Model>(
            "select * from ims.outbound_shipments where id = $1",
        )
        .bind(outbound_shipment_id)
        .fetch_one(db)
        .await?)
    }

    async fn update_outbound_shipment_item_quantity_shipped(
        &self,
        ctx: &Context<'_>,
        quantity_shipped: i32,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let item = sqlx::query(
            "update ims.outbound_shipment_items set quantity_shipped = $1 where id = $2 returning outbound_shipment_id",
        )
        .bind(quantity_shipped)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        let outbound_shipment_id: Uuid = item.get("outbound_shipment_id");

        _ = trx.commit().await?;

        Ok(sqlx::query_as::<_, outbound_shipments::Model>(
            "select * from ims.outbound_shipments where id = $1",
        )
        .bind(outbound_shipment_id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_outbound_shipment_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<outbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        // Get outbound_shipment_id before deleting
        let item = sqlx::query(
            "select outbound_shipment_id from ims.outbound_shipment_items where id = $1",
        )
        .bind(id)
        .fetch_optional(&mut *trx)
        .await?;

        if item.is_none() {
            return Err(async_graphql::Error::new(
                "Unable to remove outbound shipment item: not found",
            ));
        }
        let outbound_shipment_id: Uuid = item.unwrap().get("outbound_shipment_id");

        let result = sqlx::query("delete from ims.outbound_shipment_items where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        _ = trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to remove outbound shipment item",
            ));
        }

        Ok(sqlx::query_as::<_, outbound_shipments::Model>(
            "select * from ims.outbound_shipments where id = $1",
        )
        .bind(outbound_shipment_id)
        .fetch_one(db)
        .await?)
    }
}
