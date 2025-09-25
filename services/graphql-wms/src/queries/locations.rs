use crate::entities::{
    _generated::locations,
    locations::{InsertLocation, UpdateLocation},
};
use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_auth::models::user::UserRole;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Locations")]
impl graphql_core::traits::GraphqlQuery<locations::Model, Uuid> for locations::Entity {
    #[graphql(
        name = "locations",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<locations::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = locations::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(
        name = "location",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<locations::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = locations::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "WmsLocationMutations")]
impl graphql_core::traits::GraphqlMutation<locations::Model, Uuid, InsertLocation, UpdateLocation>
    for Mutations
{
    #[graphql(
        name = "createLocation",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertLocation,
    ) -> async_graphql::Result<locations::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(
        name = "updateLocation",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateLocation,
    ) -> async_graphql::Result<locations::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(
        name = "deleteLocation",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::WarehouseManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = locations::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find location"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete location"));
        }
        Ok(true)
    }
}
