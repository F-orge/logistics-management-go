use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use graphql_auth::guards::RoleGuard;
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::accounting_sync_log,
    accounting_sync_log::{InsertAccountingSyncLog, UpdateAccountingSyncLog},
};

#[Object(name = "AccountingSyncLog")]
impl graphql_core::traits::GraphqlQuery<accounting_sync_log::Model, Uuid>
    for accounting_sync_log::Entity
{
    #[graphql(name = "accountingSyncLogs")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<accounting_sync_log::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = accounting_sync_log::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "accountingSyncLog", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::FinanceManager))")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<accounting_sync_log::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = accounting_sync_log::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "BillingAccountingSyncLogMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        accounting_sync_log::Model,
        Uuid,
        InsertAccountingSyncLog,
        UpdateAccountingSyncLog,
    > for Mutations
{
    #[graphql(name = "createAccountingSyncLog")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertAccountingSyncLog,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateAccountingSyncLog")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateAccountingSyncLog,
    ) -> async_graphql::Result<accounting_sync_log::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteAccountingSyncLog")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = accounting_sync_log::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find accounting_sync_log",
            ))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete accounting_sync_log",
            ));
        }
        Ok(true)
    }
}
