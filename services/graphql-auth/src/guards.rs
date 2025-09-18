use crate::entities::_generated::{session, user};
use async_graphql::{Context, Guard};
use chrono::Utc;

#[derive(Eq, PartialEq, Copy, Clone)]
pub enum Roles {
    Admin,
    Developer,
}

impl ToString for Roles {
    fn to_string(&self) -> String {
        match self {
            Self::Admin => "admin".into(),
            Self::Developer => "developer".into(),
        }
    }
}

pub struct RoleGuard {
    role: Roles,
}

impl RoleGuard {
    pub fn new(role: Roles) -> Self {
        Self { role }
    }
}

impl Guard for RoleGuard {
    async fn check(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<()> {
        let current_user = ctx.data::<user::Model>()?;

        if current_user.role == Some(self.role.to_string()) {
            Ok(())
        } else {
            Err("Forbidden".into())
        }
    }
}

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
