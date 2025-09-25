use async_graphql::{Context, InputObject, Object};
use rust_decimal::Decimal;
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::companies;

#[derive(Debug, Clone, InputObject)]
pub struct CreateCompanyInput {
    pub name: String,
    pub street: Option<String>,
    pub city: Option<String>,
    pub state: Option<String>,
    pub postal_code: Option<String>,
    pub country: Option<String>,
    pub phone_number: Option<String>,
    pub industry: Option<String>,
    pub website: Option<String>,
    pub annual_revenue: Option<Decimal>,
    pub owner_id: Option<Uuid>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "CrmCompaniesMutations")]
impl Mutation {
    async fn create_company(
        &self,
        ctx: &Context<'_>,
        payload: CreateCompanyInput,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "insert into crm.companies (name, street, city, state, postal_code, country, phone_number, industry, website, annual_revenue, owner_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *"
        )
        .bind(payload.name)
        .bind(payload.street)
        .bind(payload.city)
        .bind(payload.state)
        .bind(payload.postal_code)
        .bind(payload.country)
        .bind(payload.phone_number)
        .bind(payload.industry)
        .bind(payload.website)
        .bind(payload.annual_revenue)
        .bind(payload.owner_id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_street(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        street: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set street = $1 where id = $2 returning *",
        )
        .bind(street)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_city(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        city: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set city = $1 where id = $2 returning *",
        )
        .bind(city)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_state(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        state: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set state = $1 where id = $2 returning *",
        )
        .bind(state)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_postal_code(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        postal_code: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set postal_code = $1 where id = $2 returning *",
        )
        .bind(postal_code)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_country(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        country: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set country = $1 where id = $2 returning *",
        )
        .bind(country)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_phone_number(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        phone_number: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set phone_number = $1 where id = $2 returning *",
        )
        .bind(phone_number)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_industry(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        industry: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set industry = $1 where id = $2 returning *",
        )
        .bind(industry)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_website(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        website: Option<String>,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set website = $1 where id = $2 returning *",
        )
        .bind(website)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_annual_revenue(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        annual_revenue: Option<Decimal>,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set annual_revenue = $1 where id = $2 returning *",
        )
        .bind(annual_revenue)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_company_owner_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        owner_id: Option<Uuid>,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<PgPool>()?;
        Ok(sqlx::query_as::<_, companies::Model>(
            "update crm.companies set owner_id = $1 where id = $2 returning *",
        )
        .bind(owner_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn remove_company(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<PgPool>()?;
        let result = sqlx::query("delete from crm.companies where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete company"));
        }
        Ok("Company removed successfully".into())
    }
}
