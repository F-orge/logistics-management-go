use sea_orm::entity::prelude::*;

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn schema_name(&self) -> Option<&str> {
        Some("billing")
    }
    fn table_name(&self) -> &str {
        "client_accounts"
    }
}

#[derive(
    Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Eq, async_graphql :: SimpleObject,
)]
#[graphql(name = "BillingClientAccount")]
#[graphql(complex)]
pub struct Model {
    pub id: Uuid,
    pub client_id: Uuid,
    pub credit_limit: Option<Decimal>,
    pub available_credit: Option<Decimal>,
    pub wallet_balance: Option<Decimal>,
    pub currency: Option<String>,
    pub payment_terms_days: Option<i32>,
    pub is_credit_approved: Option<bool>,
    pub last_payment_date: Option<Date>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    ClientId,
    CreditLimit,
    AvailableCredit,
    WalletBalance,
    Currency,
    PaymentTermsDays,
    IsCreditApproved,
    LastPaymentDate,
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
    AccountTransactions,
    Companies,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Uuid.def(),
            Self::ClientId => ColumnType::Uuid.def().unique(),
            Self::CreditLimit => ColumnType::Decimal(Some((12u32, 2u32))).def().null(),
            Self::AvailableCredit => ColumnType::Decimal(Some((12u32, 2u32))).def().null(),
            Self::WalletBalance => ColumnType::Decimal(Some((12u32, 2u32))).def().null(),
            Self::Currency => ColumnType::String(StringLen::N(3u32)).def().null(),
            Self::PaymentTermsDays => ColumnType::Integer.def().null(),
            Self::IsCreditApproved => ColumnType::Boolean.def().null(),
            Self::LastPaymentDate => ColumnType::Date.def().null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::AccountTransactions => {
                Entity::has_many(super::account_transactions::Entity).into()
            }
            Self::Companies => Entity::belongs_to(super::companies::Entity)
                .from(Column::ClientId)
                .to(super::companies::Column::Id)
                .into(),
        }
    }
}

impl Related<super::account_transactions::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::AccountTransactions.def()
    }
}

impl Related<super::companies::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Companies.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
