import * as z from 'zod'
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
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
  Date: { input: Date; output: Date; }
  File: { input: File; output: File; }
};

export type AccountTransactions = {
  __typename?: 'AccountTransactions';
  amount: Scalars['Float']['output'];
  clientAccount: ClientAccounts;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  processedByUser?: Maybe<User>;
  referenceNumber?: Maybe<Scalars['String']['output']>;
  runningBalance?: Maybe<Scalars['Float']['output']>;
  sourceRecordId?: Maybe<Scalars['ID']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  transactionDate?: Maybe<Scalars['String']['output']>;
  type: TransactionType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type AccountingSyncLogs = {
  __typename?: 'AccountingSyncLogs';
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type AddInvoiceItemInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
};

export type AddOpportunityProductInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
};

export type Attachments = {
  __typename?: 'Attachments';
  createdAt?: Maybe<Scalars['Date']['output']>;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId?: Maybe<Scalars['ID']['output']>;
  recordType?: Maybe<RecordType>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type BillingInvoiceStatus =
  | 'CANCELLED'
  | 'DISPUTED'
  | 'DRAFT'
  | 'PAID'
  | 'PARTIAL_PAID'
  | 'PAST_DUE'
  | 'SENT'
  | 'VIEWED'
  | 'VOID';

export type BillingInvoices = {
  __typename?: 'BillingInvoices';
  amountOutstanding?: Maybe<Scalars['Float']['output']>;
  amountPaid?: Maybe<Scalars['Float']['output']>;
  client: Companies;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type BillingMutation = {
  __typename?: 'BillingMutation';
  addInvoiceLineItem: InvoiceLineItems;
  createAccountTransaction: AccountTransactions;
  createAccountingSyncLog: AccountingSyncLogs;
  createBillingInvoice: BillingInvoices;
  createClientAccount: ClientAccounts;
  createCreditNote: CreditNotes;
  createDispute: Disputes;
  createDocument: Documents;
  createPayment: Payments;
  createQuote: Quotes;
  createRateCard: RateCards;
  createRateRule: RateRules;
  createSurcharge: Surcharges;
  removeBillingInvoice: DeleteResult;
  removeClientAccount: DeleteResult;
  removeCreditNote: DeleteResult;
  removeDocument: DeleteResult;
  removeInvoiceLineItem: DeleteResult;
  removePayment: DeleteResult;
  removeQuote: DeleteResult;
  removeRateCard: DeleteResult;
  removeRateRule: DeleteResult;
  removeSurcharge: DeleteResult;
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


export type BillingMutationAddInvoiceLineItemArgs = {
  id: Scalars['ID']['input'];
  value: CreateInvoiceLineItemInput;
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


export type BillingMutationRemoveBillingInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveClientAccountArgs = {
  id: Scalars['ID']['input'];
};


export type BillingMutationRemoveCreditNoteArgs = {
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
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  location: Locations;
  maxQuantity: Scalars['Int']['output'];
  minQuantity: Scalars['Int']['output'];
  product: WmsProducts;
  reorderQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Campaigns = {
  __typename?: 'Campaigns';
  budget?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CarrierRateUnit =
  | 'FLAT_RATE'
  | 'PER_CONTAINER'
  | 'PER_KG'
  | 'PER_KM'
  | 'PER_MILE';

export type CarrierRates = {
  __typename?: 'CarrierRates';
  carrier: Carriers;
  createdAt?: Maybe<Scalars['Date']['output']>;
  destination?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  rate: Scalars['Float']['output'];
  serviceType?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<CarrierRateUnit>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Carriers = {
  __typename?: 'Carriers';
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  partnerInvoices?: Maybe<Array<PartnerInvoices>>;
  rates?: Maybe<Array<CarrierRates>>;
  servicesOffered?: Maybe<Scalars['String']['output']>;
  shipmentLegs?: Maybe<Array<ShipmentLegs>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CasePriority =
  | 'CRITICAL'
  | 'HIGH'
  | 'LOW'
  | 'MEDIUM';

export type CaseStatus =
  | 'CANCELLED'
  | 'CLOSED'
  | 'ESCALATED'
  | 'IN_PROGRESS'
  | 'NEW'
  | 'RESOLVED'
  | 'WAITING_FOR_CUSTOMER'
  | 'WAITING_FOR_INTERNAL';

export type CaseType =
  | 'BUG_REPORT'
  | 'COMPLAINT'
  | 'FEATURE_REQUEST'
  | 'PROBLEM'
  | 'QUESTION'
  | 'TECHNICAL_SUPPORT';

export type Cases = {
  __typename?: 'Cases';
  caseNumber: Scalars['String']['output'];
  contact?: Maybe<Contacts>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  owner?: Maybe<User>;
  priority?: Maybe<CasePriority>;
  status?: Maybe<CaseStatus>;
  type?: Maybe<CaseType>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ClientAccounts = {
  __typename?: 'ClientAccounts';
  availableCredit?: Maybe<Scalars['Float']['output']>;
  client: Companies;
  createdAt?: Maybe<Scalars['Date']['output']>;
  creditLimit?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isCreditApproved?: Maybe<Scalars['Boolean']['output']>;
  lastPaymentDate?: Maybe<Scalars['String']['output']>;
  paymentTermsDays?: Maybe<Scalars['Int']['output']>;
  transactions?: Maybe<Array<AccountTransactions>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  walletBalance?: Maybe<Scalars['Float']['output']>;
};

export type Companies = {
  __typename?: 'Companies';
  annualRevenue?: Maybe<Scalars['Float']['output']>;
  billingInvoices?: Maybe<Array<BillingInvoices>>;
  city?: Maybe<Scalars['String']['output']>;
  clientAccount?: Maybe<ClientAccounts>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type Contacts = {
  __typename?: 'Contacts';
  company: Companies;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
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
  clientId: Scalars['ID']['input'];
  createdByUserId?: InputMaybe<Scalars['ID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['String']['input'];
  invoiceNumber: Scalars['String']['input'];
  issueDate: Scalars['String']['input'];
  items: Array<CreateInvoiceLineItemInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['ID']['input']>;
  sentAt?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<BillingInvoiceStatus>;
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
  endDate?: InputMaybe<Scalars['Date']['input']>;
  name: Scalars['String']['input'];
  startDate: Scalars['Date']['input'];
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
  companyId: Scalars['ID']['input'];
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
  deliveryTaskId: Scalars['ID']['input'];
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  trackingToken: Scalars['String']['input'];
};

export type CreateDeliveryRouteInput = {
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
  deliveryAddress: Scalars['String']['input'];
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryRouteId: Scalars['ID']['input'];
  estimatedArrivalTime?: InputMaybe<Scalars['String']['input']>;
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
};

export type CreateDmsProofOfDeliveryInput = {
  deliveryTaskId: Scalars['ID']['input'];
  file?: InputMaybe<Scalars['File']['input']>;
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
  expenseDate?: InputMaybe<Scalars['Date']['input']>;
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
  timestamp: Scalars['Date']['input'];
  vehicleId: Scalars['ID']['input'];
};

export type CreateInboundShipmentInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  expectedArrivalDate?: InputMaybe<Scalars['String']['input']>;
  items: Array<CreateInboundShipmentItemInput>;
  status?: InputMaybe<InboundShipmentStatus>;
  warehouseId: Scalars['ID']['input'];
};

export type CreateInboundShipmentItemInput = {
  expectedQuantity: Scalars['Int']['input'];
  productId: Scalars['ID']['input'];
};

export type CreateInteractionInput = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  contactId: Scalars['ID']['input'];
  interactionDate?: InputMaybe<Scalars['Date']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<InteractionOutcome>;
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
  expirationDate?: InputMaybe<Scalars['Date']['input']>;
  productId: Scalars['ID']['input'];
};

export type CreateInventoryStockInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  locationId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  reservedQuantity: Scalars['Int']['input'];
  status?: InputMaybe<InventoryStockStatus>;
};

export type CreateInvoiceInput = {
  dueDate: Scalars['Date']['input'];
  issueDate: Scalars['Date']['input'];
  items: Array<CreateInvoiceItemInput>;
  opportunityId: Scalars['ID']['input'];
  paidAt?: InputMaybe<Scalars['Date']['input']>;
  paymentMethod?: InputMaybe<CrmInvoicePaymentMethod>;
  status?: InputMaybe<InvoiceStatus>;
};

export type CreateInvoiceItemInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
};

export type CreateInvoiceLineItemInput = {
  description: Scalars['String']['input'];
  discountRate?: InputMaybe<Scalars['Float']['input']>;
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
  expectedCloseDate?: InputMaybe<Scalars['Date']['input']>;
  lostReason?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
  products: Array<CreateOpportunityProductInput>;
  source: OpportunitySource;
  stage: OpportunityStage;
};

export type CreateOpportunityProductInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
};

export type CreateOutboundShipmentInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  items: Array<CreateOutboundShipmentItemInput>;
  salesOrderId: Scalars['ID']['input'];
  status?: InputMaybe<OutboundShipmentStatus>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId: Scalars['ID']['input'];
};

export type CreateOutboundShipmentItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
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
  serialNumbers: Array<Scalars['String']['input']>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreatePartnerInvoiceInput = {
  carrierId: Scalars['ID']['input'];
  invoiceDate: Scalars['String']['input'];
  invoiceNumber: Scalars['String']['input'];
  items: Array<CreatePartnerInvoiceItemInput>;
  status?: InputMaybe<PartnerInvoiceStatus>;
};

export type CreatePartnerInvoiceItemInput = {
  amount: Scalars['Float']['input'];
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
  assignedUserId?: InputMaybe<Scalars['ID']['input']>;
  batchNumber: Scalars['String']['input'];
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  items: Array<CreatePickBatchItemInput>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PickBatchStatus>;
  strategy: PickStrategy;
  warehouseId: Scalars['ID']['input'];
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions: Array<Scalars['String']['input']>;
};

export type CreatePickBatchItemInput = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
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
  files: Array<Scalars['File']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
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
  items: Array<CreateReturnItemInput>;
  reason?: InputMaybe<Scalars['String']['input']>;
  returnNumber: Scalars['String']['input'];
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ReturnStatus>;
};

export type CreateReturnItemInput = {
  condition?: InputMaybe<ReturnItemCondition>;
  productId: Scalars['ID']['input'];
  quantityExpected: Scalars['Int']['input'];
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
  items: Array<CreateSalesOrderItemInput>;
  orderNumber: Scalars['String']['input'];
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatus>;
};

export type CreateSalesOrderItemInput = {
  productId: Scalars['ID']['input'];
  quantityOrdered: Scalars['Int']['input'];
};

export type CreateShipmentLegEventInput = {
  location?: InputMaybe<Scalars['String']['input']>;
  shipmentLegId: Scalars['ID']['input'];
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type CreateShipmentLegInput = {
  carrierId?: InputMaybe<Scalars['ID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  internalTripId?: InputMaybe<Scalars['ID']['input']>;
  legSequence: Scalars['Int']['input'];
  shipmentId: Scalars['ID']['input'];
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
  endTime?: InputMaybe<Scalars['Date']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pickBatchId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  sourceEntityId?: InputMaybe<Scalars['ID']['input']>;
  sourceEntityType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<TaskStatus>;
  taskNumber: Scalars['String']['input'];
  type: TaskType;
  userId?: InputMaybe<Scalars['ID']['input']>;
  warehouseId: Scalars['ID']['input'];
};

export type CreateTaskItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  destinationLocationId?: InputMaybe<Scalars['ID']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  quantityCompleted: Scalars['Int']['input'];
  quantityRequired: Scalars['Int']['input'];
  serialNumbers: Array<Scalars['String']['input']>;
  sourceLocationId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TaskItemStatus>;
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
  serviceDate: Scalars['Date']['input'];
  serviceType?: InputMaybe<VehicleServiceType>;
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
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdByUser?: Maybe<User>;
  creditNoteNumber: Scalars['String']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  dispute?: Maybe<Disputes>;
  id: Scalars['ID']['output'];
  invoice: BillingInvoices;
  issueDate: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CrmInvoicePaymentMethod =
  | 'BANK_TRANSFER'
  | 'CASH'
  | 'CHECK'
  | 'CREDIT_CARD'
  | 'MAYA'
  | 'OTHER'
  | 'PAYPAL'
  | 'STRIPE'
  | 'WIRE_TRANSFER';

export type CrmMutation = {
  __typename?: 'CrmMutation';
  addInvoiceItem: InvoiceItems;
  addOpportunityProduct: OpportunityProducts;
  createAttachment: Attachments;
  createCampaign: Campaigns;
  createCase: Cases;
  createCompany: Companies;
  createContact: Contacts;
  createInteraction: Interactions;
  createInvoice: Invoices;
  createLead: Leads;
  createNotification: Notifications;
  createOpportunity: Opportunities;
  createProduct: Products;
  removeAttachment: DeleteResult;
  removeCampaign: DeleteResult;
  removeCase: DeleteResult;
  removeCompany: DeleteResult;
  removeContact: DeleteResult;
  removeInteraction: DeleteResult;
  removeInvoiceItem: DeleteResult;
  removeLead: DeleteResult;
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


export type CrmMutationAddInvoiceItemArgs = {
  id: Scalars['ID']['input'];
  value: AddInvoiceItemInput;
};


export type CrmMutationAddOpportunityProductArgs = {
  id: Scalars['ID']['input'];
  value: CreateOpportunityProductInput;
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


export type CrmMutationCreateLeadArgs = {
  value: CreateLeadInput;
};


export type CrmMutationCreateNotificationArgs = {
  value: CreateNotificationInput;
};


export type CrmMutationCreateOpportunityArgs = {
  value: CreateOpportunityInput;
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


export type CrmMutationRemoveInvoiceItemArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveLeadArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationRemoveOpportunityProductArgs = {
  id: Scalars['ID']['input'];
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
  value: UpdateInvoiceItemInput;
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
  value: UpdateOpportunityInput;
};


export type CrmMutationUpdateOpportunityProductArgs = {
  id: Scalars['ID']['input'];
  value: UpdateOpportunityProductInput;
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

export type Currency =
  | 'AUD'
  | 'CAD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'PHP'
  | 'USD';

export type CustomerTrackingLinks = {
  __typename?: 'CustomerTrackingLinks';
  accessCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deliveryTask: DeliveryTasks;
  expiresAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastAccessedAt?: Maybe<Scalars['String']['output']>;
  trackingToken: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type DeleteResult = {
  __typename?: 'DeleteResult';
  numDeletedRows: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeliveryFailureReason =
  | 'ACCESS_DENIED'
  | 'ADDRESS_NOT_FOUND'
  | 'DAMAGED_PACKAGE'
  | 'OTHER'
  | 'RECIPIENT_NOT_HOME'
  | 'REFUSED_DELIVERY'
  | 'VEHICLE_BREAKDOWN'
  | 'WEATHER_CONDITIONS';

export type DeliveryRouteStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'PAUSED'
  | 'PLANNED';

export type DeliveryRoutes = {
  __typename?: 'DeliveryRoutes';
  actualDurationMinutes?: Maybe<Scalars['Int']['output']>;
  completedAt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  driver: Drivers;
  estimatedDurationMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  routeDate: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<DeliveryRouteStatus>;
  tasks?: Maybe<Array<DeliveryTasks>>;
  totalDistanceKm?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type DeliveryTaskStatus =
  | 'ASSIGNED'
  | 'CANCELLED'
  | 'DELIVERED'
  | 'FAILED'
  | 'OUT_FOR_DELIVERY'
  | 'PENDING'
  | 'RESCHEDULED';

export type DeliveryTasks = {
  __typename?: 'DeliveryTasks';
  actualArrivalTime?: Maybe<Scalars['String']['output']>;
  attemptCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type DisputeStatus =
  | 'APPROVED'
  | 'CLOSED'
  | 'DENIED'
  | 'ESCALATED'
  | 'OPEN'
  | 'UNDER_REVIEW';

export type Disputes = {
  __typename?: 'Disputes';
  client: Companies;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type DmsMutation = {
  __typename?: 'DmsMutation';
  createCustomerTrackingLink: CustomerTrackingLinks;
  createDeliveryRoute: DeliveryRoutes;
  createDeliveryTask: DeliveryTasks;
  createDmsProofOfDelivery: DmsProofOfDeliveries;
  createDriverLocation: DriverLocations;
  createTaskEvent: TaskEvents;
  removeDeliveryRoute: DeleteResult;
  removeDriverLocation: DeleteResult;
  updateCustomerTrackingLink: CustomerTrackingLinks;
  updateDeliveryRoute: DeliveryRoutes;
  updateDeliveryTask: DeliveryTasks;
  updateDriverLocation: DriverLocations;
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


export type DmsMutationRemoveDeliveryRouteArgs = {
  id: Scalars['ID']['input'];
};


export type DmsMutationRemoveDriverLocationArgs = {
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


export type DmsMutationUpdateDriverLocationArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDriverLocationInput>;
};

export type DmsProofOfDeliveries = {
  __typename?: 'DmsProofOfDeliveries';
  createdAt?: Maybe<Scalars['Date']['output']>;
  deliveryTask: DeliveryTasks;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  recipientName?: Maybe<Scalars['String']['output']>;
  signatureData?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  type: ProofOfDeliveryType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
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

export type DocumentType =
  | 'BOL'
  | 'COMMERCIAL_INVOICE'
  | 'CREDIT_NOTE'
  | 'CUSTOMS_DECLARATION'
  | 'PACKING_LIST'
  | 'PROOF_OF_DELIVERY'
  | 'RECEIPT'
  | 'SHIPPING_LABEL';

export type Documents = {
  __typename?: 'Documents';
  createdAt?: Maybe<Scalars['Date']['output']>;
  documentType: DocumentType;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  fileSize?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId: Scalars['ID']['output'];
  recordType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  uploadedByUser?: Maybe<User>;
};

export type DriverLocations = {
  __typename?: 'DriverLocations';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  driver: Drivers;
  heading?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  speedKmh?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type DriverScheduleReason =
  | 'PERSONAL_LEAVE'
  | 'SICK_LEAVE'
  | 'TRAINING'
  | 'VACATION';

export type DriverSchedules = {
  __typename?: 'DriverSchedules';
  createdAt?: Maybe<Scalars['Date']['output']>;
  driver: Drivers;
  endDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  reason?: Maybe<DriverScheduleReason>;
  startDate: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type DriverStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'ON_LEAVE';

export type Drivers = {
  __typename?: 'Drivers';
  contactPhone?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  deliveryRoutes?: Maybe<Array<DeliveryRoutes>>;
  driverLocations?: Maybe<Array<DriverLocations>>;
  expenses?: Maybe<Array<Expenses>>;
  id: Scalars['ID']['output'];
  licenseExpiryDate?: Maybe<Scalars['String']['output']>;
  licenseNumber: Scalars['String']['output'];
  schedules?: Maybe<Array<DriverSchedules>>;
  status?: Maybe<DriverStatus>;
  trips?: Maybe<Array<Trips>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: User;
};

export type ExpenseStatus =
  | 'APPROVED'
  | 'PENDING'
  | 'REIMBURSED'
  | 'REJECTED';

export type ExpenseType =
  | 'ACCOMMODATION'
  | 'FUEL'
  | 'MAINTENANCE'
  | 'MEALS'
  | 'PARKING'
  | 'TOLLS';

export type Expenses = {
  __typename?: 'Expenses';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type GeofenceEventType =
  | 'ENTER'
  | 'EXIT';

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
  createdAt?: Maybe<Scalars['Date']['output']>;
  events?: Maybe<Array<GeofenceEvents>>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type GpsPings = {
  __typename?: 'GpsPings';
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  timestamp: Scalars['Date']['output'];
  vehicle: Vehicles;
};

export type InboundShipmentItems = {
  __typename?: 'InboundShipmentItems';
  createdAt?: Maybe<Scalars['Date']['output']>;
  discrepancyNotes?: Maybe<Scalars['String']['output']>;
  discrepancyQuantity?: Maybe<Scalars['Int']['output']>;
  expectedQuantity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  inboundShipment: InboundShipments;
  product: WmsProducts;
  receivedQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type InboundShipmentStatus =
  | 'ARRIVED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'PENDING'
  | 'PROCESSING';

export type InboundShipments = {
  __typename?: 'InboundShipments';
  actualArrivalDate?: Maybe<Scalars['String']['output']>;
  client?: Maybe<Companies>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  expectedArrivalDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<InboundShipmentItems>>;
  status?: Maybe<InboundShipmentStatus>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  warehouseId: Scalars['ID']['output'];
};

export type InteractionOutcome =
  | 'COMPLETED'
  | 'NO_ANSWER'
  | 'OTHER'
  | 'SCHEDULED';

export type InteractionType =
  | 'CALL'
  | 'EMAIL'
  | 'MEETING'
  | 'TEXT';

export type Interactions = {
  __typename?: 'Interactions';
  case?: Maybe<Cases>;
  contact: Contacts;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  interactionDate?: Maybe<Scalars['Date']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  outcome?: Maybe<InteractionOutcome>;
  type?: Maybe<InteractionType>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<User>;
};

export type InventoryAdjustmentReason =
  | 'CYCLE_COUNT'
  | 'DAMAGED_GOODS'
  | 'EXPIRED'
  | 'MANUAL_CORRECTION'
  | 'RETURN_TO_VENDOR'
  | 'THEFT';

export type InventoryAdjustments = {
  __typename?: 'InventoryAdjustments';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  product: WmsProducts;
  quantityChange: Scalars['Int']['output'];
  reason?: Maybe<InventoryAdjustmentReason>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: User;
  warehouseId: Scalars['ID']['output'];
};

export type InventoryBatches = {
  __typename?: 'InventoryBatches';
  batchNumber: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  expirationDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  inventoryStock?: Maybe<Array<InventoryStock>>;
  outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
  packageItems?: Maybe<Array<PackageItems>>;
  product: WmsProducts;
  taskItems?: Maybe<Array<TaskItems>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type InventoryStock = {
  __typename?: 'InventoryStock';
  availableQuantity?: Maybe<Scalars['Int']['output']>;
  batch?: Maybe<InventoryBatches>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  lastCountedAt?: Maybe<Scalars['Date']['output']>;
  lastMovementAt?: Maybe<Scalars['Date']['output']>;
  location: Locations;
  product: WmsProducts;
  quantity: Scalars['Int']['output'];
  reservedQuantity: Scalars['Int']['output'];
  status?: Maybe<InventoryStockStatus>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type InventoryStockStatus =
  | 'ALLOCATED'
  | 'AVAILABLE'
  | 'DAMAGED'
  | 'EXPIRED'
  | 'HOLD'
  | 'QUARANTINE'
  | 'SHIPPED';

export type InvoiceItems = {
  __typename?: 'InvoiceItems';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  invoice: Invoices;
  price: Scalars['Float']['output'];
  product: Products;
  quantity: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type InvoiceLineItems = {
  __typename?: 'InvoiceLineItems';
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type InvoiceStatus =
  | 'CANCELLED'
  | 'DRAFT'
  | 'OVERDUE'
  | 'PAID'
  | 'SENT';

export type Invoices = {
  __typename?: 'Invoices';
  createdAt?: Maybe<Scalars['Date']['output']>;
  dueDate: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  issueDate: Scalars['Date']['output'];
  items?: Maybe<Array<InvoiceItems>>;
  opportunity: Opportunities;
  paidAt?: Maybe<Scalars['Date']['output']>;
  paymentMethod?: Maybe<CrmInvoicePaymentMethod>;
  sentAt?: Maybe<Scalars['Date']['output']>;
  status?: Maybe<InvoiceStatus>;
  total: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type LeadSource =
  | 'ADVERTISMENT'
  | 'COLD_CALL'
  | 'EMAIL_CAMPAIGN'
  | 'EVENT'
  | 'OTHER'
  | 'PARTNER'
  | 'REFERRAL'
  | 'SOCIAL_MEDIA'
  | 'WEBSITE';

export type LeadStatus =
  | 'CONTACTED'
  | 'CONVERTED'
  | 'NEW'
  | 'QUALIFIED'
  | 'UNQUALIFIED';

export type Leads = {
  __typename?: 'Leads';
  campaign?: Maybe<Campaigns>;
  convertedAt?: Maybe<Scalars['Date']['output']>;
  convertedCompany?: Maybe<Companies>;
  convertedContact?: Maybe<Contacts>;
  convertedOpportunity?: Maybe<Opportunities>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  leadScore?: Maybe<Scalars['Int']['output']>;
  leadSource?: Maybe<LeadSource>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  status?: Maybe<LeadStatus>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type LocationType =
  | 'BULK_STORAGE'
  | 'CROSS_DOCK_AREA'
  | 'DAMAGED_GOODS'
  | 'PACKING_STATION'
  | 'PICK_BIN'
  | 'QUALITY_CONTROL'
  | 'RECEIVING_DOCK'
  | 'RESERVE_STORAGE'
  | 'RETURNS_AREA'
  | 'STAGING_AREA';

export type Locations = {
  __typename?: 'Locations';
  barcode?: Maybe<Scalars['String']['output']>;
  binThresholds?: Maybe<Array<BinThresholds>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
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
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  isRead?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user: User;
};

export type Opportunities = {
  __typename?: 'Opportunities';
  campaign?: Maybe<Campaigns>;
  company?: Maybe<Companies>;
  contact?: Maybe<Contacts>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  dealValue?: Maybe<Scalars['Float']['output']>;
  expectedCloseDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  lostReason?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  probability?: Maybe<Scalars['Float']['output']>;
  products?: Maybe<Array<OpportunityProducts>>;
  salesOrders?: Maybe<Array<SalesOrders>>;
  source?: Maybe<OpportunitySource>;
  stage?: Maybe<OpportunityStage>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type OpportunityProducts = {
  __typename?: 'OpportunityProducts';
  id: Scalars['ID']['output'];
  opportunity: Opportunities;
  product: Products;
  quantity: Scalars['Float']['output'];
};

export type OpportunitySource =
  | 'ADVERTISMENT'
  | 'COLD_CALL'
  | 'EMAIL_CAMPAIGN'
  | 'EVENT'
  | 'EXISTING_CUSTOMER'
  | 'OTHER'
  | 'PARTNER'
  | 'REFERRAL'
  | 'SOCIAL_MEDIA'
  | 'WEBSITE';

export type OpportunityStage =
  | 'CLOSED_LOST'
  | 'CLOSED_WON'
  | 'DEMO'
  | 'NEED_ANALYSIS'
  | 'NEGOTIATION'
  | 'PROPOSAL'
  | 'PROSPECTING'
  | 'QUALIFICATION';

export type OutboundShipmentItems = {
  __typename?: 'OutboundShipmentItems';
  batch?: Maybe<InventoryBatches>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  outboundShipment: OutboundShipments;
  product: WmsProducts;
  quantityShipped: Scalars['Int']['output'];
  salesOrderItem: SalesOrderItems;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type OutboundShipmentStatus =
  | 'CANCELLED'
  | 'DELIVERED'
  | 'PACKED'
  | 'PICKING'
  | 'SHIPPED';

export type OutboundShipments = {
  __typename?: 'OutboundShipments';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<OutboundShipmentItems>>;
  salesOrder: SalesOrders;
  status?: Maybe<OutboundShipmentStatus>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  warehouseId: Scalars['ID']['output'];
};

export type PackageItems = {
  __typename?: 'PackageItems';
  batch?: Maybe<InventoryBatches>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  package: Packages;
  product: WmsProducts;
  quantity: Scalars['Int']['output'];
  serialNumbers: Array<Scalars['String']['output']>;
  totalWeight?: Maybe<Scalars['Float']['output']>;
  unitWeight?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Packages = {
  __typename?: 'Packages';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
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

export type PartnerInvoiceStatus =
  | 'CANCELLED'
  | 'DISPUTED'
  | 'OVERDUE'
  | 'PAID'
  | 'PENDING';

export type PartnerInvoices = {
  __typename?: 'PartnerInvoices';
  carrier: Carriers;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  invoiceDate: Scalars['String']['output'];
  invoiceNumber: Scalars['String']['output'];
  items?: Maybe<Array<PartnerInvoiceItems>>;
  status?: Maybe<PartnerInvoiceStatus>;
  totalAmount: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PaymentMethod =
  | 'BANK_TRANSFER'
  | 'CASH'
  | 'CHECK'
  | 'CLIENT_CREDIT'
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'QR_PH'
  | 'WALLET';

export type PaymentStatus =
  | 'CANCELLED'
  | 'FAILED'
  | 'PENDING'
  | 'PROCESSING'
  | 'REFUNDED'
  | 'SUCCESSFUL';

export type Payments = {
  __typename?: 'Payments';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PickBatchItems = {
  __typename?: 'PickBatchItems';
  actualPickTime?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  estimatedPickTime?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  orderPriority?: Maybe<Scalars['Int']['output']>;
  pickBatch: PickBatches;
  salesOrder: SalesOrders;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PickBatchStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'OPEN';

export type PickBatches = {
  __typename?: 'PickBatches';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  assignedUser?: Maybe<User>;
  batchNumber: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['String']['output']>;
  completedItems?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<PickBatchItems>>;
  priority?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<PickBatchStatus>;
  strategy: PickStrategy;
  tasks?: Maybe<Array<Tasks>>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  warehouse: Warehouses;
  waveId?: Maybe<Scalars['String']['output']>;
  zoneRestrictions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type PickStrategy =
  | 'BATCH_PICKING'
  | 'CLUSTER_PICKING'
  | 'SINGLE_ORDER_PICKING'
  | 'WAVE_PICKING'
  | 'ZONE_PICKING';

export type PricingModel =
  | 'FLAT_RATE'
  | 'PERCENTAGE'
  | 'PER_CUBIC_METER'
  | 'PER_ITEM'
  | 'PER_KG'
  | 'PER_ZONE'
  | 'TIERED';

export type ProductStatus =
  | 'ACTIVE'
  | 'DISCONTINUED'
  | 'INACTIVE'
  | 'OBSOLETE';

export type ProductType =
  | 'DIGITAL'
  | 'GOOD'
  | 'SERVICE'
  | 'SUBSCRIPTION';

export type Products = {
  __typename?: 'Products';
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProofOfDeliveries = {
  __typename?: 'ProofOfDeliveries';
  createdAt?: Maybe<Scalars['Date']['output']>;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp: Scalars['String']['output'];
  tripStop: TripStops;
  type?: Maybe<ProofType>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProofOfDeliveryType =
  | 'CODE_VERIFICATION'
  | 'CONTACTLESS_DELIVERY'
  | 'LEFT_AT_DOOR'
  | 'PHOTO'
  | 'SIGNATURE';

export type ProofType =
  | 'BARCODE_SCAN'
  | 'PHOTO'
  | 'PIN_VERIFICATION'
  | 'SIGNATURE';

export type PutawayRules = {
  __typename?: 'PutawayRules';
  client?: Maybe<Companies>;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
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

export type QuoteStatus =
  | 'ACCEPTED'
  | 'CANCELLED'
  | 'CONVERTED'
  | 'EXPIRED'
  | 'PENDING';

export type Quotes = {
  __typename?: 'Quotes';
  billingInvoices?: Maybe<Array<BillingInvoices>>;
  client?: Maybe<Companies>;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type RateCards = {
  __typename?: 'RateCards';
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdByUser?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  rules?: Maybe<Array<RateRules>>;
  serviceType: ServiceType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  validFrom: Scalars['String']['output'];
  validTo?: Maybe<Scalars['String']['output']>;
};

export type RateRules = {
  __typename?: 'RateRules';
  condition: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  maxValue?: Maybe<Scalars['Float']['output']>;
  minValue?: Maybe<Scalars['Float']['output']>;
  price: Scalars['Float']['output'];
  pricingModel: PricingModel;
  priority?: Maybe<Scalars['Int']['output']>;
  rateCard: RateCards;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  value: Scalars['String']['output'];
};

export type RecordType =
  | 'CAMPAIGNS'
  | 'CASES'
  | 'COMPANIES'
  | 'CONTACTS'
  | 'INTERACTIONS'
  | 'INVOICES'
  | 'LEADS'
  | 'OPPORTUNITIES'
  | 'PRODUCTS';

export type ReorderPoints = {
  __typename?: 'ReorderPoints';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  product: WmsProducts;
  threshold: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  warehouse: Warehouses;
};

export type ReturnItemCondition =
  | 'DAMAGED'
  | 'DEFECTIVE'
  | 'EXPIRED'
  | 'SELLABLE'
  | 'UNSELLABLE';

export type ReturnItems = {
  __typename?: 'ReturnItems';
  condition?: Maybe<ReturnItemCondition>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  product: WmsProducts;
  quantityExpected: Scalars['Int']['output'];
  quantityReceived?: Maybe<Scalars['Int']['output']>;
  quantityVariance?: Maybe<Scalars['Int']['output']>;
  return: Returns;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ReturnStatus =
  | 'APPROVED'
  | 'PROCESSED'
  | 'RECEIVED'
  | 'REJECTED'
  | 'REQUESTED';

export type Returns = {
  __typename?: 'Returns';
  client: Companies;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<ReturnItems>>;
  reason?: Maybe<Scalars['String']['output']>;
  returnNumber: Scalars['String']['output'];
  salesOrder?: Maybe<SalesOrders>;
  status?: Maybe<ReturnStatus>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Routes = {
  __typename?: 'Routes';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  totalDistance?: Maybe<Scalars['Float']['output']>;
  totalDuration?: Maybe<Scalars['Float']['output']>;
  trip: Trips;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type SalesOrderItems = {
  __typename?: 'SalesOrderItems';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
  product: WmsProducts;
  quantityOrdered: Scalars['Int']['output'];
  salesOrder: SalesOrders;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type SalesOrderStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED';

export type SalesOrders = {
  __typename?: 'SalesOrders';
  client: Companies;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ServiceType =
  | 'CUSTOMS'
  | 'FULFILLMENT'
  | 'HANDLING'
  | 'INSURANCE'
  | 'PACKAGING'
  | 'RETURNS'
  | 'SHIPPING'
  | 'STORAGE';

export type ShipmentLegEvents = {
  __typename?: 'ShipmentLegEvents';
  eventTimestamp: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  shipmentLeg: ShipmentLegs;
  statusMessage?: Maybe<Scalars['String']['output']>;
};

export type ShipmentLegStatus =
  | 'CANCELLED'
  | 'DELIVERED'
  | 'FAILED'
  | 'IN_TRANSIT'
  | 'PENDING';

export type ShipmentLegs = {
  __typename?: 'ShipmentLegs';
  carrier?: Maybe<Carriers>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  endLocation?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<ShipmentLegEvents>>;
  id: Scalars['ID']['output'];
  internalTrip?: Maybe<Trips>;
  legSequence: Scalars['Int']['output'];
  partnerInvoiceItems?: Maybe<Array<PartnerInvoiceItems>>;
  shipment?: Maybe<OutboundShipments>;
  startLocation?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShipmentLegStatus>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type StockTransferStatus =
  | 'CANCELLED'
  | 'IN_TRANSIT'
  | 'PENDING'
  | 'RECEIVED';

export type StockTransfers = {
  __typename?: 'StockTransfers';
  createdAt?: Maybe<Scalars['Date']['output']>;
  destinationWarehouse: Warehouses;
  id: Scalars['ID']['output'];
  product: WmsProducts;
  quantity: Scalars['Int']['output'];
  sourceWarehouse: Warehouses;
  status?: Maybe<StockTransferStatus>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Suppliers = {
  __typename?: 'Suppliers';
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<WmsProducts>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type SurchargeCalculationMethod =
  | 'FIXED'
  | 'PERCENTAGE'
  | 'PER_UNIT'
  | 'SLIDING_SCALE';

export type Surcharges = {
  __typename?: 'Surcharges';
  amount: Scalars['Float']['output'];
  calculationMethod: SurchargeCalculationMethod;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
  validFrom?: Maybe<Scalars['String']['output']>;
  validTo?: Maybe<Scalars['String']['output']>;
};

export type SyncStatus =
  | 'FAILED'
  | 'IN_PROGRESS'
  | 'PENDING'
  | 'RETRY'
  | 'SUCCESS';

export type TaskEventStatus =
  | 'ARRIVED'
  | 'ASSIGNED'
  | 'CANCELLED'
  | 'DELIVERED'
  | 'EXCEPTION'
  | 'FAILED'
  | 'RESCHEDULED'
  | 'STARTED';

export type TaskEvents = {
  __typename?: 'TaskEvents';
  createdAt?: Maybe<Scalars['Date']['output']>;
  deliveryTask: DeliveryTasks;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status: TaskEventStatus;
  timestamp?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type TaskItemStatus =
  | 'COMPLETED'
  | 'DAMAGED'
  | 'IN_PROGRESS'
  | 'NOT_FOUND'
  | 'PENDING'
  | 'SHORT_PICKED';

export type TaskItems = {
  __typename?: 'TaskItems';
  batch?: Maybe<InventoryBatches>;
  completedAt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type TaskStatus =
  | 'ASSIGNED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'ERROR'
  | 'IN_PROGRESS'
  | 'PENDING';

export type TaskType =
  | 'CROSS_DOCK'
  | 'CYCLE_COUNT'
  | 'DAMAGE_INSPECTION'
  | 'PACK'
  | 'PICK'
  | 'PUTAWAY'
  | 'QUALITY_CHECK'
  | 'REPLENISHMENT'
  | 'RETURNS_PROCESSING';

export type Tasks = {
  __typename?: 'Tasks';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<User>;
  warehouse: Warehouses;
};

export type TmsMutation = {
  __typename?: 'TmsMutation';
  addPartnerInvoiceItem: PartnerInvoiceItems;
  addVehicleMaintenance: VehicleMaintenance;
  createCarrier: Carriers;
  createCarrierRate: CarrierRates;
  createDriver: Drivers;
  createDriverSchedule: DriverSchedules;
  createExpense: Expenses;
  createGeofence: Geofences;
  createGeofenceEvent: GeofenceEvents;
  createGpsPing: GpsPings;
  createPartnerInvoice: PartnerInvoices;
  createProofOfDelivery: ProofOfDeliveries;
  createRoute: Routes;
  createShipmentLeg: ShipmentLegs;
  createShipmentLegEvent: ShipmentLegEvents;
  createTrip: Trips;
  createTripStop: TripStops;
  createVehicle: Vehicles;
  removeCarrier: DeleteResult;
  removeCarrierRate: DeleteResult;
  removeDriver: DeleteResult;
  removeDriverSchedule: DeleteResult;
  removeExpense: DeleteResult;
  removeGeofence: DeleteResult;
  removePartnerInvoiceItem: DeleteResult;
  removeRoute: DeleteResult;
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
  updateTrip: Trips;
  updateTripStop: TripStops;
  updateVehicle: Vehicles;
  updateVehicleMaintenance: VehicleMaintenance;
};


export type TmsMutationAddPartnerInvoiceItemArgs = {
  id: Scalars['ID']['input'];
  value: CreatePartnerInvoiceItemInput;
};


export type TmsMutationAddVehicleMaintenanceArgs = {
  id: Scalars['ID']['input'];
  value: CreateVehicleMaintenanceInput;
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


export type TmsMutationRemovePartnerInvoiceItemArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationRemoveRouteArgs = {
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

export type TransactionType =
  | 'ADJUSTMENT'
  | 'CREDIT'
  | 'DEBIT'
  | 'FEE'
  | 'REFUND'
  | 'TOP_UP';

export type TripStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'PLANNED';

export type TripStopStatus =
  | 'ARRIVED'
  | 'COMPLETED'
  | 'PENDING'
  | 'SKIPPED';

export type TripStops = {
  __typename?: 'TripStops';
  actualArrivalTime?: Maybe<Scalars['String']['output']>;
  actualDepartureTime?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['String']['output']>;
  estimatedDepartureTime?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  proofOfDeliveries?: Maybe<Array<ProofOfDeliveries>>;
  sequence: Scalars['Int']['output'];
  shipment?: Maybe<OutboundShipments>;
  status?: Maybe<TripStopStatus>;
  trip: Trips;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Trips = {
  __typename?: 'Trips';
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
  vehicle?: Maybe<Vehicles>;
};

export type UpdateBillingInvoiceInput = {
  amountPaid?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paidAt?: InputMaybe<Scalars['Date']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BillingInvoiceStatus>;
};

export type UpdateBinThresholdInput = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCampaignInput = {
  budget?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateCarrierInput = {
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCarrierRateInput = {
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Float']['input']>;
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnit>;
};

export type UpdateCaseInput = {
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type UpdateClientAccountInput = {
  availableCredit?: InputMaybe<Scalars['Float']['input']>;
  creditLimit?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['Date']['input']>;
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
  walletBalance?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateCompanyInput = {
  annualRevenue?: InputMaybe<Scalars['Float']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContactInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCreditNoteInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  appliedAt?: InputMaybe<Scalars['String']['input']>;
  creditNoteNumber?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerTrackingLinkInput = {
  accessCount?: InputMaybe<Scalars['Int']['input']>;
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateDeliveryRouteInput = {
  completedAt?: InputMaybe<Scalars['String']['input']>;
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
  deliveryTime?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['String']['input']>;
  failureReason?: InputMaybe<DeliveryFailureReason>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DeliveryTaskStatus>;
};

export type UpdateDisputeInput = {
  disputedAmount?: InputMaybe<Scalars['Float']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
  resolvedAt?: InputMaybe<Scalars['String']['input']>;
  resolvedByUserId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<DisputeStatus>;
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
};

export type UpdateDriverLocationInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateDriverScheduleInput = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<DriverScheduleReason>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenseInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Currency>;
  description?: InputMaybe<Scalars['String']['input']>;
  expenseDate?: InputMaybe<Scalars['Date']['input']>;
  fuelQuantity?: InputMaybe<Scalars['Float']['input']>;
  odometerReading?: InputMaybe<Scalars['Int']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatus>;
  type?: InputMaybe<ExpenseType>;
};

export type UpdateGeofenceEventInput = {
  eventType?: InputMaybe<GeofenceEventType>;
};

export type UpdateGeofenceInput = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGpsPingInput = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateInboundShipmentInput = {
  actualArrivalDate?: InputMaybe<Scalars['String']['input']>;
  expectedArrivalDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InboundShipmentStatus>;
};

export type UpdateInboundShipmentItemInput = {
  discrepancyNotes?: InputMaybe<Scalars['String']['input']>;
  expectedQuantity?: InputMaybe<Scalars['Int']['input']>;
  receivedQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateInteractionInput = {
  interactionDate?: InputMaybe<Scalars['Date']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<InteractionOutcome>;
  type?: InputMaybe<InteractionType>;
};

export type UpdateInventoryAdjustmentInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  quantityChange?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<InventoryAdjustmentReason>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInventoryBatchInput = {
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  expirationDate?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateInventoryStockInput = {
  lastCountedAt?: InputMaybe<Scalars['Date']['input']>;
  lastMovementAt?: InputMaybe<Scalars['Date']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  reservedQuantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InventoryStockStatus>;
};

export type UpdateInvoiceInput = {
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  paidAt?: InputMaybe<Scalars['Date']['input']>;
  paymentMethod?: InputMaybe<CrmInvoicePaymentMethod>;
  status?: InputMaybe<InvoiceStatus>;
};

export type UpdateInvoiceItemInput = {
  quantity: Scalars['Float']['input'];
};

export type UpdateInvoiceLineItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  discountRate?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  taxRate?: InputMaybe<Scalars['Float']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateLeadInput = {
  convertedAt?: InputMaybe<Scalars['Date']['input']>;
  convertedCompanyId?: InputMaybe<Scalars['ID']['input']>;
  convertedContactId?: InputMaybe<Scalars['ID']['input']>;
  convertedOpportunityId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  leadScore?: InputMaybe<Scalars['Int']['input']>;
  leadSource?: InputMaybe<LeadSource>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<LocationType>;
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateOpportunityInput = {
  dealValue?: InputMaybe<Scalars['Float']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['Date']['input']>;
  lostReason?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  probability?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
};

export type UpdateOpportunityProductInput = {
  quantity: Scalars['Float']['input'];
};

export type UpdateOutboundShipmentInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OutboundShipmentStatus>;
};

export type UpdateOutboundShipmentItemInput = {
  quantityShipped?: InputMaybe<Scalars['Int']['input']>;
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
  packedAt?: InputMaybe<Scalars['Date']['input']>;
  requiresSignature?: InputMaybe<Scalars['Boolean']['input']>;
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['Date']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePackageItemInput = {
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePartnerInvoiceInput = {
  status?: InputMaybe<PartnerInvoiceStatus>;
};

export type UpdatePartnerInvoiceItemInput = {
  amount: Scalars['Float']['input'];
};

export type UpdatePaymentInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  exchangeRate?: InputMaybe<Scalars['Float']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PaymentStatus>;
};

export type UpdatePickBatchInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['ID']['input']>;
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  completedAt?: InputMaybe<Scalars['Date']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<PickBatchStatus>;
  strategy?: InputMaybe<PickStrategy>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions: Array<Scalars['String']['input']>;
};

export type UpdatePickBatchItemInput = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type UpdateProofOfDeliveryInput = {
  type?: InputMaybe<ProofType>;
};

export type UpdatePutawayRuleInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationType?: InputMaybe<LocationType>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  preferredLocationId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  requiresHazmatApproval?: InputMaybe<Scalars['Boolean']['input']>;
  requiresTemperatureControl?: InputMaybe<Scalars['Boolean']['input']>;
  volumeThreshold?: InputMaybe<Scalars['Float']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  weightThreshold?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateQuoteInput = {
  destinationDetails?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  originDetails?: InputMaybe<Scalars['String']['input']>;
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
  threshold?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateReturnInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ReturnStatus>;
};

export type UpdateReturnItemInput = {
  condition?: InputMaybe<ReturnItemCondition>;
  quantityReceived?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRouteInput = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateSalesOrderInput = {
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatus>;
};

export type UpdateSalesOrderItemInput = {
  quantityOrdered?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateShipmentLegInput = {
  carrierId?: InputMaybe<Scalars['ID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  internalTripId?: InputMaybe<Scalars['ID']['input']>;
  legSequence?: InputMaybe<Scalars['Int']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatus>;
};

export type UpdateStockTransferInput = {
  destinationWarehouseId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
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

export type UpdateTaskInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['Date']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pickBatchId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  sourceEntityId?: InputMaybe<Scalars['ID']['input']>;
  sourceEntityType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<TaskStatus>;
  taskNumber?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TaskType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTaskItemInput = {
  completedAt?: InputMaybe<Scalars['String']['input']>;
  destinationLocationId?: InputMaybe<Scalars['ID']['input']>;
  expiryDate?: InputMaybe<Scalars['Date']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  quantityCompleted?: InputMaybe<Scalars['Int']['input']>;
  quantityRequired?: InputMaybe<Scalars['Int']['input']>;
  sourceLocationId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TaskItemStatus>;
};

export type UpdateTripInput = {
  endLocation?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TripStatus>;
};

export type UpdateTripStopInput = {
  actualArrivalTime?: InputMaybe<Scalars['String']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['String']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['String']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<TripStopStatus>;
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
  serviceDate?: InputMaybe<Scalars['Date']['input']>;
  serviceType?: InputMaybe<VehicleServiceType>;
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
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  banExpires?: Maybe<Scalars['Date']['output']>;
  banReason?: Maybe<Scalars['String']['output']>;
  banned?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type VehicleMaintenance = {
  __typename?: 'VehicleMaintenance';
  cost?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  serviceDate: Scalars['Date']['output'];
  serviceType?: Maybe<VehicleServiceType>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  vehicle: Vehicles;
};

export type VehicleServiceType =
  | 'BRAKE_SERVICE'
  | 'INSPECTION'
  | 'OIL_CHANGE'
  | 'REPAIR'
  | 'ROUTINE_MAINTENANCE'
  | 'TIRE_REPLACEMENT';

export type VehicleStatus =
  | 'AVAILABLE'
  | 'IN_MAINTENANCE'
  | 'ON_TRIP'
  | 'OUT_OF_SERVICE';

export type Vehicles = {
  __typename?: 'Vehicles';
  capacityVolume?: Maybe<Scalars['Float']['output']>;
  capacityWeight?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
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
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type WmsMutation = {
  __typename?: 'WmsMutation';
  addInboundShipmentItem: InboundShipmentItems;
  addOutboundShipmentItem: OutboundShipmentItems;
  addPackageItem: PackageItems;
  addPickBatchItem: PickBatchItems;
  addReturnItem: ReturnItems;
  addSalesOrderItem: SalesOrderItems;
  addTaskItem: TaskItems;
  createBinThreshold: BinThresholds;
  createInboundShipment: InboundShipments;
  createInventoryAdjustment: InventoryAdjustments;
  createInventoryBatch: InventoryBatches;
  createInventoryStock: InventoryStock;
  createLocation: Locations;
  createOutboundShipment: OutboundShipments;
  createPackage: Packages;
  createPickBatch: PickBatches;
  createPutawayRule: PutawayRules;
  createReorderPoint: ReorderPoints;
  createReturn: Returns;
  createSalesOrder: SalesOrders;
  createStockTransfer: StockTransfers;
  createSupplier: Suppliers;
  createTask: Tasks;
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


export type WmsMutationAddInboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
  value: CreateInboundShipmentItemInput;
};


export type WmsMutationAddOutboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
  value: CreateOutboundShipmentItemInput;
};


export type WmsMutationAddPackageItemArgs = {
  id: Scalars['ID']['input'];
  value: CreatePackageItemInput;
};


export type WmsMutationAddPickBatchItemArgs = {
  id: Scalars['ID']['input'];
  value: CreatePickBatchItemInput;
};


export type WmsMutationAddReturnItemArgs = {
  id: Scalars['ID']['input'];
  value: CreateReturnItemInput;
};


export type WmsMutationAddSalesOrderItemArgs = {
  id: Scalars['ID']['input'];
  value: CreateSalesOrderItemInput;
};


export type WmsMutationAddTaskItemArgs = {
  id: Scalars['ID']['input'];
  value: CreateTaskItemInput;
};


export type WmsMutationCreateBinThresholdArgs = {
  value: CreateBinThresholdInput;
};


export type WmsMutationCreateInboundShipmentArgs = {
  value: CreateInboundShipmentInput;
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


export type WmsMutationCreatePackageArgs = {
  value: CreatePackageInput;
};


export type WmsMutationCreatePickBatchArgs = {
  value: CreatePickBatchInput;
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


export type WmsMutationCreateSalesOrderArgs = {
  value: CreateSalesOrderInput;
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
  value: UpdateOutboundShipmentItemInput;
};


export type WmsMutationUpdatePackageArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePackageInput>;
};


export type WmsMutationUpdatePackageItemArgs = {
  id: Scalars['ID']['input'];
  value: UpdatePackageItemInput;
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
  value: UpdateReturnInput;
};


export type WmsMutationUpdateReturnItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateReturnItemInput>;
};


export type WmsMutationUpdateSalesOrderArgs = {
  id: Scalars['ID']['input'];
  value: UpdateSalesOrderInput;
};


export type WmsMutationUpdateSalesOrderItemArgs = {
  id: Scalars['ID']['input'];
  value: UpdateSalesOrderItemInput;
};


export type WmsMutationUpdateStockTransferArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateStockTransferInput>;
};


export type WmsMutationUpdateSupplierArgs = {
  id: Scalars['ID']['input'];
  value: UpdateSupplierInput;
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
  value: UpdateWarehouseInput;
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
  createdAt?: Maybe<Scalars['Date']['output']>;
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
  updatedAt?: Maybe<Scalars['Date']['output']>;
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


type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const BillingInvoiceStatusSchema = z.enum(['CANCELLED', 'DISPUTED', 'DRAFT', 'PAID', 'PARTIAL_PAID', 'PAST_DUE', 'SENT', 'VIEWED', 'VOID']);

export const CarrierRateUnitSchema = z.enum(['FLAT_RATE', 'PER_CONTAINER', 'PER_KG', 'PER_KM', 'PER_MILE']);

export const CasePrioritySchema = z.enum(['CRITICAL', 'HIGH', 'LOW', 'MEDIUM']);

export const CaseStatusSchema = z.enum(['CANCELLED', 'CLOSED', 'ESCALATED', 'IN_PROGRESS', 'NEW', 'RESOLVED', 'WAITING_FOR_CUSTOMER', 'WAITING_FOR_INTERNAL']);

export const CaseTypeSchema = z.enum(['BUG_REPORT', 'COMPLAINT', 'FEATURE_REQUEST', 'PROBLEM', 'QUESTION', 'TECHNICAL_SUPPORT']);

export const CrmInvoicePaymentMethodSchema = z.enum(['BANK_TRANSFER', 'CASH', 'CHECK', 'CREDIT_CARD', 'MAYA', 'OTHER', 'PAYPAL', 'STRIPE', 'WIRE_TRANSFER']);

export const CurrencySchema = z.enum(['AUD', 'CAD', 'EUR', 'GBP', 'JPY', 'PHP', 'USD']);

export const DeliveryFailureReasonSchema = z.enum(['ACCESS_DENIED', 'ADDRESS_NOT_FOUND', 'DAMAGED_PACKAGE', 'OTHER', 'RECIPIENT_NOT_HOME', 'REFUSED_DELIVERY', 'VEHICLE_BREAKDOWN', 'WEATHER_CONDITIONS']);

export const DeliveryRouteStatusSchema = z.enum(['CANCELLED', 'COMPLETED', 'IN_PROGRESS', 'PAUSED', 'PLANNED']);

export const DeliveryTaskStatusSchema = z.enum(['ASSIGNED', 'CANCELLED', 'DELIVERED', 'FAILED', 'OUT_FOR_DELIVERY', 'PENDING', 'RESCHEDULED']);

export const DisputeStatusSchema = z.enum(['APPROVED', 'CLOSED', 'DENIED', 'ESCALATED', 'OPEN', 'UNDER_REVIEW']);

export const DocumentTypeSchema = z.enum(['BOL', 'COMMERCIAL_INVOICE', 'CREDIT_NOTE', 'CUSTOMS_DECLARATION', 'PACKING_LIST', 'PROOF_OF_DELIVERY', 'RECEIPT', 'SHIPPING_LABEL']);

export const DriverScheduleReasonSchema = z.enum(['PERSONAL_LEAVE', 'SICK_LEAVE', 'TRAINING', 'VACATION']);

export const DriverStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE']);

export const ExpenseStatusSchema = z.enum(['APPROVED', 'PENDING', 'REIMBURSED', 'REJECTED']);

export const ExpenseTypeSchema = z.enum(['ACCOMMODATION', 'FUEL', 'MAINTENANCE', 'MEALS', 'PARKING', 'TOLLS']);

export const GeofenceEventTypeSchema = z.enum(['ENTER', 'EXIT']);

export const InboundShipmentStatusSchema = z.enum(['ARRIVED', 'CANCELLED', 'COMPLETED', 'PENDING', 'PROCESSING']);

export const InteractionOutcomeSchema = z.enum(['COMPLETED', 'NO_ANSWER', 'OTHER', 'SCHEDULED']);

export const InteractionTypeSchema = z.enum(['CALL', 'EMAIL', 'MEETING', 'TEXT']);

export const InventoryAdjustmentReasonSchema = z.enum(['CYCLE_COUNT', 'DAMAGED_GOODS', 'EXPIRED', 'MANUAL_CORRECTION', 'RETURN_TO_VENDOR', 'THEFT']);

export const InventoryStockStatusSchema = z.enum(['ALLOCATED', 'AVAILABLE', 'DAMAGED', 'EXPIRED', 'HOLD', 'QUARANTINE', 'SHIPPED']);

export const InvoiceStatusSchema = z.enum(['CANCELLED', 'DRAFT', 'OVERDUE', 'PAID', 'SENT']);

export const LeadSourceSchema = z.enum(['ADVERTISMENT', 'COLD_CALL', 'EMAIL_CAMPAIGN', 'EVENT', 'OTHER', 'PARTNER', 'REFERRAL', 'SOCIAL_MEDIA', 'WEBSITE']);

export const LeadStatusSchema = z.enum(['CONTACTED', 'CONVERTED', 'NEW', 'QUALIFIED', 'UNQUALIFIED']);

export const LocationTypeSchema = z.enum(['BULK_STORAGE', 'CROSS_DOCK_AREA', 'DAMAGED_GOODS', 'PACKING_STATION', 'PICK_BIN', 'QUALITY_CONTROL', 'RECEIVING_DOCK', 'RESERVE_STORAGE', 'RETURNS_AREA', 'STAGING_AREA']);

export const OpportunitySourceSchema = z.enum(['ADVERTISMENT', 'COLD_CALL', 'EMAIL_CAMPAIGN', 'EVENT', 'EXISTING_CUSTOMER', 'OTHER', 'PARTNER', 'REFERRAL', 'SOCIAL_MEDIA', 'WEBSITE']);

export const OpportunityStageSchema = z.enum(['CLOSED_LOST', 'CLOSED_WON', 'DEMO', 'NEED_ANALYSIS', 'NEGOTIATION', 'PROPOSAL', 'PROSPECTING', 'QUALIFICATION']);

export const OutboundShipmentStatusSchema = z.enum(['CANCELLED', 'DELIVERED', 'PACKED', 'PICKING', 'SHIPPED']);

export const PartnerInvoiceStatusSchema = z.enum(['CANCELLED', 'DISPUTED', 'OVERDUE', 'PAID', 'PENDING']);

export const PaymentMethodSchema = z.enum(['BANK_TRANSFER', 'CASH', 'CHECK', 'CLIENT_CREDIT', 'CREDIT_CARD', 'DEBIT_CARD', 'QR_PH', 'WALLET']);

export const PaymentStatusSchema = z.enum(['CANCELLED', 'FAILED', 'PENDING', 'PROCESSING', 'REFUNDED', 'SUCCESSFUL']);

export const PickBatchStatusSchema = z.enum(['CANCELLED', 'COMPLETED', 'IN_PROGRESS', 'OPEN']);

export const PickStrategySchema = z.enum(['BATCH_PICKING', 'CLUSTER_PICKING', 'SINGLE_ORDER_PICKING', 'WAVE_PICKING', 'ZONE_PICKING']);

export const PricingModelSchema = z.enum(['FLAT_RATE', 'PERCENTAGE', 'PER_CUBIC_METER', 'PER_ITEM', 'PER_KG', 'PER_ZONE', 'TIERED']);

export const ProductStatusSchema = z.enum(['ACTIVE', 'DISCONTINUED', 'INACTIVE', 'OBSOLETE']);

export const ProductTypeSchema = z.enum(['DIGITAL', 'GOOD', 'SERVICE', 'SUBSCRIPTION']);

export const ProofOfDeliveryTypeSchema = z.enum(['CODE_VERIFICATION', 'CONTACTLESS_DELIVERY', 'LEFT_AT_DOOR', 'PHOTO', 'SIGNATURE']);

export const ProofTypeSchema = z.enum(['BARCODE_SCAN', 'PHOTO', 'PIN_VERIFICATION', 'SIGNATURE']);

export const QuoteStatusSchema = z.enum(['ACCEPTED', 'CANCELLED', 'CONVERTED', 'EXPIRED', 'PENDING']);

export const RecordTypeSchema = z.enum(['CAMPAIGNS', 'CASES', 'COMPANIES', 'CONTACTS', 'INTERACTIONS', 'INVOICES', 'LEADS', 'OPPORTUNITIES', 'PRODUCTS']);

export const ReturnItemConditionSchema = z.enum(['DAMAGED', 'DEFECTIVE', 'EXPIRED', 'SELLABLE', 'UNSELLABLE']);

export const ReturnStatusSchema = z.enum(['APPROVED', 'PROCESSED', 'RECEIVED', 'REJECTED', 'REQUESTED']);

export const SalesOrderStatusSchema = z.enum(['CANCELLED', 'COMPLETED', 'PENDING', 'PROCESSING', 'SHIPPED']);

export const ServiceTypeSchema = z.enum(['CUSTOMS', 'FULFILLMENT', 'HANDLING', 'INSURANCE', 'PACKAGING', 'RETURNS', 'SHIPPING', 'STORAGE']);

export const ShipmentLegStatusSchema = z.enum(['CANCELLED', 'DELIVERED', 'FAILED', 'IN_TRANSIT', 'PENDING']);

export const StockTransferStatusSchema = z.enum(['CANCELLED', 'IN_TRANSIT', 'PENDING', 'RECEIVED']);

export const SurchargeCalculationMethodSchema = z.enum(['FIXED', 'PERCENTAGE', 'PER_UNIT', 'SLIDING_SCALE']);

export const SyncStatusSchema = z.enum(['FAILED', 'IN_PROGRESS', 'PENDING', 'RETRY', 'SUCCESS']);

export const TaskEventStatusSchema = z.enum(['ARRIVED', 'ASSIGNED', 'CANCELLED', 'DELIVERED', 'EXCEPTION', 'FAILED', 'RESCHEDULED', 'STARTED']);

export const TaskItemStatusSchema = z.enum(['COMPLETED', 'DAMAGED', 'IN_PROGRESS', 'NOT_FOUND', 'PENDING', 'SHORT_PICKED']);

export const TaskStatusSchema = z.enum(['ASSIGNED', 'CANCELLED', 'COMPLETED', 'ERROR', 'IN_PROGRESS', 'PENDING']);

export const TaskTypeSchema = z.enum(['CROSS_DOCK', 'CYCLE_COUNT', 'DAMAGE_INSPECTION', 'PACK', 'PICK', 'PUTAWAY', 'QUALITY_CHECK', 'REPLENISHMENT', 'RETURNS_PROCESSING']);

export const TransactionTypeSchema = z.enum(['ADJUSTMENT', 'CREDIT', 'DEBIT', 'FEE', 'REFUND', 'TOP_UP']);

export const TripStatusSchema = z.enum(['CANCELLED', 'COMPLETED', 'IN_PROGRESS', 'PLANNED']);

export const TripStopStatusSchema = z.enum(['ARRIVED', 'COMPLETED', 'PENDING', 'SKIPPED']);

export const VehicleServiceTypeSchema = z.enum(['BRAKE_SERVICE', 'INSPECTION', 'OIL_CHANGE', 'REPAIR', 'ROUTINE_MAINTENANCE', 'TIRE_REPLACEMENT']);

export const VehicleStatusSchema = z.enum(['AVAILABLE', 'IN_MAINTENANCE', 'ON_TRIP', 'OUT_OF_SERVICE']);

export function AddInvoiceItemInputSchema(): z.ZodObject<Properties<AddInvoiceItemInput>> {
  return z.object({
    productId: z.string(),
    quantity: z.number()
  })
}

export function AddOpportunityProductInputSchema(): z.ZodObject<Properties<AddOpportunityProductInput>> {
  return z.object({
    productId: z.string(),
    quantity: z.number()
  })
}

export function CreateAccountTransactionInputSchema(): z.ZodObject<Properties<CreateAccountTransactionInput>> {
  return z.object({
    amount: z.number(),
    clientAccountId: z.string(),
    description: z.string().optional(),
    processedByUserId: z.string().optional(),
    referenceNumber: z.string().optional(),
    runningBalance: z.number().optional(),
    sourceRecordId: z.string().optional(),
    sourceRecordType: z.string().optional(),
    transactionDate: z.string().optional(),
    type: TransactionTypeSchema
  })
}

export function CreateAccountingSyncLogInputSchema(): z.ZodObject<Properties<CreateAccountingSyncLogInput>> {
  return z.object({
    errorMessage: z.string().optional(),
    externalId: z.string().optional(),
    externalSystem: z.string(),
    lastSyncAt: z.string().optional(),
    nextRetryAt: z.string().optional(),
    recordId: z.string(),
    recordType: z.string(),
    requestPayload: z.string().optional(),
    responsePayload: z.string().optional(),
    retryCount: z.number().optional(),
    status: SyncStatusSchema.optional()
  })
}

export function CreateAttachmentInputSchema(): z.ZodObject<Properties<CreateAttachmentInput>> {
  return z.object({
    file: z.file().optional(),
    recordId: z.string().optional(),
    recordType: RecordTypeSchema.optional()
  })
}

export function CreateBillingInvoiceInputSchema(): z.ZodObject<Properties<CreateBillingInvoiceInput>> {
  return z.object({
    clientId: z.string(),
    createdByUserId: z.string().optional(),
    currency: z.string().optional(),
    dueDate: z.string(),
    invoiceNumber: z.string(),
    issueDate: z.string(),
    items: z.array(z.lazy(() => CreateInvoiceLineItemInputSchema())),
    notes: z.string().optional(),
    paymentTerms: z.string().optional(),
    quoteId: z.string().optional(),
    sentAt: z.date().optional(),
    status: BillingInvoiceStatusSchema.optional()
  })
}

export function CreateBinThresholdInputSchema(): z.ZodObject<Properties<CreateBinThresholdInput>> {
  return z.object({
    alertThreshold: z.number().optional(),
    isActive: z.boolean().optional(),
    locationId: z.string(),
    maxQuantity: z.number(),
    minQuantity: z.number(),
    productId: z.string(),
    reorderQuantity: z.number().optional()
  })
}

export function CreateCampaignInputSchema(): z.ZodObject<Properties<CreateCampaignInput>> {
  return z.object({
    budget: z.number().optional(),
    endDate: z.date().optional(),
    name: z.string(),
    startDate: z.date()
  })
}

export function CreateCarrierInputSchema(): z.ZodObject<Properties<CreateCarrierInput>> {
  return z.object({
    contactEmail: z.string().optional(),
    contactPerson: z.string().optional(),
    contactPhone: z.string().optional(),
    name: z.string(),
    servicesOffered: z.string().optional()
  })
}

export function CreateCarrierRateInputSchema(): z.ZodObject<Properties<CreateCarrierRateInput>> {
  return z.object({
    carrierId: z.string(),
    destination: z.string().optional(),
    origin: z.string().optional(),
    rate: z.number(),
    serviceType: z.string().optional(),
    unit: CarrierRateUnitSchema.optional()
  })
}

export function CreateCaseInputSchema(): z.ZodObject<Properties<CreateCaseInput>> {
  return z.object({
    caseNumber: z.string(),
    contactId: z.string().optional(),
    description: z.string().optional(),
    ownerId: z.string(),
    priority: CasePrioritySchema.optional(),
    status: CaseStatusSchema.optional(),
    type: CaseTypeSchema.optional()
  })
}

export function CreateClientAccountInputSchema(): z.ZodObject<Properties<CreateClientAccountInput>> {
  return z.object({
    availableCredit: z.number().optional(),
    clientId: z.string(),
    creditLimit: z.number().optional(),
    currency: z.string().optional(),
    isCreditApproved: z.boolean().optional(),
    lastPaymentDate: z.string().optional(),
    paymentTermsDays: z.number().optional(),
    walletBalance: z.number().optional()
  })
}

export function CreateCompanyInputSchema(): z.ZodObject<Properties<CreateCompanyInput>> {
  return z.object({
    annualRevenue: z.number().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    industry: z.string().optional(),
    name: z.string(),
    ownerId: z.string().optional(),
    phoneNumber: z.string().optional(),
    postalCode: z.string().optional(),
    state: z.string().optional(),
    street: z.string().optional(),
    website: z.string().optional()
  })
}

export function CreateContactInputSchema(): z.ZodObject<Properties<CreateContactInput>> {
  return z.object({
    companyId: z.string(),
    email: z.string(),
    jobTitle: z.string().optional(),
    name: z.string(),
    ownerId: z.string(),
    phoneNumber: z.string().optional()
  })
}

export function CreateCreditNoteInputSchema(): z.ZodObject<Properties<CreateCreditNoteInput>> {
  return z.object({
    amount: z.number(),
    appliedAt: z.string().optional(),
    createdByUserId: z.string().optional(),
    creditNoteNumber: z.string(),
    currency: z.string().optional(),
    disputeId: z.string().optional(),
    invoiceId: z.string(),
    issueDate: z.string(),
    notes: z.string().optional(),
    reason: z.string()
  })
}

export function CreateCustomerTrackingLinkInputSchema(): z.ZodObject<Properties<CreateCustomerTrackingLinkInput>> {
  return z.object({
    deliveryTaskId: z.string(),
    expiresAt: z.string().optional(),
    trackingToken: z.string()
  })
}

export function CreateDeliveryRouteInputSchema(): z.ZodObject<Properties<CreateDeliveryRouteInput>> {
  return z.object({
    driverId: z.string(),
    estimatedDurationMinutes: z.number().optional(),
    optimizedRouteData: z.string().optional(),
    routeDate: z.string(),
    startedAt: z.string().optional(),
    status: DeliveryRouteStatusSchema.optional(),
    totalDistanceKm: z.number().optional()
  })
}

export function CreateDeliveryTaskInputSchema(): z.ZodObject<Properties<CreateDeliveryTaskInput>> {
  return z.object({
    actualArrivalTime: z.string().optional(),
    deliveryAddress: z.string(),
    deliveryInstructions: z.string().optional(),
    deliveryRouteId: z.string(),
    estimatedArrivalTime: z.string().optional(),
    packageId: z.string(),
    recipientName: z.string().optional(),
    recipientPhone: z.string().optional(),
    routeSequence: z.number(),
    status: DeliveryTaskStatusSchema.optional()
  })
}

export function CreateDisputeInputSchema(): z.ZodObject<Properties<CreateDisputeInput>> {
  return z.object({
    clientId: z.string(),
    disputedAmount: z.number().optional(),
    lineItemId: z.string(),
    reason: z.string(),
    resolutionNotes: z.string().optional(),
    resolvedAt: z.string().optional(),
    resolvedByUserId: z.string().optional(),
    status: DisputeStatusSchema.optional()
  })
}

export function CreateDmsProofOfDeliveryInputSchema(): z.ZodObject<Properties<CreateDmsProofOfDeliveryInput>> {
  return z.object({
    deliveryTaskId: z.string(),
    file: z.file().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    recipientName: z.string().optional(),
    signatureData: z.string().optional(),
    timestamp: z.string().optional(),
    type: ProofOfDeliveryTypeSchema,
    verificationCode: z.string().optional()
  })
}

export function CreateDocumentInputSchema(): z.ZodObject<Properties<CreateDocumentInput>> {
  return z.object({
    documentType: DocumentTypeSchema,
    fileName: z.string(),
    filePath: z.string(),
    fileSize: z.number().optional(),
    mimeType: z.string().optional(),
    recordId: z.string(),
    recordType: z.string(),
    uploadedByUserId: z.string().optional()
  })
}

export function CreateDriverInputSchema(): z.ZodObject<Properties<CreateDriverInput>> {
  return z.object({
    contactPhone: z.string().optional(),
    licenseExpiryDate: z.string().optional(),
    licenseNumber: z.string(),
    status: DriverStatusSchema.optional(),
    userId: z.string()
  })
}

export function CreateDriverLocationInputSchema(): z.ZodObject<Properties<CreateDriverLocationInput>> {
  return z.object({
    accuracy: z.number().optional(),
    altitude: z.number().optional(),
    driverId: z.string(),
    heading: z.number().optional(),
    latitude: z.number(),
    longitude: z.number(),
    speedKmh: z.number().optional()
  })
}

export function CreateDriverScheduleInputSchema(): z.ZodObject<Properties<CreateDriverScheduleInput>> {
  return z.object({
    driverId: z.string(),
    endDate: z.string(),
    reason: DriverScheduleReasonSchema.optional(),
    startDate: z.string()
  })
}

export function CreateExpenseInputSchema(): z.ZodObject<Properties<CreateExpenseInput>> {
  return z.object({
    amount: z.number(),
    currency: CurrencySchema.optional(),
    description: z.string().optional(),
    driverId: z.string().optional(),
    expenseDate: z.date().optional(),
    fuelQuantity: z.number().optional(),
    odometerReading: z.number().optional(),
    receiptUrl: z.string().optional(),
    status: ExpenseStatusSchema.optional(),
    tripId: z.string().optional(),
    type: ExpenseTypeSchema.optional()
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
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    name: z.string()
  })
}

export function CreateGpsPingInputSchema(): z.ZodObject<Properties<CreateGpsPingInput>> {
  return z.object({
    latitude: z.number(),
    longitude: z.number(),
    timestamp: z.date(),
    vehicleId: z.string()
  })
}

export function CreateInboundShipmentInputSchema(): z.ZodObject<Properties<CreateInboundShipmentInput>> {
  return z.object({
    clientId: z.string().optional(),
    expectedArrivalDate: z.string().optional(),
    items: z.array(z.lazy(() => CreateInboundShipmentItemInputSchema())),
    status: InboundShipmentStatusSchema.optional(),
    warehouseId: z.string()
  })
}

export function CreateInboundShipmentItemInputSchema(): z.ZodObject<Properties<CreateInboundShipmentItemInput>> {
  return z.object({
    expectedQuantity: z.number(),
    productId: z.string()
  })
}

export function CreateInteractionInputSchema(): z.ZodObject<Properties<CreateInteractionInput>> {
  return z.object({
    caseId: z.string().optional(),
    contactId: z.string(),
    interactionDate: z.date().optional(),
    notes: z.string().optional(),
    outcome: InteractionOutcomeSchema.optional(),
    type: InteractionTypeSchema.optional(),
    userId: z.string()
  })
}

export function CreateInventoryAdjustmentInputSchema(): z.ZodObject<Properties<CreateInventoryAdjustmentInput>> {
  return z.object({
    notes: z.string().optional(),
    productId: z.string(),
    quantityChange: z.number(),
    reason: InventoryAdjustmentReasonSchema.optional(),
    userId: z.string(),
    warehouseId: z.string()
  })
}

export function CreateInventoryBatchInputSchema(): z.ZodObject<Properties<CreateInventoryBatchInput>> {
  return z.object({
    batchNumber: z.string(),
    expirationDate: z.date().optional(),
    productId: z.string()
  })
}

export function CreateInventoryStockInputSchema(): z.ZodObject<Properties<CreateInventoryStockInput>> {
  return z.object({
    batchId: z.string().optional(),
    locationId: z.string(),
    productId: z.string(),
    quantity: z.number(),
    reservedQuantity: z.number(),
    status: InventoryStockStatusSchema.optional()
  })
}

export function CreateInvoiceInputSchema(): z.ZodObject<Properties<CreateInvoiceInput>> {
  return z.object({
    dueDate: z.date(),
    issueDate: z.date(),
    items: z.array(z.lazy(() => CreateInvoiceItemInputSchema())),
    opportunityId: z.string(),
    paidAt: z.date().optional(),
    paymentMethod: CrmInvoicePaymentMethodSchema.optional(),
    status: InvoiceStatusSchema.optional()
  })
}

export function CreateInvoiceItemInputSchema(): z.ZodObject<Properties<CreateInvoiceItemInput>> {
  return z.object({
    productId: z.string(),
    quantity: z.number()
  })
}

export function CreateInvoiceLineItemInputSchema(): z.ZodObject<Properties<CreateInvoiceLineItemInput>> {
  return z.object({
    description: z.string(),
    discountRate: z.number().optional(),
    quantity: z.number(),
    sourceRecordId: z.string().optional(),
    sourceRecordType: z.string().optional(),
    taxRate: z.number().optional(),
    unitPrice: z.number()
  })
}

export function CreateLeadInputSchema(): z.ZodObject<Properties<CreateLeadInput>> {
  return z.object({
    campaignId: z.string().optional(),
    email: z.string(),
    leadScore: z.number().optional(),
    leadSource: LeadSourceSchema.optional(),
    name: z.string(),
    ownerId: z.string(),
    status: LeadStatusSchema.optional()
  })
}

export function CreateLocationInputSchema(): z.ZodObject<Properties<CreateLocationInput>> {
  return z.object({
    barcode: z.string().optional(),
    hazmatApproved: z.boolean().optional(),
    isPickable: z.boolean().optional(),
    isReceivable: z.boolean().optional(),
    level: z.number().optional(),
    maxPallets: z.number().optional(),
    maxVolume: z.number().optional(),
    maxWeight: z.number().optional(),
    name: z.string(),
    parentLocationId: z.string().optional(),
    path: z.string().optional(),
    temperatureControlled: z.boolean().optional(),
    type: LocationTypeSchema,
    warehouseId: z.string(),
    xCoordinate: z.number().optional(),
    yCoordinate: z.number().optional(),
    zCoordinate: z.number().optional()
  })
}

export function CreateNotificationInputSchema(): z.ZodObject<Properties<CreateNotificationInput>> {
  return z.object({
    isRead: z.boolean().optional(),
    link: z.string().optional(),
    message: z.string(),
    userId: z.string()
  })
}

export function CreateOpportunityInputSchema(): z.ZodObject<Properties<CreateOpportunityInput>> {
  return z.object({
    campaignId: z.string().optional(),
    companyId: z.string().optional(),
    contactId: z.string().optional(),
    dealValue: z.number().optional(),
    expectedCloseDate: z.date().optional(),
    lostReason: z.string().optional(),
    name: z.string(),
    ownerId: z.string(),
    probability: z.number().optional(),
    products: z.array(z.lazy(() => CreateOpportunityProductInputSchema())),
    source: OpportunitySourceSchema,
    stage: OpportunityStageSchema
  })
}

export function CreateOpportunityProductInputSchema(): z.ZodObject<Properties<CreateOpportunityProductInput>> {
  return z.object({
    productId: z.string(),
    quantity: z.number()
  })
}

export function CreateOutboundShipmentInputSchema(): z.ZodObject<Properties<CreateOutboundShipmentInput>> {
  return z.object({
    carrier: z.string().optional(),
    items: z.array(z.lazy(() => CreateOutboundShipmentItemInputSchema())),
    salesOrderId: z.string(),
    status: OutboundShipmentStatusSchema.optional(),
    trackingNumber: z.string().optional(),
    warehouseId: z.string()
  })
}

export function CreateOutboundShipmentItemInputSchema(): z.ZodObject<Properties<CreateOutboundShipmentItemInput>> {
  return z.object({
    batchId: z.string().optional(),
    productId: z.string(),
    quantityShipped: z.number(),
    salesOrderItemId: z.string()
  })
}

export function CreatePackageInputSchema(): z.ZodObject<Properties<CreatePackageInput>> {
  return z.object({
    carrier: z.string().optional(),
    height: z.number().optional(),
    insuranceValue: z.number().optional(),
    isFragile: z.boolean().optional(),
    isHazmat: z.boolean().optional(),
    length: z.number().optional(),
    packageNumber: z.string(),
    packageType: z.string().optional(),
    packedAt: z.string().optional(),
    packedByUserId: z.string().optional(),
    requiresSignature: z.boolean().optional(),
    salesOrderId: z.string(),
    serviceLevel: z.string().optional(),
    shippedAt: z.string().optional(),
    trackingNumber: z.string().optional(),
    warehouseId: z.string(),
    weight: z.number().optional(),
    width: z.number().optional()
  })
}

export function CreatePackageItemInputSchema(): z.ZodObject<Properties<CreatePackageItemInput>> {
  return z.object({
    batchId: z.string().optional(),
    expiryDate: z.string().optional(),
    lotNumber: z.string().optional(),
    packageId: z.string(),
    productId: z.string(),
    quantity: z.number(),
    serialNumbers: z.array(z.string()),
    unitWeight: z.number().optional()
  })
}

export function CreatePartnerInvoiceInputSchema(): z.ZodObject<Properties<CreatePartnerInvoiceInput>> {
  return z.object({
    carrierId: z.string(),
    invoiceDate: z.string(),
    invoiceNumber: z.string(),
    items: z.array(z.lazy(() => CreatePartnerInvoiceItemInputSchema())),
    status: PartnerInvoiceStatusSchema.optional()
  })
}

export function CreatePartnerInvoiceItemInputSchema(): z.ZodObject<Properties<CreatePartnerInvoiceItemInput>> {
  return z.object({
    amount: z.number(),
    shipmentLegId: z.string()
  })
}

export function CreatePaymentInputSchema(): z.ZodObject<Properties<CreatePaymentInput>> {
  return z.object({
    amount: z.number(),
    currency: z.string().optional(),
    exchangeRate: z.number().optional(),
    fees: z.number().optional(),
    gatewayReference: z.string().optional(),
    invoiceId: z.string(),
    notes: z.string().optional(),
    paymentDate: z.string().optional(),
    paymentMethod: PaymentMethodSchema,
    processedAt: z.string().optional(),
    processedByUserId: z.string().optional(),
    status: PaymentStatusSchema.optional(),
    transactionId: z.string().optional()
  })
}

export function CreatePickBatchInputSchema(): z.ZodObject<Properties<CreatePickBatchInput>> {
  return z.object({
    assignedUserId: z.string().optional(),
    batchNumber: z.string(),
    estimatedDuration: z.number().optional(),
    items: z.array(z.lazy(() => CreatePickBatchItemInputSchema())),
    priority: z.number().optional(),
    startedAt: z.string().optional(),
    status: PickBatchStatusSchema.optional(),
    strategy: PickStrategySchema,
    warehouseId: z.string(),
    waveId: z.string().optional(),
    zoneRestrictions: z.array(z.string())
  })
}

export function CreatePickBatchItemInputSchema(): z.ZodObject<Properties<CreatePickBatchItemInput>> {
  return z.object({
    actualPickTime: z.number().optional(),
    estimatedPickTime: z.number().optional(),
    orderPriority: z.number().optional(),
    salesOrderId: z.string()
  })
}

export function CreateProductInputSchema(): z.ZodObject<Properties<CreateProductInput>> {
  return z.object({
    description: z.string().optional(),
    name: z.string(),
    price: z.number(),
    sku: z.string().optional(),
    type: ProductTypeSchema.optional()
  })
}

export function CreateProofOfDeliveryInputSchema(): z.ZodObject<Properties<CreateProofOfDeliveryInput>> {
  return z.object({
    files: z.array(z.file()),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    tripStopId: z.string(),
    type: ProofTypeSchema.optional()
  })
}

export function CreatePutawayRuleInputSchema(): z.ZodObject<Properties<CreatePutawayRuleInput>> {
  return z.object({
    clientId: z.string().optional(),
    isActive: z.boolean().optional(),
    locationType: LocationTypeSchema.optional(),
    maxQuantity: z.number().optional(),
    minQuantity: z.number().optional(),
    preferredLocationId: z.string().optional(),
    priority: z.number(),
    productId: z.string(),
    requiresHazmatApproval: z.boolean().optional(),
    requiresTemperatureControl: z.boolean().optional(),
    volumeThreshold: z.number().optional(),
    warehouseId: z.string(),
    weightThreshold: z.number().optional()
  })
}

export function CreateQuoteInputSchema(): z.ZodObject<Properties<CreateQuoteInput>> {
  return z.object({
    clientId: z.string().optional(),
    createdByUserId: z.string().optional(),
    destinationDetails: z.string(),
    expiresAt: z.string().optional(),
    height: z.number().optional(),
    length: z.number().optional(),
    notes: z.string().optional(),
    originDetails: z.string(),
    quoteNumber: z.string().optional(),
    quotedPrice: z.number(),
    serviceLevel: z.string().optional(),
    status: QuoteStatusSchema.optional(),
    weight: z.number().optional(),
    width: z.number().optional()
  })
}

export function CreateRateCardInputSchema(): z.ZodObject<Properties<CreateRateCardInput>> {
  return z.object({
    createdByUserId: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
    name: z.string(),
    serviceType: ServiceTypeSchema,
    validFrom: z.string(),
    validTo: z.string().optional()
  })
}

export function CreateRateRuleInputSchema(): z.ZodObject<Properties<CreateRateRuleInput>> {
  return z.object({
    condition: z.string(),
    isActive: z.boolean().optional(),
    maxValue: z.number().optional(),
    minValue: z.number().optional(),
    price: z.number(),
    pricingModel: PricingModelSchema,
    priority: z.number().optional(),
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
    items: z.array(z.lazy(() => CreateReturnItemInputSchema())),
    reason: z.string().optional(),
    returnNumber: z.string(),
    salesOrderId: z.string().optional(),
    status: ReturnStatusSchema.optional()
  })
}

export function CreateReturnItemInputSchema(): z.ZodObject<Properties<CreateReturnItemInput>> {
  return z.object({
    condition: ReturnItemConditionSchema.optional(),
    productId: z.string(),
    quantityExpected: z.number()
  })
}

export function CreateRouteInputSchema(): z.ZodObject<Properties<CreateRouteInput>> {
  return z.object({
    optimizedRouteData: z.string().optional(),
    totalDistance: z.number().optional(),
    totalDuration: z.number().optional(),
    tripId: z.string()
  })
}

export function CreateSalesOrderInputSchema(): z.ZodObject<Properties<CreateSalesOrderInput>> {
  return z.object({
    clientId: z.string(),
    crmOpportunityId: z.string().optional(),
    items: z.array(z.lazy(() => CreateSalesOrderItemInputSchema())),
    orderNumber: z.string(),
    shippingAddress: z.string().optional(),
    status: SalesOrderStatusSchema.optional()
  })
}

export function CreateSalesOrderItemInputSchema(): z.ZodObject<Properties<CreateSalesOrderItemInput>> {
  return z.object({
    productId: z.string(),
    quantityOrdered: z.number()
  })
}

export function CreateShipmentLegEventInputSchema(): z.ZodObject<Properties<CreateShipmentLegEventInput>> {
  return z.object({
    location: z.string().optional(),
    shipmentLegId: z.string(),
    statusMessage: z.string().optional()
  })
}

export function CreateShipmentLegInputSchema(): z.ZodObject<Properties<CreateShipmentLegInput>> {
  return z.object({
    carrierId: z.string().optional(),
    endLocation: z.string().optional(),
    internalTripId: z.string().optional(),
    legSequence: z.number(),
    shipmentId: z.string(),
    startLocation: z.string().optional(),
    status: ShipmentLegStatusSchema.optional()
  })
}

export function CreateStockTransferInputSchema(): z.ZodObject<Properties<CreateStockTransferInput>> {
  return z.object({
    destinationWarehouseId: z.string(),
    productId: z.string(),
    quantity: z.number(),
    sourceWarehouseId: z.string(),
    status: StockTransferStatusSchema.optional()
  })
}

export function CreateSupplierInputSchema(): z.ZodObject<Properties<CreateSupplierInput>> {
  return z.object({
    contactPerson: z.string().optional(),
    email: z.string().optional(),
    name: z.string(),
    phoneNumber: z.string().optional()
  })
}

export function CreateSurchargeInputSchema(): z.ZodObject<Properties<CreateSurchargeInput>> {
  return z.object({
    amount: z.number(),
    calculationMethod: SurchargeCalculationMethodSchema,
    description: z.string().optional(),
    isActive: z.boolean().optional(),
    name: z.string(),
    type: z.string(),
    validFrom: z.string().optional(),
    validTo: z.string().optional()
  })
}

export function CreateTaskEventInputSchema(): z.ZodObject<Properties<CreateTaskEventInput>> {
  return z.object({
    deliveryTaskId: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    notes: z.string().optional(),
    reason: z.string().optional(),
    status: TaskEventStatusSchema,
    timestamp: z.string().optional()
  })
}

export function CreateTaskInputSchema(): z.ZodObject<Properties<CreateTaskInput>> {
  return z.object({
    actualDuration: z.number().optional(),
    endTime: z.date().optional(),
    estimatedDuration: z.number().optional(),
    instructions: z.string().optional(),
    notes: z.string().optional(),
    pickBatchId: z.string().optional(),
    priority: z.number().optional(),
    sourceEntityId: z.string().optional(),
    sourceEntityType: z.string().optional(),
    startTime: z.date().optional(),
    status: TaskStatusSchema.optional(),
    taskNumber: z.string(),
    type: TaskTypeSchema,
    userId: z.string().optional(),
    warehouseId: z.string()
  })
}

export function CreateTaskItemInputSchema(): z.ZodObject<Properties<CreateTaskItemInput>> {
  return z.object({
    batchId: z.string().optional(),
    destinationLocationId: z.string().optional(),
    expiryDate: z.string().optional(),
    lotNumber: z.string().optional(),
    notes: z.string().optional(),
    productId: z.string(),
    quantityCompleted: z.number(),
    quantityRequired: z.number(),
    serialNumbers: z.array(z.string()),
    sourceLocationId: z.string().optional(),
    status: TaskItemStatusSchema.optional()
  })
}

export function CreateTripInputSchema(): z.ZodObject<Properties<CreateTripInput>> {
  return z.object({
    driverId: z.string().optional(),
    endLocation: z.string().optional(),
    endTime: z.string().optional(),
    startLocation: z.string().optional(),
    startTime: z.string().optional(),
    status: TripStatusSchema.optional(),
    vehicleId: z.string().optional()
  })
}

export function CreateTripStopInputSchema(): z.ZodObject<Properties<CreateTripStopInput>> {
  return z.object({
    address: z.string().optional(),
    estimatedArrivalTime: z.string().optional(),
    estimatedDepartureTime: z.string().optional(),
    sequence: z.number(),
    shipmentId: z.string().optional(),
    status: TripStopStatusSchema.optional(),
    tripId: z.string()
  })
}

export function CreateVehicleInputSchema(): z.ZodObject<Properties<CreateVehicleInput>> {
  return z.object({
    capacityVolume: z.number().optional(),
    capacityWeight: z.number().optional(),
    currentMileage: z.number().optional(),
    lastMaintenanceDate: z.string().optional(),
    make: z.string().optional(),
    model: z.string().optional(),
    registrationNumber: z.string(),
    status: VehicleStatusSchema.optional(),
    vin: z.string().optional(),
    year: z.number().optional()
  })
}

export function CreateVehicleMaintenanceInputSchema(): z.ZodObject<Properties<CreateVehicleMaintenanceInput>> {
  return z.object({
    cost: z.number().optional(),
    notes: z.string().optional(),
    serviceDate: z.date(),
    serviceType: VehicleServiceTypeSchema.optional()
  })
}

export function CreateWarehouseInputSchema(): z.ZodObject<Properties<CreateWarehouseInput>> {
  return z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    contactEmail: z.string().optional(),
    contactPerson: z.string().optional(),
    contactPhone: z.string().optional(),
    country: z.string().optional(),
    isActive: z.boolean().optional(),
    name: z.string(),
    postalCode: z.string().optional(),
    state: z.string().optional(),
    timezone: z.string().optional()
  })
}

export function CreateWmsProductInputSchema(): z.ZodObject<Properties<CreateWmsProductInput>> {
  return z.object({
    barcode: z.string().optional(),
    clientId: z.string().optional(),
    costPrice: z.number().optional(),
    description: z.string().optional(),
    height: z.number().optional(),
    length: z.number().optional(),
    name: z.string(),
    sku: z.string(),
    status: ProductStatusSchema.optional(),
    supplierId: z.string().optional(),
    weight: z.number().optional(),
    width: z.number().optional()
  })
}

export function UpdateBillingInvoiceInputSchema(): z.ZodObject<Properties<UpdateBillingInvoiceInput>> {
  return z.object({
    amountPaid: z.number().optional(),
    currency: z.string().optional(),
    dueDate: z.string().optional(),
    notes: z.string().optional(),
    paidAt: z.date().optional(),
    paymentTerms: z.string().optional(),
    status: BillingInvoiceStatusSchema.optional()
  })
}

export function UpdateBinThresholdInputSchema(): z.ZodObject<Properties<UpdateBinThresholdInput>> {
  return z.object({
    alertThreshold: z.number().optional(),
    isActive: z.boolean().optional(),
    maxQuantity: z.number().optional(),
    minQuantity: z.number().optional(),
    reorderQuantity: z.number().optional()
  })
}

export function UpdateCampaignInputSchema(): z.ZodObject<Properties<UpdateCampaignInput>> {
  return z.object({
    budget: z.number().optional(),
    endDate: z.date().optional(),
    name: z.string().optional(),
    startDate: z.date().optional()
  })
}

export function UpdateCarrierInputSchema(): z.ZodObject<Properties<UpdateCarrierInput>> {
  return z.object({
    contactEmail: z.string().optional(),
    contactPerson: z.string().optional(),
    contactPhone: z.string().optional(),
    name: z.string().optional(),
    servicesOffered: z.string().optional()
  })
}

export function UpdateCarrierRateInputSchema(): z.ZodObject<Properties<UpdateCarrierRateInput>> {
  return z.object({
    destination: z.string().optional(),
    origin: z.string().optional(),
    rate: z.number().optional(),
    serviceType: z.string().optional(),
    unit: CarrierRateUnitSchema.optional()
  })
}

export function UpdateCaseInputSchema(): z.ZodObject<Properties<UpdateCaseInput>> {
  return z.object({
    priority: CasePrioritySchema.optional(),
    status: CaseStatusSchema.optional(),
    type: CaseTypeSchema.optional()
  })
}

export function UpdateClientAccountInputSchema(): z.ZodObject<Properties<UpdateClientAccountInput>> {
  return z.object({
    availableCredit: z.number().optional(),
    creditLimit: z.number().optional(),
    currency: z.string().optional(),
    isCreditApproved: z.boolean().optional(),
    lastPaymentDate: z.date().optional(),
    paymentTermsDays: z.number().optional(),
    walletBalance: z.number().optional()
  })
}

export function UpdateCompanyInputSchema(): z.ZodObject<Properties<UpdateCompanyInput>> {
  return z.object({
    annualRevenue: z.number().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    industry: z.string().optional(),
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    postalCode: z.string().optional(),
    state: z.string().optional(),
    street: z.string().optional(),
    website: z.string().optional()
  })
}

export function UpdateContactInputSchema(): z.ZodObject<Properties<UpdateContactInput>> {
  return z.object({
    email: z.string().optional(),
    jobTitle: z.string().optional(),
    name: z.string().optional(),
    phoneNumber: z.string().optional()
  })
}

export function UpdateCreditNoteInputSchema(): z.ZodObject<Properties<UpdateCreditNoteInput>> {
  return z.object({
    amount: z.number().optional(),
    appliedAt: z.string().optional(),
    creditNoteNumber: z.string().optional(),
    currency: z.string().optional(),
    notes: z.string().optional(),
    reason: z.string().optional()
  })
}

export function UpdateCustomerTrackingLinkInputSchema(): z.ZodObject<Properties<UpdateCustomerTrackingLinkInput>> {
  return z.object({
    accessCount: z.number().optional(),
    expiresAt: z.string().optional(),
    isActive: z.boolean().optional()
  })
}

export function UpdateDeliveryRouteInputSchema(): z.ZodObject<Properties<UpdateDeliveryRouteInput>> {
  return z.object({
    completedAt: z.string().optional(),
    estimatedDurationMinutes: z.number().optional(),
    optimizedRouteData: z.string().optional(),
    routeDate: z.string().optional(),
    startedAt: z.string().optional(),
    status: DeliveryRouteStatusSchema.optional(),
    totalDistanceKm: z.number().optional()
  })
}

export function UpdateDeliveryTaskInputSchema(): z.ZodObject<Properties<UpdateDeliveryTaskInput>> {
  return z.object({
    actualArrivalTime: z.string().optional(),
    attemptCount: z.number().optional(),
    deliveryAddress: z.string().optional(),
    deliveryInstructions: z.string().optional(),
    deliveryTime: z.string().optional(),
    estimatedArrivalTime: z.string().optional(),
    failureReason: DeliveryFailureReasonSchema.optional(),
    recipientName: z.string().optional(),
    recipientPhone: z.string().optional(),
    status: DeliveryTaskStatusSchema.optional()
  })
}

export function UpdateDisputeInputSchema(): z.ZodObject<Properties<UpdateDisputeInput>> {
  return z.object({
    disputedAmount: z.number().optional(),
    reason: z.string().optional(),
    resolutionNotes: z.string().optional(),
    resolvedAt: z.string().optional(),
    resolvedByUserId: z.string().optional(),
    status: DisputeStatusSchema.optional()
  })
}

export function UpdateDocumentInputSchema(): z.ZodObject<Properties<UpdateDocumentInput>> {
  return z.object({
    documentType: DocumentTypeSchema.optional(),
    fileName: z.string().optional(),
    filePath: z.string().optional(),
    fileSize: z.number().optional(),
    mimeType: z.string().optional(),
    recordId: z.string().optional(),
    recordType: z.string().optional(),
    uploadedByUserId: z.string().optional()
  })
}

export function UpdateDriverInputSchema(): z.ZodObject<Properties<UpdateDriverInput>> {
  return z.object({
    contactPhone: z.string().optional(),
    licenseExpiryDate: z.string().optional(),
    licenseNumber: z.string().optional(),
    status: DriverStatusSchema.optional()
  })
}

export function UpdateDriverLocationInputSchema(): z.ZodObject<Properties<UpdateDriverLocationInput>> {
  return z.object({
    accuracy: z.number().optional(),
    altitude: z.number().optional(),
    heading: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    speedKmh: z.number().optional()
  })
}

export function UpdateDriverScheduleInputSchema(): z.ZodObject<Properties<UpdateDriverScheduleInput>> {
  return z.object({
    endDate: z.string().optional(),
    reason: DriverScheduleReasonSchema.optional(),
    startDate: z.string().optional()
  })
}

export function UpdateExpenseInputSchema(): z.ZodObject<Properties<UpdateExpenseInput>> {
  return z.object({
    amount: z.number().optional(),
    currency: CurrencySchema.optional(),
    description: z.string().optional(),
    expenseDate: z.date().optional(),
    fuelQuantity: z.number().optional(),
    odometerReading: z.number().optional(),
    receiptUrl: z.string().optional(),
    status: ExpenseStatusSchema.optional(),
    type: ExpenseTypeSchema.optional()
  })
}

export function UpdateGeofenceEventInputSchema(): z.ZodObject<Properties<UpdateGeofenceEventInput>> {
  return z.object({
    eventType: GeofenceEventTypeSchema.optional()
  })
}

export function UpdateGeofenceInputSchema(): z.ZodObject<Properties<UpdateGeofenceInput>> {
  return z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    name: z.string().optional()
  })
}

export function UpdateGpsPingInputSchema(): z.ZodObject<Properties<UpdateGpsPingInput>> {
  return z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional()
  })
}

export function UpdateInboundShipmentInputSchema(): z.ZodObject<Properties<UpdateInboundShipmentInput>> {
  return z.object({
    actualArrivalDate: z.string().optional(),
    expectedArrivalDate: z.string().optional(),
    status: InboundShipmentStatusSchema.optional()
  })
}

export function UpdateInboundShipmentItemInputSchema(): z.ZodObject<Properties<UpdateInboundShipmentItemInput>> {
  return z.object({
    discrepancyNotes: z.string().optional(),
    expectedQuantity: z.number().optional(),
    receivedQuantity: z.number().optional()
  })
}

export function UpdateInteractionInputSchema(): z.ZodObject<Properties<UpdateInteractionInput>> {
  return z.object({
    interactionDate: z.date().optional(),
    notes: z.string().optional(),
    outcome: InteractionOutcomeSchema.optional(),
    type: InteractionTypeSchema.optional()
  })
}

export function UpdateInventoryAdjustmentInputSchema(): z.ZodObject<Properties<UpdateInventoryAdjustmentInput>> {
  return z.object({
    notes: z.string().optional(),
    quantityChange: z.number().optional(),
    reason: InventoryAdjustmentReasonSchema.optional(),
    userId: z.string().optional()
  })
}

export function UpdateInventoryBatchInputSchema(): z.ZodObject<Properties<UpdateInventoryBatchInput>> {
  return z.object({
    batchNumber: z.string().optional(),
    expirationDate: z.date().optional()
  })
}

export function UpdateInventoryStockInputSchema(): z.ZodObject<Properties<UpdateInventoryStockInput>> {
  return z.object({
    lastCountedAt: z.date().optional(),
    lastMovementAt: z.date().optional(),
    quantity: z.number().optional(),
    reservedQuantity: z.number().optional(),
    status: InventoryStockStatusSchema.optional()
  })
}

export function UpdateInvoiceInputSchema(): z.ZodObject<Properties<UpdateInvoiceInput>> {
  return z.object({
    dueDate: z.date().optional(),
    paidAt: z.date().optional(),
    paymentMethod: CrmInvoicePaymentMethodSchema.optional(),
    status: InvoiceStatusSchema.optional()
  })
}

export function UpdateInvoiceItemInputSchema(): z.ZodObject<Properties<UpdateInvoiceItemInput>> {
  return z.object({
    quantity: z.number()
  })
}

export function UpdateInvoiceLineItemInputSchema(): z.ZodObject<Properties<UpdateInvoiceLineItemInput>> {
  return z.object({
    description: z.string().optional(),
    discountRate: z.number().optional(),
    quantity: z.number().optional(),
    taxRate: z.number().optional(),
    unitPrice: z.number().optional()
  })
}

export function UpdateLeadInputSchema(): z.ZodObject<Properties<UpdateLeadInput>> {
  return z.object({
    convertedAt: z.date().optional(),
    convertedCompanyId: z.string().optional(),
    convertedContactId: z.string().optional(),
    convertedOpportunityId: z.string().optional(),
    email: z.string().optional(),
    leadScore: z.number().optional(),
    leadSource: LeadSourceSchema.optional(),
    name: z.string().optional(),
    status: LeadStatusSchema.optional()
  })
}

export function UpdateLocationInputSchema(): z.ZodObject<Properties<UpdateLocationInput>> {
  return z.object({
    barcode: z.string().optional(),
    hazmatApproved: z.boolean().optional(),
    isActive: z.boolean().optional(),
    isPickable: z.boolean().optional(),
    isReceivable: z.boolean().optional(),
    level: z.number().optional(),
    maxPallets: z.number().optional(),
    maxVolume: z.number().optional(),
    maxWeight: z.number().optional(),
    name: z.string().optional(),
    path: z.string().optional(),
    temperatureControlled: z.boolean().optional(),
    type: LocationTypeSchema.optional(),
    xCoordinate: z.number().optional(),
    yCoordinate: z.number().optional(),
    zCoordinate: z.number().optional()
  })
}

export function UpdateNotificationInputSchema(): z.ZodObject<Properties<UpdateNotificationInput>> {
  return z.object({
    isRead: z.boolean().optional()
  })
}

export function UpdateOpportunityInputSchema(): z.ZodObject<Properties<UpdateOpportunityInput>> {
  return z.object({
    dealValue: z.number().optional(),
    expectedCloseDate: z.date().optional(),
    lostReason: z.string().optional(),
    name: z.string().optional(),
    probability: z.number().optional(),
    source: OpportunitySourceSchema.optional(),
    stage: OpportunityStageSchema.optional()
  })
}

export function UpdateOpportunityProductInputSchema(): z.ZodObject<Properties<UpdateOpportunityProductInput>> {
  return z.object({
    quantity: z.number()
  })
}

export function UpdateOutboundShipmentInputSchema(): z.ZodObject<Properties<UpdateOutboundShipmentInput>> {
  return z.object({
    carrier: z.string().optional(),
    status: OutboundShipmentStatusSchema.optional()
  })
}

export function UpdateOutboundShipmentItemInputSchema(): z.ZodObject<Properties<UpdateOutboundShipmentItemInput>> {
  return z.object({
    quantityShipped: z.number().optional()
  })
}

export function UpdatePackageInputSchema(): z.ZodObject<Properties<UpdatePackageInput>> {
  return z.object({
    carrier: z.string().optional(),
    height: z.number().optional(),
    insuranceValue: z.number().optional(),
    isFragile: z.boolean().optional(),
    isHazmat: z.boolean().optional(),
    length: z.number().optional(),
    packageNumber: z.string().optional(),
    packageType: z.string().optional(),
    packedAt: z.date().optional(),
    requiresSignature: z.boolean().optional(),
    serviceLevel: z.string().optional(),
    shippedAt: z.date().optional(),
    trackingNumber: z.string().optional(),
    warehouseId: z.string().optional(),
    weight: z.number().optional(),
    width: z.number().optional()
  })
}

export function UpdatePackageItemInputSchema(): z.ZodObject<Properties<UpdatePackageItemInput>> {
  return z.object({
    expiryDate: z.string().optional(),
    lotNumber: z.string().optional(),
    quantity: z.number().optional(),
    unitWeight: z.number().optional()
  })
}

export function UpdatePartnerInvoiceInputSchema(): z.ZodObject<Properties<UpdatePartnerInvoiceInput>> {
  return z.object({
    status: PartnerInvoiceStatusSchema.optional()
  })
}

export function UpdatePartnerInvoiceItemInputSchema(): z.ZodObject<Properties<UpdatePartnerInvoiceItemInput>> {
  return z.object({
    amount: z.number()
  })
}

export function UpdatePaymentInputSchema(): z.ZodObject<Properties<UpdatePaymentInput>> {
  return z.object({
    currency: z.string().optional(),
    exchangeRate: z.number().optional(),
    fees: z.number().optional(),
    notes: z.string().optional(),
    status: PaymentStatusSchema.optional()
  })
}

export function UpdatePickBatchInputSchema(): z.ZodObject<Properties<UpdatePickBatchInput>> {
  return z.object({
    actualDuration: z.number().optional(),
    assignedUserId: z.string().optional(),
    batchNumber: z.string().optional(),
    completedAt: z.date().optional(),
    completedItems: z.number().optional(),
    priority: z.number().optional(),
    status: PickBatchStatusSchema.optional(),
    strategy: PickStrategySchema.optional(),
    warehouseId: z.string().optional(),
    waveId: z.string().optional(),
    zoneRestrictions: z.array(z.string())
  })
}

export function UpdatePickBatchItemInputSchema(): z.ZodObject<Properties<UpdatePickBatchItemInput>> {
  return z.object({
    actualPickTime: z.number().optional(),
    estimatedPickTime: z.number().optional(),
    orderPriority: z.number().optional()
  })
}

export function UpdateProductInputSchema(): z.ZodObject<Properties<UpdateProductInput>> {
  return z.object({
    description: z.string().optional(),
    name: z.string().optional(),
    price: z.number().optional(),
    sku: z.string().optional(),
    type: ProductTypeSchema.optional()
  })
}

export function UpdateProofOfDeliveryInputSchema(): z.ZodObject<Properties<UpdateProofOfDeliveryInput>> {
  return z.object({
    type: ProofTypeSchema.optional()
  })
}

export function UpdatePutawayRuleInputSchema(): z.ZodObject<Properties<UpdatePutawayRuleInput>> {
  return z.object({
    isActive: z.boolean().optional(),
    locationType: LocationTypeSchema.optional(),
    maxQuantity: z.number().optional(),
    minQuantity: z.number().optional(),
    preferredLocationId: z.string().optional(),
    priority: z.number().optional(),
    requiresHazmatApproval: z.boolean().optional(),
    requiresTemperatureControl: z.boolean().optional(),
    volumeThreshold: z.number().optional(),
    warehouseId: z.string().optional(),
    weightThreshold: z.number().optional()
  })
}

export function UpdateQuoteInputSchema(): z.ZodObject<Properties<UpdateQuoteInput>> {
  return z.object({
    destinationDetails: z.string().optional(),
    expiresAt: z.string().optional(),
    height: z.number().optional(),
    length: z.number().optional(),
    notes: z.string().optional(),
    originDetails: z.string().optional(),
    quotedPrice: z.number().optional(),
    serviceLevel: z.string().optional(),
    status: QuoteStatusSchema.optional(),
    weight: z.number().optional(),
    width: z.number().optional()
  })
}

export function UpdateRateCardInputSchema(): z.ZodObject<Properties<UpdateRateCardInput>> {
  return z.object({
    createdByUserId: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
    name: z.string().optional(),
    serviceType: ServiceTypeSchema.optional(),
    validFrom: z.string().optional(),
    validTo: z.string().optional()
  })
}

export function UpdateRateRuleInputSchema(): z.ZodObject<Properties<UpdateRateRuleInput>> {
  return z.object({
    condition: z.string().optional(),
    isActive: z.boolean().optional(),
    maxValue: z.number().optional(),
    minValue: z.number().optional(),
    price: z.number().optional(),
    pricingModel: PricingModelSchema.optional(),
    priority: z.number().optional(),
    rateCardId: z.string().optional(),
    value: z.string().optional()
  })
}

export function UpdateReorderPointInputSchema(): z.ZodObject<Properties<UpdateReorderPointInput>> {
  return z.object({
    threshold: z.number().optional()
  })
}

export function UpdateReturnInputSchema(): z.ZodObject<Properties<UpdateReturnInput>> {
  return z.object({
    reason: z.string().optional(),
    status: ReturnStatusSchema.optional()
  })
}

export function UpdateReturnItemInputSchema(): z.ZodObject<Properties<UpdateReturnItemInput>> {
  return z.object({
    condition: ReturnItemConditionSchema.optional(),
    quantityReceived: z.number().optional()
  })
}

export function UpdateRouteInputSchema(): z.ZodObject<Properties<UpdateRouteInput>> {
  return z.object({
    optimizedRouteData: z.string().optional(),
    totalDistance: z.number().optional(),
    totalDuration: z.number().optional()
  })
}

export function UpdateSalesOrderInputSchema(): z.ZodObject<Properties<UpdateSalesOrderInput>> {
  return z.object({
    shippingAddress: z.string().optional(),
    status: SalesOrderStatusSchema.optional()
  })
}

export function UpdateSalesOrderItemInputSchema(): z.ZodObject<Properties<UpdateSalesOrderItemInput>> {
  return z.object({
    quantityOrdered: z.number().optional()
  })
}

export function UpdateShipmentLegInputSchema(): z.ZodObject<Properties<UpdateShipmentLegInput>> {
  return z.object({
    carrierId: z.string().optional(),
    endLocation: z.string().optional(),
    internalTripId: z.string().optional(),
    legSequence: z.number().optional(),
    startLocation: z.string().optional(),
    status: ShipmentLegStatusSchema.optional()
  })
}

export function UpdateStockTransferInputSchema(): z.ZodObject<Properties<UpdateStockTransferInput>> {
  return z.object({
    destinationWarehouseId: z.string().optional(),
    quantity: z.number().optional(),
    status: StockTransferStatusSchema.optional()
  })
}

export function UpdateSupplierInputSchema(): z.ZodObject<Properties<UpdateSupplierInput>> {
  return z.object({
    contactPerson: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
    phoneNumber: z.string().optional()
  })
}

export function UpdateSurchargeInputSchema(): z.ZodObject<Properties<UpdateSurchargeInput>> {
  return z.object({
    amount: z.number().optional(),
    calculationMethod: SurchargeCalculationMethodSchema.optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
    name: z.string().optional(),
    type: z.string().optional(),
    validFrom: z.string().optional(),
    validTo: z.string().optional()
  })
}

export function UpdateTaskInputSchema(): z.ZodObject<Properties<UpdateTaskInput>> {
  return z.object({
    actualDuration: z.number().optional(),
    endTime: z.date().optional(),
    estimatedDuration: z.number().optional(),
    instructions: z.string().optional(),
    notes: z.string().optional(),
    pickBatchId: z.string().optional(),
    priority: z.number().optional(),
    sourceEntityId: z.string().optional(),
    sourceEntityType: z.string().optional(),
    startTime: z.date().optional(),
    status: TaskStatusSchema.optional(),
    taskNumber: z.string().optional(),
    type: TaskTypeSchema.optional(),
    userId: z.string().optional()
  })
}

export function UpdateTaskItemInputSchema(): z.ZodObject<Properties<UpdateTaskItemInput>> {
  return z.object({
    completedAt: z.string().optional(),
    destinationLocationId: z.string().optional(),
    expiryDate: z.date().optional(),
    notes: z.string().optional(),
    quantityCompleted: z.number().optional(),
    quantityRequired: z.number().optional(),
    sourceLocationId: z.string().optional(),
    status: TaskItemStatusSchema.optional()
  })
}

export function UpdateTripInputSchema(): z.ZodObject<Properties<UpdateTripInput>> {
  return z.object({
    endLocation: z.string().optional(),
    endTime: z.string().optional(),
    startLocation: z.string().optional(),
    startTime: z.string().optional(),
    status: TripStatusSchema.optional()
  })
}

export function UpdateTripStopInputSchema(): z.ZodObject<Properties<UpdateTripStopInput>> {
  return z.object({
    actualArrivalTime: z.string().optional(),
    actualDepartureTime: z.string().optional(),
    address: z.string().optional(),
    estimatedArrivalTime: z.string().optional(),
    estimatedDepartureTime: z.string().optional(),
    sequence: z.number().optional(),
    status: TripStopStatusSchema.optional()
  })
}

export function UpdateVehicleInputSchema(): z.ZodObject<Properties<UpdateVehicleInput>> {
  return z.object({
    capacityVolume: z.number().optional(),
    capacityWeight: z.number().optional(),
    currentMileage: z.number().optional(),
    lastMaintenanceDate: z.string().optional(),
    make: z.string().optional(),
    model: z.string().optional(),
    registrationNumber: z.string().optional(),
    status: VehicleStatusSchema.optional(),
    vin: z.string().optional(),
    year: z.number().optional()
  })
}

export function UpdateVehicleMaintenanceInputSchema(): z.ZodObject<Properties<UpdateVehicleMaintenanceInput>> {
  return z.object({
    cost: z.number().optional(),
    notes: z.string().optional(),
    serviceDate: z.date().optional(),
    serviceType: VehicleServiceTypeSchema.optional()
  })
}

export function UpdateWarehouseInputSchema(): z.ZodObject<Properties<UpdateWarehouseInput>> {
  return z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    contactEmail: z.string().optional(),
    contactPerson: z.string().optional(),
    contactPhone: z.string().optional(),
    country: z.string().optional(),
    isActive: z.boolean().optional(),
    name: z.string().optional(),
    postalCode: z.string().optional(),
    state: z.string().optional(),
    timezone: z.string().optional()
  })
}

export function UpdateWmsProductInputSchema(): z.ZodObject<Properties<UpdateWmsProductInput>> {
  return z.object({
    barcode: z.string().optional(),
    costPrice: z.number().optional(),
    description: z.string().optional(),
    height: z.number().optional(),
    length: z.number().optional(),
    name: z.string().optional(),
    sku: z.string().optional(),
    status: ProductStatusSchema.optional(),
    weight: z.number().optional(),
    width: z.number().optional()
  })
}
