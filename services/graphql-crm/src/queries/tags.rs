use crate::entities::{
    _generated::tags,
    tags::{InsertTag, UpdateTag},
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

#[Object(name = "Tags")]
impl GraphqlQuery<tags::Model, Uuid> for tags::Entity {
    #[graphql(
        name = "tags",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<tags::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let tags = tags::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(tags)
    }
    #[graphql(
        name = "tag",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<tags::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let tag = tags::Entity::find_by_id(id).one(db).await?;
        Ok(tag)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmTagMutations")]
impl GraphqlMutation<tags::Model, Uuid, InsertTag, UpdateTag> for Mutations {
    #[graphql(
        name = "createTag",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertTag,
    ) -> async_graphql::Result<tags::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_tag = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_tag)
    }
    #[graphql(
        name = "updateTag",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateTag,
    ) -> async_graphql::Result<tags::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_tag = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_tag)
    }
    #[graphql(
        name = "deleteTag",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let tag = tags::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find tag"))?;
        let result = tag.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete tag"));
        }
        Ok(true)
    }
}
