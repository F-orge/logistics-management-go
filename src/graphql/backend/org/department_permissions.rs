use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel, LoaderTrait,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::org_department_permissions::{
    Column as DepartmentPermissionColumn, Entity as DepartmentPermissionEntity,
    Model as DepartmentPermissionModel,
};
use crate::entities::_generated::org_department_user_permissions::{
    Column as DepartmentUserPermissionColumn, Entity as DepartmentUserPermissionEntity,
};
use crate::entities::_generated::prelude::{AuthUsers, OrgDepartments};
use crate::entities::org::department_permissions::{
    CreateDepartmentPermission, UpdateDepartmentPermission,
};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::auth::AuthUsersNodes;
use crate::graphql::backend::org::departments::DepartmentsNode;

pub struct DepartmentPermissionsQuery {
    pub department_id: Uuid,
}

#[Object]
impl DepartmentPermissionsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<DepartmentPermissionColumn>>>,
        filter_by: Option<Vec<FilterGeneric<DepartmentPermissionColumn>>>,
    ) -> async_graphql::Result<Vec<DepartmentPermissionsNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = DepartmentPermissionEntity::find().filter(
            sea_orm::sea_query::Expr::col(DepartmentPermissionColumn::DepartmentId)
                .eq(self.department_id),
        );

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

        let department_permissions = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;

        Ok(department_permissions
            .into_iter()
            .map(|dp| DepartmentPermissionsNodes { model: dp })
            .collect())
    }

    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<DepartmentPermissionModel>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let department_permission = DepartmentPermissionEntity::find_by_id(id).one(db).await?;
        Ok(department_permission)
    }
}

pub struct DepartmentPermissionsNodes {
    pub model: DepartmentPermissionModel,
}

#[Object]
impl DepartmentPermissionsNodes {
    async fn id(&self) -> Uuid {
        self.model.id
    }

    async fn department(&self, ctx: &Context<'_>) -> async_graphql::Result<DepartmentsNode> {
        let db = ctx.data::<DatabaseConnection>()?;

        let department = OrgDepartments::find_by_id(self.model.department_id)
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Department not found"))?;

        Ok(DepartmentsNode { model: department })
    }

    async fn resource(&self) -> &str {
        &self.model.resource
    }

    async fn action(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::OrgPermissionStatus {
        &self.model.action
    }

    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }

    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }

    async fn users(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<AuthUsersNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let department_user_permissions = DepartmentUserPermissionEntity::find()
            .filter(
                sea_orm::sea_query::Expr::col(DepartmentUserPermissionColumn::PermissionId)
                    .eq(self.model.id),
            )
            .all(db)
            .await?;
        let users = department_user_permissions.load_one(AuthUsers, db).await?;
        Ok(users
            .into_iter()
            .flatten()
            .map(|user| AuthUsersNodes { model: user })
            .collect())
    }
}

#[derive(Default)]
pub struct DepartmentPermissionsMutation;

#[Object]
impl DepartmentPermissionsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateDepartmentPermission,
    ) -> async_graphql::Result<DepartmentPermissionModel> {
        let db = ctx.data::<DatabaseConnection>()?;
        let department_permission = payload.into_active_model();
        let department_permission = department_permission.insert(db).await?;
        Ok(department_permission)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateDepartmentPermission,
    ) -> async_graphql::Result<DepartmentPermissionModel> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_department_permission = active_model.update(db).await?;
        Ok(updated_department_permission)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        DepartmentPermissionEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete department permission: {}", e))?;
        Ok(format!("Deleted department permission with ID: {}", id))
    }
}
