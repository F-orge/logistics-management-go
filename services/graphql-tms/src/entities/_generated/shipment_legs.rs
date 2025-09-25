

use super::sea_orm_active_enums::ShipmentLegStatusEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("tms")
    }
    fn table_name(&self) -> &str {
        "shipment_legs"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "TmsShipmentLeg")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub shipment_id: Option<Uuid>,
    pub leg_sequence: i32,
    pub start_location: Option<String>,
    pub end_location: Option<String>,
    pub carrier_id: Option<Uuid>,
    pub internal_trip_id: Option<Uuid>,
    pub status: Option<ShipmentLegStatusEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    ShipmentId,
    LegSequence,
    StartLocation,
    EndLocation,
    CarrierId,
    InternalTripId,
    Status,
    CreatedAt,
    UpdatedAt,
}

#[derive(Copy, Clone, Debug, EnumIter, DerivePrimaryKey)]
pub enum PrimaryKey {
    Id,
}

impl PrimaryKeyTrait for PrimaryKey {
    type ValueType = Uuid;
    fn auto_increment() -> bool {
        false
    }
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {
    Carriers,
    OutboundShipments,
    PartnerInvoiceItems,
    ShipmentLegEvents,
    Trips,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::ShipmentId => ColumnType::Uuid.def().null(),
            Self::LegSequence => ColumnType::Integer.def(),
            Self::StartLocation => ColumnType::String(StringLen::N(255u32)).def().null(),
            Self::EndLocation => ColumnType::String(StringLen::N(255u32)).def().null(),
            Self::CarrierId => ColumnType::Uuid.def().null(),
            Self::InternalTripId => ColumnType::Uuid.def().null(),
            Self::Status => ShipmentLegStatusEnum::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::Carriers => Entity::belongs_to(super::carriers::Entity)
                .from(Column::CarrierId)
                .to(super::carriers::Column::Id)
                .into(),
            Self::OutboundShipments => Entity::belongs_to(super::outbound_shipments::Entity)
                .from(Column::ShipmentId)
                .to(super::outbound_shipments::Column::Id)
                .into(),
            Self::PartnerInvoiceItems => {
                Entity::has_many(super::partner_invoice_items::Entity).into()
            }
            Self::ShipmentLegEvents => Entity::has_many(super::shipment_leg_events::Entity).into(),
            Self::Trips => Entity::belongs_to(super::trips::Entity)
                .from(Column::InternalTripId)
                .to(super::trips::Column::Id)
                .into(),
        }
    }
}

impl Related<super::carriers::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Carriers.def()
    }
}

impl Related<super::outbound_shipments::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::OutboundShipments.def()
    }
}

impl Related<super::partner_invoice_items::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::PartnerInvoiceItems.def()
    }
}

impl Related<super::shipment_leg_events::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ShipmentLegEvents.def()
    }
}

impl Related<super::trips::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Trips.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
