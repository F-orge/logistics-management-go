use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use uuid::Uuid;

use crate::models::{
    driver_schedules, drivers,
    sea_orm_active_enums::{DriverScheduleReasonEnum, DriverStatusEnum},
};

#[derive(Debug, Clone, InputObject)]
pub struct CreateDriverScheduleInput {
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub reason: Option<DriverScheduleReasonEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateDriverInput {
    pub user_id: Uuid,
    pub license_number: String,
    pub license_expiry_date: Option<NaiveDate>,
    pub status: Option<DriverStatusEnum>,
    pub schedules: Vec<CreateDriverScheduleInput>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsDriversMutation")]
impl Mutation {
    async fn create_driver(
        &self,
        ctx: &Context<'_>,
        payload: CreateDriverInput,
    ) -> async_graphql::Result<drivers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, drivers::Model>(
            "insert into tms.drivers (user_id, license_number, license_expiry_date, status) values ($1, $2, $3, $4) returning *",
        )
        .bind(payload.user_id)
        .bind(payload.license_number)
        .bind(payload.license_expiry_date)
        .bind(payload.status)
        .fetch_one(&mut *trx)
        .await?;

        for schedule in payload.schedules {
            _ = sqlx::query("insert into tms.driver_schedules (driver_id, start_date, end_date, reason) values ($1, $2, $3, $4)")
                .bind(result.id)
                .bind(schedule.start_date)
                .bind(schedule.end_date)
                .bind(schedule.reason)
                .execute(&mut *trx)
                .await?;
        }

        trx.commit().await?;

        Ok(result)
    }

    async fn update_driver_license_number(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        license_number: String,
    ) -> async_graphql::Result<drivers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as("update tms.drivers set license_number = $1 where id = $2 returning *")
                .bind(license_number)
                .bind(id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_driver_license_expiry_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        license_expiry_date: NaiveDate,
    ) -> async_graphql::Result<drivers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as(
            "update tms.drivers set license_expiry_date = $1 where id = $2 returning *",
        )
        .bind(license_expiry_date)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_driver_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: DriverStatusEnum,
    ) -> async_graphql::Result<drivers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as("update tms.drivers set status = $1 where id = $2 returning *")
                .bind(status)
                .bind(id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn remove_driver(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.drivers where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove driver".into());
        }

        Ok("Driver removed".into())
    }

    async fn add_driver_schedule(
        &self,
        ctx: &Context<'_>,
        driver_id: Uuid,
        payload: CreateDriverScheduleInput,
    ) -> async_graphql::Result<drivers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        _ = sqlx::query("insert into tms.driver_schedules (driver_id, start_date, end_date, reason) values ($1, $2, $3, $4)")
            .bind(driver_id)
            .bind(payload.start_date)
            .bind(payload.end_date)
            .bind(payload.reason)
            .execute(db)
            .await?;

        Ok(sqlx::query_as("select * from tms.drivers where id = $1")
            .bind(driver_id)
            .fetch_one(db)
            .await?)
    }

    async fn update_driver_schedule(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateDriverScheduleInput,
    ) -> async_graphql::Result<driver_schedules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as(
            "update tms.driver_schedules set start_date = $1, end_date = $2, reason = $3 where id = $4 returning *",
        )
        .bind(payload.start_date)
        .bind(payload.end_date)
        .bind(payload.reason)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_driver_schedule(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.driver_schedules where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove driver schedule".into());
        }

        Ok("Driver schedule removed".into())
    }
}
