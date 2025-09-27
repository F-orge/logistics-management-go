use super::sea_orm_active_enums::QuoteStatusEnum;

#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub client_id: Option<Uuid>,
    pub origin_details: String,
    pub destination_details: String,
    pub weight: Option<Decimal>,
    pub length: Option<Decimal>,
    pub width: Option<Decimal>,
    pub height: Option<Decimal>,
    pub volume: Option<Decimal>,
    pub quoted_price: Decimal,
    pub service_level: Option<String>,
    pub expires_at: Option<DateTime>,
    pub status: Option<QuoteStatusEnum>,
    pub quote_number: Option<String>,
    pub notes: Option<String>,
    pub created_by_user_id: Option<Uuid>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
