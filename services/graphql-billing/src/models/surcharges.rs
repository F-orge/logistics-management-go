use std::sync::Arc;

use async_graphql::dataloader::Loader;
use chrono::{DateTime, NaiveDate, Utc};
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use uuid::Uuid;

use super::sea_orm_active_enums::SurchargeCalculationMethodEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "BillingSurcharges")]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub r#type: String,
    pub amount: Decimal,
    pub calculation_method: SurchargeCalculationMethodEnum,
    pub is_active: Option<bool>,
    pub valid_from: Option<NaiveDate>,
    pub valid_to: Option<NaiveDate>,
    pub description: Option<String>,
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

        let results =
            sqlx::query_as::<_, Self::Value>("select * from billing.surcharges where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
