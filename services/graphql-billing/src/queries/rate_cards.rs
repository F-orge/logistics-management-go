use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_auth::models::user::UserRole;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::rate_cards,
    rate_cards::{InsertRateCard, UpdateRateCard},
};

#[Object(name = "RateCards")]
impl graphql_core::traits::GraphqlQuery<rate_cards::Model, Uuid> for rate_cards::Entity {
    #[graphql(
        name = "rateCards",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::PricingAnalyst)).or(RoleGuard::new(UserRole::AccountManager)).or(RoleGuard::new(UserRole::FinanceManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<rate_cards::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = rate_cards::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(
        name = "rateCard",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::PricingAnalyst)).or(RoleGuard::new(UserRole::AccountManager)).or(RoleGuard::new(UserRole::FinanceManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<rate_cards::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = rate_cards::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "BillingRateCardMutations")]
impl graphql_core::traits::GraphqlMutation<rate_cards::Model, Uuid, InsertRateCard, UpdateRateCard>
    for Mutations
{
    #[graphql(
        name = "createRateCard",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::PricingAnalyst))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertRateCard,
    ) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(
        name = "updateRateCard",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::PricingAnalyst))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateRateCard,
    ) -> async_graphql::Result<rate_cards::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(
        name = "deleteRateCard",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::PricingAnalyst))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = rate_cards::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find rate_card"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete rate_card"));
        }
        Ok(true)
    }
}
