use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::notifications;

#[derive(Debug, Clone, InputObject)]
pub struct CreateNotificationInput {
    pub user_id: Uuid,
    pub message: String,
    pub is_read: Option<bool>,
    pub link: Option<String>,
}

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmNotificationsMutations")]
impl Mutation {
    async fn create_notification(
        &self,
        ctx: &Context<'_>,
        payload: CreateNotificationInput,
    ) -> async_graphql::Result<notifications::Model> {
        todo!()
    }
    async fn update_notification_user_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        user_id: Uuid,
    ) -> async_graphql::Result<notifications::Model> {
        todo!()
    }
    async fn update_notification_message(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        message: String,
    ) -> async_graphql::Result<notifications::Model> {
        todo!()
    }
    async fn update_notification_is_read(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        is_read: Option<bool>,
    ) -> async_graphql::Result<notifications::Model> {
        todo!()
    }
    async fn update_notification_link(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        link: Option<String>,
    ) -> async_graphql::Result<notifications::Model> {
        todo!()
    }
    async fn remove_notification(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        todo!()
    }
}
