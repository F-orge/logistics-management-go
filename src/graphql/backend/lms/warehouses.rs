use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_warehouses::{
    Column as WarehouseColumn, Entity as WarehouseEntity, Model as WarehouseModel,
};
use crate::entities::lms::warehouses::{CreateWarehouse, UpdateWarehouse};
use crate::entities::{FilterGeneric, SortGeneric};

pub struct WarehouseNode {
    pub model: WarehouseModel,
}

#[Object]
impl WarehouseNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn name(&self) -> &str {
        &self.model.name
    }
    async fn code(&self) -> &str {
        &self.model.code
    }
    async fn address_id(&self) -> Uuid {
        self.model.address_id
    }
    async fn warehouse_type(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsWarehouseType {
        self.model.warehouse_type
    }
    async fn capacity(&self) -> Option<i32> {
        self.model.capacity
    }
    async fn department_id(&self) -> Option<Uuid> {
        self.model.department_id
    }
    async fn is_active(&self) -> bool {
        self.model.is_active
    }
    async fn manager_id(&self) -> Option<Uuid> {
        self.model.manager_id
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }

    // Relations
    async fn address(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::lms_addresses::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        Ok(
            crate::entities::_generated::lms_addresses::Entity::find_by_id(self.model.address_id)
                .one(db)
                .await?,
        )
    }

    async fn department(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::org_departments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.department_id {
            Some(id) => Ok(
                crate::entities::_generated::org_departments::Entity::find_by_id(id)
                    .one(db)
                    .await?,
            ),
            None => Ok(None),
        }
    }

    async fn manager(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::auth_users::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.manager_id {
            Some(id) => Ok(
                crate::entities::_generated::auth_users::Entity::find_by_id(id)
                    .one(db)
                    .await?,
            ),
            None => Ok(None),
        }
    }
}

#[derive(Default)]
pub struct WarehousesQuery;

#[Object]
impl WarehousesQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<WarehouseNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = WarehouseEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| WarehouseNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<WarehouseColumn>>>,
        filter_by: Option<Vec<FilterGeneric<WarehouseColumn>>>,
    ) -> async_graphql::Result<Vec<WarehouseNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = WarehouseEntity::find();

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
            .map(|m| WarehouseNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct WarehousesMutation;

#[Object]
impl WarehousesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateWarehouse,
    ) -> async_graphql::Result<WarehouseNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(WarehouseNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateWarehouse,
    ) -> async_graphql::Result<WarehouseNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(WarehouseNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = WarehouseEntity::delete_by_id(id).exec(db).await?;
        if res.rows_affected == 0 {
            return Err(async_graphql::Error::new("Warehouse not found"));
        }
        Ok(format!("Deleted warehouse with ID: {}", id))
    }
}
