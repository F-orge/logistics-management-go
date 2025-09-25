use crate::entities::{
    _generated::expenses,
    expenses::{InsertExpense, UpdateExpense},
};
use async_graphql::Object;
use graphql_auth::guards::RoleGuard;
use graphql_auth::models::user::UserRole;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel,
    ModelTrait, PaginatorTrait, TransactionTrait,
};
use uuid::Uuid;

#[Object(name = "Expenses")]
impl graphql_core::traits::GraphqlQuery<expenses::Model, Uuid> for expenses::Entity {
    #[graphql(
        name = "expenses",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Driver)).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        page: u64,
        limit: u64,
    ) -> async_graphql::Result<Vec<expenses::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let expenses = expenses::Entity::find()
            .paginate(db, limit)
            .fetch_page(page)
            .await
            .unwrap_or_default();
        Ok(expenses)
    }
    #[graphql(
        name = "expense",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Driver)).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn view(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<expenses::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let expense = expenses::Entity::find_by_id(id).one(db).await?;
        Ok(expense)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "TmsExpenseMutations")]
impl graphql_core::traits::GraphqlMutation<expenses::Model, Uuid, InsertExpense, UpdateExpense>
    for Mutations
{
    #[graphql(
        name = "createExpense",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::Driver))"
    )]
    async fn create(
        &self,
        ctx: &async_graphql::Context<'_>,
        value: InsertExpense,
    ) -> async_graphql::Result<expenses::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_expense = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_expense)
    }
    #[graphql(
        name = "updateExpense",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn update(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
        value: UpdateExpense,
    ) -> async_graphql::Result<expenses::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_expense = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_expense)
    }
    #[graphql(
        name = "deleteExpense",
        guard = "RoleGuard::new(UserRole::Admin).or(RoleGuard::new(UserRole::TransportManager)).or(RoleGuard::new(UserRole::AccountManager))"
    )]
    async fn delete(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let expense = expenses::Entity::find_by_id(id)
            .one(&trx)
            .await?
            .ok_or(async_graphql::Error::new("Unable to find expense"))?;
        let result = expense.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete expense"));
        }
        Ok(true)
    }
}
