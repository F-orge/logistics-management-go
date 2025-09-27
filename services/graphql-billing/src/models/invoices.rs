use super::sea_orm_active_enums::InvoiceStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub client_id: Uuid,
    pub quote_id: Option<Uuid>,
    pub invoice_number: String,
    pub status: Option<InvoiceStatusEnum>,
    pub issue_date: Date,
    pub due_date: Date,
    pub total_amount: Decimal,
    pub amount_paid: Option<Decimal>,
    pub amount_outstanding: Option<Decimal>,
    pub currency: Option<String>,
    pub tax_amount: Option<Decimal>,
    pub discount_amount: Option<Decimal>,
    pub subtotal: Option<Decimal>,
    pub payment_terms: Option<String>,
    pub notes: Option<String>,
    pub sent_at: Option<DateTime>,
    pub paid_at: Option<DateTime>,
    pub created_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
