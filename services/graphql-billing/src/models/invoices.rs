use std::sync::Arc;

use crate::models::{invoice_line_items, quotes};
use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, NaiveDate, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use graphql_crm::models::companies;
use uuid::Uuid;

use super::enums::InvoiceStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow)]
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
    pub total_amount: f64,
    pub amount_paid: f64,
    pub amount_outstanding: f64,
    pub currency: Option<String>,
    pub tax_amount: f64,
    pub discount_amount: f64,
    pub subtotal: f64,
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
    async fn client(&self, ctx: &Context<'_>) -> async_graphql::Result<companies::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;
        Ok(loader
            .load_one(companies::PrimaryKey(self.client_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find client"))?)
    }

    async fn quote(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<quotes::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;
        if let Some(id) = self.quote_id {
            Ok(loader.load_one(quotes::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    async fn created_by(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<user::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;
        if let Some(id) = self.created_by_user_id {
            Ok(loader.load_one(user::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    async fn items(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<invoice_line_items::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, invoice_line_items::Model>(
            "select * from billing.invoice_line_items where invoice_id = $1",
        )
        .bind(self.id)
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
