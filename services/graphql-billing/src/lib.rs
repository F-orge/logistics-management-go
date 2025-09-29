pub mod models;
pub mod mutation;

use async_graphql::MergedObject;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "BillingQueries")]
pub struct Query(
    // entities::_generated::account_transactions::Entity,
    // entities::_generated::accounting_sync_log::Entity,
    // entities::_generated::client_accounts::Entity,
    // entities::_generated::credit_notes::Entity,
    // entities::_generated::disputes::Entity,
    // entities::_generated::documents::Entity,
    // entities::_generated::invoice_line_items::Entity,
    // entities::_generated::invoices::Entity,
    // entities::_generated::payments::Entity,
    // entities::_generated::quotes::Entity,
    // entities::_generated::rate_cards::Entity,
    // entities::_generated::rate_rules::Entity,
    // entities::_generated::surcharges::Entity,
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
