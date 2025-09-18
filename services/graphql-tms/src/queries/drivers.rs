use crate::entities::{
    _generated::drivers,
    drivers::{InsertDriver, UpdateDriver},
};
use async_graphql::Object;
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;
use graphql_auth::guards::RoleGuard;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Drivers")]
impl graphql_core::traits::GraphqlQuery<drivers::Model, Uuid> for drivers::Entity {
    #[graphql(
        name = "drivers",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::FleetManager)).or(RoleGuard::new(UserRole::Dispatcher))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<drivers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let drivers = drivers::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(drivers)
    }
    #[graphql(
        name = "driver",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::FleetManager)).or(RoleGuard::new(UserRole::Dispatcher))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<drivers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let driver = drivers::Entity::find_by_id(id).one(db).await?;
        Ok(driver)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsDriverMutations")]
impl graphql_core::traits::GraphqlMutation<drivers::Model, Uuid, InsertDriver, UpdateDriver>
    for Mutations
{
    #[graphql(
        name = "createDriver",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertDriver,
    ) -> async_graphql::Result<drivers::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_driver = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_driver)
    }
    #[graphql(
        name = "updateDriver",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateDriver,
    ) -> async_graphql::Result<drivers::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_driver = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_driver)
    }
    #[graphql(
        name = "deleteDriver",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let driver = drivers::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find driver"))?;
        let result = driver.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete driver"));
        }
        Ok(true)
    }
}
