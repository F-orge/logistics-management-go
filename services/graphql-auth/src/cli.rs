use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "auth-service", version, about = "Authentication serivce CLI", long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand)]
pub enum Commands {
    Serve(ServerArgs),
    Introspect,
}

#[derive(Parser, Debug)]
pub struct ServerArgs {
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

    /// Route path for graphql and playground (default: /graphql)
    #[arg(long, default_value = "/graphql")]
    pub graphql_route_path: String,

    /// Route path for graphql and playground (default: /graphql)
    #[arg(long)]
    pub enable_playground: bool,
}
