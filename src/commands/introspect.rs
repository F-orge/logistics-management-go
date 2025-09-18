use async_graphql::{EmptySubscription, Schema};

use crate::{Mutations, Query};

pub async fn execute() -> anyhow::Result<()> {
    let schema = Schema::build(Query::default(), Mutations::default(), EmptySubscription).finish();

    println!("{}", schema.sdl());

    Ok(())
}
