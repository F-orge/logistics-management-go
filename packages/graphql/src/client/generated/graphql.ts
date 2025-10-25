/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  File: { input: any; output: any; }
};

export type AccountTransactions = {
  __typename?: 'AccountTransactions';
  amount: Scalars['Float']['output'];
  clientAccount: ClientAccounts;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  processedByUser?: Maybe<User>;
  referenceNumber?: Maybe<Scalars['String']['output']>;
  runningBalance?: Maybe<Scalars['Float']['output']>;
  sourceRecordId?: Maybe<Scalars['ID']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  transactionDate?: Maybe<Scalars['String']['output']>;
  type: TransactionType;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type AccountingSyncLogs = {
  __typename?: 'AccountingSyncLogs';
  createdAt?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  externalSystem: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastSyncAt?: Maybe<Scalars['String']['output']>;
  nextRetryAt?: Maybe<Scalars['String']['output']>;
  recordId: Scalars['ID']['output'];
  recordType: Scalars['String']['output'];
  requestPayload?: Maybe<Scalars['String']['output']>;
  responsePayload?: Maybe<Scalars['String']['output']>;
  retryCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<SyncStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Attachments = {
  __typename?: 'Attachments';
  createdAt?: Maybe<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId?: Maybe<Scalars['ID']['output']>;
  recordType?: Maybe<RecordType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum BillingInvoiceStatus {
  Cancelled = 'CANCELLED',
  Disputed = 'DISPUTED',
  Draft = 'DRAFT',
  Paid = 'PAID',
  PartialPaid = 'PARTIAL_PAID',
  PastDue = 'PAST_DUE',
  Sent = 'SENT',
  Viewed = 'VIEWED',
  Void = 'VOID'
}

export type BillingInvoices = {
  __typename?: 'BillingInvoices';
  amountOutstanding?: Maybe<Scalars['Float']['output']>;
  amountPaid?: Maybe<Scalars['Float']['output']>;
  client: Companies;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdByUser?: Maybe<User>;
  creditNotes?: Maybe<Array<CreditNotes>>;
  currency?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  dueDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invoiceNumber: Scalars['String']['output'];
  issueDate: Scalars['String']['output'];
  lineItems?: Maybe<Array<InvoiceLineItems>>;
  notes?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['String']['output']>;
  paymentTerms?: Maybe<Scalars['String']['output']>;
  payments?: Maybe<Array<Payments>>;
  quote?: Maybe<Quotes>;
  sentAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<BillingInvoiceStatus>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  taxAmount?: Maybe<Scalars['Float']['output']>;
  totalAmount: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type BillingMutation = {
  __typename?: 'BillingMutation';
  createAccountTransaction: AccountTransactions;
  createAccountingSyncLog: AccountingSyncLogs;
  createBillingInvoice: BillingInvoices;
  createClientAccount: ClientAccounts;
  createCreditNote: CreditNotes;
  createDispute: Disputes;
  createDocument: Documents;
  createInvoiceLineItem: InvoiceLineItems;
  createPayment: Payments;
  createQuote: Quotes;
  createRateCard: RateCards;
  createRateRule: RateRules;
  createSurcharge: Surcharges;
  removeAccountTransaction: DeleteResult;
  removeAccountingSyncLog: DeleteResult;
  removeBillingInvoice: DeleteResult;
  removeClientAccount: DeleteResult;
  removeCreditNote: DeleteResult;
  removeDispute: DeleteResult;
  removeDocument: DeleteResult;
  removeInvoiceLineItem: DeleteResult;
  removePayment: DeleteResult;
  removeQuote: DeleteResult;
  removeRateCard: DeleteResult;
  removeRateRule: DeleteResult;
  removeSurcharge: DeleteResult;
  updateAccountTransaction: AccountTransactions;
  updateAccountingSyncLog: AccountingSyncLogs;
  updateBillingInvoice: BillingInvoices;
  updateClientAccount: ClientAccounts;
  updateCreditNote: CreditNotes;
  updateDispute: Disputes;
  updateDocument: Documents;
  updateInvoiceLineItem: InvoiceLineItems;
  updatePayment: Payments;
  updateQuote: Quotes;
  updateRateCard: RateCards;
  updateRateRule: RateRules;
  updateSurcharge: Surcharges;
};


export type BillingMutationCreateAccountTransactionArgs = {
  value: CreateAccountTransactionInput;
};


export type BillingMutationCreateAccountingSyncLogArgs = {
  value: CreateAccountingSyncLogInput;
};


export type BillingMutationCreateBillingInvoiceArgs = {
  value: CreateBillingInvoiceInput;
};


export type BillingMutationCreateClientAccountArgs = {
  value: CreateClientAccountInput;
};


export type BillingMutationCreateCreditNoteArgs = {
  value: CreateCreditNoteInput;
};


export type BillingMutationCreateDisputeArgs = {
  value: CreateDisputeInput;
};


export type BillingMutationCreateDocumentArgs = {
  value: CreateDocumentInput;
};


export type BillingMutationCreateInvoiceLineItemArgs = {
  value: CreateInvoiceLineItemInput;
};


export type BillingMutationCreatePaymentArgs = {
  value: CreatePaymentInput;
};


export type BillingMutationCreateQuoteArgs = {
  value: CreateQuoteInput;
};


export type BillingMutationCreateRateCardArgs = {
  value: CreateRateCardInput;
};


export type BillingMutationCreateRateRuleArgs = {
  value: CreateRateRuleInput;
};


export type BillingMutationCreateSurchargeArgs = {
  value: CreateSurchargeInput;
};


export type BillingMutationRemoveAccountTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveAccountingSyncLogArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveBillingInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveClientAccountArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveCreditNoteArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveDisputeArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveInvoiceLineItemArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemovePaymentArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveQuoteArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveRateCardArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveRateRuleArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveSurchargeArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationUpdateAccountTransactionArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateAccountTransactionInput>;
};


export type BillingMutationUpdateAccountingSyncLogArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateAccountingSyncLogInput>;
};


export type BillingMutationUpdateBillingInvoiceArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateBillingInvoiceInput>;
};


export type BillingMutationUpdateClientAccountArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateClientAccountInput>;
};


export type BillingMutationUpdateCreditNoteArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCreditNoteInput>;
};


export type BillingMutationUpdateDisputeArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDisputeInput>;
};


export type BillingMutationUpdateDocumentArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDocumentInput>;
};


export type BillingMutationUpdateInvoiceLineItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInvoiceLineItemInput>;
};


export type BillingMutationUpdatePaymentArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePaymentInput>;
};


export type BillingMutationUpdateQuoteArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateQuoteInput>;
};


export type BillingMutationUpdateRateCardArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateRateCardInput>;
};


export type BillingMutationUpdateRateRuleArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateRateRuleInput>;
};


export type BillingMutationUpdateSurchargeArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateSurchargeInput>;
};

export type BillingQuery = {
  __typename?: 'BillingQuery';
  accountTransaction: AccountTransactions;
  accountTransactions: Array<AccountTransactions>;
  accountingSyncLog: AccountingSyncLogs;
  accountingSyncLogs: Array<AccountingSyncLogs>;
  billingInvoice: BillingInvoices;
  billingInvoices: Array<BillingInvoices>;
  clientAccount: ClientAccounts;
  clientAccounts: Array<ClientAccounts>;
  creditNote: CreditNotes;
  creditNotes: Array<CreditNotes>;
  dispute: Disputes;
  disputes: Array<Disputes>;
  document: Documents;
  documents: Array<Documents>;
  payment: Payments;
  payments: Array<Payments>;
  quote: Quotes;
  quotes: Array<Quotes>;
  rateCard: RateCards;
  rateCards: Array<RateCards>;
  rateRule: RateRules;
  rateRules: Array<RateRules>;
  surcharge: Surcharges;
  surcharges: Array<Surcharges>;
};


export type BillingQueryAccountTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryAccountTransactionsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<TransactionType>;
};


export type BillingQueryAccountingSyncLogArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryAccountingSyncLogsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SyncStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryBillingInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryBillingInvoicesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BillingInvoiceStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryClientAccountArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryClientAccountsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryCreditNoteArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryCreditNotesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryDisputeArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryDisputesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DisputeStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryDocumentsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryPaymentArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryPaymentsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PaymentStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryQuoteArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryQuotesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuoteStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryRateCardArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryRateCardsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<ServiceType>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryRateRuleArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryRateRulesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  pricingModel?: InputMaybe<PricingModel>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQuerySurchargeArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQuerySurchargesArgs = {
  calculationMethod?: InputMaybe<SurchargeCalculationMethod>;
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};

export type BinThresholds = {
  __typename?: 'BinThresholds';
  alertThreshold?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  location: Locations;
  maxQuantity: Scalars['Int']['output'];
  minQuantity: Scalars['Int']['output'];
  product: WmsProducts;
  reorderQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Campaigns = {
  __typename?: 'Campaigns';
  budget?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum CarrierRateUnit {
  FlatRate = 'FLAT_RATE',
  PerContainer = 'PER_CONTAINER',
  PerKg = 'PER_KG',
  PerKm = 'PER_KM',
  PerMile = 'PER_MILE'
}

export type CarrierRates = {
  __typename?: 'CarrierRates';
  carrier: Carriers;
  createdAt?: Maybe<Scalars['String']['output']>;
  destination?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  rate: Scalars['Float']['output'];
  serviceType?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<CarrierRateUnit>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Carriers = {
  __typename?: 'Carriers';
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  partnerInvoices?: Maybe<Array<PartnerInvoices>>;
  rates?: Maybe<Array<CarrierRates>>;
  servicesOffered?: Maybe<Scalars['String']['output']>;
  shipmentLegs?: Maybe<Array<ShipmentLegs>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum CasePriority {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum CaseStatus {
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Escalated = 'ESCALATED',
  InProgress = 'IN_PROGRESS',
  New = 'NEW',
  Resolved = 'RESOLVED',
  WaitingForCustomer = 'WAITING_FOR_CUSTOMER',
  WaitingForInternal = 'WAITING_FOR_INTERNAL'
}

export enum CaseType {
  BugReport = 'BUG_REPORT',
  Complaint = 'COMPLAINT',
  FeatureRequest = 'FEATURE_REQUEST',
  Problem = 'PROBLEM',
  Question = 'QUESTION',
  TechnicalSupport = 'TECHNICAL_SUPPORT'
}

export type Cases = {
  __typename?: 'Cases';
  caseNumber: Scalars['String']['output'];
  contact?: Maybe<Contacts>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  owner: User;
  priority?: Maybe<CasePriority>;
  status?: Maybe<CaseStatus>;
  type?: Maybe<CaseType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ClientAccounts = {
  __typename?: 'ClientAccounts';
  availableCredit?: Maybe<Scalars['Float']['output']>;
  client: Companies;
  createdAt?: Maybe<Scalars['String']['output']>;
  creditLimit?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isCreditApproved?: Maybe<Scalars['Boolean']['output']>;
  lastPaymentDate?: Maybe<Scalars['String']['output']>;
  paymentTermsDays?: Maybe<Scalars['Int']['output']>;
  transactions?: Maybe<Array<AccountTransactions>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  walletBalance?: Maybe<Scalars['Float']['output']>;
};

export type Companies = {
  __typename?: 'Companies';
  annualRevenue?: Maybe<Scalars['String']['output']>;
  billingInvoices?: Maybe<Array<BillingInvoices>>;
  city?: Maybe<Scalars['String']['output']>;
  clientAccount?: Maybe<ClientAccounts>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  disputes?: Maybe<Array<Disputes>>;
  id: Scalars['ID']['output'];
  inboundShipments?: Maybe<Array<InboundShipments>>;
  industry?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  putawayRules?: Maybe<Array<PutawayRules>>;
  quotes?: Maybe<Array<Quotes>>;
  returns?: Maybe<Array<Returns>>;
  salesOrders?: Maybe<Array<SalesOrders>>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type Contacts = {
  __typename?: 'Contacts';
  company?: Maybe<Companies>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: User;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type CreateAccountTransactionInput = {
  amount: Scalars['Float']['input'];
  clientAccountId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  processedByUserId?: InputMaybe<Scalars['ID']['input']>;
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
  runningBalance?: InputMaybe<Scalars['Float']['input']>;
  sourceRecordId?: InputMaybe<Scalars['ID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  transactionDate?: InputMaybe<Scalars['String']['input']>;
  type: TransactionType;
};

export type CreateAccountingSyncLogInput = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  externalSystem: Scalars['String']['input'];
  lastSyncAt?: InputMaybe<Scalars['String']['input']>;
  nextRetryAt?: InputMaybe<Scalars['String']['input']>;
  recordId: Scalars['ID']['input'];
  recordType: Scalars['String']['input'];
  requestPayload?: InputMaybe<Scalars['String']['input']>;
  responsePayload?: InputMaybe<Scalars['String']['input']>;
  retryCount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<SyncStatus>;
};

export type CreateAttachmentInput = {
  file?: InputMaybe<Scalars['File']['input']>;
  recordId?: InputMaybe<Scalars['ID']['input']>;
  recordType?: InputMaybe<RecordType>;
};

export type CreateBillingInvoiceInput = {
  amountPaid?: InputMaybe<Scalars['Float']['input']>;
  clientId: Scalars['ID']['input'];
  createdByUserId?: InputMaybe<Scalars['ID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  dueDate: Scalars['String']['input'];
  invoiceNumber: Scalars['String']['input'];
  issueDate: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paidAt?: InputMaybe<Scalars['String']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['ID']['input']>;
  sentAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BillingInvoiceStatus>;
  subtotal?: InputMaybe<Scalars['Float']['input']>;
  taxAmount?: InputMaybe<Scalars['Float']['input']>;
  totalAmount: Scalars['Float']['input'];
};

export type CreateBinThresholdInput = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationId: Scalars['ID']['input'];
  maxQuantity: Scalars['Int']['input'];
  minQuantity: Scalars['Int']['input'];
  productId: Scalars['ID']['input'];
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCampaignInput = {
  budget?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCarrierInput = {
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCarrierRateInput = {
  carrierId: Scalars['ID']['input'];
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate: Scalars['Float']['input'];
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnit>;
};

export type CreateCaseInput = {
  caseNumber: Scalars['String']['input'];
  contactId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['ID']['input'];
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type CreateClientAccountInput = {
  availableCredit?: InputMaybe<Scalars['Float']['input']>;
  clientId: Scalars['ID']['input'];
  creditLimit?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['String']['input']>;
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
  walletBalance?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateCompanyInput = {
  annualRevenue?: InputMaybe<Scalars['Float']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateContactInput = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCreditNoteInput = {
  amount: Scalars['Float']['input'];
  appliedAt?: InputMaybe<Scalars['String']['input']>;
  createdByUserId?: InputMaybe<Scalars['ID']['input']>;
  creditNoteNumber: Scalars['String']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  disputeId?: InputMaybe<Scalars['ID']['input']>;
  invoiceId: Scalars['ID']['input'];
  issueDate: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
};

export type CreateCustomerTrackingLinkInput = {
  accessCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryTaskId: Scalars['ID']['input'];
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastAccessedAt?: InputMaybe<Scalars['String']['input']>;
  trackingToken: Scalars['String']['input'];
};

export type CreateDeliveryRouteInput = {
  completedAt?: InputMaybe<Scalars['String']['input']>;
  driverId: Scalars['ID']['input'];
  estimatedDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  routeDate: Scalars['String']['input'];
  startedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DeliveryRouteStatus>;
  totalDistanceKm?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateDeliveryTaskInput = {
  actualArrivalTime?: InputMaybe<Scalars['String']['input']>;
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryAddress: Scalars['String']['input'];
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryRouteId: Scalars['ID']['input'];
  deliveryTime?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['String']['input']>;
  failureReason?: InputMaybe<DeliveryFailureReason>;
  packageId: Scalars['ID']['input'];
  recipientName?: InputMaybe<Scalars['String']['input']>;
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
  routeSequence: Scalars['Int']['input'];
  status?: InputMaybe<DeliveryTaskStatus>;
};

export type CreateDisputeInput = {
  clientId: Scalars['ID']['input'];
  disputedAmount?: InputMaybe<Scalars['Float']['input']>;
  lineItemId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
  resolvedAt?: InputMaybe<Scalars['String']['input']>;
  resolvedByUserId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<DisputeStatus>;
  submittedAt?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDmsProofOfDeliveryInput = {
  deliveryTaskId: Scalars['ID']['input'];
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  signatureData?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
  type: ProofOfDeliveryType;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDocumentInput = {
  documentType: DocumentType;
  fileName: Scalars['String']['input'];
  filePath: Scalars['String']['input'];
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId: Scalars['ID']['input'];
  recordType: Scalars['String']['input'];
  uploadedByUserId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateDriverInput = {
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  licenseExpiryDate?: InputMaybe<Scalars['String']['input']>;
  licenseNumber: Scalars['String']['input'];
  status?: InputMaybe<DriverStatus>;
  userId: Scalars['ID']['input'];
};

export type CreateDriverLocationInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  driverId: Scalars['ID']['input'];
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDriverScheduleInput = {
  driverId: Scalars['ID']['input'];
  endDate: Scalars['String']['input'];
  reason?: InputMaybe<DriverScheduleReason>;
  startDate: Scalars['String']['input'];
};

export type CreateExpenseInput = {
  amount: Scalars['Float']['input'];
  currency?: InputMaybe<Currency>;
  description?: InputMaybe<Scalars['String']['input']>;
  driverId?: InputMaybe<Scalars['ID']['input']>;
  expenseDate?: InputMaybe<Scalars['String']['input']>;
  fuelQuantity?: InputMaybe<Scalars['Float']['input']>;
  odometerReading?: InputMaybe<Scalars['Int']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatus>;
  tripId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<ExpenseType>;
};

export type CreateGeofenceEventInput = {
  eventType: GeofenceEventType;
  geofenceId: Scalars['ID']['input'];
  timestamp: Scalars['String']['input'];
  vehicleId: Scalars['ID']['input'];
};

export type CreateGeofenceInput = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
};

export type CreateGpsPingInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  timestamp: Scalars['String']['input'];
  vehicleId: Scalars['ID']['input'];
};

export type CreateInboundShipmentInput = {
  actualArrivalDate?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['ID']['input']>;
  expectedArrivalDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InboundShipmentStatus>;
  warehouseId: Scalars['ID']['input'];
};

export type CreateInboundShipmentItemInput = {
  discrepancyNotes?: InputMaybe<Scalars['String']['input']>;
  expectedQuantity: Scalars['Int']['input'];
  inboundShipmentId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  receivedQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateInteractionInput = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  contactId: Scalars['ID']['input'];
  interactionDate?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId: Scalars['ID']['input'];
};

export type CreateInventoryAdjustmentInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  quantityChange: Scalars['Int']['input'];
  reason?: InputMaybe<InventoryAdjustmentReason>;
  userId: Scalars['ID']['input'];
  warehouseId: Scalars['ID']['input'];
};

export type CreateInventoryBatchInput = {
  batchNumber: Scalars['String']['input'];
  expirationDate?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
};

export type CreateInventoryStockInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  lastCountedAt?: InputMaybe<Scalars['String']['input']>;
  lastMovementAt?: InputMaybe<Scalars['String']['input']>;
  locationId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  reservedQuantity: Scalars['Int']['input'];
  status?: InputMaybe<InventoryStockStatus>;
};

export type CreateInvoiceInput = {
  dueDate?: InputMaybe<Scalars['String']['input']>;
  issueDate?: InputMaybe<Scalars['String']['input']>;
  opportunityId?: InputMaybe<Scalars['ID']['input']>;
  paidAt?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sentAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  total?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateInvoiceItemInput = {
  invoiceId: Scalars['ID']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateInvoiceLineItemInput = {
  description: Scalars['String']['input'];
  discountRate?: InputMaybe<Scalars['Float']['input']>;
  invoiceId: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
  sourceRecordId?: InputMaybe<Scalars['ID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  taxRate?: InputMaybe<Scalars['Float']['input']>;
  unitPrice: Scalars['Float']['input'];
};

export type CreateLeadInput = {
  campaignId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
  leadSource?: InputMaybe<LeadSource>;
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  status?: InputMaybe<LeadStatus>;
};

export type CreateLocationInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  hazmatApproved?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPickable?: InputMaybe<Scalars['Boolean']['input']>;
  isReceivable?: InputMaybe<Scalars['Boolean']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  maxPallets?: InputMaybe<Scalars['Int']['input']>;
  maxVolume?: InputMaybe<Scalars['Float']['input']>;
  maxWeight?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  parentLocationId?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type: LocationType;
  warehouseId: Scalars['ID']['input'];
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateOpportunityInput = {
  campaignId?: InputMaybe<Scalars['ID']['input']>;
  companyId?: InputMaybe<Scalars['ID']['input']>;
  contactId?: InputMaybe<Scalars['ID']['input']>;
  dealValue?: InputMaybe<Scalars['Float']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['String']['input']>;
  lostReason?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
};

export type CreateOpportunityProductInput = {
  opportunityId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateOutboundShipmentInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  salesOrderId: Scalars['ID']['input'];
  status?: InputMaybe<OutboundShipmentStatus>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId: Scalars['ID']['input'];
};

export type CreateOutboundShipmentItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  outboundShipmentId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantityShipped: Scalars['Int']['input'];
  salesOrderItemId: Scalars['ID']['input'];
};

export type CreatePackageInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  insuranceValue?: InputMaybe<Scalars['Float']['input']>;
  isFragile?: InputMaybe<Scalars['Boolean']['input']>;
  isHazmat?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  packageNumber: Scalars['String']['input'];
  packageType?: InputMaybe<Scalars['String']['input']>;
  packedAt?: InputMaybe<Scalars['String']['input']>;
  packedByUserId?: InputMaybe<Scalars['ID']['input']>;
  requiresSignature?: InputMaybe<Scalars['Boolean']['input']>;
  salesOrderId: Scalars['ID']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['String']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId: Scalars['ID']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type CreatePackageItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  packageId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreatePartnerInvoiceInput = {
  carrierId: Scalars['ID']['input'];
  invoiceDate: Scalars['String']['input'];
  invoiceNumber: Scalars['String']['input'];
  status?: InputMaybe<PartnerInvoiceStatus>;
  totalAmount: Scalars['Float']['input'];
};

export type CreatePartnerInvoiceItemInput = {
  amount: Scalars['Float']['input'];
  partnerInvoiceId: Scalars['ID']['input'];
  shipmentLegId: Scalars['ID']['input'];
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  exchangeRate?: InputMaybe<Scalars['Float']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  gatewayReference?: InputMaybe<Scalars['String']['input']>;
  invoiceId: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: PaymentMethod;
  processedAt?: InputMaybe<Scalars['String']['input']>;
  processedByUserId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<PaymentStatus>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePickBatchInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['ID']['input']>;
  batchNumber: Scalars['String']['input'];
  completedAt?: InputMaybe<Scalars['String']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PickBatchStatus>;
  strategy: PickStrategy;
  totalItems?: InputMaybe<Scalars['Int']['input']>;
  warehouseId: Scalars['ID']['input'];
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CreatePickBatchItemInput = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
  pickBatchId: Scalars['ID']['input'];
  salesOrderId: Scalars['ID']['input'];
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type CreateProofOfDeliveryInput = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp: Scalars['String']['input'];
  tripStopId: Scalars['ID']['input'];
  type?: InputMaybe<ProofType>;
};

export type CreatePutawayRuleInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationType?: InputMaybe<LocationType>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  preferredLocationId?: InputMaybe<Scalars['ID']['input']>;
  priority: Scalars['Int']['input'];
  productId: Scalars['ID']['input'];
  requiresHazmatApproval?: InputMaybe<Scalars['Boolean']['input']>;
  requiresTemperatureControl?: InputMaybe<Scalars['Boolean']['input']>;
  volumeThreshold?: InputMaybe<Scalars['Float']['input']>;
  warehouseId: Scalars['ID']['input'];
  weightThreshold?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateQuoteInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  createdByUserId?: InputMaybe<Scalars['ID']['input']>;
  destinationDetails: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  originDetails: Scalars['String']['input'];
  quoteNumber?: InputMaybe<Scalars['String']['input']>;
  quotedPrice: Scalars['Float']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuoteStatus>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateRateCardInput = {
  createdByUserId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  serviceType: ServiceType;
  validFrom: Scalars['String']['input'];
  validTo?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRateRuleInput = {
  condition: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxValue?: InputMaybe<Scalars['Float']['input']>;
  minValue?: InputMaybe<Scalars['Float']['input']>;
  price: Scalars['Float']['input'];
  pricingModel: PricingModel;
  priority?: InputMaybe<Scalars['Int']['input']>;
  rateCardId: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};

export type CreateReorderPointInput = {
  productId: Scalars['ID']['input'];
  threshold: Scalars['Int']['input'];
  warehouseId: Scalars['ID']['input'];
};

export type CreateReturnInput = {
  clientId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  returnNumber: Scalars['String']['input'];
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ReturnStatus>;
};

export type CreateReturnItemInput = {
  condition?: InputMaybe<ReturnItemCondition>;
  productId: Scalars['ID']['input'];
  quantityExpected: Scalars['Int']['input'];
  quantityReceived?: InputMaybe<Scalars['Int']['input']>;
  returnId: Scalars['ID']['input'];
};

export type CreateRouteInput = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId: Scalars['ID']['input'];
};

export type CreateSalesOrderInput = {
  clientId: Scalars['ID']['input'];
  crmOpportunityId?: InputMaybe<Scalars['ID']['input']>;
  orderNumber: Scalars['String']['input'];
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatus>;
};

export type CreateSalesOrderItemInput = {
  productId: Scalars['ID']['input'];
  quantityOrdered: Scalars['Int']['input'];
  salesOrderId: Scalars['ID']['input'];
};

export type CreateShipmentLegEventInput = {
  eventTimestamp: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  shipmentLegId: Scalars['ID']['input'];
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type CreateShipmentLegInput = {
  carrierId?: InputMaybe<Scalars['ID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  internalTripId?: InputMaybe<Scalars['ID']['input']>;
  legSequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['ID']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatus>;
};

export type CreateStockTransferInput = {
  destinationWarehouseId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  sourceWarehouseId: Scalars['ID']['input'];
  status?: InputMaybe<StockTransferStatus>;
};

export type CreateSupplierInput = {
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSurchargeInput = {
  amount: Scalars['Float']['input'];
  calculationMethod: SurchargeCalculationMethod;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  validFrom?: InputMaybe<Scalars['String']['input']>;
  validTo?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTaskEventInput = {
  deliveryTaskId: Scalars['ID']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status: TaskEventStatus;
  timestamp?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTaskInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pickBatchId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  sourceEntityId?: InputMaybe<Scalars['ID']['input']>;
  sourceEntityType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
  taskNumber: Scalars['String']['input'];
  type: TaskType;
  userId?: InputMaybe<Scalars['ID']['input']>;
  warehouseId: Scalars['ID']['input'];
};

export type CreateTaskItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  completedAt?: InputMaybe<Scalars['String']['input']>;
  destinationLocationId?: InputMaybe<Scalars['ID']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  quantityCompleted: Scalars['Int']['input'];
  quantityRequired: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sourceLocationId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TaskItemStatus>;
  taskId: Scalars['ID']['input'];
};

export type CreateTripInput = {
  driverId?: InputMaybe<Scalars['ID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TripStatus>;
  vehicleId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateTripStopInput = {
  actualArrivalTime?: InputMaybe<Scalars['String']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['String']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['String']['input']>;
  sequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TripStopStatus>;
  tripId: Scalars['ID']['input'];
};

export type CreateVehicleInput = {
  capacityVolume?: InputMaybe<Scalars['Float']['input']>;
  capacityWeight?: InputMaybe<Scalars['Float']['input']>;
  currentMileage?: InputMaybe<Scalars['Int']['input']>;
  lastMaintenanceDate?: InputMaybe<Scalars['String']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registrationNumber: Scalars['String']['input'];
  status?: InputMaybe<VehicleStatus>;
  vin?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateVehicleMaintenanceInput = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDate: Scalars['String']['input'];
  serviceType?: InputMaybe<VehicleServiceType>;
  vehicleId: Scalars['ID']['input'];
};

export type CreateWarehouseInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateWmsProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['ID']['input']>;
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  sku: Scalars['String']['input'];
  status?: InputMaybe<ProductStatus>;
  supplierId?: InputMaybe<Scalars['ID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type CreditNotes = {
  __typename?: 'CreditNotes';
  amount: Scalars['Float']['output'];
  appliedAt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdByUser?: Maybe<User>;
  creditNoteNumber: Scalars['String']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  dispute?: Maybe<Disputes>;
  id: Scalars['ID']['output'];
  invoice: BillingInvoices;
  issueDate: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum CrmInvoicePaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  Check = 'CHECK',
  CreditCard = 'CREDIT_CARD',
  Maya = 'MAYA',
  Other = 'OTHER',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
  WireTransfer = 'WIRE_TRANSFER'
}

export type CrmMutation = {
  __typename?: 'CrmMutation';
  createAttachment: Attachments;
  createCampaign: Campaigns;
  createCase: Cases;
  createCompany: Companies;
  createContact: Contacts;
  createInteraction: Interactions;
  createInvoice: Invoices;
  createInvoiceItem: InvoiceItems;
  createLead: Leads;
  createNotification: Notifications;
  createOpportunity: Opportunities;
  createOpportunityProduct: OpportunityProducts;
  createProduct: Products;
  removeAttachment: DeleteResult;
  removeCampaign: DeleteResult;
  removeCase: DeleteResult;
  removeCompany: DeleteResult;
  removeContact: DeleteResult;
  removeInteraction: DeleteResult;
  removeInvoice: DeleteResult;
  removeInvoiceItem: DeleteResult;
  removeLead: DeleteResult;
  removeNotification: DeleteResult;
  removeOpportunity: DeleteResult;
  removeOpportunityProduct: DeleteResult;
  removeProduct: DeleteResult;
  updateCampaign: Campaigns;
  updateCase: Cases;
  updateCompany: Companies;
  updateContact: Contacts;
  updateInteraction: Interactions;
  updateInvoice: Invoices;
  updateInvoiceItem: InvoiceItems;
  updateLead: Leads;
  updateNotification: Notifications;
  updateOpportunity: Opportunities;
  updateOpportunityProduct: OpportunityProducts;
  updateProduct: Products;
};


export type CrmMutationCreateAttachmentArgs = {
  value: CreateAttachmentInput;
};


export type CrmMutationCreateCampaignArgs = {
  value: CreateCampaignInput;
};


export type CrmMutationCreateCaseArgs = {
  value: CreateCaseInput;
};


export type CrmMutationCreateCompanyArgs = {
  value: CreateCompanyInput;
};


export type CrmMutationCreateContactArgs = {
  value: CreateContactInput;
};


export type CrmMutationCreateInteractionArgs = {
  value: CreateInteractionInput;
};


export type CrmMutationCreateInvoiceArgs = {
  value: CreateInvoiceInput;
};


export type CrmMutationCreateInvoiceItemArgs = {
  value: CreateInvoiceItemInput;
};


export type CrmMutationCreateLeadArgs = {
  value: CreateLeadInput;
};


export type CrmMutationCreateNotificationArgs = {
  value: CreateNotificationInput;
};


export type CrmMutationCreateOpportunityArgs = {
  value: CreateOpportunityInput;
};


export type CrmMutationCreateOpportunityProductArgs = {
  value: CreateOpportunityProductInput;
};


export type CrmMutationCreateProductArgs = {
  value: CreateProductInput;
};


export type CrmMutationRemoveAttachmentArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveCampaignArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveCaseArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveContactArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveInteractionArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveInvoiceItemArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveLeadArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveOpportunityArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveOpportunityProductArgs = {
  opportunityId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type CrmMutationRemoveProductArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationUpdateCampaignArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCampaignInput>;
};


export type CrmMutationUpdateCaseArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCaseInput>;
};


export type CrmMutationUpdateCompanyArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCompanyInput>;
};


export type CrmMutationUpdateContactArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateContactInput>;
};


export type CrmMutationUpdateInteractionArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInteractionInput>;
};


export type CrmMutationUpdateInvoiceArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInvoiceInput>;
};


export type CrmMutationUpdateInvoiceItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInvoiceItemInput>;
};


export type CrmMutationUpdateLeadArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateLeadInput>;
};


export type CrmMutationUpdateNotificationArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateNotificationInput>;
};


export type CrmMutationUpdateOpportunityArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateOpportunityInput>;
};


export type CrmMutationUpdateOpportunityProductArgs = {
  opportunityId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  value?: InputMaybe<UpdateOpportunityProductInput>;
};


export type CrmMutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateProductInput>;
};

export type CrmQuery = {
  __typename?: 'CrmQuery';
  attachment: Attachments;
  attachments: Array<Attachments>;
  campaign: Campaigns;
  campaigns: Array<Campaigns>;
  case: Cases;
  cases: Array<Cases>;
  companies: Array<Companies>;
  company: Companies;
  contact: Contacts;
  contacts: Array<Contacts>;
  interaction: Interactions;
  interactions: Array<Interactions>;
  invoice: Invoices;
  invoices: Array<Invoices>;
  lead: Leads;
  leads: Array<Leads>;
  notification: Notifications;
  notifications: Array<Notifications>;
  opportunities: Array<Opportunities>;
  opportunity: Opportunities;
  product: Products;
  products: Array<Products>;
};


export type CrmQueryAttachmentArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryAttachmentsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryCampaignArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryCampaignsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryCaseArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryCasesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<CasePriority>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CaseStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<CaseType>;
};


export type CrmQueryCompaniesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryContactArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryContactsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryInteractionArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryInteractionsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  interactionType?: InputMaybe<InteractionType>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryInvoicesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<CrmInvoicePaymentMethod>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryLeadArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryLeadsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  leadSource?: InputMaybe<LeadSource>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<LeadStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryNotificationsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryOpportunitiesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryOpportunityArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryProductsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<ProductType>;
};

export enum Currency {
  Aud = 'AUD',
  Cad = 'CAD',
  Eur = 'EUR',
  Gbp = 'GBP',
  Jpy = 'JPY',
  Php = 'PHP',
  Usd = 'USD'
}

export type CustomerTrackingLinks = {
  __typename?: 'CustomerTrackingLinks';
  accessCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deliveryTask: DeliveryTasks;
  expiresAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastAccessedAt?: Maybe<Scalars['String']['output']>;
  trackingToken: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type DeleteResult = {
  __typename?: 'DeleteResult';
  numDeletedRows: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
};

export enum DeliveryFailureReason {
  AccessDenied = 'ACCESS_DENIED',
  AddressNotFound = 'ADDRESS_NOT_FOUND',
  DamagedPackage = 'DAMAGED_PACKAGE',
  Other = 'OTHER',
  RecipientNotHome = 'RECIPIENT_NOT_HOME',
  RefusedDelivery = 'REFUSED_DELIVERY',
  VehicleBreakdown = 'VEHICLE_BREAKDOWN',
  WeatherConditions = 'WEATHER_CONDITIONS'
}

export enum DeliveryRouteStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Paused = 'PAUSED',
  Planned = 'PLANNED'
}

export type DeliveryRoutes = {
  __typename?: 'DeliveryRoutes';
  actualDurationMinutes?: Maybe<Scalars['Int']['output']>;
  completedAt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  driver: Drivers;
  estimatedDurationMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  routeDate: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<DeliveryRouteStatus>;
  tasks?: Maybe<Array<DeliveryTasks>>;
  totalDistanceKm?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum DeliveryTaskStatus {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  Pending = 'PENDING',
  Rescheduled = 'RESCHEDULED'
}

export type DeliveryTasks = {
  __typename?: 'DeliveryTasks';
  actualArrivalTime?: Maybe<Scalars['String']['output']>;
  attemptCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  customerTrackingLinks?: Maybe<Array<CustomerTrackingLinks>>;
  deliveryAddress: Scalars['String']['output'];
  deliveryInstructions?: Maybe<Scalars['String']['output']>;
  deliveryRoute: DeliveryRoutes;
  deliveryTime?: Maybe<Scalars['String']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<TaskEvents>>;
  failureReason?: Maybe<DeliveryFailureReason>;
  id: Scalars['ID']['output'];
  package: Packages;
  proofOfDeliveries?: Maybe<Array<DmsProofOfDeliveries>>;
  recipientName?: Maybe<Scalars['String']['output']>;
  recipientPhone?: Maybe<Scalars['String']['output']>;
  routeSequence: Scalars['Int']['output'];
  status?: Maybe<DeliveryTaskStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum DisputeStatus {
  Approved = 'APPROVED',
  Closed = 'CLOSED',
  Denied = 'DENIED',
  Escalated = 'ESCALATED',
  Open = 'OPEN',
  UnderReview = 'UNDER_REVIEW'
}

export type Disputes = {
  __typename?: 'Disputes';
  client: Companies;
  createdAt?: Maybe<Scalars['String']['output']>;
  creditNotes?: Maybe<Array<CreditNotes>>;
  disputedAmount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  lineItem: InvoiceLineItems;
  reason: Scalars['String']['output'];
  resolutionNotes?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['String']['output']>;
  resolvedByUser?: Maybe<User>;
  status?: Maybe<DisputeStatus>;
  submittedAt?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type DmsMutation = {
  __typename?: 'DmsMutation';
  createCustomerTrackingLink: CustomerTrackingLinks;
  createDeliveryRoute: DeliveryRoutes;
  createDeliveryTask: DeliveryTasks;
  createDmsProofOfDelivery: DmsProofOfDeliveries;
  createDriverLocation: DriverLocations;
  createTaskEvent: TaskEvents;
  removeCustomerTrackingLink: DeleteResult;
  removeDeliveryRoute: DeleteResult;
  removeDeliveryTask: DeleteResult;
  removeDmsProofOfDelivery: DeleteResult;
  removeDriverLocation: DeleteResult;
  removeTaskEvent: DeleteResult;
  updateCustomerTrackingLink: CustomerTrackingLinks;
  updateDeliveryRoute: DeliveryRoutes;
  updateDeliveryTask: DeliveryTasks;
  updateDmsProofOfDelivery: DmsProofOfDeliveries;
  updateDriverLocation: DriverLocations;
  updateTaskEvent: TaskEvents;
};


export type DmsMutationCreateCustomerTrackingLinkArgs = {
  value: CreateCustomerTrackingLinkInput;
};


export type DmsMutationCreateDeliveryRouteArgs = {
  value: CreateDeliveryRouteInput;
};


export type DmsMutationCreateDeliveryTaskArgs = {
  value: CreateDeliveryTaskInput;
};


export type DmsMutationCreateDmsProofOfDeliveryArgs = {
  value: CreateDmsProofOfDeliveryInput;
};


export type DmsMutationCreateDriverLocationArgs = {
  value: CreateDriverLocationInput;
};


export type DmsMutationCreateTaskEventArgs = {
  value: CreateTaskEventInput;
};


export type DmsMutationRemoveCustomerTrackingLinkArgs = {
  id: Scalars['ID']['input'];
};


export type DmsMutationRemoveDeliveryRouteArgs = {
  id: Scalars['ID']['input'];
};


export type DmsMutationRemoveDeliveryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type DmsMutationRemoveDmsProofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
};


export type DmsMutationRemoveDriverLocationArgs = {
  id: Scalars['ID']['input'];
};


export type DmsMutationRemoveTaskEventArgs = {
  id: Scalars['ID']['input'];
};


export type DmsMutationUpdateCustomerTrackingLinkArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCustomerTrackingLinkInput>;
};


export type DmsMutationUpdateDeliveryRouteArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDeliveryRouteInput>;
};


export type DmsMutationUpdateDeliveryTaskArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDeliveryTaskInput>;
};


export type DmsMutationUpdateDmsProofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDmsProofOfDeliveryInput>;
};


export type DmsMutationUpdateDriverLocationArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDriverLocationInput>;
};


export type DmsMutationUpdateTaskEventArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateTaskEventInput>;
};

export type DmsProofOfDeliveries = {
  __typename?: 'DmsProofOfDeliveries';
  createdAt?: Maybe<Scalars['String']['output']>;
  deliveryTask: DeliveryTasks;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  recipientName?: Maybe<Scalars['String']['output']>;
  signatureData?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  type: ProofOfDeliveryType;
  updatedAt?: Maybe<Scalars['String']['output']>;
  verificationCode?: Maybe<Scalars['String']['output']>;
};

export type DmsQuery = {
  __typename?: 'DmsQuery';
  customerTrackingLink: CustomerTrackingLinks;
  customerTrackingLinks: Array<CustomerTrackingLinks>;
  deliveryRoute: DeliveryRoutes;
  deliveryRoutes: Array<DeliveryRoutes>;
  deliveryTask: DeliveryTasks;
  deliveryTasks: Array<DeliveryTasks>;
  dmsProofOfDeliveries: Array<DmsProofOfDeliveries>;
  dmsProofOfDelivery: DmsProofOfDeliveries;
  driverLocation: DriverLocations;
  driverLocations: Array<DriverLocations>;
  taskEvent: TaskEvents;
  taskEvents: Array<TaskEvents>;
};


export type DmsQueryCustomerTrackingLinkArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryCustomerTrackingLinksArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type DmsQueryDeliveryRouteArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryDeliveryRoutesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DeliveryRouteStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type DmsQueryDeliveryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryDeliveryTasksArgs = {
  failureReason?: InputMaybe<DeliveryFailureReason>;
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DeliveryTaskStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type DmsQueryDmsProofOfDeliveriesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<ProofOfDeliveryType>;
};


export type DmsQueryDmsProofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryDriverLocationArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryDriverLocationsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type DmsQueryTaskEventArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryTaskEventsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskEventStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};

export enum DocumentType {
  Bol = 'BOL',
  CommercialInvoice = 'COMMERCIAL_INVOICE',
  CreditNote = 'CREDIT_NOTE',
  CustomsDeclaration = 'CUSTOMS_DECLARATION',
  PackingList = 'PACKING_LIST',
  ProofOfDelivery = 'PROOF_OF_DELIVERY',
  Receipt = 'RECEIPT',
  ShippingLabel = 'SHIPPING_LABEL'
}

export type Documents = {
  __typename?: 'Documents';
  createdAt?: Maybe<Scalars['String']['output']>;
  documentType: DocumentType;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  fileSize?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId: Scalars['ID']['output'];
  recordType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  uploadedByUser?: Maybe<User>;
};

export type DriverLocations = {
  __typename?: 'DriverLocations';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  driver: Drivers;
  heading?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  speedKmh?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum DriverScheduleReason {
  PersonalLeave = 'PERSONAL_LEAVE',
  SickLeave = 'SICK_LEAVE',
  Training = 'TRAINING',
  Vacation = 'VACATION'
}

export type DriverSchedules = {
  __typename?: 'DriverSchedules';
  createdAt?: Maybe<Scalars['String']['output']>;
  driver: Drivers;
  endDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  reason?: Maybe<DriverScheduleReason>;
  startDate: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum DriverStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  OnLeave = 'ON_LEAVE'
}

export type Drivers = {
  __typename?: 'Drivers';
  contactPhone?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deliveryRoutes?: Maybe<Array<DeliveryRoutes>>;
  driverLocations?: Maybe<Array<DriverLocations>>;
  expenses?: Maybe<Array<Expenses>>;
  id: Scalars['ID']['output'];
  licenseExpiryDate?: Maybe<Scalars['String']['output']>;
  licenseNumber: Scalars['String']['output'];
  schedules?: Maybe<Array<DriverSchedules>>;
  status?: Maybe<DriverStatus>;
  trips?: Maybe<Array<Trips>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
};

export enum ExpenseStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Reimbursed = 'REIMBURSED',
  Rejected = 'REJECTED'
}

export enum ExpenseType {
  Accommodation = 'ACCOMMODATION',
  Fuel = 'FUEL',
  Maintenance = 'MAINTENANCE',
  Meals = 'MEALS',
  Parking = 'PARKING',
  Tolls = 'TOLLS'
}

export type Expenses = {
  __typename?: 'Expenses';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Currency>;
  description?: Maybe<Scalars['String']['output']>;
  driver?: Maybe<Drivers>;
  expenseDate?: Maybe<Scalars['String']['output']>;
  fuelQuantity?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  odometerReading?: Maybe<Scalars['Int']['output']>;
  receiptUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ExpenseStatus>;
  trip?: Maybe<Trips>;
  type?: Maybe<ExpenseType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum GeofenceEventType {
  Enter = 'ENTER',
  Exit = 'EXIT'
}

export type GeofenceEvents = {
  __typename?: 'GeofenceEvents';
  eventType: GeofenceEventType;
  geofence: Geofences;
  id: Scalars['ID']['output'];
  timestamp: Scalars['String']['output'];
  vehicle: Vehicles;
};

export type Geofences = {
  __typename?: 'Geofences';
  createdAt?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<GeofenceEvents>>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type GpsPings = {
  __typename?: 'GpsPings';
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  timestamp: Scalars['String']['output'];
  vehicle: Vehicles;
};

export type InboundShipmentItems = {
  __typename?: 'InboundShipmentItems';
  createdAt?: Maybe<Scalars['String']['output']>;
  discrepancyNotes?: Maybe<Scalars['String']['output']>;
  discrepancyQuantity?: Maybe<Scalars['Int']['output']>;
  expectedQuantity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  inboundShipment: InboundShipments;
  product: WmsProducts;
  receivedQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum InboundShipmentStatus {
  Arrived = 'ARRIVED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export type InboundShipments = {
  __typename?: 'InboundShipments';
  actualArrivalDate?: Maybe<Scalars['String']['output']>;
  client?: Maybe<Companies>;
  createdAt?: Maybe<Scalars['String']['output']>;
  expectedArrivalDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<InboundShipmentItems>>;
  status?: Maybe<InboundShipmentStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouseId: Scalars['ID']['output'];
};

export enum InteractionType {
  Call = 'CALL',
  Email = 'EMAIL',
  Meeting = 'MEETING',
  Text = 'TEXT'
}

export type Interactions = {
  __typename?: 'Interactions';
  case?: Maybe<Cases>;
  contact: Contacts;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interactionDate?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  type?: Maybe<InteractionType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
};

export enum InventoryAdjustmentReason {
  CycleCount = 'CYCLE_COUNT',
  DamagedGoods = 'DAMAGED_GOODS',
  Expired = 'EXPIRED',
  ManualCorrection = 'MANUAL_CORRECTION',
  ReturnToVendor = 'RETURN_TO_VENDOR',
  Theft = 'THEFT'
}

export type InventoryAdjustments = {
  __typename?: 'InventoryAdjustments';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  product: WmsProducts;
  quantityChange: Scalars['Int']['output'];
  reason?: Maybe<InventoryAdjustmentReason>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
  warehouseId: Scalars['ID']['output'];
};

export type InventoryBatches = {
  __typename?: 'InventoryBatches';
  batchNumber: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  expirationDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inventoryStock?: Maybe<Array<InventoryStock>>;
  outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
  packageItems?: Maybe<Array<PackageItems>>;
  product: WmsProducts;
  taskItems?: Maybe<Array<TaskItems>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type InventoryStock = {
  __typename?: 'InventoryStock';
  availableQuantity?: Maybe<Scalars['Int']['output']>;
  batch?: Maybe<InventoryBatches>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastCountedAt?: Maybe<Scalars['String']['output']>;
  lastMovementAt?: Maybe<Scalars['String']['output']>;
  location: Locations;
  product: WmsProducts;
  quantity: Scalars['Int']['output'];
  reservedQuantity: Scalars['Int']['output'];
  status?: Maybe<InventoryStockStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum InventoryStockStatus {
  Allocated = 'ALLOCATED',
  Available = 'AVAILABLE',
  Damaged = 'DAMAGED',
  Expired = 'EXPIRED',
  Hold = 'HOLD',
  Quarantine = 'QUARANTINE',
  Shipped = 'SHIPPED'
}

export type InvoiceItems = {
  __typename?: 'InvoiceItems';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoice: Invoices;
  price: Scalars['Float']['output'];
  product: Products;
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type InvoiceLineItems = {
  __typename?: 'InvoiceLineItems';
  createdAt?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountRate?: Maybe<Scalars['Float']['output']>;
  disputes?: Maybe<Array<Disputes>>;
  id: Scalars['ID']['output'];
  invoice: BillingInvoices;
  lineTotal?: Maybe<Scalars['Float']['output']>;
  quantity: Scalars['Float']['output'];
  sourceRecordId?: Maybe<Scalars['ID']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  taxAmount?: Maybe<Scalars['Float']['output']>;
  taxRate?: Maybe<Scalars['Float']['output']>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  unitPrice: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Sent = 'SENT'
}

export type Invoices = {
  __typename?: 'Invoices';
  createdAt?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  issueDate?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<InvoiceItems>>;
  opportunity?: Maybe<Opportunities>;
  paidAt?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  sentAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<InvoiceStatus>;
  total?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum LeadSource {
  Advertisment = 'ADVERTISMENT',
  ColdCall = 'COLD_CALL',
  EmailCampaign = 'EMAIL_CAMPAIGN',
  Event = 'EVENT',
  Other = 'OTHER',
  Partner = 'PARTNER',
  Referral = 'REFERRAL',
  SocialMedia = 'SOCIAL_MEDIA',
  Website = 'WEBSITE'
}

export enum LeadStatus {
  Contacted = 'CONTACTED',
  Converted = 'CONVERTED',
  New = 'NEW',
  Qualified = 'QUALIFIED',
  Unqualified = 'UNQUALIFIED'
}

export type Leads = {
  __typename?: 'Leads';
  campaign?: Maybe<Campaigns>;
  convertedAt?: Maybe<Scalars['String']['output']>;
  convertedCompany?: Maybe<Companies>;
  convertedContact?: Maybe<Contacts>;
  convertedOpportunity?: Maybe<Opportunities>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  leadScore?: Maybe<Scalars['Int']['output']>;
  leadSource?: Maybe<LeadSource>;
  name: Scalars['String']['output'];
  owner: User;
  status?: Maybe<LeadStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum LocationType {
  BulkStorage = 'BULK_STORAGE',
  CrossDockArea = 'CROSS_DOCK_AREA',
  DamagedGoods = 'DAMAGED_GOODS',
  PackingStation = 'PACKING_STATION',
  PickBin = 'PICK_BIN',
  QualityControl = 'QUALITY_CONTROL',
  ReceivingDock = 'RECEIVING_DOCK',
  ReserveStorage = 'RESERVE_STORAGE',
  ReturnsArea = 'RETURNS_AREA',
  StagingArea = 'STAGING_AREA'
}

export type Locations = {
  __typename?: 'Locations';
  barcode?: Maybe<Scalars['String']['output']>;
  binThresholds?: Maybe<Array<BinThresholds>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  destinationTaskItems?: Maybe<Array<TaskItems>>;
  hazmatApproved?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  inventoryStock?: Maybe<Array<InventoryStock>>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isPickable?: Maybe<Scalars['Boolean']['output']>;
  isReceivable?: Maybe<Scalars['Boolean']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  maxPallets?: Maybe<Scalars['Int']['output']>;
  maxVolume?: Maybe<Scalars['Float']['output']>;
  maxWeight?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  parentLocation?: Maybe<Locations>;
  path?: Maybe<Scalars['String']['output']>;
  putawayRules?: Maybe<Array<PutawayRules>>;
  sourceTaskItems?: Maybe<Array<TaskItems>>;
  temperatureControlled?: Maybe<Scalars['Boolean']['output']>;
  type: LocationType;
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouse: Warehouses;
  xCoordinate?: Maybe<Scalars['Float']['output']>;
  yCoordinate?: Maybe<Scalars['Float']['output']>;
  zCoordinate?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  billing?: Maybe<BillingMutation>;
  crm?: Maybe<CrmMutation>;
  dms?: Maybe<DmsMutation>;
  tms?: Maybe<TmsMutation>;
  wms?: Maybe<WmsMutation>;
};

export type Notifications = {
  __typename?: 'Notifications';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isRead?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type Opportunities = {
  __typename?: 'Opportunities';
  campaign?: Maybe<Campaigns>;
  company?: Maybe<Companies>;
  contact?: Maybe<Contacts>;
  createdAt?: Maybe<Scalars['String']['output']>;
  dealValue?: Maybe<Scalars['Float']['output']>;
  expectedCloseDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lostReason?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: User;
  probability?: Maybe<Scalars['Float']['output']>;
  products?: Maybe<Array<OpportunityProducts>>;
  salesOrders?: Maybe<Array<SalesOrders>>;
  source?: Maybe<OpportunitySource>;
  stage?: Maybe<OpportunityStage>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type OpportunityProducts = {
  __typename?: 'OpportunityProducts';
  id: Scalars['ID']['output'];
  opportunity: Opportunities;
  product: Products;
  quantity: Scalars['Int']['output'];
};

export enum OpportunitySource {
  Advertisment = 'ADVERTISMENT',
  ColdCall = 'COLD_CALL',
  EmailCampaign = 'EMAIL_CAMPAIGN',
  Event = 'EVENT',
  ExistingCustomer = 'EXISTING_CUSTOMER',
  Other = 'OTHER',
  Partner = 'PARTNER',
  Referral = 'REFERRAL',
  SocialMedia = 'SOCIAL_MEDIA',
  Website = 'WEBSITE'
}

export enum OpportunityStage {
  ClosedLost = 'CLOSED_LOST',
  ClosedWon = 'CLOSED_WON',
  Demo = 'DEMO',
  NeedAnalysis = 'NEED_ANALYSIS',
  Negotiation = 'NEGOTIATION',
  Proposal = 'PROPOSAL',
  Prospecting = 'PROSPECTING',
  Qualification = 'QUALIFICATION'
}

export type OutboundShipmentItems = {
  __typename?: 'OutboundShipmentItems';
  batch?: Maybe<InventoryBatches>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  outboundShipment: OutboundShipments;
  product: WmsProducts;
  quantityShipped: Scalars['Int']['output'];
  salesOrderItem: SalesOrderItems;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum OutboundShipmentStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Packed = 'PACKED',
  Picking = 'PICKING',
  Shipped = 'SHIPPED'
}

export type OutboundShipments = {
  __typename?: 'OutboundShipments';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<OutboundShipmentItems>>;
  salesOrder: SalesOrders;
  status?: Maybe<OutboundShipmentStatus>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouseId: Scalars['ID']['output'];
};

export type PackageItems = {
  __typename?: 'PackageItems';
  batch?: Maybe<InventoryBatches>;
  createdAt?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  package: Packages;
  product: WmsProducts;
  quantity: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  totalWeight?: Maybe<Scalars['Float']['output']>;
  unitWeight?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Packages = {
  __typename?: 'Packages';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  deliveryTasks?: Maybe<Array<DeliveryTasks>>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  insuranceValue?: Maybe<Scalars['Float']['output']>;
  isFragile?: Maybe<Scalars['Boolean']['output']>;
  isHazmat?: Maybe<Scalars['Boolean']['output']>;
  items?: Maybe<Array<PackageItems>>;
  length?: Maybe<Scalars['Float']['output']>;
  packageNumber: Scalars['String']['output'];
  packageType?: Maybe<Scalars['String']['output']>;
  packedAt?: Maybe<Scalars['String']['output']>;
  packedByUser?: Maybe<User>;
  requiresSignature?: Maybe<Scalars['Boolean']['output']>;
  salesOrder: SalesOrders;
  serviceLevel?: Maybe<Scalars['String']['output']>;
  shippedAt?: Maybe<Scalars['String']['output']>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  warehouse: Warehouses;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type PartnerInvoiceItems = {
  __typename?: 'PartnerInvoiceItems';
  amount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  partnerInvoice: PartnerInvoices;
  shipmentLeg: ShipmentLegs;
};

export enum PartnerInvoiceStatus {
  Cancelled = 'CANCELLED',
  Disputed = 'DISPUTED',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type PartnerInvoices = {
  __typename?: 'PartnerInvoices';
  carrier: Carriers;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoiceDate: Scalars['String']['output'];
  invoiceNumber: Scalars['String']['output'];
  items?: Maybe<Array<PartnerInvoiceItems>>;
  status?: Maybe<PartnerInvoiceStatus>;
  totalAmount: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  Check = 'CHECK',
  ClientCredit = 'CLIENT_CREDIT',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  QrPh = 'QR_PH',
  Wallet = 'WALLET'
}

export enum PaymentStatus {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED',
  Successful = 'SUCCESSFUL'
}

export type Payments = {
  __typename?: 'Payments';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  exchangeRate?: Maybe<Scalars['Float']['output']>;
  fees?: Maybe<Scalars['Float']['output']>;
  gatewayReference?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoice: BillingInvoices;
  netAmount?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  paymentDate?: Maybe<Scalars['String']['output']>;
  paymentMethod: PaymentMethod;
  processedAt?: Maybe<Scalars['String']['output']>;
  processedByUser?: Maybe<User>;
  status?: Maybe<PaymentStatus>;
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PickBatchItems = {
  __typename?: 'PickBatchItems';
  actualPickTime?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  estimatedPickTime?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  orderPriority?: Maybe<Scalars['Int']['output']>;
  pickBatch: PickBatches;
  salesOrder: SalesOrders;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum PickBatchStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN'
}

export type PickBatches = {
  __typename?: 'PickBatches';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  assignedUser?: Maybe<User>;
  batchNumber: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['String']['output']>;
  completedItems?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<PickBatchItems>>;
  priority?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<PickBatchStatus>;
  strategy: PickStrategy;
  tasks?: Maybe<Array<Tasks>>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouse: Warehouses;
  waveId?: Maybe<Scalars['String']['output']>;
  zoneRestrictions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export enum PickStrategy {
  BatchPicking = 'BATCH_PICKING',
  ClusterPicking = 'CLUSTER_PICKING',
  SingleOrderPicking = 'SINGLE_ORDER_PICKING',
  WavePicking = 'WAVE_PICKING',
  ZonePicking = 'ZONE_PICKING'
}

export enum PricingModel {
  FlatRate = 'FLAT_RATE',
  Percentage = 'PERCENTAGE',
  PerCubicMeter = 'PER_CUBIC_METER',
  PerItem = 'PER_ITEM',
  PerKg = 'PER_KG',
  PerZone = 'PER_ZONE',
  Tiered = 'TIERED'
}

export enum ProductStatus {
  Active = 'ACTIVE',
  Discontinued = 'DISCONTINUED',
  Inactive = 'INACTIVE',
  Obsolete = 'OBSOLETE'
}

export enum ProductType {
  Digital = 'DIGITAL',
  Good = 'GOOD',
  Service = 'SERVICE',
  Subscription = 'SUBSCRIPTION'
}

export type Products = {
  __typename?: 'Products';
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ProofOfDeliveries = {
  __typename?: 'ProofOfDeliveries';
  createdAt?: Maybe<Scalars['String']['output']>;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp: Scalars['String']['output'];
  tripStop: TripStops;
  type?: Maybe<ProofType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum ProofOfDeliveryType {
  CodeVerification = 'CODE_VERIFICATION',
  ContactlessDelivery = 'CONTACTLESS_DELIVERY',
  LeftAtDoor = 'LEFT_AT_DOOR',
  Photo = 'PHOTO',
  Signature = 'SIGNATURE'
}

export enum ProofType {
  BarcodeScan = 'BARCODE_SCAN',
  Photo = 'PHOTO',
  PinVerification = 'PIN_VERIFICATION',
  Signature = 'SIGNATURE'
}

export type PutawayRules = {
  __typename?: 'PutawayRules';
  client?: Maybe<Companies>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locationType?: Maybe<LocationType>;
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  minQuantity?: Maybe<Scalars['Int']['output']>;
  preferredLocation?: Maybe<Locations>;
  priority: Scalars['Int']['output'];
  product: WmsProducts;
  requiresHazmatApproval?: Maybe<Scalars['Boolean']['output']>;
  requiresTemperatureControl?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  volumeThreshold?: Maybe<Scalars['Float']['output']>;
  warehouse: Warehouses;
  weightThreshold?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  billing?: Maybe<BillingQuery>;
  crm?: Maybe<CrmQuery>;
  dms?: Maybe<DmsQuery>;
  tms?: Maybe<TmsQuery>;
  wms?: Maybe<WmsQuery>;
};

export enum QuoteStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Converted = 'CONVERTED',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
}

export type Quotes = {
  __typename?: 'Quotes';
  billingInvoices?: Maybe<Array<BillingInvoices>>;
  client?: Maybe<Companies>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdByUser?: Maybe<User>;
  destinationDetails: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  length?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  originDetails: Scalars['String']['output'];
  quoteNumber?: Maybe<Scalars['String']['output']>;
  quotedPrice: Scalars['Float']['output'];
  serviceLevel?: Maybe<Scalars['String']['output']>;
  status?: Maybe<QuoteStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type RateCards = {
  __typename?: 'RateCards';
  createdAt?: Maybe<Scalars['String']['output']>;
  createdByUser?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  rules?: Maybe<Array<RateRules>>;
  serviceType: ServiceType;
  updatedAt?: Maybe<Scalars['String']['output']>;
  validFrom: Scalars['String']['output'];
  validTo?: Maybe<Scalars['String']['output']>;
};

export type RateRules = {
  __typename?: 'RateRules';
  condition: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  maxValue?: Maybe<Scalars['Float']['output']>;
  minValue?: Maybe<Scalars['Float']['output']>;
  price: Scalars['Float']['output'];
  pricingModel: PricingModel;
  priority?: Maybe<Scalars['Int']['output']>;
  rateCard: RateCards;
  updatedAt?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export enum RecordType {
  Campaigns = 'CAMPAIGNS',
  Cases = 'CASES',
  Companies = 'COMPANIES',
  Contacts = 'CONTACTS',
  Interactions = 'INTERACTIONS',
  Invoices = 'INVOICES',
  Leads = 'LEADS',
  Opportunities = 'OPPORTUNITIES',
  Products = 'PRODUCTS'
}

export type ReorderPoints = {
  __typename?: 'ReorderPoints';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  product: WmsProducts;
  threshold: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouse: Warehouses;
};

export enum ReturnItemCondition {
  Damaged = 'DAMAGED',
  Defective = 'DEFECTIVE',
  Expired = 'EXPIRED',
  Sellable = 'SELLABLE',
  Unsellable = 'UNSELLABLE'
}

export type ReturnItems = {
  __typename?: 'ReturnItems';
  condition?: Maybe<ReturnItemCondition>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  product: WmsProducts;
  quantityExpected: Scalars['Int']['output'];
  quantityReceived?: Maybe<Scalars['Int']['output']>;
  quantityVariance?: Maybe<Scalars['Int']['output']>;
  return: Returns;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum ReturnStatus {
  Approved = 'APPROVED',
  Processed = 'PROCESSED',
  Received = 'RECEIVED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export type Returns = {
  __typename?: 'Returns';
  client: Companies;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<ReturnItems>>;
  reason?: Maybe<Scalars['String']['output']>;
  returnNumber: Scalars['String']['output'];
  salesOrder?: Maybe<SalesOrders>;
  status?: Maybe<ReturnStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Routes = {
  __typename?: 'Routes';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  totalDistance?: Maybe<Scalars['Float']['output']>;
  totalDuration?: Maybe<Scalars['Float']['output']>;
  trip: Trips;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type SalesOrderItems = {
  __typename?: 'SalesOrderItems';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
  product: WmsProducts;
  quantityOrdered: Scalars['Int']['output'];
  salesOrder: SalesOrders;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum SalesOrderStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED'
}

export type SalesOrders = {
  __typename?: 'SalesOrders';
  client: Companies;
  createdAt?: Maybe<Scalars['String']['output']>;
  crmOpportunity?: Maybe<Opportunities>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<SalesOrderItems>>;
  orderNumber: Scalars['String']['output'];
  outboundShipments?: Maybe<Array<OutboundShipments>>;
  packages?: Maybe<Array<Packages>>;
  pickBatchItems?: Maybe<Array<PickBatchItems>>;
  returns?: Maybe<Array<Returns>>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  status?: Maybe<SalesOrderStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum ServiceType {
  Customs = 'CUSTOMS',
  Fulfillment = 'FULFILLMENT',
  Handling = 'HANDLING',
  Insurance = 'INSURANCE',
  Packaging = 'PACKAGING',
  Returns = 'RETURNS',
  Shipping = 'SHIPPING',
  Storage = 'STORAGE'
}

export type ShipmentLegEvents = {
  __typename?: 'ShipmentLegEvents';
  eventTimestamp: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  shipmentLeg: ShipmentLegs;
  statusMessage?: Maybe<Scalars['String']['output']>;
};

export enum ShipmentLegStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  InTransit = 'IN_TRANSIT',
  Pending = 'PENDING'
}

export type ShipmentLegs = {
  __typename?: 'ShipmentLegs';
  carrier?: Maybe<Carriers>;
  createdAt?: Maybe<Scalars['String']['output']>;
  endLocation?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<ShipmentLegEvents>>;
  id: Scalars['ID']['output'];
  internalTrip?: Maybe<Trips>;
  legSequence: Scalars['Int']['output'];
  partnerInvoiceItems?: Maybe<Array<PartnerInvoiceItems>>;
  shipment?: Maybe<OutboundShipments>;
  startLocation?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShipmentLegStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum StockTransferStatus {
  Cancelled = 'CANCELLED',
  InTransit = 'IN_TRANSIT',
  Pending = 'PENDING',
  Received = 'RECEIVED'
}

export type StockTransfers = {
  __typename?: 'StockTransfers';
  createdAt?: Maybe<Scalars['String']['output']>;
  destinationWarehouse: Warehouses;
  id: Scalars['ID']['output'];
  product: WmsProducts;
  quantity: Scalars['Int']['output'];
  sourceWarehouse: Warehouses;
  status?: Maybe<StockTransferStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Suppliers = {
  __typename?: 'Suppliers';
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<WmsProducts>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum SurchargeCalculationMethod {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE',
  PerUnit = 'PER_UNIT',
  SlidingScale = 'SLIDING_SCALE'
}

export type Surcharges = {
  __typename?: 'Surcharges';
  amount: Scalars['Float']['output'];
  calculationMethod: SurchargeCalculationMethod;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  validFrom?: Maybe<Scalars['String']['output']>;
  validTo?: Maybe<Scalars['String']['output']>;
};

export enum SyncStatus {
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Retry = 'RETRY',
  Success = 'SUCCESS'
}

export enum TaskEventStatus {
  Arrived = 'ARRIVED',
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Exception = 'EXCEPTION',
  Failed = 'FAILED',
  Rescheduled = 'RESCHEDULED',
  Started = 'STARTED'
}

export type TaskEvents = {
  __typename?: 'TaskEvents';
  createdAt?: Maybe<Scalars['String']['output']>;
  deliveryTask: DeliveryTasks;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status: TaskEventStatus;
  timestamp?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum TaskItemStatus {
  Completed = 'COMPLETED',
  Damaged = 'DAMAGED',
  InProgress = 'IN_PROGRESS',
  NotFound = 'NOT_FOUND',
  Pending = 'PENDING',
  ShortPicked = 'SHORT_PICKED'
}

export type TaskItems = {
  __typename?: 'TaskItems';
  batch?: Maybe<InventoryBatches>;
  completedAt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  destinationLocation?: Maybe<Locations>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  product: WmsProducts;
  quantityCompleted: Scalars['Int']['output'];
  quantityRemaining?: Maybe<Scalars['Int']['output']>;
  quantityRequired: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sourceLocation?: Maybe<Locations>;
  status?: Maybe<TaskItemStatus>;
  task: Tasks;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum TaskStatus {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Error = 'ERROR',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export enum TaskType {
  CrossDock = 'CROSS_DOCK',
  CycleCount = 'CYCLE_COUNT',
  DamageInspection = 'DAMAGE_INSPECTION',
  Pack = 'PACK',
  Pick = 'PICK',
  Putaway = 'PUTAWAY',
  QualityCheck = 'QUALITY_CHECK',
  Replenishment = 'REPLENISHMENT',
  ReturnsProcessing = 'RETURNS_PROCESSING'
}

export type Tasks = {
  __typename?: 'Tasks';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  durationSeconds?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['String']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<TaskItems>>;
  notes?: Maybe<Scalars['String']['output']>;
  pickBatch?: Maybe<PickBatches>;
  priority?: Maybe<Scalars['Int']['output']>;
  sourceEntityId?: Maybe<Scalars['ID']['output']>;
  sourceEntityType?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
  status?: Maybe<TaskStatus>;
  taskNumber: Scalars['String']['output'];
  type: TaskType;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  warehouse: Warehouses;
};

export type TmsMutation = {
  __typename?: 'TmsMutation';
  createCarrier: Carriers;
  createCarrierRate: CarrierRates;
  createDriver: Drivers;
  createDriverSchedule: DriverSchedules;
  createExpense: Expenses;
  createGeofence: Geofences;
  createGeofenceEvent: GeofenceEvents;
  createGpsPing: GpsPings;
  createPartnerInvoice: PartnerInvoices;
  createPartnerInvoiceItem: PartnerInvoiceItems;
  createProofOfDelivery: ProofOfDeliveries;
  createRoute: Routes;
  createShipmentLeg: ShipmentLegs;
  createShipmentLegEvent: ShipmentLegEvents;
  createTrip: Trips;
  createTripStop: TripStops;
  createVehicle: Vehicles;
  createVehicleMaintenance: VehicleMaintenance;
  removeCarrier: DeleteResult;
  removeCarrierRate: DeleteResult;
  removeDriver: DeleteResult;
  removeDriverSchedule: DeleteResult;
  removeExpense: DeleteResult;
  removeGeofence: DeleteResult;
  removeGeofenceEvent: DeleteResult;
  removeGpsPing: DeleteResult;
  removePartnerInvoice: DeleteResult;
  removePartnerInvoiceItem: DeleteResult;
  removeProofOfDelivery: DeleteResult;
  removeRoute: DeleteResult;
  removeShipmentLeg: DeleteResult;
  removeShipmentLegEvent: DeleteResult;
  removeTrip: DeleteResult;
  removeTripStop: DeleteResult;
  removeVehicle: DeleteResult;
  removeVehicleMaintenance: DeleteResult;
  updateCarrier: Carriers;
  updateCarrierRate: CarrierRates;
  updateDriver: Drivers;
  updateDriverSchedule: DriverSchedules;
  updateExpense: Expenses;
  updateGeofence: Geofences;
  updateGeofenceEvent: GeofenceEvents;
  updateGpsPing: GpsPings;
  updatePartnerInvoice: PartnerInvoices;
  updatePartnerInvoiceItem: PartnerInvoiceItems;
  updateProofOfDelivery: ProofOfDeliveries;
  updateRoute: Routes;
  updateShipmentLeg: ShipmentLegs;
  updateShipmentLegEvent: ShipmentLegEvents;
  updateTrip: Trips;
  updateTripStop: TripStops;
  updateVehicle: Vehicles;
  updateVehicleMaintenance: VehicleMaintenance;
};


export type TmsMutationCreateCarrierArgs = {
  value: CreateCarrierInput;
};


export type TmsMutationCreateCarrierRateArgs = {
  value: CreateCarrierRateInput;
};


export type TmsMutationCreateDriverArgs = {
  value: CreateDriverInput;
};


export type TmsMutationCreateDriverScheduleArgs = {
  value: CreateDriverScheduleInput;
};


export type TmsMutationCreateExpenseArgs = {
  value: CreateExpenseInput;
};


export type TmsMutationCreateGeofenceArgs = {
  value: CreateGeofenceInput;
};


export type TmsMutationCreateGeofenceEventArgs = {
  value: CreateGeofenceEventInput;
};


export type TmsMutationCreateGpsPingArgs = {
  value: CreateGpsPingInput;
};


export type TmsMutationCreatePartnerInvoiceArgs = {
  value: CreatePartnerInvoiceInput;
};


export type TmsMutationCreatePartnerInvoiceItemArgs = {
  value: CreatePartnerInvoiceItemInput;
};


export type TmsMutationCreateProofOfDeliveryArgs = {
  value: CreateProofOfDeliveryInput;
};


export type TmsMutationCreateRouteArgs = {
  value: CreateRouteInput;
};


export type TmsMutationCreateShipmentLegArgs = {
  value: CreateShipmentLegInput;
};


export type TmsMutationCreateShipmentLegEventArgs = {
  value: CreateShipmentLegEventInput;
};


export type TmsMutationCreateTripArgs = {
  value: CreateTripInput;
};


export type TmsMutationCreateTripStopArgs = {
  value: CreateTripStopInput;
};


export type TmsMutationCreateVehicleArgs = {
  value: CreateVehicleInput;
};


export type TmsMutationCreateVehicleMaintenanceArgs = {
  value: CreateVehicleMaintenanceInput;
};


export type TmsMutationRemoveCarrierArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveCarrierRateArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveDriverArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveDriverScheduleArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveGeofenceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveGeofenceEventArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveGpsPingArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemovePartnerInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemovePartnerInvoiceItemArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveProofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveRouteArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveShipmentLegArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveShipmentLegEventArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveTripArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveTripStopArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveVehicleArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveVehicleMaintenanceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationUpdateCarrierArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCarrierInput>;
};


export type TmsMutationUpdateCarrierRateArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCarrierRateInput>;
};


export type TmsMutationUpdateDriverArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDriverInput>;
};


export type TmsMutationUpdateDriverScheduleArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDriverScheduleInput>;
};


export type TmsMutationUpdateExpenseArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateExpenseInput>;
};


export type TmsMutationUpdateGeofenceArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateGeofenceInput>;
};


export type TmsMutationUpdateGeofenceEventArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateGeofenceEventInput>;
};


export type TmsMutationUpdateGpsPingArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateGpsPingInput>;
};


export type TmsMutationUpdatePartnerInvoiceArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePartnerInvoiceInput>;
};


export type TmsMutationUpdatePartnerInvoiceItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePartnerInvoiceItemInput>;
};


export type TmsMutationUpdateProofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateProofOfDeliveryInput>;
};


export type TmsMutationUpdateRouteArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateRouteInput>;
};


export type TmsMutationUpdateShipmentLegArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateShipmentLegInput>;
};


export type TmsMutationUpdateShipmentLegEventArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateShipmentLegEventInput>;
};


export type TmsMutationUpdateTripArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateTripInput>;
};


export type TmsMutationUpdateTripStopArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateTripStopInput>;
};


export type TmsMutationUpdateVehicleArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateVehicleInput>;
};


export type TmsMutationUpdateVehicleMaintenanceArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateVehicleMaintenanceInput>;
};

export type TmsQuery = {
  __typename?: 'TmsQuery';
  carrier: Carriers;
  carriers: Array<Carriers>;
  driver: Drivers;
  drivers: Array<Drivers>;
  expense: Expenses;
  expenses: Array<Expenses>;
  geofence: Geofences;
  geofences: Array<Geofences>;
  gpsPing: GpsPings;
  gpsPings: Array<GpsPings>;
  partnerInvoice: PartnerInvoices;
  partnerInvoices: Array<PartnerInvoices>;
  proofOfDeliveries: Array<ProofOfDeliveries>;
  proofOfDelivery: ProofOfDeliveries;
  route: Routes;
  routes: Array<Routes>;
  shipmentLeg: ShipmentLegs;
  shipmentLegs: Array<ShipmentLegs>;
  trip: Trips;
  trips: Array<Trips>;
  vehicle: Vehicles;
  vehicles: Array<Vehicles>;
};


export type TmsQueryCarrierArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryCarriersArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryDriverArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryDriversArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DriverStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryExpensesArgs = {
  currency?: InputMaybe<Currency>;
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<ExpenseType>;
};


export type TmsQueryGeofenceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryGeofencesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryGpsPingArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryGpsPingsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryPartnerInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryPartnerInvoicesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PartnerInvoiceStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryProofOfDeliveriesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<ProofType>;
};


export type TmsQueryProofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryRouteArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryRoutesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryShipmentLegArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryShipmentLegsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryTripArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryTripsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TripStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryVehicleArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryVehiclesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<VehicleStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};

export enum TransactionType {
  Adjustment = 'ADJUSTMENT',
  Credit = 'CREDIT',
  Debit = 'DEBIT',
  Fee = 'FEE',
  Refund = 'REFUND',
  TopUp = 'TOP_UP'
}

export enum TripStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Planned = 'PLANNED'
}

export enum TripStopStatus {
  Arrived = 'ARRIVED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Skipped = 'SKIPPED'
}

export type TripStops = {
  __typename?: 'TripStops';
  actualArrivalTime?: Maybe<Scalars['String']['output']>;
  actualDepartureTime?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['String']['output']>;
  estimatedDepartureTime?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  proofOfDeliveries?: Maybe<Array<ProofOfDeliveries>>;
  sequence: Scalars['Int']['output'];
  shipment?: Maybe<OutboundShipments>;
  status?: Maybe<TripStopStatus>;
  trip: Trips;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Trips = {
  __typename?: 'Trips';
  createdAt?: Maybe<Scalars['String']['output']>;
  driver?: Maybe<Drivers>;
  endLocation?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['String']['output']>;
  expenses?: Maybe<Array<Expenses>>;
  id: Scalars['ID']['output'];
  routes?: Maybe<Array<Routes>>;
  shipmentLegs?: Maybe<Array<ShipmentLegs>>;
  startLocation?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
  status?: Maybe<TripStatus>;
  stops?: Maybe<Array<TripStops>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  vehicle?: Maybe<Vehicles>;
};

export type UpdateAccountTransactionInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  clientAccountId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  processedByUserId?: InputMaybe<Scalars['ID']['input']>;
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
  runningBalance?: InputMaybe<Scalars['Float']['input']>;
  sourceRecordId?: InputMaybe<Scalars['ID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  transactionDate?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TransactionType>;
};

export type UpdateAccountingSyncLogInput = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  externalSystem?: InputMaybe<Scalars['String']['input']>;
  lastSyncAt?: InputMaybe<Scalars['String']['input']>;
  nextRetryAt?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['ID']['input']>;
  recordType?: InputMaybe<Scalars['String']['input']>;
  requestPayload?: InputMaybe<Scalars['String']['input']>;
  responsePayload?: InputMaybe<Scalars['String']['input']>;
  retryCount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<SyncStatus>;
};

export type UpdateBillingInvoiceInput = {
  amountPaid?: InputMaybe<Scalars['Float']['input']>;
  clientId?: InputMaybe<Scalars['ID']['input']>;
  createdByUserId?: InputMaybe<Scalars['ID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  issueDate?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paidAt?: InputMaybe<Scalars['String']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['ID']['input']>;
  sentAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BillingInvoiceStatus>;
  subtotal?: InputMaybe<Scalars['Float']['input']>;
  taxAmount?: InputMaybe<Scalars['Float']['input']>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateBinThresholdInput = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCampaignInput = {
  budget?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCarrierInput = {
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCarrierRateInput = {
  carrierId?: InputMaybe<Scalars['ID']['input']>;
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Float']['input']>;
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnit>;
};

export type UpdateCaseInput = {
  caseNumber?: InputMaybe<Scalars['String']['input']>;
  contactId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type UpdateClientAccountInput = {
  availableCredit?: InputMaybe<Scalars['Float']['input']>;
  clientId?: InputMaybe<Scalars['ID']['input']>;
  creditLimit?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['String']['input']>;
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
  walletBalance?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateCompanyInput = {
  annualRevenue?: InputMaybe<Scalars['Float']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContactInput = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCreditNoteInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  appliedAt?: InputMaybe<Scalars['String']['input']>;
  createdByUserId?: InputMaybe<Scalars['ID']['input']>;
  creditNoteNumber?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  disputeId?: InputMaybe<Scalars['ID']['input']>;
  invoiceId?: InputMaybe<Scalars['ID']['input']>;
  issueDate?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerTrackingLinkInput = {
  accessCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryTaskId?: InputMaybe<Scalars['ID']['input']>;
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastAccessedAt?: InputMaybe<Scalars['String']['input']>;
  trackingToken?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDeliveryRouteInput = {
  completedAt?: InputMaybe<Scalars['String']['input']>;
  driverId?: InputMaybe<Scalars['ID']['input']>;
  estimatedDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  routeDate?: InputMaybe<Scalars['String']['input']>;
  startedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DeliveryRouteStatus>;
  totalDistanceKm?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateDeliveryTaskInput = {
  actualArrivalTime?: InputMaybe<Scalars['String']['input']>;
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryAddress?: InputMaybe<Scalars['String']['input']>;
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryRouteId?: InputMaybe<Scalars['ID']['input']>;
  deliveryTime?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['String']['input']>;
  failureReason?: InputMaybe<DeliveryFailureReason>;
  packageId?: InputMaybe<Scalars['ID']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
  routeSequence?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<DeliveryTaskStatus>;
};

export type UpdateDisputeInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  disputedAmount?: InputMaybe<Scalars['Float']['input']>;
  lineItemId?: InputMaybe<Scalars['ID']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
  resolvedAt?: InputMaybe<Scalars['String']['input']>;
  resolvedByUserId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<DisputeStatus>;
  submittedAt?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDmsProofOfDeliveryInput = {
  deliveryTaskId?: InputMaybe<Scalars['ID']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  signatureData?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProofOfDeliveryType>;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDocumentInput = {
  documentType?: InputMaybe<DocumentType>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['ID']['input']>;
  recordType?: InputMaybe<Scalars['String']['input']>;
  uploadedByUserId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateDriverInput = {
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  licenseExpiryDate?: InputMaybe<Scalars['String']['input']>;
  licenseNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DriverStatus>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateDriverLocationInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  driverId?: InputMaybe<Scalars['ID']['input']>;
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDriverScheduleInput = {
  driverId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<DriverScheduleReason>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenseInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Currency>;
  description?: InputMaybe<Scalars['String']['input']>;
  driverId?: InputMaybe<Scalars['ID']['input']>;
  expenseDate?: InputMaybe<Scalars['String']['input']>;
  fuelQuantity?: InputMaybe<Scalars['Float']['input']>;
  odometerReading?: InputMaybe<Scalars['Int']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatus>;
  tripId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<ExpenseType>;
};

export type UpdateGeofenceEventInput = {
  eventType?: InputMaybe<GeofenceEventType>;
  geofenceId?: InputMaybe<Scalars['ID']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateGeofenceInput = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGpsPingInput = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInboundShipmentInput = {
  actualArrivalDate?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['ID']['input']>;
  expectedArrivalDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InboundShipmentStatus>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInboundShipmentItemInput = {
  discrepancyNotes?: InputMaybe<Scalars['String']['input']>;
  expectedQuantity?: InputMaybe<Scalars['Int']['input']>;
  inboundShipmentId?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  receivedQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateInteractionInput = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  contactId?: InputMaybe<Scalars['ID']['input']>;
  interactionDate?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInventoryAdjustmentInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityChange?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<InventoryAdjustmentReason>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInventoryBatchInput = {
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  expirationDate?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInventoryStockInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  lastCountedAt?: InputMaybe<Scalars['String']['input']>;
  lastMovementAt?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  reservedQuantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InventoryStockStatus>;
};

export type UpdateInvoiceInput = {
  dueDate?: InputMaybe<Scalars['String']['input']>;
  issueDate?: InputMaybe<Scalars['String']['input']>;
  opportunityId?: InputMaybe<Scalars['ID']['input']>;
  paidAt?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sentAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  total?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateInvoiceItemInput = {
  invoiceId?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateInvoiceLineItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  discountRate?: InputMaybe<Scalars['Float']['input']>;
  invoiceId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  sourceRecordId?: InputMaybe<Scalars['ID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  taxRate?: InputMaybe<Scalars['Float']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateLeadInput = {
  campaignId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  leadScore?: InputMaybe<Scalars['Int']['input']>;
  leadSource?: InputMaybe<LeadSource>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<LeadStatus>;
};

export type UpdateLocationInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  hazmatApproved?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPickable?: InputMaybe<Scalars['Boolean']['input']>;
  isReceivable?: InputMaybe<Scalars['Boolean']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  maxPallets?: InputMaybe<Scalars['Int']['input']>;
  maxVolume?: InputMaybe<Scalars['Float']['input']>;
  maxWeight?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentLocationId?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<LocationType>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateOpportunityInput = {
  campaignId?: InputMaybe<Scalars['ID']['input']>;
  companyId?: InputMaybe<Scalars['ID']['input']>;
  contactId?: InputMaybe<Scalars['ID']['input']>;
  dealValue?: InputMaybe<Scalars['Float']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['String']['input']>;
  lostReason?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  probability?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
};

export type UpdateOpportunityProductInput = {
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOutboundShipmentInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<OutboundShipmentStatus>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateOutboundShipmentItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  outboundShipmentId?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityShipped?: InputMaybe<Scalars['Int']['input']>;
  salesOrderItemId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdatePackageInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  insuranceValue?: InputMaybe<Scalars['Float']['input']>;
  isFragile?: InputMaybe<Scalars['Boolean']['input']>;
  isHazmat?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  packageNumber?: InputMaybe<Scalars['String']['input']>;
  packageType?: InputMaybe<Scalars['String']['input']>;
  packedAt?: InputMaybe<Scalars['String']['input']>;
  packedByUserId?: InputMaybe<Scalars['ID']['input']>;
  requiresSignature?: InputMaybe<Scalars['Boolean']['input']>;
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['String']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePackageItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  packageId?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePartnerInvoiceInput = {
  carrierId?: InputMaybe<Scalars['ID']['input']>;
  invoiceDate?: InputMaybe<Scalars['String']['input']>;
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PartnerInvoiceStatus>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePartnerInvoiceItemInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  partnerInvoiceId?: InputMaybe<Scalars['ID']['input']>;
  shipmentLegId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdatePaymentInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  exchangeRate?: InputMaybe<Scalars['Float']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  gatewayReference?: InputMaybe<Scalars['String']['input']>;
  invoiceId?: InputMaybe<Scalars['ID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  processedAt?: InputMaybe<Scalars['String']['input']>;
  processedByUserId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<PaymentStatus>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePickBatchInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['ID']['input']>;
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  completedAt?: InputMaybe<Scalars['String']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PickBatchStatus>;
  strategy?: InputMaybe<PickStrategy>;
  totalItems?: InputMaybe<Scalars['Int']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UpdatePickBatchItemInput = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
  pickBatchId?: InputMaybe<Scalars['ID']['input']>;
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type UpdateProofOfDeliveryInput = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
  tripStopId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<ProofType>;
};

export type UpdatePutawayRuleInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationType?: InputMaybe<LocationType>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  preferredLocationId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  requiresHazmatApproval?: InputMaybe<Scalars['Boolean']['input']>;
  requiresTemperatureControl?: InputMaybe<Scalars['Boolean']['input']>;
  volumeThreshold?: InputMaybe<Scalars['Float']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  weightThreshold?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateQuoteInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  createdByUserId?: InputMaybe<Scalars['ID']['input']>;
  destinationDetails?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  originDetails?: InputMaybe<Scalars['String']['input']>;
  quoteNumber?: InputMaybe<Scalars['String']['input']>;
  quotedPrice?: InputMaybe<Scalars['Float']['input']>;
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuoteStatus>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateRateCardInput = {
  createdByUserId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<ServiceType>;
  validFrom?: InputMaybe<Scalars['String']['input']>;
  validTo?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRateRuleInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxValue?: InputMaybe<Scalars['Float']['input']>;
  minValue?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  pricingModel?: InputMaybe<PricingModel>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  rateCardId?: InputMaybe<Scalars['ID']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReorderPointInput = {
  productId?: InputMaybe<Scalars['ID']['input']>;
  threshold?: InputMaybe<Scalars['Int']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateReturnInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  returnNumber?: InputMaybe<Scalars['String']['input']>;
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ReturnStatus>;
};

export type UpdateReturnItemInput = {
  condition?: InputMaybe<ReturnItemCondition>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityExpected?: InputMaybe<Scalars['Int']['input']>;
  quantityReceived?: InputMaybe<Scalars['Int']['input']>;
  returnId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateRouteInput = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateSalesOrderInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  crmOpportunityId?: InputMaybe<Scalars['ID']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatus>;
};

export type UpdateSalesOrderItemInput = {
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityOrdered?: InputMaybe<Scalars['Int']['input']>;
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateShipmentLegEventInput = {
  eventTimestamp?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  shipmentLegId?: InputMaybe<Scalars['ID']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShipmentLegInput = {
  carrierId?: InputMaybe<Scalars['ID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  internalTripId?: InputMaybe<Scalars['ID']['input']>;
  legSequence?: InputMaybe<Scalars['Int']['input']>;
  shipmentId?: InputMaybe<Scalars['ID']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatus>;
};

export type UpdateStockTransferInput = {
  destinationWarehouseId?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  sourceWarehouseId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<StockTransferStatus>;
};

export type UpdateSupplierInput = {
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSurchargeInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  calculationMethod?: InputMaybe<SurchargeCalculationMethod>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  validFrom?: InputMaybe<Scalars['String']['input']>;
  validTo?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskEventInput = {
  deliveryTaskId?: InputMaybe<Scalars['ID']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskEventStatus>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pickBatchId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  sourceEntityId?: InputMaybe<Scalars['ID']['input']>;
  sourceEntityType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
  taskNumber?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TaskType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTaskItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  completedAt?: InputMaybe<Scalars['String']['input']>;
  destinationLocationId?: InputMaybe<Scalars['ID']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityCompleted?: InputMaybe<Scalars['Int']['input']>;
  quantityRequired?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sourceLocationId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TaskItemStatus>;
  taskId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTripInput = {
  driverId?: InputMaybe<Scalars['ID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TripStatus>;
  vehicleId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTripStopInput = {
  actualArrivalTime?: InputMaybe<Scalars['String']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['String']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['String']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  shipmentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TripStopStatus>;
  tripId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateVehicleInput = {
  capacityVolume?: InputMaybe<Scalars['Float']['input']>;
  capacityWeight?: InputMaybe<Scalars['Float']['input']>;
  currentMileage?: InputMaybe<Scalars['Int']['input']>;
  lastMaintenanceDate?: InputMaybe<Scalars['String']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<VehicleStatus>;
  vin?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateVehicleMaintenanceInput = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDate?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<VehicleServiceType>;
  vehicleId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateWarehouseInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWmsProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['ID']['input']>;
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
  supplierId?: InputMaybe<Scalars['ID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type VehicleMaintenance = {
  __typename?: 'VehicleMaintenance';
  cost?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  serviceDate: Scalars['String']['output'];
  serviceType?: Maybe<VehicleServiceType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  vehicle: Vehicles;
};

export enum VehicleServiceType {
  BrakeService = 'BRAKE_SERVICE',
  Inspection = 'INSPECTION',
  OilChange = 'OIL_CHANGE',
  Repair = 'REPAIR',
  RoutineMaintenance = 'ROUTINE_MAINTENANCE',
  TireReplacement = 'TIRE_REPLACEMENT'
}

export enum VehicleStatus {
  Available = 'AVAILABLE',
  InMaintenance = 'IN_MAINTENANCE',
  OnTrip = 'ON_TRIP',
  OutOfService = 'OUT_OF_SERVICE'
}

export type Vehicles = {
  __typename?: 'Vehicles';
  capacityVolume?: Maybe<Scalars['Float']['output']>;
  capacityWeight?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  currentMileage?: Maybe<Scalars['Int']['output']>;
  geofenceEvents?: Maybe<Array<GeofenceEvents>>;
  gpsPings?: Maybe<Array<GpsPings>>;
  id: Scalars['ID']['output'];
  lastMaintenanceDate?: Maybe<Scalars['String']['output']>;
  maintenances?: Maybe<Array<VehicleMaintenance>>;
  make?: Maybe<Scalars['String']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  registrationNumber: Scalars['String']['output'];
  status?: Maybe<VehicleStatus>;
  trips?: Maybe<Array<Trips>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  vin?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type Warehouses = {
  __typename?: 'Warehouses';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  destinationStockTransfers?: Maybe<Array<StockTransfers>>;
  id: Scalars['ID']['output'];
  inboundShipments?: Maybe<Array<InboundShipments>>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locations?: Maybe<Array<Locations>>;
  name: Scalars['String']['output'];
  outboundShipments?: Maybe<Array<OutboundShipments>>;
  packages?: Maybe<Array<Packages>>;
  pickBatches?: Maybe<Array<PickBatches>>;
  postalCode?: Maybe<Scalars['String']['output']>;
  putawayRules?: Maybe<Array<PutawayRules>>;
  sourceStockTransfers?: Maybe<Array<StockTransfers>>;
  state?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Tasks>>;
  timezone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type WmsMutation = {
  __typename?: 'WmsMutation';
  createBinThreshold: BinThresholds;
  createInboundShipment: InboundShipments;
  createInboundShipmentItem: InboundShipmentItems;
  createInventoryAdjustment: InventoryAdjustments;
  createInventoryBatch: InventoryBatches;
  createInventoryStock: InventoryStock;
  createLocation: Locations;
  createOutboundShipment: OutboundShipments;
  createOutboundShipmentItem: OutboundShipmentItems;
  createPackage: Packages;
  createPackageItem: PackageItems;
  createPickBatch: PickBatches;
  createPickBatchItem: PickBatchItems;
  createPutawayRule: PutawayRules;
  createReorderPoint: ReorderPoints;
  createReturn: Returns;
  createReturnItem: ReturnItems;
  createSalesOrder: SalesOrders;
  createSalesOrderItem: SalesOrderItems;
  createStockTransfer: StockTransfers;
  createSupplier: Suppliers;
  createTask: Tasks;
  createTaskItem: TaskItems;
  createWarehouse: Warehouses;
  createWmsProduct: WmsProducts;
  removeBinThreshold: DeleteResult;
  removeInboundShipment: DeleteResult;
  removeInboundShipmentItem: DeleteResult;
  removeInventoryAdjustment: DeleteResult;
  removeInventoryBatch: DeleteResult;
  removeInventoryStock: DeleteResult;
  removeLocation: DeleteResult;
  removeOutboundShipment: DeleteResult;
  removeOutboundShipmentItem: DeleteResult;
  removePackage: DeleteResult;
  removePackageItem: DeleteResult;
  removePickBatch: DeleteResult;
  removePickBatchItem: DeleteResult;
  removePutawayRule: DeleteResult;
  removeReorderPoint: DeleteResult;
  removeReturn: DeleteResult;
  removeReturnItem: DeleteResult;
  removeSalesOrder: DeleteResult;
  removeSalesOrderItem: DeleteResult;
  removeStockTransfer: DeleteResult;
  removeSupplier: DeleteResult;
  removeTask: DeleteResult;
  removeTaskItem: DeleteResult;
  removeWarehouse: DeleteResult;
  removeWmsProduct: DeleteResult;
  updateBinThreshold: BinThresholds;
  updateInboundShipment: InboundShipments;
  updateInboundShipmentItem: InboundShipmentItems;
  updateInventoryAdjustment: InventoryAdjustments;
  updateInventoryBatch: InventoryBatches;
  updateInventoryStock: InventoryStock;
  updateLocation: Locations;
  updateOutboundShipment: OutboundShipments;
  updateOutboundShipmentItem: OutboundShipmentItems;
  updatePackage: Packages;
  updatePackageItem: PackageItems;
  updatePickBatch: PickBatches;
  updatePickBatchItem: PickBatchItems;
  updatePutawayRule: PutawayRules;
  updateReorderPoint: ReorderPoints;
  updateReturn: Returns;
  updateReturnItem: ReturnItems;
  updateSalesOrder: SalesOrders;
  updateSalesOrderItem: SalesOrderItems;
  updateStockTransfer: StockTransfers;
  updateSupplier: Suppliers;
  updateTask: Tasks;
  updateTaskItem: TaskItems;
  updateWarehouse: Warehouses;
  updateWmsProduct: WmsProducts;
};


export type WmsMutationCreateBinThresholdArgs = {
  value: CreateBinThresholdInput;
};


export type WmsMutationCreateInboundShipmentArgs = {
  value: CreateInboundShipmentInput;
};


export type WmsMutationCreateInboundShipmentItemArgs = {
  value: CreateInboundShipmentItemInput;
};


export type WmsMutationCreateInventoryAdjustmentArgs = {
  value: CreateInventoryAdjustmentInput;
};


export type WmsMutationCreateInventoryBatchArgs = {
  value: CreateInventoryBatchInput;
};


export type WmsMutationCreateInventoryStockArgs = {
  value: CreateInventoryStockInput;
};


export type WmsMutationCreateLocationArgs = {
  value: CreateLocationInput;
};


export type WmsMutationCreateOutboundShipmentArgs = {
  value: CreateOutboundShipmentInput;
};


export type WmsMutationCreateOutboundShipmentItemArgs = {
  value: CreateOutboundShipmentItemInput;
};


export type WmsMutationCreatePackageArgs = {
  value: CreatePackageInput;
};


export type WmsMutationCreatePackageItemArgs = {
  value: CreatePackageItemInput;
};


export type WmsMutationCreatePickBatchArgs = {
  value: CreatePickBatchInput;
};


export type WmsMutationCreatePickBatchItemArgs = {
  value: CreatePickBatchItemInput;
};


export type WmsMutationCreatePutawayRuleArgs = {
  value: CreatePutawayRuleInput;
};


export type WmsMutationCreateReorderPointArgs = {
  value: CreateReorderPointInput;
};


export type WmsMutationCreateReturnArgs = {
  value: CreateReturnInput;
};


export type WmsMutationCreateReturnItemArgs = {
  value: CreateReturnItemInput;
};


export type WmsMutationCreateSalesOrderArgs = {
  value: CreateSalesOrderInput;
};


export type WmsMutationCreateSalesOrderItemArgs = {
  value: CreateSalesOrderItemInput;
};


export type WmsMutationCreateStockTransferArgs = {
  value: CreateStockTransferInput;
};


export type WmsMutationCreateSupplierArgs = {
  value: CreateSupplierInput;
};


export type WmsMutationCreateTaskArgs = {
  value: CreateTaskInput;
};


export type WmsMutationCreateTaskItemArgs = {
  value: CreateTaskItemInput;
};


export type WmsMutationCreateWarehouseArgs = {
  value: CreateWarehouseInput;
};


export type WmsMutationCreateWmsProductArgs = {
  value: CreateWmsProductInput;
};


export type WmsMutationRemoveBinThresholdArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveInboundShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveInboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveInventoryAdjustmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveInventoryBatchArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveInventoryStockArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveLocationArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveOutboundShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveOutboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemovePackageArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemovePackageItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemovePickBatchArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemovePickBatchItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemovePutawayRuleArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveReorderPointArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveReturnArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveReturnItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveSalesOrderArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveSalesOrderItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveStockTransferArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveSupplierArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveTaskArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveTaskItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveWarehouseArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationRemoveWmsProductArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationUpdateBinThresholdArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateBinThresholdInput>;
};


export type WmsMutationUpdateInboundShipmentArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInboundShipmentInput>;
};


export type WmsMutationUpdateInboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInboundShipmentItemInput>;
};


export type WmsMutationUpdateInventoryAdjustmentArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInventoryAdjustmentInput>;
};


export type WmsMutationUpdateInventoryBatchArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInventoryBatchInput>;
};


export type WmsMutationUpdateInventoryStockArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInventoryStockInput>;
};


export type WmsMutationUpdateLocationArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateLocationInput>;
};


export type WmsMutationUpdateOutboundShipmentArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateOutboundShipmentInput>;
};


export type WmsMutationUpdateOutboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateOutboundShipmentItemInput>;
};


export type WmsMutationUpdatePackageArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePackageInput>;
};


export type WmsMutationUpdatePackageItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePackageItemInput>;
};


export type WmsMutationUpdatePickBatchArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePickBatchInput>;
};


export type WmsMutationUpdatePickBatchItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePickBatchItemInput>;
};


export type WmsMutationUpdatePutawayRuleArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePutawayRuleInput>;
};


export type WmsMutationUpdateReorderPointArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateReorderPointInput>;
};


export type WmsMutationUpdateReturnArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateReturnInput>;
};


export type WmsMutationUpdateReturnItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateReturnItemInput>;
};


export type WmsMutationUpdateSalesOrderArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateSalesOrderInput>;
};


export type WmsMutationUpdateSalesOrderItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateSalesOrderItemInput>;
};


export type WmsMutationUpdateStockTransferArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateStockTransferInput>;
};


export type WmsMutationUpdateSupplierArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateSupplierInput>;
};


export type WmsMutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateTaskInput>;
};


export type WmsMutationUpdateTaskItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateTaskItemInput>;
};


export type WmsMutationUpdateWarehouseArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateWarehouseInput>;
};


export type WmsMutationUpdateWmsProductArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateWmsProductInput>;
};

export type WmsProducts = {
  __typename?: 'WmsProducts';
  adjustments?: Maybe<Array<InventoryAdjustments>>;
  barcode?: Maybe<Scalars['String']['output']>;
  batches?: Maybe<Array<InventoryBatches>>;
  binThresholds?: Maybe<Array<BinThresholds>>;
  client?: Maybe<Companies>;
  costPrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  inboundShipmentItems?: Maybe<Array<InboundShipmentItems>>;
  inventoryStock?: Maybe<Array<InventoryStock>>;
  length?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
  packageItems?: Maybe<Array<PackageItems>>;
  putawayRules?: Maybe<Array<PutawayRules>>;
  reorderPoints?: Maybe<Array<ReorderPoints>>;
  returnItems?: Maybe<Array<ReturnItems>>;
  salesOrderItems?: Maybe<Array<SalesOrderItems>>;
  sku: Scalars['String']['output'];
  status?: Maybe<ProductStatus>;
  stockTransfers?: Maybe<Array<StockTransfers>>;
  supplier?: Maybe<Suppliers>;
  taskItems?: Maybe<Array<TaskItems>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type WmsQuery = {
  __typename?: 'WmsQuery';
  binThreshold: BinThresholds;
  binThresholds: Array<BinThresholds>;
  inboundShipment: InboundShipments;
  inboundShipments: Array<InboundShipments>;
  inventoryAdjustment: InventoryAdjustments;
  inventoryAdjustments: Array<InventoryAdjustments>;
  inventoryBatch: InventoryBatches;
  inventoryBatches: Array<InventoryBatches>;
  inventoryStock: InventoryStock;
  inventoryStocks: Array<InventoryStock>;
  location: Locations;
  locations: Array<Locations>;
  outboundShipment: OutboundShipments;
  outboundShipments: Array<OutboundShipments>;
  package: Packages;
  packages: Array<Packages>;
  pickBatch: PickBatches;
  pickBatches: Array<PickBatches>;
  putawayRule: PutawayRules;
  putawayRules: Array<PutawayRules>;
  reorderPoint: ReorderPoints;
  reorderPoints: Array<ReorderPoints>;
  return: Returns;
  returns: Array<Returns>;
  salesOrder: SalesOrders;
  salesOrders: Array<SalesOrders>;
  stockTransfer: StockTransfers;
  stockTransfers: Array<StockTransfers>;
  supplier: Suppliers;
  suppliers: Array<Suppliers>;
  task: Tasks;
  tasks: Array<Tasks>;
  warehouse: Warehouses;
  warehouses: Array<Warehouses>;
  wmsProduct: WmsProducts;
  wmsProducts: Array<WmsProducts>;
};


export type WmsQueryBinThresholdArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryBinThresholdsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryInboundShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryInboundShipmentsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InboundShipmentStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryInventoryAdjustmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryInventoryAdjustmentsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<InventoryAdjustmentReason>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryInventoryBatchArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryInventoryBatchesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryInventoryStockArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryInventoryStocksArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InventoryStockStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryLocationArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryLocationsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<LocationType>;
};


export type WmsQueryOutboundShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryOutboundShipmentsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OutboundShipmentStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryPackageArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryPackagesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryPickBatchArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryPickBatchesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PickBatchStatus>;
  strategy?: InputMaybe<PickStrategy>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryPutawayRuleArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryPutawayRulesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  locationType?: InputMaybe<LocationType>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryReorderPointArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryReorderPointsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryReturnArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryReturnsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ReturnStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQuerySalesOrderArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerySalesOrdersArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryStockTransferArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryStockTransfersArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<StockTransferStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQuerySupplierArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerySuppliersArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryTasksArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<TaskType>;
};


export type WmsQueryWarehouseArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryWarehousesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type WmsQueryWmsProductArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryWmsProductsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
  to?: InputMaybe<Scalars['Date']['input']>;
};

export type CreateAccountTransactionMutationVariables = Exact<{
  accountTransaction: CreateAccountTransactionInput;
}>;


export type CreateAccountTransactionMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createAccountTransaction: { __typename?: 'AccountTransactions', id: string } } | null };

export type UpdateAccountTransactionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  accountTransaction: UpdateAccountTransactionInput;
}>;


export type UpdateAccountTransactionMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateAccountTransaction: { __typename?: 'AccountTransactions', id: string } } | null };

export type RemoveAccountTransactionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveAccountTransactionMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeAccountTransaction: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type AccountTransactionsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TransactionType>;
}>;


export type AccountTransactionsQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', accountTransactions: Array<{ __typename?: 'AccountTransactions', amount: number, createdAt?: string | null, description?: string | null, id: string, referenceNumber?: string | null, runningBalance?: number | null, sourceRecordId?: string | null, sourceRecordType?: string | null, transactionDate?: string | null, type: TransactionType, updatedAt?: string | null, processedByUser?: { __typename?: 'User', name: string, image?: string | null, email: string, id: string } | null, clientAccount: { __typename?: 'ClientAccounts', availableCredit?: number | null, paymentTermsDays?: number | null, updatedAt?: string | null, walletBalance?: number | null, createdAt?: string | null, client: { __typename?: 'Companies', annualRevenue?: string | null, id: string, industry?: string | null, name: string, phoneNumber?: string | null } } }> } | null };

export type CreateAccountingSyncLogMutationVariables = Exact<{
  accountingSyncLog: CreateAccountingSyncLogInput;
}>;


export type CreateAccountingSyncLogMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createAccountingSyncLog: { __typename?: 'AccountingSyncLogs', id: string } } | null };

export type UpdateAccountingSyncLogMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  accountingSyncLog: UpdateAccountingSyncLogInput;
}>;


export type UpdateAccountingSyncLogMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateAccountingSyncLog: { __typename?: 'AccountingSyncLogs', id: string } } | null };

export type RemoveAccountingSyncLogMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveAccountingSyncLogMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeAccountingSyncLog: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type AccountingSyncLogsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SyncStatus>;
}>;


export type AccountingSyncLogsQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', accountingSyncLogs: Array<{ __typename?: 'AccountingSyncLogs', createdAt?: string | null, errorMessage?: string | null, externalId?: string | null, externalSystem: string, id: string, lastSyncAt?: string | null, nextRetryAt?: string | null, recordId: string, recordType: string, requestPayload?: string | null, responsePayload?: string | null, retryCount?: number | null, status?: SyncStatus | null, updatedAt?: string | null }> } | null };

export type CreateClientAccountMutationVariables = Exact<{
  clientAccount: CreateClientAccountInput;
}>;


export type CreateClientAccountMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createClientAccount: { __typename?: 'ClientAccounts', id: string } } | null };

export type UpdateClientAccountMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  clientAccount: UpdateClientAccountInput;
}>;


export type UpdateClientAccountMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateClientAccount: { __typename?: 'ClientAccounts', id: string } } | null };

export type RemoveClientAccountMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveClientAccountMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeClientAccount: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableClientAccountQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableClientAccountQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', clientAccounts: Array<{ __typename?: 'ClientAccounts', availableCredit?: number | null, creditLimit?: number | null, currency?: string | null, isCreditApproved?: boolean | null, lastPaymentDate?: string | null, paymentTermsDays?: number | null, updatedAt?: string | null, walletBalance?: number | null, id: string, client: { __typename?: 'Companies', annualRevenue?: string | null, country?: string | null, industry?: string | null, name: string, phoneNumber?: string | null, updatedAt?: string | null, website?: string | null }, transactions?: Array<{ __typename?: 'AccountTransactions', amount: number, description?: string | null, id: string, referenceNumber?: string | null, runningBalance?: number | null, sourceRecordId?: string | null, sourceRecordType?: string | null, transactionDate?: string | null, type: TransactionType }> | null }> } | null };

export type CreateCreditNoteMutationVariables = Exact<{
  creditNote: CreateCreditNoteInput;
}>;


export type CreateCreditNoteMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createCreditNote: { __typename?: 'CreditNotes', id: string } } | null };

export type UpdateCreditNoteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  creditNote: UpdateCreditNoteInput;
}>;


export type UpdateCreditNoteMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateCreditNote: { __typename?: 'CreditNotes', id: string } } | null };

export type RemoveCreditNoteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCreditNoteMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeCreditNote: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableCreditNoteQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableCreditNoteQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', creditNotes: Array<{ __typename?: 'CreditNotes', appliedAt?: string | null, amount: number, createdAt?: string | null, creditNoteNumber: string, currency?: string | null, id: string, issueDate: string, notes?: string | null, reason: string, updatedAt?: string | null, createdByUser?: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } | null, invoice: { __typename?: 'BillingInvoices', amountPaid?: number | null, invoiceNumber: string, issueDate: string, paidAt?: string | null, notes?: string | null, sentAt?: string | null, status?: BillingInvoiceStatus | null, subtotal?: number | null, taxAmount?: number | null, totalAmount: number, updatedAt?: string | null, paymentTerms?: string | null, discountAmount?: number | null, dueDate: string, currency?: string | null }, dispute?: { __typename?: 'Disputes', disputedAmount?: number | null, id: string, reason: string, resolutionNotes?: string | null, resolvedAt?: string | null, status?: DisputeStatus | null, submittedAt?: string | null } | null }> } | null };

export type CreateDisputeMutationVariables = Exact<{
  dispute: CreateDisputeInput;
}>;


export type CreateDisputeMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createDispute: { __typename?: 'Disputes', id: string } } | null };

export type UpdateDisputeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  dispute: UpdateDisputeInput;
}>;


export type UpdateDisputeMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateDispute: { __typename?: 'Disputes', id: string } } | null };

export type RemoveDisputeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveDisputeMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeDispute: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableDisputeQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DisputeStatus>;
}>;


export type TableDisputeQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', disputes: Array<{ __typename?: 'Disputes', createdAt?: string | null, disputedAmount?: number | null, id: string, reason: string, resolutionNotes?: string | null, resolvedAt?: string | null, status?: DisputeStatus | null, submittedAt?: string | null, updatedAt?: string | null, client: { __typename?: 'Companies', annualRevenue?: string | null, city?: string | null, id: string, industry?: string | null, name: string, website?: string | null, phoneNumber?: string | null }, resolvedByUser?: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } | null, lineItem: { __typename?: 'InvoiceLineItems', discountAmount?: number | null, discountRate?: number | null, description: string, id: string, lineTotal?: number | null, quantity: number, sourceRecordId?: string | null, sourceRecordType?: string | null, taxAmount?: number | null, taxRate?: number | null, totalPrice?: number | null, unitPrice: number, updatedAt?: string | null, invoice: { __typename?: 'BillingInvoices', amountPaid?: number | null, currency?: string | null, discountAmount?: number | null, dueDate: string, id: string, invoiceNumber: string, issueDate: string, notes?: string | null, paidAt?: string | null, paymentTerms?: string | null, sentAt?: string | null, status?: BillingInvoiceStatus | null, subtotal?: number | null, taxAmount?: number | null, totalAmount: number, updatedAt?: string | null } } }> } | null };

export type CreateInvoiceLineItemMutationVariables = Exact<{
  invoiceLineItem: CreateInvoiceLineItemInput;
}>;


export type CreateInvoiceLineItemMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createInvoiceLineItem: { __typename?: 'InvoiceLineItems', id: string } } | null };

export type UpdateInvoiceLineItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  invoiceLineItem: UpdateInvoiceLineItemInput;
}>;


export type UpdateInvoiceLineItemMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateInvoiceLineItem: { __typename?: 'InvoiceLineItems', id: string } } | null };

export type RemoveInvoiceLineItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveInvoiceLineItemMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeInvoiceLineItem: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateBillingInvoiceMutationVariables = Exact<{
  billingInvoice: CreateBillingInvoiceInput;
}>;


export type CreateBillingInvoiceMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createBillingInvoice: { __typename?: 'BillingInvoices', id: string } } | null };

export type UpdateBillingInvoiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  billingInvoice: UpdateBillingInvoiceInput;
}>;


export type UpdateBillingInvoiceMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateBillingInvoice: { __typename?: 'BillingInvoices', id: string } } | null };

export type RemoveBillingInvoiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveBillingInvoiceMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeBillingInvoice: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableBillingInvoiceQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BillingInvoiceStatus>;
}>;


export type TableBillingInvoiceQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', billingInvoices: Array<{ __typename?: 'BillingInvoices', amountOutstanding?: number | null, amountPaid?: number | null, createdAt?: string | null, currency?: string | null, discountAmount?: number | null, dueDate: string, id: string, invoiceNumber: string, issueDate: string, notes?: string | null, paidAt?: string | null, paymentTerms?: string | null, sentAt?: string | null, status?: BillingInvoiceStatus | null, subtotal?: number | null, taxAmount?: number | null, totalAmount: number, updatedAt?: string | null, lineItems?: Array<{ __typename?: 'InvoiceLineItems', description: string, discountAmount?: number | null, discountRate?: number | null, id: string, quantity: number, taxAmount?: number | null, lineTotal?: number | null, sourceRecordId?: string | null, sourceRecordType?: string | null, taxRate?: number | null, totalPrice?: number | null, unitPrice: number, updatedAt?: string | null }> | null }> } | null };

export type CreatePaymentMutationVariables = Exact<{
  payment: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createPayment: { __typename?: 'Payments', id: string } } | null };

export type UpdatePaymentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  payment: UpdatePaymentInput;
}>;


export type UpdatePaymentMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updatePayment: { __typename?: 'Payments', id: string } } | null };

export type RemovePaymentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemovePaymentMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removePayment: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TablePaymentQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PaymentStatus>;
}>;


export type TablePaymentQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', payments: Array<{ __typename?: 'Payments', amount: number, createdAt?: string | null, currency?: string | null, exchangeRate?: number | null, fees?: number | null, gatewayReference?: string | null, id: string, invoice: { __typename?: 'BillingInvoices', invoiceNumber: string, id: string, issueDate: string, paidAt?: string | null, paymentTerms?: string | null, sentAt?: string | null, status?: BillingInvoiceStatus | null, discountAmount?: number | null, amountPaid?: number | null, amountOutstanding?: number | null }, processedByUser?: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } | null }> } | null };

export type CreateQuoteMutationVariables = Exact<{
  quote: CreateQuoteInput;
}>;


export type CreateQuoteMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createQuote: { __typename?: 'Quotes', id: string } } | null };

export type UpdateQuoteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  quote: UpdateQuoteInput;
}>;


export type UpdateQuoteMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateQuote: { __typename?: 'Quotes', id: string } } | null };

export type RemoveQuoteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveQuoteMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeQuote: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableQuoteQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuoteStatus>;
}>;


export type TableQuoteQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', quotes: Array<{ __typename?: 'Quotes', createdAt?: string | null, destinationDetails: string, expiresAt?: string | null, height?: number | null, id: string, length?: number | null, notes?: string | null, originDetails: string, quoteNumber?: string | null, quotedPrice: number, serviceLevel?: string | null, status?: QuoteStatus | null, updatedAt?: string | null, volume?: number | null, weight?: number | null, width?: number | null, createdByUser?: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } | null, client?: { __typename?: 'Companies', city?: string | null, country?: string | null, id: string, industry?: string | null, name: string, phoneNumber?: string | null, website?: string | null, billingInvoices?: Array<{ __typename?: 'BillingInvoices', amountOutstanding?: number | null, amountPaid?: number | null, currency?: string | null, discountAmount?: number | null, dueDate: string, invoiceNumber: string, issueDate: string }> | null } | null }> } | null };

export type CreateRateCardMutationVariables = Exact<{
  rateCard: CreateRateCardInput;
}>;


export type CreateRateCardMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createRateCard: { __typename?: 'RateCards', id: string } } | null };

export type UpdateRateCardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  rateCard: UpdateRateCardInput;
}>;


export type UpdateRateCardMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateRateCard: { __typename?: 'RateCards', id: string } } | null };

export type RemoveRateCardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveRateCardMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeRateCard: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableRateCardQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<ServiceType>;
}>;


export type TableRateCardQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', rateCards: Array<{ __typename?: 'RateCards', createdAt?: string | null, description?: string | null, id: string, isActive?: boolean | null, name: string, serviceType: ServiceType, updatedAt?: string | null, validFrom: string, validTo?: string | null, createdByUser?: { __typename?: 'User', email: string, emailVerified: boolean, image?: string | null, name: string } | null, rules?: Array<{ __typename?: 'RateRules', condition: string, id: string, isActive?: boolean | null, maxValue?: number | null, minValue?: number | null, price: number, pricingModel: PricingModel, priority?: number | null, value: string }> | null }> } | null };

export type CreateRateRuleMutationVariables = Exact<{
  rateRule: CreateRateRuleInput;
}>;


export type CreateRateRuleMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createRateRule: { __typename?: 'RateRules', id: string } } | null };

export type UpdateRateRuleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  rateRule: UpdateRateRuleInput;
}>;


export type UpdateRateRuleMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateRateRule: { __typename?: 'RateRules', id: string } } | null };

export type RemoveRateRuleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveRateRuleMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeRateRule: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableRateRuleQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  pricingModel?: InputMaybe<PricingModel>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableRateRuleQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', rateRules: Array<{ __typename?: 'RateRules', condition: string, createdAt?: string | null, id: string, isActive?: boolean | null, maxValue?: number | null, minValue?: number | null, price: number, pricingModel: PricingModel, priority?: number | null, updatedAt?: string | null, value: string, rateCard: { __typename?: 'RateCards', createdAt?: string | null, description?: string | null, id: string, isActive?: boolean | null, name: string, serviceType: ServiceType, updatedAt?: string | null, validFrom: string, validTo?: string | null, createdByUser?: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } | null } }> } | null };

export type CreateSurchargeMutationVariables = Exact<{
  surcharge: CreateSurchargeInput;
}>;


export type CreateSurchargeMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', createSurcharge: { __typename?: 'Surcharges', id: string } } | null };

export type UpdateSurchargeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  surcharge: UpdateSurchargeInput;
}>;


export type UpdateSurchargeMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', updateSurcharge: { __typename?: 'Surcharges', id: string } } | null };

export type RemoveSurchargeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveSurchargeMutation = { __typename?: 'Mutation', billing?: { __typename?: 'BillingMutation', removeSurcharge: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableSurchargeQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  calculationMethod?: InputMaybe<SurchargeCalculationMethod>;
}>;


export type TableSurchargeQuery = { __typename?: 'Query', billing?: { __typename?: 'BillingQuery', surcharges: Array<{ __typename?: 'Surcharges', amount: number, calculationMethod: SurchargeCalculationMethod, createdAt?: string | null, description?: string | null, id: string, isActive?: boolean | null, name: string, type: string, updatedAt?: string | null, validFrom?: string | null, validTo?: string | null }> } | null };

export type CreateCampaignMutationVariables = Exact<{
  campaign: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createCampaign: { __typename?: 'Campaigns', id: string } } | null };

export type UpdateCampaignMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  campaign: UpdateCampaignInput;
}>;


export type UpdateCampaignMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateCampaign: { __typename?: 'Campaigns', id: string } } | null };

export type RemoveCampaignMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCampaignMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeCampaign: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableCampaignQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableCampaignQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', campaigns: Array<{ __typename?: 'Campaigns', budget?: number | null, createdAt?: string | null, endDate?: string | null, id: string, name: string, startDate?: string | null, updatedAt?: string | null }> } | null };

export type SearchCampaignsQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchCampaignsQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', campaigns: Array<{ __typename?: 'Campaigns', value: string, label: string }> } | null };

export type CreateCaseMutationVariables = Exact<{
  case: CreateCaseInput;
}>;


export type CreateCaseMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createCase: { __typename?: 'Cases', id: string } } | null };

export type UpdateCaseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  case: UpdateCaseInput;
}>;


export type UpdateCaseMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateCase: { __typename?: 'Cases', id: string } } | null };

export type RemoveCaseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCaseMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeCase: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableCaseQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
}>;


export type TableCaseQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', cases: Array<{ __typename?: 'Cases', caseNumber: string, createdAt?: string | null, description?: string | null, id: string, priority?: CasePriority | null, status?: CaseStatus | null, type?: CaseType | null, updatedAt?: string | null, contact?: { __typename?: 'Contacts', id: string, email: string, name: string, phoneNumber?: string | null, jobTitle?: string | null } | null, owner: { __typename?: 'User', id: string, email: string, image?: string | null, name: string } }> } | null };

export type SearchCasesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchCasesQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', cases: Array<{ __typename?: 'Cases', value: string, label: string }> } | null };

export type CreateCompanyMutationVariables = Exact<{
  company: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createCompany: { __typename?: 'Companies', id: string } } | null };

export type UpdateCompanyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  company: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateCompany: { __typename?: 'Companies', id: string } } | null };

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeCompany: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableCompanyQueryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableCompanyQueryQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', companies: Array<{ __typename?: 'Companies', name: string, annualRevenue?: string | null, phoneNumber?: string | null, postalCode?: string | null, state?: string | null, street?: string | null, updatedAt?: string | null, website?: string | null, city?: string | null, country?: string | null, createdAt?: string | null, id: string, industry?: string | null, owner?: { __typename?: 'User', email: string, image?: string | null, name: string } | null, clientAccount?: { __typename?: 'ClientAccounts', walletBalance?: number | null, creditLimit?: number | null, currency?: string | null } | null }> } | null };

export type SearchCompaniesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchCompaniesQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', companies: Array<{ __typename?: 'Companies', value: string, label: string }> } | null };

export type CreateContactMutationVariables = Exact<{
  contact: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createContact: { __typename?: 'Contacts', id: string } } | null };

export type UpdateContactMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  contact: UpdateContactInput;
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateContact: { __typename?: 'Contacts', id: string } } | null };

export type RemoveContactMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveContactMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeContact: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableContactQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableContactQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', contacts: Array<{ __typename?: 'Contacts', createdAt?: string | null, email: string, id: string, jobTitle?: string | null, name: string, phoneNumber?: string | null, updatedAt?: string | null, owner: { __typename?: 'User', id: string, email: string, image?: string | null, name: string }, company?: { __typename?: 'Companies', id: string, phoneNumber?: string | null, name: string, industry?: string | null, website?: string | null } | null }> } | null };

export type SearchContactsQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchContactsQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', contacts: Array<{ __typename?: 'Contacts', value: string, label: string }> } | null };

export type CreateInteractionMutationVariables = Exact<{
  interaction: CreateInteractionInput;
}>;


export type CreateInteractionMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createInteraction: { __typename?: 'Interactions', id: string } } | null };

export type UpdateInteractionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  interaction: UpdateInteractionInput;
}>;


export type UpdateInteractionMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateInteraction: { __typename?: 'Interactions', id: string } } | null };

export type RemoveInteractionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveInteractionMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeInteraction: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableInteractionQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  interactionType?: InputMaybe<InteractionType>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableInteractionQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', interactions: Array<{ __typename?: 'Interactions', createdAt?: string | null, id: string, interactionDate?: string | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, updatedAt?: string | null, user: { __typename?: 'User', id: string, email: string, image?: string | null, name: string }, case?: { __typename?: 'Cases', id: string, caseNumber: string, priority?: CasePriority | null, status?: CaseStatus | null, type?: CaseType | null } | null, contact: { __typename?: 'Contacts', id: string, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null } }> } | null };

export type CreateInvoiceItemMutationVariables = Exact<{
  invoiceItem: CreateInvoiceItemInput;
}>;


export type CreateInvoiceItemMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createInvoiceItem: { __typename?: 'InvoiceItems', id: string } } | null };

export type UpdateInvoiceItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  invoiceItem: UpdateInvoiceItemInput;
}>;


export type UpdateInvoiceItemMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateInvoiceItem: { __typename?: 'InvoiceItems', id: string } } | null };

export type RemoveInvoiceItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveInvoiceItemMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeInvoiceItem: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateInvoiceMutationVariables = Exact<{
  invoice: CreateInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createInvoice: { __typename?: 'Invoices', id: string } } | null };

export type UpdateInvoiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  invoice: UpdateInvoiceInput;
}>;


export type UpdateInvoiceMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateInvoice: { __typename?: 'Invoices', id: string } } | null };

export type RemoveInvoiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveInvoiceMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeInvoice: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableInvoiceQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<CrmInvoicePaymentMethod>;
  status?: InputMaybe<InvoiceStatus>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableInvoiceQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', invoices: Array<{ __typename?: 'Invoices', createdAt?: string | null, dueDate?: string | null, id: string, issueDate?: string | null, paidAt?: string | null, paymentMethod?: PaymentMethod | null, sentAt?: string | null, status?: InvoiceStatus | null, total?: number | null, updatedAt?: string | null, items?: Array<{ __typename?: 'InvoiceItems', price: number, quantity: number, updatedAt?: string | null, id: string, createdAt?: string | null, product: { __typename?: 'Products', name: string, price: number, type?: ProductType | null, sku?: string | null, id: string, description?: string | null } }> | null, opportunity?: { __typename?: 'Opportunities', name: string, stage?: OpportunityStage | null, id: string, expectedCloseDate?: string | null, dealValue?: number | null } | null }> } | null };

export type CreateLeadMutationVariables = Exact<{
  lead: CreateLeadInput;
}>;


export type CreateLeadMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createLead: { __typename?: 'Leads', id: string } } | null };

export type UpdateLeadMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  lead: UpdateLeadInput;
}>;


export type UpdateLeadMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateLead: { __typename?: 'Leads', id: string } } | null };

export type RemoveLeadMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveLeadMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeLead: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableLeadQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<LeadStatus>;
  source?: InputMaybe<LeadSource>;
}>;


export type TableLeadQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', leads: Array<{ __typename?: 'Leads', convertedAt?: string | null, createdAt?: string | null, email: string, leadScore?: number | null, leadSource?: LeadSource | null, name: string, id: string, status?: LeadStatus | null, updatedAt?: string | null, owner: { __typename?: 'User', id: string, email: string, image?: string | null, name: string }, campaign?: { __typename?: 'Campaigns', name: string, endDate?: string | null, startDate?: string | null, budget?: number | null } | null, convertedCompany?: { __typename?: 'Companies', name: string, industry?: string | null, phoneNumber?: string | null, website?: string | null, id: string } | null, convertedContact?: { __typename?: 'Contacts', email: string, id: string, jobTitle?: string | null, name: string, phoneNumber?: string | null, updatedAt?: string | null, company?: { __typename?: 'Companies', name: string, industry?: string | null, id: string } | null } | null, convertedOpportunity?: { __typename?: 'Opportunities', name: string, dealValue?: number | null, source?: OpportunitySource | null, stage?: OpportunityStage | null } | null }> } | null };

export type SearchLeadsQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchLeadsQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', leads: Array<{ __typename?: 'Leads', value: string, label: string }> } | null };

export type CreateNotificationMutationVariables = Exact<{
  notification: CreateNotificationInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createNotification: { __typename?: 'Notifications', id: string } } | null };

export type UpdateNotificationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  notification: UpdateNotificationInput;
}>;


export type UpdateNotificationMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateNotification: { __typename?: 'Notifications', id: string } } | null };

export type RemoveNotificationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveNotificationMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeNotification: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableNotificationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableNotificationQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', notifications: Array<{ __typename?: 'Notifications', createdAt?: string | null, id: string, isRead?: boolean | null, link?: string | null, message: string, updatedAt?: string | null, user: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } }> } | null };

export type SearchNotificationsQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchNotificationsQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', notifications: Array<{ __typename?: 'Notifications', value: string, label: string }> } | null };

export type CreateOpportunityMutationVariables = Exact<{
  opportunity: CreateOpportunityInput;
}>;


export type CreateOpportunityMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createOpportunity: { __typename?: 'Opportunities', id: string } } | null };

export type UpdateOpportunityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  opportunity: UpdateOpportunityInput;
}>;


export type UpdateOpportunityMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateOpportunity: { __typename?: 'Opportunities', id: string } } | null };

export type RemoveOpportunityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveOpportunityMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeOpportunity: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableOpportunityQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
}>;


export type TableOpportunityQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', opportunities: Array<{ __typename?: 'Opportunities', createdAt?: string | null, dealValue?: number | null, expectedCloseDate?: string | null, id: string, lostReason?: string | null, name: string, probability?: number | null, source?: OpportunitySource | null, stage?: OpportunityStage | null, updatedAt?: string | null, company?: { __typename?: 'Companies', name: string, industry?: string | null, id: string, country?: string | null, phoneNumber?: string | null } | null, contact?: { __typename?: 'Contacts', email: string, id: string, jobTitle?: string | null, name: string, phoneNumber?: string | null, updatedAt?: string | null, company?: { __typename?: 'Companies', name: string, phoneNumber?: string | null, industry?: string | null, country?: string | null } | null } | null, owner: { __typename?: 'User', email: string, id: string, image?: string | null, name: string }, products?: Array<{ __typename?: 'OpportunityProducts', quantity: number, product: { __typename?: 'Products', id: string, name: string, price: number, sku?: string | null, type?: ProductType | null, description?: string | null } }> | null, campaign?: { __typename?: 'Campaigns', name: string, budget?: number | null, endDate?: string | null, startDate?: string | null, id: string } | null }> } | null };

export type SearchOpportunitiesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchOpportunitiesQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', opportunities: Array<{ __typename?: 'Opportunities', value: string, label: string }> } | null };

export type CreateOpportunityProductMutationVariables = Exact<{
  opportunityProduct: CreateOpportunityProductInput;
}>;


export type CreateOpportunityProductMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createOpportunityProduct: { __typename?: 'OpportunityProducts', opportunity: { __typename?: 'Opportunities', id: string }, product: { __typename?: 'Products', id: string } } } | null };

export type UpdateOpportunityProductMutationVariables = Exact<{
  opportunityId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  opportunityProduct: UpdateOpportunityProductInput;
}>;


export type UpdateOpportunityProductMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateOpportunityProduct: { __typename?: 'OpportunityProducts', opportunity: { __typename?: 'Opportunities', id: string }, product: { __typename?: 'Products', id: string } } } | null };

export type RemoveOpportunityProductMutationVariables = Exact<{
  opportunityId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type RemoveOpportunityProductMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeOpportunityProduct: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateProductMutationVariables = Exact<{
  product: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', createProduct: { __typename?: 'Products', id: string } } | null };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  product: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', updateProduct: { __typename?: 'Products', id: string } } | null };

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutation', crm?: { __typename?: 'CrmMutation', removeProduct: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableProductQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
}>;


export type TableProductQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', products: Array<{ __typename?: 'Products', createdAt?: string | null, description?: string | null, id: string, name: string, price: number, sku?: string | null, type?: ProductType | null, updatedAt?: string | null }> } | null };

export type SearchProductsQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchProductsQuery = { __typename?: 'Query', crm?: { __typename?: 'CrmQuery', products: Array<{ __typename?: 'Products', value: string, label: string }> } | null };

export type CreateCustomerTrackingLinkMutationVariables = Exact<{
  customerTrackingLink: CreateCustomerTrackingLinkInput;
}>;


export type CreateCustomerTrackingLinkMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', createCustomerTrackingLink: { __typename?: 'CustomerTrackingLinks', id: string } } | null };

export type UpdateCustomerTrackingLinkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  customerTrackingLink: UpdateCustomerTrackingLinkInput;
}>;


export type UpdateCustomerTrackingLinkMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', updateCustomerTrackingLink: { __typename?: 'CustomerTrackingLinks', id: string } } | null };

export type RemoveCustomerTrackingLinkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCustomerTrackingLinkMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', removeCustomerTrackingLink: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableCustomerTrackingLinkQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableCustomerTrackingLinkQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', customerTrackingLinks: Array<{ __typename?: 'CustomerTrackingLinks', accessCount?: number | null, createdAt?: string | null, expiresAt?: string | null, id: string, isActive?: boolean | null, lastAccessedAt?: string | null, trackingToken: string, updatedAt?: string | null }> } | null };

export type SearchCustomerTrackingLinksQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchCustomerTrackingLinksQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', customerTrackingLinks: Array<{ __typename?: 'CustomerTrackingLinks', value: string, label: string }> } | null };

export type CreateDeliveryRouteMutationVariables = Exact<{
  deliveryRoute: CreateDeliveryRouteInput;
}>;


export type CreateDeliveryRouteMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', createDeliveryRoute: { __typename?: 'DeliveryRoutes', id: string } } | null };

export type UpdateDeliveryRouteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  deliveryRoute: UpdateDeliveryRouteInput;
}>;


export type UpdateDeliveryRouteMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', updateDeliveryRoute: { __typename?: 'DeliveryRoutes', id: string } } | null };

export type RemoveDeliveryRouteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveDeliveryRouteMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', removeDeliveryRoute: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableDeliveryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DeliveryRouteStatus>;
}>;


export type TableDeliveryQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', deliveryRoutes: Array<{ __typename?: 'DeliveryRoutes', actualDurationMinutes?: number | null, completedAt?: string | null, createdAt?: string | null, estimatedDurationMinutes?: number | null, id: string, optimizedRouteData?: string | null, routeDate: string, startedAt?: string | null, status?: DeliveryRouteStatus | null, totalDistanceKm?: number | null, updatedAt?: string | null, driver: { __typename?: 'Drivers', id: string, status?: DriverStatus | null, licenseNumber: string, contactPhone?: string | null, user: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } } }> } | null };

export type SearchDeliveryRoutesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchDeliveryRoutesQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', deliveryRoutes: Array<{ __typename?: 'DeliveryRoutes', value: string, label: string }> } | null };

export type CreateDeliveryTaskMutationVariables = Exact<{
  deliveryTask: CreateDeliveryTaskInput;
}>;


export type CreateDeliveryTaskMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', createDeliveryTask: { __typename?: 'DeliveryTasks', id: string } } | null };

export type UpdateDeliveryTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  deliveryTask: UpdateDeliveryTaskInput;
}>;


export type UpdateDeliveryTaskMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', updateDeliveryTask: { __typename?: 'DeliveryTasks', id: string } } | null };

export type RemoveDeliveryTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveDeliveryTaskMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', removeDeliveryTask: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableDeliveryTaskQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DeliveryTaskStatus>;
  failureReason?: InputMaybe<DeliveryFailureReason>;
}>;


export type TableDeliveryTaskQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', deliveryTasks: Array<{ __typename?: 'DeliveryTasks', actualArrivalTime?: string | null, attemptCount?: number | null, createdAt?: string | null, deliveryAddress: string, deliveryInstructions?: string | null, deliveryTime?: string | null, estimatedArrivalTime?: string | null, failureReason?: DeliveryFailureReason | null, id: string, recipientName?: string | null, recipientPhone?: string | null, routeSequence: number, status?: DeliveryTaskStatus | null, updatedAt?: string | null, deliveryRoute: { __typename?: 'DeliveryRoutes', id: string, totalDistanceKm?: number | null, optimizedRouteData?: string | null, status?: DeliveryRouteStatus | null, driver: { __typename?: 'Drivers', id: string, licenseNumber: string, status?: DriverStatus | null, contactPhone?: string | null, user: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } } }, package: { __typename?: 'Packages', id: string, carrier?: string | null, packageNumber: string, trackingNumber?: string | null, warehouse: { __typename?: 'Warehouses', id: string, address?: string | null, country?: string | null } } }> } | null };

export type SearchDeliveryTasksQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchDeliveryTasksQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', deliveryTasks: Array<{ __typename?: 'DeliveryTasks', value: string, label?: string | null }> } | null };

export type CreateDriverLocationMutationVariables = Exact<{
  driverLocation: CreateDriverLocationInput;
}>;


export type CreateDriverLocationMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', createDriverLocation: { __typename?: 'DriverLocations', id: string } } | null };

export type UpdateDriverLocationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  driverLocation: UpdateDriverLocationInput;
}>;


export type UpdateDriverLocationMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', updateDriverLocation: { __typename?: 'DriverLocations', id: string } } | null };

export type RemoveDriverLocationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveDriverLocationMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', removeDriverLocation: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableDriverLocationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TableDriverLocationQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', driverLocations: Array<{ __typename?: 'DriverLocations', accuracy?: number | null, altitude?: number | null, createdAt?: string | null, heading?: number | null, id: string, latitude: number, longitude: number, speedKmh?: number | null, timestamp?: string | null, updatedAt?: string | null, driver: { __typename?: 'Drivers', id: string, contactPhone?: string | null, licenseExpiryDate?: string | null, licenseNumber: string, user: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } } }> } | null };

export type CreateDmsProofOfDeliveryMutationVariables = Exact<{
  dmsProofOfDelivery: CreateDmsProofOfDeliveryInput;
}>;


export type CreateDmsProofOfDeliveryMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', createDmsProofOfDelivery: { __typename?: 'DmsProofOfDeliveries', id: string } } | null };

export type UpdateDmsProofOfDeliveryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  dmsProofOfDelivery: UpdateDmsProofOfDeliveryInput;
}>;


export type UpdateDmsProofOfDeliveryMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', updateDmsProofOfDelivery: { __typename?: 'DmsProofOfDeliveries', id: string } } | null };

export type RemoveDmsProofOfDeliveryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveDmsProofOfDeliveryMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', removeDmsProofOfDelivery: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableProofOfDeliveryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProofOfDeliveryType>;
}>;


export type TableProofOfDeliveryQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', dmsProofOfDeliveries: Array<{ __typename?: 'DmsProofOfDeliveries', createdAt?: string | null, filePath?: string | null, id: string, latitude?: number | null, longitude?: number | null, recipientName?: string | null, signatureData?: string | null, timestamp?: string | null, type: ProofOfDeliveryType, updatedAt?: string | null, verificationCode?: string | null, deliveryTask: { __typename?: 'DeliveryTasks', actualArrivalTime?: string | null, deliveryInstructions?: string | null, deliveryAddress: string, failureReason?: DeliveryFailureReason | null, recipientName?: string | null, recipientPhone?: string | null, status?: DeliveryTaskStatus | null, package: { __typename?: 'Packages', id: string, packageNumber: string, packageType?: string | null, requiresSignature?: boolean | null, trackingNumber?: string | null, warehouse: { __typename?: 'Warehouses', id: string, address?: string | null, city?: string | null, country?: string | null } } } }> } | null };

export type SearchDmsProofOfDeliveriesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchDmsProofOfDeliveriesQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', dmsProofOfDeliveries: Array<{ __typename?: 'DmsProofOfDeliveries', value: string, label?: string | null }> } | null };

export type CreateTaskEventMutationVariables = Exact<{
  taskEvent: CreateTaskEventInput;
}>;


export type CreateTaskEventMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', createTaskEvent: { __typename?: 'TaskEvents', id: string } } | null };

export type UpdateTaskEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  taskEvent: UpdateTaskEventInput;
}>;


export type UpdateTaskEventMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', updateTaskEvent: { __typename?: 'TaskEvents', id: string } } | null };

export type RemoveTaskEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveTaskEventMutation = { __typename?: 'Mutation', dms?: { __typename?: 'DmsMutation', removeTaskEvent: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableTaskEventQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskEventStatus>;
}>;


export type TableTaskEventQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', taskEvents: Array<{ __typename?: 'TaskEvents', createdAt?: string | null, id: string, latitude?: number | null, longitude?: number | null, notes?: string | null, reason?: string | null, status: TaskEventStatus, timestamp?: string | null, updatedAt?: string | null, deliveryTask: { __typename?: 'DeliveryTasks', id: string, recipientName?: string | null, recipientPhone?: string | null, deliveryInstructions?: string | null, deliveryAddress: string, status?: DeliveryTaskStatus | null, package: { __typename?: 'Packages', id: string, trackingNumber?: string | null, packageNumber: string, packageType?: string | null } } }> } | null };

export type SearchTaskEventsQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchTaskEventsQuery = { __typename?: 'Query', dms?: { __typename?: 'DmsQuery', taskEvents: Array<{ __typename?: 'TaskEvents', value: string, label?: string | null }> } | null };

export type CreateCarrierRateMutationVariables = Exact<{
  carrierRate: CreateCarrierRateInput;
}>;


export type CreateCarrierRateMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createCarrierRate: { __typename?: 'CarrierRates', id: string } } | null };

export type UpdateCarrierRateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  carrierRate: UpdateCarrierRateInput;
}>;


export type UpdateCarrierRateMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateCarrierRate: { __typename?: 'CarrierRates', id: string } } | null };

export type RemoveCarrierRateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCarrierRateMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeCarrierRate: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateCarrierMutationVariables = Exact<{
  carrier: CreateCarrierInput;
}>;


export type CreateCarrierMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createCarrier: { __typename?: 'Carriers', id: string } } | null };

export type UpdateCarrierMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  carrier: UpdateCarrierInput;
}>;


export type UpdateCarrierMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateCarrier: { __typename?: 'Carriers', id: string } } | null };

export type RemoveCarrierMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCarrierMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeCarrier: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableCarrierQueryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableCarrierQueryQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', carriers: Array<{ __typename?: 'Carriers', contactEmail?: string | null, contactPerson?: string | null, contactPhone?: string | null, createdAt?: string | null, id: string, name: string, servicesOffered?: string | null, updatedAt?: string | null, partnerInvoices?: Array<{ __typename?: 'PartnerInvoices', invoiceNumber: string, invoiceDate: string, status?: PartnerInvoiceStatus | null, totalAmount: number, items?: Array<{ __typename?: 'PartnerInvoiceItems', amount: number, id: string, shipmentLeg: { __typename?: 'ShipmentLegs', status?: ShipmentLegStatus | null, shipment?: { __typename?: 'OutboundShipments', trackingNumber?: string | null, carrier?: string | null, createdAt?: string | null, id: string, status?: OutboundShipmentStatus | null, warehouseId: string } | null } }> | null }> | null, rates?: Array<{ __typename?: 'CarrierRates', destination?: string | null, id: string, origin?: string | null, rate: number, serviceType?: string | null, unit?: CarrierRateUnit | null }> | null }> } | null };

export type SearchCarriersQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchCarriersQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', carriers: Array<{ __typename?: 'Carriers', value: string, label: string }> } | null };

export type CreateDriverScheduleMutationVariables = Exact<{
  driverSchedule: CreateDriverScheduleInput;
}>;


export type CreateDriverScheduleMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createDriverSchedule: { __typename?: 'DriverSchedules', id: string } } | null };

export type UpdateDriverScheduleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  driverSchedule: UpdateDriverScheduleInput;
}>;


export type UpdateDriverScheduleMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateDriverSchedule: { __typename?: 'DriverSchedules', id: string } } | null };

export type RemoveDriverScheduleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveDriverScheduleMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeDriverSchedule: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateDriverMutationVariables = Exact<{
  driver: CreateDriverInput;
}>;


export type CreateDriverMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createDriver: { __typename?: 'Drivers', id: string } } | null };

export type UpdateDriverMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  driver: UpdateDriverInput;
}>;


export type UpdateDriverMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateDriver: { __typename?: 'Drivers', id: string } } | null };

export type RemoveDriverMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveDriverMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeDriver: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableDriverQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DriverStatus>;
}>;


export type TableDriverQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', drivers: Array<{ __typename?: 'Drivers', contactPhone?: string | null, createdAt?: string | null, id: string, licenseExpiryDate?: string | null, licenseNumber: string, status?: DriverStatus | null, updatedAt?: string | null, user: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } }> } | null };

export type SearchDriversQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchDriversQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', drivers: Array<{ __typename?: 'Drivers', value: string, label: string }> } | null };

export type CreateExpenseMutationVariables = Exact<{
  expense: CreateExpenseInput;
}>;


export type CreateExpenseMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createExpense: { __typename?: 'Expenses', id: string } } | null };

export type UpdateExpenseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  expense: UpdateExpenseInput;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateExpense: { __typename?: 'Expenses', id: string } } | null };

export type RemoveExpenseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveExpenseMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeExpense: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableExpenseQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatus>;
  type?: InputMaybe<ExpenseType>;
  currency?: InputMaybe<Currency>;
}>;


export type TableExpenseQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', expenses: Array<{ __typename?: 'Expenses', amount: number, createdAt?: string | null, currency?: Currency | null, description?: string | null, expenseDate?: string | null, fuelQuantity?: number | null, id: string, odometerReading?: number | null, receiptUrl?: string | null, status?: ExpenseStatus | null, type?: ExpenseType | null, updatedAt?: string | null, driver?: { __typename?: 'Drivers', licenseNumber: string, contactPhone?: string | null, status?: DriverStatus | null, user: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } } | null, trip?: { __typename?: 'Trips', createdAt?: string | null, endLocation?: string | null, startLocation?: string | null, status?: TripStatus | null, startTime?: string | null, endTime?: string | null, vehicle?: { __typename?: 'Vehicles', vin?: string | null, year?: number | null, model?: string | null, make?: string | null, id: string, registrationNumber: string } | null } | null }> } | null };

export type SearchExpensesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchExpensesQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', expenses: Array<{ __typename?: 'Expenses', value: string, label?: string | null }> } | null };

export type CreateGeofenceEventMutationVariables = Exact<{
  geofenceEvent: CreateGeofenceEventInput;
}>;


export type CreateGeofenceEventMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createGeofenceEvent: { __typename?: 'GeofenceEvents', id: string } } | null };

export type UpdateGeofenceEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  geofenceEvent: UpdateGeofenceEventInput;
}>;


export type UpdateGeofenceEventMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateGeofenceEvent: { __typename?: 'GeofenceEvents', id: string } } | null };

export type RemoveGeofenceEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveGeofenceEventMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeGeofenceEvent: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateGeofenceMutationVariables = Exact<{
  geofence: CreateGeofenceInput;
}>;


export type CreateGeofenceMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createGeofence: { __typename?: 'Geofences', id: string } } | null };

export type UpdateGeofenceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  geofence: UpdateGeofenceInput;
}>;


export type UpdateGeofenceMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateGeofence: { __typename?: 'Geofences', id: string } } | null };

export type RemoveGeofenceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveGeofenceMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeGeofence: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableGeofenceQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableGeofenceQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', geofences: Array<{ __typename?: 'Geofences', createdAt?: string | null, id: string, latitude?: number | null, longitude?: number | null, name: string, updatedAt?: string | null, events?: Array<{ __typename?: 'GeofenceEvents', eventType: GeofenceEventType, id: string, timestamp: string, vehicle: { __typename?: 'Vehicles', model?: string | null, vin?: string | null, year?: number | null, registrationNumber: string, make?: string | null, id: string } }> | null }> } | null };

export type SearchGeofencesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchGeofencesQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', geofences: Array<{ __typename?: 'Geofences', value: string, label: string }> } | null };

export type CreateGpsPingMutationVariables = Exact<{
  gpsPing: CreateGpsPingInput;
}>;


export type CreateGpsPingMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createGpsPing: { __typename?: 'GpsPings', id: string } } | null };

export type UpdateGpsPingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  gpsPing: UpdateGpsPingInput;
}>;


export type UpdateGpsPingMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateGpsPing: { __typename?: 'GpsPings', id: string } } | null };

export type RemoveGpsPingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveGpsPingMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeGpsPing: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableGpsPingQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TableGpsPingQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', gpsPings: Array<{ __typename?: 'GpsPings', id: string, latitude: number, longitude: number, timestamp: string, vehicle: { __typename?: 'Vehicles', year?: number | null, vin?: string | null, registrationNumber: string, model?: string | null, make?: string | null, status?: VehicleStatus | null, id: string } }> } | null };

export type CreatePartnerInvoiceItemMutationVariables = Exact<{
  partnerInvoiceItem: CreatePartnerInvoiceItemInput;
}>;


export type CreatePartnerInvoiceItemMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createPartnerInvoiceItem: { __typename?: 'PartnerInvoiceItems', id: string } } | null };

export type UpdatePartnerInvoiceItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  partnerInvoiceItem: UpdatePartnerInvoiceItemInput;
}>;


export type UpdatePartnerInvoiceItemMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updatePartnerInvoiceItem: { __typename?: 'PartnerInvoiceItems', id: string } } | null };

export type RemovePartnerInvoiceItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemovePartnerInvoiceItemMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removePartnerInvoiceItem: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreatePartnerInvoiceMutationVariables = Exact<{
  partnerInvoice: CreatePartnerInvoiceInput;
}>;


export type CreatePartnerInvoiceMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createPartnerInvoice: { __typename?: 'PartnerInvoices', id: string } } | null };

export type UpdatePartnerInvoiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  partnerInvoice: UpdatePartnerInvoiceInput;
}>;


export type UpdatePartnerInvoiceMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updatePartnerInvoice: { __typename?: 'PartnerInvoices', id: string } } | null };

export type RemovePartnerInvoiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemovePartnerInvoiceMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removePartnerInvoice: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TablePartnerInvoiceQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PartnerInvoiceStatus>;
}>;


export type TablePartnerInvoiceQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', partnerInvoices: Array<{ __typename?: 'PartnerInvoices', createdAt?: string | null, id: string, invoiceDate: string, invoiceNumber: string, status?: PartnerInvoiceStatus | null, totalAmount: number, updatedAt?: string | null, items?: Array<{ __typename?: 'PartnerInvoiceItems', amount: number, id: string, shipmentLeg: { __typename?: 'ShipmentLegs', startLocation?: string | null, endLocation?: string | null, shipment?: { __typename?: 'OutboundShipments', trackingNumber?: string | null, carrier?: string | null } | null } }> | null }> } | null };

export type SearchPartnerInvoicesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchPartnerInvoicesQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', partnerInvoices: Array<{ __typename?: 'PartnerInvoices', value: string, label: string }> } | null };

export type CreateProofOfDeliveryMutationVariables = Exact<{
  proofOfDelivery: CreateProofOfDeliveryInput;
}>;


export type CreateProofOfDeliveryMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createProofOfDelivery: { __typename?: 'ProofOfDeliveries', id: string } } | null };

export type UpdateProofOfDeliveryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  proofOfDelivery: UpdateProofOfDeliveryInput;
}>;


export type UpdateProofOfDeliveryMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateProofOfDelivery: { __typename?: 'ProofOfDeliveries', id: string } } | null };

export type RemoveProofOfDeliveryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveProofOfDeliveryMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeProofOfDelivery: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableTmsProofOfDeliveryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProofType>;
}>;


export type TableTmsProofOfDeliveryQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', proofOfDeliveries: Array<{ __typename?: 'ProofOfDeliveries', createdAt?: string | null, filePath?: string | null, id: string, latitude?: number | null, longitude?: number | null, timestamp: string, type?: ProofType | null, updatedAt?: string | null, tripStop: { __typename?: 'TripStops', actualArrivalTime?: string | null, actualDepartureTime?: string | null, address?: string | null, status?: TripStopStatus | null, id: string, shipment?: { __typename?: 'OutboundShipments', trackingNumber?: string | null, status?: OutboundShipmentStatus | null, carrier?: string | null, id: string } | null, trip: { __typename?: 'Trips', endLocation?: string | null, startLocation?: string | null, status?: TripStatus | null, vehicle?: { __typename?: 'Vehicles', registrationNumber: string, vin?: string | null, year?: number | null, make?: string | null, model?: string | null, gpsPings?: Array<{ __typename?: 'GpsPings', latitude: number, longitude: number, timestamp: string, id: string }> | null } | null } } }> } | null };

export type SearchProofOfDeliveriesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchProofOfDeliveriesQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', proofOfDeliveries: Array<{ __typename?: 'ProofOfDeliveries', value: string, label?: string | null }> } | null };

export type CreateRouteMutationVariables = Exact<{
  route: CreateRouteInput;
}>;


export type CreateRouteMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createRoute: { __typename?: 'Routes', id: string } } | null };

export type UpdateRouteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  route: UpdateRouteInput;
}>;


export type UpdateRouteMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateRoute: { __typename?: 'Routes', id: string } } | null };

export type RemoveRouteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveRouteMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeRoute: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableRouteQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableRouteQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', routes: Array<{ __typename?: 'Routes', optimizedRouteData?: string | null, totalDistance?: number | null, totalDuration?: number | null, id: string, trip: { __typename?: 'Trips', startLocation?: string | null, endTime?: string | null, endLocation?: string | null, createdAt?: string | null, startTime?: string | null, status?: TripStatus | null, updatedAt?: string | null, driver?: { __typename?: 'Drivers', licenseNumber: string, contactPhone?: string | null, id: string, user: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } } | null } }> } | null };

export type CreateShipmentLegEventMutationVariables = Exact<{
  shipmentLegEvent: CreateShipmentLegEventInput;
}>;


export type CreateShipmentLegEventMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createShipmentLegEvent: { __typename?: 'ShipmentLegEvents', id: string } } | null };

export type UpdateShipmentLegEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  shipmentLegEvent: UpdateShipmentLegEventInput;
}>;


export type UpdateShipmentLegEventMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateShipmentLegEvent: { __typename?: 'ShipmentLegEvents', id: string } } | null };

export type RemoveShipmentLegEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveShipmentLegEventMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeShipmentLegEvent: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateShipmentLegMutationVariables = Exact<{
  shipmentLeg: CreateShipmentLegInput;
}>;


export type CreateShipmentLegMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createShipmentLeg: { __typename?: 'ShipmentLegs', id: string } } | null };

export type UpdateShipmentLegMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  shipmentLeg: UpdateShipmentLegInput;
}>;


export type UpdateShipmentLegMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateShipmentLeg: { __typename?: 'ShipmentLegs', id: string } } | null };

export type RemoveShipmentLegMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveShipmentLegMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeShipmentLeg: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableShipmentLegQueryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatus>;
}>;


export type TableShipmentLegQueryQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', shipmentLegs: Array<{ __typename?: 'ShipmentLegs', createdAt?: string | null, endLocation?: string | null, id: string, legSequence: number, startLocation?: string | null, status?: ShipmentLegStatus | null, updatedAt?: string | null, shipment?: { __typename?: 'OutboundShipments', trackingNumber?: string | null, carrier?: string | null, status?: OutboundShipmentStatus | null } | null, partnerInvoiceItems?: Array<{ __typename?: 'PartnerInvoiceItems', amount: number, id: string }> | null, events?: Array<{ __typename?: 'ShipmentLegEvents', location?: string | null, statusMessage?: string | null, eventTimestamp: string, id: string }> | null }> } | null };

export type SearchShipmentLegsQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchShipmentLegsQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', shipmentLegs: Array<{ __typename?: 'ShipmentLegs', value: string, label?: string | null }> } | null };

export type CreateTripStopMutationVariables = Exact<{
  tripStop: CreateTripStopInput;
}>;


export type CreateTripStopMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createTripStop: { __typename?: 'TripStops', id: string } } | null };

export type UpdateTripStopMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  tripStop: UpdateTripStopInput;
}>;


export type UpdateTripStopMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateTripStop: { __typename?: 'TripStops', id: string } } | null };

export type RemoveTripStopMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveTripStopMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeTripStop: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateTripMutationVariables = Exact<{
  trip: CreateTripInput;
}>;


export type CreateTripMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createTrip: { __typename?: 'Trips', id: string } } | null };

export type UpdateTripMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  trip: UpdateTripInput;
}>;


export type UpdateTripMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateTrip: { __typename?: 'Trips', id: string } } | null };

export type RemoveTripMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveTripMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeTrip: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableTripQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TripStatus>;
}>;


export type TableTripQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', trips: Array<{ __typename?: 'Trips', createdAt?: string | null, endLocation?: string | null, endTime?: string | null, id: string, startLocation?: string | null, startTime?: string | null, status?: TripStatus | null, updatedAt?: string | null, driver?: { __typename?: 'Drivers', licenseNumber: string, contactPhone?: string | null, status?: DriverStatus | null, user: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } } | null, vehicle?: { __typename?: 'Vehicles', vin?: string | null, year?: number | null, registrationNumber: string, model?: string | null, make?: string | null, status?: VehicleStatus | null } | null }> } | null };

export type SearchTripsQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchTripsQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', trips: Array<{ __typename?: 'Trips', value: string, label?: string | null }> } | null };

export type CreateVehicleMaintenanceMutationVariables = Exact<{
  vehicleMaintenance: CreateVehicleMaintenanceInput;
}>;


export type CreateVehicleMaintenanceMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createVehicleMaintenance: { __typename?: 'VehicleMaintenance', id: string } } | null };

export type UpdateVehicleMaintenanceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  vehicleMaintenance: UpdateVehicleMaintenanceInput;
}>;


export type UpdateVehicleMaintenanceMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateVehicleMaintenance: { __typename?: 'VehicleMaintenance', id: string } } | null };

export type RemoveVehicleMaintenanceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveVehicleMaintenanceMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeVehicleMaintenance: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateVehicleMutationVariables = Exact<{
  vehicle: CreateVehicleInput;
}>;


export type CreateVehicleMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', createVehicle: { __typename?: 'Vehicles', id: string } } | null };

export type UpdateVehicleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  vehicle: UpdateVehicleInput;
}>;


export type UpdateVehicleMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', updateVehicle: { __typename?: 'Vehicles', id: string } } | null };

export type RemoveVehicleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveVehicleMutation = { __typename?: 'Mutation', tms?: { __typename?: 'TmsMutation', removeVehicle: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableVehicleQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<VehicleStatus>;
}>;


export type TableVehicleQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', vehicles: Array<{ __typename?: 'Vehicles', capacityVolume?: number | null, capacityWeight?: number | null, createdAt?: string | null, currentMileage?: number | null, id: string, lastMaintenanceDate?: string | null, make?: string | null, model?: string | null, registrationNumber: string, status?: VehicleStatus | null, updatedAt?: string | null, vin?: string | null, year?: number | null, maintenances?: Array<{ __typename?: 'VehicleMaintenance', cost?: number | null, createdAt?: string | null, id: string, notes?: string | null, serviceDate: string, serviceType?: VehicleServiceType | null, updatedAt?: string | null }> | null }> } | null };

export type SearchVehiclesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchVehiclesQuery = { __typename?: 'Query', tms?: { __typename?: 'TmsQuery', vehicles: Array<{ __typename?: 'Vehicles', value: string, label: string }> } | null };

export type CreateBinThresholdMutationVariables = Exact<{
  binThreshold: CreateBinThresholdInput;
}>;


export type CreateBinThresholdMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createBinThreshold: { __typename?: 'BinThresholds', id: string } } | null };

export type UpdateBinThresholdMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  binThreshold: UpdateBinThresholdInput;
}>;


export type UpdateBinThresholdMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateBinThreshold: { __typename?: 'BinThresholds', id: string } } | null };

export type RemoveBinThresholdMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveBinThresholdMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeBinThreshold: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableBinThresholdQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TableBinThresholdQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', binThresholds: Array<{ __typename?: 'BinThresholds', alertThreshold?: number | null, createdAt?: string | null, id: string, isActive?: boolean | null, maxQuantity: number, minQuantity: number, reorderQuantity?: number | null, updatedAt?: string | null, product: { __typename?: 'WmsProducts', name: string, description?: string | null, id: string, sku: string, status?: ProductStatus | null, barcode?: string | null } }> } | null };

export type CreateInboundShipmentItemMutationVariables = Exact<{
  inboundShipmentItem: CreateInboundShipmentItemInput;
}>;


export type CreateInboundShipmentItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createInboundShipmentItem: { __typename?: 'InboundShipmentItems', id: string } } | null };

export type UpdateInboundShipmentItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  inboundShipmentItem: UpdateInboundShipmentItemInput;
}>;


export type UpdateInboundShipmentItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateInboundShipmentItem: { __typename?: 'InboundShipmentItems', id: string } } | null };

export type RemoveInboundShipmentItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveInboundShipmentItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeInboundShipmentItem: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateInboundShipmentMutationVariables = Exact<{
  inboundShipment: CreateInboundShipmentInput;
}>;


export type CreateInboundShipmentMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createInboundShipment: { __typename?: 'InboundShipments', id: string } } | null };

export type UpdateInboundShipmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  inboundShipment: UpdateInboundShipmentInput;
}>;


export type UpdateInboundShipmentMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateInboundShipment: { __typename?: 'InboundShipments', id: string } } | null };

export type RemoveInboundShipmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveInboundShipmentMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeInboundShipment: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableInboundShipmentQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InboundShipmentStatus>;
}>;


export type TableInboundShipmentQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', inboundShipments: Array<{ __typename?: 'InboundShipments', actualArrivalDate?: string | null, createdAt?: string | null, expectedArrivalDate?: string | null, id: string, status?: InboundShipmentStatus | null, updatedAt?: string | null, client?: { __typename?: 'Companies', name: string, industry?: string | null, phoneNumber?: string | null, country?: string | null, website?: string | null } | null }> } | null };

export type CreateInventoryAdjustmentMutationVariables = Exact<{
  inventoryAdjustment: CreateInventoryAdjustmentInput;
}>;


export type CreateInventoryAdjustmentMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createInventoryAdjustment: { __typename?: 'InventoryAdjustments', id: string } } | null };

export type UpdateInventoryAdjustmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  inventoryAdjustment: UpdateInventoryAdjustmentInput;
}>;


export type UpdateInventoryAdjustmentMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateInventoryAdjustment: { __typename?: 'InventoryAdjustments', id: string } } | null };

export type RemoveInventoryAdjustmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveInventoryAdjustmentMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeInventoryAdjustment: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableInventoryAdjustmentQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<InventoryAdjustmentReason>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableInventoryAdjustmentQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', inventoryAdjustments: Array<{ __typename?: 'InventoryAdjustments', createdAt?: string | null, id: string, notes?: string | null, quantityChange: number, reason?: InventoryAdjustmentReason | null, updatedAt?: string | null, warehouseId: string, user: { __typename?: 'User', email: string, id: string, image?: string | null, name: string }, product: { __typename?: 'WmsProducts', barcode?: string | null, description?: string | null, id: string, name: string, sku: string, status?: ProductStatus | null } }> } | null };

export type SearchInventoryAdjustmentsQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type SearchInventoryAdjustmentsQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', inventoryAdjustments: Array<{ __typename?: 'InventoryAdjustments', value: string, label?: string | null }> } | null };

export type CreateInventoryBatchMutationVariables = Exact<{
  inventoryBatch: CreateInventoryBatchInput;
}>;


export type CreateInventoryBatchMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createInventoryBatch: { __typename?: 'InventoryBatches', id: string } } | null };

export type UpdateInventoryBatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  inventoryBatch: UpdateInventoryBatchInput;
}>;


export type UpdateInventoryBatchMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateInventoryBatch: { __typename?: 'InventoryBatches', id: string } } | null };

export type RemoveInventoryBatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveInventoryBatchMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeInventoryBatch: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableInventoryBatchQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableInventoryBatchQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', inventoryBatches: Array<{ __typename?: 'InventoryBatches', batchNumber: string, createdAt?: string | null, expirationDate?: string | null, id: string, updatedAt?: string | null, inventoryStock?: Array<{ __typename?: 'InventoryStock', availableQuantity?: number | null, quantity: number, reservedQuantity: number, status?: InventoryStockStatus | null, product: { __typename?: 'WmsProducts', barcode?: string | null, name: string, sku: string, status?: ProductStatus | null, description?: string | null, id: string, costPrice?: number | null } }> | null }> } | null };

export type CreateInventoryStockMutationVariables = Exact<{
  inventoryStock: CreateInventoryStockInput;
}>;


export type CreateInventoryStockMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createInventoryStock: { __typename?: 'InventoryStock', id: string } } | null };

export type UpdateInventoryStockMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  inventoryStock: UpdateInventoryStockInput;
}>;


export type UpdateInventoryStockMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateInventoryStock: { __typename?: 'InventoryStock', id: string } } | null };

export type RemoveInventoryStockMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveInventoryStockMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeInventoryStock: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableInventoryStockQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InventoryStockStatus>;
}>;


export type TableInventoryStockQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', inventoryStocks: Array<{ __typename?: 'InventoryStock', availableQuantity?: number | null, createdAt?: string | null, id: string, lastCountedAt?: string | null, lastMovementAt?: string | null, quantity: number, reservedQuantity: number, status?: InventoryStockStatus | null, updatedAt?: string | null, product: { __typename?: 'WmsProducts', barcode?: string | null, costPrice?: number | null, description?: string | null, id: string, name: string, status?: ProductStatus | null, sku: string, volume?: number | null, weight?: number | null, width?: number | null }, location: { __typename?: 'Locations', id: string, barcode?: string | null, isActive?: boolean | null, isPickable?: boolean | null, isReceivable?: boolean | null, level?: number | null, name: string } }> } | null };

export type CreateLocationMutationVariables = Exact<{
  location: CreateLocationInput;
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createLocation: { __typename?: 'Locations', id: string } } | null };

export type UpdateLocationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  location: UpdateLocationInput;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateLocation: { __typename?: 'Locations', id: string } } | null };

export type RemoveLocationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveLocationMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeLocation: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableLocationQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<LocationType>;
}>;


export type TableLocationQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', locations: Array<{ __typename?: 'Locations', barcode?: string | null, createdAt?: string | null, isActive?: boolean | null, isPickable?: boolean | null, isReceivable?: boolean | null, id: string, hazmatApproved?: boolean | null, level?: number | null, maxPallets?: number | null, maxVolume?: number | null, maxWeight?: number | null, name: string, path?: string | null, temperatureControlled?: boolean | null, type: LocationType, updatedAt?: string | null, xCoordinate?: number | null, yCoordinate?: number | null, zCoordinate?: number | null, parentLocation?: { __typename?: 'Locations', id: string, name: string, path?: string | null } | null, warehouse: { __typename?: 'Warehouses', address?: string | null, city?: string | null, name: string, id: string, isActive?: boolean | null } }> } | null };

export type CreateOutboundShipmentItemMutationVariables = Exact<{
  outboundShipmentItem: CreateOutboundShipmentItemInput;
}>;


export type CreateOutboundShipmentItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createOutboundShipmentItem: { __typename?: 'OutboundShipmentItems', id: string } } | null };

export type UpdateOutboundShipmentItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  outboundShipmentItem: UpdateOutboundShipmentItemInput;
}>;


export type UpdateOutboundShipmentItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateOutboundShipmentItem: { __typename?: 'OutboundShipmentItems', id: string } } | null };

export type RemoveOutboundShipmentItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveOutboundShipmentItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeOutboundShipmentItem: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateOutboundShipmentMutationVariables = Exact<{
  outboundShipment: CreateOutboundShipmentInput;
}>;


export type CreateOutboundShipmentMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createOutboundShipment: { __typename?: 'OutboundShipments', id: string } } | null };

export type UpdateOutboundShipmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  outboundShipment: UpdateOutboundShipmentInput;
}>;


export type UpdateOutboundShipmentMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateOutboundShipment: { __typename?: 'OutboundShipments', id: string } } | null };

export type RemoveOutboundShipmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveOutboundShipmentMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeOutboundShipment: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableOutboundShipmentQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OutboundShipmentStatus>;
}>;


export type TableOutboundShipmentQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', outboundShipments: Array<{ __typename?: 'OutboundShipments', carrier?: string | null, createdAt?: string | null, id: string, status?: OutboundShipmentStatus | null, trackingNumber?: string | null, updatedAt?: string | null, warehouseId: string, salesOrder: { __typename?: 'SalesOrders', id: string, orderNumber: string, shippingAddress?: string | null, status?: SalesOrderStatus | null } }> } | null };

export type CreatePackageItemMutationVariables = Exact<{
  packageItem: CreatePackageItemInput;
}>;


export type CreatePackageItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createPackageItem: { __typename?: 'PackageItems', id: string } } | null };

export type UpdatePackageItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  packageItem: UpdatePackageItemInput;
}>;


export type UpdatePackageItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updatePackageItem: { __typename?: 'PackageItems', id: string } } | null };

export type RemovePackageItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemovePackageItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removePackageItem: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreatePackageMutationVariables = Exact<{
  package: CreatePackageInput;
}>;


export type CreatePackageMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createPackage: { __typename?: 'Packages', id: string } } | null };

export type UpdatePackageMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  package: UpdatePackageInput;
}>;


export type UpdatePackageMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updatePackage: { __typename?: 'Packages', id: string } } | null };

export type RemovePackageMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemovePackageMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removePackage: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TablePackageQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TablePackageQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', packages: Array<{ __typename?: 'Packages', carrier?: string | null, createdAt?: string | null, height?: number | null, id: string, insuranceValue?: number | null, isFragile?: boolean | null, isHazmat?: boolean | null, length?: number | null, packageNumber: string, packageType?: string | null, packedAt?: string | null, requiresSignature?: boolean | null, serviceLevel?: string | null, shippedAt?: string | null, trackingNumber?: string | null, updatedAt?: string | null, volume?: number | null, weight?: number | null, width?: number | null, items?: Array<{ __typename?: 'PackageItems', lotNumber?: string | null, quantity: number, serialNumbers?: Array<string | null> | null, totalWeight?: number | null, unitWeight?: number | null, product: { __typename?: 'WmsProducts', barcode?: string | null, costPrice?: number | null, name: string, sku: string, status?: ProductStatus | null } }> | null }> } | null };

export type CreatePickBatchItemMutationVariables = Exact<{
  pickBatchItem: CreatePickBatchItemInput;
}>;


export type CreatePickBatchItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createPickBatchItem: { __typename?: 'PickBatchItems', id: string } } | null };

export type UpdatePickBatchItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  pickBatchItem: UpdatePickBatchItemInput;
}>;


export type UpdatePickBatchItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updatePickBatchItem: { __typename?: 'PickBatchItems', id: string } } | null };

export type RemovePickBatchItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemovePickBatchItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removePickBatchItem: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreatePickBatchMutationVariables = Exact<{
  pickBatch: CreatePickBatchInput;
}>;


export type CreatePickBatchMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createPickBatch: { __typename?: 'PickBatches', id: string } } | null };

export type UpdatePickBatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  pickBatch: UpdatePickBatchInput;
}>;


export type UpdatePickBatchMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updatePickBatch: { __typename?: 'PickBatches', id: string } } | null };

export type RemovePickBatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemovePickBatchMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removePickBatch: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TablePickBatchQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PickBatchStatus>;
  strategy?: InputMaybe<PickStrategy>;
}>;


export type TablePickBatchQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', pickBatches: Array<{ __typename?: 'PickBatches', actualDuration?: number | null, batchNumber: string, completedAt?: string | null, completedItems?: number | null, createdAt?: string | null, estimatedDuration?: number | null, id: string, priority?: number | null, startedAt?: string | null, status?: PickBatchStatus | null, strategy: PickStrategy, totalItems?: number | null, updatedAt?: string | null, waveId?: string | null, zoneRestrictions?: Array<string | null> | null, items?: Array<{ __typename?: 'PickBatchItems', id: string, estimatedPickTime?: number | null, actualPickTime?: number | null, orderPriority?: number | null, salesOrder: { __typename?: 'SalesOrders', status?: SalesOrderStatus | null, shippingAddress?: string | null, orderNumber: string } }> | null }> } | null };

export type CreateWmsProductMutationVariables = Exact<{
  wmsProduct: CreateWmsProductInput;
}>;


export type CreateWmsProductMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createWmsProduct: { __typename?: 'WmsProducts', id: string } } | null };

export type UpdateWmsProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  wmsProduct: UpdateWmsProductInput;
}>;


export type UpdateWmsProductMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateWmsProduct: { __typename?: 'WmsProducts', id: string } } | null };

export type RemoveWmsProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveWmsProductMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeWmsProduct: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableWmsProductQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
}>;


export type TableWmsProductQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', wmsProducts: Array<{ __typename?: 'WmsProducts', barcode?: string | null, costPrice?: number | null, createdAt?: string | null, height?: number | null, description?: string | null, id: string, length?: number | null, name: string, sku: string, status?: ProductStatus | null, updatedAt?: string | null, volume?: number | null, weight?: number | null, width?: number | null, supplier?: { __typename?: 'Suppliers', contactPerson?: string | null, email?: string | null, name: string, phoneNumber?: string | null } | null }> } | null };

export type CreatePutawayRuleMutationVariables = Exact<{
  putawayRule: CreatePutawayRuleInput;
}>;


export type CreatePutawayRuleMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createPutawayRule: { __typename?: 'PutawayRules', id: string } } | null };

export type UpdatePutawayRuleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  putawayRule: UpdatePutawayRuleInput;
}>;


export type UpdatePutawayRuleMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updatePutawayRule: { __typename?: 'PutawayRules', id: string } } | null };

export type RemovePutawayRuleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemovePutawayRuleMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removePutawayRule: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TablePutawayRuleQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  locationType?: InputMaybe<LocationType>;
}>;


export type TablePutawayRuleQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', putawayRules: Array<{ __typename?: 'PutawayRules', createdAt?: string | null, isActive?: boolean | null, id: string, locationType?: LocationType | null, maxQuantity?: number | null, minQuantity?: number | null, priority: number, requiresHazmatApproval?: boolean | null, requiresTemperatureControl?: boolean | null, updatedAt?: string | null, volumeThreshold?: number | null, weightThreshold?: number | null, client?: { __typename?: 'Companies', name: string, industry?: string | null, country?: string | null, city?: string | null, website?: string | null, phoneNumber?: string | null } | null, product: { __typename?: 'WmsProducts', barcode?: string | null, id: string, costPrice?: number | null, description?: string | null, name: string, sku: string, status?: ProductStatus | null }, warehouse: { __typename?: 'Warehouses', address?: string | null, city?: string | null, country?: string | null, name: string, isActive?: boolean | null } }> } | null };

export type CreateReorderPointMutationVariables = Exact<{
  reorderPoint: CreateReorderPointInput;
}>;


export type CreateReorderPointMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createReorderPoint: { __typename?: 'ReorderPoints', id: string } } | null };

export type UpdateReorderPointMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  reorderPoint: UpdateReorderPointInput;
}>;


export type UpdateReorderPointMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateReorderPoint: { __typename?: 'ReorderPoints', id: string } } | null };

export type RemoveReorderPointMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveReorderPointMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeReorderPoint: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableReorderPointQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TableReorderPointQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', reorderPoints: Array<{ __typename?: 'ReorderPoints', createdAt?: string | null, id: string, threshold: number, updatedAt?: string | null, product: { __typename?: 'WmsProducts', barcode?: string | null, description?: string | null, costPrice?: number | null, id: string, name: string, sku: string, status?: ProductStatus | null }, warehouse: { __typename?: 'Warehouses', address?: string | null, city?: string | null, country?: string | null, id: string, name: string } }> } | null };

export type CreateReturnItemMutationVariables = Exact<{
  returnItem: CreateReturnItemInput;
}>;


export type CreateReturnItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createReturnItem: { __typename?: 'ReturnItems', id: string } } | null };

export type UpdateReturnItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  returnItem: UpdateReturnItemInput;
}>;


export type UpdateReturnItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateReturnItem: { __typename?: 'ReturnItems', id: string } } | null };

export type RemoveReturnItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveReturnItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeReturnItem: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateReturnMutationVariables = Exact<{
  return: CreateReturnInput;
}>;


export type CreateReturnMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createReturn: { __typename?: 'Returns', id: string } } | null };

export type UpdateReturnMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  return: UpdateReturnInput;
}>;


export type UpdateReturnMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateReturn: { __typename?: 'Returns', id: string } } | null };

export type RemoveReturnMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveReturnMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeReturn: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableReturnQueryQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ReturnStatus>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableReturnQueryQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', returns: Array<{ __typename?: 'Returns', createdAt?: string | null, id: string, reason?: string | null, returnNumber: string, status?: ReturnStatus | null, updatedAt?: string | null, client: { __typename?: 'Companies', name: string, phoneNumber?: string | null, industry?: string | null, country?: string | null, city?: string | null, website?: string | null }, salesOrder?: { __typename?: 'SalesOrders', orderNumber: string, shippingAddress?: string | null, status?: SalesOrderStatus | null, updatedAt?: string | null, id: string } | null, items?: Array<{ __typename?: 'ReturnItems', condition?: ReturnItemCondition | null, id: string, quantityExpected: number, quantityReceived?: number | null, quantityVariance?: number | null, product: { __typename?: 'WmsProducts', barcode?: string | null, costPrice?: number | null, description?: string | null, id: string, name: string, sku: string, status?: ProductStatus | null } }> | null }> } | null };

export type CreateSalesOrderItemMutationVariables = Exact<{
  salesOrderItem: CreateSalesOrderItemInput;
}>;


export type CreateSalesOrderItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createSalesOrderItem: { __typename?: 'SalesOrderItems', id: string } } | null };

export type UpdateSalesOrderItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  salesOrderItem: UpdateSalesOrderItemInput;
}>;


export type UpdateSalesOrderItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateSalesOrderItem: { __typename?: 'SalesOrderItems', id: string } } | null };

export type RemoveSalesOrderItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveSalesOrderItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeSalesOrderItem: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateSalesOrderMutationVariables = Exact<{
  salesOrder: CreateSalesOrderInput;
}>;


export type CreateSalesOrderMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createSalesOrder: { __typename?: 'SalesOrders', id: string } } | null };

export type UpdateSalesOrderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  salesOrder: UpdateSalesOrderInput;
}>;


export type UpdateSalesOrderMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateSalesOrder: { __typename?: 'SalesOrders', id: string } } | null };

export type RemoveSalesOrderMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveSalesOrderMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeSalesOrder: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableSalesOrderQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatus>;
}>;


export type TableSalesOrderQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', salesOrders: Array<{ __typename?: 'SalesOrders', createdAt?: string | null, id: string, orderNumber: string, shippingAddress?: string | null, status?: SalesOrderStatus | null, updatedAt?: string | null, items?: Array<{ __typename?: 'SalesOrderItems', id: string, quantityOrdered: number, updatedAt?: string | null, product: { __typename?: 'WmsProducts', barcode?: string | null, id: string, description?: string | null, name: string, sku: string, status?: ProductStatus | null } }> | null }> } | null };

export type CreateStockTransferMutationVariables = Exact<{
  stockTransfer: CreateStockTransferInput;
}>;


export type CreateStockTransferMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createStockTransfer: { __typename?: 'StockTransfers', id: string } } | null };

export type UpdateStockTransferMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  stockTransfer: UpdateStockTransferInput;
}>;


export type UpdateStockTransferMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateStockTransfer: { __typename?: 'StockTransfers', id: string } } | null };

export type RemoveStockTransferMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveStockTransferMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeStockTransfer: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableStockTransferQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<StockTransferStatus>;
}>;


export type TableStockTransferQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', stockTransfers: Array<{ __typename?: 'StockTransfers', createdAt?: string | null, id: string, quantity: number, status?: StockTransferStatus | null, updatedAt?: string | null, destinationWarehouse: { __typename?: 'Warehouses', address?: string | null, city?: string | null, country?: string | null, id: string, name: string, timezone?: string | null, isActive?: boolean | null }, product: { __typename?: 'WmsProducts', barcode?: string | null, costPrice?: number | null, name: string, height?: number | null, sku: string, status?: ProductStatus | null }, sourceWarehouse: { __typename?: 'Warehouses', address?: string | null, country?: string | null, isActive?: boolean | null, name: string, city?: string | null, id: string, timezone?: string | null } }> } | null };

export type CreateSupplierMutationVariables = Exact<{
  supplier: CreateSupplierInput;
}>;


export type CreateSupplierMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createSupplier: { __typename?: 'Suppliers', id: string } } | null };

export type UpdateSupplierMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  supplier: UpdateSupplierInput;
}>;


export type UpdateSupplierMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateSupplier: { __typename?: 'Suppliers', id: string } } | null };

export type RemoveSupplierMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveSupplierMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeSupplier: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableSupplierQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableSupplierQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', suppliers: Array<{ __typename?: 'Suppliers', contactPerson?: string | null, createdAt?: string | null, email?: string | null, id: string, name: string, phoneNumber?: string | null, updatedAt?: string | null, products?: Array<{ __typename?: 'WmsProducts', barcode?: string | null, id: string, costPrice?: number | null, description?: string | null, name: string, sku: string, status?: ProductStatus | null }> | null }> } | null };

export type CreateTaskItemMutationVariables = Exact<{
  taskItem: CreateTaskItemInput;
}>;


export type CreateTaskItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createTaskItem: { __typename?: 'TaskItems', id: string } } | null };

export type UpdateTaskItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  taskItem: UpdateTaskItemInput;
}>;


export type UpdateTaskItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateTaskItem: { __typename?: 'TaskItems', id: string } } | null };

export type RemoveTaskItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveTaskItemMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeTaskItem: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type CreateTaskMutationVariables = Exact<{
  task: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createTask: { __typename?: 'Tasks', id: string } } | null };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  task: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateTask: { __typename?: 'Tasks', id: string } } | null };

export type RemoveTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveTaskMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeTask: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableTaskQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
  type?: InputMaybe<TaskType>;
}>;


export type TableTaskQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', tasks: Array<{ __typename?: 'Tasks', actualDuration?: number | null, createdAt?: string | null, durationSeconds?: number | null, endTime?: string | null, estimatedDuration?: number | null, id: string, instructions?: string | null, notes?: string | null, priority?: number | null, sourceEntityId?: string | null, sourceEntityType?: string | null, startTime?: string | null, status?: TaskStatus | null, taskNumber: string, type: TaskType, updatedAt?: string | null, user?: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } | null, warehouse: { __typename?: 'Warehouses', address?: string | null, city?: string | null, country?: string | null, id: string, isActive?: boolean | null, name: string, timezone?: string | null }, items?: Array<{ __typename?: 'TaskItems', completedAt?: string | null, createdAt?: string | null, expiryDate?: string | null, id: string, lotNumber?: string | null, notes?: string | null, quantityCompleted: number, quantityRemaining?: number | null, quantityRequired: number, serialNumbers?: Array<string | null> | null, status?: TaskItemStatus | null, updatedAt?: string | null, product: { __typename?: 'WmsProducts', barcode?: string | null, costPrice?: number | null, description?: string | null, id: string, name: string, sku: string, status?: ProductStatus | null }, sourceLocation?: { __typename?: 'Locations', barcode?: string | null, hazmatApproved?: boolean | null, id: string, path?: string | null, name: string, type: LocationType } | null }> | null }> } | null };

export type CreateWarehouseMutationVariables = Exact<{
  warehouse: CreateWarehouseInput;
}>;


export type CreateWarehouseMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', createWarehouse: { __typename?: 'Warehouses', id: string } } | null };

export type UpdateWarehouseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  warehouse: UpdateWarehouseInput;
}>;


export type UpdateWarehouseMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', updateWarehouse: { __typename?: 'Warehouses', id: string } } | null };

export type RemoveWarehouseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveWarehouseMutation = { __typename?: 'Mutation', wms?: { __typename?: 'WmsMutation', removeWarehouse: { __typename?: 'DeleteResult', success: boolean, numDeletedRows: number } } | null };

export type TableWarehouseQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TableWarehouseQuery = { __typename?: 'Query', wms?: { __typename?: 'WmsQuery', warehouses: Array<{ __typename?: 'Warehouses', address?: string | null, city?: string | null, contactEmail?: string | null, contactPerson?: string | null, contactPhone?: string | null, country?: string | null, createdAt?: string | null, id: string, isActive?: boolean | null, name: string, postalCode?: string | null, state?: string | null, timezone?: string | null, updatedAt?: string | null, tasks?: Array<{ __typename?: 'Tasks', instructions?: string | null, id: string, notes?: string | null, priority?: number | null, taskNumber: string, type: TaskType, user?: { __typename?: 'User', email: string, id: string, image?: string | null, name: string } | null }> | null, locations?: Array<{ __typename?: 'Locations', barcode?: string | null, id: string, isActive?: boolean | null, isPickable?: boolean | null, isReceivable?: boolean | null, level?: number | null, maxPallets?: number | null, maxVolume?: number | null, maxWeight?: number | null, name: string, path?: string | null, type: LocationType, xCoordinate?: number | null, yCoordinate?: number | null, zCoordinate?: number | null, hazmatApproved?: boolean | null }> | null, inboundShipments?: Array<{ __typename?: 'InboundShipments', status?: InboundShipmentStatus | null, updatedAt?: string | null, warehouseId: string, items?: Array<{ __typename?: 'InboundShipmentItems', discrepancyNotes?: string | null, discrepancyQuantity?: number | null, expectedQuantity: number, id: string, createdAt?: string | null, receivedQuantity?: number | null, updatedAt?: string | null, product: { __typename?: 'WmsProducts', barcode?: string | null, costPrice?: number | null, description?: string | null, id: string, name: string, sku: string, status?: ProductStatus | null }, inboundShipment: { __typename?: 'InboundShipments', status?: InboundShipmentStatus | null, id: string, expectedArrivalDate?: string | null, updatedAt?: string | null, actualArrivalDate?: string | null, client?: { __typename?: 'Companies', city?: string | null, country?: string | null, id: string, industry?: string | null, name: string, phoneNumber?: string | null } | null } }> | null }> | null }> } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const CreateAccountTransactionDocument = new TypedDocumentString(`
    mutation CreateAccountTransaction($accountTransaction: CreateAccountTransactionInput!) {
  billing {
    createAccountTransaction(value: $accountTransaction) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateAccountTransactionMutation, CreateAccountTransactionMutationVariables>;
export const UpdateAccountTransactionDocument = new TypedDocumentString(`
    mutation UpdateAccountTransaction($id: ID!, $accountTransaction: UpdateAccountTransactionInput!) {
  billing {
    updateAccountTransaction(id: $id, value: $accountTransaction) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateAccountTransactionMutation, UpdateAccountTransactionMutationVariables>;
export const RemoveAccountTransactionDocument = new TypedDocumentString(`
    mutation RemoveAccountTransaction($id: ID!) {
  billing {
    removeAccountTransaction(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveAccountTransactionMutation, RemoveAccountTransactionMutationVariables>;
export const AccountTransactionsDocument = new TypedDocumentString(`
    query AccountTransactions($page: Int, $perPage: Int, $search: String, $type: TransactionType) {
  billing {
    accountTransactions(
      page: $page
      perPage: $perPage
      search: $search
      type: $type
    ) {
      amount
      createdAt
      description
      id
      referenceNumber
      runningBalance
      sourceRecordId
      sourceRecordType
      transactionDate
      type
      processedByUser {
        name
        image
        email
        id
      }
      updatedAt
      clientAccount {
        availableCredit
        paymentTermsDays
        updatedAt
        walletBalance
        createdAt
        client {
          annualRevenue
          id
          industry
          name
          phoneNumber
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AccountTransactionsQuery, AccountTransactionsQueryVariables>;
export const CreateAccountingSyncLogDocument = new TypedDocumentString(`
    mutation CreateAccountingSyncLog($accountingSyncLog: CreateAccountingSyncLogInput!) {
  billing {
    createAccountingSyncLog(value: $accountingSyncLog) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateAccountingSyncLogMutation, CreateAccountingSyncLogMutationVariables>;
export const UpdateAccountingSyncLogDocument = new TypedDocumentString(`
    mutation UpdateAccountingSyncLog($id: ID!, $accountingSyncLog: UpdateAccountingSyncLogInput!) {
  billing {
    updateAccountingSyncLog(id: $id, value: $accountingSyncLog) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateAccountingSyncLogMutation, UpdateAccountingSyncLogMutationVariables>;
export const RemoveAccountingSyncLogDocument = new TypedDocumentString(`
    mutation RemoveAccountingSyncLog($id: ID!) {
  billing {
    removeAccountingSyncLog(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveAccountingSyncLogMutation, RemoveAccountingSyncLogMutationVariables>;
export const AccountingSyncLogsDocument = new TypedDocumentString(`
    query AccountingSyncLogs($page: Int, $perPage: Int, $search: String, $status: SyncStatus) {
  billing {
    accountingSyncLogs(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
    ) {
      createdAt
      errorMessage
      externalId
      externalSystem
      id
      lastSyncAt
      nextRetryAt
      recordId
      recordType
      requestPayload
      responsePayload
      retryCount
      status
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<AccountingSyncLogsQuery, AccountingSyncLogsQueryVariables>;
export const CreateClientAccountDocument = new TypedDocumentString(`
    mutation CreateClientAccount($clientAccount: CreateClientAccountInput!) {
  billing {
    createClientAccount(value: $clientAccount) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateClientAccountMutation, CreateClientAccountMutationVariables>;
export const UpdateClientAccountDocument = new TypedDocumentString(`
    mutation UpdateClientAccount($id: ID!, $clientAccount: UpdateClientAccountInput!) {
  billing {
    updateClientAccount(id: $id, value: $clientAccount) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateClientAccountMutation, UpdateClientAccountMutationVariables>;
export const RemoveClientAccountDocument = new TypedDocumentString(`
    mutation RemoveClientAccount($id: ID!) {
  billing {
    removeClientAccount(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveClientAccountMutation, RemoveClientAccountMutationVariables>;
export const TableClientAccountDocument = new TypedDocumentString(`
    query TableClientAccount($page: Int, $perPage: Int, $search: String) {
  billing {
    clientAccounts(page: $page, perPage: $perPage, search: $search) {
      availableCredit
      client {
        annualRevenue
        country
        industry
        name
        phoneNumber
        updatedAt
        website
      }
      creditLimit
      currency
      isCreditApproved
      lastPaymentDate
      paymentTermsDays
      updatedAt
      walletBalance
      id
      transactions {
        amount
        description
        id
        referenceNumber
        runningBalance
        sourceRecordId
        sourceRecordType
        transactionDate
        type
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableClientAccountQuery, TableClientAccountQueryVariables>;
export const CreateCreditNoteDocument = new TypedDocumentString(`
    mutation CreateCreditNote($creditNote: CreateCreditNoteInput!) {
  billing {
    createCreditNote(value: $creditNote) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCreditNoteMutation, CreateCreditNoteMutationVariables>;
export const UpdateCreditNoteDocument = new TypedDocumentString(`
    mutation UpdateCreditNote($id: ID!, $creditNote: UpdateCreditNoteInput!) {
  billing {
    updateCreditNote(id: $id, value: $creditNote) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCreditNoteMutation, UpdateCreditNoteMutationVariables>;
export const RemoveCreditNoteDocument = new TypedDocumentString(`
    mutation RemoveCreditNote($id: ID!) {
  billing {
    removeCreditNote(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveCreditNoteMutation, RemoveCreditNoteMutationVariables>;
export const TableCreditNoteDocument = new TypedDocumentString(`
    query TableCreditNote($page: Int, $perPage: Int, $search: String) {
  billing {
    creditNotes(page: $page, perPage: $perPage, search: $search) {
      appliedAt
      amount
      createdAt
      createdByUser {
        email
        id
        image
        name
      }
      creditNoteNumber
      currency
      id
      issueDate
      notes
      reason
      updatedAt
      invoice {
        amountPaid
        invoiceNumber
        issueDate
        paidAt
        notes
        sentAt
        status
        subtotal
        taxAmount
        totalAmount
        updatedAt
        paymentTerms
        discountAmount
        dueDate
        currency
      }
      dispute {
        disputedAmount
        id
        reason
        resolutionNotes
        resolvedAt
        status
        submittedAt
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableCreditNoteQuery, TableCreditNoteQueryVariables>;
export const CreateDisputeDocument = new TypedDocumentString(`
    mutation CreateDispute($dispute: CreateDisputeInput!) {
  billing {
    createDispute(value: $dispute) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateDisputeMutation, CreateDisputeMutationVariables>;
export const UpdateDisputeDocument = new TypedDocumentString(`
    mutation UpdateDispute($id: ID!, $dispute: UpdateDisputeInput!) {
  billing {
    updateDispute(id: $id, value: $dispute) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateDisputeMutation, UpdateDisputeMutationVariables>;
export const RemoveDisputeDocument = new TypedDocumentString(`
    mutation RemoveDispute($id: ID!) {
  billing {
    removeDispute(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveDisputeMutation, RemoveDisputeMutationVariables>;
export const TableDisputeDocument = new TypedDocumentString(`
    query TableDispute($page: Int, $perPage: Int, $search: String, $status: DisputeStatus) {
  billing {
    disputes(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      client {
        annualRevenue
        city
        id
        industry
        name
        website
        phoneNumber
      }
      disputedAmount
      id
      reason
      resolutionNotes
      resolvedAt
      status
      submittedAt
      updatedAt
      resolvedByUser {
        email
        id
        image
        name
      }
      lineItem {
        discountAmount
        discountRate
        description
        id
        lineTotal
        quantity
        sourceRecordId
        sourceRecordType
        taxAmount
        taxRate
        totalPrice
        unitPrice
        updatedAt
        invoice {
          amountPaid
          currency
          discountAmount
          dueDate
          id
          invoiceNumber
          issueDate
          notes
          paidAt
          paymentTerms
          sentAt
          status
          subtotal
          taxAmount
          totalAmount
          updatedAt
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableDisputeQuery, TableDisputeQueryVariables>;
export const CreateInvoiceLineItemDocument = new TypedDocumentString(`
    mutation CreateInvoiceLineItem($invoiceLineItem: CreateInvoiceLineItemInput!) {
  billing {
    createInvoiceLineItem(value: $invoiceLineItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInvoiceLineItemMutation, CreateInvoiceLineItemMutationVariables>;
export const UpdateInvoiceLineItemDocument = new TypedDocumentString(`
    mutation UpdateInvoiceLineItem($id: ID!, $invoiceLineItem: UpdateInvoiceLineItemInput!) {
  billing {
    updateInvoiceLineItem(id: $id, value: $invoiceLineItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceLineItemMutation, UpdateInvoiceLineItemMutationVariables>;
export const RemoveInvoiceLineItemDocument = new TypedDocumentString(`
    mutation RemoveInvoiceLineItem($id: ID!) {
  billing {
    removeInvoiceLineItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveInvoiceLineItemMutation, RemoveInvoiceLineItemMutationVariables>;
export const CreateBillingInvoiceDocument = new TypedDocumentString(`
    mutation CreateBillingInvoice($billingInvoice: CreateBillingInvoiceInput!) {
  billing {
    createBillingInvoice(value: $billingInvoice) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateBillingInvoiceMutation, CreateBillingInvoiceMutationVariables>;
export const UpdateBillingInvoiceDocument = new TypedDocumentString(`
    mutation UpdateBillingInvoice($id: ID!, $billingInvoice: UpdateBillingInvoiceInput!) {
  billing {
    updateBillingInvoice(id: $id, value: $billingInvoice) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateBillingInvoiceMutation, UpdateBillingInvoiceMutationVariables>;
export const RemoveBillingInvoiceDocument = new TypedDocumentString(`
    mutation RemoveBillingInvoice($id: ID!) {
  billing {
    removeBillingInvoice(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveBillingInvoiceMutation, RemoveBillingInvoiceMutationVariables>;
export const TableBillingInvoiceDocument = new TypedDocumentString(`
    query TableBillingInvoice($page: Int, $perPage: Int, $search: String, $status: BillingInvoiceStatus) {
  billing {
    billingInvoices(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
    ) {
      amountOutstanding
      amountPaid
      createdAt
      currency
      discountAmount
      dueDate
      id
      invoiceNumber
      issueDate
      notes
      paidAt
      paymentTerms
      sentAt
      status
      subtotal
      taxAmount
      totalAmount
      updatedAt
      lineItems {
        description
        discountAmount
        discountRate
        id
        quantity
        taxAmount
        lineTotal
        sourceRecordId
        sourceRecordType
        taxRate
        totalPrice
        unitPrice
        updatedAt
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableBillingInvoiceQuery, TableBillingInvoiceQueryVariables>;
export const CreatePaymentDocument = new TypedDocumentString(`
    mutation CreatePayment($payment: CreatePaymentInput!) {
  billing {
    createPayment(value: $payment) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const UpdatePaymentDocument = new TypedDocumentString(`
    mutation UpdatePayment($id: ID!, $payment: UpdatePaymentInput!) {
  billing {
    updatePayment(id: $id, value: $payment) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdatePaymentMutation, UpdatePaymentMutationVariables>;
export const RemovePaymentDocument = new TypedDocumentString(`
    mutation RemovePayment($id: ID!) {
  billing {
    removePayment(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemovePaymentMutation, RemovePaymentMutationVariables>;
export const TablePaymentDocument = new TypedDocumentString(`
    query TablePayment($page: Int, $paymentMethod: PaymentMethod, $perPage: Int, $search: String, $status: PaymentStatus) {
  billing {
    payments(
      page: $page
      paymentMethod: $paymentMethod
      perPage: $perPage
      search: $search
      status: $status
    ) {
      amount
      createdAt
      currency
      exchangeRate
      fees
      gatewayReference
      id
      invoice {
        invoiceNumber
        id
        issueDate
        paidAt
        paymentTerms
        sentAt
        status
        discountAmount
        amountPaid
        amountOutstanding
      }
      processedByUser {
        email
        id
        image
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TablePaymentQuery, TablePaymentQueryVariables>;
export const CreateQuoteDocument = new TypedDocumentString(`
    mutation CreateQuote($quote: CreateQuoteInput!) {
  billing {
    createQuote(value: $quote) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateQuoteMutation, CreateQuoteMutationVariables>;
export const UpdateQuoteDocument = new TypedDocumentString(`
    mutation UpdateQuote($id: ID!, $quote: UpdateQuoteInput!) {
  billing {
    updateQuote(id: $id, value: $quote) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateQuoteMutation, UpdateQuoteMutationVariables>;
export const RemoveQuoteDocument = new TypedDocumentString(`
    mutation RemoveQuote($id: ID!) {
  billing {
    removeQuote(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveQuoteMutation, RemoveQuoteMutationVariables>;
export const TableQuoteDocument = new TypedDocumentString(`
    query TableQuote($page: Int, $perPage: Int, $search: String, $status: QuoteStatus) {
  billing {
    quotes(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      destinationDetails
      expiresAt
      height
      id
      length
      notes
      originDetails
      quoteNumber
      quotedPrice
      serviceLevel
      status
      updatedAt
      volume
      weight
      width
      createdByUser {
        email
        id
        image
        name
      }
      client {
        city
        country
        id
        industry
        name
        phoneNumber
        website
        billingInvoices {
          amountOutstanding
          amountPaid
          currency
          discountAmount
          dueDate
          invoiceNumber
          issueDate
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableQuoteQuery, TableQuoteQueryVariables>;
export const CreateRateCardDocument = new TypedDocumentString(`
    mutation CreateRateCard($rateCard: CreateRateCardInput!) {
  billing {
    createRateCard(value: $rateCard) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateRateCardMutation, CreateRateCardMutationVariables>;
export const UpdateRateCardDocument = new TypedDocumentString(`
    mutation UpdateRateCard($id: ID!, $rateCard: UpdateRateCardInput!) {
  billing {
    updateRateCard(id: $id, value: $rateCard) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateRateCardMutation, UpdateRateCardMutationVariables>;
export const RemoveRateCardDocument = new TypedDocumentString(`
    mutation RemoveRateCard($id: ID!) {
  billing {
    removeRateCard(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveRateCardMutation, RemoveRateCardMutationVariables>;
export const TableRateCardDocument = new TypedDocumentString(`
    query TableRateCard($page: Int, $perPage: Int, $search: String, $serviceType: ServiceType) {
  billing {
    rateCards(
      page: $page
      perPage: $perPage
      search: $search
      serviceType: $serviceType
    ) {
      createdAt
      description
      id
      isActive
      name
      serviceType
      updatedAt
      validFrom
      validTo
      createdByUser {
        email
        emailVerified
        image
        name
      }
      rules {
        condition
        id
        isActive
        maxValue
        minValue
        price
        pricingModel
        priority
        value
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableRateCardQuery, TableRateCardQueryVariables>;
export const CreateRateRuleDocument = new TypedDocumentString(`
    mutation CreateRateRule($rateRule: CreateRateRuleInput!) {
  billing {
    createRateRule(value: $rateRule) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateRateRuleMutation, CreateRateRuleMutationVariables>;
export const UpdateRateRuleDocument = new TypedDocumentString(`
    mutation UpdateRateRule($id: ID!, $rateRule: UpdateRateRuleInput!) {
  billing {
    updateRateRule(id: $id, value: $rateRule) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateRateRuleMutation, UpdateRateRuleMutationVariables>;
export const RemoveRateRuleDocument = new TypedDocumentString(`
    mutation RemoveRateRule($id: ID!) {
  billing {
    removeRateRule(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveRateRuleMutation, RemoveRateRuleMutationVariables>;
export const TableRateRuleDocument = new TypedDocumentString(`
    query TableRateRule($page: Int, $perPage: Int, $pricingModel: PricingModel, $search: String) {
  billing {
    rateRules(
      page: $page
      perPage: $perPage
      pricingModel: $pricingModel
      search: $search
    ) {
      condition
      createdAt
      id
      isActive
      maxValue
      minValue
      price
      pricingModel
      priority
      updatedAt
      value
      rateCard {
        createdAt
        createdByUser {
          email
          id
          image
          name
        }
        description
        id
        isActive
        name
        serviceType
        updatedAt
        validFrom
        validTo
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableRateRuleQuery, TableRateRuleQueryVariables>;
export const CreateSurchargeDocument = new TypedDocumentString(`
    mutation CreateSurcharge($surcharge: CreateSurchargeInput!) {
  billing {
    createSurcharge(value: $surcharge) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateSurchargeMutation, CreateSurchargeMutationVariables>;
export const UpdateSurchargeDocument = new TypedDocumentString(`
    mutation UpdateSurcharge($id: ID!, $surcharge: UpdateSurchargeInput!) {
  billing {
    updateSurcharge(id: $id, value: $surcharge) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateSurchargeMutation, UpdateSurchargeMutationVariables>;
export const RemoveSurchargeDocument = new TypedDocumentString(`
    mutation RemoveSurcharge($id: ID!) {
  billing {
    removeSurcharge(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveSurchargeMutation, RemoveSurchargeMutationVariables>;
export const TableSurchargeDocument = new TypedDocumentString(`
    query TableSurcharge($page: Int, $perPage: Int, $search: String, $calculationMethod: SurchargeCalculationMethod) {
  billing {
    surcharges(
      page: $page
      perPage: $perPage
      search: $search
      calculationMethod: $calculationMethod
    ) {
      amount
      calculationMethod
      createdAt
      description
      id
      isActive
      name
      type
      updatedAt
      validFrom
      validTo
    }
  }
}
    `) as unknown as TypedDocumentString<TableSurchargeQuery, TableSurchargeQueryVariables>;
export const CreateCampaignDocument = new TypedDocumentString(`
    mutation CreateCampaign($campaign: CreateCampaignInput!) {
  crm {
    createCampaign(value: $campaign) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCampaignMutation, CreateCampaignMutationVariables>;
export const UpdateCampaignDocument = new TypedDocumentString(`
    mutation UpdateCampaign($id: ID!, $campaign: UpdateCampaignInput!) {
  crm {
    updateCampaign(id: $id, value: $campaign) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCampaignMutation, UpdateCampaignMutationVariables>;
export const RemoveCampaignDocument = new TypedDocumentString(`
    mutation RemoveCampaign($id: ID!) {
  crm {
    removeCampaign(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveCampaignMutation, RemoveCampaignMutationVariables>;
export const TableCampaignDocument = new TypedDocumentString(`
    query TableCampaign($page: Int, $perPage: Int, $search: String) {
  crm {
    campaigns(page: $page, perPage: $perPage, search: $search) {
      budget
      createdAt
      endDate
      id
      name
      startDate
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<TableCampaignQuery, TableCampaignQueryVariables>;
export const SearchCampaignsDocument = new TypedDocumentString(`
    query SearchCampaigns($search: String!) {
  crm {
    campaigns(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<SearchCampaignsQuery, SearchCampaignsQueryVariables>;
export const CreateCaseDocument = new TypedDocumentString(`
    mutation CreateCase($case: CreateCaseInput!) {
  crm {
    createCase(value: $case) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCaseMutation, CreateCaseMutationVariables>;
export const UpdateCaseDocument = new TypedDocumentString(`
    mutation UpdateCase($id: ID!, $case: UpdateCaseInput!) {
  crm {
    updateCase(id: $id, value: $case) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCaseMutation, UpdateCaseMutationVariables>;
export const RemoveCaseDocument = new TypedDocumentString(`
    mutation RemoveCase($id: ID!) {
  crm {
    removeCase(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveCaseMutation, RemoveCaseMutationVariables>;
export const TableCaseDocument = new TypedDocumentString(`
    query TableCase($page: Int, $perPage: Int, $priority: CasePriority, $status: CaseStatus, $type: CaseType) {
  crm {
    cases(
      perPage: $page
      page: $perPage
      priority: $priority
      status: $status
      type: $type
    ) {
      caseNumber
      createdAt
      description
      id
      priority
      status
      type
      updatedAt
      contact {
        id
        email
        name
        phoneNumber
        jobTitle
      }
      owner {
        id
        email
        image
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableCaseQuery, TableCaseQueryVariables>;
export const SearchCasesDocument = new TypedDocumentString(`
    query SearchCases($search: String!) {
  crm {
    cases(page: 1, perPage: 10, search: $search) {
      value: id
      label: caseNumber
    }
  }
}
    `) as unknown as TypedDocumentString<SearchCasesQuery, SearchCasesQueryVariables>;
export const CreateCompanyDocument = new TypedDocumentString(`
    mutation CreateCompany($company: CreateCompanyInput!) {
  crm {
    createCompany(value: $company) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const UpdateCompanyDocument = new TypedDocumentString(`
    mutation UpdateCompany($id: ID!, $company: UpdateCompanyInput!) {
  crm {
    updateCompany(id: $id, value: $company) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const RemoveCompanyDocument = new TypedDocumentString(`
    mutation RemoveCompany($id: ID!) {
  crm {
    removeCompany(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveCompanyMutation, RemoveCompanyMutationVariables>;
export const TableCompanyQueryDocument = new TypedDocumentString(`
    query TableCompanyQuery($page: Int, $perPage: Int, $search: String) {
  crm {
    companies(page: $page, perPage: $perPage, search: $search) {
      name
      owner {
        email
        image
        name
      }
      annualRevenue
      phoneNumber
      postalCode
      state
      street
      updatedAt
      website
      city
      clientAccount {
        walletBalance
        creditLimit
        currency
      }
      country
      createdAt
      id
      industry
    }
  }
}
    `) as unknown as TypedDocumentString<TableCompanyQueryQuery, TableCompanyQueryQueryVariables>;
export const SearchCompaniesDocument = new TypedDocumentString(`
    query SearchCompanies($search: String!) {
  crm {
    companies(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<SearchCompaniesQuery, SearchCompaniesQueryVariables>;
export const CreateContactDocument = new TypedDocumentString(`
    mutation CreateContact($contact: CreateContactInput!) {
  crm {
    createContact(value: $contact) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateContactMutation, CreateContactMutationVariables>;
export const UpdateContactDocument = new TypedDocumentString(`
    mutation UpdateContact($id: ID!, $contact: UpdateContactInput!) {
  crm {
    updateContact(id: $id, value: $contact) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateContactMutation, UpdateContactMutationVariables>;
export const RemoveContactDocument = new TypedDocumentString(`
    mutation RemoveContact($id: ID!) {
  crm {
    removeContact(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveContactMutation, RemoveContactMutationVariables>;
export const TableContactDocument = new TypedDocumentString(`
    query TableContact($page: Int, $perPage: Int, $search: String) {
  crm {
    contacts(page: $page, perPage: $perPage, search: $search) {
      createdAt
      email
      id
      jobTitle
      name
      phoneNumber
      updatedAt
      owner {
        id
        email
        image
        name
      }
      company {
        id
        phoneNumber
        name
        industry
        website
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableContactQuery, TableContactQueryVariables>;
export const SearchContactsDocument = new TypedDocumentString(`
    query SearchContacts($search: String!) {
  crm {
    contacts(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<SearchContactsQuery, SearchContactsQueryVariables>;
export const CreateInteractionDocument = new TypedDocumentString(`
    mutation CreateInteraction($interaction: CreateInteractionInput!) {
  crm {
    createInteraction(value: $interaction) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInteractionMutation, CreateInteractionMutationVariables>;
export const UpdateInteractionDocument = new TypedDocumentString(`
    mutation UpdateInteraction($id: ID!, $interaction: UpdateInteractionInput!) {
  crm {
    updateInteraction(id: $id, value: $interaction) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInteractionMutation, UpdateInteractionMutationVariables>;
export const RemoveInteractionDocument = new TypedDocumentString(`
    mutation RemoveInteraction($id: ID!) {
  crm {
    removeInteraction(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveInteractionMutation, RemoveInteractionMutationVariables>;
export const TableInteractionDocument = new TypedDocumentString(`
    query TableInteraction($page: Int, $perPage: Int, $interactionType: InteractionType, $search: String) {
  crm {
    interactions(
      interactionType: $interactionType
      page: $page
      perPage: $perPage
      search: $search
    ) {
      createdAt
      id
      interactionDate
      notes
      outcome
      type
      updatedAt
      user {
        id
        email
        image
        name
      }
      case {
        id
        caseNumber
        priority
        status
        type
      }
      contact {
        id
        name
        email
        jobTitle
        phoneNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableInteractionQuery, TableInteractionQueryVariables>;
export const CreateInvoiceItemDocument = new TypedDocumentString(`
    mutation CreateInvoiceItem($invoiceItem: CreateInvoiceItemInput!) {
  crm {
    createInvoiceItem(value: $invoiceItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInvoiceItemMutation, CreateInvoiceItemMutationVariables>;
export const UpdateInvoiceItemDocument = new TypedDocumentString(`
    mutation UpdateInvoiceItem($id: ID!, $invoiceItem: UpdateInvoiceItemInput!) {
  crm {
    updateInvoiceItem(id: $id, value: $invoiceItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceItemMutation, UpdateInvoiceItemMutationVariables>;
export const RemoveInvoiceItemDocument = new TypedDocumentString(`
    mutation RemoveInvoiceItem($id: ID!) {
  crm {
    removeInvoiceItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveInvoiceItemMutation, RemoveInvoiceItemMutationVariables>;
export const CreateInvoiceDocument = new TypedDocumentString(`
    mutation CreateInvoice($invoice: CreateInvoiceInput!) {
  crm {
    createInvoice(value: $invoice) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const UpdateInvoiceDocument = new TypedDocumentString(`
    mutation UpdateInvoice($id: ID!, $invoice: UpdateInvoiceInput!) {
  crm {
    updateInvoice(id: $id, value: $invoice) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;
export const RemoveInvoiceDocument = new TypedDocumentString(`
    mutation RemoveInvoice($id: ID!) {
  crm {
    removeInvoice(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveInvoiceMutation, RemoveInvoiceMutationVariables>;
export const TableInvoiceDocument = new TypedDocumentString(`
    query TableInvoice($page: Int, $perPage: Int, $paymentMethod: CrmInvoicePaymentMethod, $status: InvoiceStatus, $search: String) {
  crm {
    invoices(
      page: $page
      paymentMethod: $paymentMethod
      perPage: $perPage
      search: $search
      status: $status
    ) {
      createdAt
      dueDate
      id
      issueDate
      paidAt
      paymentMethod
      sentAt
      status
      total
      updatedAt
      items {
        price
        quantity
        updatedAt
        id
        createdAt
        product {
          name
          price
          type
          sku
          id
          description
        }
      }
      opportunity {
        name
        stage
        id
        expectedCloseDate
        dealValue
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableInvoiceQuery, TableInvoiceQueryVariables>;
export const CreateLeadDocument = new TypedDocumentString(`
    mutation CreateLead($lead: CreateLeadInput!) {
  crm {
    createLead(value: $lead) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateLeadMutation, CreateLeadMutationVariables>;
export const UpdateLeadDocument = new TypedDocumentString(`
    mutation UpdateLead($id: ID!, $lead: UpdateLeadInput!) {
  crm {
    updateLead(id: $id, value: $lead) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadMutation, UpdateLeadMutationVariables>;
export const RemoveLeadDocument = new TypedDocumentString(`
    mutation RemoveLead($id: ID!) {
  crm {
    removeLead(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveLeadMutation, RemoveLeadMutationVariables>;
export const TableLeadDocument = new TypedDocumentString(`
    query TableLead($page: Int, $perPage: Int, $search: String, $status: LeadStatus, $source: LeadSource) {
  crm {
    leads(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
      leadSource: $source
    ) {
      convertedAt
      createdAt
      email
      leadScore
      leadSource
      name
      id
      status
      updatedAt
      owner {
        id
        email
        image
        name
      }
      campaign {
        name
        endDate
        startDate
        budget
      }
      convertedCompany {
        name
        industry
        phoneNumber
        website
        id
      }
      convertedContact {
        email
        id
        jobTitle
        name
        phoneNumber
        updatedAt
        company {
          name
          industry
          id
        }
      }
      convertedOpportunity {
        name
        dealValue
        source
        stage
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableLeadQuery, TableLeadQueryVariables>;
export const SearchLeadsDocument = new TypedDocumentString(`
    query SearchLeads($search: String!) {
  crm {
    leads(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<SearchLeadsQuery, SearchLeadsQueryVariables>;
export const CreateNotificationDocument = new TypedDocumentString(`
    mutation CreateNotification($notification: CreateNotificationInput!) {
  crm {
    createNotification(value: $notification) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateNotificationMutation, CreateNotificationMutationVariables>;
export const UpdateNotificationDocument = new TypedDocumentString(`
    mutation UpdateNotification($id: ID!, $notification: UpdateNotificationInput!) {
  crm {
    updateNotification(id: $id, value: $notification) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateNotificationMutation, UpdateNotificationMutationVariables>;
export const RemoveNotificationDocument = new TypedDocumentString(`
    mutation RemoveNotification($id: ID!) {
  crm {
    removeNotification(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveNotificationMutation, RemoveNotificationMutationVariables>;
export const TableNotificationDocument = new TypedDocumentString(`
    query TableNotification($page: Int, $perPage: Int, $search: String) {
  crm {
    notifications(page: $page, perPage: $perPage, search: $search) {
      createdAt
      id
      isRead
      link
      message
      updatedAt
      user {
        email
        id
        image
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableNotificationQuery, TableNotificationQueryVariables>;
export const SearchNotificationsDocument = new TypedDocumentString(`
    query SearchNotifications($search: String!) {
  crm {
    notifications(page: 1, perPage: 10, search: $search) {
      value: id
      label: message
    }
  }
}
    `) as unknown as TypedDocumentString<SearchNotificationsQuery, SearchNotificationsQueryVariables>;
export const CreateOpportunityDocument = new TypedDocumentString(`
    mutation CreateOpportunity($opportunity: CreateOpportunityInput!) {
  crm {
    createOpportunity(value: $opportunity) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateOpportunityMutation, CreateOpportunityMutationVariables>;
export const UpdateOpportunityDocument = new TypedDocumentString(`
    mutation UpdateOpportunity($id: ID!, $opportunity: UpdateOpportunityInput!) {
  crm {
    updateOpportunity(id: $id, value: $opportunity) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityMutation, UpdateOpportunityMutationVariables>;
export const RemoveOpportunityDocument = new TypedDocumentString(`
    mutation RemoveOpportunity($id: ID!) {
  crm {
    removeOpportunity(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveOpportunityMutation, RemoveOpportunityMutationVariables>;
export const TableOpportunityDocument = new TypedDocumentString(`
    query TableOpportunity($page: Int, $perPage: Int, $search: String, $source: OpportunitySource, $stage: OpportunityStage) {
  crm {
    opportunities(
      page: $page
      perPage: $perPage
      search: $search
      source: $source
      stage: $stage
    ) {
      createdAt
      dealValue
      expectedCloseDate
      id
      lostReason
      name
      probability
      source
      stage
      updatedAt
      company {
        name
        industry
        id
        country
        phoneNumber
      }
      contact {
        email
        id
        jobTitle
        name
        phoneNumber
        updatedAt
        company {
          name
          phoneNumber
          industry
          country
        }
      }
      owner {
        email
        id
        image
        name
      }
      products {
        quantity
        product {
          id
          name
          price
          sku
          type
          description
        }
      }
      campaign {
        name
        budget
        endDate
        startDate
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableOpportunityQuery, TableOpportunityQueryVariables>;
export const SearchOpportunitiesDocument = new TypedDocumentString(`
    query SearchOpportunities($search: String!) {
  crm {
    opportunities(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<SearchOpportunitiesQuery, SearchOpportunitiesQueryVariables>;
export const CreateOpportunityProductDocument = new TypedDocumentString(`
    mutation CreateOpportunityProduct($opportunityProduct: CreateOpportunityProductInput!) {
  crm {
    createOpportunityProduct(value: $opportunityProduct) {
      opportunity {
        id
      }
      product {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateOpportunityProductMutation, CreateOpportunityProductMutationVariables>;
export const UpdateOpportunityProductDocument = new TypedDocumentString(`
    mutation UpdateOpportunityProduct($opportunityId: ID!, $productId: ID!, $opportunityProduct: UpdateOpportunityProductInput!) {
  crm {
    updateOpportunityProduct(
      opportunityId: $opportunityId
      productId: $productId
      value: $opportunityProduct
    ) {
      opportunity {
        id
      }
      product {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityProductMutation, UpdateOpportunityProductMutationVariables>;
export const RemoveOpportunityProductDocument = new TypedDocumentString(`
    mutation RemoveOpportunityProduct($opportunityId: ID!, $productId: ID!) {
  crm {
    removeOpportunityProduct(opportunityId: $opportunityId, productId: $productId) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveOpportunityProductMutation, RemoveOpportunityProductMutationVariables>;
export const CreateProductDocument = new TypedDocumentString(`
    mutation CreateProduct($product: CreateProductInput!) {
  crm {
    createProduct(value: $product) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = new TypedDocumentString(`
    mutation UpdateProduct($id: ID!, $product: UpdateProductInput!) {
  crm {
    updateProduct(id: $id, value: $product) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateProductMutation, UpdateProductMutationVariables>;
export const RemoveProductDocument = new TypedDocumentString(`
    mutation RemoveProduct($id: ID!) {
  crm {
    removeProduct(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveProductMutation, RemoveProductMutationVariables>;
export const TableProductDocument = new TypedDocumentString(`
    query TableProduct($page: Int, $perPage: Int, $search: String, $type: ProductType) {
  crm {
    products(page: $page, perPage: $perPage, search: $search, type: $type) {
      createdAt
      description
      id
      name
      price
      sku
      type
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<TableProductQuery, TableProductQueryVariables>;
export const SearchProductsDocument = new TypedDocumentString(`
    query SearchProducts($search: String!) {
  crm {
    products(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<SearchProductsQuery, SearchProductsQueryVariables>;
export const CreateCustomerTrackingLinkDocument = new TypedDocumentString(`
    mutation CreateCustomerTrackingLink($customerTrackingLink: CreateCustomerTrackingLinkInput!) {
  dms {
    createCustomerTrackingLink(value: $customerTrackingLink) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCustomerTrackingLinkMutation, CreateCustomerTrackingLinkMutationVariables>;
export const UpdateCustomerTrackingLinkDocument = new TypedDocumentString(`
    mutation UpdateCustomerTrackingLink($id: ID!, $customerTrackingLink: UpdateCustomerTrackingLinkInput!) {
  dms {
    updateCustomerTrackingLink(id: $id, value: $customerTrackingLink) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCustomerTrackingLinkMutation, UpdateCustomerTrackingLinkMutationVariables>;
export const RemoveCustomerTrackingLinkDocument = new TypedDocumentString(`
    mutation RemoveCustomerTrackingLink($id: ID!) {
  dms {
    removeCustomerTrackingLink(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveCustomerTrackingLinkMutation, RemoveCustomerTrackingLinkMutationVariables>;
export const TableCustomerTrackingLinkDocument = new TypedDocumentString(`
    query TableCustomerTrackingLink($page: Int, $perPage: Int, $search: String) {
  dms {
    customerTrackingLinks(page: $page, perPage: $perPage, search: $search) {
      accessCount
      createdAt
      expiresAt
      id
      isActive
      lastAccessedAt
      trackingToken
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<TableCustomerTrackingLinkQuery, TableCustomerTrackingLinkQueryVariables>;
export const SearchCustomerTrackingLinksDocument = new TypedDocumentString(`
    query SearchCustomerTrackingLinks($search: String!) {
  dms {
    customerTrackingLinks(page: 1, perPage: 10, search: $search) {
      value: id
      label: trackingToken
    }
  }
}
    `) as unknown as TypedDocumentString<SearchCustomerTrackingLinksQuery, SearchCustomerTrackingLinksQueryVariables>;
export const CreateDeliveryRouteDocument = new TypedDocumentString(`
    mutation CreateDeliveryRoute($deliveryRoute: CreateDeliveryRouteInput!) {
  dms {
    createDeliveryRoute(value: $deliveryRoute) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateDeliveryRouteMutation, CreateDeliveryRouteMutationVariables>;
export const UpdateDeliveryRouteDocument = new TypedDocumentString(`
    mutation UpdateDeliveryRoute($id: ID!, $deliveryRoute: UpdateDeliveryRouteInput!) {
  dms {
    updateDeliveryRoute(id: $id, value: $deliveryRoute) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateDeliveryRouteMutation, UpdateDeliveryRouteMutationVariables>;
export const RemoveDeliveryRouteDocument = new TypedDocumentString(`
    mutation RemoveDeliveryRoute($id: ID!) {
  dms {
    removeDeliveryRoute(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveDeliveryRouteMutation, RemoveDeliveryRouteMutationVariables>;
export const TableDeliveryDocument = new TypedDocumentString(`
    query TableDelivery($page: Int, $perPage: Int, $search: String, $status: DeliveryRouteStatus) {
  dms {
    deliveryRoutes(page: $page, perPage: $perPage, search: $search, status: $status) {
      actualDurationMinutes
      completedAt
      createdAt
      estimatedDurationMinutes
      id
      optimizedRouteData
      routeDate
      startedAt
      status
      totalDistanceKm
      updatedAt
      driver {
        id
        user {
          email
          id
          image
          name
        }
        status
        licenseNumber
        contactPhone
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableDeliveryQuery, TableDeliveryQueryVariables>;
export const SearchDeliveryRoutesDocument = new TypedDocumentString(`
    query SearchDeliveryRoutes($search: String!) {
  dms {
    deliveryRoutes(page: 1, perPage: 10, search: $search) {
      value: id
      label: routeDate
    }
  }
}
    `) as unknown as TypedDocumentString<SearchDeliveryRoutesQuery, SearchDeliveryRoutesQueryVariables>;
export const CreateDeliveryTaskDocument = new TypedDocumentString(`
    mutation CreateDeliveryTask($deliveryTask: CreateDeliveryTaskInput!) {
  dms {
    createDeliveryTask(value: $deliveryTask) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateDeliveryTaskMutation, CreateDeliveryTaskMutationVariables>;
export const UpdateDeliveryTaskDocument = new TypedDocumentString(`
    mutation UpdateDeliveryTask($id: ID!, $deliveryTask: UpdateDeliveryTaskInput!) {
  dms {
    updateDeliveryTask(id: $id, value: $deliveryTask) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateDeliveryTaskMutation, UpdateDeliveryTaskMutationVariables>;
export const RemoveDeliveryTaskDocument = new TypedDocumentString(`
    mutation RemoveDeliveryTask($id: ID!) {
  dms {
    removeDeliveryTask(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveDeliveryTaskMutation, RemoveDeliveryTaskMutationVariables>;
export const TableDeliveryTaskDocument = new TypedDocumentString(`
    query TableDeliveryTask($page: Int, $perPage: Int, $search: String, $status: DeliveryTaskStatus, $failureReason: DeliveryFailureReason) {
  dms {
    deliveryTasks(
      failureReason: $failureReason
      page: $page
      perPage: $perPage
      search: $search
      status: $status
    ) {
      actualArrivalTime
      attemptCount
      createdAt
      deliveryAddress
      deliveryInstructions
      deliveryTime
      estimatedArrivalTime
      failureReason
      id
      recipientName
      recipientPhone
      routeSequence
      status
      updatedAt
      deliveryRoute {
        id
        totalDistanceKm
        optimizedRouteData
        status
        driver {
          id
          user {
            email
            id
            image
            name
          }
          licenseNumber
          status
          contactPhone
        }
      }
      package {
        id
        carrier
        packageNumber
        trackingNumber
        warehouse {
          id
          address
          country
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableDeliveryTaskQuery, TableDeliveryTaskQueryVariables>;
export const SearchDeliveryTasksDocument = new TypedDocumentString(`
    query SearchDeliveryTasks($search: String!) {
  dms {
    deliveryTasks(page: 1, perPage: 10, search: $search) {
      value: id
      label: recipientName
    }
  }
}
    `) as unknown as TypedDocumentString<SearchDeliveryTasksQuery, SearchDeliveryTasksQueryVariables>;
export const CreateDriverLocationDocument = new TypedDocumentString(`
    mutation CreateDriverLocation($driverLocation: CreateDriverLocationInput!) {
  dms {
    createDriverLocation(value: $driverLocation) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateDriverLocationMutation, CreateDriverLocationMutationVariables>;
export const UpdateDriverLocationDocument = new TypedDocumentString(`
    mutation UpdateDriverLocation($id: ID!, $driverLocation: UpdateDriverLocationInput!) {
  dms {
    updateDriverLocation(id: $id, value: $driverLocation) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateDriverLocationMutation, UpdateDriverLocationMutationVariables>;
export const RemoveDriverLocationDocument = new TypedDocumentString(`
    mutation RemoveDriverLocation($id: ID!) {
  dms {
    removeDriverLocation(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveDriverLocationMutation, RemoveDriverLocationMutationVariables>;
export const TableDriverLocationDocument = new TypedDocumentString(`
    query TableDriverLocation($page: Int, $perPage: Int) {
  dms {
    driverLocations(page: $page, perPage: $perPage) {
      accuracy
      altitude
      createdAt
      heading
      id
      latitude
      longitude
      speedKmh
      timestamp
      updatedAt
      driver {
        id
        contactPhone
        licenseExpiryDate
        licenseNumber
        user {
          email
          id
          image
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableDriverLocationQuery, TableDriverLocationQueryVariables>;
export const CreateDmsProofOfDeliveryDocument = new TypedDocumentString(`
    mutation CreateDmsProofOfDelivery($dmsProofOfDelivery: CreateDmsProofOfDeliveryInput!) {
  dms {
    createDmsProofOfDelivery(value: $dmsProofOfDelivery) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateDmsProofOfDeliveryMutation, CreateDmsProofOfDeliveryMutationVariables>;
export const UpdateDmsProofOfDeliveryDocument = new TypedDocumentString(`
    mutation UpdateDmsProofOfDelivery($id: ID!, $dmsProofOfDelivery: UpdateDmsProofOfDeliveryInput!) {
  dms {
    updateDmsProofOfDelivery(id: $id, value: $dmsProofOfDelivery) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateDmsProofOfDeliveryMutation, UpdateDmsProofOfDeliveryMutationVariables>;
export const RemoveDmsProofOfDeliveryDocument = new TypedDocumentString(`
    mutation RemoveDmsProofOfDelivery($id: ID!) {
  dms {
    removeDmsProofOfDelivery(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveDmsProofOfDeliveryMutation, RemoveDmsProofOfDeliveryMutationVariables>;
export const TableProofOfDeliveryDocument = new TypedDocumentString(`
    query TableProofOfDelivery($page: Int, $perPage: Int, $search: String, $type: ProofOfDeliveryType) {
  dms {
    dmsProofOfDeliveries(
      page: $page
      perPage: $perPage
      search: $search
      type: $type
    ) {
      createdAt
      filePath
      id
      latitude
      longitude
      recipientName
      signatureData
      timestamp
      type
      updatedAt
      verificationCode
      deliveryTask {
        package {
          id
          packageNumber
          packageType
          requiresSignature
          trackingNumber
          warehouse {
            id
            address
            city
            country
          }
        }
        actualArrivalTime
        deliveryInstructions
        deliveryAddress
        failureReason
        recipientName
        recipientPhone
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableProofOfDeliveryQuery, TableProofOfDeliveryQueryVariables>;
export const SearchDmsProofOfDeliveriesDocument = new TypedDocumentString(`
    query SearchDmsProofOfDeliveries($search: String!) {
  dms {
    dmsProofOfDeliveries(page: 1, perPage: 10, search: $search) {
      value: id
      label: recipientName
    }
  }
}
    `) as unknown as TypedDocumentString<SearchDmsProofOfDeliveriesQuery, SearchDmsProofOfDeliveriesQueryVariables>;
export const CreateTaskEventDocument = new TypedDocumentString(`
    mutation CreateTaskEvent($taskEvent: CreateTaskEventInput!) {
  dms {
    createTaskEvent(value: $taskEvent) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateTaskEventMutation, CreateTaskEventMutationVariables>;
export const UpdateTaskEventDocument = new TypedDocumentString(`
    mutation UpdateTaskEvent($id: ID!, $taskEvent: UpdateTaskEventInput!) {
  dms {
    updateTaskEvent(id: $id, value: $taskEvent) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateTaskEventMutation, UpdateTaskEventMutationVariables>;
export const RemoveTaskEventDocument = new TypedDocumentString(`
    mutation RemoveTaskEvent($id: ID!) {
  dms {
    removeTaskEvent(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveTaskEventMutation, RemoveTaskEventMutationVariables>;
export const TableTaskEventDocument = new TypedDocumentString(`
    query TableTaskEvent($page: Int, $perPage: Int, $search: String, $status: TaskEventStatus) {
  dms {
    taskEvents(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      id
      latitude
      longitude
      notes
      reason
      status
      timestamp
      updatedAt
      deliveryTask {
        id
        recipientName
        recipientPhone
        deliveryInstructions
        deliveryAddress
        status
        package {
          id
          trackingNumber
          packageNumber
          packageType
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableTaskEventQuery, TableTaskEventQueryVariables>;
export const SearchTaskEventsDocument = new TypedDocumentString(`
    query SearchTaskEvents($search: String!) {
  dms {
    taskEvents(page: 1, perPage: 10, search: $search) {
      value: id
      label: reason
    }
  }
}
    `) as unknown as TypedDocumentString<SearchTaskEventsQuery, SearchTaskEventsQueryVariables>;
export const CreateCarrierRateDocument = new TypedDocumentString(`
    mutation CreateCarrierRate($carrierRate: CreateCarrierRateInput!) {
  tms {
    createCarrierRate(value: $carrierRate) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCarrierRateMutation, CreateCarrierRateMutationVariables>;
export const UpdateCarrierRateDocument = new TypedDocumentString(`
    mutation UpdateCarrierRate($id: ID!, $carrierRate: UpdateCarrierRateInput!) {
  tms {
    updateCarrierRate(id: $id, value: $carrierRate) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCarrierRateMutation, UpdateCarrierRateMutationVariables>;
export const RemoveCarrierRateDocument = new TypedDocumentString(`
    mutation RemoveCarrierRate($id: ID!) {
  tms {
    removeCarrierRate(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveCarrierRateMutation, RemoveCarrierRateMutationVariables>;
export const CreateCarrierDocument = new TypedDocumentString(`
    mutation CreateCarrier($carrier: CreateCarrierInput!) {
  tms {
    createCarrier(value: $carrier) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCarrierMutation, CreateCarrierMutationVariables>;
export const UpdateCarrierDocument = new TypedDocumentString(`
    mutation UpdateCarrier($id: ID!, $carrier: UpdateCarrierInput!) {
  tms {
    updateCarrier(id: $id, value: $carrier) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCarrierMutation, UpdateCarrierMutationVariables>;
export const RemoveCarrierDocument = new TypedDocumentString(`
    mutation RemoveCarrier($id: ID!) {
  tms {
    removeCarrier(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveCarrierMutation, RemoveCarrierMutationVariables>;
export const TableCarrierQueryDocument = new TypedDocumentString(`
    query TableCarrierQuery($page: Int, $perPage: Int, $search: String) {
  tms {
    carriers(page: $page, perPage: $perPage, search: $search) {
      contactEmail
      contactPerson
      contactPhone
      createdAt
      id
      name
      servicesOffered
      updatedAt
      partnerInvoices {
        invoiceNumber
        invoiceDate
        status
        totalAmount
        items {
          amount
          id
          shipmentLeg {
            status
            shipment {
              trackingNumber
              carrier
              createdAt
              id
              status
              warehouseId
            }
          }
        }
      }
      rates {
        destination
        id
        origin
        rate
        serviceType
        unit
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableCarrierQueryQuery, TableCarrierQueryQueryVariables>;
export const SearchCarriersDocument = new TypedDocumentString(`
    query SearchCarriers($search: String!) {
  tms {
    carriers(search: $search, page: 1, perPage: 10) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<SearchCarriersQuery, SearchCarriersQueryVariables>;
export const CreateDriverScheduleDocument = new TypedDocumentString(`
    mutation CreateDriverSchedule($driverSchedule: CreateDriverScheduleInput!) {
  tms {
    createDriverSchedule(value: $driverSchedule) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateDriverScheduleMutation, CreateDriverScheduleMutationVariables>;
export const UpdateDriverScheduleDocument = new TypedDocumentString(`
    mutation UpdateDriverSchedule($id: ID!, $driverSchedule: UpdateDriverScheduleInput!) {
  tms {
    updateDriverSchedule(id: $id, value: $driverSchedule) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateDriverScheduleMutation, UpdateDriverScheduleMutationVariables>;
export const RemoveDriverScheduleDocument = new TypedDocumentString(`
    mutation RemoveDriverSchedule($id: ID!) {
  tms {
    removeDriverSchedule(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveDriverScheduleMutation, RemoveDriverScheduleMutationVariables>;
export const CreateDriverDocument = new TypedDocumentString(`
    mutation CreateDriver($driver: CreateDriverInput!) {
  tms {
    createDriver(value: $driver) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateDriverMutation, CreateDriverMutationVariables>;
export const UpdateDriverDocument = new TypedDocumentString(`
    mutation UpdateDriver($id: ID!, $driver: UpdateDriverInput!) {
  tms {
    updateDriver(id: $id, value: $driver) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateDriverMutation, UpdateDriverMutationVariables>;
export const RemoveDriverDocument = new TypedDocumentString(`
    mutation RemoveDriver($id: ID!) {
  tms {
    removeDriver(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveDriverMutation, RemoveDriverMutationVariables>;
export const TableDriverDocument = new TypedDocumentString(`
    query TableDriver($page: Int, $perPage: Int, $search: String, $status: DriverStatus) {
  tms {
    drivers(page: $page, perPage: $perPage, search: $search, status: $status) {
      contactPhone
      createdAt
      id
      licenseExpiryDate
      licenseNumber
      status
      updatedAt
      user {
        email
        id
        image
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableDriverQuery, TableDriverQueryVariables>;
export const SearchDriversDocument = new TypedDocumentString(`
    query SearchDrivers($search: String!) {
  tms {
    drivers(search: $search, page: 1, perPage: 10) {
      value: id
      label: licenseNumber
    }
  }
}
    `) as unknown as TypedDocumentString<SearchDriversQuery, SearchDriversQueryVariables>;
export const CreateExpenseDocument = new TypedDocumentString(`
    mutation CreateExpense($expense: CreateExpenseInput!) {
  tms {
    createExpense(value: $expense) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const UpdateExpenseDocument = new TypedDocumentString(`
    mutation UpdateExpense($id: ID!, $expense: UpdateExpenseInput!) {
  tms {
    updateExpense(id: $id, value: $expense) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const RemoveExpenseDocument = new TypedDocumentString(`
    mutation RemoveExpense($id: ID!) {
  tms {
    removeExpense(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveExpenseMutation, RemoveExpenseMutationVariables>;
export const TableExpenseDocument = new TypedDocumentString(`
    query TableExpense($page: Int, $perPage: Int, $search: String, $status: ExpenseStatus, $type: ExpenseType, $currency: Currency) {
  tms {
    expenses(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
      type: $type
      currency: $currency
    ) {
      amount
      createdAt
      currency
      description
      driver {
        user {
          email
          id
          image
          name
        }
        licenseNumber
        contactPhone
        status
      }
      expenseDate
      fuelQuantity
      id
      odometerReading
      receiptUrl
      status
      type
      updatedAt
      trip {
        createdAt
        endLocation
        startLocation
        status
        startTime
        endTime
        vehicle {
          vin
          year
          model
          make
          id
          registrationNumber
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableExpenseQuery, TableExpenseQueryVariables>;
export const SearchExpensesDocument = new TypedDocumentString(`
    query SearchExpenses($search: String!) {
  tms {
    expenses(search: $search, page: 1, perPage: 10) {
      value: id
      label: description
    }
  }
}
    `) as unknown as TypedDocumentString<SearchExpensesQuery, SearchExpensesQueryVariables>;
export const CreateGeofenceEventDocument = new TypedDocumentString(`
    mutation CreateGeofenceEvent($geofenceEvent: CreateGeofenceEventInput!) {
  tms {
    createGeofenceEvent(value: $geofenceEvent) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateGeofenceEventMutation, CreateGeofenceEventMutationVariables>;
export const UpdateGeofenceEventDocument = new TypedDocumentString(`
    mutation UpdateGeofenceEvent($id: ID!, $geofenceEvent: UpdateGeofenceEventInput!) {
  tms {
    updateGeofenceEvent(id: $id, value: $geofenceEvent) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateGeofenceEventMutation, UpdateGeofenceEventMutationVariables>;
export const RemoveGeofenceEventDocument = new TypedDocumentString(`
    mutation RemoveGeofenceEvent($id: ID!) {
  tms {
    removeGeofenceEvent(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveGeofenceEventMutation, RemoveGeofenceEventMutationVariables>;
export const CreateGeofenceDocument = new TypedDocumentString(`
    mutation CreateGeofence($geofence: CreateGeofenceInput!) {
  tms {
    createGeofence(value: $geofence) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateGeofenceMutation, CreateGeofenceMutationVariables>;
export const UpdateGeofenceDocument = new TypedDocumentString(`
    mutation UpdateGeofence($id: ID!, $geofence: UpdateGeofenceInput!) {
  tms {
    updateGeofence(id: $id, value: $geofence) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateGeofenceMutation, UpdateGeofenceMutationVariables>;
export const RemoveGeofenceDocument = new TypedDocumentString(`
    mutation RemoveGeofence($id: ID!) {
  tms {
    removeGeofence(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveGeofenceMutation, RemoveGeofenceMutationVariables>;
export const TableGeofenceDocument = new TypedDocumentString(`
    query TableGeofence($page: Int, $perPage: Int, $search: String) {
  tms {
    geofences(page: $page, perPage: $perPage, search: $search) {
      createdAt
      id
      latitude
      longitude
      name
      updatedAt
      events {
        eventType
        id
        timestamp
        vehicle {
          model
          vin
          year
          registrationNumber
          make
          id
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableGeofenceQuery, TableGeofenceQueryVariables>;
export const SearchGeofencesDocument = new TypedDocumentString(`
    query SearchGeofences($search: String!) {
  tms {
    geofences(search: $search, page: 1, perPage: 10) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<SearchGeofencesQuery, SearchGeofencesQueryVariables>;
export const CreateGpsPingDocument = new TypedDocumentString(`
    mutation CreateGpsPing($gpsPing: CreateGpsPingInput!) {
  tms {
    createGpsPing(value: $gpsPing) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateGpsPingMutation, CreateGpsPingMutationVariables>;
export const UpdateGpsPingDocument = new TypedDocumentString(`
    mutation UpdateGpsPing($id: ID!, $gpsPing: UpdateGpsPingInput!) {
  tms {
    updateGpsPing(id: $id, value: $gpsPing) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateGpsPingMutation, UpdateGpsPingMutationVariables>;
export const RemoveGpsPingDocument = new TypedDocumentString(`
    mutation RemoveGpsPing($id: ID!) {
  tms {
    removeGpsPing(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveGpsPingMutation, RemoveGpsPingMutationVariables>;
export const TableGpsPingDocument = new TypedDocumentString(`
    query TableGpsPing($page: Int, $perPage: Int) {
  tms {
    gpsPings(page: $page, perPage: $perPage) {
      id
      latitude
      longitude
      timestamp
      vehicle {
        year
        vin
        registrationNumber
        model
        make
        status
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableGpsPingQuery, TableGpsPingQueryVariables>;
export const CreatePartnerInvoiceItemDocument = new TypedDocumentString(`
    mutation CreatePartnerInvoiceItem($partnerInvoiceItem: CreatePartnerInvoiceItemInput!) {
  tms {
    createPartnerInvoiceItem(value: $partnerInvoiceItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreatePartnerInvoiceItemMutation, CreatePartnerInvoiceItemMutationVariables>;
export const UpdatePartnerInvoiceItemDocument = new TypedDocumentString(`
    mutation UpdatePartnerInvoiceItem($id: ID!, $partnerInvoiceItem: UpdatePartnerInvoiceItemInput!) {
  tms {
    updatePartnerInvoiceItem(id: $id, value: $partnerInvoiceItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdatePartnerInvoiceItemMutation, UpdatePartnerInvoiceItemMutationVariables>;
export const RemovePartnerInvoiceItemDocument = new TypedDocumentString(`
    mutation RemovePartnerInvoiceItem($id: ID!) {
  tms {
    removePartnerInvoiceItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemovePartnerInvoiceItemMutation, RemovePartnerInvoiceItemMutationVariables>;
export const CreatePartnerInvoiceDocument = new TypedDocumentString(`
    mutation CreatePartnerInvoice($partnerInvoice: CreatePartnerInvoiceInput!) {
  tms {
    createPartnerInvoice(value: $partnerInvoice) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreatePartnerInvoiceMutation, CreatePartnerInvoiceMutationVariables>;
export const UpdatePartnerInvoiceDocument = new TypedDocumentString(`
    mutation UpdatePartnerInvoice($id: ID!, $partnerInvoice: UpdatePartnerInvoiceInput!) {
  tms {
    updatePartnerInvoice(id: $id, value: $partnerInvoice) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdatePartnerInvoiceMutation, UpdatePartnerInvoiceMutationVariables>;
export const RemovePartnerInvoiceDocument = new TypedDocumentString(`
    mutation RemovePartnerInvoice($id: ID!) {
  tms {
    removePartnerInvoice(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemovePartnerInvoiceMutation, RemovePartnerInvoiceMutationVariables>;
export const TablePartnerInvoiceDocument = new TypedDocumentString(`
    query TablePartnerInvoice($page: Int, $perPage: Int, $search: String, $status: PartnerInvoiceStatus) {
  tms {
    partnerInvoices(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
    ) {
      createdAt
      id
      invoiceDate
      invoiceNumber
      status
      totalAmount
      updatedAt
      items {
        amount
        id
        shipmentLeg {
          startLocation
          endLocation
          shipment {
            trackingNumber
            carrier
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TablePartnerInvoiceQuery, TablePartnerInvoiceQueryVariables>;
export const SearchPartnerInvoicesDocument = new TypedDocumentString(`
    query SearchPartnerInvoices($search: String!) {
  tms {
    partnerInvoices(search: $search, page: 1, perPage: 10) {
      value: id
      label: invoiceNumber
    }
  }
}
    `) as unknown as TypedDocumentString<SearchPartnerInvoicesQuery, SearchPartnerInvoicesQueryVariables>;
export const CreateProofOfDeliveryDocument = new TypedDocumentString(`
    mutation CreateProofOfDelivery($proofOfDelivery: CreateProofOfDeliveryInput!) {
  tms {
    createProofOfDelivery(value: $proofOfDelivery) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateProofOfDeliveryMutation, CreateProofOfDeliveryMutationVariables>;
export const UpdateProofOfDeliveryDocument = new TypedDocumentString(`
    mutation UpdateProofOfDelivery($id: ID!, $proofOfDelivery: UpdateProofOfDeliveryInput!) {
  tms {
    updateProofOfDelivery(id: $id, value: $proofOfDelivery) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateProofOfDeliveryMutation, UpdateProofOfDeliveryMutationVariables>;
export const RemoveProofOfDeliveryDocument = new TypedDocumentString(`
    mutation RemoveProofOfDelivery($id: ID!) {
  tms {
    removeProofOfDelivery(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveProofOfDeliveryMutation, RemoveProofOfDeliveryMutationVariables>;
export const TableTmsProofOfDeliveryDocument = new TypedDocumentString(`
    query TableTmsProofOfDelivery($page: Int, $perPage: Int, $search: String, $type: ProofType) {
  tms {
    proofOfDeliveries(page: $page, perPage: $perPage, search: $search, type: $type) {
      createdAt
      filePath
      id
      latitude
      longitude
      timestamp
      type
      updatedAt
      tripStop {
        actualArrivalTime
        actualDepartureTime
        address
        status
        id
        shipment {
          trackingNumber
          status
          carrier
          id
        }
        trip {
          endLocation
          startLocation
          status
          vehicle {
            registrationNumber
            vin
            year
            make
            model
            gpsPings {
              latitude
              longitude
              timestamp
              id
            }
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableTmsProofOfDeliveryQuery, TableTmsProofOfDeliveryQueryVariables>;
export const SearchProofOfDeliveriesDocument = new TypedDocumentString(`
    query SearchProofOfDeliveries($search: String!) {
  tms {
    proofOfDeliveries(search: $search, page: 1, perPage: 10) {
      value: id
      label: filePath
    }
  }
}
    `) as unknown as TypedDocumentString<SearchProofOfDeliveriesQuery, SearchProofOfDeliveriesQueryVariables>;
export const CreateRouteDocument = new TypedDocumentString(`
    mutation CreateRoute($route: CreateRouteInput!) {
  tms {
    createRoute(value: $route) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateRouteMutation, CreateRouteMutationVariables>;
export const UpdateRouteDocument = new TypedDocumentString(`
    mutation UpdateRoute($id: ID!, $route: UpdateRouteInput!) {
  tms {
    updateRoute(id: $id, value: $route) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateRouteMutation, UpdateRouteMutationVariables>;
export const RemoveRouteDocument = new TypedDocumentString(`
    mutation RemoveRoute($id: ID!) {
  tms {
    removeRoute(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveRouteMutation, RemoveRouteMutationVariables>;
export const TableRouteDocument = new TypedDocumentString(`
    query TableRoute($page: Int, $perPage: Int, $search: String) {
  tms {
    routes(page: $page, perPage: $perPage, search: $search) {
      optimizedRouteData
      totalDistance
      totalDuration
      id
      trip {
        startLocation
        endTime
        endLocation
        createdAt
        startTime
        status
        updatedAt
        driver {
          user {
            email
            id
            image
            name
          }
          licenseNumber
          contactPhone
          id
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableRouteQuery, TableRouteQueryVariables>;
export const CreateShipmentLegEventDocument = new TypedDocumentString(`
    mutation CreateShipmentLegEvent($shipmentLegEvent: CreateShipmentLegEventInput!) {
  tms {
    createShipmentLegEvent(value: $shipmentLegEvent) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateShipmentLegEventMutation, CreateShipmentLegEventMutationVariables>;
export const UpdateShipmentLegEventDocument = new TypedDocumentString(`
    mutation UpdateShipmentLegEvent($id: ID!, $shipmentLegEvent: UpdateShipmentLegEventInput!) {
  tms {
    updateShipmentLegEvent(id: $id, value: $shipmentLegEvent) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateShipmentLegEventMutation, UpdateShipmentLegEventMutationVariables>;
export const RemoveShipmentLegEventDocument = new TypedDocumentString(`
    mutation RemoveShipmentLegEvent($id: ID!) {
  tms {
    removeShipmentLegEvent(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveShipmentLegEventMutation, RemoveShipmentLegEventMutationVariables>;
export const CreateShipmentLegDocument = new TypedDocumentString(`
    mutation CreateShipmentLeg($shipmentLeg: CreateShipmentLegInput!) {
  tms {
    createShipmentLeg(value: $shipmentLeg) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateShipmentLegMutation, CreateShipmentLegMutationVariables>;
export const UpdateShipmentLegDocument = new TypedDocumentString(`
    mutation UpdateShipmentLeg($id: ID!, $shipmentLeg: UpdateShipmentLegInput!) {
  tms {
    updateShipmentLeg(id: $id, value: $shipmentLeg) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateShipmentLegMutation, UpdateShipmentLegMutationVariables>;
export const RemoveShipmentLegDocument = new TypedDocumentString(`
    mutation RemoveShipmentLeg($id: ID!) {
  tms {
    removeShipmentLeg(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveShipmentLegMutation, RemoveShipmentLegMutationVariables>;
export const TableShipmentLegQueryDocument = new TypedDocumentString(`
    query TableShipmentLegQuery($page: Int, $perPage: Int, $search: String, $status: ShipmentLegStatus) {
  tms {
    shipmentLegs(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      endLocation
      id
      legSequence
      startLocation
      status
      updatedAt
      shipment {
        trackingNumber
        carrier
        status
      }
      partnerInvoiceItems {
        amount
        id
      }
      events {
        location
        statusMessage
        eventTimestamp
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableShipmentLegQueryQuery, TableShipmentLegQueryQueryVariables>;
export const SearchShipmentLegsDocument = new TypedDocumentString(`
    query SearchShipmentLegs($search: String!) {
  tms {
    shipmentLegs(search: $search, page: 1, perPage: 10) {
      value: id
      label: startLocation
    }
  }
}
    `) as unknown as TypedDocumentString<SearchShipmentLegsQuery, SearchShipmentLegsQueryVariables>;
export const CreateTripStopDocument = new TypedDocumentString(`
    mutation CreateTripStop($tripStop: CreateTripStopInput!) {
  tms {
    createTripStop(value: $tripStop) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateTripStopMutation, CreateTripStopMutationVariables>;
export const UpdateTripStopDocument = new TypedDocumentString(`
    mutation UpdateTripStop($id: ID!, $tripStop: UpdateTripStopInput!) {
  tms {
    updateTripStop(id: $id, value: $tripStop) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateTripStopMutation, UpdateTripStopMutationVariables>;
export const RemoveTripStopDocument = new TypedDocumentString(`
    mutation RemoveTripStop($id: ID!) {
  tms {
    removeTripStop(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveTripStopMutation, RemoveTripStopMutationVariables>;
export const CreateTripDocument = new TypedDocumentString(`
    mutation CreateTrip($trip: CreateTripInput!) {
  tms {
    createTrip(value: $trip) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateTripMutation, CreateTripMutationVariables>;
export const UpdateTripDocument = new TypedDocumentString(`
    mutation UpdateTrip($id: ID!, $trip: UpdateTripInput!) {
  tms {
    updateTrip(id: $id, value: $trip) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateTripMutation, UpdateTripMutationVariables>;
export const RemoveTripDocument = new TypedDocumentString(`
    mutation RemoveTrip($id: ID!) {
  tms {
    removeTrip(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveTripMutation, RemoveTripMutationVariables>;
export const TableTripDocument = new TypedDocumentString(`
    query TableTrip($page: Int, $perPage: Int, $search: String, $status: TripStatus) {
  tms {
    trips(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      endLocation
      endTime
      id
      startLocation
      startTime
      status
      updatedAt
      driver {
        user {
          email
          id
          image
          name
        }
        licenseNumber
        contactPhone
        status
      }
      vehicle {
        vin
        year
        registrationNumber
        model
        make
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableTripQuery, TableTripQueryVariables>;
export const SearchTripsDocument = new TypedDocumentString(`
    query SearchTrips($search: String!) {
  tms {
    trips(search: $search, page: 1, perPage: 10) {
      value: id
      label: startLocation
    }
  }
}
    `) as unknown as TypedDocumentString<SearchTripsQuery, SearchTripsQueryVariables>;
export const CreateVehicleMaintenanceDocument = new TypedDocumentString(`
    mutation CreateVehicleMaintenance($vehicleMaintenance: CreateVehicleMaintenanceInput!) {
  tms {
    createVehicleMaintenance(value: $vehicleMaintenance) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateVehicleMaintenanceMutation, CreateVehicleMaintenanceMutationVariables>;
export const UpdateVehicleMaintenanceDocument = new TypedDocumentString(`
    mutation UpdateVehicleMaintenance($id: ID!, $vehicleMaintenance: UpdateVehicleMaintenanceInput!) {
  tms {
    updateVehicleMaintenance(id: $id, value: $vehicleMaintenance) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateVehicleMaintenanceMutation, UpdateVehicleMaintenanceMutationVariables>;
export const RemoveVehicleMaintenanceDocument = new TypedDocumentString(`
    mutation RemoveVehicleMaintenance($id: ID!) {
  tms {
    removeVehicleMaintenance(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveVehicleMaintenanceMutation, RemoveVehicleMaintenanceMutationVariables>;
export const CreateVehicleDocument = new TypedDocumentString(`
    mutation CreateVehicle($vehicle: CreateVehicleInput!) {
  tms {
    createVehicle(value: $vehicle) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateVehicleMutation, CreateVehicleMutationVariables>;
export const UpdateVehicleDocument = new TypedDocumentString(`
    mutation UpdateVehicle($id: ID!, $vehicle: UpdateVehicleInput!) {
  tms {
    updateVehicle(id: $id, value: $vehicle) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateVehicleMutation, UpdateVehicleMutationVariables>;
export const RemoveVehicleDocument = new TypedDocumentString(`
    mutation RemoveVehicle($id: ID!) {
  tms {
    removeVehicle(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveVehicleMutation, RemoveVehicleMutationVariables>;
export const TableVehicleDocument = new TypedDocumentString(`
    query TableVehicle($page: Int, $perPage: Int, $search: String, $status: VehicleStatus) {
  tms {
    vehicles(page: $page, perPage: $perPage, search: $search, status: $status) {
      capacityVolume
      capacityWeight
      createdAt
      currentMileage
      id
      lastMaintenanceDate
      make
      model
      registrationNumber
      status
      updatedAt
      vin
      year
      maintenances {
        cost
        createdAt
        id
        notes
        serviceDate
        serviceType
        updatedAt
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableVehicleQuery, TableVehicleQueryVariables>;
export const SearchVehiclesDocument = new TypedDocumentString(`
    query SearchVehicles($search: String!) {
  tms {
    vehicles(search: $search, page: 1, perPage: 10) {
      value: id
      label: registrationNumber
    }
  }
}
    `) as unknown as TypedDocumentString<SearchVehiclesQuery, SearchVehiclesQueryVariables>;
export const CreateBinThresholdDocument = new TypedDocumentString(`
    mutation CreateBinThreshold($binThreshold: CreateBinThresholdInput!) {
  wms {
    createBinThreshold(value: $binThreshold) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateBinThresholdMutation, CreateBinThresholdMutationVariables>;
export const UpdateBinThresholdDocument = new TypedDocumentString(`
    mutation UpdateBinThreshold($id: ID!, $binThreshold: UpdateBinThresholdInput!) {
  wms {
    updateBinThreshold(id: $id, value: $binThreshold) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateBinThresholdMutation, UpdateBinThresholdMutationVariables>;
export const RemoveBinThresholdDocument = new TypedDocumentString(`
    mutation RemoveBinThreshold($id: ID!) {
  wms {
    removeBinThreshold(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveBinThresholdMutation, RemoveBinThresholdMutationVariables>;
export const TableBinThresholdDocument = new TypedDocumentString(`
    query TableBinThreshold($page: Int, $perPage: Int) {
  wms {
    binThresholds(page: $page, perPage: $perPage) {
      alertThreshold
      createdAt
      id
      isActive
      maxQuantity
      minQuantity
      reorderQuantity
      updatedAt
      product {
        name
        description
        id
        sku
        status
        barcode
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableBinThresholdQuery, TableBinThresholdQueryVariables>;
export const CreateInboundShipmentItemDocument = new TypedDocumentString(`
    mutation CreateInboundShipmentItem($inboundShipmentItem: CreateInboundShipmentItemInput!) {
  wms {
    createInboundShipmentItem(value: $inboundShipmentItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInboundShipmentItemMutation, CreateInboundShipmentItemMutationVariables>;
export const UpdateInboundShipmentItemDocument = new TypedDocumentString(`
    mutation UpdateInboundShipmentItem($id: ID!, $inboundShipmentItem: UpdateInboundShipmentItemInput!) {
  wms {
    updateInboundShipmentItem(id: $id, value: $inboundShipmentItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInboundShipmentItemMutation, UpdateInboundShipmentItemMutationVariables>;
export const RemoveInboundShipmentItemDocument = new TypedDocumentString(`
    mutation RemoveInboundShipmentItem($id: ID!) {
  wms {
    removeInboundShipmentItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveInboundShipmentItemMutation, RemoveInboundShipmentItemMutationVariables>;
export const CreateInboundShipmentDocument = new TypedDocumentString(`
    mutation CreateInboundShipment($inboundShipment: CreateInboundShipmentInput!) {
  wms {
    createInboundShipment(value: $inboundShipment) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInboundShipmentMutation, CreateInboundShipmentMutationVariables>;
export const UpdateInboundShipmentDocument = new TypedDocumentString(`
    mutation UpdateInboundShipment($id: ID!, $inboundShipment: UpdateInboundShipmentInput!) {
  wms {
    updateInboundShipment(id: $id, value: $inboundShipment) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInboundShipmentMutation, UpdateInboundShipmentMutationVariables>;
export const RemoveInboundShipmentDocument = new TypedDocumentString(`
    mutation RemoveInboundShipment($id: ID!) {
  wms {
    removeInboundShipment(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveInboundShipmentMutation, RemoveInboundShipmentMutationVariables>;
export const TableInboundShipmentDocument = new TypedDocumentString(`
    query TableInboundShipment($page: Int, $perPage: Int, $status: InboundShipmentStatus) {
  wms {
    inboundShipments(page: $page, perPage: $perPage, status: $status) {
      actualArrivalDate
      createdAt
      expectedArrivalDate
      id
      status
      updatedAt
      client {
        name
        industry
        phoneNumber
        country
        website
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableInboundShipmentQuery, TableInboundShipmentQueryVariables>;
export const CreateInventoryAdjustmentDocument = new TypedDocumentString(`
    mutation CreateInventoryAdjustment($inventoryAdjustment: CreateInventoryAdjustmentInput!) {
  wms {
    createInventoryAdjustment(value: $inventoryAdjustment) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInventoryAdjustmentMutation, CreateInventoryAdjustmentMutationVariables>;
export const UpdateInventoryAdjustmentDocument = new TypedDocumentString(`
    mutation UpdateInventoryAdjustment($id: ID!, $inventoryAdjustment: UpdateInventoryAdjustmentInput!) {
  wms {
    updateInventoryAdjustment(id: $id, value: $inventoryAdjustment) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInventoryAdjustmentMutation, UpdateInventoryAdjustmentMutationVariables>;
export const RemoveInventoryAdjustmentDocument = new TypedDocumentString(`
    mutation RemoveInventoryAdjustment($id: ID!) {
  wms {
    removeInventoryAdjustment(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveInventoryAdjustmentMutation, RemoveInventoryAdjustmentMutationVariables>;
export const TableInventoryAdjustmentDocument = new TypedDocumentString(`
    query TableInventoryAdjustment($page: Int, $perPage: Int, $reason: InventoryAdjustmentReason, $search: String) {
  wms {
    inventoryAdjustments(
      page: $page
      perPage: $perPage
      reason: $reason
      search: $search
    ) {
      createdAt
      id
      notes
      quantityChange
      reason
      updatedAt
      warehouseId
      user {
        email
        id
        image
        name
      }
      product {
        barcode
        description
        id
        name
        sku
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableInventoryAdjustmentQuery, TableInventoryAdjustmentQueryVariables>;
export const SearchInventoryAdjustmentsDocument = new TypedDocumentString(`
    query SearchInventoryAdjustments($search: String!) {
  wms {
    inventoryAdjustments(search: $search, page: 1, perPage: 10) {
      value: id
      label: notes
    }
  }
}
    `) as unknown as TypedDocumentString<SearchInventoryAdjustmentsQuery, SearchInventoryAdjustmentsQueryVariables>;
export const CreateInventoryBatchDocument = new TypedDocumentString(`
    mutation CreateInventoryBatch($inventoryBatch: CreateInventoryBatchInput!) {
  wms {
    createInventoryBatch(value: $inventoryBatch) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInventoryBatchMutation, CreateInventoryBatchMutationVariables>;
export const UpdateInventoryBatchDocument = new TypedDocumentString(`
    mutation UpdateInventoryBatch($id: ID!, $inventoryBatch: UpdateInventoryBatchInput!) {
  wms {
    updateInventoryBatch(id: $id, value: $inventoryBatch) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInventoryBatchMutation, UpdateInventoryBatchMutationVariables>;
export const RemoveInventoryBatchDocument = new TypedDocumentString(`
    mutation RemoveInventoryBatch($id: ID!) {
  wms {
    removeInventoryBatch(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveInventoryBatchMutation, RemoveInventoryBatchMutationVariables>;
export const TableInventoryBatchDocument = new TypedDocumentString(`
    query TableInventoryBatch($page: Int, $perPage: Int, $search: String) {
  wms {
    inventoryBatches(page: $page, perPage: $perPage, search: $search) {
      batchNumber
      createdAt
      expirationDate
      id
      updatedAt
      inventoryStock {
        availableQuantity
        product {
          barcode
          name
          sku
          status
          description
          id
          costPrice
        }
        quantity
        reservedQuantity
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableInventoryBatchQuery, TableInventoryBatchQueryVariables>;
export const CreateInventoryStockDocument = new TypedDocumentString(`
    mutation CreateInventoryStock($inventoryStock: CreateInventoryStockInput!) {
  wms {
    createInventoryStock(value: $inventoryStock) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInventoryStockMutation, CreateInventoryStockMutationVariables>;
export const UpdateInventoryStockDocument = new TypedDocumentString(`
    mutation UpdateInventoryStock($id: ID!, $inventoryStock: UpdateInventoryStockInput!) {
  wms {
    updateInventoryStock(id: $id, value: $inventoryStock) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInventoryStockMutation, UpdateInventoryStockMutationVariables>;
export const RemoveInventoryStockDocument = new TypedDocumentString(`
    mutation RemoveInventoryStock($id: ID!) {
  wms {
    removeInventoryStock(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveInventoryStockMutation, RemoveInventoryStockMutationVariables>;
export const TableInventoryStockDocument = new TypedDocumentString(`
    query TableInventoryStock($page: Int, $perPage: Int, $status: InventoryStockStatus) {
  wms {
    inventoryStocks(page: $page, perPage: $perPage, status: $status) {
      availableQuantity
      createdAt
      id
      lastCountedAt
      lastMovementAt
      quantity
      reservedQuantity
      status
      updatedAt
      product {
        barcode
        costPrice
        description
        id
        name
        status
        sku
        volume
        weight
        width
      }
      location {
        id
        barcode
        isActive
        isPickable
        isReceivable
        level
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableInventoryStockQuery, TableInventoryStockQueryVariables>;
export const CreateLocationDocument = new TypedDocumentString(`
    mutation CreateLocation($location: CreateLocationInput!) {
  wms {
    createLocation(value: $location) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateLocationMutation, CreateLocationMutationVariables>;
export const UpdateLocationDocument = new TypedDocumentString(`
    mutation UpdateLocation($id: ID!, $location: UpdateLocationInput!) {
  wms {
    updateLocation(id: $id, value: $location) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const RemoveLocationDocument = new TypedDocumentString(`
    mutation RemoveLocation($id: ID!) {
  wms {
    removeLocation(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveLocationMutation, RemoveLocationMutationVariables>;
export const TableLocationDocument = new TypedDocumentString(`
    query TableLocation($page: Int, $perPage: Int, $search: String, $type: LocationType) {
  wms {
    locations(page: $page, perPage: $perPage, search: $search, type: $type) {
      barcode
      createdAt
      isActive
      isPickable
      isReceivable
      id
      hazmatApproved
      level
      maxPallets
      maxVolume
      maxWeight
      name
      path
      temperatureControlled
      type
      updatedAt
      xCoordinate
      yCoordinate
      zCoordinate
      parentLocation {
        id
        name
        path
      }
      warehouse {
        address
        city
        name
        id
        isActive
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableLocationQuery, TableLocationQueryVariables>;
export const CreateOutboundShipmentItemDocument = new TypedDocumentString(`
    mutation CreateOutboundShipmentItem($outboundShipmentItem: CreateOutboundShipmentItemInput!) {
  wms {
    createOutboundShipmentItem(value: $outboundShipmentItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateOutboundShipmentItemMutation, CreateOutboundShipmentItemMutationVariables>;
export const UpdateOutboundShipmentItemDocument = new TypedDocumentString(`
    mutation UpdateOutboundShipmentItem($id: ID!, $outboundShipmentItem: UpdateOutboundShipmentItemInput!) {
  wms {
    updateOutboundShipmentItem(id: $id, value: $outboundShipmentItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOutboundShipmentItemMutation, UpdateOutboundShipmentItemMutationVariables>;
export const RemoveOutboundShipmentItemDocument = new TypedDocumentString(`
    mutation RemoveOutboundShipmentItem($id: ID!) {
  wms {
    removeOutboundShipmentItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveOutboundShipmentItemMutation, RemoveOutboundShipmentItemMutationVariables>;
export const CreateOutboundShipmentDocument = new TypedDocumentString(`
    mutation CreateOutboundShipment($outboundShipment: CreateOutboundShipmentInput!) {
  wms {
    createOutboundShipment(value: $outboundShipment) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateOutboundShipmentMutation, CreateOutboundShipmentMutationVariables>;
export const UpdateOutboundShipmentDocument = new TypedDocumentString(`
    mutation UpdateOutboundShipment($id: ID!, $outboundShipment: UpdateOutboundShipmentInput!) {
  wms {
    updateOutboundShipment(id: $id, value: $outboundShipment) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOutboundShipmentMutation, UpdateOutboundShipmentMutationVariables>;
export const RemoveOutboundShipmentDocument = new TypedDocumentString(`
    mutation RemoveOutboundShipment($id: ID!) {
  wms {
    removeOutboundShipment(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveOutboundShipmentMutation, RemoveOutboundShipmentMutationVariables>;
export const TableOutboundShipmentDocument = new TypedDocumentString(`
    query TableOutboundShipment($page: Int, $perPage: Int, $search: String, $status: OutboundShipmentStatus) {
  wms {
    outboundShipments(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
    ) {
      carrier
      createdAt
      id
      status
      trackingNumber
      updatedAt
      warehouseId
      salesOrder {
        id
        orderNumber
        shippingAddress
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableOutboundShipmentQuery, TableOutboundShipmentQueryVariables>;
export const CreatePackageItemDocument = new TypedDocumentString(`
    mutation CreatePackageItem($packageItem: CreatePackageItemInput!) {
  wms {
    createPackageItem(value: $packageItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreatePackageItemMutation, CreatePackageItemMutationVariables>;
export const UpdatePackageItemDocument = new TypedDocumentString(`
    mutation UpdatePackageItem($id: ID!, $packageItem: UpdatePackageItemInput!) {
  wms {
    updatePackageItem(id: $id, value: $packageItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdatePackageItemMutation, UpdatePackageItemMutationVariables>;
export const RemovePackageItemDocument = new TypedDocumentString(`
    mutation RemovePackageItem($id: ID!) {
  wms {
    removePackageItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemovePackageItemMutation, RemovePackageItemMutationVariables>;
export const CreatePackageDocument = new TypedDocumentString(`
    mutation CreatePackage($package: CreatePackageInput!) {
  wms {
    createPackage(value: $package) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreatePackageMutation, CreatePackageMutationVariables>;
export const UpdatePackageDocument = new TypedDocumentString(`
    mutation UpdatePackage($id: ID!, $package: UpdatePackageInput!) {
  wms {
    updatePackage(id: $id, value: $package) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdatePackageMutation, UpdatePackageMutationVariables>;
export const RemovePackageDocument = new TypedDocumentString(`
    mutation RemovePackage($id: ID!) {
  wms {
    removePackage(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemovePackageMutation, RemovePackageMutationVariables>;
export const TablePackageDocument = new TypedDocumentString(`
    query TablePackage($page: Int, $perPage: Int, $search: String) {
  wms {
    packages(page: $page, perPage: $perPage, search: $search) {
      carrier
      createdAt
      height
      id
      insuranceValue
      isFragile
      isHazmat
      length
      packageNumber
      packageType
      packedAt
      requiresSignature
      serviceLevel
      shippedAt
      trackingNumber
      updatedAt
      volume
      weight
      width
      items {
        lotNumber
        quantity
        product {
          barcode
          costPrice
          name
          sku
          status
        }
        serialNumbers
        totalWeight
        unitWeight
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TablePackageQuery, TablePackageQueryVariables>;
export const CreatePickBatchItemDocument = new TypedDocumentString(`
    mutation CreatePickBatchItem($pickBatchItem: CreatePickBatchItemInput!) {
  wms {
    createPickBatchItem(value: $pickBatchItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreatePickBatchItemMutation, CreatePickBatchItemMutationVariables>;
export const UpdatePickBatchItemDocument = new TypedDocumentString(`
    mutation UpdatePickBatchItem($id: ID!, $pickBatchItem: UpdatePickBatchItemInput!) {
  wms {
    updatePickBatchItem(id: $id, value: $pickBatchItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdatePickBatchItemMutation, UpdatePickBatchItemMutationVariables>;
export const RemovePickBatchItemDocument = new TypedDocumentString(`
    mutation RemovePickBatchItem($id: ID!) {
  wms {
    removePickBatchItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemovePickBatchItemMutation, RemovePickBatchItemMutationVariables>;
export const CreatePickBatchDocument = new TypedDocumentString(`
    mutation CreatePickBatch($pickBatch: CreatePickBatchInput!) {
  wms {
    createPickBatch(value: $pickBatch) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreatePickBatchMutation, CreatePickBatchMutationVariables>;
export const UpdatePickBatchDocument = new TypedDocumentString(`
    mutation UpdatePickBatch($id: ID!, $pickBatch: UpdatePickBatchInput!) {
  wms {
    updatePickBatch(id: $id, value: $pickBatch) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdatePickBatchMutation, UpdatePickBatchMutationVariables>;
export const RemovePickBatchDocument = new TypedDocumentString(`
    mutation RemovePickBatch($id: ID!) {
  wms {
    removePickBatch(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemovePickBatchMutation, RemovePickBatchMutationVariables>;
export const TablePickBatchDocument = new TypedDocumentString(`
    query TablePickBatch($page: Int, $perPage: Int, $search: String, $status: PickBatchStatus, $strategy: PickStrategy) {
  wms {
    pickBatches(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
      strategy: $strategy
    ) {
      actualDuration
      batchNumber
      completedAt
      completedItems
      createdAt
      estimatedDuration
      id
      priority
      startedAt
      status
      strategy
      totalItems
      updatedAt
      waveId
      zoneRestrictions
      items {
        id
        estimatedPickTime
        actualPickTime
        orderPriority
        salesOrder {
          status
          shippingAddress
          orderNumber
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TablePickBatchQuery, TablePickBatchQueryVariables>;
export const CreateWmsProductDocument = new TypedDocumentString(`
    mutation CreateWmsProduct($wmsProduct: CreateWmsProductInput!) {
  wms {
    createWmsProduct(value: $wmsProduct) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateWmsProductMutation, CreateWmsProductMutationVariables>;
export const UpdateWmsProductDocument = new TypedDocumentString(`
    mutation UpdateWmsProduct($id: ID!, $wmsProduct: UpdateWmsProductInput!) {
  wms {
    updateWmsProduct(id: $id, value: $wmsProduct) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateWmsProductMutation, UpdateWmsProductMutationVariables>;
export const RemoveWmsProductDocument = new TypedDocumentString(`
    mutation RemoveWmsProduct($id: ID!) {
  wms {
    removeWmsProduct(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveWmsProductMutation, RemoveWmsProductMutationVariables>;
export const TableWmsProductDocument = new TypedDocumentString(`
    query TableWmsProduct($page: Int, $perPage: Int, $search: String, $status: ProductStatus) {
  wms {
    wmsProducts(page: $page, perPage: $perPage, search: $search, status: $status) {
      barcode
      costPrice
      createdAt
      height
      description
      id
      length
      name
      sku
      status
      updatedAt
      volume
      weight
      width
      supplier {
        contactPerson
        email
        name
        phoneNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableWmsProductQuery, TableWmsProductQueryVariables>;
export const CreatePutawayRuleDocument = new TypedDocumentString(`
    mutation CreatePutawayRule($putawayRule: CreatePutawayRuleInput!) {
  wms {
    createPutawayRule(value: $putawayRule) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreatePutawayRuleMutation, CreatePutawayRuleMutationVariables>;
export const UpdatePutawayRuleDocument = new TypedDocumentString(`
    mutation UpdatePutawayRule($id: ID!, $putawayRule: UpdatePutawayRuleInput!) {
  wms {
    updatePutawayRule(id: $id, value: $putawayRule) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdatePutawayRuleMutation, UpdatePutawayRuleMutationVariables>;
export const RemovePutawayRuleDocument = new TypedDocumentString(`
    mutation RemovePutawayRule($id: ID!) {
  wms {
    removePutawayRule(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemovePutawayRuleMutation, RemovePutawayRuleMutationVariables>;
export const TablePutawayRuleDocument = new TypedDocumentString(`
    query TablePutawayRule($page: Int, $perPage: Int, $locationType: LocationType) {
  wms {
    putawayRules(locationType: $locationType, page: $page, perPage: $perPage) {
      createdAt
      isActive
      id
      locationType
      maxQuantity
      minQuantity
      priority
      requiresHazmatApproval
      requiresTemperatureControl
      updatedAt
      volumeThreshold
      weightThreshold
      client {
        name
        industry
        country
        city
        website
        phoneNumber
      }
      product {
        barcode
        id
        costPrice
        description
        name
        sku
        status
      }
      warehouse {
        address
        city
        country
        name
        isActive
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TablePutawayRuleQuery, TablePutawayRuleQueryVariables>;
export const CreateReorderPointDocument = new TypedDocumentString(`
    mutation CreateReorderPoint($reorderPoint: CreateReorderPointInput!) {
  wms {
    createReorderPoint(value: $reorderPoint) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateReorderPointMutation, CreateReorderPointMutationVariables>;
export const UpdateReorderPointDocument = new TypedDocumentString(`
    mutation UpdateReorderPoint($id: ID!, $reorderPoint: UpdateReorderPointInput!) {
  wms {
    updateReorderPoint(id: $id, value: $reorderPoint) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateReorderPointMutation, UpdateReorderPointMutationVariables>;
export const RemoveReorderPointDocument = new TypedDocumentString(`
    mutation RemoveReorderPoint($id: ID!) {
  wms {
    removeReorderPoint(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveReorderPointMutation, RemoveReorderPointMutationVariables>;
export const TableReorderPointDocument = new TypedDocumentString(`
    query TableReorderPoint($page: Int, $perPage: Int) {
  wms {
    reorderPoints(page: $page, perPage: $perPage) {
      createdAt
      id
      threshold
      updatedAt
      product {
        barcode
        description
        costPrice
        id
        name
        sku
        status
      }
      warehouse {
        address
        city
        country
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableReorderPointQuery, TableReorderPointQueryVariables>;
export const CreateReturnItemDocument = new TypedDocumentString(`
    mutation CreateReturnItem($returnItem: CreateReturnItemInput!) {
  wms {
    createReturnItem(value: $returnItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateReturnItemMutation, CreateReturnItemMutationVariables>;
export const UpdateReturnItemDocument = new TypedDocumentString(`
    mutation UpdateReturnItem($id: ID!, $returnItem: UpdateReturnItemInput!) {
  wms {
    updateReturnItem(id: $id, value: $returnItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateReturnItemMutation, UpdateReturnItemMutationVariables>;
export const RemoveReturnItemDocument = new TypedDocumentString(`
    mutation RemoveReturnItem($id: ID!) {
  wms {
    removeReturnItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveReturnItemMutation, RemoveReturnItemMutationVariables>;
export const CreateReturnDocument = new TypedDocumentString(`
    mutation CreateReturn($return: CreateReturnInput!) {
  wms {
    createReturn(value: $return) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateReturnMutation, CreateReturnMutationVariables>;
export const UpdateReturnDocument = new TypedDocumentString(`
    mutation UpdateReturn($id: ID!, $return: UpdateReturnInput!) {
  wms {
    updateReturn(id: $id, value: $return) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateReturnMutation, UpdateReturnMutationVariables>;
export const RemoveReturnDocument = new TypedDocumentString(`
    mutation RemoveReturn($id: ID!) {
  wms {
    removeReturn(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveReturnMutation, RemoveReturnMutationVariables>;
export const TableReturnQueryDocument = new TypedDocumentString(`
    query TableReturnQuery($page: Int, $perPage: Int, $status: ReturnStatus, $search: String) {
  wms {
    returns(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      id
      reason
      returnNumber
      status
      updatedAt
      client {
        name
        phoneNumber
        industry
        country
        city
        website
      }
      salesOrder {
        orderNumber
        shippingAddress
        status
        updatedAt
        id
      }
      items {
        condition
        id
        quantityExpected
        quantityReceived
        quantityVariance
        product {
          barcode
          costPrice
          description
          id
          name
          sku
          status
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableReturnQueryQuery, TableReturnQueryQueryVariables>;
export const CreateSalesOrderItemDocument = new TypedDocumentString(`
    mutation CreateSalesOrderItem($salesOrderItem: CreateSalesOrderItemInput!) {
  wms {
    createSalesOrderItem(value: $salesOrderItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateSalesOrderItemMutation, CreateSalesOrderItemMutationVariables>;
export const UpdateSalesOrderItemDocument = new TypedDocumentString(`
    mutation UpdateSalesOrderItem($id: ID!, $salesOrderItem: UpdateSalesOrderItemInput!) {
  wms {
    updateSalesOrderItem(id: $id, value: $salesOrderItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateSalesOrderItemMutation, UpdateSalesOrderItemMutationVariables>;
export const RemoveSalesOrderItemDocument = new TypedDocumentString(`
    mutation RemoveSalesOrderItem($id: ID!) {
  wms {
    removeSalesOrderItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveSalesOrderItemMutation, RemoveSalesOrderItemMutationVariables>;
export const CreateSalesOrderDocument = new TypedDocumentString(`
    mutation CreateSalesOrder($salesOrder: CreateSalesOrderInput!) {
  wms {
    createSalesOrder(value: $salesOrder) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateSalesOrderMutation, CreateSalesOrderMutationVariables>;
export const UpdateSalesOrderDocument = new TypedDocumentString(`
    mutation UpdateSalesOrder($id: ID!, $salesOrder: UpdateSalesOrderInput!) {
  wms {
    updateSalesOrder(id: $id, value: $salesOrder) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateSalesOrderMutation, UpdateSalesOrderMutationVariables>;
export const RemoveSalesOrderDocument = new TypedDocumentString(`
    mutation RemoveSalesOrder($id: ID!) {
  wms {
    removeSalesOrder(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveSalesOrderMutation, RemoveSalesOrderMutationVariables>;
export const TableSalesOrderDocument = new TypedDocumentString(`
    query TableSalesOrder($page: Int, $perPage: Int, $search: String, $status: SalesOrderStatus) {
  wms {
    salesOrders(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      id
      orderNumber
      shippingAddress
      status
      updatedAt
      items {
        id
        quantityOrdered
        updatedAt
        product {
          barcode
          id
          description
          name
          sku
          status
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableSalesOrderQuery, TableSalesOrderQueryVariables>;
export const CreateStockTransferDocument = new TypedDocumentString(`
    mutation CreateStockTransfer($stockTransfer: CreateStockTransferInput!) {
  wms {
    createStockTransfer(value: $stockTransfer) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateStockTransferMutation, CreateStockTransferMutationVariables>;
export const UpdateStockTransferDocument = new TypedDocumentString(`
    mutation UpdateStockTransfer($id: ID!, $stockTransfer: UpdateStockTransferInput!) {
  wms {
    updateStockTransfer(id: $id, value: $stockTransfer) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateStockTransferMutation, UpdateStockTransferMutationVariables>;
export const RemoveStockTransferDocument = new TypedDocumentString(`
    mutation RemoveStockTransfer($id: ID!) {
  wms {
    removeStockTransfer(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveStockTransferMutation, RemoveStockTransferMutationVariables>;
export const TableStockTransferDocument = new TypedDocumentString(`
    query TableStockTransfer($page: Int, $perPage: Int, $status: StockTransferStatus) {
  wms {
    stockTransfers(page: $page, perPage: $perPage, status: $status) {
      createdAt
      id
      quantity
      status
      updatedAt
      destinationWarehouse {
        address
        city
        country
        id
        name
        timezone
        isActive
      }
      product {
        barcode
        costPrice
        name
        height
        sku
        status
      }
      sourceWarehouse {
        address
        country
        isActive
        name
        city
        id
        timezone
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableStockTransferQuery, TableStockTransferQueryVariables>;
export const CreateSupplierDocument = new TypedDocumentString(`
    mutation CreateSupplier($supplier: CreateSupplierInput!) {
  wms {
    createSupplier(value: $supplier) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateSupplierMutation, CreateSupplierMutationVariables>;
export const UpdateSupplierDocument = new TypedDocumentString(`
    mutation UpdateSupplier($id: ID!, $supplier: UpdateSupplierInput!) {
  wms {
    updateSupplier(id: $id, value: $supplier) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateSupplierMutation, UpdateSupplierMutationVariables>;
export const RemoveSupplierDocument = new TypedDocumentString(`
    mutation RemoveSupplier($id: ID!) {
  wms {
    removeSupplier(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveSupplierMutation, RemoveSupplierMutationVariables>;
export const TableSupplierDocument = new TypedDocumentString(`
    query TableSupplier($page: Int, $perPage: Int, $search: String) {
  wms {
    suppliers(page: $page, perPage: $perPage, search: $search) {
      contactPerson
      createdAt
      email
      id
      name
      phoneNumber
      updatedAt
      products {
        barcode
        id
        costPrice
        description
        name
        sku
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableSupplierQuery, TableSupplierQueryVariables>;
export const CreateTaskItemDocument = new TypedDocumentString(`
    mutation CreateTaskItem($taskItem: CreateTaskItemInput!) {
  wms {
    createTaskItem(value: $taskItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateTaskItemMutation, CreateTaskItemMutationVariables>;
export const UpdateTaskItemDocument = new TypedDocumentString(`
    mutation UpdateTaskItem($id: ID!, $taskItem: UpdateTaskItemInput!) {
  wms {
    updateTaskItem(id: $id, value: $taskItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateTaskItemMutation, UpdateTaskItemMutationVariables>;
export const RemoveTaskItemDocument = new TypedDocumentString(`
    mutation RemoveTaskItem($id: ID!) {
  wms {
    removeTaskItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveTaskItemMutation, RemoveTaskItemMutationVariables>;
export const CreateTaskDocument = new TypedDocumentString(`
    mutation CreateTask($task: CreateTaskInput!) {
  wms {
    createTask(value: $task) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = new TypedDocumentString(`
    mutation UpdateTask($id: ID!, $task: UpdateTaskInput!) {
  wms {
    updateTask(id: $id, value: $task) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const RemoveTaskDocument = new TypedDocumentString(`
    mutation RemoveTask($id: ID!) {
  wms {
    removeTask(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveTaskMutation, RemoveTaskMutationVariables>;
export const TableTaskDocument = new TypedDocumentString(`
    query TableTask($page: Int, $perPage: Int, $search: String, $status: TaskStatus, $type: TaskType) {
  wms {
    tasks(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
      type: $type
    ) {
      actualDuration
      createdAt
      durationSeconds
      endTime
      estimatedDuration
      id
      instructions
      notes
      priority
      sourceEntityId
      sourceEntityType
      startTime
      status
      taskNumber
      type
      updatedAt
      user {
        email
        id
        image
        name
      }
      warehouse {
        address
        city
        country
        id
        isActive
        name
        timezone
      }
      items {
        completedAt
        createdAt
        expiryDate
        id
        lotNumber
        notes
        quantityCompleted
        quantityRemaining
        quantityRequired
        serialNumbers
        status
        updatedAt
        product {
          barcode
          costPrice
          description
          id
          name
          sku
          status
        }
        sourceLocation {
          barcode
          hazmatApproved
          id
          path
          name
          type
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableTaskQuery, TableTaskQueryVariables>;
export const CreateWarehouseDocument = new TypedDocumentString(`
    mutation CreateWarehouse($warehouse: CreateWarehouseInput!) {
  wms {
    createWarehouse(value: $warehouse) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateWarehouseMutation, CreateWarehouseMutationVariables>;
export const UpdateWarehouseDocument = new TypedDocumentString(`
    mutation UpdateWarehouse($id: ID!, $warehouse: UpdateWarehouseInput!) {
  wms {
    updateWarehouse(id: $id, value: $warehouse) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;
export const RemoveWarehouseDocument = new TypedDocumentString(`
    mutation RemoveWarehouse($id: ID!) {
  wms {
    removeWarehouse(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveWarehouseMutation, RemoveWarehouseMutationVariables>;
export const TableWarehouseDocument = new TypedDocumentString(`
    query TableWarehouse($page: Int, $perPage: Int, $search: String) {
  wms {
    warehouses(page: $page, perPage: $perPage, search: $search) {
      address
      city
      contactEmail
      contactPerson
      contactPhone
      country
      createdAt
      id
      isActive
      name
      postalCode
      state
      timezone
      updatedAt
      tasks {
        instructions
        id
        notes
        priority
        taskNumber
        type
        user {
          email
          id
          image
          name
        }
      }
      locations {
        barcode
        id
        isActive
        isPickable
        isReceivable
        level
        maxPallets
        maxVolume
        maxWeight
        name
        path
        type
        xCoordinate
        yCoordinate
        zCoordinate
        hazmatApproved
      }
      inboundShipments {
        status
        updatedAt
        warehouseId
        items {
          discrepancyNotes
          discrepancyQuantity
          expectedQuantity
          id
          createdAt
          receivedQuantity
          updatedAt
          product {
            barcode
            costPrice
            description
            id
            name
            sku
            status
          }
          inboundShipment {
            status
            id
            expectedArrivalDate
            updatedAt
            actualArrivalDate
            client {
              city
              country
              id
              industry
              name
              phoneNumber
            }
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<TableWarehouseQuery, TableWarehouseQueryVariables>;