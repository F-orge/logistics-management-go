use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::surcharges,
    surcharges::{InsertSurcharge, UpdateSurcharge},
};

#[Object(name = "Surcharges")]
impl graphql_core::traits::GraphqlQuery<surcharges::Model, Uuid> for surcharges::Entity {
    #[graphql(name = "surcharges", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::PricingAnalyst)).or(RoleGuard::new(UserRole::AccountManager)).or(RoleGuard::new(UserRole::FinanceManager))")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<surcharges::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = surcharges::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "surcharge", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::PricingAnalyst)).or(RoleGuard::new(UserRole::AccountManager)).or(RoleGuard::new(UserRole::FinanceManager))")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<surcharges::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = surcharges::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "BillingSurchargeMutations")]
impl
    graphql_core::traits::GraphqlMutation<surcharges::Model, Uuid, InsertSurcharge, UpdateSurcharge>
    for Mutations
{
    #[graphql(name = "createSurcharge", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::PricingAnalyst))")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertSurcharge,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateSurcharge", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::PricingAnalyst))")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateSurcharge,
    ) -> async_graphql::Result<surcharges::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteSurcharge", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::PricingAnalyst))")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = surcharges::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find surcharge"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete surcharge"));
        }
        Ok(true)
    }
}
