use crate::entities::{
    _generated::vehicle_maintenance,
    vehicle_maintenance::{InsertVehicleMaintenance, UpdateVehicleMaintenance},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "VehicleMaintenance")]
impl graphql_core::traits::GraphqlQuery<vehicle_maintenance::Model, Uuid>
    for vehicle_maintenance::Entity
{
    #[graphql(name = "vehicleMaintenance")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<vehicle_maintenance::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let vehicle_maintenance = vehicle_maintenance::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(vehicle_maintenance)
    }
    #[graphql(name = "vehicleMaintenanceItem")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<vehicle_maintenance::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let vehicle_maintenance_item = vehicle_maintenance::Entity::find_by_id(id).one(db).await?;
        Ok(vehicle_maintenance_item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsVehicleMaintenanceMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        vehicle_maintenance::Model,
        Uuid,
        InsertVehicleMaintenance,
        UpdateVehicleMaintenance,
    > for Mutations
{
    #[graphql(name = "createVehicleMaintenance")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertVehicleMaintenance,
    ) -> async_graphql::Result<vehicle_maintenance::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_vehicle_maintenance = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_vehicle_maintenance)
    }
    #[graphql(name = "updateVehicleMaintenance")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateVehicleMaintenance,
    ) -> async_graphql::Result<vehicle_maintenance::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_vehicle_maintenance = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_vehicle_maintenance)
    }
    #[graphql(name = "deleteVehicleMaintenance")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let vehicle_maintenance_item = vehicle_maintenance::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find vehicle maintenance item",
            ))?;
        let result = vehicle_maintenance_item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete vehicle maintenance item",
            ));
        }
        Ok(true)
    }
}
