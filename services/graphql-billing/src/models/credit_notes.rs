use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, NaiveDate, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use crate::models::{disputes, invoices};
use graphql_auth::models::user;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingCreditNotes", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub invoice_id: Uuid,
    #[graphql(skip)]
    pub dispute_id: Option<Uuid>,
    pub credit_note_number: String,
    pub amount: f64,
    pub reason: String,
    pub issue_date: NaiveDate,
    pub applied_at: Option<DateTime<Utc>>,
    pub currency: Option<String>,
    pub notes: Option<String>,
    #[graphql(skip)]
    pub created_by_user_id: Option<Uuid>,
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

    async fn dispute(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<disputes::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.dispute_id {
            Ok(loader.load_one(disputes::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }

    async fn created_by_user(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<user::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.created_by_user_id {
            Ok(loader.load_one(user::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
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
            "select * from billing.credit_notes where id = ANY($1)",
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
