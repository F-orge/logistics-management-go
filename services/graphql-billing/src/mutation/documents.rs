use async_graphql::{Context, InputObject, Object};
use uuid::Uuid;

use crate::models::{documents, enums::DocumentTypeEnum};

#[derive(Debug, Clone, InputObject)]
pub struct CreateDocumentInput {
    pub record_id: Uuid,
    pub record_type: String,
    pub document_type: DocumentTypeEnum,
    pub file_path: String,
    pub file_name: String,
    pub file_size: Option<i32>,
    pub mime_type: Option<String>,
    pub uploaded_by_user_id: Option<Uuid>,
}

#[derive(Debug, Clone, Default)]
pub struct DocumentsMutation;

#[Object(name = "BillingDocumentsMutation")]
impl DocumentsMutation {
    async fn create_document(
        &self,
        ctx: &Context<'_>,
        payload: CreateDocumentInput,
    ) -> async_graphql::Result<documents::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, documents::Model>(
            "insert into billing.documents (record_id, record_type, document_type, file_path, file_name, file_size, mime_type, uploaded_by_user_id) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *",
        )
        .bind(payload.record_id)
        .bind(payload.record_type)
        .bind(payload.document_type)
        .bind(payload.file_path)
        .bind(payload.file_name)
        .bind(payload.file_size)
        .bind(payload.mime_type)
        .bind(payload.uploaded_by_user_id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_document_record_id(
        &self,
        ctx: &Context<'_>,
        record_id: Uuid,
        id: Uuid,
    ) -> async_graphql::Result<documents::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, documents::Model>(
            "update billing.documents set record_id = $1 where id = $2 returning *",
        )
        .bind(record_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_document_record_type(
        &self,
        ctx: &Context<'_>,
        record_type: String,
        id: Uuid,
    ) -> async_graphql::Result<documents::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, documents::Model>(
            "update billing.documents set record_type = $1 where id = $2 returning *",
        )
        .bind(record_type)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_document_document_type(
        &self,
        ctx: &Context<'_>,
        document_type: DocumentTypeEnum,
        id: Uuid,
    ) -> async_graphql::Result<documents::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, documents::Model>(
            "update billing.documents set document_type = $1 where id = $2 returning *",
        )
        .bind(document_type)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_document_file_path(
        &self,
        ctx: &Context<'_>,
        file_path: String,
        id: Uuid,
    ) -> async_graphql::Result<documents::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, documents::Model>(
            "update billing.documents set file_path = $1 where id = $2 returning *",
        )
        .bind(file_path)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_document_file_name(
        &self,
        ctx: &Context<'_>,
        file_name: String,
        id: Uuid,
    ) -> async_graphql::Result<documents::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, documents::Model>(
            "update billing.documents set file_name = $1 where id = $2 returning *",
        )
        .bind(file_name)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_document_file_size(
        &self,
        ctx: &Context<'_>,
        file_size: Option<i32>,
        id: Uuid,
    ) -> async_graphql::Result<documents::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, documents::Model>(
            "update billing.documents set file_size = $1 where id = $2 returning *",
        )
        .bind(file_size)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_document_mime_type(
        &self,
        ctx: &Context<'_>,
        mime_type: Option<String>,
        id: Uuid,
    ) -> async_graphql::Result<documents::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, documents::Model>(
            "update billing.documents set mime_type = $1 where id = $2 returning *",
        )
        .bind(mime_type)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn update_document_uploaded_by_user_id(
        &self,
        ctx: &Context<'_>,
        uploaded_by_user_id: Option<Uuid>,
        id: Uuid,
    ) -> async_graphql::Result<documents::Model> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query_as::<_, documents::Model>(
            "update billing.documents set uploaded_by_user_id = $1 where id = $2 returning *",
        )
        .bind(uploaded_by_user_id)
        .bind(id)
        .fetch_one(db)
        .await?;

        Ok(result)
    }

    async fn remove_document(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<sqlx::PgPool>()?;

        let result = sqlx::query("delete from billing.documents where id = $1")
            .bind(id)
            .execute(db)
            .await?;

        if result.rows_affected() != 1 {
            return Err(async_graphql::Error::new("Unable to remove document"));
        }

        Ok("Document removed successfully".into())
    }
}
