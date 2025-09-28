use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use uuid::Uuid;

use crate::models::{enums::InboundShipmentStatusEnum, inbound_shipment_items, inbound_shipments};

#[derive(Debug, Clone, InputObject)]
pub struct CreateInboundShipmentInput {
    pub client_id: Option<Uuid>,
    pub warehouse_id: Uuid,
    pub status: Option<InboundShipmentStatusEnum>,
    pub expected_arrival_date: Option<NaiveDate>,
    pub actual_arrival_date: Option<NaiveDate>,
    pub items: Vec<CreateInboundShipmentItemInput>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateInboundShipmentItemInput {
    pub product_id: Uuid,
    pub expected_quantity: i32,
    pub received_quantity: Option<i32>,
    pub discrepancy_quantity: Option<i32>,
    pub discrepancy_notes: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsInboundShipmentsMutation")]
impl Mutation {
    async fn create_inbound_shipment(
        &self,
        ctx: &Context<'_>,
        payload: CreateInboundShipmentInput,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "insert into ims.inbound_shipments (client_id,warehouse_id,status,expected_arrival_date,actual_arrival_date) values ($1,$2,$3,$4,$5) returning *",
        )
        .bind(payload.client_id)
        .bind(payload.warehouse_id)
        .bind(payload.status)
        .bind(payload.expected_arrival_date)
        .bind(payload.actual_arrival_date)
        .fetch_one(&mut *trx)
        .await?;

        for item in payload.items {
            _ = sqlx::query("insert into ims.inbound_shipment_items (inbound_shipment_id,product_id,expected_quantity,received_quantity,discrepancy_quantity,discrepancy_notes) values ($1,$2,$3,$4,$5,$6) returning *")
            .bind(result.id.clone())
            .bind(item.product_id)
            .bind(item.expected_quantity)
            .bind(item.received_quantity)
            .bind(item.discrepancy_quantity)
            .bind(item.discrepancy_notes)
            .execute(&mut *trx).await?;
        }

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_inbound_shipment_client_id(
        &self,
        ctx: &Context<'_>,
        client_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "update ims.inbound_shipments set client_id = $1 where id = $2",
        )
        .bind(client_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_inbound_shipment_warehouse_id(
        &self,
        ctx: &Context<'_>,
        warehouse_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "update ims.inbound_shipments set warehouse_id = $1 where id = $2",
        )
        .bind(warehouse_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_inbound_shipment_status(
        &self,
        ctx: &Context<'_>,
        status: InboundShipmentStatusEnum,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "update ims.inbound_shipments set status = $1 where id = $2",
        )
        .bind(status)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_inbound_shipment_expected_arrival_date(
        &self,
        ctx: &Context<'_>,
        arrival_date: NaiveDate,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "update ims.inbound_shipments set expected_arrival_date = $1 where id = $2",
        )
        .bind(arrival_date)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_inbound_shipment_actual_arrival_date(
        &self,
        ctx: &Context<'_>,
        actual_arrival_date: NaiveDate,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "update ims.inbound_shipments set actual_arrival_date = $1 where id = $2",
        )
        .bind(actual_arrival_date)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn remove_inbound_shipment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query("delete from ims.inbound_shipments where id = $2")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        _ = trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable remove inbound shipment"));
        }

        Ok("Inbound shipment removed successfully".into())
    }

    // sub item
    async fn add_inbound_shipment_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateInboundShipmentItemInput,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_,inbound_shipment_items::Model>("insert into ims.inbound_shipment_items (inbound_shipment_id,product_id,expected_quantity,received_quantity,discrepancy_quantity,discrepancy_notes) values ($1,$2,$3,$4,$5,$6) returning *")
            .bind(id)
            .bind(payload.product_id)
            .bind(payload.expected_quantity)
            .bind(payload.received_quantity)
            .bind(payload.discrepancy_quantity)
            .bind(payload.discrepancy_notes)
            .fetch_one(&mut *trx).await?;

        _ = trx.commit().await?;

        Ok(sqlx::query_as::<_, inbound_shipments::Model>(
            "select * from ims.inbound_shipments where id = $1",
        )
        .bind(result.inbound_shipment_id)
        .fetch_one(db)
        .await?)
    }

    async fn update_inbound_shipment_item_product_id(
        &self,
        ctx: &Context<'_>,
        product_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "update ims.inbound_shipment_item set product_id = $1 where id = $2",
        )
        .bind(product_id)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_inbound_shipment_item_expected_quantity(
        &self,
        ctx: &Context<'_>,
        expected_quantity: i32,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "update ims.inbound_shipment_item set expected_quantity = $1 where id = $2",
        )
        .bind(expected_quantity)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_inbound_shipment_item_recieved_quantity(
        &self,
        ctx: &Context<'_>,
        recieved_quantity: i32,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "update ims.inbound_shipment_item set recieved_quantity = $1 where id = $2",
        )
        .bind(recieved_quantity)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_inbound_shipment_item_discrepancy_quantity(
        &self,
        ctx: &Context<'_>,
        discrepancy_quantity: i32,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "update ims.inbound_shipment_item set discrepancy_quantity = $1 where id = $2",
        )
        .bind(discrepancy_quantity)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn update_inbound_shipment_item_discrepancy_notes(
        &self,
        ctx: &Context<'_>,
        discrepancy_notes: String,
        id: Uuid,
    ) -> async_graphql::Result<inbound_shipments::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, inbound_shipments::Model>(
            "update ims.inbound_shipment_item set discrepancy_notes = $1 where id = $2",
        )
        .bind(discrepancy_notes)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(result)
    }

    async fn remove_inbound_shipment_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query("delete from ims.inbound_shipment_items where id = $2")
            .bind(id)
            .execute(&mut *trx)
            .await?;

        _ = trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable remove inbound shipment item",
            ));
        }

        Ok("Inbound shipment item removed successfully".into())
    }
}
