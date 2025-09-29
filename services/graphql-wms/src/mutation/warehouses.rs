use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::warehouses;

#[derive(Debug, Clone, InputObject)]
pub struct CreateWarehouseInput {
    pub name: String,
    pub address: Option<String>,
    pub city: Option<String>,
    pub state: Option<String>,
    pub postal_code: Option<String>,
    pub country: Option<String>,
    pub timezone: Option<String>,
    pub contact_person: Option<String>,
    pub contact_email: Option<String>,
    pub contact_phone: Option<String>,
    pub is_active: Option<bool>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "WmsWarehousesMutation")]
impl Mutation {
    async fn create_warehouse(
        &self,
        ctx: &Context<'_>,
        payload: CreateWarehouseInput,
    ) -> async_graphql::Result<warehouses::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, warehouses::Model>(
            "insert into wms.warehouses (name, address, city, state, postal_code, country, timezone, contact_person, contact_email, contact_phone, is_active) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *",
        )
        .bind(payload.name)
        .bind(payload.address)
        .bind(payload.city)
        .bind(payload.state)
        .bind(payload.postal_code)
        .bind(payload.country)
        .bind(payload.timezone)
        .bind(payload.contact_person)
        .bind(payload.contact_email)
        .bind(payload.contact_phone)
        .bind(payload.is_active)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_warehouse_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<warehouses::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, warehouses::Model>(
            "update wms.warehouses set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_warehouse(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.warehouses where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 1 {
            Ok("Warehouse removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove warehouse"))
        }
    }
}
