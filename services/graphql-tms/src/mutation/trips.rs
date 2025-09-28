use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::{
    sea_orm_active_enums::{TripStatusEnum, TripStopStatusEnum},
    trip_stops,
    trips,
};

#[derive(Debug, Clone, InputObject)]
pub struct CreateTripStopInput {
    pub shipment_id: Option<Uuid>,
    pub sequence: i32,
    pub address: Option<String>,
    pub status: Option<TripStopStatusEnum>,
    pub estimated_arrival_time: Option<DateTime<Utc>>,
    pub actual_arrival_time: Option<DateTime<Utc>>,
    pub estimated_departure_time: Option<DateTime<Utc>>,
    pub actual_departure_time: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateTripInput {
    pub driver_id: Option<Uuid>,
    pub vehicle_id: Option<Uuid>,
    pub status: Option<TripStatusEnum>,
    pub stops: Vec<CreateTripStopInput>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsTripsMutation")]
impl Mutation {
    async fn create_trip(
        &self,
        ctx: &Context<'_>,
        payload: CreateTripInput,
    ) -> async_graphql::Result<trips::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, trips::Model>(
            "insert into tms.trips (driver_id, vehicle_id, status) values ($1, $2, $3) returning *",
        )
        .bind(payload.driver_id)
        .bind(payload.vehicle_id)
        .bind(payload.status)
        .fetch_one(&mut *trx)
        .await?;

        for stop in payload.stops {
            _ = sqlx::query("insert into tms.trip_stops (trip_id, shipment_id, sequence, address, status, estimated_arrival_time, actual_arrival_time, estimated_departure_time, actual_departure_time) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)")
                .bind(result.id)
                .bind(stop.shipment_id)
                .bind(stop.sequence)
                .bind(stop.address)
                .bind(stop.status)
                .bind(stop.estimated_arrival_time)
                .bind(stop.actual_arrival_time)
                .bind(stop.estimated_departure_time)
                .bind(stop.actual_departure_time)
                .execute(&mut *trx)
                .await?;
        }

        trx.commit().await?;

        Ok(result)
    }

    async fn update_trip(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateTripInput,
    ) -> async_graphql::Result<trips::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, trips::Model>(
            "update tms.trips set driver_id = $1, vehicle_id = $2, status = $3 where id = $4 returning *",
        )
        .bind(payload.driver_id)
        .bind(payload.vehicle_id)
        .bind(payload.status)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_trip(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.trips where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove trip".into());
        }

        Ok("Trip removed".into())
    }

    async fn add_trip_stop(
        &self,
        ctx: &Context<'_>,
        trip_id: Uuid,
        payload: CreateTripStopInput,
    ) -> async_graphql::Result<trips::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        _ = sqlx::query("insert into tms.trip_stops (trip_id, shipment_id, sequence, address, status, estimated_arrival_time, actual_arrival_time, estimated_departure_time, actual_departure_time) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)")
            .bind(trip_id)
            .bind(payload.shipment_id)
            .bind(payload.sequence)
            .bind(payload.address)
            .bind(payload.status)
            .bind(payload.estimated_arrival_time)
            .bind(payload.actual_arrival_time)
            .bind(payload.estimated_departure_time)
            .bind(payload.actual_departure_time)
            .execute(db)
            .await?;

        Ok(
            sqlx::query_as("select * from tms.trips where id = $1")
                .bind(trip_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_trip_stop(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateTripStopInput,
    ) -> async_graphql::Result<trip_stops::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as(
            "update tms.trip_stops set shipment_id = $1, sequence = $2, address = $3, status = $4, estimated_arrival_time = $5, actual_arrival_time = $6, estimated_departure_time = $7, actual_departure_time = $8 where id = $9 returning *",
        )
        .bind(payload.shipment_id)
        .bind(payload.sequence)
        .bind(payload.address)
        .bind(payload.status)
        .bind(payload.estimated_arrival_time)
        .bind(payload.actual_arrival_time)
        .bind(payload.estimated_departure_time)
        .bind(payload.actual_departure_time)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_trip_stop(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.trip_stops where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove trip stop".into());
        }

        Ok("Trip stop removed".into())
    }
}
