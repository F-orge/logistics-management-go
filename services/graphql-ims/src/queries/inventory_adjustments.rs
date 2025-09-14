use crate::entities::{
    _generated::inventory_adjustments,
    inventory_adjustments::{InsertInventoryAdjustment, UpdateInventoryAdjustment},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "InventoryAdjustments")]
impl graphql_core::traits::GraphqlQuery<inventory_adjustments::Model, Uuid>
    for inventory_adjustments::Entity
{
    #[graphql(name = "inventoryAdjustments")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<inventory_adjustments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = inventory_adjustments::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "inventoryAdjustment")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inventory_adjustments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = inventory_adjustments::Entity::find_by_id(id)
            .one(db)
            .await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsInventoryAdjustmentMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        inventory_adjustments::Model,
        Uuid,
        InsertInventoryAdjustment,
        UpdateInventoryAdjustment,
    > for Mutations
{
    #[graphql(name = "createInventoryAdjustment")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertInventoryAdjustment,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateInventoryAdjustment")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateInventoryAdjustment,
    ) -> async_graphql::Result<inventory_adjustments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteInventoryAdjustment")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = inventory_adjustments::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find inventory_adjustment",
            ))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete inventory_adjustment",
            ));
        }
        Ok(true)
    }
}
