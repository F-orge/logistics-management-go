use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::{
    sea_orm_active_enums::ShipmentLegStatusEnum,
    shipment_leg_events,
    shipment_legs,
};

#[derive(Debug, Clone, InputObject)]
pub struct CreateShipmentLegEventInput {
    pub status_message: Option<String>,
    pub location: Option<String>,
    pub event_timestamp: DateTime<Utc>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateShipmentLegInput {
    pub shipment_id: Option<Uuid>,
    pub leg_sequence: i32,
    pub start_location: Option<String>,
    pub end_location: Option<String>,
    pub carrier_id: Option<Uuid>,
    pub internal_trip_id: Option<Uuid>,
    pub status: Option<ShipmentLegStatusEnum>,
    pub events: Vec<CreateShipmentLegEventInput>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsShipmentLegsMutation")]
impl Mutation {
    async fn create_shipment_leg(
        &self,
        ctx: &Context<'_>,
        payload: CreateShipmentLegInput,
    ) -> async_graphql::Result<shipment_legs::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, shipment_legs::Model>(
            "insert into tms.shipment_legs (shipment_id, leg_sequence, start_location, end_location, carrier_id, internal_trip_id, status) values ($1, $2, $3, $4, $5, $6, $7) returning *",
        )
        .bind(payload.shipment_id)
        .bind(payload.leg_sequence)
        .bind(payload.start_location)
        .bind(payload.end_location)
        .bind(payload.carrier_id)
        .bind(payload.internal_trip_id)
        .bind(payload.status)
        .fetch_one(&mut *trx)
        .await?;

        for event in payload.events {
            _ = sqlx::query("insert into tms.shipment_leg_events (shipment_leg_id, status_message, location, event_timestamp) values ($1, $2, $3, $4)")
                .bind(result.id)
                .bind(event.status_message)
                .bind(event.location)
                .bind(event.event_timestamp)
                .execute(&mut *trx)
                .await?;
        }

        trx.commit().await?;

        Ok(result)
    }

    async fn update_shipment_leg(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateShipmentLegInput,
    ) -> async_graphql::Result<shipment_legs::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, shipment_legs::Model>(
            "update tms.shipment_legs set shipment_id = $1, leg_sequence = $2, start_location = $3, end_location = $4, carrier_id = $5, internal_trip_id = $6, status = $7 where id = $8 returning *",
        )
        .bind(payload.shipment_id)
        .bind(payload.leg_sequence)
        .bind(payload.start_location)
        .bind(payload.end_location)
        .bind(payload.carrier_id)
        .bind(payload.internal_trip_id)
        .bind(payload.status)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_shipment_leg(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.shipment_legs where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove shipment leg".into());
        }

        Ok("Shipment leg removed".into())
    }

    async fn add_shipment_leg_event(
        &self,
        ctx: &Context<'_>,
        shipment_leg_id: Uuid,
        payload: CreateShipmentLegEventInput,
    ) -> async_graphql::Result<shipment_legs::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        _ = sqlx::query("insert into tms.shipment_leg_events (shipment_leg_id, status_message, location, event_timestamp) values ($1, $2, $3, $4)")
            .bind(shipment_leg_id)
            .bind(payload.status_message)
            .bind(payload.location)
            .bind(payload.event_timestamp)
            .execute(db)
            .await?;

        Ok(
            sqlx::query_as("select * from tms.shipment_legs where id = $1")
                .bind(shipment_leg_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_shipment_leg_event(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateShipmentLegEventInput,
    ) -> async_graphql::Result<shipment_leg_events::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as(
            "update tms.shipment_leg_events set status_message = $1, location = $2, event_timestamp = $3 where id = $4 returning *",
        )
        .bind(payload.status_message)
        .bind(payload.location)
        .bind(payload.event_timestamp)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_shipment_leg_event(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.shipment_leg_events where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove shipment leg event".into());
        }

        Ok("Shipment leg event removed".into())
    }
}
