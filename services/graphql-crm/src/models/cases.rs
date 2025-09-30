use std::sync::Arc;

use async_graphql::ComplexObject;
use async_graphql::Context;
use async_graphql::SimpleObject;
use async_graphql::dataloader::DataLoader;
use async_graphql::dataloader::Loader;
use chrono::DateTime;
use chrono::Utc;
use fake::Dummy;
use fake::faker::lorem::en::Paragraph;
use fake::faker::number::en::NumberWithFormat;
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use sqlx::FromRow;
use uuid::Uuid;

use crate::models::contacts;

use super::enums::CasePriority;
use super::enums::CaseStatus;
use super::enums::CaseType;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow, Dummy)]
#[graphql(name = "CrmCases", complex)]
pub struct Model {
    pub id: Uuid,
    #[dummy(faker = "NumberWithFormat(\"###-###-###\")")]
    pub case_number: String,
    pub status: Option<CaseStatus>,
    pub priority: Option<CasePriority>,
    pub r#type: Option<CaseType>,
    #[graphql(skip)]
    pub owner_id: Uuid,
    #[graphql(skip)]
    pub contact_id: Option<Uuid>,
    #[dummy(faker = "Paragraph(1..3)")]
    pub description: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let loader = ctx.data::<DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(user::PrimaryKey(self.owner_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find owner"))?)
    }
    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<contacts::Model>> {
        let loader = ctx.data::<DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.contact_id {
            Ok(loader.load_one(contacts::PrimaryKey(id)).await?)
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
            sqlx::query_as::<_, Self::Value>("select * from crm.cases where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
