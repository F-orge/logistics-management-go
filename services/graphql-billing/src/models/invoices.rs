use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, NaiveDate, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use graphql_crm::models::companies;
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::{invoice_line_items, quotes};

use super::sea_orm_active_enums::InvoiceStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingInvoices", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub client_id: Uuid,
    #[graphql(skip)]
    pub quote_id: Option<Uuid>,
    pub invoice_number: String,
    pub status: Option<InvoiceStatusEnum>,
    pub issue_date: NaiveDate,
    pub due_date: NaiveDate,
    pub total_amount: Decimal,
    pub amount_paid: Option<Decimal>,
    pub amount_outstanding: Option<Decimal>,
    pub currency: Option<String>,
    pub tax_amount: Option<Decimal>,
    pub discount_amount: Option<Decimal>,
    pub subtotal: Option<Decimal>,
    pub payment_terms: Option<String>,
    pub notes: Option<String>,
    pub sent_at: Option<DateTime<Utc>>,
    pub paid_at: Option<DateTime<Utc>>,
    #[graphql(skip)]
    pub created_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn client(&self, _ctx: &Context<'_>) -> async_graphql::Result<companies::Model> {
        todo!()
    }

    async fn quote(&self, _ctx: &Context<'_>) -> async_graphql::Result<Option<quotes::Model>> {
        todo!()
    }

    async fn created_by_user(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<user::Model>> {
        todo!()
    }

    async fn line_items(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<invoice_line_items::Model>> {
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

        let results =
            sqlx::query_as::<_, Self::Value>("select * from billing.invoices where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
