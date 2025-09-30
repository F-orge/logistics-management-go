use clap::Parser;

use crate::cli::Cli;

mod cli;
mod commands;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();

    match cli.command {
        cli::Commands::Introspect => commands::introspect::execute().await?,
        cli::Commands::Serve(args) => commands::serve::execute(&args).await?,
    }

    Ok(())
}
