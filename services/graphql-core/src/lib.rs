use sea_orm::sqlx::PgPool;

pub mod traits;

pub struct PostgresDataLoader {
    pub pool: PgPool,
}
