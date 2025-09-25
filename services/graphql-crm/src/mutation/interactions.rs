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

#[derive(Debug, Clone)]
pub struct Mutation;

#[Object(name = "CrmInteractionsMutations")]
impl Mutation {
    async fn create_interaction(
        &self,
        ctx: &Context<'_>,
        payload: CreateInteractionInput,
    ) -> async_graphql::Result<interactions::Model> {
        todo!()
    }
    async fn update_interaction_contact_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        contact_id: Uuid,
    ) -> async_graphql::Result<interactions::Model> {
        todo!()
    }
    async fn update_interaction_user_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        user_id: Uuid,
    ) -> async_graphql::Result<interactions::Model> {
        todo!()
    }
    async fn update_interaction_case_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        case_id: Option<Uuid>,
    ) -> async_graphql::Result<interactions::Model> {
        todo!()
    }
    async fn update_interaction_type(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        r#type: Option<InteractionType>,
    ) -> async_graphql::Result<interactions::Model> {
        todo!()
    }
    async fn update_interaction_outcome(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        outcome: Option<String>,
    ) -> async_graphql::Result<interactions::Model> {
        todo!()
    }
    async fn update_interaction_notes(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        notes: Option<String>,
    ) -> async_graphql::Result<interactions::Model> {
        todo!()
    }
    async fn update_interaction_interaction_date(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        interaction_date: Option<DateTime<Utc>>,
    ) -> async_graphql::Result<interactions::Model> {
        todo!()
    }
    async fn remove_interaction(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        todo!()
    }
}
