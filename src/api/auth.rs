use axum::{Extension, Form, Json, Router, routing::post};
use entity::users::{AuthenticateUserModel, Column, CreateUserModel, Entity};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel, QueryFilter,
    TransactionTrait,
};
use serde::Serialize;
use ts_rs::TS;
use validator::Validate;

use crate::api::error::{APIError, APIResult};

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

    // todo: validate

    let _ = payload
        .into_active_model()
        .insert(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    let token = "random-token";

    Ok(Json(TokenResponse {
        token: token.into(),
        exp: 3600,
    }))
}

#[axum::debug_handler]
async fn login(
    Extension(db): Extension<DatabaseConnection>,
    Form(payload): Form<AuthenticateUserModel>,
) -> APIResult<TokenResponse> {
    if let Err(err) = payload.validate() {
        return Err(APIError::Validator(err));
    }

    let model = Entity::find()
        .filter(Column::Email.eq(payload.email))
        .one(&db)
        .await
        .map_err(|err| APIError::SeaOrm(err))?
        .ok_or(APIError::InvalidCredentials(
            "Invalid email or password".into(),
        ))?;

    if !model.verify_password(&payload.password) {
        return Err(APIError::InvalidCredentials(
            "Invalid email or password".into(),
        ));
    }

    // todo: implement jwt
    let token = "random-token";

    Ok(Json(TokenResponse {
        token: token.into(),
        exp: 3600,
    }))
}

pub fn router() -> Router {
    Router::new()
        .route("/login", post(login))
        .route("/register", post(register))
}
