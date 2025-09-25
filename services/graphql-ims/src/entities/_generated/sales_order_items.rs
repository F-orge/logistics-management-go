use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("ims")
    }
    fn table_name(&self) -> &str {
        "sales_order_items"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "ImsSalesOrderItem")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub sales_order_id: Uuid,
    pub product_id: Uuid,
    pub quantity_ordered: i32,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    SalesOrderId,
    ProductId,
    QuantityOrdered,
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
    Products,
    SalesOrders,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::SalesOrderId => ColumnType::Uuid.def(),
            Self::ProductId => ColumnType::Uuid.def(),
            Self::QuantityOrdered => ColumnType::Integer.def(),
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
            Self::Products => Entity::belongs_to(super::products::Entity)
                .from(Column::ProductId)
                .to(super::products::Column::Id)
                .into(),
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

impl Related<super::products::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Products.def()
    }
}

impl Related<super::sales_orders::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::SalesOrders.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
