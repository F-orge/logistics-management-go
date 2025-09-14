use crate::entities::{
    _generated::stock_transfers,
    stock_transfers::{InsertStockTransfer, UpdateStockTransfer},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "StockTransfers")]
impl graphql_core::traits::GraphqlQuery<stock_transfers::Model, Uuid> for stock_transfers::Entity {
    #[graphql(name = "stockTransfers")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<stock_transfers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = stock_transfers::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "stockTransfer")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<stock_transfers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = stock_transfers::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsStockTransferMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        stock_transfers::Model,
        Uuid,
        InsertStockTransfer,
        UpdateStockTransfer,
    > for Mutations
{
    #[graphql(name = "createStockTransfer")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertStockTransfer,
    ) -> async_graphql::Result<stock_transfers::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateStockTransfer")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateStockTransfer,
    ) -> async_graphql::Result<stock_transfers::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteStockTransfer")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = stock_transfers::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find stock_transfer"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete stock_transfer"));
        }
        Ok(true)
    }
}
