use axum::Json;
use serde::Serialize;
use ts_rs::TS;

#[derive(Debug, Serialize, Clone, TS)]
#[ts(export)]
pub struct HealthCheckResponse {
    code: i16,
    message: String,
}

#[axum::debug_handler]
pub async fn health_check() -> Json<HealthCheckResponse> {
    Json(HealthCheckResponse {
        code: 200,
        message: "Server healthy".into(),
    })
}
