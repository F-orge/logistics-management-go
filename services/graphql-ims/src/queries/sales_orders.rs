use crate::entities::{
    _generated::sales_orders,
    sales_orders::{InsertSalesOrder, UpdateSalesOrder},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "SalesOrders")]
impl graphql_core::traits::GraphqlQuery<sales_orders::Model, Uuid> for sales_orders::Entity {
    #[graphql(name = "salesOrders")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<sales_orders::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = sales_orders::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "salesOrder")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<sales_orders::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = sales_orders::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "ImsSalesOrderMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        sales_orders::Model,
        Uuid,
        InsertSalesOrder,
        UpdateSalesOrder,
    > for Mutations
{
    #[graphql(name = "createSalesOrder")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertSalesOrder,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateSalesOrder")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateSalesOrder,
    ) -> async_graphql::Result<sales_orders::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteSalesOrder")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = sales_orders::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find sales_order"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete sales_order"));
        }
        Ok(true)
    }
}
