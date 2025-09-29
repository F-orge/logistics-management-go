use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{enums::LocationTypeEnum, putaway_rules};

#[derive(Debug, Clone, InputObject)]
pub struct CreatePutawayRuleInput {
    pub product_id: Uuid,
    pub client_id: Option<Uuid>,
    pub warehouse_id: Uuid,
    pub preferred_location_id: Option<Uuid>,
    pub location_type: Option<LocationTypeEnum>,
    pub priority: i32,
    pub min_quantity: Option<i32>,
    pub max_quantity: Option<i32>,
    pub weight_threshold: Option<f32>,
    pub volume_threshold: Option<f32>,
    pub requires_temperature_control: Option<bool>,
    pub requires_hazmat_approval: Option<bool>,
    pub is_active: Option<bool>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "WmsPutawayRulesMutation")]
impl Mutation {
    async fn create_putaway_rule(
        &self,
        ctx: &Context<'_>,
        payload: CreatePutawayRuleInput,
    ) -> async_graphql::Result<putaway_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, putaway_rules::Model>(
            "insert into wms.putaway_rules (product_id, client_id, warehouse_id, preferred_location_id, location_type, priority, min_quantity, max_quantity, weight_threshold, volume_threshold, requires_temperature_control, requires_hazmat_approval, is_active) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *",
        )
        .bind(payload.product_id)
        .bind(payload.client_id)
        .bind(payload.warehouse_id)
        .bind(payload.preferred_location_id)
        .bind(payload.location_type)
        .bind(payload.priority)
        .bind(payload.min_quantity)
        .bind(payload.max_quantity)
        .bind(payload.weight_threshold)
        .bind(payload.volume_threshold)
        .bind(payload.requires_temperature_control)
        .bind(payload.requires_hazmat_approval)
        .bind(payload.is_active)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_putaway_rule_priority(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        priority: i32,
    ) -> async_graphql::Result<putaway_rules::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, putaway_rules::Model>(
            "update wms.putaway_rules set priority = $1 where id = $2 returning *",
        )
        .bind(priority)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_putaway_rule(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.putaway_rules where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 1 {
            Ok("Putaway rule removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove putaway rule"))
        }
    }
}
