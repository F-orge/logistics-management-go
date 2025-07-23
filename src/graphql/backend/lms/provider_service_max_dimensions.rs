use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_service_max_dimensions::{
    Column as ProviderServiceMaxDimensionColumn, Entity as ProviderServiceMaxDimensionEntity,
    Model as ProviderServiceMaxDimensionModel,
};
use crate::entities::lms::provider_service_max_dimensions::CreateProviderServiceMaxDimension;
use crate::entities::{FilterGeneric, SortGeneric};

pub struct ProviderServiceMaxDimensionNode {
    pub model: ProviderServiceMaxDimensionModel,
}

#[Object]
impl ProviderServiceMaxDimensionNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn provider_service_id(&self) -> Uuid {
        self.model.provider_service_id
    }
    async fn length(&self) -> Option<Decimal> {
        self.model.length
    }
    async fn width(&self) -> Option<Decimal> {
        self.model.width
    }
    async fn height(&self) -> Option<Decimal> {
        self.model.height
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
}

#[derive(Default)]
pub struct ProviderServiceMaxDimensionsQuery;

#[Object]
impl ProviderServiceMaxDimensionsQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<ProviderServiceMaxDimensionNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = ProviderServiceMaxDimensionEntity::find_by_id(id)
            .one(db)
            .await?;
        Ok(model.map(|m| ProviderServiceMaxDimensionNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<ProviderServiceMaxDimensionColumn>>>,
        filter_by: Option<Vec<FilterGeneric<ProviderServiceMaxDimensionColumn>>>,
    ) -> async_graphql::Result<Vec<ProviderServiceMaxDimensionNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderServiceMaxDimensionEntity::find();

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
            .map(|m| ProviderServiceMaxDimensionNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct ProviderServiceMaxDimensionsMutation;

#[Object]
impl ProviderServiceMaxDimensionsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateProviderServiceMaxDimension,
    ) -> async_graphql::Result<ProviderServiceMaxDimensionNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ProviderServiceMaxDimensionNode { model: item })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        ProviderServiceMaxDimensionEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| {
                anyhow::anyhow!("Failed to delete provider service max dimension: {}", e)
            })?;
        Ok(format!(
            "Deleted provider service max dimension with ID: {}",
            id
        ))
    }
}
