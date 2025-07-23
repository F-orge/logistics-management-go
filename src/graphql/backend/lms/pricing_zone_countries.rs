use async_graphql::{Context, Object};
use sea_orm::{ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel};
use uuid::Uuid;

use crate::entities::_generated::lms_pricing_zone_countries::{
    Entity as PricingZoneCountryEntity, Model as PricingZoneCountryModel,
};
use crate::entities::_generated::prelude::LmsPricingZones;
use crate::entities::lms::pricing_zone_countries::CreatePricingZoneCountry;
use crate::graphql::backend::lms::pricing_zones::PricingZoneNode;

pub struct PricingZoneCountryNode {
    pub model: PricingZoneCountryModel,
}

#[Object]
impl PricingZoneCountryNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn pricing_zone(&self, ctx: &Context<'_>) -> async_graphql::Result<PricingZoneNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let zone = LmsPricingZones::find_by_id(self.model.pricing_zone_id)
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Pricing zone not found"))?;
        Ok(PricingZoneNode { model: zone })
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
