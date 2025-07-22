use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_companies::{
    Column as CompanyColumn, Entity as CompanyEntity, Model as CompanyModel,
};
use crate::entities::crm::companies::{CreateCompany, UpdateCompany};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct CompaniesSort {
    pub column: CompanyColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct CompanyFilter {
    pub column: CompanyColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct CompaniesQuery;

#[Object]
impl CompaniesQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<CompaniesSort>>,
        filter_by: Option<Vec<CompanyFilter>>,
    ) -> Vec<CompanyModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let mut query = CompanyEntity::find();
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
        let companies = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await
            .unwrap_or_default();
        companies
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<CompanyModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let company = CompanyEntity::find_by_id(id).one(db).await.unwrap_or(None);
        company
    }
}

#[derive(Default)]
pub struct CompaniesMutation;

#[Object]
impl CompaniesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateCompany,
    ) -> anyhow::Result<CompanyModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let company = payload.into_active_model();
        let company = company.insert(db).await?;
        Ok(company)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateCompany,
    ) -> anyhow::Result<CompanyModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_company = active_model.update(db).await?;
        Ok(updated_company)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        CompanyEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete company: {}", e))?;
        Ok(format!("Deleted company with ID: {}", id))
    }
}
