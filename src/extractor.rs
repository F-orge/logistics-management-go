use anyhow::anyhow;
use axum::http::HeaderMap;
use chrono::Utc;
use graphql_auth::entities::_generated::{session, user};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

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

pub async fn get_session(
    db: &DatabaseConnection,
    headers: &HeaderMap,
) -> anyhow::Result<session::Model> {
    // extract the token in the header via Authorization
    let token = extract_token(headers)?;

    // get session via token
    let session = session::Entity::find()
        .filter(session::Column::Token.eq(token))
        .one(db)
        .await?
        .ok_or(anyhow!("Token does not exists"))?;

    Ok(session)
}

pub async fn get_user(
    db: &DatabaseConnection,
    session: &session::Model,
) -> anyhow::Result<user::Model> {
    let user = user::Entity::find()
        .filter(user::Column::Id.eq(session.user_id))
        .one(db)
        .await?
        .ok_or(anyhow!("Token does not exists"))?;

    Ok(user)
}
