import { Faker } from '@faker-js/faker';
import { Insertable } from 'kysely';
import {
  DB,
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
} from '@/db/types';

export const generateBillingAccountingSyncLog = (
  faker: Faker,
  recordId: string,
  recordType: string,
): Insertable<DB['billing.accountingSyncLog']> => ({
  externalSystem: faker.helpers.arrayElement(['quickbooks', 'xero', 'sap']),
  recordId: recordId,
  recordType: recordType,
  status: faker.helpers.arrayElement(Object.values(BillingSyncStatusEnum)),
  errorMessage: faker.datatype.boolean() ? faker.lorem.sentence() : null,
  externalId: faker.datatype.boolean() ? faker.string.uuid() : null,
  lastSyncAt: faker.datatype.boolean() ? faker.date.recent() : null,
  nextRetryAt: faker.datatype.boolean() ? faker.date.future() : null,
  requestPayload: faker.datatype.boolean()
    ? JSON.stringify({ data: faker.lorem.sentence() })
    : null,
  responsePayload: faker.datatype.boolean()
    ? JSON.stringify({ data: faker.lorem.sentence() })
    : null,
  retryCount: faker.number.int({ min: 0, max: 5 }),
});

export const generateBillingClientAccount = (
  faker: Faker,
  clientId: string,
): Insertable<DB['billing.clientAccounts']> => ({
  clientId: clientId,
  creditLimit: faker.number.float({ min: 1000, max: 100000 }),
  availableCredit: faker.number.float({ min: 0, max: 50000 }),
  walletBalance: faker.number.float({ min: 0, max: 1000 }),
  currency: faker.finance.currencyCode(),
  isCreditApproved: faker.datatype.boolean(),
  paymentTermsDays: faker.number.int({ min: 15, max: 90 }),
  lastPaymentDate: faker.datatype.boolean() ? faker.date.recent() : null,
});

export const generateBillingQuote = (
  faker: Faker,
  clientId?: string,
  createdByUserId?: string,
): Insertable<DB['billing.quotes']> => ({
  clientId: clientId,
  createdByUserId: createdByUserId,
  destinationDetails: faker.location.streetAddress(true),
  originDetails: faker.location.streetAddress(true),
  quotedPrice: faker.number.float({ min: 50, max: 5000 }),
  quoteNumber: faker.string.alphanumeric(10).toUpperCase(),
  serviceLevel: faker.helpers.arrayElement(['Standard', 'Express', 'Premium']),
  status: faker.helpers.arrayElement(Object.values(BillingQuoteStatusEnum)),
  expiresAt: faker.date.future(),
  notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
  weight: faker.number.float({ min: 1, max: 1000 }),
  length: faker.number.float({ min: 10, max: 200 }),
  width: faker.number.float({ min: 10, max: 200 }),
  height: faker.number.float({ min: 10, max: 200 }),
});

export const generateBillingInvoice = (
  faker: Faker,
  clientId: string,
  createdByUserId?: string,
  quoteId?: string,
): Insertable<DB['billing.invoices']> => ({
  clientId: clientId,
  createdByUserId: createdByUserId,
  quoteId: quoteId,
  invoiceNumber: faker.string.alphanumeric(10).toUpperCase(),
  issueDate: faker.date.past(),
  dueDate: faker.date.future(),
  totalAmount: faker.number.float({ min: 100, max: 10000 }),
  amountPaid: faker.number.float({ min: 0, max: 5000 }),
  amountOutstanding: faker.number.float({ min: 0, max: 5000 }),
  status: faker.helpers.arrayElement(Object.values(BillingInvoiceStatusEnum)),
  currency: faker.finance.currencyCode(),
  notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
  paymentTerms: faker.datatype.boolean() ? faker.lorem.word() : null,
  paidAt: faker.datatype.boolean() ? faker.date.recent() : null,
  sentAt: faker.datatype.boolean() ? faker.date.recent() : null,
  subtotal: faker.number.float({ min: 90, max: 9000 }),
  taxAmount: faker.number.float({ min: 5, max: 1000 }),
  discountAmount: faker.number.float({ min: 0, max: 500 }),
});

export const generateBillingInvoiceLineItem = (
  faker: Faker,
  invoiceId: string,
  sourceRecordId?: string,
  sourceRecordType?: string,
): Insertable<DB['billing.invoiceLineItems']> => ({
  invoiceId: invoiceId,
  description: faker.lorem.sentence(),
  unitPrice: faker.number.float({ min: 1, max: 500 }),
  quantity: faker.number.float({ min: 1, max: 100 }),
  taxRate: faker.number.float({ min: 0, max: 0.1 }),
  discountRate: faker.number.float({ min: 0, max: 0.05 }),
  sourceRecordId: sourceRecordId,
  sourceRecordType: sourceRecordType,
});

export const generateBillingPayment = (
  faker: Faker,
  invoiceId: string,
  processedByUserId?: string,
): Insertable<DB['billing.payments']> => ({
  invoiceId: invoiceId,
  processedByUserId: processedByUserId,
  amount: faker.number.float({ min: 10, max: 5000 }),
  paymentMethod: faker.helpers.arrayElement(
    Object.values(BillingPaymentMethodEnum),
  ),
  status: faker.helpers.arrayElement(Object.values(BillingPaymentStatusEnum)),
  paymentDate: faker.date.recent(),
  currency: faker.finance.currencyCode(),
  transactionId: faker.string.alphanumeric(15).toUpperCase(),
  gatewayReference: faker.string.alphanumeric(20).toUpperCase(),
  fees: faker.number.float({ min: 0, max: 50 }),
  exchangeRate: faker.number.float({ min: 0.5, max: 1.5 }),
  notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
});

export const generateBillingDispute = (
  faker: Faker,
  clientId: string,
  lineItemId: string,
  resolvedByUserId?: string,
): Insertable<DB['billing.disputes']> => ({
  clientId: clientId,
  lineItemId: lineItemId,
  resolvedByUserId: resolvedByUserId,
  reason: faker.lorem.sentence(),
  status: faker.helpers.arrayElement(Object.values(BillingDisputeStatusEnum)),
  disputedAmount: faker.number.float({ min: 1, max: 1000 }),
  submittedAt: faker.date.recent(),
  resolvedAt: faker.datatype.boolean() ? faker.date.recent() : null,
  resolutionNotes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
});

export const generateBillingCreditNote = (
  faker: Faker,
  invoiceId: string,
  disputeId?: string,
  createdByUserId?: string,
): Insertable<DB['billing.creditNotes']> => ({
  invoiceId: invoiceId,
  disputeId: disputeId,
  createdByUserId: createdByUserId,
  amount: faker.number.float({ min: 1, max: 1000 }),
  creditNoteNumber: faker.string.alphanumeric(10).toUpperCase(),
  issueDate: faker.date.past(),
  reason: faker.lorem.sentence(),
  currency: faker.finance.currencyCode(),
  appliedAt: faker.datatype.boolean() ? faker.date.recent() : null,
  notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
});

export const generateBillingDocument = (
  faker: Faker,
  recordId: string,
  recordType: string,
  uploadedByUserId?: string,
): Insertable<DB['billing.documents']> => ({
  recordId: recordId,
  recordType: recordType,
  documentType: faker.helpers.arrayElement(
    Object.values(BillingDocumentTypeEnum),
  ),
  fileName: faker.system.fileName(),
  filePath: faker.system.filePath(),
  mimeType: faker.system.mimeType(),
  fileSize: faker.number.int({ min: 1000, max: 5000000 }),
  uploadedByUserId: uploadedByUserId,
});

export const generateBillingRateCard = (
  faker: Faker,
  createdByUserId?: string,
): Insertable<DB['billing.rateCards']> => ({
  name: faker.lorem.words(3),
  serviceType: faker.helpers.arrayElement(
    Object.values(BillingServiceTypeEnum),
  ),
  validFrom: faker.date.past(),
  validTo: faker.datatype.boolean() ? faker.date.future() : null,
  isActive: faker.datatype.boolean(),
  description: faker.datatype.boolean() ? faker.lorem.sentence() : null,
  createdByUserId: createdByUserId,
});

export const generateBillingRateRule = (
  faker: Faker,
  rateCardId: string,
): Insertable<DB['billing.rateRules']> => ({
  rateCardId: rateCardId,
  condition: faker.lorem.word(),
  pricingModel: faker.helpers.arrayElement(
    Object.values(BillingPricingModelEnum),
  ),
  price: faker.number.float({ min: 0.1, max: 100 }),
  value: faker.lorem.word(),
  priority: faker.number.int({ min: 1, max: 100 }),
  isActive: faker.datatype.boolean(),
  minValue: faker.datatype.boolean()
    ? faker.number.float({ min: 0, max: 100 })
    : null,
  maxValue: faker.datatype.boolean()
    ? faker.number.float({ min: 101, max: 1000 })
    : null,
});

export const generateBillingSurcharge = (
  faker: Faker,
): Insertable<DB['billing.surcharges']> => ({
  name: faker.lorem.words(2),
  type: faker.lorem.word(),
  amount: faker.number.float({ min: 1, max: 100 }),
  calculationMethod: faker.helpers.arrayElement(
    Object.values(BillingSurchargeCalculationMethodEnum),
  ),
  isActive: faker.datatype.boolean(),
  description: faker.datatype.boolean() ? faker.lorem.sentence() : null,
  validFrom: faker.datatype.boolean() ? faker.date.past() : null,
  validTo: faker.datatype.boolean() ? faker.date.future() : null,
});
