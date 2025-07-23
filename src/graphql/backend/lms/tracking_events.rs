use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_tracking_events::{
    Column as TrackingEventColumn, Entity as TrackingEventEntity, Model as TrackingEventModel,
};
use crate::entities::_generated::prelude::LmsShipments;
use crate::entities::lms::tracking_events::{CreateTrackingEvent, UpdateTrackingEvent};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::lms::shipments::ShipmentNode;

pub struct TrackingEventNode {
    pub model: TrackingEventModel,
}

#[Object]
impl TrackingEventNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn shipment(&self, ctx: &Context<'_>) -> async_graphql::Result<ShipmentNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let shipment = LmsShipments::find()
            .filter(
                sea_orm::prelude::Expr::col(crate::entities::_generated::lms_shipments::Column::Id)
                    .eq(self.model.shipment_id),
            )
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Shipment not found"))?;
        Ok(ShipmentNode { model: shipment })
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
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<TrackingEventNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = TrackingEventEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| TrackingEventNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<TrackingEventColumn>>>,
        filter_by: Option<Vec<FilterGeneric<TrackingEventColumn>>>,
    ) -> async_graphql::Result<Vec<TrackingEventNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = TrackingEventEntity::find();

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
