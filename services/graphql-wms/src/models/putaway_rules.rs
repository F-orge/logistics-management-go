use std::sync::Arc;

use async_graphql::{dataloader::Loader, ComplexObject, Context};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use uuid::Uuid;

use super::{locations, sea_orm_active_enums::LocationTypeEnum, warehouses};

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(Clone, Debug, PartialEq, async_graphql::SimpleObject, sqlx::FromRow)]
#[graphql(name = "WmsPutawayRules", complex)]
pub struct Model {
    pub id: Uuid,
    #[graphql(skip)]
    pub product_id: Uuid,
    #[graphql(skip)]
    pub client_id: Option<Uuid>,
    #[graphql(skip)]
    pub warehouse_id: Uuid,
    #[graphql(skip)]
    pub preferred_location_id: Option<Uuid>,
    pub location_type: Option<LocationTypeEnum>,
    pub priority: i32,
    pub min_quantity: Option<i32>,
    pub max_quantity: Option<i32>,
    pub weight_threshold: Option<f32>,
    pub volume_threshold: Option<f32>,
    pub requires_temperature_control: Option<bool>,
    pub requires_hazmat_approval: Option<bool>,
    pub is_active: Option<bool>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[ComplexObject]
impl Model {
    async fn product(&self, _ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }

    async fn client(&self, _ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }

    async fn warehouse(&self, _ctx: &Context<'_>) -> async_graphql::Result<warehouses::Model> {
        todo!()
    }

    async fn preferred_location(
        &self,
        _ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<locations::Model>> {
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
        let keys = keys.iter().map(|k| k.0).collect::<Vec<_>>();

        let results =
            sqlx::query_as::<_, Self::Value>("select * from wms.putaway_rules where id = ANY($1)")
                .bind(&keys)
                .fetch_all(&self.pool)
                .await?
                .into_iter()
                .map(|model| (PrimaryKey(model.id), model))
                .collect::<_>();

        Ok(results)
    }
}
