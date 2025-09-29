use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use uuid::Uuid;

use crate::models::{enums::SurchargeCalculationMethodEnum, surcharges};

#[derive(Debug, Clone, InputObject)]
pub struct CreateSurchargeInput {
    pub name: String,
    pub r#type: String,
    pub amount: f64,
    pub calculation_method: SurchargeCalculationMethodEnum,
    pub is_active: Option<bool>,
    pub valid_from: Option<NaiveDate>,
    pub valid_to: Option<NaiveDate>,
    pub description: Option<String>,
}

#[derive(Debug, Clone, Default)]
pub struct SurchargesMutation;

#[Object(name = "BillingSurchargesMutation")]
impl SurchargesMutation {
    async fn create_surcharge(
        &self,
        ctx: &Context<'_>,
        payload: CreateSurchargeInput,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, surcharges::Model>(
            "insert into billing.surcharges (name, type, amount, calculation_method, is_active, valid_from, valid_to, description) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
        )
        .bind(payload.name)
        .bind(payload.r#type)
        .bind(payload.amount)
        .bind(payload.calculation_method)
        .bind(payload.is_active)
        .bind(payload.valid_from)
        .bind(payload.valid_to)
        .bind(payload.description)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_surcharge_name(
        &self,
        ctx: &Context<'_>,
        name: String,
        id: Uuid,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, surcharges::Model>(
            "update billing.surcharges set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_surcharge_type(
        &self,
        ctx: &Context<'_>,
        r#type: String,
        id: Uuid,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, surcharges::Model>(
            "update billing.surcharges set type = $1 where id = $2 returning *",
        )
        .bind(r#type)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_surcharge_amount(
        &self,
        ctx: &Context<'_>,
        amount: f64,
        id: Uuid,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, surcharges::Model>(
            "update billing.surcharges set amount = $1 where id = $2 returning *",
        )
        .bind(amount)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_surcharge_calculation_method(
        &self,
        ctx: &Context<'_>,
        calculation_method: SurchargeCalculationMethodEnum,
        id: Uuid,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, surcharges::Model>(
            "update billing.surcharges set calculation_method = $1 where id = $2 returning *",
        )
        .bind(calculation_method)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_surcharge_is_active(
        &self,
        ctx: &Context<'_>,
        is_active: Option<bool>,
        id: Uuid,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, surcharges::Model>(
            "update billing.surcharges set is_active = $1 where id = $2 returning *",
        )
        .bind(is_active)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_surcharge_valid_from(
        &self,
        ctx: &Context<'_>,
        valid_from: Option<NaiveDate>,
        id: Uuid,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, surcharges::Model>(
            "update billing.surcharges set valid_from = $1 where id = $2 returning *",
        )
        .bind(valid_from)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_surcharge_valid_to(
        &self,
        ctx: &Context<'_>,
        valid_to: Option<NaiveDate>,
        id: Uuid,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, surcharges::Model>(
            "update billing.surcharges set valid_to = $1 where id = $2 returning *",
        )
        .bind(valid_to)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_surcharge_description(
        &self,
        ctx: &Context<'_>,
        description: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, surcharges::Model>(
            "update billing.surcharges set description = $1 where id = $2 returning *",
        )
        .bind(description)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_surcharge(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.surcharges where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove surcharge"));
        }

        Ok("Surcharge removed successfully".into())
    }
}
