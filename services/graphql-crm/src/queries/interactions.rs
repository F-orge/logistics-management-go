use crate::entities::{
    _generated::interactions,
    interactions::{InsertInteraction, UpdateInteraction},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Interactions")]
impl graphql_core::traits::GraphqlQuery<interactions::Model, Uuid> for interactions::Entity {
    #[graphql(name = "interactions")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<interactions::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let interactions = interactions::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(interactions)
    }
    #[graphql(name = "interaction")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<interactions::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let interaction = interactions::Entity::find_by_id(id).one(db).await?;
        Ok(interaction)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmInteractionMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        interactions::Model,
        Uuid,
        InsertInteraction,
        UpdateInteraction,
    > for Mutations
{
    #[graphql(name = "createInteraction")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertInteraction,
    ) -> async_graphql::Result<interactions::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_interaction = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_interaction)
    }
    #[graphql(name = "updateInteraction")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateInteraction,
    ) -> async_graphql::Result<interactions::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_interaction = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_interaction)
    }
    #[graphql(name = "deleteInteraction")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let interaction = interactions::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find interaction"))?;
        let result = interaction.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete interaction"));
        }
        Ok(true)
    }
}
