use super::sea_orm_active_enums::PartnerInvoiceStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub carrier_id: Uuid,
    pub invoice_number: String,
    pub invoice_date: Date,
    pub total_amount: Decimal,
    pub status: Option<PartnerInvoiceStatusEnum>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
