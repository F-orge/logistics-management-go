use crate::entities::{
    _generated::sales_order_items,
    sales_order_items::{InsertSalesOrderItem, UpdateSalesOrderItem},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "SalesOrderItems")]
impl graphql_core::traits::GraphqlQuery<sales_order_items::Model, Uuid>
    for sales_order_items::Entity
{
    #[graphql(name = "salesOrderItems")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<sales_order_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = sales_order_items::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "salesOrderItem")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<sales_order_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = sales_order_items::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsSalesOrderItemMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        sales_order_items::Model,
        Uuid,
        InsertSalesOrderItem,
        UpdateSalesOrderItem,
    > for Mutations
{
    #[graphql(name = "createSalesOrderItem")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertSalesOrderItem,
    ) -> async_graphql::Result<sales_order_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateSalesOrderItem")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateSalesOrderItem,
    ) -> async_graphql::Result<sales_order_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteSalesOrderItem")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = sales_order_items::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find sales_order_item"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete sales_order_item",
            ));
        }
        Ok(true)
    }
}
