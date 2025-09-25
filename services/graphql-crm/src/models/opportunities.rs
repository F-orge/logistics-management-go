use std::sync::Arc;

use async_graphql::ComplexObject;
use async_graphql::Context;
use async_graphql::SimpleObject;
use async_graphql::dataloader::Loader;
use chrono::DateTime;
use chrono::NaiveDate;
use chrono::Utc;
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use sqlx::FromRow;
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::campaigns;
use crate::models::companies;
use crate::models::contacts;
use crate::models::products;

use super::enums::OpportunitySource;
use super::enums::OpportunityStage;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, SimpleObject, FromRow)]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub stage: Option<OpportunityStage>,
    pub deal_value: Option<Decimal>,
    pub probability: Option<f32>,
    pub expected_close_date: Option<NaiveDate>,
    pub lost_reason: Option<String>,
    pub source: Option<OpportunitySource>,
    #[graphql(skip)]
    pub owner_id: Uuid,
    #[graphql(skip)]
    pub contact_id: Option<Uuid>,
    #[graphql(skip)]
    pub company_id: Option<Uuid>,
    #[graphql(skip)]
    pub campaign_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(user::PrimaryKey(self.owner_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find owner"))?)
    }
    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<contacts::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.contact_id {
            Ok(loader.load_one(contacts::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }
    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<companies::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.company_id {
            Ok(loader.load_one(companies::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }
    async fn campaign(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<campaigns::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.campaign_id {
            Ok(loader.load_one(campaigns::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }
    async fn products(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<products::Model>> {
        let db = ctx.data::<PgPool>()?;

        Ok(sqlx::query_as::<_, products::Model>(
            "select crm.products.* from crm.products inner join crm.opportunity_products on crm.opportunity_products.product_id = crm.products.id where crm.opportunity_products.opportunity_id = $1 limit $2 offset $3",
        )
        .bind(self.id)
        .bind(limit as i64)
        .bind((page * limit) as i64)
        .fetch_all(db)
        .await?)
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
            sqlx::query_as::<_, Self::Value>("select * from crm.opportunities where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
