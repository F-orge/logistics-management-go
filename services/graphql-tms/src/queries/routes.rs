use crate::entities::{
    _generated::routes,
    routes::{InsertRoute, UpdateRoute},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Routes")]
impl graphql_core::traits::GraphqlQuery<routes::Model, Uuid> for routes::Entity {
    #[graphql(name = "routes")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<routes::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let routes = routes::Entity::find().all(db).await.unwrap_or_default();
        Ok(routes)
    }
    #[graphql(name = "route")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<routes::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let route = routes::Entity::find_by_id(id).one(db).await?;
        Ok(route)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsRouteMutations")]
impl graphql_core::traits::GraphqlMutation<routes::Model, Uuid, InsertRoute, UpdateRoute>
    for Mutations
{
    #[graphql(name = "createRoute")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertRoute,
    ) -> async_graphql::Result<routes::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_route = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_route)
    }
    #[graphql(name = "updateRoute")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateRoute,
    ) -> async_graphql::Result<routes::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_route = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_route)
    }
    #[graphql(name = "deleteRoute")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let route = routes::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find route"))?;
        let result = route.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete route"));
        }
        Ok(true)
    }
}
