use async_graphql::{Context, InputObjectType, InputType, OutputType};
use sea_orm::ModelTrait;

// generic query for entity
pub trait GraphqlQuery<Model: ModelTrait + OutputType, PrimaryKey: InputType> {
    fn list(
        &self,
        ctx: &Context<'_>,
        page: u64,
        limit: u64,
    ) -> impl std::future::Future<Output = async_graphql::Result<Vec<Model>>> + Send;
    fn view(
        &self,
        ctx: &Context<'_>,
        id: PrimaryKey,
    ) -> impl std::future::Future<Output = async_graphql::Result<Option<Model>>> + Send;
}

// generic mutation for a entity
pub trait GraphqlMutation<
    Model: ModelTrait + OutputType,
    PrimaryKey: InputType,
    Insert: InputObjectType,
    Update: InputObjectType,
>
{
    fn create(
        &self,
        ctx: &Context<'_>,
        value: Insert,
    ) -> impl std::future::Future<Output = async_graphql::Result<Model>> + Send;

    fn update(
        &self,
        ctx: &Context<'_>,
        id: PrimaryKey,
        value: Update,
    ) -> impl std::future::Future<Output = async_graphql::Result<Model>> + Send;

    fn delete(
        &self,
        ctx: &Context<'_>,
        id: PrimaryKey,
    ) -> impl std::future::Future<Output = async_graphql::Result<bool>> + Send;
}
