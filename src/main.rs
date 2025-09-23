use clap::Parser;
use logistics_management::{
    Cli, Commands,
    commands::{introspect, seed, serve},
};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();

    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .with(tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or("INFO".into()))
        .init();

    match cli.command {
        Commands::Serve(args) => serve::execute(args).await,
        Commands::Introspect => introspect::execute().await,
        Commands::Seed(args) => seed::execute(args).await,
    }
}
