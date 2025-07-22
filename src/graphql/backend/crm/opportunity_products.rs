use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_opportunity_products::{
    Column as OpportunityProductColumn, Entity as OpportunityProductEntity,
    Model as OpportunityProductModel,
};
use crate::entities::crm::opportunity_products::{
    CreateOpportunityProduct, UpdateOpportunityProduct,
};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct OpportunityProductsSort {
    pub column: OpportunityProductColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct OpportunityProductFilter {
    pub column: OpportunityProductColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct OpportunityProductsQuery;

#[Object]
impl OpportunityProductsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<OpportunityProductsSort>>,
        filter_by: Option<Vec<OpportunityProductFilter>>,
    ) -> Vec<OpportunityProductModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let mut query = OpportunityProductEntity::find();
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
        let opportunity_products = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await
            .unwrap_or_default();
        opportunity_products
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<OpportunityProductModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let opportunity_product = OpportunityProductEntity::find_by_id(id)
            .one(db)
            .await
            .unwrap_or(None);
        opportunity_product
    }
}

#[derive(Default)]
pub struct OpportunityProductsMutation;

#[Object]
impl OpportunityProductsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateOpportunityProduct,
    ) -> anyhow::Result<OpportunityProductModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let opportunity_product = payload.into_active_model();
        let opportunity_product = opportunity_product.insert(db).await?;
        Ok(opportunity_product)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateOpportunityProduct,
    ) -> anyhow::Result<OpportunityProductModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_opportunity_product = active_model.update(db).await?;
        Ok(updated_opportunity_product)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        OpportunityProductEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete opportunity product: {}", e))?;
        Ok(format!("Deleted opportunity product with ID: {}", id))
    }
}
