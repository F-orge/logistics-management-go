use async_graphql::{Context, InputObject, Object, SimpleObject};

use crate::models::user;

#[derive(Debug, Clone, InputObject)]
pub struct SignUpEmailInput {
    name: String,
    email: String,
    password: String,
}

#[derive(Debug, Clone, SimpleObject)]
pub struct SignUpResponse {
    token: String,
    user: user::Model,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "AuthAccountMutation")]
impl Mutation {
    async fn sign_up_email(
        &self,
        ctx: &Context<'_>,
        payload: SignUpEmailInput,
    ) -> async_graphql::Result<SignUpResponse> {
        todo!()
    }
}
