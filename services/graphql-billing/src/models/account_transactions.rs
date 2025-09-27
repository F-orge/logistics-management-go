use super::sea_orm_active_enums::TransactionTypeEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub client_account_id: Uuid,
    pub r#type: TransactionTypeEnum,
    pub amount: Decimal,
    pub running_balance: Option<Decimal>,
    pub source_record_id: Option<Uuid>,
    pub source_record_type: Option<String>,
    pub description: Option<String>,
    pub reference_number: Option<String>,
    pub transaction_date: Option<DateTime>,
    pub processed_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
