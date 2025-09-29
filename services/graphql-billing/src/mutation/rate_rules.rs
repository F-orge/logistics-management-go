use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{enums::PricingModelEnum, rate_rules};

#[derive(Debug, Clone, InputObject)]
pub struct CreateRateRuleInput {
    pub rate_card_id: Uuid,
    pub condition: String,
    pub value: String,
    pub price: f64,
    pub pricing_model: PricingModelEnum,
    pub min_value: Option<f64>,
    pub max_value: Option<f64>,
    pub priority: Option<i32>,
    pub is_active: Option<bool>,
}

#[derive(Debug, Clone, Default)]
pub struct RateRulesMutation;

#[Object(name = "BillingRateRulesMutation")]
impl RateRulesMutation {
    async fn create_rate_rule(
        &self,
        ctx: &Context<'_>,
        payload: CreateRateRuleInput,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_rules::Model>(
            "insert into billing.rate_rules (rate_card_id, condition, value, price, pricing_model, min_value, max_value, priority, is_active) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
        )
        .bind(payload.rate_card_id)
        .bind(payload.condition)
        .bind(payload.value)
        .bind(payload.price)
        .bind(payload.pricing_model)
        .bind(payload.min_value)
        .bind(payload.max_value)
        .bind(payload.priority)
        .bind(payload.is_active)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_rule_rate_card_id(
        &self,
        ctx: &Context<'_>,
        rate_card_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_rules::Model>(
            "update billing.rate_rules set rate_card_id = $1 where id = $2 returning *",
        )
        .bind(rate_card_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_rule_condition(
        &self,
        ctx: &Context<'_>,
        condition: String,
        id: Uuid,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_rules::Model>(
            "update billing.rate_rules set condition = $1 where id = $2 returning *",
        )
        .bind(condition)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_rule_value(
        &self,
        ctx: &Context<'_>,
        value: String,
        id: Uuid,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_rules::Model>(
            "update billing.rate_rules set value = $1 where id = $2 returning *",
        )
        .bind(value)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_rule_price(
        &self,
        ctx: &Context<'_>,
        price: f64,
        id: Uuid,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_rules::Model>(
            "update billing.rate_rules set price = $1 where id = $2 returning *",
        )
        .bind(price)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_rule_pricing_model(
        &self,
        ctx: &Context<'_>,
        pricing_model: PricingModelEnum,
        id: Uuid,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_rules::Model>(
            "update billing.rate_rules set pricing_model = $1 where id = $2 returning *",
        )
        .bind(pricing_model)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_rule_min_value(
        &self,
        ctx: &Context<'_>,
        min_value: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_rules::Model>(
            "update billing.rate_rules set min_value = $1 where id = $2 returning *",
        )
        .bind(min_value)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_rule_max_value(
        &self,
        ctx: &Context<'_>,
        max_value: Option<f64>,
        id: Uuid,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_rules::Model>(
            "update billing.rate_rules set max_value = $1 where id = $2 returning *",
        )
        .bind(max_value)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_rule_priority(
        &self,
        ctx: &Context<'_>,
        priority: Option<i32>,
        id: Uuid,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_rules::Model>(
            "update billing.rate_rules set priority = $1 where id = $2 returning *",
        )
        .bind(priority)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_rule_is_active(
        &self,
        ctx: &Context<'_>,
        is_active: Option<bool>,
        id: Uuid,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_rules::Model>(
            "update billing.rate_rules set is_active = $1 where id = $2 returning *",
        )
        .bind(is_active)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_rate_rule(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.rate_rules where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove rate rule"));
        }

        Ok("Rate rule removed successfully".into())
    }
}
