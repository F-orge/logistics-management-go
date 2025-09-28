use async_graphql::{Context, InputObject, Object};
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::{
    expenses,
    sea_orm_active_enums::{CurrencyEnum, ExpenseStatusEnum, ExpenseTypeEnum},
};

#[derive(Debug, Clone, InputObject)]
pub struct CreateExpenseInput {
    pub trip_id: Option<Uuid>,
    pub driver_id: Option<Uuid>,
    pub r#type: Option<ExpenseTypeEnum>,
    pub amount: Decimal,
    pub currency: Option<CurrencyEnum>,
    pub receipt_url: Option<String>,
    pub fuel_quantity: Option<f32>,
    pub odometer_reading: Option<i32>,
    pub status: Option<ExpenseStatusEnum>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsExpensesMutation")]
impl Mutation {
    async fn create_expense(
        &self,
        ctx: &Context<'_>,
        payload: CreateExpenseInput,
    ) -> async_graphql::Result<expenses::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, expenses::Model>(
            "insert into tms.expenses (trip_id, driver_id, type, amount, currency, receipt_url, fuel_quantity, odometer_reading, status) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
        )
        .bind(payload.trip_id)
        .bind(payload.driver_id)
        .bind(payload.r#type)
        .bind(payload.amount)
        .bind(payload.currency)
        .bind(payload.receipt_url)
        .bind(payload.fuel_quantity)
        .bind(payload.odometer_reading)
        .bind(payload.status)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_expense(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateExpenseInput,
    ) -> async_graphql::Result<expenses::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, expenses::Model>(
            "update tms.expenses set trip_id = $1, driver_id = $2, type = $3, amount = $4, currency = $5, receipt_url = $6, fuel_quantity = $7, odometer_reading = $8, status = $9 where id = $10 returning *",
        )
        .bind(payload.trip_id)
        .bind(payload.driver_id)
        .bind(payload.r#type)
        .bind(payload.amount)
        .bind(payload.currency)
        .bind(payload.receipt_url)
        .bind(payload.fuel_quantity)
        .bind(payload.odometer_reading)
        .bind(payload.status)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_expense(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.expenses where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove expense".into());
        }

        Ok("Expense removed".into())
    }
}
