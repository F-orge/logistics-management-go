use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_pricing_zones::{
    Column as PricingZoneColumn, Entity as PricingZoneEntity, Model as PricingZoneModel,
};
use crate::entities::lms::pricing_zones::{CreatePricingZone, UpdatePricingZone};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct PricingZonesSort {
    pub column: PricingZoneColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct PricingZoneFilter {
    pub column: PricingZoneColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct PricingZoneNode {
    pub model: PricingZoneModel,
}

#[Object]
impl PricingZoneNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn name(&self) -> &str {
        &self.model.name
    }
    async fn zone_code(&self) -> String {
        self.model.zone_code.clone()
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct PricingZonesQuery;

#[Object]
impl PricingZonesQuery {
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Option<PricingZoneNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = PricingZoneEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| PricingZoneNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<PricingZonesSort>>,
        filter_by: Option<Vec<PricingZoneFilter>>,
    ) -> async_graphql::Result<Vec<PricingZoneNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = PricingZoneEntity::find();

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
            .map(|m| PricingZoneNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct PricingZonesMutation;

#[Object]
impl PricingZonesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreatePricingZone,
    ) -> async_graphql::Result<PricingZoneNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(PricingZoneNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdatePricingZone,
    ) -> async_graphql::Result<PricingZoneNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(PricingZoneNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = PricingZoneEntity::delete_by_id(id).exec(db).await?;
        if res.rows_affected == 0 {
            return Err(async_graphql::Error::new("Pricing zone not found"));
        }
        Ok(format!("Deleted pricing zone with ID: {}", id))
    }
}
