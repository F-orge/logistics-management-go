use crate::entities::{
    _generated::return_items,
    return_items::{InsertReturnItem, UpdateReturnItem},
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

#[Object(name = "ReturnItems")]
impl graphql_core::traits::GraphqlQuery<return_items::Model, Uuid> for return_items::Entity {
    #[graphql(name = "returnItems", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::InventoryManager)).or(RoleGuard::new(UserRole::WarehouseManager)).or(RoleGuard::new(UserRole::WarehouseOperator))")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<return_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = return_items::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "returnItem", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::InventoryManager)).or(RoleGuard::new(UserRole::WarehouseManager)).or(RoleGuard::new(UserRole::WarehouseOperator))")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<return_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = return_items::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsReturnItemMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        return_items::Model,
        Uuid,
        InsertReturnItem,
        UpdateReturnItem,
    > for Mutations
{
    #[graphql(name = "createReturnItem", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseOperator))")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertReturnItem,
    ) -> async_graphql::Result<return_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateReturnItem", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseOperator))")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateReturnItem,
    ) -> async_graphql::Result<return_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteReturnItem", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseOperator))")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = return_items::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find return_item"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete return_item"));
        }
        Ok(true)
    }
}
