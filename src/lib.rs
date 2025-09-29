use async_graphql::{EmptySubscription, Schema, SimpleObject};
use clap::{Parser, Subcommand};
use sqlx::PgPool;

use graphql_auth::guards::RequireSession;

pub mod commands;
pub mod extractor;

type GraphQLSchema = Schema<Query, Mutations, EmptySubscription>;

#[derive(Debug, SimpleObject, Default)]
pub struct Query {
    auth: graphql_auth::Query,
    #[graphql(guard = RequireSession)]
    crm: graphql_crm::Query,
    #[graphql(guard = RequireSession)]
    tms: graphql_tms::Query,
    #[graphql(guard = RequireSession)]
    wms: graphql_wms::Query,
    #[graphql(guard = RequireSession)]
    dms: graphql_dms::Query,
    #[graphql(guard = RequireSession)]
    billing: graphql_billing::Query,
}

#[derive(Debug, SimpleObject, Default)]
pub struct Mutations {
    auth: graphql_auth::Mutation,
    #[graphql(guard = RequireSession)]
    crm: graphql_crm::Mutation,
    #[graphql(guard = RequireSession)]
    tms: graphql_tms::Mutation,
    #[graphql(guard = RequireSession)]
    wms: graphql_wms::Mutation,
    #[graphql(guard = RequireSession)]
    dms: graphql_dms::Mutation,
    #[graphql(guard = RequireSession)]
    billing: graphql_billing::Mutation,
}

#[derive(Parser)]
#[command(name = "logistics-cli", version, about = "Logistics Management CLI", long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand)]

pub enum Commands {
    /// Start the server
    Serve(ServeArgs),
    /// Introspect the schema
    Introspect,
    /// Seed the database
    Seed(SeedArgs),
}

#[derive(Parser, Debug)]
pub struct SeedArgs {
    /// Database connection URL
    #[arg(long)]
    pub database_url: String,
}

#[derive(Parser, Debug)]
pub struct ServeArgs {
    /// Host address to bind (default: 127.0.0.1)
    #[arg(long, default_value = "127.0.0.1")]
    pub host: String,

    /// Port to bind (default: 8080)
    #[arg(long, default_value_t = 8080)]
    pub port: u16,

    /// Database connection URL
    #[arg(long)]
    pub database_url: String,

    /// Log level (default: info)
    #[arg(long, default_value = "info")]
    pub log_level: String,

    /// Directory for frontend assets
    #[arg(long)]
    pub frontend_dir: Option<String>,

    /// Route path for frontend (default: /)
    #[arg(long, default_value = "/")]
    pub frontend_route_path: String,

    /// Route path for graphql and playground (default: /graphql)
    #[arg(long, default_value = "/graphql")]
    pub graphql_route_path: String,

    /// Route path for graphql and playground (default: /graphql)
    #[arg(long)]
    pub enable_playground: bool,
}

#[derive(Clone)]
pub struct AppState {
    schema: GraphQLSchema,
    db: PgPool,
}
