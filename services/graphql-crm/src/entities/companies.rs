use async_graphql::{ComplexObject, Context, InputObject};
use graphql_auth::entities::_generated::user;
use rust_decimal::Decimal;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel, QueryFilter,
};
use uuid::Uuid;

use crate::entities::_generated::{companies, contacts, leads, opportunities};

#[derive(Debug, Clone, InputObject)]
pub struct InsertCompany {
    pub name: String,
    pub street: Option<String>,
    pub city: Option<String>,
    pub state: Option<String>,
    pub postal_code: Option<String>,
    pub country: Option<String>,
    pub phone_number: Option<String>,
    pub industry: Option<String>,
    pub website: Option<String>,
    pub annual_revenue: Option<Decimal>,
    pub owner_id: Option<Uuid>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCompany {
    pub name: Option<String>,
    pub street: Option<Option<String>>,
    pub city: Option<Option<String>>,
    pub state: Option<Option<String>>,
    pub postal_code: Option<Option<String>>,
    pub country: Option<Option<String>>,
    pub phone_number: Option<Option<String>>,
    pub industry: Option<Option<String>>,
    pub website: Option<Option<String>>,
    pub annual_revenue: Option<Option<Decimal>>,
    pub owner_id: Option<Option<Uuid>>,
}

impl IntoActiveModel<companies::ActiveModel> for InsertCompany {
    fn into_active_model(self) -> companies::ActiveModel {
        let mut active_model = companies::ActiveModel::new();

        active_model.name = Set(self.name.into());
        active_model.street = Set(self.street.into());
        active_model.city = Set(self.city.into());
        active_model.state = Set(self.state.into());
        active_model.postal_code = Set(self.postal_code.into());
        active_model.country = Set(self.country.into());
        active_model.phone_number = Set(self.phone_number.into());
        active_model.industry = Set(self.industry.into());
        active_model.website = Set(self.website.into());
        active_model.annual_revenue = Set(self.annual_revenue.into());
        active_model.owner_id = Set(self.owner_id);

        active_model
    }
}

impl IntoActiveModel<companies::ActiveModel> for UpdateCompany {
    fn into_active_model(self) -> companies::ActiveModel {
        let mut active_model = companies::ActiveModel::new();

        active_model.name = self.name.map(|v| Set(v)).unwrap_or(NotSet);
        active_model.street = self.street.map(|v| Set(v)).unwrap_or(NotSet);
        active_model.city = self.city.map(|v| Set(v)).unwrap_or(NotSet);
        active_model.state = self.state.map(|v| Set(v)).unwrap_or(NotSet);
        active_model.postal_code = self.postal_code.map(|v| Set(v)).unwrap_or(NotSet);
        active_model.country = self.country.map(|v| Set(v)).unwrap_or(NotSet);
        active_model.phone_number = self.phone_number.map(|v| Set(v)).unwrap_or(NotSet);
        active_model.industry = self.industry.map(|v| Set(v)).unwrap_or(NotSet);
        active_model.website = self.website.map(|v| Set(v)).unwrap_or(NotSet);
        active_model.annual_revenue = self.annual_revenue.map(|v| Set(v)).unwrap_or(NotSet);
        active_model.owner_id = self.owner_id.map(|v| Set(v)).unwrap_or(NotSet);

        active_model
    }
}

#[ComplexObject]
impl companies::Model {
    async fn contacts(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<contacts::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let results = contacts::Entity::find()
            .filter(contacts::Column::CompanyId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();

        Ok(results)
    }

    async fn leads(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<leads::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let results = leads::Entity::find()
            .filter(leads::Column::ConvertedCompanyId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();

        Ok(results)
    }

    async fn opportunities(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<opportunities::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let results = opportunities::Entity::find()
            .filter(opportunities::Column::CompanyId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();

        Ok(results)
    }

    async fn user(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<user::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;

        let result = user::Entity::find()
            .filter(user::Column::Id.eq(self.owner_id))
            .one(db)
            .await?;

        Ok(result)
    }
}
