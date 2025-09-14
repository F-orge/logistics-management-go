pub mod entities;

pub mod queries;

use async_graphql::MergedObject;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "BillingQueries")]
pub struct Query(
	entities::_generated::account_transactions::Entity,
	entities::_generated::accounting_sync_log::Entity,
	entities::_generated::client_accounts::Entity,
	entities::_generated::credit_notes::Entity,
	entities::_generated::disputes::Entity,
	entities::_generated::documents::Entity,
	entities::_generated::invoice_line_items::Entity,
	entities::_generated::invoices::Entity,
	entities::_generated::payments::Entity,
	entities::_generated::quotes::Entity,
	entities::_generated::rate_cards::Entity,
	entities::_generated::rate_rules::Entity,
	entities::_generated::surcharges::Entity,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "BillingMutations")]
pub struct Mutation(
	queries::account_transactions::Mutations,
	queries::accounting_sync_log::Mutations,
	queries::client_accounts::Mutations,
	queries::credit_notes::Mutations,
	queries::disputes::Mutations,
	queries::documents::Mutations,
	queries::invoice_line_items::Mutations,
	queries::invoices::Mutations,
	queries::payments::Mutations,
	queries::quotes::Mutations,
	queries::rate_cards::Mutations,
	queries::rate_rules::Mutations,
	queries::surcharges::Mutations,
);
