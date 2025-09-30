use std::sync::Arc;

use async_graphql::{
    ComplexObject, Context, SimpleObject,
    dataloader::{DataLoader, Loader},
};
use chrono::{DateTime, Utc};
use fake::Dummy;
use fake::faker::{
    address::en::{CityName, CountryName, PostCode, StateName, StreetName},
    company::en::{CompanyName, Industry},
    phone_number::en::PhoneNumber,
};
use graphql_auth::models::user;
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow, Dummy)]
#[graphql(name = "CrmCompanies", complex)]
pub struct Model {
    pub id: Uuid,
    #[dummy(faker = "CompanyName()")]
    pub name: String,
    #[dummy(faker = "StreetName()")]
    pub street: Option<String>,
    #[dummy(faker = "CityName()")]
    pub city: Option<String>,
    #[dummy(faker = "StateName()")]
    pub state: Option<String>,
    #[dummy(faker = "PostCode()")]
    pub postal_code: Option<String>,
    #[dummy(faker = "CountryName()")]
    pub country: Option<String>,
    #[dummy(faker = "PhoneNumber()")]
    pub phone_number: Option<String>,
    #[dummy(faker = "Industry()")]
    pub industry: Option<String>,
    pub website: Option<String>,
    pub annual_revenue: Option<Decimal>,
    #[graphql(skip)]
    pub owner_id: Option<Uuid>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<user::Model>> {
        let loader = ctx.data::<DataLoader<PostgresDataLoader>>()?;

        if let Some(id) = self.owner_id {
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
            sqlx::query_as::<_, Self::Value>("select * from crm.companies where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
