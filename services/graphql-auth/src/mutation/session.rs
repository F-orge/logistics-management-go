use async_graphql::{Context, Object, SimpleObject};

use crate::models::user;

#[derive(Debug, Clone, SimpleObject)]
pub struct RefreshSessionResponse {
    token: String,
    user: user::Model,
}

#[derive(Debug, Clone, SimpleObject)]
pub struct RevokeSessionResponse {
    success: bool,
    message: String,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "AuthSessionMutation")]
impl Mutation {
    async fn refresh_session(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<RefreshSessionResponse> {
        todo!()
    }

    async fn revoke_session(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<RevokeSessionResponse> {
        todo!()
    }
}
