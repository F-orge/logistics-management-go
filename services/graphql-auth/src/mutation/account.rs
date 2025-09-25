use async_graphql::{Context, InputObject, Object, SimpleObject};
use chrono::{Duration, Utc};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{account, session, user};

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
        let db = ctx.data::<PgPool>()?;

        let mut trx = db.begin().await?;

        let new_user = sqlx::query_as::<_, user::Model>(
            "insert into auth.users (name,email,email_verified) values (?,?,false) returning *",
        )
        .bind(payload.name)
        .bind(payload.email)
        .fetch_one(&mut *trx)
        .await?;

        let new_account = sqlx::query_as::<_, account::Model>("insert into auth.account (account_id,provider_id,user_id,password) values (?,?,?,?) returning *")
            .bind(new_user.id.clone())
            .bind(new_user.id.clone())
            .bind(new_user.id)
            .bind(payload.password)
            .fetch_one(&mut *trx)
            .await?;

        // create a new session to the new registered user
        let new_session = sqlx::query_as::<_, session::Model>(
            "insert into auth.session (token,expires_at,user_id) values (?,?,?) returning *",
        )
        .bind(Uuid::new_v4())
        .bind(Utc::now() + Duration::seconds(3600))
        .bind(new_account.user_id)
        .fetch_one(&mut *trx)
        .await?;

        _ = trx.commit().await?;

        Ok(SignUpResponse {
            token: new_session.token,
            user: new_user,
        })
    }

    #[graphql(skip)]
    async fn change_password(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }

    #[graphql(skip)]
    async fn reset_password(&self, ctx: &Context<'_>) -> async_graphql::Result<String> {
        todo!()
    }
}
