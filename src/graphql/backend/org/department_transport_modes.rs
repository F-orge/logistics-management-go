use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::org_department_transport_modes::{
    Column as DepartmentTransportModeColumn, Entity as DepartmentTransportModeEntity,
    Model as DepartmentTransportModeModel,
};
use crate::entities::org::department_transport_modes::{
    CreateDepartmentTransportMode, UpdateDepartmentTransportMode,
};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct DepartmentTransportModesSort {
    pub column: DepartmentTransportModeColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct DepartmentTransportModeFilter {
    pub column: DepartmentTransportModeColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct DepartmentTransportModesQuery {
    pub department_id: Uuid,
}

#[Object]
impl DepartmentTransportModesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<DepartmentTransportModesSort>>,
        filter_by: Option<Vec<DepartmentTransportModeFilter>>,
    ) -> async_graphql::Result<Vec<DepartmentTransportModesNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = DepartmentTransportModeEntity::find().filter(
            sea_orm::sea_query::Expr::col(DepartmentTransportModeColumn::DepartmentId)
                .eq(self.department_id),
        );
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
        let department_transport_modes = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;
        Ok(department_transport_modes
            .into_iter()
            .map(|dtm| DepartmentTransportModesNodes { model: dtm })
            .collect())
    }
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<DepartmentTransportModesNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let department_transport_mode = DepartmentTransportModeEntity::find_by_id(id)
            .one(db)
            .await?;
        Ok(department_transport_mode.map(|model| DepartmentTransportModesNodes { model }))
    }
}

pub struct DepartmentTransportModesNodes {
    pub model: DepartmentTransportModeModel,
}

#[Object]
impl DepartmentTransportModesNodes {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn department_id(&self) -> Uuid {
        self.model.department_id
    }
    async fn transport_mode(&self) -> &str {
        &self.model.transport_mode
    }
    async fn is_primary(&self) -> bool {
        self.model.is_primary
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct DepartmentTransportModesMutation;

#[Object]
impl DepartmentTransportModesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateDepartmentTransportMode,
    ) -> async_graphql::Result<DepartmentTransportModesNodes> {
        let db = ctx.data::<DatabaseConnection>()?;
        let department_transport_mode = payload.into_active_model();
        let department_transport_mode = department_transport_mode.insert(db).await?;
        Ok(DepartmentTransportModesNodes {
            model: department_transport_mode,
        })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateDepartmentTransportMode,
    ) -> async_graphql::Result<DepartmentTransportModesNodes> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_department_transport_mode = active_model.update(db).await?;
        Ok(DepartmentTransportModesNodes {
            model: updated_department_transport_mode,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        DepartmentTransportModeEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete department transport mode: {}", e))?;
        Ok(format!("Deleted department transport mode with ID: {}", id))
    }
}
