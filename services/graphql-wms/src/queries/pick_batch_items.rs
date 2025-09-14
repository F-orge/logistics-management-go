use crate::entities::{
    _generated::pick_batch_items,
    pick_batch_items::{InsertPickBatchItem, UpdatePickBatchItem},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "PickBatchItems")]
impl graphql_core::traits::GraphqlQuery<pick_batch_items::Model, Uuid>
    for pick_batch_items::Entity
{
    #[graphql(name = "pickBatchItems")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<pick_batch_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = pick_batch_items::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "pickBatchItem")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<pick_batch_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = pick_batch_items::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "WmsPickBatchItemMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        pick_batch_items::Model,
        Uuid,
        InsertPickBatchItem,
        UpdatePickBatchItem,
    > for Mutations
{
    #[graphql(name = "createPickBatchItem")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertPickBatchItem,
    ) -> async_graphql::Result<pick_batch_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updatePickBatchItem")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdatePickBatchItem,
    ) -> async_graphql::Result<pick_batch_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deletePickBatchItem")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = pick_batch_items::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find pick_batch_item"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete pick_batch_item",
            ));
        }
        Ok(true)
    }
}
