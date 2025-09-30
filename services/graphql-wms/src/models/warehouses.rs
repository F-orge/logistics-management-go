use std::sync::Arc;

use async_graphql::{ComplexObject, Context, dataloader::Loader};
use chrono::{DateTime, Utc};
use fake::Dummy;
use fake::faker::{address::en::{CityName, CountryName, PostCode, StateName, StreetName, TimeZone}, company::en::CompanyName, internet::en::FreeEmail, name::en::Name, phone_number::en::PhoneNumber};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use crate::models::locations;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq, Dummy)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, async_graphql::SimpleObject, sqlx::FromRow, Dummy)]
#[graphql(name = "WmsWarehouses", complex)]
pub struct Model {
    pub id: Uuid,
    #[dummy(faker = "CompanyName()")]
    pub name: String,
    #[dummy(faker = "StreetName()")]
    pub address: Option<String>,
    #[dummy(faker = "CityName()")]
    pub city: Option<String>,
    #[dummy(faker = "StateName()")]
    pub state: Option<String>,
    #[dummy(faker = "PostCode()")]
    pub postal_code: Option<String>,
    #[dummy(faker = "CountryName()")]
    pub country: Option<String>,
    #[dummy(faker = "TimeZone()")]
    pub timezone: Option<String>,
    #[dummy(faker = "Name()")]
    pub contact_person: Option<String>,
    #[dummy(faker = "FreeEmail()")]
    pub contact_email: Option<String>,
    #[dummy(faker = "PhoneNumber()")]
    pub contact_phone: Option<String>,
    pub is_active: Option<bool>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn locations(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<locations::Model>> {
        let db = ctx.data::<sqlx::PgPool>()?;

        Ok(sqlx::query_as::<_, locations::Model>(
            "select * from wms.locations where warehouse_id = $1",
        )
        .bind(self.id)
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
            sqlx::query_as::<_, Self::Value>("select * from wms.warehouses where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
