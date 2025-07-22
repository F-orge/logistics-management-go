use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_interactions::{
    Column as InteractionColumn, Entity as InteractionEntity, Model as InteractionModel,
};
use crate::entities::crm::interactions::{CreateInteraction, UpdateInteraction};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct InteractionsSort {
    pub column: InteractionColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct InteractionFilter {
    pub column: InteractionColumn,
    pub operator: FilterOperator,
    pub value: String,
}

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
    async fn contact_id(&self) -> Option<Uuid> {
        self.model.contact_id
    }
    async fn opportunity_id(&self) -> Option<Uuid> {
        self.model.opportunity_id
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
        sort_by: Option<Vec<InteractionsSort>>,
        filter_by: Option<Vec<InteractionFilter>>,
    ) -> async_graphql::Result<Vec<InteractionNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = InteractionEntity::find();
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let order = match sort.order {
                    SortOrder::Asc => sea_orm::Order::Asc,
                    SortOrder::Desc => sea_orm::Order::Desc,
                };
                query = query.order_by(sort.column, order);
            }
        }
        if let Some(filters) = filter_by {
            for filter in filters {
                query = match filter.operator {
                    FilterOperator::Equals => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .eq(filter.value.clone()),
                    ),
                    FilterOperator::Contains => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("%{}%", filter.value)),
                    ),
                    FilterOperator::StartsWith => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("{}%", filter.value)),
                    ),
                    FilterOperator::EndsWith => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("%{}", filter.value)),
                    ),
                };
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
