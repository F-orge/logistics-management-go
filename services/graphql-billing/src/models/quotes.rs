use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use graphql_crm::models::companies;
use rust_decimal::Decimal;
use uuid::Uuid;

use super::sea_orm_active_enums::QuoteStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingQuotes", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub client_id: Option<Uuid>,
    pub origin_details: String,
    pub destination_details: String,
    pub weight: Option<Decimal>,
    pub length: Option<Decimal>,
    pub width: Option<Decimal>,
    pub height: Option<Decimal>,
    pub volume: Option<Decimal>,
    pub quoted_price: Decimal,
    pub service_level: Option<String>,
    pub expires_at: Option<DateTime<Utc>>,
    pub status: Option<QuoteStatusEnum>,
    pub quote_number: Option<String>,
    pub notes: Option<String>,
    #[graphql(skip)]
    pub created_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn client(&self, _ctx: &Context<'_>) -> async_graphql::Result<Option<companies::Model>> {
        todo!()
    }

    async fn created_by_user(
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

        let results =
            sqlx::query_as::<_, Self::Value>("select * from billing.quotes where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
