use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_services::{
    Column as ProviderServiceColumn, Entity as ProviderServiceEntity, Model as ProviderServiceModel,
};
use crate::entities::lms::provider_services::{CreateProviderService, UpdateProviderService};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct ProviderServicesSort {
    pub column: ProviderServiceColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct ProviderServiceFilter {
    pub column: ProviderServiceColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct ProviderServiceNode {
    pub model: ProviderServiceModel,
}

#[Object]
impl ProviderServiceNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn provider_id(&self) -> Uuid {
        self.model.provider_id
    }
    async fn service_name(&self) -> &str {
        &self.model.service_name
    }
    async fn service_type(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsServiceType {
        self.model.service_type
    }
    async fn transport_mode(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsTransportMode {
        self.model.transport_mode
    }
    async fn max_weight(&self) -> Option<Decimal> {
        self.model.max_weight
    }
    async fn transit_time_min(&self) -> Option<i32> {
        self.model.transit_time_min
    }
    async fn transit_time_max(&self) -> Option<i32> {
        self.model.transit_time_max
    }
    async fn cutoff_time(&self) -> Option<chrono::NaiveTime> {
        self.model.cutoff_time
    }
    async fn tracking_available(&self) -> bool {
        self.model.tracking_available
    }
    async fn insurance_available(&self) -> bool {
        self.model.insurance_available
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
pub struct ProviderServicesQuery;

#[Object]
impl ProviderServicesQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<ProviderServiceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = ProviderServiceEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| ProviderServiceNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<ProviderServicesSort>>,
        filter_by: Option<Vec<ProviderServiceFilter>>,
    ) -> async_graphql::Result<Vec<ProviderServiceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderServiceEntity::find();

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
            .map(|m| ProviderServiceNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct ProviderServicesMutation;

#[Object]
impl ProviderServicesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateProviderService,
    ) -> async_graphql::Result<ProviderServiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ProviderServiceNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateProviderService,
    ) -> async_graphql::Result<ProviderServiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(ProviderServiceNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        ProviderServiceEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete provider service: {}", e))?;
        Ok(format!("Deleted provider service with ID: {}", id))
    }
}
