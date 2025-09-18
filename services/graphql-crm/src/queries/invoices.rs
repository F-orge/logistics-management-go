use crate::entities::{
    _generated::invoices,
    invoices::{InsertInvoice, UpdateInvoice},
};
use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use graphql_auth::entities::_generated::sea_orm_active_enums::UserRole;
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Invoices")]
impl GraphqlQuery<invoices::Model, Uuid> for invoices::Entity {
    #[graphql(
        name = "invoices",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::AccountManager)).or(RoleGuard::new(UserRole::SalesManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<invoices::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let invoices = invoices::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(invoices)
    }
    #[graphql(
        name = "invoice",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::AccountManager)).or(RoleGuard::new(UserRole::SalesManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<invoices::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let invoice = invoices::Entity::find_by_id(id).one(db).await?;
        Ok(invoice)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmInvoiceMutations")]
impl GraphqlMutation<invoices::Model, Uuid, InsertInvoice, UpdateInvoice> for Mutations {
    #[graphql(name = "createInvoice", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::AccountManager))")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertInvoice,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_invoice = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_invoice)
    }
    #[graphql(name = "updateInvoice", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::AccountManager))")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateInvoice,
    ) -> async_graphql::Result<invoices::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_invoice = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_invoice)
    }
    #[graphql(name = "deleteInvoice", guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::AccountManager))")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let invoice = invoices::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find invoice"))?;
        let result = invoice.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete invoice"));
        }
        Ok(true)
    }
}
