use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_pricing_rates::{
    Column as PricingRateColumn, Entity as PricingRateEntity, Model as PricingRateModel,
};
use crate::entities::lms::pricing_rates::{CreatePricingRate, UpdatePricingRate};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct PricingRatesSort {
    pub column: PricingRateColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct PricingRateFilter {
    pub column: PricingRateColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct PricingRateNode {
    pub model: PricingRateModel,
}

#[Object]
impl PricingRateNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn service_id(&self) -> Uuid {
        self.model.service_id
    }
    async fn origin_zone_id(&self) -> Uuid {
        self.model.origin_zone_id
    }
    async fn destination_zone_id(&self) -> Uuid {
        self.model.destination_zone_id
    }
    async fn weight_min(&self) -> Decimal {
        self.model.weight_min
    }
    async fn weight_max(&self) -> Decimal {
        self.model.weight_max
    }
    async fn base_rate(&self) -> Decimal {
        self.model.base_rate
    }
    async fn per_kg_rate(&self) -> Decimal {
        self.model.per_kg_rate
    }
    async fn fuel_surcharge_rate(&self) -> Option<Decimal> {
        self.model.fuel_surcharge_rate
    }
    async fn effective_date(&self) -> chrono::NaiveDate {
        self.model.effective_date
    }
    async fn expiry_date(&self) -> Option<chrono::NaiveDate> {
        self.model.expiry_date
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct PricingRatesQuery;

#[Object]
impl PricingRatesQuery {
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Option<PricingRateNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = PricingRateEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| PricingRateNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<PricingRatesSort>>,
        filter_by: Option<Vec<PricingRateFilter>>,
    ) -> async_graphql::Result<Vec<PricingRateNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = PricingRateEntity::find();

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
            .map(|m| PricingRateNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct PricingRatesMutation;

#[Object]
impl PricingRatesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreatePricingRate,
    ) -> async_graphql::Result<PricingRateNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(PricingRateNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdatePricingRate,
    ) -> async_graphql::Result<PricingRateNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(PricingRateNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        PricingRateEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete pricing rate: {}", e))?;
        Ok(format!("Deleted pricing rate with ID: {}", id))
    }
}
