use async_graphql::{Context, InputObject, Object, SimpleObject};

use crate::models::user;

#[derive(Debug, Clone, InputObject)]
pub struct SignInEmailInput {
    email: String,
    password: String,
}

#[derive(Debug, Clone, SimpleObject)]
pub struct SignInResponse {
    token: String,
    user: user::Model,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "AuthUserMutation")]
impl Mutation {
    async fn sign_in_email(
        &self,
        ctx: &Context<'_>,
        payload: SignInEmailInput,
    ) -> async_graphql::Result<SignInResponse> {
        todo!("Sign in")
    }
}
