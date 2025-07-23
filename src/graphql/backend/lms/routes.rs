use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, DatabaseConnection, EntityTrait, IntoActiveModel, PaginatorTrait,
    QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::lms_routes::{
    Column as RouteColumn, Entity as RouteEntity, Model as RouteModel,
};
use crate::entities::lms::routes::{CreateRoute, UpdateRoute};
use crate::entities::{FilterGeneric, SortGeneric};

pub struct RouteNode {
    pub model: RouteModel,
}

#[Object]
impl RouteNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }
    async fn route_name(&self) -> &str {
        &self.model.route_name
    }
    async fn driver_id(&self) -> Option<Uuid> {
        self.model.driver_id
    }
    async fn vehicle_id(&self) -> Option<Uuid> {
        self.model.vehicle_id
    }
    async fn route_date(&self) -> chrono::NaiveDate {
        self.model.route_date
    }
    async fn estimated_departure(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.estimated_departure
    }
    async fn actual_departure(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.actual_departure
    }
    async fn estimated_arrival(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.estimated_arrival
    }
    async fn actual_arrival(&self) -> Option<chrono::DateTime<chrono::FixedOffset>> {
        self.model.actual_arrival
    }
    async fn status(&self) -> crate::entities::_generated::sea_orm_active_enums::LmsRouteStatus {
        self.model.status
    }
    async fn created(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.created
    }
    async fn updated(&self) -> chrono::DateTime<chrono::FixedOffset> {
        self.model.updated
    }

    // Relations
    async fn driver(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::org_drivers::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.driver_id {
            Some(id) => Ok(
                crate::entities::_generated::org_drivers::Entity::find_by_id(id)
                    .one(db)
                    .await?,
            ),
            None => Ok(None),
        }
    }

    async fn vehicle(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Option<crate::entities::_generated::org_vehicles::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        match self.model.vehicle_id {
            Some(id) => Ok(
                crate::entities::_generated::org_vehicles::Entity::find_by_id(id)
                    .one(db)
                    .await?,
            ),
            None => Ok(None),
        }
    }
}

#[derive(Default)]
pub struct RoutesQuery;

#[Object]
impl RoutesQuery {
    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Option<RouteNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let model = RouteEntity::find_by_id(id).one(db).await?;
        Ok(model.map(|m| RouteNode { model: m }))
    }

    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<RouteColumn>>>,
        filter_by: Option<Vec<FilterGeneric<RouteColumn>>>,
    ) -> async_graphql::Result<Vec<RouteNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = RouteEntity::find();

        // Sorting
        if let Some(sorts) = sort_by {
            for sort in sorts {
                let (column, order) = sort.sort();
                query = query.order_by(column, order);
            }
        }

        // Filtering
        if let Some(filters) = filter_by {
            for filter in filters {
                query = query.filter(filter.filter());
            }
        }

        let items = query.paginate(db, limit).fetch_page(page).await?;
        Ok(items.into_iter().map(|m| RouteNode { model: m }).collect())
    }
}

#[derive(Default)]
pub struct RoutesMutation;

#[Object]
impl RoutesMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateRoute,
    ) -> async_graphql::Result<RouteNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = payload.into_active_model();
        let item = item.insert(db).await?;
        Ok(RouteNode { model: item })
    }
    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateRoute,
    ) -> async_graphql::Result<RouteNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_item = active_model.update(db).await?;
        Ok(RouteNode {
            model: updated_item,
        })
    }
    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        let res = RouteEntity::delete_by_id(id).exec(db).await?;
        if res.rows_affected == 0 {
            return Err(async_graphql::Error::new("Route not found"));
        }
        Ok(format!("Deleted route with ID: {}", id))
    }
}
