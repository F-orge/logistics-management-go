use async_graphql::{Context, InputObject, Object};
use sea_orm::entity::prelude::Decimal;
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

pub struct OpportunityProductNode {
    pub model: OpportunityProductModel,
}

#[Object]
impl OpportunityProductNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn opportunity_id(&self) -> Uuid {
        self.model.opportunity_id
    }
    async fn product_id(&self) -> Uuid {
        self.model.product_id
    }
    async fn quantity(&self) -> Decimal {
        self.model.quantity
    }
    async fn unit_price(&self) -> Decimal {
        self.model.unit_price
    }
    async fn total_price(&self) -> Option<Decimal> {
        self.model.total_price
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[Object]
impl OpportunityProductsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<OpportunityProductsSort>>,
        filter_by: Option<Vec<OpportunityProductFilter>>,
    ) -> async_graphql::Result<Vec<OpportunityProductNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
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
            .await?;
        Ok(opportunity_products
            .into_iter()
            .map(|model| OpportunityProductNode { model })
            .collect())
    }
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<OpportunityProductNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let opportunity_product = OpportunityProductEntity::find_by_id(id).one(db).await?;
        Ok(opportunity_product.map(|model| OpportunityProductNode { model }))
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
    ) -> async_graphql::Result<OpportunityProductNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let opportunity_product = payload.into_active_model();
        let opportunity_product = opportunity_product.insert(db).await?;
        Ok(OpportunityProductNode {
            model: opportunity_product,
        })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateOpportunityProduct,
    ) -> async_graphql::Result<OpportunityProductNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_opportunity_product = active_model.update(db).await?;
        Ok(OpportunityProductNode {
            model: updated_opportunity_product,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        OpportunityProductEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete opportunity product: {}", e))?;
        Ok(format!("Deleted opportunity product with ID: {}", id))
    }
}
