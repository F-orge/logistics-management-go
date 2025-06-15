use axum::{
    Extension, Form, Router,
    extract::{Path, Query},
    routing::{delete, get, patch, post},
};
use entity::{
    role_permissions::CreateRolePermissionModel,
    roles::{self, CreateRoleModel, UpdateRoleModel},
};
use sea_orm::DatabaseConnection;
use uuid::Uuid;

use crate::api::{PaginateQuery, error::APIResult};

// Access control
pub struct CreateRolePayload {
    role: CreateRoleModel,
    permission: CreateRolePermissionModel,
}

#[axum::debug_handler]
async fn create_role(
    Extension(db): Extension<DatabaseConnection>,
    Form(payload): Form<CreateRoleModel>,
) -> APIResult<roles::Model> {
    unimplemented!()
}

#[axum::debug_handler]
async fn list_roles(
    Extension(db): Extension<DatabaseConnection>,
    Query(paginate): Query<PaginateQuery>,
) -> APIResult<()> {
    unimplemented!()
}

#[axum::debug_handler]
async fn view_role(
    Extension(db): Extension<DatabaseConnection>,
    Path(id): Path<Uuid>,
) -> APIResult<()> {
    unimplemented!()
}

async fn add_permission() {}

async fn update_permission() {}

async fn remove_permission() {}

#[axum::debug_handler]
async fn update_role(
    Extension(db): Extension<DatabaseConnection>,
    Form(payload): Form<UpdateRoleModel>,
) -> APIResult<()> {
    unimplemented!()
}

#[axum::debug_handler]
async fn delete_role(
    Extension(db): Extension<DatabaseConnection>,
    Path(id): Path<Uuid>,
) -> APIResult<()> {
    unimplemented!()
}

pub fn router() -> Router {
    Router::new()
        .route("/roles", post(create_role))
        .route("/roles", get(list_roles))
        .route("/roles/{id}", get(view_role))
        .route("/roles", patch(update_role))
        .route("/roles/{id}", delete(delete_role))
        .route("/roles/{role_id}/permissions", post(add_permission))
        .route("/roles/{role_id}/permissions", patch(update_permission))
        .route(
            "/roles/{role_id}/permissions/{id}",
            delete(remove_permission),
        )
}
