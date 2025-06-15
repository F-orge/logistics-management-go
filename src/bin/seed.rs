use entity::users::CreateUserModel;
use fake::{Fake, Faker};
use sea_orm::{ActiveModelTrait, Database, IntoActiveModel};
use sqlx::PgPool;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .with(tracing_subscriber::EnvFilter::try_from_default_env()?)
        .init();

    tracing::info!("Start seeding...");

    let db_url = env!("DATABASE_URL");

    let db = PgPool::connect(db_url).await?;

    _ = sqlx::migrate!("./migrations").run(&db).await?;

    let db = Database::connect(db_url).await?;

    let test_user = CreateUserModel {
        email: "test@email.com".into(),
        name: "test user".into(),
        password: "password123".into(),
        confirm_password: "password123".into(),
    };

    if let Err(_) = test_user.into_active_model().insert(&db).await {
        tracing::warn!("Test user exists. skipping...");
    }

    // fake users
    for _ in 0..1000 {
        let user = Faker.fake::<CreateUserModel>();
        match user.into_active_model().insert(&db).await {
            Ok(model) => tracing::info!("User created {}", model.name),
            Err(_) => continue,
        };
    }

    Ok(())
}
