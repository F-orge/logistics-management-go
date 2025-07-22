use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::org_departments::Entity as DepartmentEntity;
use crate::entities::_generated::org_vehicles::{
    Column as VehicleColumn, Entity as VehicleEntity, Model as VehicleModel,
};
use crate::entities::org::vehicles::{CreateVehicle, UpdateVehicle};
use crate::entities::{FilterOperator, SortOrder};
use crate::graphql::backend::org::departments::DepartmentsNode;

#[derive(Debug, Clone, InputObject)]
pub struct VehiclesSort {
    pub column: VehicleColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct VehicleFilter {
    pub column: VehicleColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct VehiclesQuery;

#[Object]
impl VehiclesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<VehiclesSort>>,
        filter_by: Option<Vec<VehicleFilter>>,
    ) -> async_graphql::Result<Vec<VehicleNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = VehicleEntity::find();
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let order = match sort.order {
                    SortOrder::Asc => sea_orm::Order::Asc,
                    SortOrder::Desc => sea_orm::Order::Desc,
                };
                query = query.order_by(sort.column, order);
            }
        }
        if let Some(filters) = filter_by {
            for filter in filters {
                query = match filter.operator {
                    FilterOperator::Equals => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .eq(filter.value.clone()),
                    ),
                    FilterOperator::Contains => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("%{}%", filter.value)),
                    ),
                    FilterOperator::StartsWith => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("{}%", filter.value)),
                    ),
                    FilterOperator::EndsWith => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("%{}", filter.value)),
                    ),
                };
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

    async fn department(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<DepartmentsNode>> {
        // TODO: Use DataLoader for department lookup to avoid N+1 queries
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(dept_id) = self.model.department_id {
            let department = DepartmentEntity::find_by_id(dept_id).one(db).await?;
            Ok(department.map(|model| DepartmentsNode { model }))
        } else {
            Ok(None)
        }
    }

    async fn warehouse(&self) -> Option<String> {
        Some("implement later".into())
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
