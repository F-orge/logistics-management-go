use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_transport_legs::{
    Column as TransportLegColumn, Entity as TransportLegEntity, Model as TransportLegModel,
};
use crate::entities::_generated::prelude::{
    LmsProviderServices, LmsShipments, LmsTransportationProviders, LmsWarehouses, OrgDrivers,
    OrgVehicles,
};
use crate::entities::lms::transport_legs::{CreateTransportLeg, UpdateTransportLeg};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::lms::provider_services::ProviderServiceNode;
use crate::graphql::backend::lms::shipments::ShipmentNode;
use crate::graphql::backend::lms::transportation_providers::TransportationProviderNode;
use crate::graphql::backend::lms::warehouses::WarehouseNode;
use crate::graphql::backend::org::drivers::DriverNode;
use crate::graphql::backend::org::vehicles::VehicleNode;
use sea_orm::prelude::Expr;

pub struct TransportLegNode {
    pub model: TransportLegModel,
}

#[Object]
impl TransportLegNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn shipment(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<ShipmentNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let shipment = LmsShipments::find()
            .filter(
                Expr::col(crate::entities::_generated::lms_shipments::Column::Id)
                    .eq(self.model.shipment_id),
            )
            .one(db)
            .await?;
        Ok(shipment.map(|model| ShipmentNode { model }))
    }
    async fn leg_sequence(&self) -> i32 {
        self.model.leg_sequence
    }
    async fn transport_type(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsTransportLegType {
        self.model.transport_type
    }
    async fn provider(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<TransportationProviderNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let provider = LmsTransportationProviders::find()
            .filter(
                Expr::col(crate::entities::_generated::lms_transportation_providers::Column::Id)
                    .eq(self.model.provider_id),
            )
            .one(db)
            .await?;
        Ok(provider.map(|model| TransportationProviderNode { model }))
    }
    async fn provider_service(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<ProviderServiceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let service = LmsProviderServices::find()
            .filter(
                Expr::col(crate::entities::_generated::lms_provider_services::Column::Id)
                    .eq(self.model.provider_service_id),
            )
            .one(db)
            .await?;
        Ok(service.map(|model| ProviderServiceNode { model }))
    }
    async fn provider_tracking_number(&self) -> Option<String> {
        self.model.provider_tracking_number.clone()
    }
    async fn vehicle(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<VehicleNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let vehicle = OrgVehicles::find()
            .filter(
                Expr::col(crate::entities::_generated::org_vehicles::Column::Id)
                    .eq(self.model.vehicle_id),
            )
            .one(db)
            .await?;
        Ok(vehicle.map(|model| VehicleNode { model }))
    }
    async fn driver(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<DriverNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let driver = OrgDrivers::find()
            .filter(
                Expr::col(crate::entities::_generated::org_drivers::Column::Id)
                    .eq(self.model.driver_id),
            )
            .one(db)
            .await?;
        Ok(driver.map(|model| DriverNode { model }))
    }
    async fn origin_warehouse(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<WarehouseNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let warehouse = LmsWarehouses::find()
            .filter(
                Expr::col(crate::entities::_generated::lms_warehouses::Column::Id)
                    .eq(self.model.origin_warehouse_id),
            )
            .one(db)
            .await?;
        Ok(warehouse.map(|model| WarehouseNode { model }))
    }
    async fn destination_warehouse(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<WarehouseNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let warehouse = LmsWarehouses::find()
            .filter(
                Expr::col(crate::entities::_generated::lms_warehouses::Column::Id)
                    .eq(self.model.destination_warehouse_id),
            )
            .one(db)
            .await?;
        Ok(warehouse.map(|model| WarehouseNode { model }))
    }
    async fn origin_address_id(&self) -> Option<Uuid> {
        self.model.origin_address_id
    }
    async fn destination_address_id(&self) -> Option<Uuid> {
        self.model.destination_address_id
    }
    async fn scheduled_pickup(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.scheduled_pickup
    }
    async fn actual_pickup(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.actual_pickup
    }
    async fn scheduled_delivery(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.scheduled_delivery
    }
    async fn actual_delivery(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.actual_delivery
    }
    async fn cost(&self) -> Option<Decimal> {
        self.model.cost
    }
    async fn currency(&self) -> Option<String> {
        self.model.currency.clone()
    }
    async fn status(&self) -> crate::entities::_generated::sea_orm_active_enums::LmsLegStatus {
        self.model.status
    }
    async fn special_instructions(&self) -> Option<String> {
        self.model.special_instructions.clone()
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct TransportLegsQuery;

#[Object]
impl TransportLegsQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<TransportLegNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = TransportLegEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| TransportLegNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<TransportLegColumn>>>,
        filter_by: Option<Vec<FilterGeneric<TransportLegColumn>>>,
    ) -> async_graphql::Result<Vec<TransportLegNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = TransportLegEntity::find();

        // Sorting
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let (column, order) = sort.sort();
                query = query.order_by(column, order);
            }
        }

        // Filtering
        if let Some(filters) = filter_by {
            for filter in filters {
                query = query.filter(filter.filter());
            }
        }

        let items = query.paginate(db, limit).fetch_page(page).await?;
        Ok(items
            .into_iter()
            .map(|m| TransportLegNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct TransportLegsMutation;

#[Object]
impl TransportLegsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateTransportLeg,
    ) -> async_graphql::Result<TransportLegNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(TransportLegNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateTransportLeg,
    ) -> async_graphql::Result<TransportLegNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(TransportLegNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        TransportLegEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete transport leg: {}", e))?;
        Ok(format!("Deleted transport leg with ID: {}", id))
    }
}
