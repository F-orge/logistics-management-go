use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder, entity::prelude::Decimal,
};
use uuid::Uuid;

use crate::entities::_generated::lms_shipments::{
    Column as ShipmentColumn, Entity as ShipmentEntity, Model as ShipmentModel,
};
use crate::entities::lms::shipments::{CreateShipment, UpdateShipment};
use crate::entities::{FilterGeneric, SortGeneric};

pub struct ShipmentNode {
    pub model: ShipmentModel,
}

#[Object]
impl ShipmentNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn tracking_number(&self) -> &str {
        &self.model.tracking_number
    }
    async fn sender_company_id(&self) -> Option<Uuid> {
        self.model.sender_company_id
    }
    async fn sender_contact_id(&self) -> Option<Uuid> {
        self.model.sender_contact_id
    }
    async fn sender_address_id(&self) -> Uuid {
        self.model.sender_address_id
    }
    async fn receiver_company_id(&self) -> Option<Uuid> {
        self.model.receiver_company_id
    }
    async fn receiver_contact_id(&self) -> Option<Uuid> {
        self.model.receiver_contact_id
    }
    async fn receiver_address_id(&self) -> Uuid {
        self.model.receiver_address_id
    }
    async fn service_id(&self) -> Uuid {
        self.model.service_id
    }
    async fn assigned_department_id(&self) -> Option<Uuid> {
        self.model.assigned_department_id
    }
    async fn primary_transport_mode(
        &self,
    ) -> crate::entities::_generated::sea_orm_active_enums::LmsTransportMode {
        self.model.primary_transport_mode
    }
    async fn status(&self) -> crate::entities::_generated::sea_orm_active_enums::LmsShipmentStatus {
        self.model.status
    }
    async fn total_weight(&self) -> Decimal {
        self.model.total_weight
    }
    async fn total_value(&self) -> Option<Decimal> {
        self.model.total_value
    }
    async fn insurance_amount(&self) -> Option<Decimal> {
        self.model.insurance_amount
    }
    async fn shipping_cost(&self) -> Option<Decimal> {
        self.model.shipping_cost
    }
    async fn currency(&self) -> &str {
        &self.model.currency
    }
    async fn pickup_date(&self) -> Option<chrono::NaiveDate> {
        self.model.pickup_date
    }
    async fn delivery_date(&self) -> Option<chrono::NaiveDate> {
        self.model.delivery_date
    }
    async fn estimated_delivery_date(&self) -> Option<chrono::NaiveDate> {
        self.model.estimated_delivery_date
    }
    async fn special_instructions(&self) -> Option<&str> {
        self.model.special_instructions.as_deref()
    }
    async fn created_by(&self) -> Option<Uuid> {
        self.model.created_by
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }

    // Relations
    async fn sender_company(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::crm_companies::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.sender_company_id {
            Some(id) => Ok(
                crate::entities::_generated::crm_companies::Entity::find_by_id(id)
                    .one(db)
                    .await?,
            ),
            None => Ok(None),
        }
    }

    async fn sender_contact(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::crm_contacts::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.sender_contact_id {
            Some(id) => Ok(
                crate::entities::_generated::crm_contacts::Entity::find_by_id(id)
                    .one(db)
                    .await?,
            ),
            None => Ok(None),
        }
    }

    async fn sender_address(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::lms_addresses::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        Ok(
            crate::entities::_generated::lms_addresses::Entity::find_by_id(
                self.model.sender_address_id,
            )
            .one(db)
            .await?,
        )
    }

    async fn receiver_company(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::crm_companies::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.receiver_company_id {
            Some(id) => Ok(
                crate::entities::_generated::crm_companies::Entity::find_by_id(id)
                    .one(db)
                    .await?,
            ),
            None => Ok(None),
        }
    }

    async fn receiver_contact(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::crm_contacts::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.receiver_contact_id {
            Some(id) => Ok(
                crate::entities::_generated::crm_contacts::Entity::find_by_id(id)
                    .one(db)
                    .await?,
            ),
            None => Ok(None),
        }
    }

    async fn receiver_address(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::lms_addresses::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        Ok(
            crate::entities::_generated::lms_addresses::Entity::find_by_id(
                self.model.receiver_address_id,
            )
            .one(db)
            .await?,
        )
    }

    async fn service(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::lms_shipping_services::Model>>
    {
        let db = ctx.data::<DatabaseConnection>()?;
        Ok(
            crate::entities::_generated::lms_shipping_services::Entity::find_by_id(
                self.model.service_id,
            )
            .one(db)
            .await?,
        )
    }

    async fn assigned_department(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::org_departments::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.assigned_department_id {
            Some(id) => Ok(
                crate::entities::_generated::org_departments::Entity::find_by_id(id)
                    .one(db)
                    .await?,
            ),
            None => Ok(None),
        }
    }

    async fn created_by_user(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::auth_users::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.created_by {
            Some(id) => Ok(
                crate::entities::_generated::auth_users::Entity::find_by_id(id)
                    .one(db)
                    .await?,
            ),
            None => Ok(None),
        }
    }
}

#[derive(Default)]
pub struct ShipmentsQuery;

#[Object]
impl ShipmentsQuery {
    async fn view(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<Option<ShipmentNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = ShipmentEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| ShipmentNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<ShipmentColumn>>>,
        filter_by: Option<Vec<FilterGeneric<ShipmentColumn>>>,
    ) -> async_graphql::Result<Vec<ShipmentNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = ShipmentEntity::find();

        // Sorting
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let (column, order) = sort.sort();
                query = query.order_by(column, order);
            }
        }

        // Filtering
        if let Some(filters) = filter_by {
            for filter in filters {
                query = query.filter(filter.filter());
            }
        }

        let items = query.paginate(db, limit).fetch_page(page).await?;
        Ok(items
            .into_iter()
            .map(|m| ShipmentNode { model: m })
            .collect())
    }
}

#[derive(Default)]
pub struct ShipmentsMutation;

#[Object]
impl ShipmentsMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateShipment,
    ) -> async_graphql::Result<ShipmentNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(ShipmentNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateShipment,
    ) -> async_graphql::Result<ShipmentNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(ShipmentNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = ShipmentEntity::delete_by_id(id).exec(db).await?;
        if res.rows_affected == 0 {
            return Err(async_graphql::Error::new("Shipment not found"));
        }
        Ok(format!("Deleted shipment with ID: {}", id))
    }
}
