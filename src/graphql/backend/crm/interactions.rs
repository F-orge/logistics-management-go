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

#[Object]
impl InteractionsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<InteractionsSort>>,
        filter_by: Option<Vec<InteractionFilter>>,
    ) -> Vec<InteractionModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
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
            .await
            .unwrap_or_default();
        interactions
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<InteractionModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let interaction = InteractionEntity::find_by_id(id)
            .one(db)
            .await
            .unwrap_or(None);
        interaction
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
    ) -> anyhow::Result<InteractionModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let interaction = payload.into_active_model();
        let interaction = interaction.insert(db).await?;
        Ok(interaction)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateInteraction,
    ) -> anyhow::Result<InteractionModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_interaction = active_model.update(db).await?;
        Ok(updated_interaction)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        InteractionEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete interaction: {}", e))?;
        Ok(format!("Deleted interaction with ID: {}", id))
    }
}
