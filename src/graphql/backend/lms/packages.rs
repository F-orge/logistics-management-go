use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_packages::{
    Column as PackageColumn, Entity as PackageEntity, Model as PackageModel,
};
use crate::entities::lms::packages::{CreatePackage, UpdatePackage};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct PackagesSort {
    pub column: PackageColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct PackageFilter {
    pub column: PackageColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct PackageNode {
    pub model: PackageModel,
}

#[Object]
impl PackageNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn shipment_id(&self) -> Uuid {
        self.model.shipment_id
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

    // Relations
    async fn shipment(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<crate::entities::_generated::lms_shipments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        Ok(crate::entities::_generated::lms_shipments::Entity::find_by_id(self.model.shipment_id).one(db).await?)
    }
}

#[derive(Default)]
pub struct PackagesQuery;

#[Object]
impl PackagesQuery {
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Option<PackageNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = PackageEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| PackageNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<PackagesSort>>,
        filter_by: Option<Vec<PackageFilter>>,
    ) -> async_graphql::Result<Vec<PackageNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = PackageEntity::find();

        // Sorting
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let order = match sort.order {
                    SortOrder::Asc => sea_orm::Order::Asc,
                    SortOrder::Desc => sea_orm::Order::Desc,
                };
                query = query.order_by(sort.column, order);
            }
        }

        // Filtering
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
