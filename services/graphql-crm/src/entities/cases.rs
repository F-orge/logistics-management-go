use crate::entities::_generated::cases;
use crate::entities::_generated::sea_orm_active_enums::{CasePriority, CaseStatus, CaseType};
use async_graphql::InputObject;
use sea_orm::prelude::*;
use sea_orm::{
    ActiveModelBehavior,
    ActiveValue::{NotSet, Set},
    IntoActiveModel,
};
use uuid::Uuid;

use fake::Dummy;
use fake::faker::lorem::raw::Sentence;
use fake::faker::number::raw::NumberWithFormat;
use fake::locales::EN;

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertCase {
    #[dummy(faker = "NumberWithFormat(EN, \"CASE-#####\")")]
    pub case_number: String,

    pub status: Option<CaseStatus>,

    pub priority: Option<CasePriority>,

    pub r#type: Option<CaseType>,

    pub owner_id: Uuid,

    pub contact_id: Option<Uuid>,
    #[dummy(faker = "Sentence(EN, 3..8)")]
    pub description: Option<String>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateCase {
    pub case_number: Option<String>,
    pub status: Option<Option<CaseStatus>>,
    pub priority: Option<Option<CasePriority>>,
    pub r#type: Option<Option<CaseType>>,
    pub owner_id: Option<Uuid>,
    pub contact_id: Option<Option<Uuid>>,
    pub description: Option<Option<String>>,
}

impl IntoActiveModel<cases::ActiveModel> for InsertCase {
    fn into_active_model(self) -> cases::ActiveModel {
        let mut active_model = cases::ActiveModel::new();
        active_model.case_number = Set(self.case_number);
        active_model.status = Set(self.status);
        active_model.priority = Set(self.priority);
        active_model.r#type = Set(self.r#type);
        active_model.owner_id = Set(self.owner_id);
        active_model.contact_id = Set(self.contact_id);
        active_model.description = Set(self.description);
        active_model
    }
}

impl IntoActiveModel<cases::ActiveModel> for UpdateCase {
    fn into_active_model(self) -> cases::ActiveModel {
        let mut active_model = cases::ActiveModel::new();
        active_model.case_number = self.case_number.map(Set).unwrap_or(NotSet);
        active_model.status = self.status.map(Set).unwrap_or(NotSet);
        active_model.priority = self.priority.map(Set).unwrap_or(NotSet);
        active_model.r#type = self.r#type.map(Set).unwrap_or(NotSet);
        active_model.owner_id = self.owner_id.map(Set).unwrap_or(NotSet);
        active_model.contact_id = self.contact_id.map(Set).unwrap_or(NotSet);
        active_model.description = self.description.map(Set).unwrap_or(NotSet);
        active_model
    }
}

use crate::entities::_generated::{contacts, interactions};
use async_graphql::{ComplexObject, Context};
use graphql_auth::entities::_generated::user;

#[ComplexObject]
impl cases::Model {
    async fn contact(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<contacts::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        if let Some(contact_id) = self.contact_id {
            let result = contacts::Entity::find_by_id(contact_id).one(db).await?;
            Ok(result)
        } else {
            Ok(None)
        }
    }

    async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let result = user::Entity::find_by_id(self.owner_id).one(db).await?;
        match result {
            Some(model) => Ok(model),
            None => Err(async_graphql::Error::new("Owner not found")),
        }
    }

    async fn interactions(
        &self,
        ctx: &Context<'_>,
    ) -> async_graphql::Result<Vec<interactions::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let results = interactions::Entity::find()
            .filter(interactions::Column::CaseId.eq(self.id))
            .all(db)
            .await
            .unwrap_or_default();
        Ok(results)
    }
}
