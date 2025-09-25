use std::sync::Arc;

use async_graphql::ComplexObject;
use async_graphql::Context;
use async_graphql::SimpleObject;
use async_graphql::dataloader::Loader;
use chrono::DateTime;
use chrono::NaiveDate;
use chrono::Utc;
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use sqlx::FromRow;
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::invoice_items;
use crate::models::opportunities;

use super::enums::InvoiceStatus;
use super::enums::PaymentMethod;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub opportunity_id: Option<Uuid>,
    pub status: Option<InvoiceStatus>,
    pub total: Option<Decimal>,
    pub issue_date: Option<NaiveDate>,
    pub due_date: Option<NaiveDate>,
    pub sent_at: Option<DateTime<Utc>>,
    pub paid_at: Option<DateTime<Utc>>,
    pub payment_method: Option<PaymentMethod>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn opportunity(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<opportunities::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.opportunity_id {
            Ok(loader.load_one(opportunities::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }
    async fn items(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<invoice_items::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, invoice_items::Model>(
            "select * from crm.invoice_items where invoice_id = $1 limit $2 offset $3",
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

        let results =
            sqlx::query_as::<_, Self::Value>("select * from crm.invoices where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
