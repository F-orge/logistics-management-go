use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_service_origin_countries::{
    Column as ProviderServiceOriginCountryColumn, Entity as ProviderServiceOriginCountryEntity,
    Model as ProviderServiceOriginCountryModel,
};
use crate::entities::_generated::prelude::LmsProviderServices;
use crate::entities::lms::provider_service_origin_countries::CreateProviderServiceOriginCountry;
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::lms::provider_services::ProviderServiceNode;

pub struct ProviderServiceOriginCountryNode {
    pub model: ProviderServiceOriginCountryModel,
}

#[Object]
impl ProviderServiceOriginCountryNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn provider_service(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<ProviderServiceNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let service = LmsProviderServices::find_by_id(self.model.provider_service_id)
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Provider service not found"))?;
        Ok(ProviderServiceNode { model: service })
    }
    async fn country_code(&self) -> &str {
        &self.model.country_code
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
}

#[derive(Default)]
pub struct ProviderServiceOriginCountriesQuery;

#[Object]
impl ProviderServiceOriginCountriesQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<ProviderServiceOriginCountryNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = ProviderServiceOriginCountryEntity::find_by_id(id)
            .one(db)
            .await?;
        Ok(model.map(|m| ProviderServiceOriginCountryNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<ProviderServiceOriginCountryColumn>>>,
        filter_by: Option<Vec<FilterGeneric<ProviderServiceOriginCountryColumn>>>,
    ) -> async_graphql::Result<Vec<ProviderServiceOriginCountryNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderServiceOriginCountryEntity::find();

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
            .map(|m| ProviderServiceOriginCountryNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct ProviderServiceOriginCountriesMutation;

#[Object]
impl ProviderServiceOriginCountriesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateProviderServiceOriginCountry,
    ) -> async_graphql::Result<ProviderServiceOriginCountryNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ProviderServiceOriginCountryNode { model: item })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        ProviderServiceOriginCountryEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| {
                anyhow::anyhow!("Failed to delete provider service origin country: {}", e)
            })?;
        Ok(format!(
            "Deleted provider service origin country with ID: {}",
            id
        ))
    }
}
