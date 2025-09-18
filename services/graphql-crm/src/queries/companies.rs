use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::companies,
    companies::{InsertCompany, UpdateCompany},
};
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;

#[Object(name = "Companies")]
impl graphql_core::traits::GraphqlQuery<companies::Model, Uuid> for companies::Entity {
    #[graphql(
        name = "companies",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep)).or(RoleGuard::new(UserRole::AccountManager)).or(RoleGuard::new(UserRole::CustomerSupportAgent))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<companies::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let companies = companies::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();

        Ok(companies)
    }

    #[graphql(
        name = "company",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep)).or(RoleGuard::new(UserRole::AccountManager)).or(RoleGuard::new(UserRole::CustomerSupportAgent))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<companies::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let company = companies::Entity::find_by_id(id).one(db).await?;

        Ok(company)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmCompanyMutations")]
impl graphql_core::traits::GraphqlMutation<companies::Model, Uuid, InsertCompany, UpdateCompany>
    for Mutations
{
    #[graphql(
        name = "createCompany",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertCompany,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let trx = db.begin().await?;

        let active_model = value.into_active_model();

        let new_company = active_model.insert(&trx).await?;

        _ = trx.commit().await?;

        Ok(new_company)
    }

    #[graphql(
        name = "updateCompany",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateCompany,
    ) -> async_graphql::Result<companies::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let trx = db.begin().await?;

        let mut active_model = value.into_active_model();

        active_model.id = Set(id);

        let updated_company = active_model.update(&trx).await?;

        _ = trx.commit().await?;

        Ok(updated_company)
    }

    #[graphql(
        name = "deleteCompany",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;

        let trx = db.begin().await?;

        let company = companies::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find company"))?;

        let result = company.delete(&trx).await?;

        _ = trx.commit().await?;

        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete company"));
        }

        Ok(true)
    }
}
