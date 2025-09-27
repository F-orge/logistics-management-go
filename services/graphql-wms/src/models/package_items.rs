#[derive(Clone, Debug, PartialEq, async_graphql :: SimpleObject)]
pub struct Model {
    pub id: Uuid,
    pub package_id: Uuid,
    pub product_id: Uuid,
    pub batch_id: Option<Uuid>,
    pub quantity: i32,
    pub lot_number: Option<String>,
    pub serial_numbers: Option<Vec<String>>,
    pub expiry_date: Option<Date>,
    pub unit_weight: Option<f32>,
    pub total_weight: Option<f32>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
}
