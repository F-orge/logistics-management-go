use std::sync::Arc;

use async_graphql::ComplexObject;
use async_graphql::Context;
use async_graphql::SimpleObject;
use async_graphql::dataloader::Loader;
use chrono::DateTime;
use chrono::Utc;
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use sqlx::FromRow;
use uuid::Uuid;

use crate::models::campaigns;
use crate::models::contacts;
use crate::models::opportunities;

use super::enums::LeadSource;
use super::enums::LeadStatus;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub lead_source: Option<LeadSource>,
    pub status: Option<LeadStatus>,
    pub lead_score: Option<i32>,
    #[graphql(skip)]
    pub owner_id: Uuid,
    #[graphql(skip)]
    pub campaign_id: Option<Uuid>,
    pub converted_at: Option<DateTime<Utc>>,
    #[graphql(skip)]
    pub converted_contact_id: Option<Uuid>,
    #[graphql(skip)]
    pub converted_company_id: Option<Uuid>,
    #[graphql(skip)]
    pub converted_opportunity_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        todo!()
    }
    async fn campaign(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<campaigns::Model>> {
        todo!()
    }
    async fn converted_contact(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<contacts::Model>> {
        todo!()
    }
    async fn converted_opportunity(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<opportunities::Model>> {
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
            sqlx::query_as::<_, Self::Value>("select * from crm.leads where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
