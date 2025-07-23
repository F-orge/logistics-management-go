use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, entity::prelude::Decimal,
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

pub struct CampaignNode {
    pub model: CampaignModel,
}

#[Object]
impl CampaignNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn name(&self) -> &str {
        &self.model.name
    }
    async fn description(&self) -> Option<&str> {
        self.model.description.as_deref()
    }
    async fn start_date(&self) -> chrono::NaiveDate {
        self.model.start_date
    }
    async fn end_date(&self) -> Option<chrono::NaiveDate> {
        self.model.end_date
    }
    async fn budget(&self) -> Option<&Decimal> {
        self.model.budget.as_ref()
    }
    async fn status(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::CrmCampaignStatus {
        &self.model.status
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[Object]
impl CampaignsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<CampaignsSort>>,
        filter_by: Option<Vec<CampaignFilter>>,
    ) -> async_graphql::Result<Vec<CampaignNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
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
            .await?;
        Ok(campaigns
            .into_iter()
            .map(|model| CampaignNode { model })
            .collect())
    }
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<CampaignNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let campaign = CampaignEntity::find_by_id(id).one(db).await?;
        Ok(campaign.map(|model| CampaignNode { model }))
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
    ) -> async_graphql::Result<CampaignNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let campaign = payload.into_active_model();
        let campaign = campaign.insert(db).await?;
        Ok(CampaignNode { model: campaign })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateCampaign,
    ) -> async_graphql::Result<CampaignNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_campaign = active_model.update(db).await?;
        Ok(CampaignNode {
            model: updated_campaign,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        CampaignEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete campaign: {}", e))?;
        Ok(format!("Deleted campaign with ID: {}", id))
    }
}
