use axum::{
    Extension, Form, Json, Router,
    extract::{Path, Query},
    routing::{delete, get, patch, post},
};
use entity::{
    role_permissions::{self, CreateRolePermissionModel},
    roles::{self, CreateRoleModel, UpdateRoleModel},
};
use sea_orm::{
    ActiveModelTrait, ActiveValue, DatabaseConnection, EntityTrait, IntoActiveModel, LoaderTrait,
    PaginatorTrait, TransactionTrait,
};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use uuid::Uuid;
use validator::Validate;

use crate::api::{
    ListResult, PaginateQuery,
    error::{APIError, APIResult},
};

// Access control
#[derive(Debug, Deserialize, TS, Validate)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct CreateRolePayload {
    #[serde(flatten)]
    #[validate(nested)]
    role: CreateRoleModel,
    #[validate(nested)]
    permissions: Vec<CreateRolePermissionModel>,
}

#[derive(Debug, Serialize, TS, Validate)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct RolePermissionResponseModel {
    #[serde(flatten)]
    role: roles::Model,
    permissions: Vec<role_permissions::Model>,
}

#[axum::debug_handler]
async fn create_role(
    Extension(db): Extension<DatabaseConnection>,
    Form(payload): Form<CreateRolePayload>,
) -> APIResult<RolePermissionResponseModel> {
    if let Err(err) = payload.validate() {
        return Err(crate::api::error::APIError::Validator(err));
    }

    let trx = db.begin().await.map_err(|err| APIError::SeaOrm(err))?;

    // role
    let new_role = payload
        .role
        .into_active_model()
        .insert(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    // permissions
    let mut batch_insert_permissions = vec![];

    for permission in payload.permissions {
        let mut new_permission = permission.into_active_model();
        new_permission.role_id = ActiveValue::Set(new_role.id.clone());
        batch_insert_permissions.push(new_permission);
    }

    let new_permissions = role_permissions::Entity::insert_many(batch_insert_permissions)
        .exec_with_returning_many(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    _ = trx.commit().await.map_err(|err| APIError::SeaOrm(err))?;

    Ok(Json(RolePermissionResponseModel {
        role: new_role,
        permissions: new_permissions,
    }))
}

#[axum::debug_handler]
async fn list_roles(
    Extension(db): Extension<DatabaseConnection>,
    Query(paginate): Query<PaginateQuery>,
) -> APIResult<ListResult<RolePermissionResponseModel>> {
    let roles: Vec<roles::Model> = roles::Entity::find()
        .paginate(&db, paginate.limit.unwrap_or(25))
        .fetch_page(paginate.page.unwrap_or(0))
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    let permissions: Vec<Vec<role_permissions::Model>> = roles
        .load_many(role_permissions::Entity, &db)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    let items: Vec<RolePermissionResponseModel> = roles
        .into_iter()
        .zip(permissions.into_iter())
        .map(|(role, permissions)| RolePermissionResponseModel { role, permissions })
        .collect();

    Ok(Json(ListResult {
        total: items.len(),
        items,
    }))
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
        .route("/roles/{id}", patch(update_role))
        .route("/roles/{id}", delete(delete_role))
        .route("/roles/{role_id}/permissions", post(add_permission))
        .route(
            "/roles/{role_id}/permissions/{id}",
            patch(update_permission),
        )
        .route(
            "/roles/{role_id}/permissions/{id}",
            delete(remove_permission),
        )
}
