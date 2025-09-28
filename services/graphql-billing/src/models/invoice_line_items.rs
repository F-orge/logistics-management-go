use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::invoices;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingInvoiceLineItems", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub invoice_id: Uuid,
    pub source_record_id: Option<Uuid>,
    pub source_record_type: Option<String>,
    pub description: String,
    pub quantity: Decimal,
    pub unit_price: Decimal,
    pub total_price: Option<Decimal>,
    pub tax_rate: Option<Decimal>,
    pub tax_amount: Option<Decimal>,
    pub discount_rate: Option<Decimal>,
    pub discount_amount: Option<Decimal>,
    pub line_total: Option<Decimal>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn invoice(&self, _ctx: &Context<'_>) -> async_graphql::Result<invoices::Model> {
        todo!()
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
