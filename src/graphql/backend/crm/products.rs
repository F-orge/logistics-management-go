use async_graphql::{Context, Object};
use sea_orm::entity::prelude::Decimal;
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_products::{
    Column as ProductColumn, Entity as ProductEntity, Model as ProductModel,
};
use crate::entities::crm::products::{CreateProduct, UpdateProduct};
use crate::entities::{FilterGeneric, SortGeneric};

#[derive(Default)]
pub struct ProductsQuery;

pub struct ProductNode {
    pub model: ProductModel,
}

#[Object]
impl ProductNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn name(&self) -> &str {
        &self.model.name
    }
    async fn description(&self) -> Option<&str> {
        self.model.description.as_deref()
    }
    async fn price(&self) -> &Decimal {
        &self.model.price
    }
    async fn sku(&self) -> Option<&str> {
        self.model.sku.as_deref()
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[Object]
impl ProductsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<ProductColumn>>>,
        filter_by: Option<Vec<FilterGeneric<ProductColumn>>>,
    ) -> async_graphql::Result<Vec<ProductNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProductEntity::find();
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
        let products = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;
        Ok(products
            .into_iter()
            .map(|model| ProductNode { model })
            .collect())
    }
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<ProductNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let product = ProductEntity::find_by_id(id).one(db).await?;
        Ok(product.map(|model| ProductNode { model }))
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
    ) -> async_graphql::Result<ProductNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let product = payload.into_active_model();
        let product = product.insert(db).await?;
        Ok(ProductNode { model: product })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateProduct,
    ) -> async_graphql::Result<ProductNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_product = active_model.update(db).await?;
        Ok(ProductNode {
            model: updated_product,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        ProductEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete product: {}", e))?;
        Ok(format!("Deleted product with ID: {}", id))
    }
}
