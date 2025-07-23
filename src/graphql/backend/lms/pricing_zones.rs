use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_pricing_zones::{
    Column as PricingZoneColumn, Entity as PricingZoneEntity, Model as PricingZoneModel,
};
use crate::entities::lms::pricing_zones::{CreatePricingZone, UpdatePricingZone};
use crate::entities::{FilterGeneric, SortGeneric};

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
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<PricingZoneNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = PricingZoneEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| PricingZoneNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<PricingZoneColumn>>>,
        filter_by: Option<Vec<FilterGeneric<PricingZoneColumn>>>,
    ) -> async_graphql::Result<Vec<PricingZoneNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = PricingZoneEntity::find();

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
