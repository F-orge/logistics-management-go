use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use rust_decimal::Decimal;
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::campaigns;

#[derive(Debug, Clone, InputObject)]
pub struct CreateCampaignInput {
    pub name: String,
    pub budget: Option<Decimal>,
    pub start_date: Option<NaiveDate>,
    pub end_date: Option<NaiveDate>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "CrmCampaignsMutations")]
impl Mutation {
    async fn create_campaign(
        &self,
        ctx: &Context<'_>,
        payload: CreateCampaignInput,
    ) -> async_graphql::Result<campaigns::Model> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_,campaigns::Model>("insert into crm.campaigns (name,budget,start_date,end_date) values ($1,$2,$3,$4) returning *")
        .bind(payload.name)
        .bind(payload.budget)
        .bind(payload.start_date)
        .bind(payload.end_date)
        .fetch_one(db).await?)
    }

    async fn update_campaign_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<campaigns::Model> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, campaigns::Model>(
            "update crm.campaigns set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_campaign_budget(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        budget: Decimal,
    ) -> async_graphql::Result<campaigns::Model> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, campaigns::Model>(
            "update crm.campaigns set budget = $1 where id = $2 returning *",
        )
        .bind(budget)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_campaign_start_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        start_date: NaiveDate,
    ) -> async_graphql::Result<campaigns::Model> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, campaigns::Model>(
            "update crm.campaigns set start_date = $1 where id = $2 returning *",
        )
        .bind(start_date)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_campaign_end_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        end_date: NaiveDate,
    ) -> async_graphql::Result<campaigns::Model> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, campaigns::Model>(
            "update crm.campaigns set end_date = $1 where id = $2 returning *",
        )
        .bind(end_date)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_campaign(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<PgPool>()?;

        let result = sqlx::query("delete from crm.campaigns where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete campaign"));
        }

        Ok("Campaign removed successfully".into())
    }
}
