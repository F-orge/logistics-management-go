use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use crate::models::invoices;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingInvoiceLineItems", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub invoice_id: Uuid,
    pub source_record_id: Option<Uuid>,
    pub source_record_type: Option<String>,
    pub description: String,
    pub quantity: f64,
    pub unit_price: f64,
    pub total_price: Option<f64>,
    pub tax_rate: Option<f64>,
    pub tax_amount: Option<f64>,
    pub discount_rate: Option<f64>,
    pub discount_amount: Option<f64>,
    pub line_total: Option<f64>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn invoice(&self, ctx: &Context<'_>) -> async_graphql::Result<invoices::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(invoices::PrimaryKey(self.invoice_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find invoice"))?)
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
            "select * from billing.invoice_line_items where id = ANY($1)",
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
