use crate::entities::{
    _generated::invoice_items,
    invoice_items::{InsertInvoiceItem, UpdateInvoiceItem},
};
use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_auth::models::user::UserRole;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "InvoiceItems")]
impl graphql_core::traits::GraphqlQuery<invoice_items::Model, Uuid> for invoice_items::Entity {
    #[graphql(
        name = "invoiceItems",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<invoice_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let invoice_items = invoice_items::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(invoice_items)
    }
    #[graphql(
        name = "invoiceItem",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<invoice_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let invoice_item = invoice_items::Entity::find_by_id(id).one(db).await?;
        Ok(invoice_item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "CrmInvoiceItemMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        invoice_items::Model,
        Uuid,
        InsertInvoiceItem,
        UpdateInvoiceItem,
    > for Mutations
{
    #[graphql(
        name = "createInvoiceItem",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertInvoiceItem,
    ) -> async_graphql::Result<invoice_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_invoice_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_invoice_item)
    }
    #[graphql(
        name = "updateInvoiceItem",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateInvoiceItem,
    ) -> async_graphql::Result<invoice_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_invoice_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_invoice_item)
    }
    #[graphql(
        name = "deleteInvoiceItem",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let invoice_item = invoice_items::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find invoice item"))?;
        let result = invoice_item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete invoice item"));
        }
        Ok(true)
    }
}
