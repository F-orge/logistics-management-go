pub mod _generated;
pub mod auth;
pub mod crm;
pub mod lms;
pub mod org;

#[derive(Debug, Clone, Copy, PartialEq, Eq, async_graphql::Enum)]
pub enum SortOrder {
    Asc,
    Desc,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, async_graphql::Enum)]
pub enum FilterOperator {
    Equals,
    Contains,
    StartsWith,
    EndsWith,
}
