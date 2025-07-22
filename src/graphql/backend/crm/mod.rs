use async_graphql::SimpleObject;
mod campaigns;
mod cases;
mod companies;
mod contacts;
mod interactions;
mod invoice_line_items;
mod invoices;
mod leads;
mod notifications;
mod opportunities;
mod opportunity_products;
mod products;

#[derive(Default, SimpleObject)]
pub struct CrmQuery {
    contacts: contacts::ContactsQuery,
    campaigns: campaigns::CampaignsQuery,
    companies: companies::CompaniesQuery,
    cases: cases::CasesQuery,
    interactions: interactions::InteractionsQuery,
    invoices: invoices::InvoicesQuery,
    leads: leads::LeadsQuery,
    notifications: notifications::NotificationsQuery,
    opportunities: opportunities::OpportunitiesQuery,
    opportunity_products: opportunity_products::OpportunityProductsQuery,
    products: products::ProductsQuery,
}

#[derive(Default, SimpleObject)]
pub struct CrmMutation {
    contacts: contacts::ContactsMutation,
    campaigns: campaigns::CampaignsMutation,
    companies: companies::CompaniesMutation,
    cases: cases::CasesMutation,
    interactions: interactions::InteractionsMutation,
    invoice_line_items: invoice_line_items::InvoiceLineItemsMutation,
    invoices: invoices::InvoicesMutation,
    leads: leads::LeadsMutation,
    notifications: notifications::NotificationsMutation,
    opportunities: opportunities::OpportunitiesMutation,
    opportunity_products: opportunity_products::OpportunityProductsMutation,
    products: products::ProductsMutation,
}
