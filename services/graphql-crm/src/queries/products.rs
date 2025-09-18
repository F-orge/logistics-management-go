use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait, PaginatorTrait,
};
use uuid::Uuid;
use crate::entities::{
    _generated::products,
    products::{InsertProduct, UpdateProduct},
};
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;

#[Object(name = "Products")]
impl GraphqlQuery<products::Model, Uuid> for products::Entity {
    #[graphql(
        name = "products",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<products::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let products = products::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(products)
    }
    #[graphql(
        name = "product",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<products::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let product = products::Entity::find_by_id(id).one(db).await?;
        Ok(product)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmProductMutations")]
impl GraphqlMutation<products::Model, Uuid, InsertProduct, UpdateProduct> for Mutations {
    #[graphql(name = "createProduct", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager))")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertProduct,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_product = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_product)
    }
    #[graphql(name = "updateProduct", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager))")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateProduct,
    ) -> async_graphql::Result<products::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_product = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_product)
    }
    #[graphql(name = "deleteProduct", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager))")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let product = products::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find product"))?;
        let result = product.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete product"));
        }
        Ok(true)
    }
}
