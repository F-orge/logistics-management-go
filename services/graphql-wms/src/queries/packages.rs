use crate::entities::{
    _generated::packages,
    packages::{InsertPackage, UpdatePackage},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Packages")]
impl graphql_core::traits::GraphqlQuery<packages::Model, Uuid> for packages::Entity {
    #[graphql(name = "packages")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<packages::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = packages::Entity::find().all(db).await.unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "package")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<packages::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = packages::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "WmsPackageMutations")]
impl graphql_core::traits::GraphqlMutation<packages::Model, Uuid, InsertPackage, UpdatePackage>
    for Mutations
{
    #[graphql(name = "createPackage")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertPackage,
    ) -> async_graphql::Result<packages::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updatePackage")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdatePackage,
    ) -> async_graphql::Result<packages::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deletePackage")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = packages::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find package"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete package"));
        }
        Ok(true)
    }
}
