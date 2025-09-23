use fake::Fake;
use graphql_auth::entities::{_generated::user, user::InsertUserInput};
use sea_orm::{Database, EntityTrait, IntoActiveModel, sea_query::OnConflict};

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

    let mut users = vec![];

    for _ in 0..100 {
        let random_user: InsertUserInput = fake::Faker.fake();
        users.push(random_user.into_active_model());
    }

    _ = user::Entity::insert_many(users)
        .on_conflict(
            OnConflict::column(user::Column::Email)
                .do_nothing()
                .to_owned(),
        )
        .exec(&db)
        .await?;

    Ok(())
}
