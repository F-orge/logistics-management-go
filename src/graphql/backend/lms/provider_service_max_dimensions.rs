use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_service_max_dimensions::{
    Column as ProviderServiceMaxDimensionColumn, Entity as ProviderServiceMaxDimensionEntity,
    Model as ProviderServiceMaxDimensionModel,
};
use crate::entities::lms::provider_service_max_dimensions::CreateProviderServiceMaxDimension;
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct ProviderServiceMaxDimensionsSort {
    pub column: ProviderServiceMaxDimensionColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct ProviderServiceMaxDimensionFilter {
    pub column: ProviderServiceMaxDimensionColumn,
    pub operator: FilterOperator,
    pub value: String,
}

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
        sort_by: Option<Vec<ProviderServiceMaxDimensionsSort>>,
        filter_by: Option<Vec<ProviderServiceMaxDimensionFilter>>,
    ) -> async_graphql::Result<Vec<ProviderServiceMaxDimensionNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderServiceMaxDimensionEntity::find();

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
