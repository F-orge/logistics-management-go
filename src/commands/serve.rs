use async_graphql::{
    EmptySubscription, Schema,
    http::{GraphQLPlaygroundConfig, playground_source},
};
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{
    Router,
    extract::State,
    http::HeaderMap,
    response::{Html, IntoResponse},
    routing::{get, post},
};
use sea_orm::Database;
use tokio::net::TcpListener;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use crate::{AppState, Mutations, Query, ServeArgs};

#[axum::debug_handler]
async fn graphql_handler(
    State(state): State<AppState>,
    headers: HeaderMap,
    graphql_request: GraphQLRequest,
) -> GraphQLResponse {
    let mut request = graphql_request.into_inner();

    // todo: add user and session to the ctx data if exists

    request = request.data(headers).data(state.db);

    state.schema.execute(request).await.into()
}

async fn graphql_playground() -> impl IntoResponse {
    Html(playground_source(GraphQLPlaygroundConfig::new("/")))
}

pub async fn execute(args: ServeArgs) -> anyhow::Result<()> {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or(args.log_level.clone().into()),
        )
        .init();

    let db = Database::connect(args.database_url.clone()).await?;

    let schema = Schema::build(Query::default(), Mutations::default(), EmptySubscription).finish();

    let mut router = Router::new();

    if args.enable_playground {
        router = router.route(&args.frontend_route_path, get(graphql_playground))
    }

    router = router.route(&args.graphql_route_path, post(graphql_handler));

    let router = router.with_state(AppState { schema, db });

    let listener = TcpListener::bind(format!("{}:{}", args.host, args.port)).await?;

    Ok(axum::serve(listener, router.into_make_service()).await?)
}
