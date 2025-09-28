use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use graphql_crm::models::companies;
use rust_decimal::Decimal;
use uuid::Uuid;

use crate::models::invoice_line_items;

use super::sea_orm_active_enums::DisputeStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingDisputes", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub line_item_id: Uuid,
    #[graphql(skip)]
    pub client_id: Uuid,
    pub reason: String,
    pub status: Option<DisputeStatusEnum>,
    pub disputed_amount: Option<Decimal>,
    pub resolution_notes: Option<String>,
    pub submitted_at: Option<DateTime<Utc>>,
    pub resolved_at: Option<DateTime<Utc>>,
    #[graphql(skip)]
    pub resolved_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn line_item(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<invoice_line_items::Model> {
        todo!()
    }

    async fn client(&self, _ctx: &Context<'_>) -> async_graphql::Result<companies::Model> {
        todo!()
    }

    async fn resolved_by_user(
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
            sqlx::query_as::<_, Self::Value>("select * from billing.disputes where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
