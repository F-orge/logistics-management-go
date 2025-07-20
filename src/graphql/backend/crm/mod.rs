use async_graphql::SimpleObject;
mod contacts;

#[derive(Default, SimpleObject)]
pub struct CrmQuery {
    contacts: contacts::ContactsQuery,
}

#[derive(Default, SimpleObject)]
pub struct CrmMutation {
    contacts: contacts::ContactsMutation,
}
