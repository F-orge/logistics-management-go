import { Faker } from "@faker-js/faker";
import type { Insertable } from "kysely";
import {
  BillingAccountingSyncLog,
  BillingAccountTransaction,
  BillingClientAccount,
  BillingCreditNote,
  BillingDispute,
  BillingDocument,
  BillingInvoice,
  BillingInvoiceLineItem,
  BillingPayment,
  BillingQuote,
  BillingRateCard,
  BillingRateRule,
  BillingSurcharge,
  BillingDisputeStatusEnum,
  BillingDocumentTypeEnum,
  BillingInvoiceStatusEnum,
  BillingPaymentMethodEnum,
  BillingPaymentStatusEnum,
  BillingPricingModelEnum,
  BillingQuoteStatusEnum,
  BillingServiceTypeEnum,
  BillingSurchargeCalculationMethodEnum,
  BillingSyncStatusEnum,
  BillingTransactionTypeEnum,
} from "@packages/db/db.types";

// Utility function to randomly select from enum values
const randomEnumValue = <T extends Record<string, string>>(
  enumObj: T
): T[keyof T] => {
  const values = Object.values(enumObj);
  return values[Math.floor(Math.random() * values.length)] as T[keyof T];
};

// Billing Client Account - Requires clientId
export const seedBillingClientAccount = (
  faker: Faker,
  options: { clientId: string }
): Insertable<BillingClientAccount> => {
  const creditLimit = faker.number.int({ min: 1000, max: 100000 });
  const availableCredit = faker.number.int({ min: 0, max: creditLimit });

  return {
    clientId: options.clientId,
    creditLimit: creditLimit.toString(),
    availableCredit: availableCredit.toString(),
    walletBalance: faker.number.int({ min: 0, max: 10000 }).toString(),
    currency: faker.finance.currencyCode(),
    isCreditApproved: faker.datatype.boolean({ probability: 0.8 }),
    paymentTermsDays: faker.helpers.arrayElement([15, 30, 45, 60, 90]),
    lastPaymentDate: faker.helpers.maybe(
      () => faker.date.recent({ days: 60 }),
      {
        probability: 0.7,
      }
    ),
  };
};

// Billing Quote - Optional clientId
export const seedBillingQuote = (
  faker: Faker,
  options: { clientId?: string; createdByUserId?: string } = {}
): Insertable<BillingQuote> => ({
  clientId: options.clientId,
  createdByUserId: options.createdByUserId,
  quoteNumber: `Q-${faker.string.alphanumeric(8).toUpperCase()}`,
  originDetails: faker.location.streetAddress({ useFullAddress: true }),
  destinationDetails: faker.location.streetAddress({ useFullAddress: true }),
  weight: faker.number.float({ min: 0.5, max: 1000, fractionDigits: 2 }),
  length: faker.number.float({ min: 10, max: 200, fractionDigits: 2 }),
  width: faker.number.float({ min: 10, max: 200, fractionDigits: 2 }),
  height: faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
  serviceLevel: faker.helpers.arrayElement([
    "standard",
    "express",
    "overnight",
    "economy",
  ]),
  quotedPrice: faker.number.int({ min: 50, max: 5000 }).toString(),
  status: randomEnumValue(BillingQuoteStatusEnum),
  expiresAt: faker.date.future({ years: 0.1 }),
  notes: faker.helpers.maybe(() => faker.lorem.paragraph(), {
    probability: 0.6,
  }),
});

// Billing Invoice - Requires clientId
export const seedBillingInvoice = (
  faker: Faker,
  options: { clientId: string; createdByUserId?: string; quoteId?: string }
): Insertable<BillingInvoice> => {
  const totalAmount = faker.number.int({ min: 110, max: 11000 });
  const amountPaid = faker.helpers.maybe(
    () => faker.number.int({ min: 0, max: totalAmount }),
    { probability: 0.5 }
  );

  return {
    clientId: options.clientId,
    createdByUserId: options.createdByUserId,
    quoteId: options.quoteId,
    invoiceNumber: `INV-${faker.string.alphanumeric(8).toUpperCase()}`,
    issueDate: faker.date.recent({ days: 30 }),
    dueDate: faker.date.future({ years: 0.1 }),
    status: randomEnumValue(BillingInvoiceStatusEnum),
    subtotal: faker.number.int({ min: 100, max: 10000 }).toString(),
    taxAmount: faker.number.int({ min: 10, max: 1000 }).toString(),
    discountAmount: faker.helpers.maybe(
      () => faker.number.int({ min: 5, max: 500 }).toString(),
      { probability: 0.3 }
    ),
    totalAmount: totalAmount.toString(),
    amountPaid: amountPaid?.toString(),
    currency: faker.finance.currencyCode(),
    paymentTerms: faker.helpers.maybe(() => "Net 30 days", {
      probability: 0.8,
    }),
    notes: faker.helpers.maybe(() => faker.lorem.paragraph(), {
      probability: 0.4,
    }),
    sentAt: faker.helpers.maybe(() => faker.date.recent({ days: 25 }), {
      probability: 0.7,
    }),
    paidAt: faker.helpers.maybe(() => faker.date.recent({ days: 15 }), {
      probability: 0.4,
    }),
  };
};

// Billing Invoice Line Item - Requires invoiceId
export const seedBillingInvoiceLineItem = (
  faker: Faker,
  options: {
    invoiceId: string;
    sourceRecordId?: string;
    sourceRecordType?: string;
  }
): Insertable<BillingInvoiceLineItem> => ({
  invoiceId: options.invoiceId,
  description: faker.commerce.productDescription(),
  quantity: faker.number
    .float({ min: 1, max: 999, fractionDigits: 3 })
    .toString(),
  unitPrice: faker.number
    .float({ min: 1, max: 9999.99, fractionDigits: 2 })
    .toString(),
  taxRate: faker.number
    .float({ min: 0, max: 0.25, fractionDigits: 4 })
    .toString(),
  discountRate: faker.helpers.maybe(
    () =>
      faker.number.float({ min: 0, max: 0.15, fractionDigits: 4 }).toString(),
    { probability: 0.3 }
  ),
  sourceRecordId: options.sourceRecordId,
  sourceRecordType: options.sourceRecordType,
});

// Billing Payment - Requires invoiceId
export const seedBillingPayment = (
  faker: Faker,
  options: { invoiceId: string; processedByUserId?: string }
): Insertable<BillingPayment> => ({
  invoiceId: options.invoiceId,
  amount: faker.number.int({ min: 50, max: 10000 }).toString(),
  paymentMethod: randomEnumValue(BillingPaymentMethodEnum),
  status: randomEnumValue(BillingPaymentStatusEnum),
  currency: faker.finance.currencyCode(),
  paymentDate: faker.date.recent({ days: 30 }),
  processedAt: faker.helpers.maybe(() => faker.date.recent({ days: 25 }), {
    probability: 0.8,
  }),
  processedByUserId: options.processedByUserId,
  transactionId: faker.helpers.maybe(
    () => faker.string.alphanumeric(12).toUpperCase(),
    { probability: 0.9 }
  ),
  gatewayReference: faker.helpers.maybe(() => faker.string.alphanumeric(16), {
    probability: 0.7,
  }),
  fees: faker.helpers.maybe(
    () => faker.number.int({ min: 1, max: 100 }).toString(),
    { probability: 0.6 }
  ),
  exchangeRate: faker.helpers.maybe(
    () => faker.number.int({ min: 1, max: 2 }).toString(),
    { probability: 0.3 }
  ),
  notes: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.4,
  }),
});

// Billing Account Transaction - Requires clientAccountId
export const seedBillingAccountTransaction = (
  faker: Faker,
  options: {
    clientAccountId: string;
    processedByUserId?: string;
    sourceRecordId?: string;
    sourceRecordType?: string;
  }
): Insertable<BillingAccountTransaction> => ({
  clientAccountId: options.clientAccountId,
  type: randomEnumValue(BillingTransactionTypeEnum),
  amount: faker.number.int({ min: -5000, max: 5000 }).toString(),
  description: faker.lorem.sentence(),
  transactionDate: faker.date.recent({ days: 60 }),
  runningBalance: faker.number.int({ min: 0, max: 50000 }).toString(),
  processedByUserId: options.processedByUserId,
  sourceRecordId: options.sourceRecordId,
  sourceRecordType: options.sourceRecordType,
  referenceNumber: faker.helpers.maybe(
    () => faker.string.alphanumeric(10).toUpperCase(),
    { probability: 0.7 }
  ),
});

// Billing Credit Note - Requires invoiceId
export const seedBillingCreditNote = (
  faker: Faker,
  options: { invoiceId: string; createdByUserId?: string; disputeId?: string }
): Insertable<BillingCreditNote> => ({
  invoiceId: options.invoiceId,
  createdByUserId: options.createdByUserId,
  disputeId: options.disputeId,
  creditNoteNumber: `CN-${faker.string.alphanumeric(8).toUpperCase()}`,
  issueDate: faker.date.recent({ days: 30 }),
  amount: faker.number.int({ min: 10, max: 2000 }).toString(),
  currency: faker.finance.currencyCode(),
  reason: faker.lorem.sentence(),
  notes: faker.helpers.maybe(() => faker.lorem.paragraph(), {
    probability: 0.6,
  }),
  appliedAt: faker.helpers.maybe(() => faker.date.recent({ days: 20 }), {
    probability: 0.7,
  }),
});

// Billing Dispute - Requires clientId and lineItemId
export const seedBillingDispute = (
  faker: Faker,
  options: { clientId: string; lineItemId: string; resolvedByUserId?: string }
): Insertable<BillingDispute> => ({
  clientId: options.clientId,
  lineItemId: options.lineItemId,
  reason: faker.lorem.paragraph(),
  disputedAmount: faker.helpers.maybe(
    () => faker.number.int({ min: 10, max: 1000 }).toString(),
    { probability: 0.8 }
  ),
  status: randomEnumValue(BillingDisputeStatusEnum),
  submittedAt: faker.date.recent({ days: 30 }),
  resolvedAt: faker.helpers.maybe(() => faker.date.recent({ days: 15 }), {
    probability: 0.5,
  }),
  resolvedByUserId: options.resolvedByUserId,
  resolutionNotes: faker.helpers.maybe(() => faker.lorem.paragraph(), {
    probability: 0.5,
  }),
});

// Billing Document - Requires recordId and recordType
export const seedBillingDocument = (
  faker: Faker,
  options: { recordId: string; recordType: string; uploadedByUserId?: string }
): Insertable<BillingDocument> => ({
  recordId: options.recordId,
  recordType: options.recordType,
  documentType: randomEnumValue(BillingDocumentTypeEnum),
  fileName: faker.system.fileName(),
  filePath: faker.system.filePath(),
  fileSize: faker.helpers.maybe(
    () => faker.number.int({ min: 1024, max: 10485760 }),
    { probability: 0.9 }
  ),
  mimeType: faker.helpers.maybe(() => faker.system.mimeType(), {
    probability: 0.9,
  }),
  uploadedByUserId: options.uploadedByUserId,
});

// Billing Rate Card - Requires createdByUserId
export const seedBillingRateCard = (
  faker: Faker,
  options: { createdByUserId?: string } = {}
): Insertable<BillingRateCard> => ({
  name: `${faker.commerce.department()} Rate Card ${faker.date
    .recent()
    .getFullYear()}`,
  description: faker.helpers.maybe(() => faker.lorem.paragraph(), {
    probability: 0.7,
  }),
  serviceType: randomEnumValue(BillingServiceTypeEnum),
  validFrom: faker.date.recent({ days: 30 }),
  validTo: faker.helpers.maybe(() => faker.date.future({ years: 1 }), {
    probability: 0.8,
  }),
  isActive: faker.datatype.boolean({ probability: 0.8 }),
  createdByUserId: options.createdByUserId,
});

// Billing Rate Rule - Requires rateCardId
export const seedBillingRateRule = (
  faker: Faker,
  options: { rateCardId: string }
): Insertable<BillingRateRule> => ({
  rateCardId: options.rateCardId,
  condition: faker.helpers.arrayElement([
    "weight_gt",
    "zone_eq",
    "distance_range",
    "volume_gt",
  ]),
  value: faker.helpers.arrayElement(["5kg", "Zone A", "100-500km", "0.5m³"]),
  minValue: faker.helpers.maybe(
    () => faker.number.int({ min: 1, max: 100 }).toString(),
    { probability: 0.6 }
  ),
  maxValue: faker.helpers.maybe(
    () => faker.number.int({ min: 101, max: 1000 }).toString(),
    { probability: 0.6 }
  ),
  price: faker.number.int({ min: 10, max: 500 }).toString(),
  pricingModel: randomEnumValue(BillingPricingModelEnum),
  priority: faker.number.int({ min: 1, max: 10 }),
  isActive: faker.datatype.boolean({ probability: 0.9 }),
});

// Billing Surcharge - No foreign keys required
export const seedBillingSurcharge = (
  faker: Faker
): Insertable<BillingSurcharge> => ({
  name: faker.helpers.arrayElement([
    "Fuel Surcharge",
    "Peak Season Fee",
    "Remote Area Fee",
    "Oversize Fee",
  ]),
  type: faker.helpers.arrayElement([
    "fuel",
    "seasonal",
    "handling",
    "location",
  ]),
  description: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.7,
  }),
  amount: faker.number.int({ min: 5, max: 200 }).toString(),
  calculationMethod: randomEnumValue(BillingSurchargeCalculationMethodEnum),
  isActive: faker.datatype.boolean({ probability: 0.8 }),
  validFrom: faker.helpers.maybe(() => faker.date.recent({ days: 30 }), {
    probability: 0.8,
  }),
  validTo: faker.helpers.maybe(() => faker.date.future({ years: 1 }), {
    probability: 0.7,
  }),
});

// Billing Accounting Sync Log - Requires recordId and recordType
export const seedBillingAccountingSyncLog = (
  faker: Faker,
  options: { recordId: string; recordType: string }
): Insertable<BillingAccountingSyncLog> => ({
  recordId: options.recordId,
  recordType: options.recordType,
  externalSystem: faker.helpers.arrayElement([
    "quickbooks",
    "xero",
    "sage",
    "netsuite",
  ]),
  externalId: faker.helpers.maybe(() => faker.string.alphanumeric(12), {
    probability: 0.7,
  }),
  status: randomEnumValue(BillingSyncStatusEnum),
  lastSyncAt: faker.helpers.maybe(() => faker.date.recent({ days: 7 }), {
    probability: 0.8,
  }),
  retryCount: faker.helpers.maybe(() => faker.number.int({ min: 0, max: 5 }), {
    probability: 0.4,
  }),
  errorMessage: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.3,
  }),
  requestPayload: faker.helpers.maybe(
    () => JSON.stringify({ data: faker.lorem.words() }),
    { probability: 0.6 }
  ),
  responsePayload: faker.helpers.maybe(
    () => JSON.stringify({ result: faker.lorem.words() }),
    { probability: 0.6 }
  ),
  nextRetryAt: faker.helpers.maybe(() => faker.date.future({ years: 0.003 }), {
    probability: 0.3,
  }),
});
