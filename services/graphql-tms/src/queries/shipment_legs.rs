use crate::entities::{
    _generated::shipment_legs,
    shipment_legs::{InsertShipmentLeg, UpdateShipmentLeg},
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

#[Object(name = "ShipmentLegs")]
impl graphql_core::traits::GraphqlQuery<shipment_legs::Model, Uuid> for shipment_legs::Entity {
    #[graphql(
        name = "shipmentLegs",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::LogisticsPlanner)).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::TransportManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<shipment_legs::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let shipment_legs = shipment_legs::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(shipment_legs)
    }
    #[graphql(
        name = "shipmentLeg",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::LogisticsPlanner)).or(RoleGuard::new(UserRole::Dispatcher)).or(RoleGuard::new(UserRole::TransportManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<shipment_legs::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let shipment_leg = shipment_legs::Entity::find_by_id(id).one(db).await?;
        Ok(shipment_leg)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsShipmentLegMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        shipment_legs::Model,
        Uuid,
        InsertShipmentLeg,
        UpdateShipmentLeg,
    > for Mutations
{
    #[graphql(
        name = "createShipmentLeg",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::LogisticsPlanner))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertShipmentLeg,
    ) -> async_graphql::Result<shipment_legs::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_shipment_leg = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_shipment_leg)
    }
    #[graphql(
        name = "updateShipmentLeg",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::LogisticsPlanner))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateShipmentLeg,
    ) -> async_graphql::Result<shipment_legs::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_shipment_leg = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_shipment_leg)
    }
    #[graphql(
        name = "deleteShipmentLeg",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::LogisticsPlanner))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let shipment_leg = shipment_legs::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find shipment leg"))?;
        let result = shipment_leg.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete shipment leg"));
        }
        Ok(true)
    }
}
