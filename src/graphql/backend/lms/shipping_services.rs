use async_graphql::{Context, InputObject, Object};
use sea_orm::{ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait, QueryFilter, QueryOrder};
use uuid::Uuid;

use crate::entities::_generated::lms_shipping_services::{Column as ShippingServiceColumn, Entity as ShippingServiceEntity, Model as ShippingServiceModel};
use crate::entities::lms::shipping_services::{CreateShippingService, UpdateShippingService};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct ShippingServicesSort {
    pub column: ShippingServiceColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct ShippingServiceFilter {
    pub column: ShippingServiceColumn,
    pub operator: FilterOperator,
    pub value: String,
}

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
