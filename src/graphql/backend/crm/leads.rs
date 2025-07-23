use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, prelude::Expr,
};
use uuid::Uuid;

use crate::entities::crm::leads::{CreateLead, UpdateLead};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::{
    entities::_generated::{
        crm_contacts::{Column as ContactColumn, Entity as ContactEntity},
        crm_leads::{Column as LeadColumn, Entity as LeadEntity, Model as LeadModel},
    },
    graphql::backend::crm::contacts::ContactNode,
};

#[derive(Default)]
pub struct LeadsQuery;

pub struct LeadNode {
    pub model: LeadModel,
}

#[Object]
impl LeadNode {
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
    async fn company_name(&self) -> Option<&str> {
        self.model.company_name.as_deref()
    }
    async fn lead_source(&self) -> Option<&str> {
        self.model.lead_source.as_deref()
    }
    async fn lead_status(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::CrmLeadStatus {
        &self.model.lead_status
    }
    async fn lead_score(&self) -> i32 {
        self.model.lead_score
    }
    async fn converted_to_contact(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<ContactNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let contact = ContactEntity::find()
            .filter(Expr::col(ContactColumn::Id).eq(self.model.converted_to_contact_id))
            .one(db)
            .await?;

        Ok(contact.map(|model| ContactNode { model }))
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[Object]
impl LeadsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<LeadColumn>>>,
        filter_by: Option<Vec<FilterGeneric<LeadColumn>>>,
    ) -> async_graphql::Result<Vec<LeadNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = LeadEntity::find();
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let (column, order) = sort.sort();
                query = query.order_by(column, order);
            }
        }
        if let Some(filters) = filter_by {
            for filter in filters {
                query = query.filter(filter.filter());
            }
        }
        let leads = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;
        Ok(leads.into_iter().map(|model| LeadNode { model }).collect())
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Option<LeadNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let lead = LeadEntity::find_by_id(id).one(db).await?;
        Ok(lead.map(|model| LeadNode { model }))
    }
}

#[derive(Default)]
pub struct LeadsMutation;

#[Object]
impl LeadsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateLead,
    ) -> async_graphql::Result<LeadNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let lead = payload.into_active_model();
        let lead = lead.insert(db).await?;
        Ok(LeadNode { model: lead })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateLead,
    ) -> async_graphql::Result<LeadNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_lead = active_model.update(db).await?;
        Ok(LeadNode {
            model: updated_lead,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        LeadEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete lead: {}", e))?;
        Ok(format!("Deleted lead with ID: {}", id))
    }
}
