use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::rate_rules,
    rate_rules::{InsertRateRule, UpdateRateRule},
};

#[Object(name = "RateRules")]
impl graphql_core::traits::GraphqlQuery<rate_rules::Model, Uuid> for rate_rules::Entity {
    #[graphql(name = "rateRules")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<rate_rules::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = rate_rules::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "rateRule")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<rate_rules::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = rate_rules::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "BillingRateRuleMutations")]
impl graphql_core::traits::GraphqlMutation<rate_rules::Model, Uuid, InsertRateRule, UpdateRateRule>
    for Mutations
{
    #[graphql(name = "createRateRule")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertRateRule,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateRateRule")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateRateRule,
    ) -> async_graphql::Result<rate_rules::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteRateRule")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = rate_rules::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find rate_rule"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete rate_rule"));
        }
        Ok(true)
    }
}
