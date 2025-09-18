use crate::entities::{
    _generated::opportunities,
    opportunities::{InsertOpportunity, UpdateOpportunity},
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

#[Object(name = "Opportunities")]
impl GraphqlQuery<opportunities::Model, Uuid> for opportunities::Entity {
    #[graphql(
        name = "opportunities",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep)).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<opportunities::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let opportunities = opportunities::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(opportunities)
    }
    #[graphql(
        name = "opportunity",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep)).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<opportunities::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let opportunity = opportunities::Entity::find_by_id(id).one(db).await?;
        Ok(opportunity)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmOpportunityMutations")]
impl GraphqlMutation<opportunities::Model, Uuid, InsertOpportunity, UpdateOpportunity>
    for Mutations
{
    #[graphql(name = "createOpportunity", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertOpportunity,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_opportunity = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_opportunity)
    }
    #[graphql(name = "updateOpportunity", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateOpportunity,
    ) -> async_graphql::Result<opportunities::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_opportunity = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_opportunity)
    }
    #[graphql(name = "deleteOpportunity", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager))")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let opportunity = opportunities::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find opportunity"))?;
        let result = opportunity.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete opportunity"));
        }
        Ok(true)
    }
}
