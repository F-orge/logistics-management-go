use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_campaigns::{
    Column as CampaignColumn, Entity as CampaignEntity, Model as CampaignModel,
};
use crate::entities::crm::campaigns::{CreateCampaign, UpdateCampaign};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct CampaignsSort {
    pub column: CampaignColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct CampaignFilter {
    pub column: CampaignColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct CampaignsQuery;

#[Object]
impl CampaignsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<CampaignsSort>>,
        filter_by: Option<Vec<CampaignFilter>>,
    ) -> Vec<CampaignModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let mut query = CampaignEntity::find();
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
        let campaigns = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await
            .unwrap_or_default();
        campaigns
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<CampaignModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let campaign = CampaignEntity::find_by_id(id).one(db).await.unwrap_or(None);
        campaign
    }
}

#[derive(Default)]
pub struct CampaignsMutation;

#[Object]
impl CampaignsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateCampaign,
    ) -> anyhow::Result<CampaignModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let campaign = payload.into_active_model();
        let campaign = campaign.insert(db).await?;
        Ok(campaign)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateCampaign,
    ) -> anyhow::Result<CampaignModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_campaign = active_model.update(db).await?;
        Ok(updated_campaign)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        CampaignEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete campaign: {}", e))?;
        Ok(format!("Deleted campaign with ID: {}", id))
    }
}
