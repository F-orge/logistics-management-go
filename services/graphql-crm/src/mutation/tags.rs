use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::tags;

#[derive(Debug, Clone, InputObject)]
pub struct CreateTagInput {
    pub name: String,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "CrmTagsMutations")]
impl Mutation {
    async fn create_tag(
        &self,
        ctx: &Context<'_>,
        payload: CreateTagInput,
    ) -> async_graphql::Result<tags::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as::<_, tags::Model>("insert into crm.tags (name) values ($1) returning *")
                .bind(payload.name)
                .fetch_one(db)
                .await?,
        )
    }
    async fn update_tag_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<tags::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, tags::Model>(
            "update crm.tags set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn remove_tag(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from crm.tags where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete tag"));
        }
        Ok("Tag removed successfully".into())
    }
}
