use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_packages::{
    Column as PackageColumn, Entity as PackageEntity, Model as PackageModel,
};
use crate::entities::_generated::prelude::LmsShipments;
use crate::entities::lms::packages::{CreatePackage, UpdatePackage};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::lms::shipments::ShipmentNode;

pub struct PackageNode {
    pub model: PackageModel,
}

#[Object]
impl PackageNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }

    async fn shipment(&self, ctx: &Context<'_>) -> async_graphql::Result<ShipmentNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let shipment = LmsShipments::find_by_id(self.model.shipment_id)
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Shipment not found"))?;
        Ok(ShipmentNode { model: shipment })
    }

    async fn package_number(&self) -> &str {
        &self.model.package_number
    }

    async fn weight(&self) -> Decimal {
        self.model.weight
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

    async fn package_type(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsPackageType {
        self.model.package_type
    }

    async fn contents_description(&self) -> Option<&str> {
        self.model.contents_description.as_deref()
    }
    async fn declared_value(&self) -> Option<Decimal> {
        self.model.declared_value
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }

    // ...existing code...
}

#[derive(Default)]
pub struct PackagesQuery;

#[Object]
impl PackagesQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<PackageNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = PackageEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| PackageNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<PackageColumn>>>,
        filter_by: Option<Vec<FilterGeneric<PackageColumn>>>,
    ) -> async_graphql::Result<Vec<PackageNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = PackageEntity::find();

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
            .map(|m| PackageNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct PackagesMutation;

#[Object]
impl PackagesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreatePackage,
    ) -> async_graphql::Result<PackageNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(PackageNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdatePackage,
    ) -> async_graphql::Result<PackageNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(PackageNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = PackageEntity::delete_by_id(id).exec(db).await?;
        if res.rows_affected == 0 {
            return Err(async_graphql::Error::new("Package not found"));
        }
        Ok(format!("Deleted package with ID: {}", id))
    }
}
