use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::contacts;

#[derive(Debug, Clone, InputObject)]
pub struct CreateContactInput {
    pub name: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub job_title: Option<String>,
    pub company_id: Option<Uuid>,
    pub owner_id: Uuid,
}

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmContactsMutations")]
impl Mutation {
    async fn create_contact(
        &self,
        ctx: &Context<'_>,
        payload: CreateContactInput,
    ) -> async_graphql::Result<contacts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, contacts::Model>(
            "insert into crm.contacts (name, email, phone_number, job_title, company_id, owner_id) values ($1,$2,$3,$4,$5,$6) returning *"
        )
        .bind(payload.name)
        .bind(payload.email)
        .bind(payload.phone_number)
        .bind(payload.job_title)
        .bind(payload.company_id)
        .bind(payload.owner_id)
        .fetch_one(db)
        .await?)
    }
    async fn update_contact_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<contacts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, contacts::Model>(
            "update crm.contacts set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_contact_email(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        email: String,
    ) -> async_graphql::Result<contacts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, contacts::Model>(
            "update crm.contacts set email = $1 where id = $2 returning *",
        )
        .bind(email)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_contact_phone_number(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        phone_number: Option<String>,
    ) -> async_graphql::Result<contacts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, contacts::Model>(
            "update crm.contacts set phone_number = $1 where id = $2 returning *",
        )
        .bind(phone_number)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_contact_job_title(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        job_title: Option<String>,
    ) -> async_graphql::Result<contacts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, contacts::Model>(
            "update crm.contacts set job_title = $1 where id = $2 returning *",
        )
        .bind(job_title)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_contact_company_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        company_id: Option<Uuid>,
    ) -> async_graphql::Result<contacts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, contacts::Model>(
            "update crm.contacts set company_id = $1 where id = $2 returning *",
        )
        .bind(company_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_contact_owner_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        owner_id: Uuid,
    ) -> async_graphql::Result<contacts::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, contacts::Model>(
            "update crm.contacts set owner_id = $1 where id = $2 returning *",
        )
        .bind(owner_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn remove_contact(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from crm.contacts where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete contact"));
        }
        Ok("Contact removed successfully".into())
    }
}
