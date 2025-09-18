use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::account_transactions,
    account_transactions::{InsertAccountTransaction, UpdateAccountTransaction},
};

#[Object(name = "AccountTransactions")]
impl graphql_core::traits::GraphqlQuery<account_transactions::Model, Uuid>
    for account_transactions::Entity
{
    #[graphql(name = "accountTransactions")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<account_transactions::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = account_transactions::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "accountTransaction")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<account_transactions::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = account_transactions::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "BillingAccountTransactionMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        account_transactions::Model,
        Uuid,
        InsertAccountTransaction,
        UpdateAccountTransaction,
    > for Mutations
{
    #[graphql(name = "createAccountTransaction")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertAccountTransaction,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateAccountTransaction")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateAccountTransaction,
    ) -> async_graphql::Result<account_transactions::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteAccountTransaction")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = account_transactions::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find account_transaction",
            ))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete account_transaction",
            ));
        }
        Ok(true)
    }
}
