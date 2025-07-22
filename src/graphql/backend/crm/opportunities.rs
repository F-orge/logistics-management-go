use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_opportunities::{
    Column as OpportunityColumn, Entity as OpportunityEntity, Model as OpportunityModel,
};
use crate::entities::crm::opportunities::{CreateOpportunity, UpdateOpportunity};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct OpportunitiesSort {
    pub column: OpportunityColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct OpportunityFilter {
    pub column: OpportunityColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct OpportunitiesQuery;

#[Object]
impl OpportunitiesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<OpportunitiesSort>>,
        filter_by: Option<Vec<OpportunityFilter>>,
    ) -> Vec<OpportunityModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let mut query = OpportunityEntity::find();
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
        let opportunities = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await
            .unwrap_or_default();
        opportunities
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<OpportunityModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let opportunity = OpportunityEntity::find_by_id(id)
            .one(db)
            .await
            .unwrap_or(None);
        opportunity
    }
}

#[derive(Default)]
pub struct OpportunitiesMutation;

#[Object]
impl OpportunitiesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateOpportunity,
    ) -> anyhow::Result<OpportunityModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let opportunity = payload.into_active_model();
        let opportunity = opportunity.insert(db).await?;
        Ok(opportunity)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateOpportunity,
    ) -> anyhow::Result<OpportunityModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_opportunity = active_model.update(db).await?;
        Ok(updated_opportunity)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        OpportunityEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete opportunity: {}", e))?;
        Ok(format!("Deleted opportunity with ID: {}", id))
    }
}
