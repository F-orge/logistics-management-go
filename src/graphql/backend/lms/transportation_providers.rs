use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_transportation_providers::{
    Column as TransportationProviderColumn, Entity as TransportationProviderEntity,
    Model as TransportationProviderModel,
};
use crate::entities::lms::transportation_providers::{
    CreateTransportationProvider, UpdateTransportationProvider,
};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct TransportationProvidersSort {
    pub column: TransportationProviderColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct TransportationProviderFilter {
    pub column: TransportationProviderColumn,
    pub operator: FilterOperator,
    pub value: String,
}

pub struct TransportationProviderNode {
    pub model: TransportationProviderModel,
}

#[Object]
impl TransportationProviderNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn company_name(&self) -> &str {
        &self.model.company_name
    }
    async fn provider_type(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsProviderType {
        self.model.provider_type
    }
    async fn contact_person(&self) -> Option<&str> {
        self.model.contact_person.as_deref()
    }
    async fn email(&self) -> Option<&str> {
        self.model.email.as_deref()
    }
    async fn phone_number(&self) -> Option<&str> {
        self.model.phone_number.as_deref()
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct TransportationProvidersQuery;

#[Object]
impl TransportationProvidersQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<TransportationProviderNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = TransportationProviderEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| TransportationProviderNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<TransportationProvidersSort>>,
        filter_by: Option<Vec<TransportationProviderFilter>>,
    ) -> async_graphql::Result<Vec<TransportationProviderNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = TransportationProviderEntity::find();

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
            .map(|m| TransportationProviderNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct TransportationProvidersMutation;

#[Object]
impl TransportationProvidersMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateTransportationProvider,
    ) -> async_graphql::Result<TransportationProviderNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(TransportationProviderNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateTransportationProvider,
    ) -> async_graphql::Result<TransportationProviderNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(TransportationProviderNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = TransportationProviderEntity::delete_by_id(id)
            .exec(db)
            .await?;
        if res.rows_affected == 0 {
            return Err(async_graphql::Error::new(
                "Transportation provider not found",
            ));
        }
        Ok(format!("Deleted transportation provider with ID: {}", id))
    }
}
