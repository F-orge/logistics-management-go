use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_provider_service_destination_countries::{
    Column as ProviderServiceDestinationCountryColumn,
    Entity as ProviderServiceDestinationCountryEntity,
    Model as ProviderServiceDestinationCountryModel,
};
use crate::entities::lms::provider_service_destination_countries::CreateProviderServiceDestinationCountry;
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct ProviderServiceDestinationCountriesSort {
    pub column: ProviderServiceDestinationCountryColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct ProviderServiceDestinationCountryFilter {
    pub column: ProviderServiceDestinationCountryColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct ProviderServiceDestinationCountryNode {
    pub model: ProviderServiceDestinationCountryModel,
}

#[Object]
impl ProviderServiceDestinationCountryNode {
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
pub struct ProviderServiceDestinationCountriesQuery;

#[Object]
impl ProviderServiceDestinationCountriesQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<ProviderServiceDestinationCountryNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = ProviderServiceDestinationCountryEntity::find_by_id(id)
            .one(db)
            .await?;
        Ok(model.map(|m| ProviderServiceDestinationCountryNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<ProviderServiceDestinationCountriesSort>>,
        filter_by: Option<Vec<ProviderServiceDestinationCountryFilter>>,
    ) -> async_graphql::Result<Vec<ProviderServiceDestinationCountryNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ProviderServiceDestinationCountryEntity::find();

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
            .map(|m| ProviderServiceDestinationCountryNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct ProviderServiceDestinationCountriesMutation;

#[Object]
impl ProviderServiceDestinationCountriesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateProviderServiceDestinationCountry,
    ) -> async_graphql::Result<ProviderServiceDestinationCountryNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ProviderServiceDestinationCountryNode { model: item })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        ProviderServiceDestinationCountryEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| {
                anyhow::anyhow!(
                    "Failed to delete provider service destination country: {}",
                    e
                )
            })?;
        Ok(format!(
            "Deleted provider service destination country with ID: {}",
            id
        ))
    }
}
