use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::invoices;

use super::sea_orm_active_enums::{PaymentMethodEnum, PaymentStatusEnum};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingPayments", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub invoice_id: Uuid,
    pub amount: Decimal,
    pub payment_method: PaymentMethodEnum,
    pub transaction_id: Option<String>,
    pub gateway_reference: Option<String>,
    pub status: Option<PaymentStatusEnum>,
    pub payment_date: Option<DateTime<Utc>>,
    pub processed_at: Option<DateTime<Utc>>,
    pub currency: Option<String>,
    pub exchange_rate: Option<Decimal>,
    pub fees: Option<Decimal>,
    pub net_amount: Option<Decimal>,
    pub notes: Option<String>,
    #[graphql(skip)]
    pub processed_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn invoice(&self, _ctx: &Context<'_>) -> async_graphql::Result<invoices::Model> {
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

        let results =
            sqlx::query_as::<_, Self::Value>("select * from billing.payments where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
