use axum::{
    Extension, Form, Json, Router,
    extract::{Path, Query},
    routing::{delete, get, patch, post},
};
use entity::{
    role_permissions::{self, CreateRolePermissionModel, UpdateRolePermissionModel},
    roles::{self, CreateRoleModel, UpdateRoleModel},
};
use sea_orm::{
    ActiveModelTrait, ActiveValue, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    LoaderTrait, ModelTrait, PaginatorTrait, QueryFilter, TransactionTrait,
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
    let page = paginate.page.unwrap_or(0);
    let per_page = paginate.limit.unwrap_or(25);

    let paginator = roles::Entity::find().paginate(&db, per_page);

    let total_items_and_page = paginator
        .num_items_and_pages()
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    let roles: Vec<roles::Model> = paginator
        .fetch_page(page)
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
        page,
        per_page,
        total_items: total_items_and_page.number_of_items,
        total_pages: total_items_and_page.number_of_pages,
        items,
    }))
}

#[axum::debug_handler]
async fn view_role(
    Extension(db): Extension<DatabaseConnection>,
    Path(id): Path<Uuid>,
) -> APIResult<RolePermissionResponseModel> {
    let role = roles::Entity::find_by_id(id)
        .one(&db)
        .await
        .map_err(|err| APIError::SeaOrm(err))?
        .ok_or(APIError::SeaOrm(sea_orm::DbErr::RecordNotFound(id.into())))?;

    let permissions = role_permissions::Entity::find()
        .filter(role_permissions::Column::RoleId.eq(id))
        .all(&db)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    Ok(Json(RolePermissionResponseModel { role, permissions }))
}

async fn add_permission(
    Extension(db): Extension<DatabaseConnection>,
    Path(id): Path<Uuid>,
    Form(payload): Form<CreateRolePermissionModel>,
) -> APIResult<RolePermissionResponseModel> {
    if let Err(err) = payload.validate() {
        return Err(APIError::Validator(err));
    }

    let trx = db.begin().await.map_err(|err| APIError::SeaOrm(err))?;

    let role = roles::Entity::find_by_id(id)
        .one(&db)
        .await
        .map_err(|err| APIError::SeaOrm(err))?
        .ok_or(APIError::SeaOrm(sea_orm::DbErr::RecordNotFound(id.into())))?;

    let mut permission_active_record = payload.into_active_model();

    permission_active_record.role_id = ActiveValue::Set(role.id.clone());

    _ = permission_active_record
        .insert(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    // get all permissions
    let permissions = role_permissions::Entity::find()
        .filter(role_permissions::Column::RoleId.eq(role.id))
        .all(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    _ = trx.commit().await.map_err(|err| APIError::SeaOrm(err))?;

    Ok(Json(RolePermissionResponseModel { role, permissions }))
}

async fn update_permission(
    Extension(db): Extension<DatabaseConnection>,
    Path((role_id, permission_id)): Path<(Uuid, Uuid)>,
    Form(payload): Form<UpdateRolePermissionModel>,
) -> APIResult<RolePermissionResponseModel> {
    if let Err(err) = payload.validate() {
        return Err(APIError::Validator(err));
    }

    let trx = db.begin().await.map_err(|err| APIError::SeaOrm(err))?;

    let role = roles::Entity::find_by_id(role_id)
        .one(&db)
        .await
        .map_err(|err| APIError::SeaOrm(err))?
        .ok_or(APIError::SeaOrm(sea_orm::DbErr::RecordNotFound(
            role_id.into(),
        )))?;

    let mut permission_active_model = payload.into_active_model();

    permission_active_model.id = ActiveValue::Set(permission_id);
    permission_active_model.role_id = ActiveValue::Set(role_id);

    _ = permission_active_model
        .update(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    let permissions = role_permissions::Entity::find()
        .filter(role_permissions::Column::RoleId.eq(role_id))
        .all(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    _ = trx.commit().await.map_err(|err| APIError::SeaOrm(err))?;

    Ok(Json(RolePermissionResponseModel { role, permissions }))
}

async fn remove_permission(
    Extension(db): Extension<DatabaseConnection>,
    Path((role_id, permission_id)): Path<(Uuid, Uuid)>,
) -> APIResult<RolePermissionResponseModel> {
    let trx = db.begin().await.map_err(|err| APIError::SeaOrm(err))?;

    let role = roles::Entity::find_by_id(role_id)
        .one(&db)
        .await
        .map_err(|err| APIError::SeaOrm(err))?
        .ok_or(APIError::SeaOrm(sea_orm::DbErr::RecordNotFound(
            role_id.into(),
        )))?;

    _ = role_permissions::Entity::find()
        .filter(role_permissions::Column::Id.eq(permission_id))
        .one(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?
        .ok_or(APIError::SeaOrm(sea_orm::DbErr::RecordNotFound(
            permission_id.into(),
        )))?
        .delete(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    let permissions = role_permissions::Entity::find()
        .filter(role_permissions::Column::RoleId.eq(role_id))
        .all(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    _ = trx.commit().await.map_err(|err| APIError::SeaOrm(err))?;

    Ok(Json(RolePermissionResponseModel { role, permissions }))
}

#[axum::debug_handler]
async fn update_role(
    Extension(db): Extension<DatabaseConnection>,
    Path(id): Path<Uuid>,
    Form(payload): Form<UpdateRoleModel>,
) -> APIResult<RolePermissionResponseModel> {
    if let Err(err) = payload.validate() {
        return Err(APIError::Validator(err));
    }

    let trx = db.begin().await.map_err(|err| APIError::SeaOrm(err))?;

    let mut role_active_record = payload.into_active_model();

    role_active_record.id = ActiveValue::Set(id);

    let role = role_active_record
        .update(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    let permissions = role_permissions::Entity::find()
        .filter(role_permissions::Column::RoleId.eq(id))
        .all(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    _ = trx.commit().await.map_err(|err| APIError::SeaOrm(err))?;

    Ok(Json(RolePermissionResponseModel { role, permissions }))
}

#[axum::debug_handler]
async fn delete_role(
    Extension(db): Extension<DatabaseConnection>,
    Path(id): Path<Uuid>,
) -> APIResult<()> {
    let trx = db.begin().await.map_err(|err| APIError::SeaOrm(err))?;

    let _ = roles::Entity::find_by_id(id)
        .one(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?
        .ok_or(APIError::SeaOrm(sea_orm::DbErr::RecordNotFound(id.into())))?
        .delete(&trx)
        .await
        .map_err(|err| APIError::SeaOrm(err))?;

    _ = trx.commit().await.map_err(|err| APIError::SeaOrm(err))?;

    Ok(Json(()))
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
