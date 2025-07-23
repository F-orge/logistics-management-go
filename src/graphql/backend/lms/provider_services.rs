use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_services::{
    Column as ProviderServiceColumn, Entity as ProviderServiceEntity, Model as ProviderServiceModel,
};
use crate::entities::_generated::prelude::LmsTransportationProviders;
use crate::entities::lms::provider_services::{CreateProviderService, UpdateProviderService};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::lms::transportation_providers::TransportationProviderNode;

pub struct ProviderServiceNode {
    pub model: ProviderServiceModel,
}

#[Object]
impl ProviderServiceNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn provider(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<TransportationProviderNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let provider = LmsTransportationProviders::find_by_id(self.model.provider_id)
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Transportation provider not found"))?;
        Ok(TransportationProviderNode { model: provider })
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
        sort_by: Option<Vec<SortGeneric<ProviderServiceColumn>>>,
        filter_by: Option<Vec<FilterGeneric<ProviderServiceColumn>>>,
    ) -> async_graphql::Result<Vec<ProviderServiceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderServiceEntity::find();

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
