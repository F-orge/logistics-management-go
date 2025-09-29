use async_graphql::{Context, InputObject, Object};
use chrono::NaiveDate;
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::{
    partner_invoice_items, partner_invoices, sea_orm_active_enums::PartnerInvoiceStatusEnum,
};

#[derive(Debug, Clone, InputObject)]
pub struct CreatePartnerInvoiceItemInput {
    pub shipment_leg_id: Uuid,
    pub amount: Decimal,
}

#[derive(Debug, Clone, InputObject)]
pub struct CreatePartnerInvoiceInput {
    pub carrier_id: Uuid,
    pub invoice_number: String,
    pub invoice_date: NaiveDate,
    pub total_amount: Decimal,
    pub status: Option<PartnerInvoiceStatusEnum>,
    pub items: Vec<CreatePartnerInvoiceItemInput>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "TmsPartnerInvoicesMutation")]
impl Mutation {
    async fn create_partner_invoice(
        &self,
        ctx: &Context<'_>,
        payload: CreatePartnerInvoiceInput,
    ) -> async_graphql::Result<partner_invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, partner_invoices::Model>(
            "insert into tms.partner_invoices (carrier_id, invoice_number, invoice_date, total_amount, status) values ($1, $2, $3, $4, $5) returning *",
        )
        .bind(payload.carrier_id)
        .bind(payload.invoice_number)
        .bind(payload.invoice_date)
        .bind(payload.total_amount)
        .bind(payload.status)
        .fetch_one(&mut *trx)
        .await?;

        for item in payload.items {
            _ = sqlx::query("insert into tms.partner_invoice_items (partner_invoice_id, shipment_leg_id, amount) values ($1, $2, $3)")
                .bind(result.id)
                .bind(item.shipment_leg_id)
                .bind(item.amount)
                .execute(&mut *trx)
                .await?;
        }

        trx.commit().await?;

        Ok(result)
    }

    async fn update_partner_invoice(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreatePartnerInvoiceInput,
    ) -> async_graphql::Result<partner_invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, partner_invoices::Model>(
            "update tms.partner_invoices set carrier_id = $1, invoice_number = $2, invoice_date = $3, total_amount = $4, status = $5 where id = $6 returning *",
        )
        .bind(payload.carrier_id)
        .bind(payload.invoice_number)
        .bind(payload.invoice_date)
        .bind(payload.total_amount)
        .bind(payload.status)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_partner_invoice(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.partner_invoices where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove partner invoice".into());
        }

        Ok("Partner invoice removed".into())
    }

    async fn add_partner_invoice_item(
        &self,
        ctx: &Context<'_>,
        partner_invoice_id: Uuid,
        payload: CreatePartnerInvoiceItemInput,
    ) -> async_graphql::Result<partner_invoices::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        _ = sqlx::query("insert into tms.partner_invoice_items (partner_invoice_id, shipment_leg_id, amount) values ($1, $2, $3)")
            .bind(partner_invoice_id)
            .bind(payload.shipment_leg_id)
            .bind(payload.amount)
            .execute(db)
            .await?;

        Ok(
            sqlx::query_as("select * from tms.partner_invoices where id = $1")
                .bind(partner_invoice_id)
                .fetch_one(db)
                .await?,
        )
    }

    async fn update_partner_invoice_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        payload: CreatePartnerInvoiceItemInput,
    ) -> async_graphql::Result<partner_invoice_items::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as(
            "update tms.partner_invoice_items set shipment_leg_id = $1, amount = $2 where id = $3 returning *",
        )
        .bind(payload.shipment_leg_id)
        .bind(payload.amount)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_partner_invoice_item(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from tms.partner_invoice_items where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 0 {
            return Err("Unable to remove partner invoice item".into());
        }

        Ok("Partner invoice item removed".into())
    }
}
