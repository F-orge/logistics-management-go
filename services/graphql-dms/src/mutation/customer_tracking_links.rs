use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct CreateCustomerTrackingLinkInput {
    pub delivery_task_id: Uuid,
    pub tracking_token: String,
    pub is_active: Option<bool>,
    pub expires_at: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "DmsCustomerTrackingLinksMutations")]
impl Mutation {
    async fn create_customer_tracking_link(
        &self,
        ctx: &Context<'_>,
        payload: CreateCustomerTrackingLinkInput,
    ) -> async_graphql::Result<crate::models::customer_tracking_links::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::customer_tracking_links::Model>(
            "insert into dms.customer_tracking_links (delivery_task_id, tracking_token, is_active, expires_at) values ($1, $2, $3, $4) returning *"
        )
        .bind(payload.delivery_task_id)
        .bind(payload.tracking_token)
        .bind(payload.is_active)
        .bind(payload.expires_at)
        .fetch_one(db)
        .await?)
    }

    async fn update_customer_tracking_link_delivery_task_id(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        delivery_task_id: Uuid,
    ) -> async_graphql::Result<crate::models::customer_tracking_links::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::customer_tracking_links::Model>(
            "update dms.customer_tracking_links set delivery_task_id = $1 where id = $2 returning *",
        )
        .bind(delivery_task_id)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_customer_tracking_link_tracking_token(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        tracking_token: String,
    ) -> async_graphql::Result<crate::models::customer_tracking_links::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::customer_tracking_links::Model>(
            "update dms.customer_tracking_links set tracking_token = $1 where id = $2 returning *",
        )
        .bind(tracking_token)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_customer_tracking_link_is_active(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        is_active: Option<bool>,
    ) -> async_graphql::Result<crate::models::customer_tracking_links::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as::<_, crate::models::customer_tracking_links::Model>(
                "update dms.customer_tracking_links set is_active = $1 where id = $2 returning *",
            )
            .bind(is_active)
            .bind(id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn update_customer_tracking_link_access_count(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        access_count: Option<i32>,
    ) -> async_graphql::Result<crate::models::customer_tracking_links::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::customer_tracking_links::Model>(
            "update dms.customer_tracking_links set access_count = $1 where id = $2 returning *",
        )
        .bind(access_count)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_customer_tracking_link_last_accessed_at(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        last_accessed_at: Option<chrono::DateTime<chrono::Utc>>,
    ) -> async_graphql::Result<crate::models::customer_tracking_links::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(sqlx::query_as::<_, crate::models::customer_tracking_links::Model>(
            "update dms.customer_tracking_links set last_accessed_at = $1 where id = $2 returning *",
        )
        .bind(last_accessed_at)
        .bind(id)
        .fetch_one(db)
        .await?)
    }

    async fn update_customer_tracking_link_expires_at(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        expires_at: Option<chrono::DateTime<chrono::Utc>>,
    ) -> async_graphql::Result<crate::models::customer_tracking_links::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;
        Ok(
            sqlx::query_as::<_, crate::models::customer_tracking_links::Model>(
                "update dms.customer_tracking_links set expires_at = $1 where id = $2 returning *",
            )
            .bind(expires_at)
            .bind(id)
            .fetch_one(db)
            .await?,
        )
    }

    async fn remove_customer_tracking_link(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;
        let result = sqlx::query("delete from dms.customer_tracking_links where id = $1")
            .bind(id)
            .execute(db)
            .await?;
        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new(
                "Unable to delete customer tracking link",
            ));
        }
        Ok("Customer tracking link removed successfully".into())
    }
}
