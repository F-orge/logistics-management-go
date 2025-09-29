use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, NaiveDate, Utc};
use graphql_core::PostgresDataLoader;
use graphql_crm::models::companies;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingClientAccounts", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub client_id: Uuid,
    pub credit_limit: Option<f64>,
    pub available_credit: Option<f64>,
    pub wallet_balance: Option<f64>,
    pub currency: Option<String>,
    pub payment_terms_days: Option<i32>,
    pub is_credit_approved: Option<bool>,
    pub last_payment_date: Option<NaiveDate>,
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
            "select * from billing.client_accounts where id = ANY($1)",
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
