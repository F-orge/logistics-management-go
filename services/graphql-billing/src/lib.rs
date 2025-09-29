pub mod models;
pub mod mutation;
pub mod query;

use async_graphql::MergedObject;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "BillingQueries")]
pub struct Query(
    query::rate_cards::Query,
    query::surcharges::Query,
    query::quotes::Query,
    query::client_accounts::Query,
    query::invoices::Query,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "BillingMutations")]
pub struct Mutation(
    mutation::disputes::DisputesMutation,
    mutation::invoices::InvoicesMutation,
    mutation::account_transactions::AccountTransactionsMutation,
    mutation::accounting_sync_logs::AccountingSyncLogsMutation,
    mutation::client_accounts::ClientAccountsMutation,
    mutation::credit_notes::CreditNotesMutation,
    mutation::documents::DocumentsMutation,
    mutation::rate_cards::RateCardsMutation,
    mutation::rate_rules::RateRulesMutation,
    mutation::surcharges::SurchargesMutation,
    mutation::quotes::QuotesMutation,
    mutation::payments::PaymentsMutation,
);
