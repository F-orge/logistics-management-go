use async_graphql::{Context, Object};
use sea_orm::entity::prelude::Decimal;
use sea_orm::prelude::Expr;
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::{
    crm_companies::{Column as CompanyColumn, Entity as CompanyEntity},
    crm_contacts::{Column as ContactColumn, Entity as ContactEntity},
    crm_opportunities::{
        Column as OpportunityColumn, Entity as OpportunityEntity, Model as OpportunityModel,
    },
    crm_opportunity_products::{
        Column as OpportunityProductColumn, Entity as OpportunityProductEntity,
        Model as OpportunityProductModel,
    },
};
use crate::entities::{FilterGeneric, SortGeneric};

use crate::entities::crm::opportunities::{CreateOpportunity, UpdateOpportunity};
use crate::graphql::backend::crm::companies::CompanyNode;
use crate::graphql::backend::crm::contacts::ContactNode;
use crate::graphql::backend::crm::opportunity_products::OpportunityProductNode;

#[derive(Default)]
pub struct OpportunitiesQuery;

pub struct OpportunityNode {
    pub model: OpportunityModel,
}

#[Object]
impl OpportunityNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn name(&self) -> &str {
        &self.model.name
    }
    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<CompanyNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let company = CompanyEntity::find()
            .filter(Expr::col(CompanyColumn::Id).eq(self.model.company_id))
            .one(db)
            .await?;

        Ok(company.map(|model| CompanyNode { model }))
    }
    async fn primary_contact(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<ContactNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let contact = ContactEntity::find()
            .filter(Expr::col(ContactColumn::Id).eq(self.model.primary_contact_id))
            .one(db)
            .await?;

        Ok(contact.map(|model| ContactNode { model }))
    }
    async fn stage(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::CrmOpportunityStage {
        &self.model.stage
    }
    async fn amount(&self) -> Decimal {
        self.model.amount
    }
    async fn close_date(&self) -> Option<chrono::NaiveDate> {
        self.model.close_date
    }
    async fn probability(&self) -> Decimal {
        self.model.probability
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }

    async fn products(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<OpportunityProductNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let products = OpportunityProductEntity::find()
            .filter(Expr::col(OpportunityProductColumn::OpportunityId).eq(self.model.id))
            .all(db)
            .await?;

        Ok(products
            .into_iter()
            .map(|model| OpportunityProductNode { model })
            .collect())
    }
}

#[Object]
impl OpportunitiesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<OpportunityColumn>>>,
        filter_by: Option<Vec<FilterGeneric<OpportunityColumn>>>,
    ) -> async_graphql::Result<Vec<OpportunityNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = OpportunityEntity::find();
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
        let opportunities = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;
        Ok(opportunities
            .into_iter()
            .map(|model| OpportunityNode { model })
            .collect())
    }
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<OpportunityNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let opportunity = OpportunityEntity::find_by_id(id).one(db).await?;
        Ok(opportunity.map(|model| OpportunityNode { model }))
    }
}

#[derive(Default)]
pub struct OpportunitiesMutation;

#[Object]
impl OpportunitiesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateOpportunity,
    ) -> async_graphql::Result<OpportunityNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let opportunity = payload.into_active_model();
        let opportunity = opportunity.insert(db).await?;
        Ok(OpportunityNode { model: opportunity })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateOpportunity,
    ) -> async_graphql::Result<OpportunityNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_opportunity = active_model.update(db).await?;
        Ok(OpportunityNode {
            model: updated_opportunity,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        OpportunityEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete opportunity: {}", e))?;
        Ok(format!("Deleted opportunity with ID: {}", id))
    }
}
