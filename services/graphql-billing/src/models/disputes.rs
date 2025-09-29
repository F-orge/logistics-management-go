use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use graphql_crm::models::companies;
use uuid::Uuid;

use crate::models::invoice_line_items;

use super::enums::DisputeStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingDisputes", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub line_item_id: Uuid,
    #[graphql(skip)]
    pub client_id: Uuid,
    pub reason: String,
    pub status: DisputeStatusEnum,
    pub disputed_amount: Option<f64>,
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
    async fn invoice_line_item(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<invoice_line_items::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(invoice_line_items::PrimaryKey(self.line_item_id))
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find invoice line item",
            ))?)
    }

    async fn client(&self, ctx: &Context<'_>) -> async_graphql::Result<companies::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(companies::PrimaryKey(self.client_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find client"))?)
    }

    async fn resolved_by(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<user::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.resolved_by_user_id {
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
