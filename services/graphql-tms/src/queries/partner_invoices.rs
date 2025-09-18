use crate::entities::{
    _generated::partner_invoices,
    partner_invoices::{InsertPartnerInvoice, UpdatePartnerInvoice},
};
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "PartnerInvoices")]
impl graphql_core::traits::GraphqlQuery<partner_invoices::Model, Uuid>
    for partner_invoices::Entity
{
    #[graphql(name = "partnerInvoices")]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<partner_invoices::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let partner_invoices = partner_invoices::Entity::find()
            .all(db)
            .await
            .unwrap_or_default();
        Ok(partner_invoices)
    }
    #[graphql(name = "partnerInvoice")]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<partner_invoices::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let partner_invoice = partner_invoices::Entity::find_by_id(id).one(db).await?;
        Ok(partner_invoice)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsPartnerInvoiceMutations")]
impl
    graphql_core::traits::GraphqlMutation<
        partner_invoices::Model,
        Uuid,
        InsertPartnerInvoice,
        UpdatePartnerInvoice,
    > for Mutations
{
    #[graphql(name = "createPartnerInvoice")]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertPartnerInvoice,
    ) -> async_graphql::Result<partner_invoices::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_partner_invoice = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_partner_invoice)
    }
    #[graphql(name = "updatePartnerInvoice")]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdatePartnerInvoice,
    ) -> async_graphql::Result<partner_invoices::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_partner_invoice = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_partner_invoice)
    }
    #[graphql(name = "deletePartnerInvoice")]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let partner_invoice = partner_invoices::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find partner invoice"))?;
        let result = partner_invoice.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete partner invoice",
            ));
        }
        Ok(true)
    }
}
