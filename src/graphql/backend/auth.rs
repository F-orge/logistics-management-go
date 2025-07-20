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

#[derive(Default)]
pub struct AuthMutation;

#[Object]
impl AuthMutation {
    async fn login<'ctx>(&self, ctx: &Context<'ctx>, email: String, password: String) -> String {
        // Placeholder for actual login logic
        format!("Logged in as {} with password {}", email, password)
    }
}
