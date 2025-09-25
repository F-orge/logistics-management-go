use async_graphql::{Context, InputObject, Object, SimpleObject};
use chrono::{Duration, Utc};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{session, user};

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
        // todo: make this hashable password

        let db = ctx.data::<PgPool>()?;

        // make sure the user isn't sign in
        if ctx.data_opt::<user::Model>().is_some() || ctx.data_opt::<session::Model>().is_some() {
            return Err(async_graphql::Error::new("User already signed in"));
        }

        let user = sqlx::query_as::<_, user::Model>(
            r#"select auth.user.* from auth.user inner join auth.account on auth.user.id = auth.account.user_id where auth.user.email = $1 and auth.account.password = $2"#,
        )
        .bind(payload.email)
        .bind(payload.password)
        .fetch_optional(db)
        .await?
        .ok_or(async_graphql::Error::new("Invalid email or password"))?;

        let new_session = sqlx::query_as::<_, session::Model>(
            "insert into auth.session (token,expires_at,user_id) values ($1,$2,$3) returning *",
        )
        .bind(Uuid::new_v4())
        .bind(Utc::now() + Duration::seconds(3600))
        .bind(user.id)
        .fetch_one(db)
        .await?;

        Ok(SignInResponse {
            token: new_session.token,
            user,
        })
    }
}
