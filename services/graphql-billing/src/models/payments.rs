use super::sea_orm_active_enums::PaymentMethodEnum;
use super::sea_orm_active_enums::PaymentStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub invoice_id: Uuid,
    pub amount: Decimal,
    pub payment_method: PaymentMethodEnum,
    pub transaction_id: Option<String>,
    pub gateway_reference: Option<String>,
    pub status: Option<PaymentStatusEnum>,
    pub payment_date: Option<DateTime>,
    pub processed_at: Option<DateTime>,
    pub currency: Option<String>,
    pub exchange_rate: Option<Decimal>,
    pub fees: Option<Decimal>,
    pub net_amount: Option<Decimal>,
    pub notes: Option<String>,
    pub processed_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
