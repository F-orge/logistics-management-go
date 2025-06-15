use entity::{
    _generated::sea_orm_active_enums::TablePermissionEnum,
    role_permissions::{self, CreateRolePermissionModel},
    roles::{self, CreateRoleModel},
    users::{self, CreateUserModel},
};
use fake::{Fake, Faker};
use sea_orm::{
    ActiveModelTrait, ActiveValue, Database, EntityTrait, IntoActiveModel, sea_query::OnConflict,
};
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

    let mut batch_insert_roles = vec![];

    for _ in 0..100 {
        let role = Faker.fake::<CreateRoleModel>();
        batch_insert_roles.push(role.into_active_model());
    }

    let roles = roles::Entity::insert_many(batch_insert_roles)
        .on_conflict(
            OnConflict::column(roles::Column::Name)
                .do_nothing()
                .to_owned(),
        )
        .exec_with_returning_keys(&db)
        .await?;

    let mut batch_insert_permissions = vec![];

    for role in roles {
        let mut table_permission = CreateRolePermissionModel {
            target_table: entity::role_permissions::Tables::Users,
            permission: vec![TablePermissionEnum::Read],
        }
        .into_active_model();

        table_permission.role_id = ActiveValue::Set(role);

        batch_insert_permissions.push(table_permission);
    }

    _ = role_permissions::Entity::insert_many(batch_insert_permissions)
        .exec(&db)
        .await?;

    Ok(())
}
