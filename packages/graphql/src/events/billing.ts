import { Selectable } from "kysely";
import {
  BillingInvoiceStatusEnum,
  BillingPaymentStatusEnum,
  BillingQuoteStatusEnum,
  BillingDisputeStatusEnum,
  DB,
} from "../db.types";

export type BillingEvents = {
  // Invoice Events
  "billing.invoice.created": Selectable<DB["billing.invoices"]>;
  "billing.invoice.sent": Selectable<DB["billing.invoices"]>;
  "billing.invoice.viewed": Selectable<DB["billing.invoices"]>;
  "billing.invoice.statusChanged": {
    id: string;
    newStatus: BillingInvoiceStatusEnum;
    previousStatus: BillingInvoiceStatusEnum;
    clientId: string;
  };
  "billing.invoice.paid": Selectable<DB["billing.invoices"]> & {
    paidAmount: string;
    remainingBalance: string;
  };
  "billing.invoice.partiallyPaid": Selectable<DB["billing.invoices"]> & {
    paymentAmount: string;
    remainingBalance: string;
  };
  "billing.invoice.overdue": {
    id: string;
    clientId: string;
    amountOutstanding: string;
    dueDate: string;
  };
  "billing.invoice.disputed": Selectable<DB["billing.invoices"]> & {
    disputeId: string;
  };

  // Payment Events
  "billing.payment.initiated": Selectable<DB["billing.payments"]>;
  "billing.payment.processing": Selectable<DB["billing.payments"]>;
  "billing.payment.successful": Selectable<DB["billing.payments"]>;
  "billing.payment.statusChanged": {
    id: string;
    newStatus: BillingPaymentStatusEnum;
    previousStatus: BillingPaymentStatusEnum;
    invoiceId: string;
  };
  "billing.payment.failed": Selectable<DB["billing.payments"]> & {
    failureReason: string | null;
  };
  "billing.payment.refunded": Selectable<DB["billing.payments"]> & {
    refundAmount: string;
  };

  // Quote Events
  "billing.quote.created": Selectable<DB["billing.quotes"]>;
  "billing.quote.sent": Selectable<DB["billing.quotes"]>;
  "billing.quote.statusChanged": {
    id: string;
    newStatus: BillingQuoteStatusEnum;
    previousStatus: BillingQuoteStatusEnum;
    clientId: string | null;
  };
  "billing.quote.accepted": Selectable<DB["billing.quotes"]>;
  "billing.quote.expired": {
    id: string;
    quoteNumber: string | null;
    clientId: string | null;
  };
  "billing.quote.converted": Selectable<DB["billing.quotes"]> & {
    invoiceId: string;
  };

  // Credit Note Events
  "billing.creditNote.issued": Selectable<DB["billing.creditNotes"]>;
  "billing.creditNote.applied": Selectable<DB["billing.creditNotes"]> & {
    appliedAmount: string;
  };
  "billing.creditNote.onDisputeApproval": Selectable<
    DB["billing.creditNotes"]
  > & {
    disputeId: string;
  };

  // Dispute Events
  "billing.dispute.opened": Selectable<DB["billing.disputes"]>;
  "billing.dispute.statusChanged": {
    id: string;
    newStatus: BillingDisputeStatusEnum;
    previousStatus: BillingDisputeStatusEnum;
    clientId: string;
  };
  "billing.dispute.underReview": Selectable<DB["billing.disputes"]>;
  "billing.dispute.approved": Selectable<DB["billing.disputes"]> & {
    creditNoteId: string | null;
  };
  "billing.dispute.denied": Selectable<DB["billing.disputes"]> & {
    denialReason: string | null;
  };
  "billing.dispute.resolved": Selectable<DB["billing.disputes"]> & {
    resolutionDetails: string | null;
  };

  // Account Transaction Events
  "billing.transaction.debited": {
    transactionId: string;
    clientId: string;
    amount: string;
    invoiceId: string;
    runningBalance: string;
  };
  "billing.transaction.credited": {
    transactionId: string;
    clientId: string;
    amount: string;
    paymentId: string;
    runningBalance: string;
  };

  // Client Account Events
  "billing.clientAccount.balanceUpdated": {
    clientId: string;
    newAvailableCredit: string;
    newWalletBalance: string;
  };
  "billing.clientAccount.lastPaymentDateUpdated": {
    clientId: string;
    lastPaymentDate: string;
    paymentId: string;
  };

  // Rate Card & Surcharge Lifecycle Events
  "billing.rateCard.deactivated": {
    id: string;
    name: string;
    reason: string;
  };
  "billing.surcharge.deactivated": {
    id: string;
    reason: string;
  };

  // Shipment Creation on Payment
  "billing.shipment.createdFromPayment": {
    paymentId: string;
    quoteId: string | null;
    shipmentId: string;
  };

  // Document Generation on Shipment Confirmation
  "billing.document.generated": {
    shipmentId: string;
    documentId: string;
    documentType: string;
  };

  // Accounting Sync Events
  "billing.accountingSync.triggered": {
    sourceType: string;
    sourceId: string;
    syncLogId: string;
  };
  "billing.accountingSync.succeeded": {
    syncLogId: string;
    sourceType: string;
  };
  "billing.accountingSync.failed": {
    syncLogId: string;
    sourceType: string;
    errorMessage: string;
  };
};
