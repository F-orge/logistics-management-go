use axum::Router;
use axum_embed::ServeEmbed;
use rust_embed::RustEmbed;
use sea_orm::Database;
use sqlx::PgPool;
use tokio::net::TcpListener;

use rust_react_template::api;
use tower_http::add_extension::AddExtensionLayer;

#[derive(RustEmbed, Clone)]
#[folder = "target/frontend-dist/"]
struct Assets;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let serve_assets = ServeEmbed::<Assets>::new();

    let db_url = env!("DATABASE_URL");

    let db = PgPool::connect(db_url).await?;

    _ = sqlx::migrate!("./migrations").run(&db).await?;

    let db = Database::connect(db_url).await?;

    let api = Router::new()
        .nest("/api", api::router().layer(AddExtensionLayer::new(db)))
        .fallback_service(serve_assets);

    let (host, port) = (env!("SERVER_HOST"), env!("SERVER_PORT"));

    let listener = TcpListener::bind(format!("{host}:{port}")).await?;

    if let Err(err) = axum::serve(listener, api.into_make_service()).await {
        println!("{err}");
    }

    Ok(())
}
