use crate::entities::{
    _generated::driver_schedules,
    driver_schedules::{InsertDriverSchedule, UpdateDriverSchedule},
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

#[Object(name = "DriverSchedules")]
impl graphql_core::traits::GraphqlQuery<driver_schedules::Model, Uuid>
    for driver_schedules::Entity
{
    #[graphql(
        name = "driverSchedules",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::FleetManager)).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::Driver))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<driver_schedules::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let driver_schedules = driver_schedules::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(driver_schedules)
    }
    #[graphql(
        name = "driverSchedule",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::FleetManager)).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::Driver))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<driver_schedules::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let driver_schedule = driver_schedules::Entity::find_by_id(id).one(db).await?;
        Ok(driver_schedule)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsDriverScheduleMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        driver_schedules::Model,
        Uuid,
        InsertDriverSchedule,
        UpdateDriverSchedule,
    > for Mutations
{
    #[graphql(
        name = "createDriverSchedule",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertDriverSchedule,
    ) -> async_graphql::Result<driver_schedules::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_driver_schedule = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_driver_schedule)
    }
    #[graphql(
        name = "updateDriverSchedule",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateDriverSchedule,
    ) -> async_graphql::Result<driver_schedules::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_driver_schedule = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_driver_schedule)
    }
    #[graphql(
        name = "deleteDriverSchedule",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let driver_schedule = driver_schedules::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find driver schedule"))?;
        let result = driver_schedule.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete driver schedule",
            ));
        }
        Ok(true)
    }
}
