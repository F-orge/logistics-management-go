use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_tracking_events::{
    Column as TrackingEventColumn, Entity as TrackingEventEntity, Model as TrackingEventModel,
};
use crate::entities::lms::tracking_events::{CreateTrackingEvent, UpdateTrackingEvent};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct TrackingEventsSort {
    pub column: TrackingEventColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct TrackingEventFilter {
    pub column: TrackingEventColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct TrackingEventNode {
    pub model: TrackingEventModel,
}

#[Object]
impl TrackingEventNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn shipment_id(&self) -> Uuid {
        self.model.shipment_id
    }
    async fn event_type(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsTrackingEventType {
        self.model.event_type
    }
    async fn event_description(&self) -> &str {
        &self.model.event_description
    }
    async fn event_location(&self) -> Option<&str> {
        self.model.event_location.as_deref()
    }
    async fn event_timestamp(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.event_timestamp
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct TrackingEventsQuery;

#[Object]
impl TrackingEventsQuery {
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Option<TrackingEventNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = TrackingEventEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| TrackingEventNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<TrackingEventsSort>>,
        filter_by: Option<Vec<TrackingEventFilter>>,
    ) -> async_graphql::Result<Vec<TrackingEventNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = TrackingEventEntity::find();

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
            .map(|m| TrackingEventNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct TrackingEventsMutation;

#[Object]
impl TrackingEventsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateTrackingEvent,
    ) -> async_graphql::Result<TrackingEventNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(TrackingEventNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateTrackingEvent,
    ) -> async_graphql::Result<TrackingEventNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(TrackingEventNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        TrackingEventEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete tracking event: {}", e))?;
        Ok(format!("Deleted tracking event with ID: {}", id))
    }
}
