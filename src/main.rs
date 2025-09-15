use clap::Parser;
use logistics_management::{
    Cli, Commands,
    commands::{introspect, seed, serve},
};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();
    match cli.command {
        Commands::Serve(args) => serve::execute(args).await,
        Commands::Introspect(args) => introspect::execute(args).await,
        Commands::Seed(args) => seed::execute(args).await,
    }
}
