use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use uuid::Uuid;

use crate::models::suppliers;

#[derive(Debug, Clone, InputObject)]
pub struct CreateSupplierInput {
    pub name: String,
    pub contact_person: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "ImsSuppliersMutation")]
impl Mutation {
    async fn create_supplier(
        &self,
        ctx: &Context<'_>,
        payload: CreateSupplierInput,
    ) -> async_graphql::Result<suppliers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, suppliers::Model>(
            "insert into ims.suppliers (name, contact_person, email, phone_number, created_at, updated_at) values ($1, $2, $3, $4, $5, $6) returning *",
        )
        .bind(payload.name)
        .bind(payload.contact_person)
        .bind(payload.email)
        .bind(payload.phone_number)
        .bind(payload.created_at)
        .bind(payload.updated_at)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_supplier_name(
        &self,
        ctx: &Context<'_>,
        name: String,
        id: Uuid,
    ) -> async_graphql::Result<suppliers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, suppliers::Model>(
            "update ims.suppliers set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_supplier_contact_person(
        &self,
        ctx: &Context<'_>,
        contact_person: String,
        id: Uuid,
    ) -> async_graphql::Result<suppliers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, suppliers::Model>(
            "update ims.suppliers set contact_person = $1 where id = $2 returning *",
        )
        .bind(contact_person)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_supplier_email(
        &self,
        ctx: &Context<'_>,
        email: String,
        id: Uuid,
    ) -> async_graphql::Result<suppliers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, suppliers::Model>(
            "update ims.suppliers set email = $1 where id = $2 returning *",
        )
        .bind(email)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn update_supplier_phone_number(
        &self,
        ctx: &Context<'_>,
        phone_number: String,
        id: Uuid,
    ) -> async_graphql::Result<suppliers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query_as::<_, suppliers::Model>(
            "update ims.suppliers set phone_number = $1 where id = $2 returning *",
        )
        .bind(phone_number)
        .bind(id)
        .fetch_one(&mut *trx)
        .await?;
        trx.commit().await?;
        Ok(result)
    }

    async fn remove_supplier(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;
        let result = sqlx::query("delete from ims.suppliers where id = $1")
            .bind(id)
            .execute(&mut *trx)
            .await?;
        trx.commit().await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove supplier"));
        }

        Ok("Supplier removed successfully".into())
    }
}
