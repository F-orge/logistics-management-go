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

#[Object]
impl ContactsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<ContactsSort>>,
        filter_by: Option<Vec<ContactFilter>>,
    ) -> Vec<ContactModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();

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
            .await
            .unwrap_or_default();

        contacts
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<ContactModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();

        let contact = ContactEntity::find_by_id(id).one(db).await.unwrap_or(None);

        contact
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
    ) -> anyhow::Result<ContactModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();

        let contact = payload.into_active_model();

        let contact = contact.insert(db).await?;

        Ok(contact)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateContact,
    ) -> anyhow::Result<ContactModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();

        let active_model = payload.into_active_model();

        let updated_contact = active_model.update(db).await?;

        Ok(updated_contact)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();

        ContactEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete contact: {}", e))?;

        Ok(format!("Deleted contact with ID: {}", id))
    }
}
