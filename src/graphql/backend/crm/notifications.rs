use async_graphql::{Context, InputObject, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::crm_notifications::{
    Column as NotificationColumn, Entity as NotificationEntity, Model as NotificationModel,
};
use crate::entities::crm::notifications::{CreateNotification, UpdateNotification};
use crate::entities::{FilterOperator, SortOrder};

#[derive(Debug, Clone, InputObject)]
pub struct NotificationsSort {
    pub column: NotificationColumn,
    pub order: SortOrder,
}

#[derive(Debug, Clone, InputObject)]
pub struct NotificationFilter {
    pub column: NotificationColumn,
    pub operator: FilterOperator,
    pub value: String,
}

#[derive(Default)]
pub struct NotificationsQuery;

#[Object]
impl NotificationsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<NotificationsSort>>,
        filter_by: Option<Vec<NotificationFilter>>,
    ) -> Vec<NotificationModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let mut query = NotificationEntity::find();
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
        let notifications = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await
            .unwrap_or_default();
        notifications
    }
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> Option<NotificationModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let notification = NotificationEntity::find_by_id(id)
            .one(db)
            .await
            .unwrap_or(None);
        notification
    }
}

#[derive(Default)]
pub struct NotificationsMutation;

#[Object]
impl NotificationsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateNotification,
    ) -> anyhow::Result<NotificationModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let notification = payload.into_active_model();
        let notification = notification.insert(db).await?;
        Ok(notification)
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateNotification,
    ) -> anyhow::Result<NotificationModel> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        let active_model = payload.into_active_model();
        let updated_notification = active_model.update(db).await?;
        Ok(updated_notification)
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> anyhow::Result<String> {
        let db = ctx.data::<DatabaseConnection>().unwrap();
        NotificationEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete notification: {}", e))?;
        Ok(format!("Deleted notification with ID: {}", id))
    }
}
