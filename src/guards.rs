use async_graphql::Guard;
use chrono::Utc;
use graphql_auth::entities::_generated::session;

pub struct RequireSession;

impl Guard for RequireSession {
    async fn check(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<()> {
        let session = match ctx.data::<session::Model>() {
            Ok(session) => session,
            Err(_) => return Err("Forbidden".into()),
        };

        if session.expires_at < Utc::now().naive_utc() {
            return Err("Session expired".into());
        }

        Ok(())
    }
}
