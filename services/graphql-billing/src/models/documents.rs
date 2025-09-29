use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::enums::DocumentTypeEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingDocuments", complex)]
pub struct Model {
    pub id: Uuid,
    pub record_id: Uuid,
    pub record_type: String,
    pub document_type: DocumentTypeEnum,
    pub file_path: String,
    pub file_name: String,
    pub file_size: Option<i32>,
    pub mime_type: Option<String>,
    #[graphql(skip)]
    pub uploaded_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn uploaded_by(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<user::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.uploaded_by_user_id {
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
            sqlx::query_as::<_, Self::Value>("select * from billing.documents where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
