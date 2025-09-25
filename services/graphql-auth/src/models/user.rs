use std::sync::Arc;

use async_graphql::{Enum, SimpleObject, dataloader::Loader};
use chrono::{DateTime, Utc};
use graphql_core::PostgresDataLoader;
use sqlx::{PgPool, prelude::FromRow};
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Enum, sqlx::Type)]
#[graphql(name = "AuthUserRole")]
#[sqlx(type_name = "auth.user_role", rename_all = "kebab-case")]
pub enum UserRole {
    Admin,
    Developer,
    User,
    Client,
    ClientAdmin,
    EndCustomer,
    InventoryManager,
    WarehouseManager,
    ReceivingManager,
    WarehouseOperator,
    Picker,
    Packer,
    ReturnsProcessor,
    QcManager,
    LogisticsCoordinator,
    LogisticsManager,
    LogisticsPlanner,
    Dispatcher,
    Driver,
    FleetManager,
    TransportManager,
    AccountManager,
    PricingAnalyst,
    FinanceManager,
    Accountant,
    Sdr,
    SalesRep,
    SalesManager,
    MarketingManager,
    CustomerSupportAgent,
    ProductManager,
    Carrier,
}

#[derive(Debug, Clone, Copy, PartialEq, Hash, Eq)]
pub struct PrimaryKey(pub Uuid);

#[derive(SimpleObject, Debug, Clone, FromRow)]
#[graphql(name = "AuthUser")]
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub email_verified: Option<bool>,
    pub image: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub role: Option<UserRole>,
    pub banned: Option<bool>,
    pub ban_reason: Option<String>,
    pub ban_expires: Option<DateTime<Utc>>,
}

impl Model {
    pub async fn paginate(page: u64, limit: u64, db: &PgPool) -> sqlx::Result<Vec<Model>> {
        sqlx::query_as::<_, Model>("select * from auth.user limit $1 offset $2")
            .bind(limit as i64)
            .bind((page * limit) as i64)
            .fetch_all(db)
            .await
    }
    pub async fn one(id: &PrimaryKey, db: &PgPool) -> sqlx::Result<Option<Model>> {
        sqlx::query_as::<_, Model>("select * from auth.user where id = $1")
            .bind(id.0)
            .fetch_optional(db)
            .await
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
