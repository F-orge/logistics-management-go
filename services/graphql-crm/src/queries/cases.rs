use crate::entities::{
    _generated::cases,
    cases::{InsertCase, UpdateCase},
};
use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Cases")]
impl graphql_core::traits::GraphqlQuery<cases::Model, Uuid> for cases::Entity {
    #[graphql(
        name = "cases",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::CustomerSupportAgent)).or(RoleGuard::new(UserRole::SalesRep)).or(RoleGuard::new(UserRole::SalesManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<cases::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let cases = cases::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(cases)
    }
    #[graphql(
        name = "case",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::CustomerSupportAgent)).or(RoleGuard::new(UserRole::SalesRep)).or(RoleGuard::new(UserRole::SalesManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<cases::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let case = cases::Entity::find_by_id(id).one(db).await?;
        Ok(case)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmCaseMutations")]
impl graphql_core::traits::GraphqlMutation<cases::Model, Uuid, InsertCase, UpdateCase>
    for Mutations
{
    #[graphql(name = "createCase", guard = "RoleGuard::new(UserRole::CustomerSupportAgent).or(RoleGuard::new(UserRole::SalesRep))")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertCase,
    ) -> async_graphql::Result<cases::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_case = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_case)
    }
    #[graphql(name = "updateCase", guard = "RoleGuard::new(UserRole::CustomerSupportAgent).or(RoleGuard::new(UserRole::SalesRep))")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateCase,
    ) -> async_graphql::Result<cases::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_case = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_case)
    }
    #[graphql(name = "deleteCase", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::CustomerSupportAgent))")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let case = cases::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find case"))?;
        let result = case.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete case"));
        }
        Ok(true)
    }
}
