use async_graphql::{Context, InputObject, Object};
use sea_orm::sea_query::Func;
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, Iden, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_contacts::{
    Column as ContactColumn, Entity as ContactEntity, Model as ContactModel,
};
use crate::entities::crm::contacts::{CreateContact, UpdateContact};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct ContactsSort {
    pub column: ContactColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct ContactFilter {
    pub column: ContactColumn,
    pub operator: FilterOperator,
    pub value: String,
}

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
    async fn company_id(&self) -> Option<Uuid> {
        self.model.company_id
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
    async fn address_id(&self) -> Option<Uuid> {
        self.model.address_id
    }
}

#[Object]
impl ContactsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<ContactsSort>>,
        filter_by: Option<Vec<ContactFilter>>,
    ) -> async_graphql::Result<Vec<ContactNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ContactEntity::find();
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let order = match sort.order {
                    SortOrder::Asc => sea_orm::Order::Asc,
                    SortOrder::Desc => sea_orm::Order::Desc,
                };
                query = query.order_by(sort.column, order);
            }
        }
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
