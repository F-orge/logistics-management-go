use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use crate::models::rate_cards;

use super::enums::PricingModelEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingRateRules", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub rate_card_id: Uuid,
    pub condition: String,
    pub value: String,
    pub price: f64,
    pub pricing_model: PricingModelEnum,
    pub min_value: Option<f64>,
    pub max_value: Option<f64>,
    pub priority: Option<i32>,
    pub is_active: Option<bool>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn rate_card(&self, ctx: &Context<'_>) -> async_graphql::Result<rate_cards::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(rate_cards::PrimaryKey(self.rate_card_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find rate card"))?)
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
            sqlx::query_as::<_, Self::Value>("select * from billing.rate_rules where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
