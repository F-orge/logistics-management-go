use std::sync::Arc;

use async_graphql::{SimpleObject, dataloader::Loader};
use chrono::{DateTime, Utc};
use fake::Dummy;
use fake::faker::{company::en::Buzzword, lorem::en::Paragraph, number::en::NumberWithFormat};
use graphql_core::PostgresDataLoader;
use rust_decimal::Decimal;
use sqlx::FromRow;
use uuid::Uuid;

use super::enums::ProductType;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow, Dummy)]
#[graphql(name = "CrmProducts")]
pub struct Model {
    pub id: Uuid,
    #[dummy(faker = "Buzzword()")]
    pub name: String,
    #[dummy(faker = "NumberWithFormat(\"###-###-###\")")]
    pub sku: Option<String>,
    pub price: Decimal,
    pub r#type: Option<ProductType>,
    #[dummy(faker = "Paragraph(1..3)")]
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
            sqlx::query_as::<_, Self::Value>("select * from crm.products where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
