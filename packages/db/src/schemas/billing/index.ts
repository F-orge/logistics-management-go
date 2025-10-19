import { z } from "zod";
import { AccountTransactionSchema } from "./account_transaction";
import { AccountingSyncLogSchema } from "./accounting_sync_log";
import { ClientAccountSchema } from "./client_account";
import { CreditNoteSchema } from "./credit_note";
import { DisputeSchema } from "./dispute";
import { DocumentSchema } from "./document";
import { InvoiceSchema } from "./invoice";
import { InvoiceLineItemSchema } from "./invoice_line_item";
import { PaymentSchema } from "./payment";
import { QuoteSchema } from "./quote";
import { RateCardSchema } from "./rate_card";
import { RateRuleSchema } from "./rate_rule";
import { SurchargeSchema } from "./surcharge";

export default z.object({
  accountTransactions: AccountTransactionSchema,
  accountingSyncLogs: AccountingSyncLogSchema,
  clientAccounts: ClientAccountSchema,
  creditNotes: CreditNoteSchema,
  disputes: DisputeSchema,
  documents: DocumentSchema,
  invoices: InvoiceSchema,
  invoiceLineItems: InvoiceLineItemSchema,
  payments: PaymentSchema,
  quotes: QuoteSchema,
  rateCards: RateCardSchema,
  rateRules: RateRuleSchema,
  surcharges: SurchargeSchema,
});
