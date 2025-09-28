use std::sync::Arc;

use async_graphql::dataloader::Loader;
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::sea_orm_active_enums::SyncStatusEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingAccountingSyncLog")]
pub struct Model {
    pub id: Uuid,
    pub record_id: Uuid,
    pub record_type: String,
    pub external_system: String,
    pub external_id: Option<String>,
    pub status: Option<SyncStatusEnum>,
    pub error_message: Option<String>,
    pub request_payload: Option<String>,
    pub response_payload: Option<String>,
    pub last_sync_at: Option<DateTime<Utc>>,
    pub retry_count: Option<i32>,
    pub next_retry_at: Option<DateTime<Utc>>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
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
            "select * from billing.accounting_sync_log where id = ANY($1)",
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
