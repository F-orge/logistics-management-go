use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::contacts,
    contacts::{InsertContact, UpdateContact},
};
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;

#[Object(name = "Contacts")]
impl graphql_core::traits::GraphqlQuery<contacts::Model, Uuid> for contacts::Entity {
    #[graphql(
        name = "contacts",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep)).or(RoleGuard::new(UserRole::AccountManager)).or(RoleGuard::new(UserRole::CustomerSupportAgent))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<contacts::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let contacts = contacts::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();

        Ok(contacts)
    }

    #[graphql(
        name = "contact",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep)).or(RoleGuard::new(UserRole::AccountManager)).or(RoleGuard::new(UserRole::CustomerSupportAgent))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<contacts::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let contact = contacts::Entity::find_by_id(id).one(db).await?;

        Ok(contact)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmContactMutations")]
impl graphql_core::traits::GraphqlMutation<contacts::Model, Uuid, InsertContact, UpdateContact>
    for Mutations
{
    #[graphql(
        name = "createContact",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertContact,
    ) -> async_graphql::Result<contacts::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let trx = db.begin().await?;

        let active_model = value.into_active_model();

        let new_contact = active_model.insert(&trx).await?;

        _ = trx.commit().await?;

        Ok(new_contact)
    }

    #[graphql(
        name = "updateContact",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager)).or(RoleGuard::new(UserRole::SalesRep))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateContact,
    ) -> async_graphql::Result<contacts::Model> {
        let db = ctx.data::<DatabaseConnection>()?;

        let trx = db.begin().await?;

        let mut active_model = value.into_active_model();

        active_model.id = Set(id);

        let updated_contact = active_model.update(&trx).await?;

        _ = trx.commit().await?;

        Ok(updated_contact)
    }

    #[graphql(
        name = "deleteContact",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::SalesManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;

        let trx = db.begin().await?;

        let contact = contacts::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find contact"))?;

        let result = contact.delete(&trx).await?;

        _ = trx.commit().await?;

        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete contact"));
        }

        Ok(true)
    }
}
