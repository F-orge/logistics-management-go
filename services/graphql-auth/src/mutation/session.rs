use async_graphql::{Context, Object, SimpleObject};
use chrono::{Duration, Utc};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{session, user};

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
        let db = ctx.data::<PgPool>()?;

        let current_session = ctx.data::<session::Model>()?;

        // update the expires at to extend one hour
        let new_session = sqlx::query_as::<_, session::Model>(
            "update auth.session set expires_at = ? where id = ?",
        )
        .bind(Utc::now() + Duration::seconds(3600))
        .bind(current_session.id)
        .fetch_one(db)
        .await?;

        let user = user::Model::one(&user::PrimaryKey(new_session.user_id), db)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find user"))?;

        Ok(RefreshSessionResponse {
            token: new_session.token,
            user,
        })
    }

    async fn revoke_session(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<RevokeSessionResponse> {
        let db = ctx.data::<PgPool>()?;

        // revoking session is setting the expires_at to utc.now - 10 seconds
        let current_session = ctx.data::<session::Model>()?;

        let revoked_session = sqlx::query_as::<_, session::Model>(
            "update auth.session set expires_at = ? where id = ? and user_id = ?",
        )
        .bind(Utc::now() - Duration::seconds(10))
        .bind(id)
        .bind(current_session.user_id)
        .fetch_one(db)
        .await;

        if revoked_session.is_ok() {
            Ok(RevokeSessionResponse {
                success: true,
                message: "Successfully revoked session".into(),
            })
        } else {
            Ok(RevokeSessionResponse {
                success: false,
                message: "Unable to revoke session".into(),
            })
        }
    }
}
