use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_addresses::{
    Column as AddressColumn, Entity as AddressEntity, Model as AddressModel,
};
use crate::entities::lms::addresses::{CreateAddress, UpdateAddress};
use crate::entities::{FilterGeneric, SortGeneric};

pub struct AddressNode {
    pub model: AddressModel,
}

#[Object]
impl AddressNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn address_line1(&self) -> &str {
        &self.model.address_line1
    }
    async fn address_line2(&self) -> Option<&str> {
        self.model.address_line2.as_deref()
    }
    async fn city(&self) -> &str {
        &self.model.city
    }
    async fn state(&self) -> &str {
        &self.model.state
    }
    async fn postal_code(&self) -> &str {
        &self.model.postal_code
    }
    async fn country(&self) -> &str {
        &self.model.country
    }
    async fn address_type(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsAddressType {
        self.model.address_type
    }
    async fn is_validated(&self) -> bool {
        self.model.is_validated
    }
    async fn latitude(&self) -> Option<Decimal> {
        self.model.latitude
    }
    async fn longitude(&self) -> Option<Decimal> {
        self.model.longitude
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[derive(Default)]
pub struct AddressesQuery;

#[Object]
impl AddressesQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<AddressNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = AddressEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| AddressNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<AddressColumn>>>,
        filter_by: Option<Vec<FilterGeneric<AddressColumn>>>,
    ) -> async_graphql::Result<Vec<AddressNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = AddressEntity::find();

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
            .map(|m| AddressNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct AddressesMutation;

#[Object]
impl AddressesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateAddress,
    ) -> async_graphql::Result<AddressNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(AddressNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateAddress,
    ) -> async_graphql::Result<AddressNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(AddressNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = AddressEntity::delete_by_id(id).exec(db).await?;
        if res.rows_affected == 0 {
            return Err(async_graphql::Error::new("Address not found"));
        }
        Ok(format!("Deleted address with ID: {}", id))
    }
}
