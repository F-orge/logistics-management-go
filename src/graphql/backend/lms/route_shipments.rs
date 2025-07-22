use async_graphql::{Context, InputObject, Object};
use sea_orm::{ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait, QueryFilter, QueryOrder};
use uuid::Uuid;

use crate::entities::_generated::lms_route_shipments::{Column as RouteShipmentColumn, Entity as RouteShipmentEntity, Model as RouteShipmentModel};
use crate::entities::lms::route_shipments::{CreateRouteShipment, UpdateRouteShipment};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct RouteShipmentsSort {
    pub column: RouteShipmentColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct RouteShipmentFilter {
    pub column: RouteShipmentColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct RouteShipmentNode {
    pub model: RouteShipmentModel,
}

#[Object]
impl RouteShipmentNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn route_id(&self) -> Uuid {
        self.model.route_id
    }
    async fn shipment_id(&self) -> Uuid {
        self.model.shipment_id
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct RouteShipmentsMutation;

#[Object]
impl RouteShipmentsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateRouteShipment,
    ) -> async_graphql::Result<RouteShipmentNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(RouteShipmentNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateRouteShipment,
    ) -> async_graphql::Result<RouteShipmentNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(RouteShipmentNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        RouteShipmentEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete route shipment: {}", e))?;
        Ok(format!("Deleted route shipment with ID: {}", id))
    }
}
