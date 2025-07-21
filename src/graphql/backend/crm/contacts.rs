use async_graphql::{Context, Object};
use sea_orm::{ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait};
use uuid::Uuid;

use crate::entities::_generated::crm_contacts::{Entity as ContactEntity, Model as ContactModel};
use crate::entities::crm::contacts::{CreateContact, UpdateContact};

#[derive(Default)]
pub struct ContactsQuery;

#[Object]
impl ContactsQuery {
    async fn list(&self, ctx: &Context<'_>, page: u64, limit: u64) -> Vec<ContactModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();

        let contacts = ContactEntity::find()
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
