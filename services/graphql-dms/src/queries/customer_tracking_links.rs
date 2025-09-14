use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::customer_tracking_links,
    customer_tracking_links::{InsertCustomerTrackingLink, UpdateCustomerTrackingLink},
};

#[Object(name = "CustomerTrackingLinks")]
impl graphql_core::traits::GraphqlQuery<customer_tracking_links::Model, Uuid>
    for customer_tracking_links::Entity
{
    #[graphql(name = "customerTrackingLinks")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<customer_tracking_links::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = customer_tracking_links::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "customerTrackingLink")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<customer_tracking_links::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = customer_tracking_links::Entity::find_by_id(id)
            .one(db)
            .await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "DmsCustomerTrackingLinkMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        customer_tracking_links::Model,
        Uuid,
        InsertCustomerTrackingLink,
        UpdateCustomerTrackingLink,
    > for Mutations
{
    #[graphql(name = "createCustomerTrackingLink")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertCustomerTrackingLink,
    ) -> async_graphql::Result<customer_tracking_links::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateCustomerTrackingLink")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateCustomerTrackingLink,
    ) -> async_graphql::Result<customer_tracking_links::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteCustomerTrackingLink")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = customer_tracking_links::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find customer_tracking_link",
            ))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete customer_tracking_link",
            ));
        }
        Ok(true)
    }
}
