use crate::entities::{
    _generated::putaway_rules,
    putaway_rules::{InsertPutawayRule, UpdatePutawayRule},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "PutawayRules")]
impl graphql_core::traits::GraphqlQuery<putaway_rules::Model, Uuid> for putaway_rules::Entity {
    #[graphql(name = "putawayRules")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<putaway_rules::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = putaway_rules::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "putawayRule")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<putaway_rules::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = putaway_rules::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "WmsPutawayRuleMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        putaway_rules::Model,
        Uuid,
        InsertPutawayRule,
        UpdatePutawayRule,
    > for Mutations
{
    #[graphql(name = "createPutawayRule")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertPutawayRule,
    ) -> async_graphql::Result<putaway_rules::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updatePutawayRule")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdatePutawayRule,
    ) -> async_graphql::Result<putaway_rules::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deletePutawayRule")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = putaway_rules::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find putaway_rule"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete putaway_rule"));
        }
        Ok(true)
    }
}
