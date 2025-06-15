use axum::{Router, routing::get};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

mod auth;
pub mod error;
mod health;
mod rbac;

pub fn router() -> Router {
    Router::new()
        .route("/health", get(health::health_check))
        .nest("/auth", auth::router())
        .nest("/security", rbac::router())
}

#[derive(Debug, Deserialize, TS)]
#[ts(export)]
#[ts(optional_fields)]
pub struct PaginateQuery {
    pub page: Option<u64>,
    pub limit: Option<u64>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export)]
pub struct ListResult<T> {
    pub total: usize,
    pub items: Vec<T>,
}
