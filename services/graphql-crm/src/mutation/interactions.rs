use async_graphql::{Context, InputObject, Object};
use chrono::DateTime;
use chrono::Utc;
use uuid::Uuid;

use crate::models::enums::InteractionType;
use crate::models::interactions;

#[derive(Debug, Clone, InputObject)]
pub struct CreateInteractionInput {
    pub contact_id: Uuid,
    pub user_id: Uuid,
    pub case_id: Option<Uuid>,
    pub r#type: Option<InteractionType>,
    pub outcome: Option<String>,
    pub notes: Option<String>,
    pub interaction_date: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "CrmInteractionsMutations")]
impl Mutation {
    async fn create_interaction(
        &self,
        ctx: &Context<'_>,
        payload: CreateInteractionInput,
    ) -> async_graphql::Result<interactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, interactions::Model>(
            "insert into crm.interactions (contact_id, user_id, case_id, type, outcome, notes, interaction_date) values ($1,$2,$3,$4,$5,$6,$7) returning *"
        )
        .bind(payload.contact_id)
        .bind(payload.user_id)
        .bind(payload.case_id)
        .bind(payload.r#type)
        .bind(payload.outcome)
        .bind(payload.notes)
        .bind(payload.interaction_date)
        .fetch_one(db)
        .await?)
    }
    async fn update_interaction_contact_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        contact_id: Uuid,
    ) -> async_graphql::Result<interactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, interactions::Model>(
            "update crm.interactions set contact_id = $1 where id = $2 returning *",
        )
        .bind(contact_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_interaction_user_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        user_id: Uuid,
    ) -> async_graphql::Result<interactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, interactions::Model>(
            "update crm.interactions set user_id = $1 where id = $2 returning *",
        )
        .bind(user_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_interaction_case_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        case_id: Option<Uuid>,
    ) -> async_graphql::Result<interactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, interactions::Model>(
            "update crm.interactions set case_id = $1 where id = $2 returning *",
        )
        .bind(case_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_interaction_type(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        r#type: Option<InteractionType>,
    ) -> async_graphql::Result<interactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, interactions::Model>(
            "update crm.interactions set type = $1 where id = $2 returning *",
        )
        .bind(r#type)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_interaction_outcome(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        outcome: Option<String>,
    ) -> async_graphql::Result<interactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, interactions::Model>(
            "update crm.interactions set outcome = $1 where id = $2 returning *",
        )
        .bind(outcome)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_interaction_notes(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        notes: Option<String>,
    ) -> async_graphql::Result<interactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, interactions::Model>(
            "update crm.interactions set notes = $1 where id = $2 returning *",
        )
        .bind(notes)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn update_interaction_interaction_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        interaction_date: Option<DateTime<Utc>>,
    ) -> async_graphql::Result<interactions::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, interactions::Model>(
            "update crm.interactions set interaction_date = $1 where id = $2 returning *",
        )
        .bind(interaction_date)
        .bind(id)
        .fetch_one(db)
        .await?)
    }
    async fn remove_interaction(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from crm.interactions where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to delete interaction"));
        }
        Ok("Interaction removed successfully".into())
    }
}
