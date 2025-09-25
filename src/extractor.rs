use anyhow::anyhow;
use axum::http::HeaderMap;
use graphql_auth::models::{session, user};
use sqlx::PgPool;

pub fn extract_token(headers: &HeaderMap) -> anyhow::Result<&str> {
    let auth_parts = headers
        .get("Authorization")
        .ok_or(anyhow!("No Authorization Header present"))?
        .to_str()?
        .split(" ")
        .collect::<Vec<_>>();

    if auth_parts[0].to_lowercase() != "bearer" {
        return Err(anyhow!(
            "Invalid Authorization format, must be `bearer` format"
        ));
    }

    Ok(auth_parts[1])
}

pub async fn get_session(db: &PgPool, headers: &HeaderMap) -> anyhow::Result<session::Model> {
    // extract the token in the header via Authorization
    let token = extract_token(headers)?;

    // get session via token
    let session =
        sqlx::query_as::<_, session::Model>("select * from auth.session where token = $1")
            .bind(token)
            .fetch_one(db)
            .await?;

    Ok(session)
}

pub async fn get_user(db: &PgPool, session: &session::Model) -> anyhow::Result<user::Model> {
    let user = sqlx::query_as::<_, user::Model>("select * from auth.user where id = $1")
        .bind(session.user_id)
        .fetch_one(db)
        .await?;

    Ok(user)
}
