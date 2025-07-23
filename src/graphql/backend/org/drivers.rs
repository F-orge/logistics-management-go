use async_graphql::{Context, Object};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel,
    PaginatorTrait, QueryFilter, QueryOrder,
};
use uuid::Uuid;

use crate::entities::_generated::org_drivers::{
    Column as DriverColumn, Entity as DriverEntity, Model as DriverModel,
};
use crate::entities::org::drivers::{CreateDriver, UpdateDriver};
use crate::entities::{FilterGeneric, SortGeneric};

#[derive(Default)]
pub struct DriversQuery;

#[Object]
impl DriversQuery {
    async fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
        sort_by: Option<Vec<SortGeneric<DriverColumn>>>,
        filter_by: Option<Vec<FilterGeneric<DriverColumn>>>,
    ) -> async_graphql::Result<Vec<DriverNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let mut query = DriverEntity::find();

        if let Some(sorts) = sort_by {
            for sort in sorts {
                let (column, order) = sort.sort();
                query = query.order_by(column, order);
            }
        }

        if let Some(filters) = filter_by {
            for filter in filters {
                query = query.filter(filter.filter());
            }
        }
        let drivers = query
            .paginate(db, limit as u64)
            .fetch_page(page as u64)
            .await?;

        Ok(drivers
            .into_iter()
            .map(|driver| DriverNode { model: driver })
            .collect())
    }

    async fn view(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<Option<DriverNode>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let driver = DriverEntity::find_by_id(id).one(db).await?;
        Ok(driver.map(|model| DriverNode { model }))
    }
}

pub struct DriverNode {
    pub model: DriverModel,
}

#[Object]
impl DriverNode {
    async fn id(&self) -> Uuid {
        self.model.id
    }

    async fn employee_id(&self) -> &str {
        &self.model.employee_id
    }

    async fn first_name(&self) -> &str {
        &self.model.first_name
    }

    async fn last_name(&self) -> &str {
        &self.model.last_name
    }

    async fn license_number(&self) -> &str {
        &self.model.license_number
    }

    async fn phone_number(&self) -> &str {
        &self.model.phone_number
    }

    async fn email(&self) -> &str {
        &self.model.email
    }

    async fn hire_date(&self) -> &sea_orm::prelude::Date {
        &self.model.hire_date
    }

    async fn status(&self) -> &crate::entities::_generated::sea_orm_active_enums::OrgDriverStatus {
        &self.model.status
    }

    async fn created(&self) -> &sea_orm::prelude::DateTimeWithTimeZone {
        &self.model.created
    }

    async fn updated(&self) -> &sea_orm::prelude::DateTimeWithTimeZone {
        &self.model.updated
    }
}

#[derive(Default)]
pub struct DriversMutation;

#[Object]
impl DriversMutation {
    async fn create(
        &self,
        ctx: &Context<'_>,
        payload: CreateDriver,
    ) -> async_graphql::Result<DriverNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let driver = payload.into_active_model();
        let driver = driver.insert(db).await?;
        Ok(DriverNode { model: driver })
    }

    async fn update(
        &self,
        ctx: &Context<'_>,
        payload: UpdateDriver,
    ) -> async_graphql::Result<DriverNode> {
        let db = ctx.data::<DatabaseConnection>()?;
        let active_model = payload.into_active_model();
        let updated_driver = active_model.update(db).await?;
        Ok(DriverNode {
            model: updated_driver,
        })
    }

    async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> async_graphql::Result<String> {
        let db = ctx.data::<DatabaseConnection>()?;
        DriverEntity::delete_by_id(id).exec(db).await?;
        Ok(format!("Deleted driver with ID: {}", id))
    }
}
