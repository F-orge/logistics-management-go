use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::client_accounts;

use super::sea_orm_active_enums::TransactionTypeEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingAccountTransactions", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub client_account_id: Uuid,
    pub r#type: TransactionTypeEnum,
    pub amount: Decimal,
    pub running_balance: Option<Decimal>,
    pub source_record_id: Option<Uuid>,
    pub source_record_type: Option<String>,
    pub description: Option<String>,
    pub reference_number: Option<String>,
    pub transaction_date: Option<DateTime<Utc>>,
    #[graphql(skip)]
    pub processed_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn client_account(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<client_accounts::Model> {
        todo!()
    }

    async fn processed_by_user(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<user::Model>> {
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
            "select * from billing.account_transactions where id = ANY($1)",
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
