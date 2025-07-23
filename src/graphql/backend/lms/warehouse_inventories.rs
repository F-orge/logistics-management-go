use async_graphql::{Context, Object};
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
use crate::entities::{FilterGeneric, SortGeneric};

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

#[derive(Default)]
pub struct WarehouseInventoriesQuery;

#[Object]
impl WarehouseInventoriesQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<WarehouseInventoryNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = WarehouseInventoryEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| WarehouseInventoryNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<WarehouseInventoryColumn>>>,
        filter_by: Option<Vec<FilterGeneric<WarehouseInventoryColumn>>>,
    ) -> async_graphql::Result<Vec<WarehouseInventoryNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = WarehouseInventoryEntity::find();

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
            .map(|m| WarehouseInventoryNode { model: m })
            .collect())
    }
}
