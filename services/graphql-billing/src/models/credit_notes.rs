#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub invoice_id: Uuid,
    pub dispute_id: Option<Uuid>,
    pub credit_note_number: String,
    pub amount: Decimal,
    pub reason: String,
    pub issue_date: Date,
    pub applied_at: Option<DateTime>,
    pub currency: Option<String>,
    pub notes: Option<String>,
    pub created_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
