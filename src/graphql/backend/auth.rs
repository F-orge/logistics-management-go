use crate::entities::_generated::auth_users::{
    Column as AuthUserColumn, Entity as AuthUserEntity, Model as AuthUsersModel,
};
use async_graphql::{Context, Object};

#[derive(Default)]
pub struct AuthQuery;

#[Object]
impl AuthQuery {
    async fn me<'ctx>(&self, ctx: &Context<'ctx>) -> String {
        // Placeholder for fetching user info
        "User info".to_string()
    }
}

pub struct AuthUsersNodes {
    pub model: AuthUsersModel,
}

#[Object]
impl AuthUsersNodes {
    async fn data(&self) -> AuthUsersModel {
        self.model.clone()
    }
}

#[derive(Default)]
pub struct AuthMutation;

#[Object]
impl AuthMutation {
    async fn login<'ctx>(&self, ctx: &Context<'ctx>, email: String, password: String) -> String {
        // Placeholder for actual login logic
        format!("Logged in as {} with password {}", email, password)
    }
}
