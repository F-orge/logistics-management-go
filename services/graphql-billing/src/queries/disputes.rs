use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::disputes,
    disputes::{InsertDispute, UpdateDispute},
};

#[Object(name = "Disputes")]
impl graphql_core::traits::GraphqlQuery<disputes::Model, Uuid> for disputes::Entity {
    #[graphql(name = "disputes")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<disputes::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = disputes::Entity::find().all(db).await.unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "dispute")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<disputes::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = disputes::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "BillingDisputeMutations")]
impl graphql_core::traits::GraphqlMutation<disputes::Model, Uuid, InsertDispute, UpdateDispute>
    for Mutations
{
    #[graphql(name = "createDispute")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertDispute,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateDispute")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateDispute,
    ) -> async_graphql::Result<disputes::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteDispute")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = disputes::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find dispute"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete dispute"));
        }
        Ok(true)
    }
}
