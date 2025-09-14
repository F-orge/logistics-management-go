use async_graphql::{EmptySubscription, Schema, SimpleObject, http::GraphiQLSource};
use async_graphql_axum::GraphQL;
use axum::{Router, response, routing::get};
use sea_orm::Database;
use tokio::net::TcpListener;

#[derive(Debug, SimpleObject, Default)]
struct Query {
    auth: graphql_auth::Query,
    crm: graphql_crm::Query,
    ims: graphql_ims::Query,
    tms: graphql_tms::Query,
    wms: graphql_wms::Query,
    dms: graphql_dms::Query,
}

#[derive(Debug, SimpleObject, Default)]
struct Mutations {
    auth: graphql_auth::Mutation,
    crm: graphql_crm::Mutation,
    ims: graphql_ims::Mutation,
    tms: graphql_tms::Mutation,
    wms: graphql_wms::Mutation,
    dms: graphql_dms::Mutation,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let db_url = std::env::var("DATABASE_URL")?;

    let db = Database::connect(db_url).await?;

    let graphql_schema = Schema::build(Query::default(), Mutations::default(), EmptySubscription)
        .data(db)
        .finish();

    let router = Router::new().route(
        "/",
        get(|| async move { response::Html(GraphiQLSource::build().endpoint("/").finish()) })
            .post_service(GraphQL::new(graphql_schema)),
    );

    let listener = TcpListener::bind("0.0.0.0:8000").await?;

    axum::serve(listener, router.into_make_service()).await?;

    Ok(())
}
