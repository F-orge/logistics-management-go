use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_transport_legs::{
    Column as TransportLegColumn, Entity as TransportLegEntity, Model as TransportLegModel,
};
use crate::entities::lms::transport_legs::{CreateTransportLeg, UpdateTransportLeg};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct TransportLegsSort {
    pub column: TransportLegColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct TransportLegFilter {
    pub column: TransportLegColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct TransportLegNode {
    pub model: TransportLegModel,
}

#[Object]
impl TransportLegNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn shipment_id(&self) -> Uuid {
        self.model.shipment_id
    }
    async fn leg_sequence(&self) -> i32 {
        self.model.leg_sequence
    }
    async fn transport_type(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsTransportLegType {
        self.model.transport_type
    }
    async fn provider_id(&self) -> Option<Uuid> {
        self.model.provider_id
    }
    async fn provider_service_id(&self) -> Option<Uuid> {
        self.model.provider_service_id
    }
    async fn provider_tracking_number(&self) -> Option<String> {
        self.model.provider_tracking_number.clone()
    }
    async fn vehicle_id(&self) -> Option<Uuid> {
        self.model.vehicle_id
    }
    async fn driver_id(&self) -> Option<Uuid> {
        self.model.driver_id
    }
    async fn origin_warehouse_id(&self) -> Option<Uuid> {
        self.model.origin_warehouse_id
    }
    async fn destination_warehouse_id(&self) -> Option<Uuid> {
        self.model.destination_warehouse_id
    }
    async fn origin_address_id(&self) -> Option<Uuid> {
        self.model.origin_address_id
    }
    async fn destination_address_id(&self) -> Option<Uuid> {
        self.model.destination_address_id
    }
    async fn scheduled_pickup(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.scheduled_pickup
    }
    async fn actual_pickup(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.actual_pickup
    }
    async fn scheduled_delivery(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.scheduled_delivery
    }
    async fn actual_delivery(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.actual_delivery
    }
    async fn cost(&self) -> Option<Decimal> {
        self.model.cost
    }
    async fn currency(&self) -> Option<String> {
        self.model.currency.clone()
    }
    async fn status(&self) -> crate::entities::_generated::sea_orm_active_enums::LmsLegStatus {
        self.model.status
    }
    async fn special_instructions(&self) -> Option<String> {
        self.model.special_instructions.clone()
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct TransportLegsQuery;

#[Object]
impl TransportLegsQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<TransportLegNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = TransportLegEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| TransportLegNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<TransportLegsSort>>,
        filter_by: Option<Vec<TransportLegFilter>>,
    ) -> async_graphql::Result<Vec<TransportLegNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = TransportLegEntity::find();

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
            .map(|m| TransportLegNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct TransportLegsMutation;

#[Object]
impl TransportLegsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateTransportLeg,
    ) -> async_graphql::Result<TransportLegNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(TransportLegNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateTransportLeg,
    ) -> async_graphql::Result<TransportLegNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(TransportLegNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        TransportLegEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete transport leg: {}", e))?;
        Ok(format!("Deleted transport leg with ID: {}", id))
    }
}
