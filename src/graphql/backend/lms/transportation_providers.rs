use sea_orm::prelude::Expr;
use crate::entities::_generated::prelude::LmsAddresses;
use crate::graphql::backend::lms::addresses::AddressNode;
use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_transportation_providers::{
    Column as TransportationProviderColumn, Entity as TransportationProviderEntity,
    Model as TransportationProviderModel,
};
use crate::entities::lms::transportation_providers::{
    CreateTransportationProvider, UpdateTransportationProvider,
};
use crate::entities::{FilterGeneric, SortGeneric};

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
    async fn address(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<AddressNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let address = LmsAddresses::find()
            .filter(Expr::col(crate::entities::_generated::lms_addresses::Column::Id).eq(self.model.address_id))
            .one(db)
            .await?;
        Ok(address.map(|model| AddressNode { model }))
    }
    async fn preferred_by_department_id(&self) -> Option<Uuid> {
        self.model.preferred_by_department_id
    }
    async fn api_endpoint(&self) -> Option<&str> {
        self.model.api_endpoint.as_deref()
    }
    async fn api_key(&self) -> Option<&str> {
        self.model.api_key.as_deref()
    }
    async fn contract_start_date(&self) -> Option<chrono::NaiveDate> {
        self.model.contract_start_date
    }
    async fn contract_end_date(&self) -> Option<chrono::NaiveDate> {
        self.model.contract_end_date
    }
    async fn payment_terms(&self) -> Option<&str> {
        self.model.payment_terms.as_deref()
    }
    async fn insurance_coverage(&self) -> Option<Decimal> {
        self.model.insurance_coverage
    }
    async fn performance_rating(&self) -> Option<Decimal> {
        self.model.performance_rating
    }
    async fn is_active(&self) -> bool {
        self.model.is_active
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
        sort_by: Option<Vec<SortGeneric<TransportationProviderColumn>>>,
        filter_by: Option<Vec<FilterGeneric<TransportationProviderColumn>>>,
    ) -> async_graphql::Result<Vec<TransportationProviderNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = TransportationProviderEntity::find();

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
