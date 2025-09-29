use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use uuid::Uuid;

use crate::models::{enums::ServiceTypeEnum, rate_cards};

#[derive(Debug, Clone, InputObject)]
pub struct CreateRateCardInput {
    pub name: String,
    pub service_type: ServiceTypeEnum,
    pub is_active: Option<bool>,
    pub valid_from: NaiveDate,
    pub valid_to: Option<NaiveDate>,
    pub description: Option<String>,
    pub created_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, Default)]
pub struct RateCardsMutation;

#[Object(name = "BillingRateCardsMutation")]
impl RateCardsMutation {
    async fn create_rate_card(
        &self,
        ctx: &Context<'_>,
        payload: CreateRateCardInput,
    ) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_cards::Model>(
            "insert into billing.rate_cards (name, service_type, is_active, valid_from, valid_to, description, created_by_user_id) values ($1, $2, $3, $4, $5, $6, $7) returning *",
        )
        .bind(payload.name)
        .bind(payload.service_type)
        .bind(payload.is_active)
        .bind(payload.valid_from)
        .bind(payload.valid_to)
        .bind(payload.description)
        .bind(payload.created_by_user_id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_card_name(
        &self,
        ctx: &Context<'_>,
        name: String,
        id: Uuid,
    ) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_cards::Model>(
            "update billing.rate_cards set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_card_service_type(
        &self,
        ctx: &Context<'_>,
        service_type: ServiceTypeEnum,
        id: Uuid,
    ) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_cards::Model>(
            "update billing.rate_cards set service_type = $1 where id = $2 returning *",
        )
        .bind(service_type)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_card_is_active(
        &self,
        ctx: &Context<'_>,
        is_active: Option<bool>,
        id: Uuid,
    ) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_cards::Model>(
            "update billing.rate_cards set is_active = $1 where id = $2 returning *",
        )
        .bind(is_active)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_card_valid_from(
        &self,
        ctx: &Context<'_>,
        valid_from: NaiveDate,
        id: Uuid,
    ) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_cards::Model>(
            "update billing.rate_cards set valid_from = $1 where id = $2 returning *",
        )
        .bind(valid_from)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_card_valid_to(
        &self,
        ctx: &Context<'_>,
        valid_to: Option<NaiveDate>,
        id: Uuid,
    ) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_cards::Model>(
            "update billing.rate_cards set valid_to = $1 where id = $2 returning *",
        )
        .bind(valid_to)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_card_description(
        &self,
        ctx: &Context<'_>,
        description: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_cards::Model>(
            "update billing.rate_cards set description = $1 where id = $2 returning *",
        )
        .bind(description)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_rate_card_created_by_user_id(
        &self,
        ctx: &Context<'_>,
        created_by_user_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, rate_cards::Model>(
            "update billing.rate_cards set created_by_user_id = $1 where id = $2 returning *",
        )
        .bind(created_by_user_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_rate_card(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.rate_cards where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove rate card"));
        }

        Ok("Rate card removed successfully".into())
    }
}
