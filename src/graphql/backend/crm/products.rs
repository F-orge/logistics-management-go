use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_products::{
    Column as ProductColumn, Entity as ProductEntity, Model as ProductModel,
};
use crate::entities::crm::products::{CreateProduct, UpdateProduct};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct ProductsSort {
    pub column: ProductColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct ProductFilter {
    pub column: ProductColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct ProductsQuery;

#[Object]
impl ProductsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<ProductsSort>>,
        filter_by: Option<Vec<ProductFilter>>,
    ) -> Vec<ProductModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let mut query = ProductEntity::find();
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
        let products = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await
            .unwrap_or_default();
        products
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<ProductModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let product = ProductEntity::find_by_id(id).one(db).await.unwrap_or(None);
        product
    }
}

#[derive(Default)]
pub struct ProductsMutation;

#[Object]
impl ProductsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateProduct,
    ) -> anyhow::Result<ProductModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let product = payload.into_active_model();
        let product = product.insert(db).await?;
        Ok(product)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateProduct,
    ) -> anyhow::Result<ProductModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_product = active_model.update(db).await?;
        Ok(updated_product)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        ProductEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete product: {}", e))?;
        Ok(format!("Deleted product with ID: {}", id))
    }
}
