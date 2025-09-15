use async_graphql::{EmptySubscription, Schema, SimpleObject};
use clap::{Parser, Subcommand};
use sea_orm::DatabaseConnection;
pub mod commands;

type GraphQLSchema = Schema<Query, Mutations, EmptySubscription>;

#[derive(Debug, SimpleObject, Default)]
pub struct Query {
    auth: graphql_auth::Query,
    crm: graphql_crm::Query,
    ims: graphql_ims::Query,
    tms: graphql_tms::Query,
    wms: graphql_wms::Query,
    dms: graphql_dms::Query,
    billing: graphql_billing::Query,
}

#[derive(Debug, SimpleObject, Default)]
pub struct Mutations {
    auth: graphql_auth::Mutation,
    crm: graphql_crm::Mutation,
    ims: graphql_ims::Mutation,
    tms: graphql_tms::Mutation,
    wms: graphql_wms::Mutation,
    dms: graphql_dms::Mutation,
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
    Introspect(IntrospectArgs),
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

#[derive(Parser, Debug)]
pub struct IntrospectArgs {
    /// Database connection URL
    #[arg(long)]
    pub database_url: String,
}

#[derive(Clone)]
pub struct AppState {
    schema: GraphQLSchema,
    db: DatabaseConnection,
}
