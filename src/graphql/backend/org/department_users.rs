use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel, LoaderTrait,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::auth_users::{Entity as AuthUsers, Model as AuthUsersModel};
use crate::entities::_generated::org_department_users::{
    Column as DepartmentUserColumn, Entity as DepartmentUserEntity, Model as DepartmentUserModel,
};
use crate::entities::_generated::prelude::{
    OrgDepartmentPermissions, OrgDepartmentUserPermissions,
};
use crate::entities::org::department_users::{CreateDepartmentUser, UpdateDepartmentUser};
use crate::entities::{FilterOperator, SortOrder};
use crate::graphql::backend::auth::AuthUsersNodes;
use crate::graphql::backend::org::department_permissions::DepartmentPermissionsNodes;

#[derive(Debug, Clone, InputObject)]
pub struct DepartmentUsersSort {
    pub column: DepartmentUserColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct DepartmentUserFilter {
    pub column: DepartmentUserColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct DepartmentUsersNodes {
    pub model: DepartmentUserModel,
}

#[Object]
impl DepartmentUsersNodes {
    async fn data(&self) -> DepartmentUserModel {
        self.model.clone()
    }

    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<AuthUsersNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let user = AuthUsers::find_by_id(self.model.user_id).one(db).await?;
        Ok(user.map(|u| AuthUsersNodes { model: u }))
    }

    async fn permissions(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<DepartmentPermissionsNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let department_user_permissions = OrgDepartmentUserPermissions::find()
            .filter(
                sea_orm::sea_query::Expr::col(DepartmentUserColumn::UserId).eq(self.model.user_id),
            )
            .all(db)
            .await?;

        let permissions = department_user_permissions
            .load_one(OrgDepartmentPermissions, db)
            .await?;

        Ok(permissions
            .into_iter()
            .flatten()
            .map(|permission| DepartmentPermissionsNodes { model: permission })
            .collect())
    }
}

#[derive(Default)]
pub struct DepartmentUsersMutation;

#[Object]
impl DepartmentUsersMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateDepartmentUser,
    ) -> async_graphql::Result<DepartmentUsersNodes> {
        let db = ctx.data::<DatabaseConnection>()?;
        let department_user = payload.into_active_model();
        let department_user = department_user.insert(db).await?;
        Ok(DepartmentUsersNodes {
            model: department_user,
        })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateDepartmentUser,
    ) -> async_graphql::Result<DepartmentUsersNodes> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_department_user = active_model.update(db).await?;
        Ok(DepartmentUsersNodes {
            model: updated_department_user,
        })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        DepartmentUserEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete department user: {}", e))?;
        Ok(format!("Deleted department user with ID: {}", id))
    }
}
