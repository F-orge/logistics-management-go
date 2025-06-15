use axum::{Extension, Form, Json, Router, routing::post};
use chrono::Duration;
use entity::users::{AuthenticateUserModel, Column, CreateUserModel, Entity};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel, QueryFilter,
    TransactionTrait,
};
use serde::Serialize;
use ts_rs::TS;
use validator::Validate;

use crate::{
    api::error::{APIError, APIResult},
    utils::JWTClaims,
};

#[derive(Debug, Serialize, TS)]
#[ts(export)]
pub struct TokenResponse {
    token: String,
    exp: i16,
}

#[axum::debug_handler]
async fn register(
    Extension(db): Extension<DatabaseConnection>,
    Form(payload): Form<CreateUserModel>,
) -> APIResult<TokenResponse> {
    if let Err(err) = payload.validate() {
        return Err(APIError::Validator(err));
    }

    let trx = db.begin().await.map_err(|err| APIError::SeaOrm(err))?;

    let record = payload
        .into_active_model()
        .insert(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    let claims = JWTClaims::new(
        record,
        Duration::seconds(3600),
        "staging-lms.marahuyo.dev",
        "staging-lms.marahuyo.dev",
    );

    let token = claims
        .sign("secret-key")
        .map_err(|err| APIError::Anyhow(err))?;

    Ok(Json(TokenResponse { token, exp: 3600 }))
}

#[axum::debug_handler]
async fn login(
    Extension(db): Extension<DatabaseConnection>,
    Form(payload): Form<AuthenticateUserModel>,
) -> APIResult<TokenResponse> {
    if let Err(err) = payload.validate() {
        return Err(APIError::Validator(err));
    }

    let record = Entity::find()
        .filter(Column::Email.eq(payload.email))
        .one(&db)
        .await
        .map_err(|err| APIError::SeaOrm(err))?
        .ok_or(APIError::InvalidCredentials(
            "Invalid email or password".into(),
        ))?;

    if !record.verify_password(&payload.password) {
        return Err(APIError::InvalidCredentials(
            "Invalid email or password".into(),
        ));
    }

    let claims = JWTClaims::new(
        record,
        Duration::seconds(3600),
        "staging-lms.marahuyo.dev",
        "staging-lms.marahuyo.dev",
    );

    let token = claims
        .sign("secret-key")
        .map_err(|err| APIError::Anyhow(err))?;

    Ok(Json(TokenResponse { token, exp: 3600 }))
}

pub fn router() -> Router {
    Router::new()
        .route("/login", post(login))
        .route("/register", post(register))
}
