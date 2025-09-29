use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{enums::LocationTypeEnum, locations};

#[derive(Debug, Clone, InputObject)]
pub struct CreateLocationInput {
    pub warehouse_id: Uuid,
    pub parent_location_id: Option<Uuid>,
    pub name: String,
    pub barcode: Option<String>,
    pub type_: LocationTypeEnum,
    pub level: Option<i32>,
    pub path: Option<String>,
    pub max_weight: Option<f32>,
    pub max_volume: Option<f32>,
    pub max_pallets: Option<i32>,
    pub x_coordinate: Option<f32>,
    pub y_coordinate: Option<f32>,
    pub z_coordinate: Option<f32>,
    pub is_pickable: Option<bool>,
    pub is_receivable: Option<bool>,
    pub temperature_controlled: Option<bool>,
    pub hazmat_approved: Option<bool>,
    pub is_active: Option<bool>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "WmsLocationsMutation")]
impl Mutation {
    async fn create_location(
        &self,
        ctx: &Context<'_>,
        payload: CreateLocationInput,
    ) -> async_graphql::Result<locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let mut trx = db.begin().await?;

        let result = sqlx::query_as::<_, locations::Model>(
            "insert into wms.locations (warehouse_id, parent_location_id, name, barcode, type, level, path, max_weight, max_volume, max_pallets, x_coordinate, y_coordinate, z_coordinate, is_pickable, is_receivable, temperature_controlled, hazmat_approved, is_active) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) returning *",
        )
        .bind(payload.warehouse_id)
        .bind(payload.parent_location_id)
        .bind(payload.name)
        .bind(payload.barcode)
        .bind(payload.type_)
        .bind(payload.level)
        .bind(payload.path)
        .bind(payload.max_weight)
        .bind(payload.max_volume)
        .bind(payload.max_pallets)
        .bind(payload.x_coordinate)
        .bind(payload.y_coordinate)
        .bind(payload.z_coordinate)
        .bind(payload.is_pickable)
        .bind(payload.is_receivable)
        .bind(payload.temperature_controlled)
        .bind(payload.hazmat_approved)
        .bind(payload.is_active)
        .fetch_one(&mut *trx)
        .await?;

        trx.commit().await?;
        Ok(result)
    }

    async fn update_location_name(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        name: String,
    ) -> async_graphql::Result<locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query_as::<_, locations::Model>(
            "update wms.locations set name = $1 where id = $2 returning *",
        )
        .bind(name)
        .bind(id)
        .fetch_one(db)
        .await?;
        Ok(result)
    }

    async fn remove_location(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from wms.locations where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() == 1 {
            Ok("Location removed successfully".to_string())
        } else {
            Err(async_graphql::Error::new("Unable to remove location"))
        }
    }
}
