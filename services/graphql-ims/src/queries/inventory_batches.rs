use crate::entities::{
    _generated::inventory_batches,
    inventory_batches::{InsertInventoryBatch, UpdateInventoryBatch},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "InventoryBatches")]
impl graphql_core::traits::GraphqlQuery<inventory_batches::Model, Uuid>
    for inventory_batches::Entity
{
    #[graphql(name = "inventoryBatches")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<inventory_batches::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = inventory_batches::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "inventoryBatch")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inventory_batches::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = inventory_batches::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsInventoryBatchMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        inventory_batches::Model,
        Uuid,
        InsertInventoryBatch,
        UpdateInventoryBatch,
    > for Mutations
{
    #[graphql(name = "createInventoryBatch")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertInventoryBatch,
    ) -> async_graphql::Result<inventory_batches::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateInventoryBatch")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateInventoryBatch,
    ) -> async_graphql::Result<inventory_batches::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteInventoryBatch")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = inventory_batches::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find inventory_batch"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete inventory_batch",
            ));
        }
        Ok(true)
    }
}
