use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_shipping_services::{
    Column as ShippingServiceColumn, Entity as ShippingServiceEntity, Model as ShippingServiceModel,
};
use crate::entities::_generated::sea_orm_active_enums::LmsServiceType;
use crate::entities::lms::shipping_services::{CreateShippingService, UpdateShippingService};
use crate::entities::{FilterGeneric, SortGeneric};

pub struct ShippingServiceNode {
    pub model: ShippingServiceModel,
}

#[Object]
impl ShippingServiceNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn name(&self) -> &str {
        &self.model.name
    }
    async fn description(&self) -> Option<&str> {
        self.model.description.as_deref()
    }
    async fn service_type(&self) -> &LmsServiceType {
        &self.model.service_type
    }
    async fn max_weight(&self) -> Option<&Decimal> {
        self.model.max_weight.as_ref()
    }
    async fn delivery_time_min(&self) -> Option<i32> {
        self.model.delivery_time_min
    }
    async fn delivery_time_max(&self) -> Option<i32> {
        self.model.delivery_time_max
    }
    async fn is_active(&self) -> bool {
        self.model.is_active
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct ShippingServicesMutation;

#[Object]
impl ShippingServicesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateShippingService,
    ) -> async_graphql::Result<ShippingServiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ShippingServiceNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateShippingService,
    ) -> async_graphql::Result<ShippingServiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(ShippingServiceNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        ShippingServiceEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete shipping service: {}", e))?;
        Ok(format!("Deleted shipping service with ID: {}", id))
    }
}

#[derive(Default)]
pub struct ShippingServicesQuery;

#[Object]
impl ShippingServicesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<ShippingServiceColumn>>>,
        filter_by: Option<Vec<FilterGeneric<ShippingServiceColumn>>>,
    ) -> async_graphql::Result<Vec<ShippingServiceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ShippingServiceEntity::find();

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
            .map(|m| ShippingServiceNode { model: m })
            .collect())
    }
}
