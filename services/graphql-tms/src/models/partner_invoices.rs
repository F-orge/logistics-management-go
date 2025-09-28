use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, NaiveDate, Utc};
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use std::sync::Arc;
use uuid::Uuid;

use crate::models::{carriers, partner_invoice_items};

use super::sea_orm_active_enums::PartnerInvoiceStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "TmsPartnerInvoices")]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub carrier_id: Uuid,
    pub invoice_number: String,
    pub invoice_date: NaiveDate,
    pub total_amount: Decimal,
    pub status: Option<PartnerInvoiceStatusEnum>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn carrier(&self, ctx: &Context<'_>) -> async_graphql::Result<carriers::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(carriers::PrimaryKey(self.carrier_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get carrier"))?)
    }
    async fn items(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<partner_invoice_items::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, partner_invoice_items::Model>(
            "select * from tms.partner_invoice_items where partner_invoice_id = $1 limit $2 offset $3",
        )
        .bind(self.id)
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
    }
}

impl Loader<PrimaryKey> for PostgresDataLoader {
    type Error = Arc<sqlx::Error>;
    type Value = Model;

    async fn load(
        &self,
        keys: &[PrimaryKey],
    ) -> Result<std::collections::HashMap<PrimaryKey, Self::Value>, Self::Error> {
        let keys = keys.iter().map(|k| k.0).collect::<Vec<_>>();

        let results = sqlx::query_as::<_, Self::Value>(
            "select * from tms.partner_invoices where id = ANY($1)",
        )
        .bind(&keys)
        .fetch_all(&self.pool)
        .await?
        .into_iter()
        .map(|model| (PrimaryKey(model.id), model))
        .collect::<_>();

        Ok(results)
    }
}
