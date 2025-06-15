use entity::users::{self, CreateUserModel};
use fake::{Fake, Faker};
use sea_orm::{ActiveModelTrait, Database, EntityTrait, IntoActiveModel, sea_query::OnConflict};
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

    let mut fake_users = vec![];

    // fake users
    for _ in 0..1000 {
        let user = Faker.fake::<CreateUserModel>();
        tracing::info!("Adding {}", user.name);
        fake_users.push(user.into_active_model());
    }

    _ = users::Entity::insert_many(fake_users)
        .on_conflict(
            OnConflict::column(users::Column::Email)
                .do_nothing()
                .to_owned(),
        )
        .exec(&db)
        .await?;

    Ok(())
}
