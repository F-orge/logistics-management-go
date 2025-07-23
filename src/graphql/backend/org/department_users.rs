use async_graphql::{Context, Object};
use sea_orm::{ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel};
use uuid::Uuid;

use crate::entities::_generated::auth_users::Entity as AuthUsers;
use crate::entities::_generated::{
    org_department_users::{Entity as DepartmentUserEntity, Model as DepartmentUserModel},
    org_departments::Entity as OrgDepartmentEntity,
};
use crate::entities::org::department_users::{CreateDepartmentUser, UpdateDepartmentUser};
use crate::graphql::backend::auth::AuthUsersNodes;
use crate::graphql::backend::org::departments::DepartmentNode;

pub struct DepartmentUsersNodes {
    pub model: DepartmentUserModel,
}

#[Object]
impl DepartmentUsersNodes {
    async fn data(&self) -> DepartmentUserModel {
        self.model.clone()
    }

    async fn role(&self) -> &str {
        &self.model.role
    }

    async fn assigned_date(&self) -> chrono::NaiveDate {
        self.model.assigned_date
    }

    async fn is_active(&self) -> bool {
        self.model.is_active
    }

    async fn department(&self, ctx: &Context<'_>) -> async_graphql::Result<DepartmentNode> {
        let db = ctx.data::<DatabaseConnection>()?;

        let department = OrgDepartmentEntity::find_by_id(self.model.department_id)
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Department not found"))?;

        Ok(DepartmentNode { model: department })
    }

    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<AuthUsersNodes>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let user = AuthUsers::find_by_id(self.model.user_id).one(db).await?;
        Ok(user.map(|u| AuthUsersNodes { model: u }))
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
