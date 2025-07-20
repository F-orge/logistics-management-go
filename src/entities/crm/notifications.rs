use async_graphql::InputObject;
use sea_orm::{ActiveValue::Set, IntoActiveModel, entity::prelude::*};

use crate::entities::_generated::crm_notifications::*;
use crate::entities::_generated::sea_orm_active_enums::{
    CrmNotificationChannel, CrmNotificationDeliveryStatus, CrmNotificationType,
};

#[derive(Debug, Clone, InputObject)]
pub struct CreateNotification {
    pub shipment_id: Uuid,
    pub contact_id: Uuid,
    pub notification_type: CrmNotificationType,
    pub channel: CrmNotificationChannel,
    pub recipient: String,
    pub subject: Option<String>,
    pub message: String,
    pub sent_at: Option<DateTimeWithTimeZone>,
    pub delivery_status: CrmNotificationDeliveryStatus,
}

impl IntoActiveModel<ActiveModel> for CreateNotification {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.shipment_id = Set(self.shipment_id);
        active_model.contact_id = Set(self.contact_id);
        active_model.notification_type = Set(self.notification_type);
        active_model.channel = Set(self.channel);
        active_model.recipient = Set(self.recipient);
        active_model.subject = Set(self.subject);
        active_model.message = Set(self.message);
        active_model.sent_at = Set(self.sent_at);
        active_model.delivery_status = Set(self.delivery_status);

        active_model
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateNotification {
    pub id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub contact_id: Option<Uuid>,
    pub notification_type: Option<CrmNotificationType>,
    pub channel: Option<CrmNotificationChannel>,
    pub recipient: Option<String>,
    pub subject: Option<Option<String>>,
    pub message: Option<String>,
    pub sent_at: Option<Option<DateTimeWithTimeZone>>,
    pub delivery_status: Option<CrmNotificationDeliveryStatus>,
}

impl IntoActiveModel<ActiveModel> for UpdateNotification {
    fn into_active_model(self) -> ActiveModel {
        let mut active_model = ActiveModel::new();

        active_model.id = Set(self.id);

        if let Some(shipment_id) = self.shipment_id {
            active_model.shipment_id = Set(shipment_id);
        }
        if let Some(contact_id) = self.contact_id {
            active_model.contact_id = Set(contact_id);
        }
        if let Some(notification_type) = self.notification_type {
            active_model.notification_type = Set(notification_type);
        }
        if let Some(channel) = self.channel {
            active_model.channel = Set(channel);
        }
        if let Some(recipient) = self.recipient {
            active_model.recipient = Set(recipient);
        }
        if let Some(subject) = self.subject {
            active_model.subject = Set(subject);
        }
        if let Some(message) = self.message {
            active_model.message = Set(message);
        }
        if let Some(sent_at) = self.sent_at {
            active_model.sent_at = Set(sent_at);
        }
        if let Some(delivery_status) = self.delivery_status {
            active_model.delivery_status = Set(delivery_status);
        }

        active_model
    }
}
