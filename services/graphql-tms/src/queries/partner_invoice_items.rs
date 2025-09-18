use crate::entities::{
    _generated::partner_invoice_items,
    partner_invoice_items::{InsertPartnerInvoiceItem, UpdatePartnerInvoiceItem},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "PartnerInvoiceItems")]
impl graphql_core::traits::GraphqlQuery<partner_invoice_items::Model, Uuid>
    for partner_invoice_items::Entity
{
    #[graphql(name = "partnerInvoiceItems")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<partner_invoice_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let partner_invoice_items = partner_invoice_items::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(partner_invoice_items)
    }
    #[graphql(name = "partnerInvoiceItem")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<partner_invoice_items::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let partner_invoice_item = partner_invoice_items::Entity::find_by_id(id)
            .one(db)
            .await?;
        Ok(partner_invoice_item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsPartnerInvoiceItemMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        partner_invoice_items::Model,
        Uuid,
        InsertPartnerInvoiceItem,
        UpdatePartnerInvoiceItem,
    > for Mutations
{
    #[graphql(name = "createPartnerInvoiceItem")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertPartnerInvoiceItem,
    ) -> async_graphql::Result<partner_invoice_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_partner_invoice_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_partner_invoice_item)
    }
    #[graphql(name = "updatePartnerInvoiceItem")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdatePartnerInvoiceItem,
    ) -> async_graphql::Result<partner_invoice_items::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_partner_invoice_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_partner_invoice_item)
    }
    #[graphql(name = "deletePartnerInvoiceItem")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let partner_invoice_item = partner_invoice_items::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new(
                "Unable to find partner invoice item",
            ))?;
        let result = partner_invoice_item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete partner invoice item",
            ));
        }
        Ok(true)
    }
}
