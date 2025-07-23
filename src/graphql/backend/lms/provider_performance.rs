use async_graphql::{Context, Object, Result};
use sea_orm::prelude::Expr;
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_performance::{
    Column as ProviderPerformanceColumn, Entity as ProviderPerformanceEntity,
    Model as ProviderPerformanceModel,
};
use crate::entities::lms::provider_performance::{
    CreateProviderPerformance, UpdateProviderPerformance,
};
use crate::entities::{FilterGeneric, SortGeneric};

use crate::entities::_generated::lms_shipments::Entity as ShipmentEntity;
use crate::entities::_generated::lms_transport_legs::{Entity as TransportLegEntity, Column as TransportLegColumn};
use crate::entities::_generated::lms_transportation_providers::Entity as ProviderEntity;
use crate::graphql::backend::lms::shipments::ShipmentNode;
use crate::graphql::backend::lms::transport_legs::TransportLegNode;
use crate::graphql::backend::lms::transportation_providers::TransportationProviderNode;

pub struct ProviderPerformanceNode {
    pub model: ProviderPerformanceModel,
}

#[Object]
impl ProviderPerformanceNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn metric_type(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::LmsPerformanceMetricType {
        &self.model.metric_type
    }
    async fn metric_value(&self) -> Option<sea_orm::entity::prelude::Decimal> {
        self.model.metric_value
    }
    async fn measurement_date(&self) -> chrono::NaiveDate {
        self.model.measurement_date
    }
    async fn notes(&self) -> Option<&str> {
        self.model.notes.as_deref()
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }

    // Relations
    async fn provider(&self, ctx: &Context<'_>) -> Result<Option<TransportationProviderNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let provider = ProviderEntity::find_by_id(self.model.provider_id)
            .one(db)
            .await?;
        Ok(provider.map(|model| TransportationProviderNode { model }))
    }
    async fn shipment(&self, ctx: &Context<'_>) -> Result<Option<ShipmentNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let shipment = ShipmentEntity::find_by_id(self.model.shipment_id)
            .one(db)
            .await?;
        Ok(shipment.map(|model| ShipmentNode { model }))
    }
    async fn transport_leg(&self, ctx: &Context<'_>) -> Result<Option<TransportLegNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let leg = TransportLegEntity::find()
            .filter(Expr::col(TransportLegColumn::Id).eq(self.model.transport_leg_id))
            .one(db)
            .await?;

        Ok(leg.map(|model| TransportLegNode { model }))
    }
}

#[derive(Default)]
pub struct ProviderPerformancesQuery;

#[Object]
impl ProviderPerformancesQuery {
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Result<Option<ProviderPerformanceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = ProviderPerformanceEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| ProviderPerformanceNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<ProviderPerformanceColumn>>>,
        filter_by: Option<Vec<FilterGeneric<ProviderPerformanceColumn>>>,
    ) -> Result<Vec<ProviderPerformanceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderPerformanceEntity::find();

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
            .map(|m| ProviderPerformanceNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct ProviderPerformancesMutation;

#[Object]
impl ProviderPerformancesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateProviderPerformance,
    ) -> Result<ProviderPerformanceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ProviderPerformanceNode { model: item })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateProviderPerformance,
    ) -> Result<ProviderPerformanceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(ProviderPerformanceNode {
            model: updated_item,
        })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = ProviderPerformanceEntity::delete_by_id(id).exec(db).await?;
        if res.rows_affected == 0 {
            return Err(async_graphql::Error::new("ProviderPerformance not found"));
        }
        Ok(format!("Deleted provider performance with ID: {}", id))
    }
}
