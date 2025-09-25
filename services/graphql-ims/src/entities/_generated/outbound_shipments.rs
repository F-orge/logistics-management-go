

use super::sea_orm_active_enums::OutboundShipmentStatusEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("ims")
    }
    fn table_name(&self) -> &str {
        "outbound_shipments"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "ImsOutboundShipment")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub sales_order_id: Uuid,
    pub warehouse_id: Uuid,
    pub status: Option<OutboundShipmentStatusEnum>,
    pub tracking_number: Option<String>,
    pub carrier: Option<String>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    SalesOrderId,
    WarehouseId,
    Status,
    TrackingNumber,
    Carrier,
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
    OutboundShipmentItems,
    SalesOrders,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::SalesOrderId => ColumnType::Uuid.def(),
            Self::WarehouseId => ColumnType::Uuid.def(),
            Self::Status => OutboundShipmentStatusEnum::db_type()
                .get_column_type()
                .to_owned()
                .def()
                .null(),
            Self::TrackingNumber => ColumnType::String(StringLen::N(100u32)).def().null(),
            Self::Carrier => ColumnType::String(StringLen::N(100u32)).def().null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::OutboundShipmentItems => {
                Entity::has_many(super::outbound_shipment_items::Entity).into()
            }
            Self::SalesOrders => Entity::belongs_to(super::sales_orders::Entity)
                .from(Column::SalesOrderId)
                .to(super::sales_orders::Column::Id)
                .into(),
        }
    }
}

impl Related<super::outbound_shipment_items::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::OutboundShipmentItems.def()
    }
}

impl Related<super::sales_orders::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::SalesOrders.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
