use async_graphql::{Context, Object};
use sea_orm::prelude::Expr;
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_contacts::{Column as ContactColumn, Entity as ContactEntity};
use crate::entities::_generated::crm_interactions::{
    Column as InteractionColumn, Entity as InteractionEntity, Model as InteractionModel,
};
use crate::entities::_generated::crm_opportunities::{
    Column as OpportunityColumn, Entity as OpportunityEntity,
};
use crate::entities::crm::interactions::{CreateInteraction, UpdateInteraction};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::crm::contacts::ContactNode;
use crate::graphql::backend::crm::opportunities::OpportunityNode;

#[derive(Default)]
pub struct InteractionsQuery;

pub struct InteractionNode {
    pub model: InteractionModel,
}

#[Object]
impl InteractionNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn r#type(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::CrmInteractionType {
        &self.model.r#type
    }
    async fn subject(&self) -> Option<&str> {
        self.model.subject.as_deref()
    }
    async fn description(&self) -> Option<&str> {
        self.model.description.as_deref()
    }
    async fn interaction_date(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.interaction_date
    }

    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<ContactNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let contact = ContactEntity::find()
            .filter(Expr::col(ContactColumn::Id).eq(self.model.contact_id))
            .one(db)
            .await?;

        Ok(contact.map(|model| ContactNode { model }))
    }

    async fn opportunity(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<OpportunityNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let opportunity = OpportunityEntity::find()
            .filter(Expr::col(OpportunityColumn::Id).eq(self.model.opportunity_id))
            .one(db)
            .await?;

        Ok(opportunity.map(|model| OpportunityNode { model }))
    }

    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[Object]
impl InteractionsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<InteractionColumn>>>,
        filter_by: Option<Vec<FilterGeneric<InteractionColumn>>>,
    ) -> async_graphql::Result<Vec<InteractionNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = InteractionEntity::find();
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let (column, order) = sort.sort();
                query = query.order_by(column, order);
            }
        }
        if let Some(filters) = filter_by {
            for filter in filters {
                query = query.filter(filter.filter());
            }
        }
        let interactions = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;
        Ok(interactions
            .into_iter()
            .map(|model| InteractionNode { model })
            .collect())
    }
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<InteractionNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let interaction = InteractionEntity::find_by_id(id).one(db).await?;
        Ok(interaction.map(|model| InteractionNode { model }))
    }
}

#[derive(Default)]
pub struct InteractionsMutation;

#[Object]
impl InteractionsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateInteraction,
    ) -> async_graphql::Result<InteractionNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let interaction = payload.into_active_model();
        let interaction = interaction.insert(db).await?;
        Ok(InteractionNode { model: interaction })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateInteraction,
    ) -> async_graphql::Result<InteractionNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_interaction = active_model.update(db).await?;
        Ok(InteractionNode {
            model: updated_interaction,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        InteractionEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete interaction: {}", e))?;
        Ok(format!("Deleted interaction with ID: {}", id))
    }
}
