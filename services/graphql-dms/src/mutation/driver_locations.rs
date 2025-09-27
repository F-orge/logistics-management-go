use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct CreateDriverLocationInput {
    pub driver_id: Uuid,
    pub latitude: f32,
    pub longitude: f32,
    pub altitude: Option<f32>,
    pub accuracy: Option<f32>,
    pub speed_kmh: Option<f32>,
    pub heading: Option<f32>,
    pub timestamp: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "DmsDriverLocationsMutations")]
impl Mutation {
    async fn create_driver_location(
        &self,
        ctx: &Context<'_>,
        payload: CreateDriverLocationInput,
    ) -> async_graphql::Result<crate::models::driver_locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::driver_locations::Model>(
            "insert into dms.driver_locations (driver_id, latitude, longitude, altitude, accuracy, speed_kmh, heading, timestamp) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *"
        )
        .bind(payload.driver_id)
        .bind(payload.latitude)
        .bind(payload.longitude)
        .bind(payload.altitude)
        .bind(payload.accuracy)
        .bind(payload.speed_kmh)
        .bind(payload.heading)
        .bind(payload.timestamp)
        .fetch_one(db)
        .await?)
    }

    async fn update_driver_location_driver_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        driver_id: Uuid,
    ) -> async_graphql::Result<crate::models::driver_locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::driver_locations::Model>(
            "update dms.driver_locations set driver_id = $1 where id = $2 returning *",
        )
        .bind(driver_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_driver_location_latitude(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        latitude: f32,
    ) -> async_graphql::Result<crate::models::driver_locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::driver_locations::Model>(
            "update dms.driver_locations set latitude = $1 where id = $2 returning *",
        )
        .bind(latitude)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_driver_location_longitude(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        longitude: f32,
    ) -> async_graphql::Result<crate::models::driver_locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::driver_locations::Model>(
            "update dms.driver_locations set longitude = $1 where id = $2 returning *",
        )
        .bind(longitude)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_driver_location_altitude(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        altitude: Option<f32>,
    ) -> async_graphql::Result<crate::models::driver_locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::driver_locations::Model>(
            "update dms.driver_locations set altitude = $1 where id = $2 returning *",
        )
        .bind(altitude)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_driver_location_accuracy(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        accuracy: Option<f32>,
    ) -> async_graphql::Result<crate::models::driver_locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::driver_locations::Model>(
            "update dms.driver_locations set accuracy = $1 where id = $2 returning *",
        )
        .bind(accuracy)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_driver_location_speed_kmh(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        speed_kmh: Option<f32>,
    ) -> async_graphql::Result<crate::models::driver_locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::driver_locations::Model>(
            "update dms.driver_locations set speed_kmh = $1 where id = $2 returning *",
        )
        .bind(speed_kmh)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_driver_location_heading(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        heading: Option<f32>,
    ) -> async_graphql::Result<crate::models::driver_locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::driver_locations::Model>(
            "update dms.driver_locations set heading = $1 where id = $2 returning *",
        )
        .bind(heading)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_driver_location_timestamp(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        timestamp: Option<chrono::DateTime<chrono::Utc>>,
    ) -> async_graphql::Result<crate::models::driver_locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::driver_locations::Model>(
            "update dms.driver_locations set timestamp = $1 where id = $2 returning *",
        )
        .bind(timestamp)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_driver_location_position(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        latitude: f32,
        longitude: f32,
        altitude: Option<f32>,
    ) -> async_graphql::Result<crate::models::driver_locations::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::driver_locations::Model>(
            "update dms.driver_locations set latitude = $1, longitude = $2, altitude = $3 where id = $4 returning *",
        )
        .bind(latitude)
        .bind(longitude)
        .bind(altitude)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn remove_driver_location(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from dms.driver_locations where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete driver location",
            ));
        }
        Ok("Driver location removed successfully".into())
    }
}
