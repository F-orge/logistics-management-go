use crate::entities::{
    _generated::leads,
    leads::{InsertLead, UpdateLead},
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

#[Object(name = "Leads")]
impl GraphqlQuery<leads::Model, Uuid> for leads::Entity {
    #[graphql(
        name = "leads",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep)).or(RoleGuard::new(UserRole::Sdr)).or(RoleGuard::new(UserRole::MarketingManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<leads::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let leads = leads::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(leads)
    }
    #[graphql(
        name = "lead",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep)).or(RoleGuard::new(UserRole::Sdr)).or(RoleGuard::new(UserRole::MarketingManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<leads::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let lead = leads::Entity::find_by_id(id).one(db).await?;
        Ok(lead)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmLeadMutations")]
impl GraphqlMutation<leads::Model, Uuid, InsertLead, UpdateLead> for Mutations {
    #[graphql(name = "createLead", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::Sdr))")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertLead,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_lead = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_lead)
    }
    #[graphql(name = "updateLead", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::Sdr))")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateLead,
    ) -> async_graphql::Result<leads::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_lead = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_lead)
    }
    #[graphql(name = "deleteLead", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager))")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let lead = leads::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find lead"))?;
        let result = lead.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete lead"));
        }
        Ok(true)
    }
}
