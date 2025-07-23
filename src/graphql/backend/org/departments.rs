use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::auth_users::{
    Column as AuthUsersColumn, Entity as AuthUsersEntity,
};
use crate::entities::_generated::org_department_permissions::{
    Column as DepartmentPermissionColumn, Entity as DepartmentPermissionEntity,
};
use crate::entities::_generated::org_department_transport_modes::{
    Column as DepartmentTransportModeColumn, Entity as DepartmentTransportModeEntity,
};
use crate::entities::_generated::org_department_users::{
    Column as DepartmentUserColumn, Entity as DepartmentUserEntity,
};
use crate::entities::_generated::org_departments::{
    Column as DepartmentColumn, Entity as DepartmentEntity, Model as DepartmentModel,
};
use crate::entities::org::departments::{CreateDepartment, UpdateDepartment};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::auth::AuthUsersNodes;
use crate::graphql::backend::org::department_permissions::DepartmentPermissionsNodes;
use crate::graphql::backend::org::department_transport_modes::DepartmentTransportModesNodes;
use crate::graphql::backend::org::department_users::DepartmentUsersNodes;

#[derive(Default, Clone)]
pub struct DepartmentsQuery;

#[derive(Clone)]
pub struct DepartmentsNode {
    pub model: DepartmentModel,
}

#[Object]
impl DepartmentsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<DepartmentColumn>>>,
        filter_by: Option<Vec<FilterGeneric<DepartmentColumn>>>,
    ) -> async_graphql::Result<Vec<DepartmentsNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = DepartmentEntity::find();
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
        let departments = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;
        Ok(departments
            .into_iter()
            .map(|d| DepartmentsNode { model: d })
            .collect())
    }
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<DepartmentsNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let department = DepartmentEntity::find_by_id(id).one(db).await?;
        Ok(department.map(|model| DepartmentsNode { model }))
    }
}

#[Object]
impl DepartmentsNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }

    async fn name(&self) -> &str {
        &self.model.name
    }

    async fn code(&self) -> &str {
        &self.model.code
    }

    async fn description(&self) -> Option<&str> {
        self.model.description.as_deref()
    }

    async fn department_type(&self) -> &str {
        &self.model.department_type
    }

    async fn manager(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<AuthUsersNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;

        Ok(AuthUsersEntity::find()
            .filter(sea_orm::sea_query::Expr::col(AuthUsersColumn::Id).eq(self.model.manager_id))
            .one(db)
            .await?
            .map(|user| AuthUsersNodes { model: user }))
    }

    async fn phone_number(&self) -> Option<&str> {
        self.model.phone_number.as_deref()
    }

    async fn email(&self) -> Option<&str> {
        self.model.email.as_deref()
    }

    async fn budget(&self) -> Option<&sea_orm::prelude::Decimal> {
        self.model.budget.as_ref()
    }

    async fn is_active(&self) -> bool {
        self.model.is_active
    }

    async fn created(&self) -> &sea_orm::prelude::DateTimeWithTimeZone {
        &self.model.created
    }

    async fn updated(&self) -> &sea_orm::prelude::DateTimeWithTimeZone {
        &self.model.updated
    }

    async fn users(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<DepartmentUsersNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let department_users = DepartmentUserEntity::find()
            .filter(
                sea_orm::sea_query::Expr::col(DepartmentUserColumn::DepartmentId).eq(self.model.id),
            )
            .all(db)
            .await
            .unwrap_or_default();

        Ok(department_users
            .into_iter()
            .map(|du| DepartmentUsersNodes { model: du })
            .collect())
    }

    async fn permissions(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<DepartmentPermissionsNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let department_permissions = DepartmentPermissionEntity::find()
            .filter(
                sea_orm::sea_query::Expr::col(DepartmentPermissionColumn::DepartmentId)
                    .eq(self.model.id),
            )
            .all(db)
            .await
            .unwrap_or_default();

        Ok(department_permissions
            .into_iter()
            .map(|dp| DepartmentPermissionsNodes { model: dp })
            .collect())
    }

    async fn transport_modes(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<DepartmentTransportModesNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let transport_modes = DepartmentTransportModeEntity::find()
            .filter(
                sea_orm::sea_query::Expr::col(DepartmentTransportModeColumn::DepartmentId)
                    .eq(self.model.id),
            )
            .all(db)
            .await
            .unwrap_or_default();

        Ok(transport_modes
            .into_iter()
            .map(|dtm| DepartmentTransportModesNodes { model: dtm })
            .collect())
    }
}

#[derive(Default)]
pub struct DepartmentsMutation;

#[Object]
impl DepartmentsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateDepartment,
    ) -> async_graphql::Result<DepartmentsNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let department = payload.into_active_model();
        let department = department.insert(db).await?;
        Ok(DepartmentsNode { model: department })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateDepartment,
    ) -> async_graphql::Result<DepartmentsNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_department = active_model.update(db).await?;
        Ok(DepartmentsNode {
            model: updated_department,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        DepartmentEntity::delete_by_id(id).exec(db).await?;
        Ok(format!("Deleted department with ID: {}", id))
    }
}
