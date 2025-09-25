use std::sync::Arc;

use async_graphql::{ComplexObject, Context, SimpleObject, dataloader::Loader};
use graphql_core::PostgresDataLoader;
use sqlx::FromRow;
use uuid::Uuid;

use crate::models::tags;

use super::enums::RecordType;

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, Eq, SimpleObject, FromRow)]
#[graphql(complex)]
pub struct Model {
    pub tag_id: Uuid,
    pub record_id: Uuid,
    pub record_type: RecordType,
    pub id: Uuid,
}

#[ComplexObject]
impl Model {
    async fn tag(&self, ctx: &Context<'_>) -> async_graphql::Result<tags::Model> {
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
        todo!()
    }
}
