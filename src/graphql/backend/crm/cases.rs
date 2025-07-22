use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_cases::{
    Column as CaseColumn, Entity as CaseEntity, Model as CaseModel,
};
use crate::entities::crm::cases::{CreateCase, UpdateCase};
use crate::entities::{FilterOperator, SortOrder};

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

#[Object]
impl CasesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<CasesSort>>,
        filter_by: Option<Vec<CaseFilter>>,
    ) -> Vec<CaseModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
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
            .await
            .unwrap_or_default();
        cases
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<CaseModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let case = CaseEntity::find_by_id(id).one(db).await.unwrap_or(None);
        case
    }
}

#[derive(Default)]
pub struct CasesMutation;

#[Object]
impl CasesMutation {
    async fn create(&self, ctx: &Context<'_>, payload: CreateCase) -> anyhow::Result<CaseModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let case = payload.into_active_model();
        let case = case.insert(db).await?;
        Ok(case)
    }
    async fn update(&self, ctx: &Context<'_>, payload: UpdateCase) -> anyhow::Result<CaseModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_case = active_model.update(db).await?;
        Ok(updated_case)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        CaseEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete case: {}", e))?;
        Ok(format!("Deleted case with ID: {}", id))
    }
}
