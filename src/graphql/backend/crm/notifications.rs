use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_shipments::Entity as ShipmentEntity;
use crate::entities::_generated::{
    crm_contacts::Entity as ContactEntity,
    crm_notifications::{
        Column as NotificationColumn, Entity as NotificationEntity, Model as NotificationModel,
    },
};
use crate::entities::crm::notifications::{CreateNotification, UpdateNotification};
use crate::entities::{FilterGeneric, SortGeneric};
use crate::graphql::backend::crm::contacts::ContactNode;
use crate::graphql::backend::lms::shipments::ShipmentNode;

#[derive(Default)]
pub struct NotificationsQuery;

pub struct NotificationNode {
    pub model: NotificationModel,
}

#[Object]
impl NotificationNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }

    async fn shipment(&self, ctx: &Context<'_>) -> async_graphql::Result<ShipmentNode> {
        let db = ctx.data::<DatabaseConnection>()?;

        let shipment = ShipmentEntity::find_by_id(self.model.shipment_id)
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Shipment not found"))?;

        Ok(ShipmentNode { model: shipment })
    }

    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<ContactNode> {
        let db = ctx.data::<DatabaseConnection>()?;

        let contact = ContactEntity::find_by_id(self.model.contact_id)
            .one(db)
            .await?
            .ok_or_else(|| async_graphql::Error::new("Contact not found"))?;

        Ok(ContactNode { model: contact })
    }
    async fn notification_type(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::CrmNotificationType {
        &self.model.notification_type
    }
    async fn channel(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::CrmNotificationChannel {
        &self.model.channel
    }
    async fn recipient(&self) -> &str {
        &self.model.recipient
    }
    async fn subject(&self) -> Option<&str> {
        self.model.subject.as_deref()
    }
    async fn message(&self) -> &str {
        &self.model.message
    }
    async fn sent_at(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.sent_at
    }
    async fn delivery_status(
        &self,
    ) -> &crate::entities::_generated::sea_orm_active_enums::CrmNotificationDeliveryStatus {
        &self.model.delivery_status
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }
}

#[Object]
impl NotificationsQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<NotificationColumn>>>,
        filter_by: Option<Vec<FilterGeneric<NotificationColumn>>>,
    ) -> async_graphql::Result<Vec<NotificationNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = NotificationEntity::find();
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
        let notifications = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;
        Ok(notifications
            .into_iter()
            .map(|model| NotificationNode { model })
            .collect())
    }
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<NotificationNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let notification = NotificationEntity::find_by_id(id).one(db).await?;
        Ok(notification.map(|model| NotificationNode { model }))
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
    ) -> async_graphql::Result<NotificationNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let notification = payload.into_active_model();
        let notification = notification.insert(db).await?;
        Ok(NotificationNode {
            model: notification,
        })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateNotification,
    ) -> async_graphql::Result<NotificationNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_notification = active_model.update(db).await?;
        Ok(NotificationNode {
            model: updated_notification,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        NotificationEntity::delete_by_id(id)
            .exec(db)
            .await
            .map_err(|e| anyhow::anyhow!("Failed to delete notification: {}", e))?;
        Ok(format!("Deleted notification with ID: {}", id))
    }
}
