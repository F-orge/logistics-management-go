use sea_orm::Database;

use crate::SeedArgs;

pub async fn execute(args: SeedArgs) -> anyhow::Result<()> {
    let db = Database::connect(args.database_url).await?;

    // data flow
    // auth
    // crm
    // tms
    // wms
    // ims
    // dms
    // billing

    todo!()
}
