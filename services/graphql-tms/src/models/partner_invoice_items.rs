#[derive(Clone, Debug, PartialEq, Eq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub partner_invoice_id: Uuid,
    pub shipment_leg_id: Uuid,
    pub amount: Decimal,
}
