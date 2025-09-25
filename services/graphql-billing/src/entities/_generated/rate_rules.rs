

use super::sea_orm_active_enums::PricingModelEnum;
use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("billing")
    }
    fn table_name(&self) -> &str {
        "rate_rules"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "BillingRateRule")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub rate_card_id: Uuid,
    pub condition: String,
    pub value: String,
    pub price: Decimal,
    pub pricing_model: PricingModelEnum,
    pub min_value: Option<Decimal>,
    pub max_value: Option<Decimal>,
    pub priority: Option<i32>,
    pub is_active: Option<bool>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    RateCardId,
    Condition,
    Value,
    Price,
    PricingModel,
    MinValue,
    MaxValue,
    Priority,
    IsActive,
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
    RateCards,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::RateCardId => ColumnType::Uuid.def(),
            Self::Condition => ColumnType::String(StringLen::N(100u32)).def(),
            Self::Value => ColumnType::String(StringLen::N(255u32)).def(),
            Self::Price => ColumnType::Decimal(Some((10u32, 2u32))).def(),
            Self::PricingModel => PricingModelEnum::db_type()
                .get_column_type()
                .to_owned()
                .def(),
            Self::MinValue => ColumnType::Decimal(Some((10u32, 2u32))).def().null(),
            Self::MaxValue => ColumnType::Decimal(Some((10u32, 2u32))).def().null(),
            Self::Priority => ColumnType::Integer.def().null(),
            Self::IsActive => ColumnType::Boolean.def().null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::RateCards => Entity::belongs_to(super::rate_cards::Entity)
                .from(Column::RateCardId)
                .to(super::rate_cards::Column::Id)
                .into(),
        }
    }
}

impl Related<super::rate_cards::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::RateCards.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
