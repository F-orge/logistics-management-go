use crate::entities::_generated::{sea_orm_active_enums::UserRole, session, user};
use async_graphql::{Context, Guard};
use chrono::Utc;

pub struct RoleGuard {
    role: UserRole,
}

impl RoleGuard {
    pub fn new(role: UserRole) -> Self {
        Self { role }
    }

    pub fn has_role(&self, ctx: &Context<'_>) -> bool {
        let current_user = match ctx.data::<user::Model>() {
            Ok(user) => user,
            Err(_) => return false,
        };

        current_user.role == Some(self.role)
    }
}

impl Guard for RoleGuard {
    async fn check(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<()> {
        let current_user = ctx.data::<user::Model>()?;

        // if user has a `developer` role. skip the check
        if current_user.role == Some(UserRole::Developer) {
            return Ok(());
        }

        if current_user.role == Some(self.role) {
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

pub struct SystemGuard;

impl Guard for SystemGuard {
    async fn check(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<()> {
        // SystemGuard allows actions performed by an automated system user.
        // We treat a session with `impersonated_by` set (or a special system user id)
        // as a system action. For now, require either the current user role == Developer
        // or the session.impersonated_by is Some(_) (i.e., an impersonation token).
        let current_user = match ctx.data::<user::Model>() {
            Ok(user) => user,
            Err(_) => return Err("Forbidden".into()),
        };

        // Allow Developer role to act as system
        if current_user.role == Some(UserRole::Developer) {
            return Ok(());
        }

        // Check session for impersonation which we consider a system-level action
        let session = match ctx.data::<session::Model>() {
            Ok(s) => s,
            Err(_) => return Err("Forbidden".into()),
        };

        if session.impersonated_by.is_some() {
            return Ok(());
        }

        Err("Forbidden".into())
    }
}
