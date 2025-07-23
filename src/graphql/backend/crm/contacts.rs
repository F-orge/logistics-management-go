use async_graphql::{Context, Object};
use sea_orm::prelude::Expr;
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_companies::{
    Column as CompanyColumn, Entity as CompanyEntity,
};
use crate::entities::_generated::crm_contacts::{
    Column as ContactColumn, Entity as ContactEntity, Model as ContactModel,
};
use crate::entities::_generated::lms_addresses::{
    Column as AddressColumn, Entity as AddressEntity,
};

use crate::entities::crm::contacts::{CreateContact, UpdateContact};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::crm::companies::CompanyNode;
use crate::graphql::backend::lms::addresses::AddressNode;

#[derive(Default)]
pub struct ContactsQuery;

pub struct ContactNode {
    pub model: ContactModel,
}

#[Object]
impl ContactNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn first_name(&self) -> &str {
        &self.model.first_name
    }
    async fn last_name(&self) -> &str {
        &self.model.last_name
    }
    async fn email(&self) -> &str {
        &self.model.email
    }
    async fn phone_number(&self) -> Option<&str> {
        self.model.phone_number.as_deref()
    }
    async fn job_title(&self) -> Option<&str> {
        self.model.job_title.as_deref()
    }
    async fn lead_source(&self) -> Option<&str> {
        self.model.lead_source.as_deref()
    }
    async fn status(&self) -> &crate::entities::_generated::sea_orm_active_enums::CrmContactStatus {
        &self.model.status
    }
    async fn birth_date(&self) -> Option<chrono::NaiveDate> {
        self.model.birth_date
    }

    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<CompanyNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let company = CompanyEntity::find()
            .filter(Expr::col(CompanyColumn::Id).eq(self.model.company_id))
            .one(db)
            .await?;

        Ok(company.map(|model| CompanyNode { model }))
    }

    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }

    async fn address(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<AddressNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let address = AddressEntity::find()
            .filter(Expr::col(AddressColumn::Id).eq(self.model.address_id))
            .one(db)
            .await?;

        Ok(address.map(|model| AddressNode { model }))
    }
}

#[Object]
impl ContactsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<ContactColumn>>>,
        filter_by: Option<Vec<FilterGeneric<ContactColumn>>>,
    ) -> async_graphql::Result<Vec<ContactNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ContactEntity::find();
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let (column, order) = sort.sort();
                query = query.order_by(column, order);
            }
        }
        if let Some(filters) = filter_by {
            for filter in filters {
                query = query.filter(filter.filter());
            }
        }
        let contacts = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;
        Ok(contacts
            .into_iter()
            .map(|model| ContactNode { model })
            .collect())
    }
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<ContactNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let contact = ContactEntity::find_by_id(id).one(db).await?;
        Ok(contact.map(|model| ContactNode { model }))
    }
}

#[derive(Default)]
pub struct ContactsMutation;

#[Object]
impl ContactsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateContact,
    ) -> async_graphql::Result<ContactNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let contact = payload.into_active_model();
        let contact = contact.insert(db).await?;
        Ok(ContactNode { model: contact })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateContact,
    ) -> async_graphql::Result<ContactNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_contact = active_model.update(db).await?;
        Ok(ContactNode {
            model: updated_contact,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        ContactEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete contact: {}", e))?;
        Ok(format!("Deleted contact with ID: {}", id))
    }
}
