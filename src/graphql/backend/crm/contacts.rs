use async_graphql::{Context, Object};
use sea_orm::{ActiveModelTrait, DatabaseConnection, IntoActiveModel};
use uuid::Uuid;

use crate::entities::_generated::crm_contacts::Model as ContactModel;
use crate::entities::crm::contacts::{CreateContact, UpdateContact};

#[derive(Default)]
pub struct ContactsQuery;

#[Object]
impl ContactsQuery {
    async fn list(&self, ctx: &Context<'_>) -> Vec<String> {
        // Placeholder for fetching contacts
        vec!["Contact 1".into(), "Contact 2".into()]
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> String {
        // Placeholder for viewing a specific contact
        format!("Viewing contact with ID: {}", id)
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
    async fn update(&self, ctx: &Context<'_>, id: Uuid, payload: UpdateContact) -> String {
        // Placeholder for updating a contact
        format!(
            "Updated contact with ID: {} to name: {:#?}",
            id, payload.first_name
        )
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> String {
        // Placeholder for deleting a contact
        format!("Deleted contact with ID: {}", id)
    }
}
