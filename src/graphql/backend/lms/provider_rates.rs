use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_rates::{
    Column as ProviderRateColumn, Entity as ProviderRateEntity, Model as ProviderRateModel,
};
use crate::entities::lms::provider_rates::{CreateProviderRate, UpdateProviderRate};
use crate::entities::{FilterGeneric, SortGeneric};

pub struct ProviderRateNode {
    pub model: ProviderRateModel,
}

#[Object]
impl ProviderRateNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn provider_service_id(&self) -> Uuid {
        self.model.provider_service_id
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
    async fn currency(&self) -> String {
        self.model.currency.clone()
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
pub struct ProviderRatesQuery;

#[Object]
impl ProviderRatesQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<ProviderRateNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = ProviderRateEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| ProviderRateNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<ProviderRateColumn>>>,
        filter_by: Option<Vec<FilterGeneric<ProviderRateColumn>>>,
    ) -> async_graphql::Result<Vec<ProviderRateNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderRateEntity::find();

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
            .map(|m| ProviderRateNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct ProviderRatesMutation;

#[Object]
impl ProviderRatesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateProviderRate,
    ) -> async_graphql::Result<ProviderRateNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ProviderRateNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateProviderRate,
    ) -> async_graphql::Result<ProviderRateNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(ProviderRateNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = ProviderRateEntity::delete_by_id(id).exec(db).await?;
        if res.rows_affected == 0 {
            return Err(async_graphql::Error::new("Provider rate not found"));
        }
        Ok(format!("Deleted provider rate with ID: {}", id))
    }
}
