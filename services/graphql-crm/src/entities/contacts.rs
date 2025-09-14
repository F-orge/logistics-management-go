use crate::entities::_generated::contacts;
use crate::entities::_generated::{cases, companies, interactions, leads, opportunities, user};
use async_graphql::InputObject;
use async_graphql::{ComplexObject, Context};
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};
use uuid::Uuid;

#[derive(Debug, Clone, InputObject)]
pub struct InsertContact {
    pub name: String,
    pub email: String,
    pub phone_number: Option<String>,
    pub job_title: Option<String>,
    pub company_id: Option<Uuid>,
    pub owner_id: Uuid,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateContact {
    pub name: Option<String>,
    pub email: Option<String>,
    pub phone_number: Option<Option<String>>,
    pub job_title: Option<Option<String>>,
    pub company_id: Option<Option<Uuid>>,
    pub owner_id: Option<Uuid>,
}

impl IntoActiveModel<contacts::ActiveModel> for InsertContact {
    fn into_active_model(self) -> contacts::ActiveModel {
        let mut active_model = contacts::ActiveModel::new();
        active_model.name = Set(self.name);
        active_model.email = Set(self.email);
        active_model.phone_number = Set(self.phone_number);
        active_model.job_title = Set(self.job_title);
        active_model.company_id = Set(self.company_id);
        active_model.owner_id = Set(self.owner_id);
        active_model
    }
}

impl IntoActiveModel<contacts::ActiveModel> for UpdateContact {
    fn into_active_model(self) -> contacts::ActiveModel {
        let mut active_model = contacts::ActiveModel::new();
        active_model.name = self.name.map(Set).unwrap_or(NotSet);
        active_model.email = self.email.map(Set).unwrap_or(NotSet);
        active_model.phone_number = self.phone_number.map(Set).unwrap_or(NotSet);
        active_model.job_title = self.job_title.map(Set).unwrap_or(NotSet);
        active_model.company_id = self.company_id.map(Set).unwrap_or(NotSet);
        active_model.owner_id = self.owner_id.map(Set).unwrap_or(NotSet);
        active_model
    }
}

#[ComplexObject]
impl contacts::Model {
    async fn cases(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<cases::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = cases::Entity::find()
            .filter(cases::Column::ContactId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<companies::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(company_id) = self.company_id {
            let result = companies::Entity::find_by_id(company_id).one(db).await?;
            Ok(result)
        } else {
            Ok(None)
        }
    }

    async fn interactions(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<interactions::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = interactions::Entity::find()
            .filter(interactions::Column::ContactId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn leads(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<leads::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = leads::Entity::find()
            .filter(leads::Column::ConvertedContactId.eq(self.id))
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
            .filter(opportunities::Column::ContactId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }

    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = user::Entity::find_by_id(self.owner_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Owner not found")),
        }
    }
}
