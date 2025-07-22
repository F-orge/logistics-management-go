use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_pricing_zone_countries::{
    Column as PricingZoneCountryColumn, Entity as PricingZoneCountryEntity,
    Model as PricingZoneCountryModel,
};
use crate::entities::lms::pricing_zone_countries::CreatePricingZoneCountry;
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct PricingZoneCountriesSort {
    pub column: PricingZoneCountryColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct PricingZoneCountryFilter {
    pub column: PricingZoneCountryColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct PricingZoneCountryNode {
    pub model: PricingZoneCountryModel,
}

#[Object]
impl PricingZoneCountryNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn pricing_zone_id(&self) -> Uuid {
        self.model.pricing_zone_id
    }
    async fn country_code(&self) -> &str {
        &self.model.country_code
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
}

#[derive(Default)]
pub struct PricingZoneCountriesQuery;

#[derive(Default)]
pub struct PricingZoneCountriesMutation;

#[Object]
impl PricingZoneCountriesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreatePricingZoneCountry,
    ) -> async_graphql::Result<PricingZoneCountryNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(PricingZoneCountryNode { model: item })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        PricingZoneCountryEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete pricing zone country: {}", e))?;
        Ok(format!("Deleted pricing zone country with ID: {}", id))
    }
}
