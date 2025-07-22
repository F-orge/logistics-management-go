use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_warehouse_inventories::{
    Column as WarehouseInventoryColumn, Entity as WarehouseInventoryEntity,
    Model as WarehouseInventoryModel,
};
use crate::entities::lms::warehouse_inventories::{
    CreateWarehouseInventory, UpdateWarehouseInventory,
};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct WarehouseInventoriesSort {
    pub column: WarehouseInventoryColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct WarehouseInventoryFilter {
    pub column: WarehouseInventoryColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct WarehouseInventoryNode {
    pub model: WarehouseInventoryModel,
}

#[Object]
impl WarehouseInventoryNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn warehouse_id(&self) -> Uuid {
        self.model.warehouse_id
    }
    async fn shipment_id(&self) -> Uuid {
        self.model.shipment_id
    }
    async fn package_id(&self) -> Uuid {
        self.model.package_id
    }
    async fn location_code(&self) -> Option<&str> {
        self.model.location_code.as_deref()
    }
    async fn status(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsWarehouseInventoryStatus {
        self.model.status
    }
    async fn arrived_at(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.arrived_at
    }
    async fn departed_at(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.departed_at
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct WarehouseInventoriesMutation;

#[Object]
impl WarehouseInventoriesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateWarehouseInventory,
    ) -> async_graphql::Result<WarehouseInventoryNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(WarehouseInventoryNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateWarehouseInventory,
    ) -> async_graphql::Result<WarehouseInventoryNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(WarehouseInventoryNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        WarehouseInventoryEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete warehouse inventory: {}", e))?;
        Ok(format!("Deleted warehouse inventory with ID: {}", id))
    }
}
