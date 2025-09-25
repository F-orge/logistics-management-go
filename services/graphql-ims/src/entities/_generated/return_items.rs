use super::sea_orm_active_enums::ReturnItemConditionEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("ims")
    }
    fn table_name(&self) -> &str {
        "return_items"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "ImsReturnItem")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub return_id: Uuid,
    pub product_id: Uuid,
    pub quantity_expected: i32,
    pub quantity_received: Option<i32>,
    pub quantity_variance: Option<i32>,
    pub condition: Option<ReturnItemConditionEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    ReturnId,
    ProductId,
    QuantityExpected,
    QuantityReceived,
    QuantityVariance,
    Condition,
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
    Products,
    Returns,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::ReturnId => ColumnType::Uuid.def(),
            Self::ProductId => ColumnType::Uuid.def(),
            Self::QuantityExpected => ColumnType::Integer.def(),
            Self::QuantityReceived => ColumnType::Integer.def().null(),
            Self::QuantityVariance => ColumnType::Integer.def().null(),
            Self::Condition => ReturnItemConditionEnum::db_type()
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
            Self::Products => Entity::belongs_to(super::products::Entity)
                .from(Column::ProductId)
                .to(super::products::Column::Id)
                .into(),
            Self::Returns => Entity::belongs_to(super::returns::Entity)
                .from(Column::ReturnId)
                .to(super::returns::Column::Id)
                .into(),
        }
    }
}

impl Related<super::products::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Products.def()
    }
}

impl Related<super::returns::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Returns.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
