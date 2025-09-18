use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::client_accounts,
    client_accounts::{InsertClientAccount, UpdateClientAccount},
};

#[Object(name = "ClientAccounts")]
impl graphql_core::traits::GraphqlQuery<client_accounts::Model, Uuid> for client_accounts::Entity {
    #[graphql(name = "clientAccounts")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<client_accounts::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = client_accounts::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "clientAccount")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<client_accounts::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = client_accounts::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "BillingClientAccountMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        client_accounts::Model,
        Uuid,
        InsertClientAccount,
        UpdateClientAccount,
    > for Mutations
{
    #[graphql(name = "createClientAccount")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertClientAccount,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateClientAccount")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateClientAccount,
    ) -> async_graphql::Result<client_accounts::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteClientAccount")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = client_accounts::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find client_account"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete client_account"));
        }
        Ok(true)
    }
}
