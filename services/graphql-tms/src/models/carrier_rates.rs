use std::sync::Arc;

use async_graphql::{ComplexObject, Context, SimpleObject, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use sqlx::FromRow;
use uuid::Uuid;

use super::sea_orm_active_enums::CarrierRateUnitEnum;
use crate::models::carriers;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow)]
#[graphql(name = "TmsCarrierRates", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub carrier_id: Uuid,
    pub service_type: Option<String>,
    pub origin: Option<String>,
    pub destination: Option<String>,
    pub rate: Decimal,
    pub unit: Option<CarrierRateUnitEnum>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn carrier(&self, ctx: &Context<'_>) -> async_graphql::Result<carriers::Model> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        Ok(loader
            .load_one(carriers::PrimaryKey(self.carrier_id))
            .await?
            .ok_or(async_graphql::Error::new("Unable to get carrier"))?)
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
            sqlx::query_as::<_, Self::Value>("select * from tms.carrier_rates where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
