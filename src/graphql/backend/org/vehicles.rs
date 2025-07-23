use async_graphql::{Context, Object};
use sea_orm::prelude::Expr;
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::org_departments::{
    Column as DepartmentColumn, Entity as DepartmentEntity,
};
use crate::entities::_generated::{
    lms_warehouses::{Column as WarehouseColumn, Entity as WarehouseEntity},
    org_vehicles::{Column as VehicleColumn, Entity as VehicleEntity, Model as VehicleModel},
};

use crate::entities::org::vehicles::{CreateVehicle, UpdateVehicle};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::lms::warehouses::WarehouseNode;
use crate::graphql::backend::org::departments::DepartmentNode;

#[derive(Default)]
pub struct VehiclesQuery;

#[Object]
impl VehiclesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<VehicleColumn>>>,
        filter_by: Option<Vec<FilterGeneric<VehicleColumn>>>,
    ) -> async_graphql::Result<Vec<VehicleNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = VehicleEntity::find();
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let (column, order) = sort.sort();
                query = query.order_by(column, order);
            }
        }
        if let Some(filters) = filter_by {
            for filter in filters {
                query = query.filter(filter.filter());
            }
        }
        let vehicles = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;
        Ok(vehicles
            .into_iter()
            .map(|vehicle| VehicleNode { model: vehicle })
            .collect())
    }

    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<VehicleNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let vehicle = VehicleEntity::find_by_id(id).one(db).await?;
        Ok(vehicle.map(|model| VehicleNode { model }))
    }
}

pub struct VehicleNode {
    pub model: VehicleModel,
}

#[Object]
impl VehicleNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }

    async fn vehicle_number(&self) -> &str {
        &self.model.vehicle_number
    }

    async fn license_plate(&self) -> &str {
        &self.model.license_plate
    }

    async fn vehicle_type(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::OrgVehicleType {
        &self.model.vehicle_type
    }

    async fn make(&self) -> &str {
        &self.model.make
    }

    async fn model(&self) -> &str {
        &self.model.model
    }

    async fn year(&self) -> i32 {
        self.model.year
    }

    async fn capacity_weight(&self) -> Option<&sea_orm::prelude::Decimal> {
        self.model.capacity_weight.as_ref()
    }

    async fn capacity_volume(&self) -> Option<&sea_orm::prelude::Decimal> {
        self.model.capacity_volume.as_ref()
    }

    async fn status(&self) -> &crate::entities::_generated::sea_orm_active_enums::OrgVehicleStatus {
        &self.model.status
    }

    async fn created(&self) -> &sea_orm::prelude::DateTimeWithTimeZone {
        &self.model.created
    }

    async fn updated(&self) -> &sea_orm::prelude::DateTimeWithTimeZone {
        &self.model.updated
    }

    async fn department(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<DepartmentNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let department = DepartmentEntity::find()
            .filter(Expr::col(DepartmentColumn::Id).eq(self.model.department_id))
            .one(db)
            .await?;

        Ok(department.map(|model| DepartmentNode { model }))
    }

    async fn warehouse(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<WarehouseNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let warehouse = WarehouseEntity::find()
            .filter(Expr::col(WarehouseColumn::Id).eq(self.model.warehouse_id))
            .one(db)
            .await?;

        Ok(warehouse.map(|model| WarehouseNode { model }))
    }
}

#[derive(Default)]
pub struct VehiclesMutation;

#[Object]
impl VehiclesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateVehicle,
    ) -> async_graphql::Result<VehicleNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let vehicle = payload.into_active_model();
        let vehicle = vehicle.insert(db).await?;
        Ok(VehicleNode { model: vehicle })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateVehicle,
    ) -> async_graphql::Result<VehicleNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_vehicle = active_model.update(db).await?;
        Ok(VehicleNode {
            model: updated_vehicle,
        })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        VehicleEntity::delete_by_id(id).exec(db).await?;
        Ok(format!("Deleted vehicle with ID: {}", id))
    }
}
