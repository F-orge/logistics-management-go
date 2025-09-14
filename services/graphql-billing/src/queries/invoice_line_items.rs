use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

use crate::entities::{
    _generated::invoice_line_items,
    invoice_line_items::{InsertInvoiceLineItem, UpdateInvoiceLineItem},
};

#[Object(name = "InvoiceLineItems")]
impl graphql_core::traits::GraphqlQuery<invoice_line_items::Model, Uuid>
    for invoice_line_items::Entity
{
    #[graphql(name = "invoiceLineItems")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
    ) -> async_graphql::Result<Vec<invoice_line_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = invoice_line_items::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "invoiceLineItem")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<invoice_line_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = invoice_line_items::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "BillingInvoiceLineItemMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        invoice_line_items::Model,
        Uuid,
        InsertInvoiceLineItem,
        UpdateInvoiceLineItem,
    > for Mutations
{
    #[graphql(name = "createInvoiceLineItem")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertInvoiceLineItem,
    ) -> async_graphql::Result<invoice_line_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "updateInvoiceLineItem")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateInvoiceLineItem,
    ) -> async_graphql::Result<invoice_line_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "deleteInvoiceLineItem")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = invoice_line_items::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find invoice_line_item",
            ))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete invoice_line_item",
            ));
        }
        Ok(true)
    }
}
