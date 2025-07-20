use async_graphql::{EmptySubscription, Schema, http::GraphiQLSource};
use async_graphql_axum::GraphQL;
use axum::{
    Router,
    response::{Html, IntoResponse},
};
use sea_orm::Database;
use tokio::net::TcpListener;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use crate::graphql::backend::{Mutation, Query};

mod entities;
mod graphql;

async fn graphiql() -> impl IntoResponse {
    Html(GraphiQLSource::build().endpoint("/").finish())
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .with(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let (host, port) = (env!("SERVER_HOST"), env!("SERVER_PORT"));

    let db_url = env!("DATABASE_URL");

    let db = Database::connect(db_url).await?;

    let addr = format!("{}:{}", host, port);

    let graphql_schema = Schema::build(Query::default(), Mutation::default(), EmptySubscription)
        .data(db)
        .finish();

    let router = Router::new().route(
        "/",
        axum::routing::get(graphiql).post_service(GraphQL::new(graphql_schema)),
    );

    let listener = TcpListener::bind(&addr).await?;

    tracing::info!("Server running at http://{}", addr);

    if let Err(e) = axum::serve(listener, router).await {
        tracing::error!("Server error: {}", e);
    }

    Ok(())
}
