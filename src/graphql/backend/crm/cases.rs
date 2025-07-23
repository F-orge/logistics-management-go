use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_cases::{
    Column as CaseColumn, Entity as CaseEntity, Model as CaseModel,
};
use crate::entities::_generated::crm_contacts::Entity as ContactEntity;
use crate::entities::crm::cases::{CreateCase, UpdateCase};
use crate::entities::{FilterOperator, SortOrder};
use crate::graphql::backend::crm::contacts::ContactNode;

#[derive(Debug, Clone, InputObject)]
pub struct CasesSort {
    pub column: CaseColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct CaseFilter {
    pub column: CaseColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct CasesQuery;

pub struct CaseNode {
    pub model: CaseModel,
}

#[Object]
impl CaseNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn subject(&self) -> &str {
        &self.model.subject
    }
    async fn description(&self) -> &str {
        &self.model.description
    }
    async fn status(&self) -> &crate::entities::_generated::sea_orm_active_enums::CrmCaseStatus {
        &self.model.status
    }
    async fn priority(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::CrmCasePriority {
        &self.model.priority
    }
    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<ContactNode>> {
        let db = ctx.data::<DatabaseConnection>()?;

        if self.model.contact_id.is_none() {
            return Ok(None);
        }

        let contact = ContactEntity::find_by_id(self.model.contact_id.unwrap())
            .one(db)
            .await?;

        Ok(contact.map(|model| ContactNode { model }))
    }
    async fn closed_at(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.closed_at
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[Object]
impl CasesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<CasesSort>>,
        filter_by: Option<Vec<CaseFilter>>,
    ) -> async_graphql::Result<Vec<CaseNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = CaseEntity::find();
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let order = match sort.order {
                    SortOrder::Asc => sea_orm::Order::Asc,
                    SortOrder::Desc => sea_orm::Order::Desc,
                };
                query = query.order_by(sort.column, order);
            }
        }
        if let Some(filters) = filter_by {
            for filter in filters {
                query = match filter.operator {
                    FilterOperator::Equals => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .eq(filter.value.clone()),
                    ),
                    FilterOperator::Contains => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("%{}%", filter.value)),
                    ),
                    FilterOperator::StartsWith => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("{}%", filter.value)),
                    ),
                    FilterOperator::EndsWith => query.filter(
                        sea_orm::sea_query::Expr::col(filter.column)
                            .cast_as(sea_orm::sea_query::Alias::new("text"))
                            .like(format!("%{}", filter.value)),
                    ),
                };
            }
        }
        let cases = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;
        Ok(cases.into_iter().map(|model| CaseNode { model }).collect())
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Option<CaseNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let case = CaseEntity::find_by_id(id).one(db).await?;
        Ok(case.map(|model| CaseNode { model }))
    }
}

#[derive(Default)]
pub struct CasesMutation;

#[Object]
impl CasesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateCase,
    ) -> async_graphql::Result<CaseNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let case = payload.into_active_model();
        let case = case.insert(db).await?;
        Ok(CaseNode { model: case })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateCase,
    ) -> async_graphql::Result<CaseNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_case = active_model.update(db).await?;
        Ok(CaseNode {
            model: updated_case,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        CaseEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete case: {}", e))?;
        Ok(format!("Deleted case with ID: {}", id))
    }
}
