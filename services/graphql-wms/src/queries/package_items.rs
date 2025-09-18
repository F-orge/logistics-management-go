use crate::entities::{
    _generated::package_items,
    package_items::{InsertPackageItem, UpdatePackageItem},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "PackageItems")]
impl graphql_core::traits::GraphqlQuery<package_items::Model, Uuid> for package_items::Entity {
    #[graphql(name = "packageItems")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<package_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = package_items::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "packageItem")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<package_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = package_items::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "WmsPackageItemMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        package_items::Model,
        Uuid,
        InsertPackageItem,
        UpdatePackageItem,
    > for Mutations
{
    #[graphql(name = "createPackageItem")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertPackageItem,
    ) -> async_graphql::Result<package_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updatePackageItem")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdatePackageItem,
    ) -> async_graphql::Result<package_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deletePackageItem")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = package_items::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find package_item"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete package_item"));
        }
        Ok(true)
    }
}
