use axum::{Router, routing::get};

mod auth;
pub mod error;
mod health;

pub fn router() -> Router {
    Router::new()
        .route("/health", get(health::health_check))
        .nest("/auth", auth::router())
}
