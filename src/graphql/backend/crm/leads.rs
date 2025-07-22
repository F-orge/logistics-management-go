use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_leads::{
    Column as LeadColumn, Entity as LeadEntity, Model as LeadModel,
};
use crate::entities::crm::leads::{CreateLead, UpdateLead};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct LeadsSort {
    pub column: LeadColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct LeadFilter {
    pub column: LeadColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct LeadsQuery;

#[Object]
impl LeadsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<LeadsSort>>,
        filter_by: Option<Vec<LeadFilter>>,
    ) -> Vec<LeadModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let mut query = LeadEntity::find();
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
        let leads = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await
            .unwrap_or_default();
        leads
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<LeadModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let lead = LeadEntity::find_by_id(id).one(db).await.unwrap_or(None);
        lead
    }
}

#[derive(Default)]
pub struct LeadsMutation;

#[Object]
impl LeadsMutation {
    async fn create(&self, ctx: &Context<'_>, payload: CreateLead) -> anyhow::Result<LeadModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let lead = payload.into_active_model();
        let lead = lead.insert(db).await?;
        Ok(lead)
    }
    async fn update(&self, ctx: &Context<'_>, payload: UpdateLead) -> anyhow::Result<LeadModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_lead = active_model.update(db).await?;
        Ok(updated_lead)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        LeadEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete lead: {}", e))?;
        Ok(format!("Deleted lead with ID: {}", id))
    }
}
