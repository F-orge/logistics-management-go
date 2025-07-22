use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_service_origin_countries::{
    Column as ProviderServiceOriginCountryColumn, Entity as ProviderServiceOriginCountryEntity,
    Model as ProviderServiceOriginCountryModel,
};
use crate::entities::lms::provider_service_origin_countries::CreateProviderServiceOriginCountry;
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct ProviderServiceOriginCountriesSort {
    pub column: ProviderServiceOriginCountryColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct ProviderServiceOriginCountryFilter {
    pub column: ProviderServiceOriginCountryColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct ProviderServiceOriginCountryNode {
    pub model: ProviderServiceOriginCountryModel,
}

#[Object]
impl ProviderServiceOriginCountryNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn provider_service_id(&self) -> Uuid {
        self.model.provider_service_id
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
        sort_by: Option<Vec<ProviderServiceOriginCountriesSort>>,
        filter_by: Option<Vec<ProviderServiceOriginCountryFilter>>,
    ) -> async_graphql::Result<Vec<ProviderServiceOriginCountryNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderServiceOriginCountryEntity::find();

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
