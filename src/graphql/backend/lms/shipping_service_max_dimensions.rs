use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_shipping_service_max_dimensions::{
    Column as ShippingServiceMaxDimensionColumn, Entity as ShippingServiceMaxDimensionEntity,
    Model as ShippingServiceMaxDimensionModel,
};
use crate::entities::_generated::prelude::LmsShippingServices;
use crate::entities::lms::shipping_service_max_dimensions::CreateShippingServiceMaxDimension;
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::lms::shipping_services::ShippingServiceNode;

pub struct ShippingServiceMaxDimensionNode {
    pub model: ShippingServiceMaxDimensionModel,
}

#[Object]
impl ShippingServiceMaxDimensionNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn shipping_service(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<ShippingServiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let service = LmsShippingServices::find()
            .filter(
                sea_orm::prelude::Expr::col(
                    crate::entities::_generated::lms_shipping_services::Column::Id,
                )
                .eq(self.model.shipping_service_id),
            )
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Shipping service not found"))?;
        Ok(ShippingServiceNode { model: service })
    }
    async fn length(&self) -> Option<Decimal> {
        self.model.length
    }
    async fn width(&self) -> Option<Decimal> {
        self.model.width
    }
    async fn height(&self) -> Option<Decimal> {
        self.model.height
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
}

#[derive(Default)]
pub struct ShippingServiceMaxDimensionsQuery;

#[Object]
impl ShippingServiceMaxDimensionsQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<ShippingServiceMaxDimensionNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = ShippingServiceMaxDimensionEntity::find_by_id(id)
            .one(db)
            .await?;
        Ok(model.map(|m| ShippingServiceMaxDimensionNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<ShippingServiceMaxDimensionColumn>>>,
        filter_by: Option<Vec<FilterGeneric<ShippingServiceMaxDimensionColumn>>>,
    ) -> async_graphql::Result<Vec<ShippingServiceMaxDimensionNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ShippingServiceMaxDimensionEntity::find();

        // Sorting
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let (column, order) = sort.sort();
                query = query.order_by(column, order);
            }
        }

        // Filtering
        if let Some(filters) = filter_by {
            for filter in filters {
                query = query.filter(filter.filter());
            }
        }

        let items = query.paginate(db, limit).fetch_page(page).await?;
        Ok(items
            .into_iter()
            .map(|m| ShippingServiceMaxDimensionNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct ShippingServiceMaxDimensionsMutation;

#[Object]
impl ShippingServiceMaxDimensionsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateShippingServiceMaxDimension,
    ) -> async_graphql::Result<ShippingServiceMaxDimensionNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ShippingServiceMaxDimensionNode { model: item })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        ShippingServiceMaxDimensionEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| {
                anyhow::anyhow!("Failed to delete shipping service max dimension: {}", e)
            })?;
        Ok(format!(
            "Deleted shipping service max dimension with ID: {}",
            id
        ))
    }
}
