use crate::entities::{
    _generated::warehouses,
    warehouses::{InsertWarehouse, UpdateWarehouse},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Warehouses")]
impl graphql_core::traits::GraphqlQuery<warehouses::Model, Uuid> for warehouses::Entity {
    #[graphql(name = "warehouses")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<warehouses::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = warehouses::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "warehouse")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<warehouses::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = warehouses::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "WmsWarehouseMutations")]
impl
    graphql_core::traits::GraphqlMutation<warehouses::Model, Uuid, InsertWarehouse, UpdateWarehouse>
    for Mutations
{
    #[graphql(name = "createWarehouse")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertWarehouse,
    ) -> async_graphql::Result<warehouses::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateWarehouse")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateWarehouse,
    ) -> async_graphql::Result<warehouses::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteWarehouse")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = warehouses::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find warehouse"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete warehouse"));
        }
        Ok(true)
    }
}
