use axum::{Json, http::StatusCode, response::IntoResponse};
use sea_orm::DbErr;
use serde::Serialize;
use ts_rs::TS;
use validator::ValidationErrors;

#[derive(Debug, Serialize, TS)]
#[ts(export)]
pub struct APIErrorResponse {
    code: u16,
    message: String,
    #[ts(type = "unknown")]
    data: Option<serde_json::Value>,
}

#[derive(Debug)]
pub enum APIError {
    InvalidCredentials(String),
    SeaOrm(DbErr),
    Validator(ValidationErrors),
}

impl IntoResponse for APIError {
    fn into_response(self) -> axum::response::Response {
        let err = match self {
            Self::InvalidCredentials(message) => APIErrorResponse {
                code: 401,
                message,
                data: None,
            },
            Self::SeaOrm(err) => match err {
                DbErr::RecordNotFound(id) => APIErrorResponse {
                    code: 404,
                    message: format!("Record not found {id}"),
                    data: None,
                },
                _ => APIErrorResponse {
                    code: 500,
                    message: "Something went wrong".into(),
                    data: None,
                },
            },
            Self::Validator(err) => APIErrorResponse {
                code: 400,
                message: "Validation error".into(),
                data: serde_json::to_value(err).ok(),
            },
        };

        (
            StatusCode::from_u16(err.code).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR),
            Json(err),
        )
            .into_response()
    }
}

pub type APIResult<T> = Result<Json<T>, APIError>;
