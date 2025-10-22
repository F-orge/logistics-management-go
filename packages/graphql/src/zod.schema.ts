import * as z from 'zod'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  invoiceLineItem: InvoiceLineItems;
  invoiceLineItems: Array<InvoiceLineItems>;
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
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryAccountingSyncLogArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryAccountingSyncLogsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryBillingInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryBillingInvoicesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryClientAccountArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryClientAccountsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryCreditNoteArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryCreditNotesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryDisputeArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryDisputesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryDocumentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryInvoiceLineItemArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryInvoiceLineItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryPaymentArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryPaymentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryQuoteArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryQuotesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryRateCardArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryRateCardsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQueryRateRuleArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryRateRulesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingQuerySurchargeArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQuerySurchargesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryCampaignArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryCampaignsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryCaseArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryCasesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryCompaniesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryContactArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryContactsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryInteractionArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryInteractionsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryInvoicesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryLeadArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryLeadsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryNotificationsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryOpportunitiesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryOpportunityArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryProductsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type DmsQueryDeliveryRouteArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryDeliveryRoutesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type DmsQueryDeliveryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryDeliveryTasksArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type DmsQueryDmsProofOfDeliveriesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type DmsQueryDmsProofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryDriverLocationArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryDriverLocationsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type DmsQueryTaskEventArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryTaskEventsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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
  Advertisement = 'ADVERTISEMENT',
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
  opportunity: Opportunities;
  product: Products;
  quantity: Scalars['Int']['output'];
};

export enum OpportunitySource {
  Advertisement = 'ADVERTISEMENT',
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
  Paypal = 'PAYPAL',
  QrPh = 'QR_PH',
  Stripe = 'STRIPE',
  Wallet = 'WALLET',
  WireTransfer = 'WIRE_TRANSFER'
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
  warehouseId: Scalars['ID']['output'];
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
  destinationWarehouseId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  product: WmsProducts;
  quantity: Scalars['Int']['output'];
  sourceWarehouseId: Scalars['ID']['output'];
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
  carrierRate: CarrierRates;
  carrierRates: Array<CarrierRates>;
  carriers: Array<Carriers>;
  driver: Drivers;
  driverSchedule: DriverSchedules;
  driverSchedules: Array<DriverSchedules>;
  drivers: Array<Drivers>;
  expense: Expenses;
  expenses: Array<Expenses>;
  geofence: Geofences;
  geofenceEvent: GeofenceEvents;
  geofenceEvents: Array<GeofenceEvents>;
  geofences: Array<Geofences>;
  gpsPing: GpsPings;
  gpsPings: Array<GpsPings>;
  partnerInvoice: PartnerInvoices;
  partnerInvoiceItem: PartnerInvoiceItems;
  partnerInvoiceItems: Array<PartnerInvoiceItems>;
  partnerInvoices: Array<PartnerInvoices>;
  proofOfDeliveries: Array<ProofOfDeliveries>;
  proofOfDelivery: ProofOfDeliveries;
  route: Routes;
  routes: Array<Routes>;
  shipmentLeg: ShipmentLegs;
  shipmentLegEvent: ShipmentLegEvents;
  shipmentLegEvents: Array<ShipmentLegEvents>;
  shipmentLegs: Array<ShipmentLegs>;
  trip: Trips;
  tripStop: TripStops;
  tripStops: Array<TripStops>;
  trips: Array<Trips>;
  vehicle: Vehicles;
  vehicleMaintenance: VehicleMaintenance;
  vehicleMaintenances: Array<VehicleMaintenance>;
  vehicles: Array<Vehicles>;
};


export type TmsQueryCarrierArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryCarrierRateArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryCarrierRatesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryCarriersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryDriverArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryDriverScheduleArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryDriverSchedulesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryDriversArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryExpensesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryGeofenceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryGeofenceEventArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryGeofenceEventsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryGeofencesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryGpsPingArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryGpsPingsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryPartnerInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryPartnerInvoiceItemArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryPartnerInvoiceItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryPartnerInvoicesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryProofOfDeliveriesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryProofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryRouteArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryRoutesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryShipmentLegArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryShipmentLegEventArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryShipmentLegEventsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryShipmentLegsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryTripArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryTripStopArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryTripStopsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryTripsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryVehicleArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryVehicleMaintenanceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryVehicleMaintenancesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryVehiclesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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
  inboundShipmentItem: InboundShipmentItems;
  inboundShipmentItems: Array<InboundShipmentItems>;
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
  outboundShipmentItem: OutboundShipmentItems;
  outboundShipmentItems: Array<OutboundShipmentItems>;
  outboundShipments: Array<OutboundShipments>;
  package: Packages;
  packageItem: PackageItems;
  packageItems: Array<PackageItems>;
  packages: Array<Packages>;
  pickBatch: PickBatches;
  pickBatchItem: PickBatchItems;
  pickBatchItems: Array<PickBatchItems>;
  pickBatches: Array<PickBatches>;
  putawayRule: PutawayRules;
  putawayRules: Array<PutawayRules>;
  reorderPoint: ReorderPoints;
  reorderPoints: Array<ReorderPoints>;
  return: Returns;
  returnItem: ReturnItems;
  returnItems: Array<ReturnItems>;
  returns: Array<Returns>;
  salesOrder: SalesOrders;
  salesOrderItem: SalesOrderItems;
  salesOrderItems: Array<SalesOrderItems>;
  salesOrders: Array<SalesOrders>;
  stockTransfer: StockTransfers;
  stockTransfers: Array<StockTransfers>;
  supplier: Suppliers;
  suppliers: Array<Suppliers>;
  task: Tasks;
  taskItem: TaskItems;
  taskItems: Array<TaskItems>;
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
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryInboundShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryInboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryInboundShipmentItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryInboundShipmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryInventoryAdjustmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryInventoryAdjustmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryInventoryBatchArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryInventoryBatchesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryInventoryStockArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryInventoryStocksArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryLocationArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryLocationsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryOutboundShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryOutboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryOutboundShipmentItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryOutboundShipmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryPackageArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryPackageItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryPackageItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryPackagesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryPickBatchArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryPickBatchItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryPickBatchItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryPickBatchesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryPutawayRuleArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryPutawayRulesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryReorderPointArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryReorderPointsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryReturnArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryReturnItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryReturnItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryReturnsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerySalesOrderArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerySalesOrderItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerySalesOrderItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerySalesOrdersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryStockTransferArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryStockTransfersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerySupplierArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerySuppliersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryTaskItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryTaskItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryTasksArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryWarehouseArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryWarehousesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryWmsProductArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryWmsProductsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const BillingInvoiceStatusSchema = z.enum(BillingInvoiceStatus);

export const CarrierRateUnitSchema = z.enum(CarrierRateUnit);

export const CasePrioritySchema = z.enum(CasePriority);

export const CaseStatusSchema = z.enum(CaseStatus);

export const CaseTypeSchema = z.enum(CaseType);

export const CurrencySchema = z.enum(Currency);

export const DeliveryFailureReasonSchema = z.enum(DeliveryFailureReason);

export const DeliveryRouteStatusSchema = z.enum(DeliveryRouteStatus);

export const DeliveryTaskStatusSchema = z.enum(DeliveryTaskStatus);

export const DisputeStatusSchema = z.enum(DisputeStatus);

export const DocumentTypeSchema = z.enum(DocumentType);

export const DriverScheduleReasonSchema = z.enum(DriverScheduleReason);

export const DriverStatusSchema = z.enum(DriverStatus);

export const ExpenseStatusSchema = z.enum(ExpenseStatus);

export const ExpenseTypeSchema = z.enum(ExpenseType);

export const GeofenceEventTypeSchema = z.enum(GeofenceEventType);

export const InboundShipmentStatusSchema = z.enum(InboundShipmentStatus);

export const InteractionTypeSchema = z.enum(InteractionType);

export const InventoryAdjustmentReasonSchema = z.enum(InventoryAdjustmentReason);

export const InventoryStockStatusSchema = z.enum(InventoryStockStatus);

export const InvoiceStatusSchema = z.enum(InvoiceStatus);

export const LeadSourceSchema = z.enum(LeadSource);

export const LeadStatusSchema = z.enum(LeadStatus);

export const LocationTypeSchema = z.enum(LocationType);

export const OpportunitySourceSchema = z.enum(OpportunitySource);

export const OpportunityStageSchema = z.enum(OpportunityStage);

export const OutboundShipmentStatusSchema = z.enum(OutboundShipmentStatus);

export const PartnerInvoiceStatusSchema = z.enum(PartnerInvoiceStatus);

export const PaymentMethodSchema = z.enum(PaymentMethod);

export const PaymentStatusSchema = z.enum(PaymentStatus);

export const PickBatchStatusSchema = z.enum(PickBatchStatus);

export const PickStrategySchema = z.enum(PickStrategy);

export const PricingModelSchema = z.enum(PricingModel);

export const ProductStatusSchema = z.enum(ProductStatus);

export const ProductTypeSchema = z.enum(ProductType);

export const ProofOfDeliveryTypeSchema = z.enum(ProofOfDeliveryType);

export const ProofTypeSchema = z.enum(ProofType);

export const QuoteStatusSchema = z.enum(QuoteStatus);

export const RecordTypeSchema = z.enum(RecordType);

export const ReturnItemConditionSchema = z.enum(ReturnItemCondition);

export const ReturnStatusSchema = z.enum(ReturnStatus);

export const SalesOrderStatusSchema = z.enum(SalesOrderStatus);

export const ServiceTypeSchema = z.enum(ServiceType);

export const ShipmentLegStatusSchema = z.enum(ShipmentLegStatus);

export const StockTransferStatusSchema = z.enum(StockTransferStatus);

export const SurchargeCalculationMethodSchema = z.enum(SurchargeCalculationMethod);

export const SyncStatusSchema = z.enum(SyncStatus);

export const TaskEventStatusSchema = z.enum(TaskEventStatus);

export const TaskItemStatusSchema = z.enum(TaskItemStatus);

export const TaskStatusSchema = z.enum(TaskStatus);

export const TaskTypeSchema = z.enum(TaskType);

export const TransactionTypeSchema = z.enum(TransactionType);

export const TripStatusSchema = z.enum(TripStatus);

export const TripStopStatusSchema = z.enum(TripStopStatus);

export const VehicleServiceTypeSchema = z.enum(VehicleServiceType);

export const VehicleStatusSchema = z.enum(VehicleStatus);

export function CreateAccountTransactionInputSchema(): z.ZodObject<Properties<CreateAccountTransactionInput>> {
  return z.object({
    amount: z.number(),
    clientAccountId: z.string(),
    description: z.string().nullish(),
    processedByUserId: z.string().nullish(),
    referenceNumber: z.string().nullish(),
    runningBalance: z.number().nullish(),
    sourceRecordId: z.string().nullish(),
    sourceRecordType: z.string().nullish(),
    transactionDate: z.string().nullish(),
    type: TransactionTypeSchema
  })
}

export function CreateAccountingSyncLogInputSchema(): z.ZodObject<Properties<CreateAccountingSyncLogInput>> {
  return z.object({
    errorMessage: z.string().nullish(),
    externalId: z.string().nullish(),
    externalSystem: z.string(),
    lastSyncAt: z.string().nullish(),
    nextRetryAt: z.string().nullish(),
    recordId: z.string(),
    recordType: z.string(),
    requestPayload: z.string().nullish(),
    responsePayload: z.string().nullish(),
    retryCount: z.number().nullish(),
    status: SyncStatusSchema.nullish()
  })
}

export function CreateAttachmentInputSchema(): z.ZodObject<Properties<CreateAttachmentInput>> {
  return z.object({
    file: z.file().nullish(),
    recordId: z.string().nullish(),
    recordType: RecordTypeSchema.nullish()
  })
}

export function CreateBillingInvoiceInputSchema(): z.ZodObject<Properties<CreateBillingInvoiceInput>> {
  return z.object({
    amountPaid: z.number().nullish(),
    clientId: z.string(),
    createdByUserId: z.string().nullish(),
    currency: z.string().nullish(),
    discountAmount: z.number().nullish(),
    dueDate: z.string(),
    invoiceNumber: z.string(),
    issueDate: z.string(),
    notes: z.string().nullish(),
    paidAt: z.string().nullish(),
    paymentTerms: z.string().nullish(),
    quoteId: z.string().nullish(),
    sentAt: z.string().nullish(),
    status: BillingInvoiceStatusSchema.nullish(),
    subtotal: z.number().nullish(),
    taxAmount: z.number().nullish(),
    totalAmount: z.number()
  })
}

export function CreateBinThresholdInputSchema(): z.ZodObject<Properties<CreateBinThresholdInput>> {
  return z.object({
    alertThreshold: z.number().nullish(),
    isActive: z.boolean().nullish(),
    locationId: z.string(),
    maxQuantity: z.number(),
    minQuantity: z.number(),
    productId: z.string(),
    reorderQuantity: z.number().nullish()
  })
}

export function CreateCampaignInputSchema(): z.ZodObject<Properties<CreateCampaignInput>> {
  return z.object({
    budget: z.number().nullish(),
    endDate: z.string().nullish(),
    name: z.string(),
    startDate: z.string().nullish()
  })
}

export function CreateCarrierInputSchema(): z.ZodObject<Properties<CreateCarrierInput>> {
  return z.object({
    contactEmail: z.string().nullish(),
    contactPerson: z.string().nullish(),
    contactPhone: z.string().nullish(),
    name: z.string(),
    servicesOffered: z.string().nullish()
  })
}

export function CreateCarrierRateInputSchema(): z.ZodObject<Properties<CreateCarrierRateInput>> {
  return z.object({
    carrierId: z.string(),
    destination: z.string().nullish(),
    origin: z.string().nullish(),
    rate: z.number(),
    serviceType: z.string().nullish(),
    unit: CarrierRateUnitSchema.nullish()
  })
}

export function CreateCaseInputSchema(): z.ZodObject<Properties<CreateCaseInput>> {
  return z.object({
    caseNumber: z.string(),
    contactId: z.string().nullish(),
    description: z.string().nullish(),
    ownerId: z.string(),
    priority: CasePrioritySchema.nullish(),
    status: CaseStatusSchema.nullish(),
    type: CaseTypeSchema.nullish()
  })
}

export function CreateClientAccountInputSchema(): z.ZodObject<Properties<CreateClientAccountInput>> {
  return z.object({
    availableCredit: z.number().nullish(),
    clientId: z.string(),
    creditLimit: z.number().nullish(),
    currency: z.string().nullish(),
    isCreditApproved: z.boolean().nullish(),
    lastPaymentDate: z.string().nullish(),
    paymentTermsDays: z.number().nullish(),
    walletBalance: z.number().nullish()
  })
}

export function CreateCompanyInputSchema(): z.ZodObject<Properties<CreateCompanyInput>> {
  return z.object({
    annualRevenue: z.number().nullish(),
    city: z.string().nullish(),
    country: z.string().nullish(),
    industry: z.string().nullish(),
    name: z.string(),
    ownerId: z.string().nullish(),
    phoneNumber: z.string().nullish(),
    postalCode: z.string().nullish(),
    state: z.string().nullish(),
    street: z.string().nullish(),
    website: z.string().nullish()
  })
}

export function CreateContactInputSchema(): z.ZodObject<Properties<CreateContactInput>> {
  return z.object({
    companyId: z.string().nullish(),
    email: z.string(),
    jobTitle: z.string().nullish(),
    name: z.string(),
    ownerId: z.string(),
    phoneNumber: z.string().nullish()
  })
}

export function CreateCreditNoteInputSchema(): z.ZodObject<Properties<CreateCreditNoteInput>> {
  return z.object({
    amount: z.number(),
    appliedAt: z.string().nullish(),
    createdByUserId: z.string().nullish(),
    creditNoteNumber: z.string(),
    currency: z.string().nullish(),
    disputeId: z.string().nullish(),
    invoiceId: z.string(),
    issueDate: z.string(),
    notes: z.string().nullish(),
    reason: z.string()
  })
}

export function CreateCustomerTrackingLinkInputSchema(): z.ZodObject<Properties<CreateCustomerTrackingLinkInput>> {
  return z.object({
    accessCount: z.number().nullish(),
    deliveryTaskId: z.string(),
    expiresAt: z.string().nullish(),
    isActive: z.boolean().nullish(),
    lastAccessedAt: z.string().nullish(),
    trackingToken: z.string()
  })
}

export function CreateDeliveryRouteInputSchema(): z.ZodObject<Properties<CreateDeliveryRouteInput>> {
  return z.object({
    completedAt: z.string().nullish(),
    driverId: z.string(),
    estimatedDurationMinutes: z.number().nullish(),
    optimizedRouteData: z.string().nullish(),
    routeDate: z.string(),
    startedAt: z.string().nullish(),
    status: DeliveryRouteStatusSchema.nullish(),
    totalDistanceKm: z.number().nullish()
  })
}

export function CreateDeliveryTaskInputSchema(): z.ZodObject<Properties<CreateDeliveryTaskInput>> {
  return z.object({
    actualArrivalTime: z.string().nullish(),
    attemptCount: z.number().nullish(),
    deliveryAddress: z.string(),
    deliveryInstructions: z.string().nullish(),
    deliveryRouteId: z.string(),
    deliveryTime: z.string().nullish(),
    estimatedArrivalTime: z.string().nullish(),
    failureReason: DeliveryFailureReasonSchema.nullish(),
    packageId: z.string(),
    recipientName: z.string().nullish(),
    recipientPhone: z.string().nullish(),
    routeSequence: z.number(),
    status: DeliveryTaskStatusSchema.nullish()
  })
}

export function CreateDisputeInputSchema(): z.ZodObject<Properties<CreateDisputeInput>> {
  return z.object({
    clientId: z.string(),
    disputedAmount: z.number().nullish(),
    lineItemId: z.string(),
    reason: z.string(),
    resolutionNotes: z.string().nullish(),
    resolvedAt: z.string().nullish(),
    resolvedByUserId: z.string().nullish(),
    status: DisputeStatusSchema.nullish(),
    submittedAt: z.string().nullish()
  })
}

export function CreateDmsProofOfDeliveryInputSchema(): z.ZodObject<Properties<CreateDmsProofOfDeliveryInput>> {
  return z.object({
    deliveryTaskId: z.string(),
    filePath: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    recipientName: z.string().nullish(),
    signatureData: z.string().nullish(),
    timestamp: z.string().nullish(),
    type: ProofOfDeliveryTypeSchema,
    verificationCode: z.string().nullish()
  })
}

export function CreateDocumentInputSchema(): z.ZodObject<Properties<CreateDocumentInput>> {
  return z.object({
    documentType: DocumentTypeSchema,
    fileName: z.string(),
    filePath: z.string(),
    fileSize: z.number().nullish(),
    mimeType: z.string().nullish(),
    recordId: z.string(),
    recordType: z.string(),
    uploadedByUserId: z.string().nullish()
  })
}

export function CreateDriverInputSchema(): z.ZodObject<Properties<CreateDriverInput>> {
  return z.object({
    contactPhone: z.string().nullish(),
    licenseExpiryDate: z.string().nullish(),
    licenseNumber: z.string(),
    status: DriverStatusSchema.nullish(),
    userId: z.string()
  })
}

export function CreateDriverLocationInputSchema(): z.ZodObject<Properties<CreateDriverLocationInput>> {
  return z.object({
    accuracy: z.number().nullish(),
    altitude: z.number().nullish(),
    driverId: z.string(),
    heading: z.number().nullish(),
    latitude: z.number(),
    longitude: z.number(),
    speedKmh: z.number().nullish(),
    timestamp: z.string().nullish()
  })
}

export function CreateDriverScheduleInputSchema(): z.ZodObject<Properties<CreateDriverScheduleInput>> {
  return z.object({
    driverId: z.string(),
    endDate: z.string(),
    reason: DriverScheduleReasonSchema.nullish(),
    startDate: z.string()
  })
}

export function CreateExpenseInputSchema(): z.ZodObject<Properties<CreateExpenseInput>> {
  return z.object({
    amount: z.number(),
    currency: CurrencySchema.nullish(),
    description: z.string().nullish(),
    driverId: z.string().nullish(),
    expenseDate: z.string().nullish(),
    fuelQuantity: z.number().nullish(),
    odometerReading: z.number().nullish(),
    receiptUrl: z.string().nullish(),
    status: ExpenseStatusSchema.nullish(),
    tripId: z.string().nullish(),
    type: ExpenseTypeSchema.nullish()
  })
}

export function CreateGeofenceEventInputSchema(): z.ZodObject<Properties<CreateGeofenceEventInput>> {
  return z.object({
    eventType: GeofenceEventTypeSchema,
    geofenceId: z.string(),
    timestamp: z.string(),
    vehicleId: z.string()
  })
}

export function CreateGeofenceInputSchema(): z.ZodObject<Properties<CreateGeofenceInput>> {
  return z.object({
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    name: z.string()
  })
}

export function CreateGpsPingInputSchema(): z.ZodObject<Properties<CreateGpsPingInput>> {
  return z.object({
    latitude: z.number(),
    longitude: z.number(),
    timestamp: z.string(),
    vehicleId: z.string()
  })
}

export function CreateInboundShipmentInputSchema(): z.ZodObject<Properties<CreateInboundShipmentInput>> {
  return z.object({
    actualArrivalDate: z.string().nullish(),
    clientId: z.string().nullish(),
    expectedArrivalDate: z.string().nullish(),
    status: InboundShipmentStatusSchema.nullish(),
    warehouseId: z.string()
  })
}

export function CreateInboundShipmentItemInputSchema(): z.ZodObject<Properties<CreateInboundShipmentItemInput>> {
  return z.object({
    discrepancyNotes: z.string().nullish(),
    expectedQuantity: z.number(),
    inboundShipmentId: z.string(),
    productId: z.string(),
    receivedQuantity: z.number().nullish()
  })
}

export function CreateInteractionInputSchema(): z.ZodObject<Properties<CreateInteractionInput>> {
  return z.object({
    caseId: z.string().nullish(),
    contactId: z.string(),
    interactionDate: z.string().nullish(),
    notes: z.string().nullish(),
    outcome: z.string().nullish(),
    type: InteractionTypeSchema.nullish(),
    userId: z.string()
  })
}

export function CreateInventoryAdjustmentInputSchema(): z.ZodObject<Properties<CreateInventoryAdjustmentInput>> {
  return z.object({
    notes: z.string().nullish(),
    productId: z.string(),
    quantityChange: z.number(),
    reason: InventoryAdjustmentReasonSchema.nullish(),
    userId: z.string(),
    warehouseId: z.string()
  })
}

export function CreateInventoryBatchInputSchema(): z.ZodObject<Properties<CreateInventoryBatchInput>> {
  return z.object({
    batchNumber: z.string(),
    expirationDate: z.string().nullish(),
    productId: z.string()
  })
}

export function CreateInventoryStockInputSchema(): z.ZodObject<Properties<CreateInventoryStockInput>> {
  return z.object({
    batchId: z.string().nullish(),
    lastCountedAt: z.string().nullish(),
    lastMovementAt: z.string().nullish(),
    locationId: z.string(),
    productId: z.string(),
    quantity: z.number(),
    reservedQuantity: z.number(),
    status: InventoryStockStatusSchema.nullish()
  })
}

export function CreateInvoiceInputSchema(): z.ZodObject<Properties<CreateInvoiceInput>> {
  return z.object({
    dueDate: z.string().nullish(),
    issueDate: z.string().nullish(),
    opportunityId: z.string().nullish(),
    paidAt: z.string().nullish(),
    paymentMethod: PaymentMethodSchema.nullish(),
    sentAt: z.string().nullish(),
    status: InvoiceStatusSchema.nullish(),
    total: z.number().nullish()
  })
}

export function CreateInvoiceItemInputSchema(): z.ZodObject<Properties<CreateInvoiceItemInput>> {
  return z.object({
    invoiceId: z.string(),
    price: z.number(),
    productId: z.string(),
    quantity: z.number()
  })
}

export function CreateInvoiceLineItemInputSchema(): z.ZodObject<Properties<CreateInvoiceLineItemInput>> {
  return z.object({
    description: z.string(),
    discountRate: z.number().nullish(),
    invoiceId: z.string(),
    quantity: z.number(),
    sourceRecordId: z.string().nullish(),
    sourceRecordType: z.string().nullish(),
    taxRate: z.number().nullish(),
    unitPrice: z.number()
  })
}

export function CreateLeadInputSchema(): z.ZodObject<Properties<CreateLeadInput>> {
  return z.object({
    campaignId: z.string().nullish(),
    email: z.string(),
    leadScore: z.number().nullish(),
    leadSource: LeadSourceSchema.nullish(),
    name: z.string(),
    ownerId: z.string(),
    status: LeadStatusSchema.nullish()
  })
}

export function CreateLocationInputSchema(): z.ZodObject<Properties<CreateLocationInput>> {
  return z.object({
    barcode: z.string().nullish(),
    hazmatApproved: z.boolean().nullish(),
    isActive: z.boolean().nullish(),
    isPickable: z.boolean().nullish(),
    isReceivable: z.boolean().nullish(),
    level: z.number().nullish(),
    maxPallets: z.number().nullish(),
    maxVolume: z.number().nullish(),
    maxWeight: z.number().nullish(),
    name: z.string(),
    parentLocationId: z.string().nullish(),
    path: z.string().nullish(),
    temperatureControlled: z.boolean().nullish(),
    type: LocationTypeSchema,
    warehouseId: z.string(),
    xCoordinate: z.number().nullish(),
    yCoordinate: z.number().nullish(),
    zCoordinate: z.number().nullish()
  })
}

export function CreateNotificationInputSchema(): z.ZodObject<Properties<CreateNotificationInput>> {
  return z.object({
    isRead: z.boolean().nullish(),
    link: z.string().nullish(),
    message: z.string(),
    userId: z.string()
  })
}

export function CreateOpportunityInputSchema(): z.ZodObject<Properties<CreateOpportunityInput>> {
  return z.object({
    campaignId: z.string().nullish(),
    companyId: z.string().nullish(),
    contactId: z.string().nullish(),
    dealValue: z.number().nullish(),
    expectedCloseDate: z.string().nullish(),
    lostReason: z.string().nullish(),
    name: z.string(),
    ownerId: z.string(),
    probability: z.number().nullish(),
    source: OpportunitySourceSchema.nullish(),
    stage: OpportunityStageSchema.nullish()
  })
}

export function CreateOpportunityProductInputSchema(): z.ZodObject<Properties<CreateOpportunityProductInput>> {
  return z.object({
    opportunityId: z.string(),
    productId: z.string(),
    quantity: z.number()
  })
}

export function CreateOutboundShipmentInputSchema(): z.ZodObject<Properties<CreateOutboundShipmentInput>> {
  return z.object({
    carrier: z.string().nullish(),
    salesOrderId: z.string(),
    status: OutboundShipmentStatusSchema.nullish(),
    trackingNumber: z.string().nullish(),
    warehouseId: z.string()
  })
}

export function CreateOutboundShipmentItemInputSchema(): z.ZodObject<Properties<CreateOutboundShipmentItemInput>> {
  return z.object({
    batchId: z.string().nullish(),
    outboundShipmentId: z.string(),
    productId: z.string(),
    quantityShipped: z.number(),
    salesOrderItemId: z.string()
  })
}

export function CreatePackageInputSchema(): z.ZodObject<Properties<CreatePackageInput>> {
  return z.object({
    carrier: z.string().nullish(),
    height: z.number().nullish(),
    insuranceValue: z.number().nullish(),
    isFragile: z.boolean().nullish(),
    isHazmat: z.boolean().nullish(),
    length: z.number().nullish(),
    packageNumber: z.string(),
    packageType: z.string().nullish(),
    packedAt: z.string().nullish(),
    packedByUserId: z.string().nullish(),
    requiresSignature: z.boolean().nullish(),
    salesOrderId: z.string(),
    serviceLevel: z.string().nullish(),
    shippedAt: z.string().nullish(),
    trackingNumber: z.string().nullish(),
    warehouseId: z.string(),
    weight: z.number().nullish(),
    width: z.number().nullish()
  })
}

export function CreatePackageItemInputSchema(): z.ZodObject<Properties<CreatePackageItemInput>> {
  return z.object({
    batchId: z.string().nullish(),
    expiryDate: z.string().nullish(),
    lotNumber: z.string().nullish(),
    packageId: z.string(),
    productId: z.string(),
    quantity: z.number(),
    serialNumbers: z.array(z.string().nullable()).nullish(),
    unitWeight: z.number().nullish()
  })
}

export function CreatePartnerInvoiceInputSchema(): z.ZodObject<Properties<CreatePartnerInvoiceInput>> {
  return z.object({
    carrierId: z.string(),
    invoiceDate: z.string(),
    invoiceNumber: z.string(),
    status: PartnerInvoiceStatusSchema.nullish(),
    totalAmount: z.number()
  })
}

export function CreatePartnerInvoiceItemInputSchema(): z.ZodObject<Properties<CreatePartnerInvoiceItemInput>> {
  return z.object({
    amount: z.number(),
    partnerInvoiceId: z.string(),
    shipmentLegId: z.string()
  })
}

export function CreatePaymentInputSchema(): z.ZodObject<Properties<CreatePaymentInput>> {
  return z.object({
    amount: z.number(),
    currency: z.string().nullish(),
    exchangeRate: z.number().nullish(),
    fees: z.number().nullish(),
    gatewayReference: z.string().nullish(),
    invoiceId: z.string(),
    notes: z.string().nullish(),
    paymentDate: z.string().nullish(),
    paymentMethod: PaymentMethodSchema,
    processedAt: z.string().nullish(),
    processedByUserId: z.string().nullish(),
    status: PaymentStatusSchema.nullish(),
    transactionId: z.string().nullish()
  })
}

export function CreatePickBatchInputSchema(): z.ZodObject<Properties<CreatePickBatchInput>> {
  return z.object({
    actualDuration: z.number().nullish(),
    assignedUserId: z.string().nullish(),
    batchNumber: z.string(),
    completedAt: z.string().nullish(),
    completedItems: z.number().nullish(),
    estimatedDuration: z.number().nullish(),
    priority: z.number().nullish(),
    startedAt: z.string().nullish(),
    status: PickBatchStatusSchema.nullish(),
    strategy: PickStrategySchema,
    totalItems: z.number().nullish(),
    warehouseId: z.string(),
    waveId: z.string().nullish(),
    zoneRestrictions: z.array(z.string().nullable()).nullish()
  })
}

export function CreatePickBatchItemInputSchema(): z.ZodObject<Properties<CreatePickBatchItemInput>> {
  return z.object({
    actualPickTime: z.number().nullish(),
    estimatedPickTime: z.number().nullish(),
    orderPriority: z.number().nullish(),
    pickBatchId: z.string(),
    salesOrderId: z.string()
  })
}

export function CreateProductInputSchema(): z.ZodObject<Properties<CreateProductInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string(),
    price: z.number(),
    sku: z.string().nullish(),
    type: ProductTypeSchema.nullish()
  })
}

export function CreateProofOfDeliveryInputSchema(): z.ZodObject<Properties<CreateProofOfDeliveryInput>> {
  return z.object({
    filePath: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    timestamp: z.string(),
    tripStopId: z.string(),
    type: ProofTypeSchema.nullish()
  })
}

export function CreatePutawayRuleInputSchema(): z.ZodObject<Properties<CreatePutawayRuleInput>> {
  return z.object({
    clientId: z.string().nullish(),
    isActive: z.boolean().nullish(),
    locationType: LocationTypeSchema.nullish(),
    maxQuantity: z.number().nullish(),
    minQuantity: z.number().nullish(),
    preferredLocationId: z.string().nullish(),
    priority: z.number(),
    productId: z.string(),
    requiresHazmatApproval: z.boolean().nullish(),
    requiresTemperatureControl: z.boolean().nullish(),
    volumeThreshold: z.number().nullish(),
    warehouseId: z.string(),
    weightThreshold: z.number().nullish()
  })
}

export function CreateQuoteInputSchema(): z.ZodObject<Properties<CreateQuoteInput>> {
  return z.object({
    clientId: z.string().nullish(),
    createdByUserId: z.string().nullish(),
    destinationDetails: z.string(),
    expiresAt: z.string().nullish(),
    height: z.number().nullish(),
    length: z.number().nullish(),
    notes: z.string().nullish(),
    originDetails: z.string(),
    quoteNumber: z.string().nullish(),
    quotedPrice: z.number(),
    serviceLevel: z.string().nullish(),
    status: QuoteStatusSchema.nullish(),
    weight: z.number().nullish(),
    width: z.number().nullish()
  })
}

export function CreateRateCardInputSchema(): z.ZodObject<Properties<CreateRateCardInput>> {
  return z.object({
    createdByUserId: z.string().nullish(),
    description: z.string().nullish(),
    isActive: z.boolean().nullish(),
    name: z.string(),
    serviceType: ServiceTypeSchema,
    validFrom: z.string(),
    validTo: z.string().nullish()
  })
}

export function CreateRateRuleInputSchema(): z.ZodObject<Properties<CreateRateRuleInput>> {
  return z.object({
    condition: z.string(),
    isActive: z.boolean().nullish(),
    maxValue: z.number().nullish(),
    minValue: z.number().nullish(),
    price: z.number(),
    pricingModel: PricingModelSchema,
    priority: z.number().nullish(),
    rateCardId: z.string(),
    value: z.string()
  })
}

export function CreateReorderPointInputSchema(): z.ZodObject<Properties<CreateReorderPointInput>> {
  return z.object({
    productId: z.string(),
    threshold: z.number(),
    warehouseId: z.string()
  })
}

export function CreateReturnInputSchema(): z.ZodObject<Properties<CreateReturnInput>> {
  return z.object({
    clientId: z.string(),
    reason: z.string().nullish(),
    returnNumber: z.string(),
    salesOrderId: z.string().nullish(),
    status: ReturnStatusSchema.nullish()
  })
}

export function CreateReturnItemInputSchema(): z.ZodObject<Properties<CreateReturnItemInput>> {
  return z.object({
    condition: ReturnItemConditionSchema.nullish(),
    productId: z.string(),
    quantityExpected: z.number(),
    quantityReceived: z.number().nullish(),
    returnId: z.string()
  })
}

export function CreateRouteInputSchema(): z.ZodObject<Properties<CreateRouteInput>> {
  return z.object({
    optimizedRouteData: z.string().nullish(),
    totalDistance: z.number().nullish(),
    totalDuration: z.number().nullish(),
    tripId: z.string()
  })
}

export function CreateSalesOrderInputSchema(): z.ZodObject<Properties<CreateSalesOrderInput>> {
  return z.object({
    clientId: z.string(),
    crmOpportunityId: z.string().nullish(),
    orderNumber: z.string(),
    shippingAddress: z.string().nullish(),
    status: SalesOrderStatusSchema.nullish()
  })
}

export function CreateSalesOrderItemInputSchema(): z.ZodObject<Properties<CreateSalesOrderItemInput>> {
  return z.object({
    productId: z.string(),
    quantityOrdered: z.number(),
    salesOrderId: z.string()
  })
}

export function CreateShipmentLegEventInputSchema(): z.ZodObject<Properties<CreateShipmentLegEventInput>> {
  return z.object({
    eventTimestamp: z.string(),
    location: z.string().nullish(),
    shipmentLegId: z.string(),
    statusMessage: z.string().nullish()
  })
}

export function CreateShipmentLegInputSchema(): z.ZodObject<Properties<CreateShipmentLegInput>> {
  return z.object({
    carrierId: z.string().nullish(),
    endLocation: z.string().nullish(),
    internalTripId: z.string().nullish(),
    legSequence: z.number(),
    shipmentId: z.string().nullish(),
    startLocation: z.string().nullish(),
    status: ShipmentLegStatusSchema.nullish()
  })
}

export function CreateStockTransferInputSchema(): z.ZodObject<Properties<CreateStockTransferInput>> {
  return z.object({
    destinationWarehouseId: z.string(),
    productId: z.string(),
    quantity: z.number(),
    sourceWarehouseId: z.string(),
    status: StockTransferStatusSchema.nullish()
  })
}

export function CreateSupplierInputSchema(): z.ZodObject<Properties<CreateSupplierInput>> {
  return z.object({
    contactPerson: z.string().nullish(),
    email: z.string().nullish(),
    name: z.string(),
    phoneNumber: z.string().nullish()
  })
}

export function CreateSurchargeInputSchema(): z.ZodObject<Properties<CreateSurchargeInput>> {
  return z.object({
    amount: z.number(),
    calculationMethod: SurchargeCalculationMethodSchema,
    description: z.string().nullish(),
    isActive: z.boolean().nullish(),
    name: z.string(),
    type: z.string(),
    validFrom: z.string().nullish(),
    validTo: z.string().nullish()
  })
}

export function CreateTaskEventInputSchema(): z.ZodObject<Properties<CreateTaskEventInput>> {
  return z.object({
    deliveryTaskId: z.string(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    notes: z.string().nullish(),
    reason: z.string().nullish(),
    status: TaskEventStatusSchema,
    timestamp: z.string().nullish()
  })
}

export function CreateTaskInputSchema(): z.ZodObject<Properties<CreateTaskInput>> {
  return z.object({
    actualDuration: z.number().nullish(),
    endTime: z.string().nullish(),
    estimatedDuration: z.number().nullish(),
    instructions: z.string().nullish(),
    notes: z.string().nullish(),
    pickBatchId: z.string().nullish(),
    priority: z.number().nullish(),
    sourceEntityId: z.string().nullish(),
    sourceEntityType: z.string().nullish(),
    startTime: z.string().nullish(),
    status: TaskStatusSchema.nullish(),
    taskNumber: z.string(),
    type: TaskTypeSchema,
    userId: z.string().nullish(),
    warehouseId: z.string()
  })
}

export function CreateTaskItemInputSchema(): z.ZodObject<Properties<CreateTaskItemInput>> {
  return z.object({
    batchId: z.string().nullish(),
    completedAt: z.string().nullish(),
    destinationLocationId: z.string().nullish(),
    expiryDate: z.string().nullish(),
    lotNumber: z.string().nullish(),
    notes: z.string().nullish(),
    productId: z.string(),
    quantityCompleted: z.number(),
    quantityRequired: z.number(),
    serialNumbers: z.array(z.string().nullable()).nullish(),
    sourceLocationId: z.string().nullish(),
    status: TaskItemStatusSchema.nullish(),
    taskId: z.string()
  })
}

export function CreateTripInputSchema(): z.ZodObject<Properties<CreateTripInput>> {
  return z.object({
    driverId: z.string().nullish(),
    endLocation: z.string().nullish(),
    endTime: z.string().nullish(),
    startLocation: z.string().nullish(),
    startTime: z.string().nullish(),
    status: TripStatusSchema.nullish(),
    vehicleId: z.string().nullish()
  })
}

export function CreateTripStopInputSchema(): z.ZodObject<Properties<CreateTripStopInput>> {
  return z.object({
    actualArrivalTime: z.string().nullish(),
    actualDepartureTime: z.string().nullish(),
    address: z.string().nullish(),
    estimatedArrivalTime: z.string().nullish(),
    estimatedDepartureTime: z.string().nullish(),
    sequence: z.number(),
    shipmentId: z.string().nullish(),
    status: TripStopStatusSchema.nullish(),
    tripId: z.string()
  })
}

export function CreateVehicleInputSchema(): z.ZodObject<Properties<CreateVehicleInput>> {
  return z.object({
    capacityVolume: z.number().nullish(),
    capacityWeight: z.number().nullish(),
    currentMileage: z.number().nullish(),
    lastMaintenanceDate: z.string().nullish(),
    make: z.string().nullish(),
    model: z.string().nullish(),
    registrationNumber: z.string(),
    status: VehicleStatusSchema.nullish(),
    vin: z.string().nullish(),
    year: z.number().nullish()
  })
}

export function CreateVehicleMaintenanceInputSchema(): z.ZodObject<Properties<CreateVehicleMaintenanceInput>> {
  return z.object({
    cost: z.number().nullish(),
    notes: z.string().nullish(),
    serviceDate: z.string(),
    serviceType: VehicleServiceTypeSchema.nullish(),
    vehicleId: z.string()
  })
}

export function CreateWarehouseInputSchema(): z.ZodObject<Properties<CreateWarehouseInput>> {
  return z.object({
    address: z.string().nullish(),
    city: z.string().nullish(),
    contactEmail: z.string().nullish(),
    contactPerson: z.string().nullish(),
    contactPhone: z.string().nullish(),
    country: z.string().nullish(),
    isActive: z.boolean().nullish(),
    name: z.string(),
    postalCode: z.string().nullish(),
    state: z.string().nullish(),
    timezone: z.string().nullish()
  })
}

export function CreateWmsProductInputSchema(): z.ZodObject<Properties<CreateWmsProductInput>> {
  return z.object({
    barcode: z.string().nullish(),
    clientId: z.string().nullish(),
    costPrice: z.number().nullish(),
    description: z.string().nullish(),
    height: z.number().nullish(),
    length: z.number().nullish(),
    name: z.string(),
    sku: z.string(),
    status: ProductStatusSchema.nullish(),
    supplierId: z.string().nullish(),
    weight: z.number().nullish(),
    width: z.number().nullish()
  })
}

export function UpdateAccountTransactionInputSchema(): z.ZodObject<Properties<UpdateAccountTransactionInput>> {
  return z.object({
    amount: z.number().nullish(),
    clientAccountId: z.string().nullish(),
    description: z.string().nullish(),
    processedByUserId: z.string().nullish(),
    referenceNumber: z.string().nullish(),
    runningBalance: z.number().nullish(),
    sourceRecordId: z.string().nullish(),
    sourceRecordType: z.string().nullish(),
    transactionDate: z.string().nullish(),
    type: TransactionTypeSchema.nullish()
  })
}

export function UpdateAccountingSyncLogInputSchema(): z.ZodObject<Properties<UpdateAccountingSyncLogInput>> {
  return z.object({
    errorMessage: z.string().nullish(),
    externalId: z.string().nullish(),
    externalSystem: z.string().nullish(),
    lastSyncAt: z.string().nullish(),
    nextRetryAt: z.string().nullish(),
    recordId: z.string().nullish(),
    recordType: z.string().nullish(),
    requestPayload: z.string().nullish(),
    responsePayload: z.string().nullish(),
    retryCount: z.number().nullish(),
    status: SyncStatusSchema.nullish()
  })
}

export function UpdateBillingInvoiceInputSchema(): z.ZodObject<Properties<UpdateBillingInvoiceInput>> {
  return z.object({
    amountPaid: z.number().nullish(),
    clientId: z.string().nullish(),
    createdByUserId: z.string().nullish(),
    currency: z.string().nullish(),
    discountAmount: z.number().nullish(),
    dueDate: z.string().nullish(),
    invoiceNumber: z.string().nullish(),
    issueDate: z.string().nullish(),
    notes: z.string().nullish(),
    paidAt: z.string().nullish(),
    paymentTerms: z.string().nullish(),
    quoteId: z.string().nullish(),
    sentAt: z.string().nullish(),
    status: BillingInvoiceStatusSchema.nullish(),
    subtotal: z.number().nullish(),
    taxAmount: z.number().nullish(),
    totalAmount: z.number().nullish()
  })
}

export function UpdateBinThresholdInputSchema(): z.ZodObject<Properties<UpdateBinThresholdInput>> {
  return z.object({
    alertThreshold: z.number().nullish(),
    isActive: z.boolean().nullish(),
    locationId: z.string().nullish(),
    maxQuantity: z.number().nullish(),
    minQuantity: z.number().nullish(),
    productId: z.string().nullish(),
    reorderQuantity: z.number().nullish()
  })
}

export function UpdateCampaignInputSchema(): z.ZodObject<Properties<UpdateCampaignInput>> {
  return z.object({
    budget: z.number().nullish(),
    endDate: z.string().nullish(),
    name: z.string().nullish(),
    startDate: z.string().nullish()
  })
}

export function UpdateCarrierInputSchema(): z.ZodObject<Properties<UpdateCarrierInput>> {
  return z.object({
    contactEmail: z.string().nullish(),
    contactPerson: z.string().nullish(),
    contactPhone: z.string().nullish(),
    name: z.string().nullish(),
    servicesOffered: z.string().nullish()
  })
}

export function UpdateCarrierRateInputSchema(): z.ZodObject<Properties<UpdateCarrierRateInput>> {
  return z.object({
    carrierId: z.string().nullish(),
    destination: z.string().nullish(),
    origin: z.string().nullish(),
    rate: z.number().nullish(),
    serviceType: z.string().nullish(),
    unit: CarrierRateUnitSchema.nullish()
  })
}

export function UpdateCaseInputSchema(): z.ZodObject<Properties<UpdateCaseInput>> {
  return z.object({
    caseNumber: z.string().nullish(),
    contactId: z.string().nullish(),
    description: z.string().nullish(),
    ownerId: z.string().nullish(),
    priority: CasePrioritySchema.nullish(),
    status: CaseStatusSchema.nullish(),
    type: CaseTypeSchema.nullish()
  })
}

export function UpdateClientAccountInputSchema(): z.ZodObject<Properties<UpdateClientAccountInput>> {
  return z.object({
    availableCredit: z.number().nullish(),
    clientId: z.string().nullish(),
    creditLimit: z.number().nullish(),
    currency: z.string().nullish(),
    isCreditApproved: z.boolean().nullish(),
    lastPaymentDate: z.string().nullish(),
    paymentTermsDays: z.number().nullish(),
    walletBalance: z.number().nullish()
  })
}

export function UpdateCompanyInputSchema(): z.ZodObject<Properties<UpdateCompanyInput>> {
  return z.object({
    annualRevenue: z.number().nullish(),
    city: z.string().nullish(),
    country: z.string().nullish(),
    industry: z.string().nullish(),
    name: z.string().nullish(),
    ownerId: z.string().nullish(),
    phoneNumber: z.string().nullish(),
    postalCode: z.string().nullish(),
    state: z.string().nullish(),
    street: z.string().nullish(),
    website: z.string().nullish()
  })
}

export function UpdateContactInputSchema(): z.ZodObject<Properties<UpdateContactInput>> {
  return z.object({
    companyId: z.string().nullish(),
    email: z.string().nullish(),
    jobTitle: z.string().nullish(),
    name: z.string().nullish(),
    ownerId: z.string().nullish(),
    phoneNumber: z.string().nullish()
  })
}

export function UpdateCreditNoteInputSchema(): z.ZodObject<Properties<UpdateCreditNoteInput>> {
  return z.object({
    amount: z.number().nullish(),
    appliedAt: z.string().nullish(),
    createdByUserId: z.string().nullish(),
    creditNoteNumber: z.string().nullish(),
    currency: z.string().nullish(),
    disputeId: z.string().nullish(),
    invoiceId: z.string().nullish(),
    issueDate: z.string().nullish(),
    notes: z.string().nullish(),
    reason: z.string().nullish()
  })
}

export function UpdateCustomerTrackingLinkInputSchema(): z.ZodObject<Properties<UpdateCustomerTrackingLinkInput>> {
  return z.object({
    accessCount: z.number().nullish(),
    deliveryTaskId: z.string().nullish(),
    expiresAt: z.string().nullish(),
    isActive: z.boolean().nullish(),
    lastAccessedAt: z.string().nullish(),
    trackingToken: z.string().nullish()
  })
}

export function UpdateDeliveryRouteInputSchema(): z.ZodObject<Properties<UpdateDeliveryRouteInput>> {
  return z.object({
    completedAt: z.string().nullish(),
    driverId: z.string().nullish(),
    estimatedDurationMinutes: z.number().nullish(),
    optimizedRouteData: z.string().nullish(),
    routeDate: z.string().nullish(),
    startedAt: z.string().nullish(),
    status: DeliveryRouteStatusSchema.nullish(),
    totalDistanceKm: z.number().nullish()
  })
}

export function UpdateDeliveryTaskInputSchema(): z.ZodObject<Properties<UpdateDeliveryTaskInput>> {
  return z.object({
    actualArrivalTime: z.string().nullish(),
    attemptCount: z.number().nullish(),
    deliveryAddress: z.string().nullish(),
    deliveryInstructions: z.string().nullish(),
    deliveryRouteId: z.string().nullish(),
    deliveryTime: z.string().nullish(),
    estimatedArrivalTime: z.string().nullish(),
    failureReason: DeliveryFailureReasonSchema.nullish(),
    packageId: z.string().nullish(),
    recipientName: z.string().nullish(),
    recipientPhone: z.string().nullish(),
    routeSequence: z.number().nullish(),
    status: DeliveryTaskStatusSchema.nullish()
  })
}

export function UpdateDisputeInputSchema(): z.ZodObject<Properties<UpdateDisputeInput>> {
  return z.object({
    clientId: z.string().nullish(),
    disputedAmount: z.number().nullish(),
    lineItemId: z.string().nullish(),
    reason: z.string().nullish(),
    resolutionNotes: z.string().nullish(),
    resolvedAt: z.string().nullish(),
    resolvedByUserId: z.string().nullish(),
    status: DisputeStatusSchema.nullish(),
    submittedAt: z.string().nullish()
  })
}

export function UpdateDmsProofOfDeliveryInputSchema(): z.ZodObject<Properties<UpdateDmsProofOfDeliveryInput>> {
  return z.object({
    deliveryTaskId: z.string().nullish(),
    filePath: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    recipientName: z.string().nullish(),
    signatureData: z.string().nullish(),
    timestamp: z.string().nullish(),
    type: ProofOfDeliveryTypeSchema.nullish(),
    verificationCode: z.string().nullish()
  })
}

export function UpdateDocumentInputSchema(): z.ZodObject<Properties<UpdateDocumentInput>> {
  return z.object({
    documentType: DocumentTypeSchema.nullish(),
    fileName: z.string().nullish(),
    filePath: z.string().nullish(),
    fileSize: z.number().nullish(),
    mimeType: z.string().nullish(),
    recordId: z.string().nullish(),
    recordType: z.string().nullish(),
    uploadedByUserId: z.string().nullish()
  })
}

export function UpdateDriverInputSchema(): z.ZodObject<Properties<UpdateDriverInput>> {
  return z.object({
    contactPhone: z.string().nullish(),
    licenseExpiryDate: z.string().nullish(),
    licenseNumber: z.string().nullish(),
    status: DriverStatusSchema.nullish(),
    userId: z.string().nullish()
  })
}

export function UpdateDriverLocationInputSchema(): z.ZodObject<Properties<UpdateDriverLocationInput>> {
  return z.object({
    accuracy: z.number().nullish(),
    altitude: z.number().nullish(),
    driverId: z.string().nullish(),
    heading: z.number().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    speedKmh: z.number().nullish(),
    timestamp: z.string().nullish()
  })
}

export function UpdateDriverScheduleInputSchema(): z.ZodObject<Properties<UpdateDriverScheduleInput>> {
  return z.object({
    driverId: z.string().nullish(),
    endDate: z.string().nullish(),
    reason: DriverScheduleReasonSchema.nullish(),
    startDate: z.string().nullish()
  })
}

export function UpdateExpenseInputSchema(): z.ZodObject<Properties<UpdateExpenseInput>> {
  return z.object({
    amount: z.number().nullish(),
    currency: CurrencySchema.nullish(),
    description: z.string().nullish(),
    driverId: z.string().nullish(),
    expenseDate: z.string().nullish(),
    fuelQuantity: z.number().nullish(),
    odometerReading: z.number().nullish(),
    receiptUrl: z.string().nullish(),
    status: ExpenseStatusSchema.nullish(),
    tripId: z.string().nullish(),
    type: ExpenseTypeSchema.nullish()
  })
}

export function UpdateGeofenceEventInputSchema(): z.ZodObject<Properties<UpdateGeofenceEventInput>> {
  return z.object({
    eventType: GeofenceEventTypeSchema.nullish(),
    geofenceId: z.string().nullish(),
    timestamp: z.string().nullish(),
    vehicleId: z.string().nullish()
  })
}

export function UpdateGeofenceInputSchema(): z.ZodObject<Properties<UpdateGeofenceInput>> {
  return z.object({
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    name: z.string().nullish()
  })
}

export function UpdateGpsPingInputSchema(): z.ZodObject<Properties<UpdateGpsPingInput>> {
  return z.object({
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    timestamp: z.string().nullish(),
    vehicleId: z.string().nullish()
  })
}

export function UpdateInboundShipmentInputSchema(): z.ZodObject<Properties<UpdateInboundShipmentInput>> {
  return z.object({
    actualArrivalDate: z.string().nullish(),
    clientId: z.string().nullish(),
    expectedArrivalDate: z.string().nullish(),
    status: InboundShipmentStatusSchema.nullish(),
    warehouseId: z.string().nullish()
  })
}

export function UpdateInboundShipmentItemInputSchema(): z.ZodObject<Properties<UpdateInboundShipmentItemInput>> {
  return z.object({
    discrepancyNotes: z.string().nullish(),
    expectedQuantity: z.number().nullish(),
    inboundShipmentId: z.string().nullish(),
    productId: z.string().nullish(),
    receivedQuantity: z.number().nullish()
  })
}

export function UpdateInteractionInputSchema(): z.ZodObject<Properties<UpdateInteractionInput>> {
  return z.object({
    caseId: z.string().nullish(),
    contactId: z.string().nullish(),
    interactionDate: z.string().nullish(),
    notes: z.string().nullish(),
    outcome: z.string().nullish(),
    type: InteractionTypeSchema.nullish(),
    userId: z.string().nullish()
  })
}

export function UpdateInventoryAdjustmentInputSchema(): z.ZodObject<Properties<UpdateInventoryAdjustmentInput>> {
  return z.object({
    notes: z.string().nullish(),
    productId: z.string().nullish(),
    quantityChange: z.number().nullish(),
    reason: InventoryAdjustmentReasonSchema.nullish(),
    userId: z.string().nullish(),
    warehouseId: z.string().nullish()
  })
}

export function UpdateInventoryBatchInputSchema(): z.ZodObject<Properties<UpdateInventoryBatchInput>> {
  return z.object({
    batchNumber: z.string().nullish(),
    expirationDate: z.string().nullish(),
    productId: z.string().nullish()
  })
}

export function UpdateInventoryStockInputSchema(): z.ZodObject<Properties<UpdateInventoryStockInput>> {
  return z.object({
    batchId: z.string().nullish(),
    lastCountedAt: z.string().nullish(),
    lastMovementAt: z.string().nullish(),
    locationId: z.string().nullish(),
    productId: z.string().nullish(),
    quantity: z.number().nullish(),
    reservedQuantity: z.number().nullish(),
    status: InventoryStockStatusSchema.nullish()
  })
}

export function UpdateInvoiceInputSchema(): z.ZodObject<Properties<UpdateInvoiceInput>> {
  return z.object({
    dueDate: z.string().nullish(),
    issueDate: z.string().nullish(),
    opportunityId: z.string().nullish(),
    paidAt: z.string().nullish(),
    paymentMethod: PaymentMethodSchema.nullish(),
    sentAt: z.string().nullish(),
    status: InvoiceStatusSchema.nullish(),
    total: z.number().nullish()
  })
}

export function UpdateInvoiceItemInputSchema(): z.ZodObject<Properties<UpdateInvoiceItemInput>> {
  return z.object({
    invoiceId: z.string().nullish(),
    price: z.number().nullish(),
    productId: z.string().nullish(),
    quantity: z.number().nullish()
  })
}

export function UpdateInvoiceLineItemInputSchema(): z.ZodObject<Properties<UpdateInvoiceLineItemInput>> {
  return z.object({
    description: z.string().nullish(),
    discountRate: z.number().nullish(),
    invoiceId: z.string().nullish(),
    quantity: z.number().nullish(),
    sourceRecordId: z.string().nullish(),
    sourceRecordType: z.string().nullish(),
    taxRate: z.number().nullish(),
    unitPrice: z.number().nullish()
  })
}

export function UpdateLeadInputSchema(): z.ZodObject<Properties<UpdateLeadInput>> {
  return z.object({
    campaignId: z.string().nullish(),
    email: z.string().nullish(),
    leadScore: z.number().nullish(),
    leadSource: LeadSourceSchema.nullish(),
    name: z.string().nullish(),
    ownerId: z.string().nullish(),
    status: LeadStatusSchema.nullish()
  })
}

export function UpdateLocationInputSchema(): z.ZodObject<Properties<UpdateLocationInput>> {
  return z.object({
    barcode: z.string().nullish(),
    hazmatApproved: z.boolean().nullish(),
    isActive: z.boolean().nullish(),
    isPickable: z.boolean().nullish(),
    isReceivable: z.boolean().nullish(),
    level: z.number().nullish(),
    maxPallets: z.number().nullish(),
    maxVolume: z.number().nullish(),
    maxWeight: z.number().nullish(),
    name: z.string().nullish(),
    parentLocationId: z.string().nullish(),
    path: z.string().nullish(),
    temperatureControlled: z.boolean().nullish(),
    type: LocationTypeSchema.nullish(),
    warehouseId: z.string().nullish(),
    xCoordinate: z.number().nullish(),
    yCoordinate: z.number().nullish(),
    zCoordinate: z.number().nullish()
  })
}

export function UpdateNotificationInputSchema(): z.ZodObject<Properties<UpdateNotificationInput>> {
  return z.object({
    isRead: z.boolean().nullish(),
    link: z.string().nullish(),
    message: z.string().nullish(),
    userId: z.string().nullish()
  })
}

export function UpdateOpportunityInputSchema(): z.ZodObject<Properties<UpdateOpportunityInput>> {
  return z.object({
    campaignId: z.string().nullish(),
    companyId: z.string().nullish(),
    contactId: z.string().nullish(),
    dealValue: z.number().nullish(),
    expectedCloseDate: z.string().nullish(),
    lostReason: z.string().nullish(),
    name: z.string().nullish(),
    ownerId: z.string().nullish(),
    probability: z.number().nullish(),
    source: OpportunitySourceSchema.nullish(),
    stage: OpportunityStageSchema.nullish()
  })
}

export function UpdateOpportunityProductInputSchema(): z.ZodObject<Properties<UpdateOpportunityProductInput>> {
  return z.object({
    quantity: z.number().nullish()
  })
}

export function UpdateOutboundShipmentInputSchema(): z.ZodObject<Properties<UpdateOutboundShipmentInput>> {
  return z.object({
    carrier: z.string().nullish(),
    salesOrderId: z.string().nullish(),
    status: OutboundShipmentStatusSchema.nullish(),
    trackingNumber: z.string().nullish(),
    warehouseId: z.string().nullish()
  })
}

export function UpdateOutboundShipmentItemInputSchema(): z.ZodObject<Properties<UpdateOutboundShipmentItemInput>> {
  return z.object({
    batchId: z.string().nullish(),
    outboundShipmentId: z.string().nullish(),
    productId: z.string().nullish(),
    quantityShipped: z.number().nullish(),
    salesOrderItemId: z.string().nullish()
  })
}

export function UpdatePackageInputSchema(): z.ZodObject<Properties<UpdatePackageInput>> {
  return z.object({
    carrier: z.string().nullish(),
    height: z.number().nullish(),
    insuranceValue: z.number().nullish(),
    isFragile: z.boolean().nullish(),
    isHazmat: z.boolean().nullish(),
    length: z.number().nullish(),
    packageNumber: z.string().nullish(),
    packageType: z.string().nullish(),
    packedAt: z.string().nullish(),
    packedByUserId: z.string().nullish(),
    requiresSignature: z.boolean().nullish(),
    salesOrderId: z.string().nullish(),
    serviceLevel: z.string().nullish(),
    shippedAt: z.string().nullish(),
    trackingNumber: z.string().nullish(),
    warehouseId: z.string().nullish(),
    weight: z.number().nullish(),
    width: z.number().nullish()
  })
}

export function UpdatePackageItemInputSchema(): z.ZodObject<Properties<UpdatePackageItemInput>> {
  return z.object({
    batchId: z.string().nullish(),
    expiryDate: z.string().nullish(),
    lotNumber: z.string().nullish(),
    packageId: z.string().nullish(),
    productId: z.string().nullish(),
    quantity: z.number().nullish(),
    serialNumbers: z.array(z.string().nullable()).nullish(),
    unitWeight: z.number().nullish()
  })
}

export function UpdatePartnerInvoiceInputSchema(): z.ZodObject<Properties<UpdatePartnerInvoiceInput>> {
  return z.object({
    carrierId: z.string().nullish(),
    invoiceDate: z.string().nullish(),
    invoiceNumber: z.string().nullish(),
    status: PartnerInvoiceStatusSchema.nullish(),
    totalAmount: z.number().nullish()
  })
}

export function UpdatePartnerInvoiceItemInputSchema(): z.ZodObject<Properties<UpdatePartnerInvoiceItemInput>> {
  return z.object({
    amount: z.number().nullish(),
    partnerInvoiceId: z.string().nullish(),
    shipmentLegId: z.string().nullish()
  })
}

export function UpdatePaymentInputSchema(): z.ZodObject<Properties<UpdatePaymentInput>> {
  return z.object({
    amount: z.number().nullish(),
    currency: z.string().nullish(),
    exchangeRate: z.number().nullish(),
    fees: z.number().nullish(),
    gatewayReference: z.string().nullish(),
    invoiceId: z.string().nullish(),
    notes: z.string().nullish(),
    paymentDate: z.string().nullish(),
    paymentMethod: PaymentMethodSchema.nullish(),
    processedAt: z.string().nullish(),
    processedByUserId: z.string().nullish(),
    status: PaymentStatusSchema.nullish(),
    transactionId: z.string().nullish()
  })
}

export function UpdatePickBatchInputSchema(): z.ZodObject<Properties<UpdatePickBatchInput>> {
  return z.object({
    actualDuration: z.number().nullish(),
    assignedUserId: z.string().nullish(),
    batchNumber: z.string().nullish(),
    completedAt: z.string().nullish(),
    completedItems: z.number().nullish(),
    estimatedDuration: z.number().nullish(),
    priority: z.number().nullish(),
    startedAt: z.string().nullish(),
    status: PickBatchStatusSchema.nullish(),
    strategy: PickStrategySchema.nullish(),
    totalItems: z.number().nullish(),
    warehouseId: z.string().nullish(),
    waveId: z.string().nullish(),
    zoneRestrictions: z.array(z.string().nullable()).nullish()
  })
}

export function UpdatePickBatchItemInputSchema(): z.ZodObject<Properties<UpdatePickBatchItemInput>> {
  return z.object({
    actualPickTime: z.number().nullish(),
    estimatedPickTime: z.number().nullish(),
    orderPriority: z.number().nullish(),
    pickBatchId: z.string().nullish(),
    salesOrderId: z.string().nullish()
  })
}

export function UpdateProductInputSchema(): z.ZodObject<Properties<UpdateProductInput>> {
  return z.object({
    description: z.string().nullish(),
    name: z.string().nullish(),
    price: z.number().nullish(),
    sku: z.string().nullish(),
    type: ProductTypeSchema.nullish()
  })
}

export function UpdateProofOfDeliveryInputSchema(): z.ZodObject<Properties<UpdateProofOfDeliveryInput>> {
  return z.object({
    filePath: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    timestamp: z.string().nullish(),
    tripStopId: z.string().nullish(),
    type: ProofTypeSchema.nullish()
  })
}

export function UpdatePutawayRuleInputSchema(): z.ZodObject<Properties<UpdatePutawayRuleInput>> {
  return z.object({
    clientId: z.string().nullish(),
    isActive: z.boolean().nullish(),
    locationType: LocationTypeSchema.nullish(),
    maxQuantity: z.number().nullish(),
    minQuantity: z.number().nullish(),
    preferredLocationId: z.string().nullish(),
    priority: z.number().nullish(),
    productId: z.string().nullish(),
    requiresHazmatApproval: z.boolean().nullish(),
    requiresTemperatureControl: z.boolean().nullish(),
    volumeThreshold: z.number().nullish(),
    warehouseId: z.string().nullish(),
    weightThreshold: z.number().nullish()
  })
}

export function UpdateQuoteInputSchema(): z.ZodObject<Properties<UpdateQuoteInput>> {
  return z.object({
    clientId: z.string().nullish(),
    createdByUserId: z.string().nullish(),
    destinationDetails: z.string().nullish(),
    expiresAt: z.string().nullish(),
    height: z.number().nullish(),
    length: z.number().nullish(),
    notes: z.string().nullish(),
    originDetails: z.string().nullish(),
    quoteNumber: z.string().nullish(),
    quotedPrice: z.number().nullish(),
    serviceLevel: z.string().nullish(),
    status: QuoteStatusSchema.nullish(),
    weight: z.number().nullish(),
    width: z.number().nullish()
  })
}

export function UpdateRateCardInputSchema(): z.ZodObject<Properties<UpdateRateCardInput>> {
  return z.object({
    createdByUserId: z.string().nullish(),
    description: z.string().nullish(),
    isActive: z.boolean().nullish(),
    name: z.string().nullish(),
    serviceType: ServiceTypeSchema.nullish(),
    validFrom: z.string().nullish(),
    validTo: z.string().nullish()
  })
}

export function UpdateRateRuleInputSchema(): z.ZodObject<Properties<UpdateRateRuleInput>> {
  return z.object({
    condition: z.string().nullish(),
    isActive: z.boolean().nullish(),
    maxValue: z.number().nullish(),
    minValue: z.number().nullish(),
    price: z.number().nullish(),
    pricingModel: PricingModelSchema.nullish(),
    priority: z.number().nullish(),
    rateCardId: z.string().nullish(),
    value: z.string().nullish()
  })
}

export function UpdateReorderPointInputSchema(): z.ZodObject<Properties<UpdateReorderPointInput>> {
  return z.object({
    productId: z.string().nullish(),
    threshold: z.number().nullish(),
    warehouseId: z.string().nullish()
  })
}

export function UpdateReturnInputSchema(): z.ZodObject<Properties<UpdateReturnInput>> {
  return z.object({
    clientId: z.string().nullish(),
    reason: z.string().nullish(),
    returnNumber: z.string().nullish(),
    salesOrderId: z.string().nullish(),
    status: ReturnStatusSchema.nullish()
  })
}

export function UpdateReturnItemInputSchema(): z.ZodObject<Properties<UpdateReturnItemInput>> {
  return z.object({
    condition: ReturnItemConditionSchema.nullish(),
    productId: z.string().nullish(),
    quantityExpected: z.number().nullish(),
    quantityReceived: z.number().nullish(),
    returnId: z.string().nullish()
  })
}

export function UpdateRouteInputSchema(): z.ZodObject<Properties<UpdateRouteInput>> {
  return z.object({
    optimizedRouteData: z.string().nullish(),
    totalDistance: z.number().nullish(),
    totalDuration: z.number().nullish(),
    tripId: z.string().nullish()
  })
}

export function UpdateSalesOrderInputSchema(): z.ZodObject<Properties<UpdateSalesOrderInput>> {
  return z.object({
    clientId: z.string().nullish(),
    crmOpportunityId: z.string().nullish(),
    orderNumber: z.string().nullish(),
    shippingAddress: z.string().nullish(),
    status: SalesOrderStatusSchema.nullish()
  })
}

export function UpdateSalesOrderItemInputSchema(): z.ZodObject<Properties<UpdateSalesOrderItemInput>> {
  return z.object({
    productId: z.string().nullish(),
    quantityOrdered: z.number().nullish(),
    salesOrderId: z.string().nullish()
  })
}

export function UpdateShipmentLegEventInputSchema(): z.ZodObject<Properties<UpdateShipmentLegEventInput>> {
  return z.object({
    eventTimestamp: z.string().nullish(),
    location: z.string().nullish(),
    shipmentLegId: z.string().nullish(),
    statusMessage: z.string().nullish()
  })
}

export function UpdateShipmentLegInputSchema(): z.ZodObject<Properties<UpdateShipmentLegInput>> {
  return z.object({
    carrierId: z.string().nullish(),
    endLocation: z.string().nullish(),
    internalTripId: z.string().nullish(),
    legSequence: z.number().nullish(),
    shipmentId: z.string().nullish(),
    startLocation: z.string().nullish(),
    status: ShipmentLegStatusSchema.nullish()
  })
}

export function UpdateStockTransferInputSchema(): z.ZodObject<Properties<UpdateStockTransferInput>> {
  return z.object({
    destinationWarehouseId: z.string().nullish(),
    productId: z.string().nullish(),
    quantity: z.number().nullish(),
    sourceWarehouseId: z.string().nullish(),
    status: StockTransferStatusSchema.nullish()
  })
}

export function UpdateSupplierInputSchema(): z.ZodObject<Properties<UpdateSupplierInput>> {
  return z.object({
    contactPerson: z.string().nullish(),
    email: z.string().nullish(),
    name: z.string().nullish(),
    phoneNumber: z.string().nullish()
  })
}

export function UpdateSurchargeInputSchema(): z.ZodObject<Properties<UpdateSurchargeInput>> {
  return z.object({
    amount: z.number().nullish(),
    calculationMethod: SurchargeCalculationMethodSchema.nullish(),
    description: z.string().nullish(),
    isActive: z.boolean().nullish(),
    name: z.string().nullish(),
    type: z.string().nullish(),
    validFrom: z.string().nullish(),
    validTo: z.string().nullish()
  })
}

export function UpdateTaskEventInputSchema(): z.ZodObject<Properties<UpdateTaskEventInput>> {
  return z.object({
    deliveryTaskId: z.string().nullish(),
    latitude: z.number().nullish(),
    longitude: z.number().nullish(),
    notes: z.string().nullish(),
    reason: z.string().nullish(),
    status: TaskEventStatusSchema.nullish(),
    timestamp: z.string().nullish()
  })
}

export function UpdateTaskInputSchema(): z.ZodObject<Properties<UpdateTaskInput>> {
  return z.object({
    actualDuration: z.number().nullish(),
    endTime: z.string().nullish(),
    estimatedDuration: z.number().nullish(),
    instructions: z.string().nullish(),
    notes: z.string().nullish(),
    pickBatchId: z.string().nullish(),
    priority: z.number().nullish(),
    sourceEntityId: z.string().nullish(),
    sourceEntityType: z.string().nullish(),
    startTime: z.string().nullish(),
    status: TaskStatusSchema.nullish(),
    taskNumber: z.string().nullish(),
    type: TaskTypeSchema.nullish(),
    userId: z.string().nullish(),
    warehouseId: z.string().nullish()
  })
}

export function UpdateTaskItemInputSchema(): z.ZodObject<Properties<UpdateTaskItemInput>> {
  return z.object({
    batchId: z.string().nullish(),
    completedAt: z.string().nullish(),
    destinationLocationId: z.string().nullish(),
    expiryDate: z.string().nullish(),
    lotNumber: z.string().nullish(),
    notes: z.string().nullish(),
    productId: z.string().nullish(),
    quantityCompleted: z.number().nullish(),
    quantityRequired: z.number().nullish(),
    serialNumbers: z.array(z.string().nullable()).nullish(),
    sourceLocationId: z.string().nullish(),
    status: TaskItemStatusSchema.nullish(),
    taskId: z.string().nullish()
  })
}

export function UpdateTripInputSchema(): z.ZodObject<Properties<UpdateTripInput>> {
  return z.object({
    driverId: z.string().nullish(),
    endLocation: z.string().nullish(),
    endTime: z.string().nullish(),
    startLocation: z.string().nullish(),
    startTime: z.string().nullish(),
    status: TripStatusSchema.nullish(),
    vehicleId: z.string().nullish()
  })
}

export function UpdateTripStopInputSchema(): z.ZodObject<Properties<UpdateTripStopInput>> {
  return z.object({
    actualArrivalTime: z.string().nullish(),
    actualDepartureTime: z.string().nullish(),
    address: z.string().nullish(),
    estimatedArrivalTime: z.string().nullish(),
    estimatedDepartureTime: z.string().nullish(),
    sequence: z.number().nullish(),
    shipmentId: z.string().nullish(),
    status: TripStopStatusSchema.nullish(),
    tripId: z.string().nullish()
  })
}

export function UpdateVehicleInputSchema(): z.ZodObject<Properties<UpdateVehicleInput>> {
  return z.object({
    capacityVolume: z.number().nullish(),
    capacityWeight: z.number().nullish(),
    currentMileage: z.number().nullish(),
    lastMaintenanceDate: z.string().nullish(),
    make: z.string().nullish(),
    model: z.string().nullish(),
    registrationNumber: z.string().nullish(),
    status: VehicleStatusSchema.nullish(),
    vin: z.string().nullish(),
    year: z.number().nullish()
  })
}

export function UpdateVehicleMaintenanceInputSchema(): z.ZodObject<Properties<UpdateVehicleMaintenanceInput>> {
  return z.object({
    cost: z.number().nullish(),
    notes: z.string().nullish(),
    serviceDate: z.string().nullish(),
    serviceType: VehicleServiceTypeSchema.nullish(),
    vehicleId: z.string().nullish()
  })
}

export function UpdateWarehouseInputSchema(): z.ZodObject<Properties<UpdateWarehouseInput>> {
  return z.object({
    address: z.string().nullish(),
    city: z.string().nullish(),
    contactEmail: z.string().nullish(),
    contactPerson: z.string().nullish(),
    contactPhone: z.string().nullish(),
    country: z.string().nullish(),
    isActive: z.boolean().nullish(),
    name: z.string().nullish(),
    postalCode: z.string().nullish(),
    state: z.string().nullish(),
    timezone: z.string().nullish()
  })
}

export function UpdateWmsProductInputSchema(): z.ZodObject<Properties<UpdateWmsProductInput>> {
  return z.object({
    barcode: z.string().nullish(),
    clientId: z.string().nullish(),
    costPrice: z.number().nullish(),
    description: z.string().nullish(),
    height: z.number().nullish(),
    length: z.number().nullish(),
    name: z.string().nullish(),
    sku: z.string().nullish(),
    status: ProductStatusSchema.nullish(),
    supplierId: z.string().nullish(),
    weight: z.number().nullish(),
    width: z.number().nullish()
  })
}
