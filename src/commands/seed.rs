use rand::rng;
use sqlx::PgPool;

use crate::SeedArgs;

pub async fn execute(args: SeedArgs) -> anyhow::Result<()> {
    let db = PgPool::connect(&args.database_url).await?;

    let mut rng = rng();

    Ok(())
}
