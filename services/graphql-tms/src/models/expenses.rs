use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::DateTime;
use chrono::Utc;
use fake::Dummy;
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use std::sync::Arc;
use uuid::Uuid;

use crate::models::drivers;
use crate::models::trips;

use super::sea_orm_active_enums::CurrencyEnum;
use super::sea_orm_active_enums::ExpenseStatusEnum;
use super::sea_orm_active_enums::ExpenseTypeEnum;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "TmsExpenses")]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub trip_id: Option<Uuid>,
    #[graphql(skip)]
    pub driver_id: Option<Uuid>,
    pub r#type: Option<ExpenseTypeEnum>,
    pub amount: Decimal,
    pub currency: Option<CurrencyEnum>,
    pub receipt_url: Option<String>,
    pub fuel_quantity: Option<f32>,
    pub odometer_reading: Option<i32>,
    pub status: Option<ExpenseStatusEnum>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn trip(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<trips::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.trip_id {
            Ok(loader.load_one(trips::PrimaryKey(id)).await?)
        } else {
            Ok(None)
        }
    }
    async fn driver(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<drivers::Model>> {
        let loader = ctx.data::<async_graphql::dataloader::DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.driver_id {
            Ok(loader.load_one(drivers::PrimaryKey(id)).await?)
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
            sqlx::query_as::<_, Self::Value>("select * from tms.expenses where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
