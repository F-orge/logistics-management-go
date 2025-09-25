use crate::entities::{
    _generated::taggings,
    taggings::{InsertTagging, UpdateTagging},
};
use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_auth::models::user::UserRole;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Taggings")]
impl GraphqlQuery<taggings::Model, Uuid> for taggings::Entity {
    #[graphql(
        name = "taggings",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<taggings::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let taggings = taggings::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(taggings)
    }
    #[graphql(
        name = "tagging",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<taggings::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let tagging = taggings::Entity::find_by_id(id).one(db).await?;
        Ok(tagging)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmTaggingMutations")]
impl GraphqlMutation<taggings::Model, Uuid, InsertTagging, UpdateTagging> for Mutations {
    #[graphql(
        name = "createTagging",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertTagging,
    ) -> async_graphql::Result<taggings::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_tagging = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_tagging)
    }
    #[graphql(
        name = "updateTagging",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateTagging,
    ) -> async_graphql::Result<taggings::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_tagging = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_tagging)
    }
    #[graphql(
        name = "deleteTagging",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let tagging = taggings::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find tagging"))?;
        let result = tagging.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete tagging"));
        }
        Ok(true)
    }
}
