use std::sync::Arc;

use async_graphql::{ComplexObject, Context, SimpleObject, dataloader::Loader};
use graphql_core::PostgresDataLoader;
use sqlx::FromRow;
use uuid::Uuid;

use crate::models::{opportunities, products};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow)]
#[graphql(complex)]
pub struct Model {
    #[graphql(skip)]
    pub opportunity_id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    pub quantity: i32,
    pub id: Uuid,
}

#[ComplexObject]
impl Model {
    async fn opportunity(&self, ctx: &Context<'_>) -> async_graphql::Result<opportunities::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(opportunities::PrimaryKey(self.opportunity_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find opportunity"))?)
    }
    async fn product(&self, ctx: &Context<'_>) -> async_graphql::Result<products::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(products::PrimaryKey(self.product_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to find product"))?)
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

        let results = sqlx::query_as::<_, Self::Value>(
            "select * from crm.opportunity_products where id = ANY($1)",
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
