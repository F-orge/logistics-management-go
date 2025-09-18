use crate::entities::{
    _generated::inventory_stock,
    inventory_stock::{InsertInventoryStock, UpdateInventoryStock},
};
use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "InventoryStocks")]
impl graphql_core::traits::GraphqlQuery<inventory_stock::Model, Uuid> for inventory_stock::Entity {
    // read: admin, warehouse manager, warehouse operator, picker, packer, supervisor
    #[graphql(name = "inventoryStocks", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager)).or(RoleGuard::new(UserRole::WarehouseOperator)).or(RoleGuard::new(UserRole::Picker)).or(RoleGuard::new(UserRole::Packer))")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<inventory_stock::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = inventory_stock::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "inventoryStock", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager)).or(RoleGuard::new(UserRole::WarehouseOperator)).or(RoleGuard::new(UserRole::Picker)).or(RoleGuard::new(UserRole::Packer))")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<inventory_stock::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = inventory_stock::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "WmsInventoryStockMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        inventory_stock::Model,
        Uuid,
        InsertInventoryStock,
        UpdateInventoryStock,
    > for Mutations
{
    // TODO: system (auto) actions should use a SystemGuard; using Admin temporarily
    #[graphql(name = "createInventoryStock", guard = "RoleGuard::new(UserRole::Admin)")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertInventoryStock,
    ) -> async_graphql::Result<inventory_stock::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    // TODO: system (auto) actions should use a SystemGuard; using Admin temporarily
    #[graphql(name = "updateInventoryStock", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateInventoryStock,
    ) -> async_graphql::Result<inventory_stock::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteInventoryStock", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = inventory_stock::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find inventory_stock"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete inventory_stock",
            ));
        }
        Ok(true)
    }
}
