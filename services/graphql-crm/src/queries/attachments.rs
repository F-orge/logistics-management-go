use crate::entities::{
    _generated::attachments,
    attachments::{InsertAttachment, UpdateAttachment},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Attachments")]
impl graphql_core::traits::GraphqlQuery<attachments::Model, Uuid> for attachments::Entity {
    #[graphql(name = "attachments")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<attachments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let attachments = attachments::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(attachments)
    }
    #[graphql(name = "attachment")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<attachments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let attachment = attachments::Entity::find_by_id(id).one(db).await?;
        Ok(attachment)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmAttachmentMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        attachments::Model,
        Uuid,
        InsertAttachment,
        UpdateAttachment,
    > for Mutations
{
    #[graphql(name = "createAttachment")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertAttachment,
    ) -> async_graphql::Result<attachments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_attachment = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_attachment)
    }
    #[graphql(name = "updateAttachment")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateAttachment,
    ) -> async_graphql::Result<attachments::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_attachment = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_attachment)
    }
    #[graphql(name = "deleteAttachment")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let attachment = attachments::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find attachment"))?;
        let result = attachment.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete attachment"));
        }
        Ok(true)
    }
}
