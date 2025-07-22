use async_graphql::{Context, ID, InputObject, Object, Result};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_performance::{
    Column as ProviderPerformanceColumn, Entity as ProviderPerformanceEntity,
    Model as ProviderPerformanceModel,
};
use crate::entities::lms::provider_performance::{
    CreateProviderPerformance, UpdateProviderPerformance,
};
use crate::entities::{FilterOperator, SortOrder};

use crate::entities::_generated::lms_shipments::{
    Entity as ShipmentEntity, Model as ShipmentModel,
};
use crate::entities::_generated::lms_transport_legs::{
    Entity as TransportLegEntity, Model as TransportLegModel,
};
use crate::entities::_generated::lms_transportation_providers::{
    Entity as ProviderEntity, Model as ProviderModel,
};

#[derive(Debug, Clone, InputObject)]
pub struct ProviderPerformancesSort {
    pub column: ProviderPerformanceColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct ProviderPerformanceFilter {
    pub column: ProviderPerformanceColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct ProviderPerformanceNode {
    pub model: ProviderPerformanceModel,
}

#[Object]
impl ProviderPerformanceNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn provider_id(&self) -> Uuid {
        self.model.provider_id
    }
    async fn shipment_id(&self) -> Uuid {
        self.model.shipment_id
    }
    async fn transport_leg_id(&self) -> Option<Uuid> {
        self.model.transport_leg_id
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
    async fn provider(&self, ctx: &Context<'_>) -> Result<Option<ProviderModel>> {
        let db = ctx.data::<DatabaseConnection>()?;
        Ok(ProviderEntity::find_by_id(self.model.provider_id)
            .one(db)
            .await?)
    }
    async fn shipment(&self, ctx: &Context<'_>) -> Result<Option<ShipmentModel>> {
        let db = ctx.data::<DatabaseConnection>()?;
        Ok(ShipmentEntity::find_by_id(self.model.shipment_id)
            .one(db)
            .await?)
    }
    async fn transport_leg(&self, ctx: &Context<'_>) -> Result<Option<TransportLegModel>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.transport_leg_id {
            Some(id) => Ok(TransportLegEntity::find_by_id(id).one(db).await?),
            None => Ok(None),
        }
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
        sort_by: Option<Vec<ProviderPerformancesSort>>,
        filter_by: Option<Vec<ProviderPerformanceFilter>>,
    ) -> Result<Vec<ProviderPerformanceNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderPerformanceEntity::find();

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
