use async_graphql::{Context, InputObject, Object};
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::{carrier_rates, carriers, sea_orm_active_enums::CarrierRateUnitEnum};

#[derive(Debug, Clone, InputObject)]
pub struct CreateCarrierRateInput {
    pub service_type: Option<String>,
    pub origin: Option<String>,
    pub destination: Option<String>,
    pub rate: Decimal,
    pub unit: Option<CarrierRateUnitEnum>,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreateCarrierInput {
    pub name: String,
    pub contact_details: Option<String>,
    pub services_offered: Option<String>,
    pub rates: Vec<CreateCarrierRateInput>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsCarriersMutation")]
impl Mutation {
    async fn create_carrier(
        &self,
        ctx: &Context<'_>,
        payload: CreateCarrierInput,
    ) -> async_graphql::Result<carriers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, carriers::Model>(
            "insert into tms.carriers (name, contact_details, services_offered) values ($1, $2, $3) returning *",
        )
        .bind(payload.name)
        .bind(payload.contact_details)
        .bind(payload.services_offered)
        .fetch_one(&mut *trx)
        .await?;

        for rate in payload.rates {
            _ = sqlx::query("insert into tms.carrier_rates (carrier_id, service_type, origin, destination, rate, unit) values ($1, $2, $3, $4, $5, $6)")
                .bind(result.id)
                .bind(rate.service_type)
                .bind(rate.origin)
                .bind(rate.destination)
                .bind(rate.rate)
                .bind(rate.unit)
                .execute(&mut *trx)
                .await?;
        }

        trx.commit().await?;

        Ok(result)
    }

    async fn update_carrier_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<carriers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as("update tms.carriers set name = $1 where id = $2 returning *")
                .bind(name)
                .bind(id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_carrier_contact_details(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        contact_details: String,
    ) -> async_graphql::Result<carriers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as(
                "update tms.carriers set contact_details = $1 where id = $2 returning *",
            )
            .bind(contact_details)
            .bind(id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn update_carrier_services_offered(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        services_offered: String,
    ) -> async_graphql::Result<carriers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as(
            "update tms.carriers set services_offered = $1 where id = $2 returning *",
        )
        .bind(services_offered)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_carrier(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.carriers where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove carrier".into());
        }

        Ok("Carrier removed".into())
    }

    async fn add_carrier_rate(
        &self,
        ctx: &Context<'_>,
        carrier_id: Uuid,
        payload: CreateCarrierRateInput,
    ) -> async_graphql::Result<carriers::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        _ = sqlx::query("insert into tms.carrier_rates (carrier_id, service_type, origin, destination, rate, unit) values ($1, $2, $3, $4, $5, $6)")
            .bind(carrier_id)
            .bind(payload.service_type)
            .bind(payload.origin)
            .bind(payload.destination)
            .bind(payload.rate)
            .bind(payload.unit)
            .execute(db)
            .await?;

        Ok(sqlx::query_as("select * from tms.carriers where id = $1")
            .bind(carrier_id)
            .fetch_one(db)
            .await?)
    }

    async fn update_carrier_rate(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreateCarrierRateInput,
    ) -> async_graphql::Result<carrier_rates::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as("update tms.carrier_rates set service_type = $1, origin = $2, destination = $3, rate = $4, unit = $5 where id = $6 returning *")
            .bind(payload.service_type)
            .bind(payload.origin)
            .bind(payload.destination)
            .bind(payload.rate)
            .bind(payload.unit)
            .bind(id)
            .fetch_one(db)
            .await?)
    }

    async fn remove_carrier_rate(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.carrier_rates where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove carrier rate".into());
        }

        Ok("Carrier rate removed".into())
    }
}
