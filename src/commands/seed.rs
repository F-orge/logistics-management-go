use rand::rng;
use sqlx::PgPool;

use crate::SeedArgs;

async fn seed_auth(db: &PgPool) -> anyhow::Result<()> {
    todo!()
}

async fn seed_billing(db: &PgPool) -> anyhow::Result<()> {
    todo!()
}

async fn seed_crm(db: &PgPool) -> anyhow::Result<()> {
    todo!()
}

async fn seed_dms(db: &PgPool) -> anyhow::Result<()> {
    todo!()
}

async fn seed_tms(db: &PgPool) -> anyhow::Result<()> {
    todo!()
}

async fn seed_wms(db: &PgPool) -> anyhow::Result<()> {
    todo!()
}

pub async fn execute(args: SeedArgs) -> anyhow::Result<()> {
    let db = PgPool::connect(&args.database_url).await?;

    seed_auth(&db).await?;
    seed_crm(&db).await?;
    seed_wms(&db).await?;
    seed_tms(&db).await?;
    seed_dms(&db).await?;
    seed_billing(&db).await?;

    Ok(())
}
