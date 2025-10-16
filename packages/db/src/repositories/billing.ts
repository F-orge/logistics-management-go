import { AccountTransactionSchema } from '../schemas/billing/account_transaction'
import { AccountingSyncLogSchema } from '../schemas/billing/accounting_sync_log'
import { ClientAccountSchema } from '../schemas/billing/client_account'
import { CreditNoteSchema } from '../schemas/billing/credit_note'
import { DisputeSchema } from '../schemas/billing/dispute'
import { DocumentSchema } from '../schemas/billing/document'
import { InvoiceSchema } from '../schemas/billing/invoice'
import { InvoiceLineItemSchema } from '../schemas/billing/invoice_line_item'
import { PaymentSchema } from '../schemas/billing/payment'
import { QuoteSchema } from '../schemas/billing/quote'
import { RateCardSchema } from '../schemas/billing/rate_card'
import { RateRuleSchema } from '../schemas/billing/rate_rule'
import { SurchargeSchema } from '../schemas/billing/surcharge'
import { repositoryFactory } from './interface'

export const AccountTransactionRepository = repositoryFactory(
  'billing.accountTransactions',
  AccountTransactionSchema,
)
export const AccountingSyncLogRepository = repositoryFactory(
  'billing.accountingSyncLog',
  AccountingSyncLogSchema,
)
export const ClientAccountRepository = repositoryFactory(
  'billing.clientAccounts',
  ClientAccountSchema,
)
export const CreditNoteRepository = repositoryFactory('billing.creditNotes', CreditNoteSchema)
export const DisputeRepository = repositoryFactory('billing.disputes', DisputeSchema)
export const DocumentRepository = repositoryFactory('billing.documents', DocumentSchema)
export const InvoiceRepository = repositoryFactory('billing.invoices', InvoiceSchema)
export const InvoiceLineItemRepository = repositoryFactory(
  'billing.invoiceLineItems',
  InvoiceLineItemSchema,
)
export const PaymentRepository = repositoryFactory('billing.payments', PaymentSchema)
export const QuoteRepository = repositoryFactory('billing.quotes', QuoteSchema)
export const RateCardRepository = repositoryFactory('billing.rateCards', RateCardSchema)
export const RateRuleRepository = repositoryFactory('billing.rateRules', RateRuleSchema)
export const SurchargeRepository = repositoryFactory('billing.surcharges', SurchargeSchema)
