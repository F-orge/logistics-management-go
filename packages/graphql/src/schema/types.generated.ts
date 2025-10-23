import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLContext } from '../context';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date | string; output: Date | string; }
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
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryAccountingSyncLogArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryAccountingSyncLogsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryBillingInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryBillingInvoicesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryClientAccountArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryClientAccountsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryCreditNoteArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryCreditNotesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryDisputeArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryDisputesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryQuoteArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryQuotesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryRateCardArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryRateCardsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQueryRateRuleArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQueryRateRulesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type BillingQuerySurchargeArgs = {
  id: Scalars['ID']['input'];
};


export type BillingQuerySurchargesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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

export type CarrierRateUnit =
  | 'FLAT_RATE'
  | 'PER_CONTAINER'
  | 'PER_KG'
  | 'PER_KM'
  | 'PER_MILE';

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
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryCampaignArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryCampaignsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryCaseArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryCasesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryCompaniesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryInteractionArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryInteractionsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryInvoicesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryLeadArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryLeadsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryNotificationsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type CrmQueryOpportunitiesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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
  to?: InputMaybe<Scalars['Date']['input']>;
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
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type DmsQueryDeliveryRouteArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryDeliveryRoutesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type DmsQueryDeliveryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type DmsQueryDeliveryTasksArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type DmsQueryDmsProofOfDeliveriesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
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

export type DriverScheduleReason =
  | 'PERSONAL_LEAVE'
  | 'SICK_LEAVE'
  | 'TRAINING'
  | 'VACATION';

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

export type DriverStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'ON_LEAVE';

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
  createdAt?: Maybe<Scalars['String']['output']>;
  expectedArrivalDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<InboundShipmentItems>>;
  status?: Maybe<InboundShipmentStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouseId: Scalars['ID']['output'];
};

export type InteractionType =
  | 'CALL'
  | 'EMAIL'
  | 'MEETING'
  | 'TEXT';

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

export type InventoryAdjustmentReason =
  | 'CYCLE_COUNT'
  | 'DAMAGED_GOODS'
  | 'EXPIRED'
  | 'MANUAL_CORRECTION'
  | 'RETURN_TO_VENDOR'
  | 'THEFT';

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

export type InvoiceStatus =
  | 'CANCELLED'
  | 'DRAFT'
  | 'OVERDUE'
  | 'PAID'
  | 'SENT';

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

export type LeadSource =
  | 'ADVERTISEMENT'
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

export type OpportunitySource =
  | 'ADVERTISEMENT'
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
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  outboundShipment: OutboundShipments;
  product: WmsProducts;
  quantityShipped: Scalars['Int']['output'];
  salesOrderItem: SalesOrderItems;
  updatedAt?: Maybe<Scalars['String']['output']>;
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

export type PartnerInvoiceStatus =
  | 'CANCELLED'
  | 'DISPUTED'
  | 'OVERDUE'
  | 'PAID'
  | 'PENDING';

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

export type PaymentMethod =
  | 'BANK_TRANSFER'
  | 'CASH'
  | 'CHECK'
  | 'CLIENT_CREDIT'
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'MAYA'
  | 'OTHER'
  | 'PAYPAL'
  | 'QR_PH'
  | 'STRIPE'
  | 'WALLET'
  | 'WIRE_TRANSFER';

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
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  product: WmsProducts;
  threshold: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
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
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  product: WmsProducts;
  quantityExpected: Scalars['Int']['output'];
  quantityReceived?: Maybe<Scalars['Int']['output']>;
  quantityVariance?: Maybe<Scalars['Int']['output']>;
  return: Returns;
  updatedAt?: Maybe<Scalars['String']['output']>;
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

export type SalesOrderStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED';

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

export type StockTransferStatus =
  | 'CANCELLED'
  | 'IN_TRANSIT'
  | 'PENDING'
  | 'RECEIVED';

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

export type SurchargeCalculationMethod =
  | 'FIXED'
  | 'PERCENTAGE'
  | 'PER_UNIT'
  | 'SLIDING_SCALE';

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
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryDriverArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryDriversArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryExpensesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryGeofenceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryGeofencesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryProofOfDeliveriesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
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
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryShipmentLegArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryShipmentLegsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryTripArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryTripsArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Date']['input']>;
};


export type TmsQueryVehicleArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryVehiclesArgs = {
  from?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryInboundShipmentArgs = {
  id: Scalars['ID']['input'];
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


export type WmsQueryOutboundShipmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryPackageArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryPackagesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryPickBatchArgs = {
  id: Scalars['ID']['input'];
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


export type WmsQueryReturnsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerySalesOrderArgs = {
  id: Scalars['ID']['input'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccountTransactions: ResolverTypeWrapper<Omit<AccountTransactions, 'clientAccount' | 'type'> & { clientAccount: ResolversTypes['ClientAccounts'], type: ResolversTypes['TransactionType'] }>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  AccountingSyncLogs: ResolverTypeWrapper<Omit<AccountingSyncLogs, 'status'> & { status?: Maybe<ResolversTypes['SyncStatus']> }>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Attachments: ResolverTypeWrapper<Omit<Attachments, 'recordType'> & { recordType?: Maybe<ResolversTypes['RecordType']> }>;
  BillingInvoiceStatus: ResolverTypeWrapper<'DRAFT' | 'SENT' | 'VIEWED' | 'PAID' | 'PARTIAL_PAID' | 'PAST_DUE' | 'DISPUTED' | 'CANCELLED' | 'VOID'>;
  BillingInvoices: ResolverTypeWrapper<Omit<BillingInvoices, 'client' | 'creditNotes' | 'lineItems' | 'payments' | 'quote' | 'status'> & { client: ResolversTypes['Companies'], creditNotes?: Maybe<Array<ResolversTypes['CreditNotes']>>, lineItems?: Maybe<Array<ResolversTypes['InvoiceLineItems']>>, payments?: Maybe<Array<ResolversTypes['Payments']>>, quote?: Maybe<ResolversTypes['Quotes']>, status?: Maybe<ResolversTypes['BillingInvoiceStatus']> }>;
  BillingMutation: ResolverTypeWrapper<Omit<BillingMutation, 'createAccountTransaction' | 'createAccountingSyncLog' | 'createBillingInvoice' | 'createClientAccount' | 'createCreditNote' | 'createDispute' | 'createDocument' | 'createInvoiceLineItem' | 'createPayment' | 'createQuote' | 'createRateCard' | 'createRateRule' | 'createSurcharge' | 'updateAccountTransaction' | 'updateAccountingSyncLog' | 'updateBillingInvoice' | 'updateClientAccount' | 'updateCreditNote' | 'updateDispute' | 'updateDocument' | 'updateInvoiceLineItem' | 'updatePayment' | 'updateQuote' | 'updateRateCard' | 'updateRateRule' | 'updateSurcharge'> & { createAccountTransaction: ResolversTypes['AccountTransactions'], createAccountingSyncLog: ResolversTypes['AccountingSyncLogs'], createBillingInvoice: ResolversTypes['BillingInvoices'], createClientAccount: ResolversTypes['ClientAccounts'], createCreditNote: ResolversTypes['CreditNotes'], createDispute: ResolversTypes['Disputes'], createDocument: ResolversTypes['Documents'], createInvoiceLineItem: ResolversTypes['InvoiceLineItems'], createPayment: ResolversTypes['Payments'], createQuote: ResolversTypes['Quotes'], createRateCard: ResolversTypes['RateCards'], createRateRule: ResolversTypes['RateRules'], createSurcharge: ResolversTypes['Surcharges'], updateAccountTransaction: ResolversTypes['AccountTransactions'], updateAccountingSyncLog: ResolversTypes['AccountingSyncLogs'], updateBillingInvoice: ResolversTypes['BillingInvoices'], updateClientAccount: ResolversTypes['ClientAccounts'], updateCreditNote: ResolversTypes['CreditNotes'], updateDispute: ResolversTypes['Disputes'], updateDocument: ResolversTypes['Documents'], updateInvoiceLineItem: ResolversTypes['InvoiceLineItems'], updatePayment: ResolversTypes['Payments'], updateQuote: ResolversTypes['Quotes'], updateRateCard: ResolversTypes['RateCards'], updateRateRule: ResolversTypes['RateRules'], updateSurcharge: ResolversTypes['Surcharges'] }>;
  BillingQuery: ResolverTypeWrapper<Omit<BillingQuery, 'accountTransaction' | 'accountTransactions' | 'accountingSyncLog' | 'accountingSyncLogs' | 'billingInvoice' | 'billingInvoices' | 'clientAccount' | 'clientAccounts' | 'creditNote' | 'creditNotes' | 'dispute' | 'disputes' | 'document' | 'documents' | 'payment' | 'payments' | 'quote' | 'quotes' | 'rateCard' | 'rateCards' | 'rateRule' | 'rateRules' | 'surcharge' | 'surcharges'> & { accountTransaction: ResolversTypes['AccountTransactions'], accountTransactions: Array<ResolversTypes['AccountTransactions']>, accountingSyncLog: ResolversTypes['AccountingSyncLogs'], accountingSyncLogs: Array<ResolversTypes['AccountingSyncLogs']>, billingInvoice: ResolversTypes['BillingInvoices'], billingInvoices: Array<ResolversTypes['BillingInvoices']>, clientAccount: ResolversTypes['ClientAccounts'], clientAccounts: Array<ResolversTypes['ClientAccounts']>, creditNote: ResolversTypes['CreditNotes'], creditNotes: Array<ResolversTypes['CreditNotes']>, dispute: ResolversTypes['Disputes'], disputes: Array<ResolversTypes['Disputes']>, document: ResolversTypes['Documents'], documents: Array<ResolversTypes['Documents']>, payment: ResolversTypes['Payments'], payments: Array<ResolversTypes['Payments']>, quote: ResolversTypes['Quotes'], quotes: Array<ResolversTypes['Quotes']>, rateCard: ResolversTypes['RateCards'], rateCards: Array<ResolversTypes['RateCards']>, rateRule: ResolversTypes['RateRules'], rateRules: Array<ResolversTypes['RateRules']>, surcharge: ResolversTypes['Surcharges'], surcharges: Array<ResolversTypes['Surcharges']> }>;
  BinThresholds: ResolverTypeWrapper<Omit<BinThresholds, 'location' | 'product'> & { location: ResolversTypes['Locations'], product: ResolversTypes['WmsProducts'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Campaigns: ResolverTypeWrapper<Campaigns>;
  CarrierRateUnit: ResolverTypeWrapper<'PER_KG' | 'PER_CONTAINER' | 'PER_MILE' | 'PER_KM' | 'FLAT_RATE'>;
  CarrierRates: ResolverTypeWrapper<Omit<CarrierRates, 'carrier' | 'unit'> & { carrier: ResolversTypes['Carriers'], unit?: Maybe<ResolversTypes['CarrierRateUnit']> }>;
  Carriers: ResolverTypeWrapper<Omit<Carriers, 'partnerInvoices' | 'rates' | 'shipmentLegs'> & { partnerInvoices?: Maybe<Array<ResolversTypes['PartnerInvoices']>>, rates?: Maybe<Array<ResolversTypes['CarrierRates']>>, shipmentLegs?: Maybe<Array<ResolversTypes['ShipmentLegs']>> }>;
  CasePriority: ResolverTypeWrapper<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>;
  CaseStatus: ResolverTypeWrapper<'NEW' | 'IN_PROGRESS' | 'WAITING_FOR_CUSTOMER' | 'WAITING_FOR_INTERNAL' | 'ESCALATED' | 'RESOLVED' | 'CLOSED' | 'CANCELLED'>;
  CaseType: ResolverTypeWrapper<'QUESTION' | 'PROBLEM' | 'COMPLAINT' | 'FEATURE_REQUEST' | 'BUG_REPORT' | 'TECHNICAL_SUPPORT'>;
  Cases: ResolverTypeWrapper<Omit<Cases, 'contact' | 'priority' | 'status' | 'type'> & { contact?: Maybe<ResolversTypes['Contacts']>, priority?: Maybe<ResolversTypes['CasePriority']>, status?: Maybe<ResolversTypes['CaseStatus']>, type?: Maybe<ResolversTypes['CaseType']> }>;
  ClientAccounts: ResolverTypeWrapper<Omit<ClientAccounts, 'client' | 'transactions'> & { client: ResolversTypes['Companies'], transactions?: Maybe<Array<ResolversTypes['AccountTransactions']>> }>;
  Companies: ResolverTypeWrapper<Omit<Companies, 'billingInvoices' | 'clientAccount' | 'disputes' | 'inboundShipments' | 'putawayRules' | 'quotes' | 'returns' | 'salesOrders'> & { billingInvoices?: Maybe<Array<ResolversTypes['BillingInvoices']>>, clientAccount?: Maybe<ResolversTypes['ClientAccounts']>, disputes?: Maybe<Array<ResolversTypes['Disputes']>>, inboundShipments?: Maybe<Array<ResolversTypes['InboundShipments']>>, putawayRules?: Maybe<Array<ResolversTypes['PutawayRules']>>, quotes?: Maybe<Array<ResolversTypes['Quotes']>>, returns?: Maybe<Array<ResolversTypes['Returns']>>, salesOrders?: Maybe<Array<ResolversTypes['SalesOrders']>> }>;
  Contacts: ResolverTypeWrapper<Omit<Contacts, 'company'> & { company?: Maybe<ResolversTypes['Companies']> }>;
  CreateAccountTransactionInput: CreateAccountTransactionInput;
  CreateAccountingSyncLogInput: CreateAccountingSyncLogInput;
  CreateAttachmentInput: CreateAttachmentInput;
  CreateBillingInvoiceInput: CreateBillingInvoiceInput;
  CreateBinThresholdInput: CreateBinThresholdInput;
  CreateCampaignInput: CreateCampaignInput;
  CreateCarrierInput: CreateCarrierInput;
  CreateCarrierRateInput: CreateCarrierRateInput;
  CreateCaseInput: CreateCaseInput;
  CreateClientAccountInput: CreateClientAccountInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateContactInput: CreateContactInput;
  CreateCreditNoteInput: CreateCreditNoteInput;
  CreateCustomerTrackingLinkInput: CreateCustomerTrackingLinkInput;
  CreateDeliveryRouteInput: CreateDeliveryRouteInput;
  CreateDeliveryTaskInput: CreateDeliveryTaskInput;
  CreateDisputeInput: CreateDisputeInput;
  CreateDmsProofOfDeliveryInput: CreateDmsProofOfDeliveryInput;
  CreateDocumentInput: CreateDocumentInput;
  CreateDriverInput: CreateDriverInput;
  CreateDriverLocationInput: CreateDriverLocationInput;
  CreateDriverScheduleInput: CreateDriverScheduleInput;
  CreateExpenseInput: CreateExpenseInput;
  CreateGeofenceEventInput: CreateGeofenceEventInput;
  CreateGeofenceInput: CreateGeofenceInput;
  CreateGpsPingInput: CreateGpsPingInput;
  CreateInboundShipmentInput: CreateInboundShipmentInput;
  CreateInboundShipmentItemInput: CreateInboundShipmentItemInput;
  CreateInteractionInput: CreateInteractionInput;
  CreateInventoryAdjustmentInput: CreateInventoryAdjustmentInput;
  CreateInventoryBatchInput: CreateInventoryBatchInput;
  CreateInventoryStockInput: CreateInventoryStockInput;
  CreateInvoiceInput: CreateInvoiceInput;
  CreateInvoiceItemInput: CreateInvoiceItemInput;
  CreateInvoiceLineItemInput: CreateInvoiceLineItemInput;
  CreateLeadInput: CreateLeadInput;
  CreateLocationInput: CreateLocationInput;
  CreateNotificationInput: CreateNotificationInput;
  CreateOpportunityInput: CreateOpportunityInput;
  CreateOpportunityProductInput: CreateOpportunityProductInput;
  CreateOutboundShipmentInput: CreateOutboundShipmentInput;
  CreateOutboundShipmentItemInput: CreateOutboundShipmentItemInput;
  CreatePackageInput: CreatePackageInput;
  CreatePackageItemInput: CreatePackageItemInput;
  CreatePartnerInvoiceInput: CreatePartnerInvoiceInput;
  CreatePartnerInvoiceItemInput: CreatePartnerInvoiceItemInput;
  CreatePaymentInput: CreatePaymentInput;
  CreatePickBatchInput: CreatePickBatchInput;
  CreatePickBatchItemInput: CreatePickBatchItemInput;
  CreateProductInput: CreateProductInput;
  CreateProofOfDeliveryInput: CreateProofOfDeliveryInput;
  CreatePutawayRuleInput: CreatePutawayRuleInput;
  CreateQuoteInput: CreateQuoteInput;
  CreateRateCardInput: CreateRateCardInput;
  CreateRateRuleInput: CreateRateRuleInput;
  CreateReorderPointInput: CreateReorderPointInput;
  CreateReturnInput: CreateReturnInput;
  CreateReturnItemInput: CreateReturnItemInput;
  CreateRouteInput: CreateRouteInput;
  CreateSalesOrderInput: CreateSalesOrderInput;
  CreateSalesOrderItemInput: CreateSalesOrderItemInput;
  CreateShipmentLegEventInput: CreateShipmentLegEventInput;
  CreateShipmentLegInput: CreateShipmentLegInput;
  CreateStockTransferInput: CreateStockTransferInput;
  CreateSupplierInput: CreateSupplierInput;
  CreateSurchargeInput: CreateSurchargeInput;
  CreateTaskEventInput: CreateTaskEventInput;
  CreateTaskInput: CreateTaskInput;
  CreateTaskItemInput: CreateTaskItemInput;
  CreateTripInput: CreateTripInput;
  CreateTripStopInput: CreateTripStopInput;
  CreateVehicleInput: CreateVehicleInput;
  CreateVehicleMaintenanceInput: CreateVehicleMaintenanceInput;
  CreateWarehouseInput: CreateWarehouseInput;
  CreateWmsProductInput: CreateWmsProductInput;
  CreditNotes: ResolverTypeWrapper<Omit<CreditNotes, 'dispute' | 'invoice'> & { dispute?: Maybe<ResolversTypes['Disputes']>, invoice: ResolversTypes['BillingInvoices'] }>;
  CrmMutation: ResolverTypeWrapper<Omit<CrmMutation, 'createAttachment' | 'createCase' | 'createCompany' | 'createContact' | 'createInteraction' | 'createInvoice' | 'createInvoiceItem' | 'createLead' | 'createOpportunity' | 'createOpportunityProduct' | 'createProduct' | 'updateCase' | 'updateCompany' | 'updateContact' | 'updateInteraction' | 'updateInvoice' | 'updateInvoiceItem' | 'updateLead' | 'updateOpportunity' | 'updateOpportunityProduct' | 'updateProduct'> & { createAttachment: ResolversTypes['Attachments'], createCase: ResolversTypes['Cases'], createCompany: ResolversTypes['Companies'], createContact: ResolversTypes['Contacts'], createInteraction: ResolversTypes['Interactions'], createInvoice: ResolversTypes['Invoices'], createInvoiceItem: ResolversTypes['InvoiceItems'], createLead: ResolversTypes['Leads'], createOpportunity: ResolversTypes['Opportunities'], createOpportunityProduct: ResolversTypes['OpportunityProducts'], createProduct: ResolversTypes['Products'], updateCase: ResolversTypes['Cases'], updateCompany: ResolversTypes['Companies'], updateContact: ResolversTypes['Contacts'], updateInteraction: ResolversTypes['Interactions'], updateInvoice: ResolversTypes['Invoices'], updateInvoiceItem: ResolversTypes['InvoiceItems'], updateLead: ResolversTypes['Leads'], updateOpportunity: ResolversTypes['Opportunities'], updateOpportunityProduct: ResolversTypes['OpportunityProducts'], updateProduct: ResolversTypes['Products'] }>;
  CrmQuery: ResolverTypeWrapper<Omit<CrmQuery, 'attachment' | 'attachments' | 'case' | 'cases' | 'companies' | 'company' | 'contact' | 'contacts' | 'interaction' | 'interactions' | 'invoice' | 'invoices' | 'lead' | 'leads' | 'opportunities' | 'opportunity' | 'product' | 'products'> & { attachment: ResolversTypes['Attachments'], attachments: Array<ResolversTypes['Attachments']>, case: ResolversTypes['Cases'], cases: Array<ResolversTypes['Cases']>, companies: Array<ResolversTypes['Companies']>, company: ResolversTypes['Companies'], contact: ResolversTypes['Contacts'], contacts: Array<ResolversTypes['Contacts']>, interaction: ResolversTypes['Interactions'], interactions: Array<ResolversTypes['Interactions']>, invoice: ResolversTypes['Invoices'], invoices: Array<ResolversTypes['Invoices']>, lead: ResolversTypes['Leads'], leads: Array<ResolversTypes['Leads']>, opportunities: Array<ResolversTypes['Opportunities']>, opportunity: ResolversTypes['Opportunities'], product: ResolversTypes['Products'], products: Array<ResolversTypes['Products']> }>;
  Currency: ResolverTypeWrapper<'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'PHP'>;
  CustomerTrackingLinks: ResolverTypeWrapper<Omit<CustomerTrackingLinks, 'deliveryTask'> & { deliveryTask: ResolversTypes['DeliveryTasks'] }>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteResult: ResolverTypeWrapper<DeleteResult>;
  DeliveryFailureReason: ResolverTypeWrapper<'RECIPIENT_NOT_HOME' | 'ADDRESS_NOT_FOUND' | 'REFUSED_DELIVERY' | 'DAMAGED_PACKAGE' | 'ACCESS_DENIED' | 'WEATHER_CONDITIONS' | 'VEHICLE_BREAKDOWN' | 'OTHER'>;
  DeliveryRouteStatus: ResolverTypeWrapper<'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'PAUSED'>;
  DeliveryRoutes: ResolverTypeWrapper<Omit<DeliveryRoutes, 'driver' | 'status' | 'tasks'> & { driver: ResolversTypes['Drivers'], status?: Maybe<ResolversTypes['DeliveryRouteStatus']>, tasks?: Maybe<Array<ResolversTypes['DeliveryTasks']>> }>;
  DeliveryTaskStatus: ResolverTypeWrapper<'PENDING' | 'ASSIGNED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'FAILED' | 'CANCELLED' | 'RESCHEDULED'>;
  DeliveryTasks: ResolverTypeWrapper<Omit<DeliveryTasks, 'customerTrackingLinks' | 'deliveryRoute' | 'events' | 'failureReason' | 'package' | 'proofOfDeliveries' | 'status'> & { customerTrackingLinks?: Maybe<Array<ResolversTypes['CustomerTrackingLinks']>>, deliveryRoute: ResolversTypes['DeliveryRoutes'], events?: Maybe<Array<ResolversTypes['TaskEvents']>>, failureReason?: Maybe<ResolversTypes['DeliveryFailureReason']>, package: ResolversTypes['Packages'], proofOfDeliveries?: Maybe<Array<ResolversTypes['DmsProofOfDeliveries']>>, status?: Maybe<ResolversTypes['DeliveryTaskStatus']> }>;
  DisputeStatus: ResolverTypeWrapper<'OPEN' | 'UNDER_REVIEW' | 'APPROVED' | 'DENIED' | 'ESCALATED' | 'CLOSED'>;
  Disputes: ResolverTypeWrapper<Omit<Disputes, 'client' | 'creditNotes' | 'lineItem' | 'status'> & { client: ResolversTypes['Companies'], creditNotes?: Maybe<Array<ResolversTypes['CreditNotes']>>, lineItem: ResolversTypes['InvoiceLineItems'], status?: Maybe<ResolversTypes['DisputeStatus']> }>;
  DmsMutation: ResolverTypeWrapper<Omit<DmsMutation, 'createCustomerTrackingLink' | 'createDeliveryRoute' | 'createDeliveryTask' | 'createDmsProofOfDelivery' | 'createDriverLocation' | 'createTaskEvent' | 'updateCustomerTrackingLink' | 'updateDeliveryRoute' | 'updateDeliveryTask' | 'updateDmsProofOfDelivery' | 'updateDriverLocation' | 'updateTaskEvent'> & { createCustomerTrackingLink: ResolversTypes['CustomerTrackingLinks'], createDeliveryRoute: ResolversTypes['DeliveryRoutes'], createDeliveryTask: ResolversTypes['DeliveryTasks'], createDmsProofOfDelivery: ResolversTypes['DmsProofOfDeliveries'], createDriverLocation: ResolversTypes['DriverLocations'], createTaskEvent: ResolversTypes['TaskEvents'], updateCustomerTrackingLink: ResolversTypes['CustomerTrackingLinks'], updateDeliveryRoute: ResolversTypes['DeliveryRoutes'], updateDeliveryTask: ResolversTypes['DeliveryTasks'], updateDmsProofOfDelivery: ResolversTypes['DmsProofOfDeliveries'], updateDriverLocation: ResolversTypes['DriverLocations'], updateTaskEvent: ResolversTypes['TaskEvents'] }>;
  DmsProofOfDeliveries: ResolverTypeWrapper<Omit<DmsProofOfDeliveries, 'deliveryTask' | 'type'> & { deliveryTask: ResolversTypes['DeliveryTasks'], type: ResolversTypes['ProofOfDeliveryType'] }>;
  DmsQuery: ResolverTypeWrapper<Omit<DmsQuery, 'customerTrackingLink' | 'customerTrackingLinks' | 'deliveryRoute' | 'deliveryRoutes' | 'deliveryTask' | 'deliveryTasks' | 'dmsProofOfDeliveries' | 'dmsProofOfDelivery' | 'driverLocation' | 'driverLocations' | 'taskEvent' | 'taskEvents'> & { customerTrackingLink: ResolversTypes['CustomerTrackingLinks'], customerTrackingLinks: Array<ResolversTypes['CustomerTrackingLinks']>, deliveryRoute: ResolversTypes['DeliveryRoutes'], deliveryRoutes: Array<ResolversTypes['DeliveryRoutes']>, deliveryTask: ResolversTypes['DeliveryTasks'], deliveryTasks: Array<ResolversTypes['DeliveryTasks']>, dmsProofOfDeliveries: Array<ResolversTypes['DmsProofOfDeliveries']>, dmsProofOfDelivery: ResolversTypes['DmsProofOfDeliveries'], driverLocation: ResolversTypes['DriverLocations'], driverLocations: Array<ResolversTypes['DriverLocations']>, taskEvent: ResolversTypes['TaskEvents'], taskEvents: Array<ResolversTypes['TaskEvents']> }>;
  DocumentType: ResolverTypeWrapper<'BOL' | 'COMMERCIAL_INVOICE' | 'PACKING_LIST' | 'RECEIPT' | 'CREDIT_NOTE' | 'SHIPPING_LABEL' | 'CUSTOMS_DECLARATION' | 'PROOF_OF_DELIVERY'>;
  Documents: ResolverTypeWrapper<Omit<Documents, 'documentType'> & { documentType: ResolversTypes['DocumentType'] }>;
  DriverLocations: ResolverTypeWrapper<Omit<DriverLocations, 'driver'> & { driver: ResolversTypes['Drivers'] }>;
  DriverScheduleReason: ResolverTypeWrapper<'VACATION' | 'SICK_LEAVE' | 'TRAINING' | 'PERSONAL_LEAVE'>;
  DriverSchedules: ResolverTypeWrapper<Omit<DriverSchedules, 'driver' | 'reason'> & { driver: ResolversTypes['Drivers'], reason?: Maybe<ResolversTypes['DriverScheduleReason']> }>;
  DriverStatus: ResolverTypeWrapper<'ACTIVE' | 'INACTIVE' | 'ON_LEAVE'>;
  Drivers: ResolverTypeWrapper<Omit<Drivers, 'deliveryRoutes' | 'driverLocations' | 'expenses' | 'schedules' | 'status' | 'trips'> & { deliveryRoutes?: Maybe<Array<ResolversTypes['DeliveryRoutes']>>, driverLocations?: Maybe<Array<ResolversTypes['DriverLocations']>>, expenses?: Maybe<Array<ResolversTypes['Expenses']>>, schedules?: Maybe<Array<ResolversTypes['DriverSchedules']>>, status?: Maybe<ResolversTypes['DriverStatus']>, trips?: Maybe<Array<ResolversTypes['Trips']>> }>;
  ExpenseStatus: ResolverTypeWrapper<'PENDING' | 'APPROVED' | 'REJECTED' | 'REIMBURSED'>;
  ExpenseType: ResolverTypeWrapper<'FUEL' | 'TOLLS' | 'MAINTENANCE' | 'PARKING' | 'MEALS' | 'ACCOMMODATION'>;
  Expenses: ResolverTypeWrapper<Omit<Expenses, 'currency' | 'driver' | 'status' | 'trip' | 'type'> & { currency?: Maybe<ResolversTypes['Currency']>, driver?: Maybe<ResolversTypes['Drivers']>, status?: Maybe<ResolversTypes['ExpenseStatus']>, trip?: Maybe<ResolversTypes['Trips']>, type?: Maybe<ResolversTypes['ExpenseType']> }>;
  File: ResolverTypeWrapper<Scalars['File']['output']>;
  GeofenceEventType: ResolverTypeWrapper<'ENTER' | 'EXIT'>;
  GeofenceEvents: ResolverTypeWrapper<Omit<GeofenceEvents, 'eventType' | 'geofence' | 'vehicle'> & { eventType: ResolversTypes['GeofenceEventType'], geofence: ResolversTypes['Geofences'], vehicle: ResolversTypes['Vehicles'] }>;
  Geofences: ResolverTypeWrapper<Omit<Geofences, 'events'> & { events?: Maybe<Array<ResolversTypes['GeofenceEvents']>> }>;
  GpsPings: ResolverTypeWrapper<Omit<GpsPings, 'vehicle'> & { vehicle: ResolversTypes['Vehicles'] }>;
  InboundShipmentItems: ResolverTypeWrapper<Omit<InboundShipmentItems, 'inboundShipment' | 'product'> & { inboundShipment: ResolversTypes['InboundShipments'], product: ResolversTypes['WmsProducts'] }>;
  InboundShipmentStatus: ResolverTypeWrapper<'PENDING' | 'ARRIVED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'>;
  InboundShipments: ResolverTypeWrapper<Omit<InboundShipments, 'client' | 'items' | 'status'> & { client?: Maybe<ResolversTypes['Companies']>, items?: Maybe<Array<ResolversTypes['InboundShipmentItems']>>, status?: Maybe<ResolversTypes['InboundShipmentStatus']> }>;
  InteractionType: ResolverTypeWrapper<'CALL' | 'MEETING' | 'TEXT' | 'EMAIL'>;
  Interactions: ResolverTypeWrapper<Omit<Interactions, 'case' | 'contact' | 'type'> & { case?: Maybe<ResolversTypes['Cases']>, contact: ResolversTypes['Contacts'], type?: Maybe<ResolversTypes['InteractionType']> }>;
  InventoryAdjustmentReason: ResolverTypeWrapper<'CYCLE_COUNT' | 'DAMAGED_GOODS' | 'THEFT' | 'EXPIRED' | 'RETURN_TO_VENDOR' | 'MANUAL_CORRECTION'>;
  InventoryAdjustments: ResolverTypeWrapper<Omit<InventoryAdjustments, 'product' | 'reason'> & { product: ResolversTypes['WmsProducts'], reason?: Maybe<ResolversTypes['InventoryAdjustmentReason']> }>;
  InventoryBatches: ResolverTypeWrapper<Omit<InventoryBatches, 'inventoryStock' | 'outboundShipmentItems' | 'packageItems' | 'product' | 'taskItems'> & { inventoryStock?: Maybe<Array<ResolversTypes['InventoryStock']>>, outboundShipmentItems?: Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, packageItems?: Maybe<Array<ResolversTypes['PackageItems']>>, product: ResolversTypes['WmsProducts'], taskItems?: Maybe<Array<ResolversTypes['TaskItems']>> }>;
  InventoryStock: ResolverTypeWrapper<Omit<InventoryStock, 'batch' | 'location' | 'product' | 'status'> & { batch?: Maybe<ResolversTypes['InventoryBatches']>, location: ResolversTypes['Locations'], product: ResolversTypes['WmsProducts'], status?: Maybe<ResolversTypes['InventoryStockStatus']> }>;
  InventoryStockStatus: ResolverTypeWrapper<'AVAILABLE' | 'ALLOCATED' | 'DAMAGED' | 'QUARANTINE' | 'HOLD' | 'SHIPPED' | 'EXPIRED'>;
  InvoiceItems: ResolverTypeWrapper<Omit<InvoiceItems, 'invoice' | 'product'> & { invoice: ResolversTypes['Invoices'], product: ResolversTypes['Products'] }>;
  InvoiceLineItems: ResolverTypeWrapper<Omit<InvoiceLineItems, 'disputes' | 'invoice'> & { disputes?: Maybe<Array<ResolversTypes['Disputes']>>, invoice: ResolversTypes['BillingInvoices'] }>;
  InvoiceStatus: ResolverTypeWrapper<'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED'>;
  Invoices: ResolverTypeWrapper<Omit<Invoices, 'items' | 'opportunity' | 'paymentMethod' | 'status'> & { items?: Maybe<Array<ResolversTypes['InvoiceItems']>>, opportunity?: Maybe<ResolversTypes['Opportunities']>, paymentMethod?: Maybe<ResolversTypes['PaymentMethod']>, status?: Maybe<ResolversTypes['InvoiceStatus']> }>;
  LeadSource: ResolverTypeWrapper<'WEBSITE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'EMAIL_CAMPAIGN' | 'COLD_CALL' | 'EVENT' | 'ADVERTISEMENT' | 'PARTNER' | 'OTHER'>;
  LeadStatus: ResolverTypeWrapper<'NEW' | 'CONTACTED' | 'QUALIFIED' | 'UNQUALIFIED' | 'CONVERTED'>;
  Leads: ResolverTypeWrapper<Omit<Leads, 'convertedCompany' | 'convertedContact' | 'convertedOpportunity' | 'leadSource' | 'status'> & { convertedCompany?: Maybe<ResolversTypes['Companies']>, convertedContact?: Maybe<ResolversTypes['Contacts']>, convertedOpportunity?: Maybe<ResolversTypes['Opportunities']>, leadSource?: Maybe<ResolversTypes['LeadSource']>, status?: Maybe<ResolversTypes['LeadStatus']> }>;
  LocationType: ResolverTypeWrapper<'RECEIVING_DOCK' | 'PICK_BIN' | 'PACKING_STATION' | 'CROSS_DOCK_AREA' | 'BULK_STORAGE' | 'RESERVE_STORAGE' | 'DAMAGED_GOODS' | 'STAGING_AREA' | 'QUALITY_CONTROL' | 'RETURNS_AREA'>;
  Locations: ResolverTypeWrapper<Omit<Locations, 'binThresholds' | 'destinationTaskItems' | 'inventoryStock' | 'parentLocation' | 'putawayRules' | 'sourceTaskItems' | 'type' | 'warehouse'> & { binThresholds?: Maybe<Array<ResolversTypes['BinThresholds']>>, destinationTaskItems?: Maybe<Array<ResolversTypes['TaskItems']>>, inventoryStock?: Maybe<Array<ResolversTypes['InventoryStock']>>, parentLocation?: Maybe<ResolversTypes['Locations']>, putawayRules?: Maybe<Array<ResolversTypes['PutawayRules']>>, sourceTaskItems?: Maybe<Array<ResolversTypes['TaskItems']>>, type: ResolversTypes['LocationType'], warehouse: ResolversTypes['Warehouses'] }>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Notifications: ResolverTypeWrapper<Notifications>;
  Opportunities: ResolverTypeWrapper<Omit<Opportunities, 'company' | 'contact' | 'products' | 'salesOrders' | 'source' | 'stage'> & { company?: Maybe<ResolversTypes['Companies']>, contact?: Maybe<ResolversTypes['Contacts']>, products?: Maybe<Array<ResolversTypes['OpportunityProducts']>>, salesOrders?: Maybe<Array<ResolversTypes['SalesOrders']>>, source?: Maybe<ResolversTypes['OpportunitySource']>, stage?: Maybe<ResolversTypes['OpportunityStage']> }>;
  OpportunityProducts: ResolverTypeWrapper<Omit<OpportunityProducts, 'opportunity' | 'product'> & { opportunity: ResolversTypes['Opportunities'], product: ResolversTypes['Products'] }>;
  OpportunitySource: ResolverTypeWrapper<'WEBSITE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'EMAIL_CAMPAIGN' | 'COLD_CALL' | 'EVENT' | 'ADVERTISEMENT' | 'PARTNER' | 'EXISTING_CUSTOMER' | 'OTHER'>;
  OpportunityStage: ResolverTypeWrapper<'PROSPECTING' | 'QUALIFICATION' | 'NEED_ANALYSIS' | 'DEMO' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST'>;
  OutboundShipmentItems: ResolverTypeWrapper<Omit<OutboundShipmentItems, 'batch' | 'outboundShipment' | 'product' | 'salesOrderItem'> & { batch?: Maybe<ResolversTypes['InventoryBatches']>, outboundShipment: ResolversTypes['OutboundShipments'], product: ResolversTypes['WmsProducts'], salesOrderItem: ResolversTypes['SalesOrderItems'] }>;
  OutboundShipmentStatus: ResolverTypeWrapper<'PICKING' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'>;
  OutboundShipments: ResolverTypeWrapper<Omit<OutboundShipments, 'items' | 'salesOrder' | 'status'> & { items?: Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, salesOrder: ResolversTypes['SalesOrders'], status?: Maybe<ResolversTypes['OutboundShipmentStatus']> }>;
  PackageItems: ResolverTypeWrapper<Omit<PackageItems, 'batch' | 'package' | 'product'> & { batch?: Maybe<ResolversTypes['InventoryBatches']>, package: ResolversTypes['Packages'], product: ResolversTypes['WmsProducts'] }>;
  Packages: ResolverTypeWrapper<Omit<Packages, 'deliveryTasks' | 'items' | 'salesOrder' | 'warehouse'> & { deliveryTasks?: Maybe<Array<ResolversTypes['DeliveryTasks']>>, items?: Maybe<Array<ResolversTypes['PackageItems']>>, salesOrder: ResolversTypes['SalesOrders'], warehouse: ResolversTypes['Warehouses'] }>;
  PartnerInvoiceItems: ResolverTypeWrapper<Omit<PartnerInvoiceItems, 'partnerInvoice' | 'shipmentLeg'> & { partnerInvoice: ResolversTypes['PartnerInvoices'], shipmentLeg: ResolversTypes['ShipmentLegs'] }>;
  PartnerInvoiceStatus: ResolverTypeWrapper<'PENDING' | 'PAID' | 'DISPUTED' | 'OVERDUE' | 'CANCELLED'>;
  PartnerInvoices: ResolverTypeWrapper<Omit<PartnerInvoices, 'carrier' | 'items' | 'status'> & { carrier: ResolversTypes['Carriers'], items?: Maybe<Array<ResolversTypes['PartnerInvoiceItems']>>, status?: Maybe<ResolversTypes['PartnerInvoiceStatus']> }>;
  PaymentMethod: ResolverTypeWrapper<'BANK_TRANSFER' | 'CASH' | 'CHECK' | 'CLIENT_CREDIT' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'MAYA' | 'OTHER' | 'PAYPAL' | 'QR_PH' | 'STRIPE' | 'WALLET' | 'WIRE_TRANSFER'>;
  PaymentStatus: ResolverTypeWrapper<'PENDING' | 'PROCESSING' | 'SUCCESSFUL' | 'FAILED' | 'CANCELLED' | 'REFUNDED'>;
  Payments: ResolverTypeWrapper<Omit<Payments, 'invoice' | 'paymentMethod' | 'status'> & { invoice: ResolversTypes['BillingInvoices'], paymentMethod: ResolversTypes['PaymentMethod'], status?: Maybe<ResolversTypes['PaymentStatus']> }>;
  PickBatchItems: ResolverTypeWrapper<Omit<PickBatchItems, 'pickBatch' | 'salesOrder'> & { pickBatch: ResolversTypes['PickBatches'], salesOrder: ResolversTypes['SalesOrders'] }>;
  PickBatchStatus: ResolverTypeWrapper<'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'>;
  PickBatches: ResolverTypeWrapper<Omit<PickBatches, 'items' | 'status' | 'strategy' | 'tasks' | 'warehouse'> & { items?: Maybe<Array<ResolversTypes['PickBatchItems']>>, status?: Maybe<ResolversTypes['PickBatchStatus']>, strategy: ResolversTypes['PickStrategy'], tasks?: Maybe<Array<ResolversTypes['Tasks']>>, warehouse: ResolversTypes['Warehouses'] }>;
  PickStrategy: ResolverTypeWrapper<'BATCH_PICKING' | 'ZONE_PICKING' | 'WAVE_PICKING' | 'SINGLE_ORDER_PICKING' | 'CLUSTER_PICKING'>;
  PricingModel: ResolverTypeWrapper<'PER_KG' | 'PER_ITEM' | 'FLAT_RATE' | 'PER_CUBIC_METER' | 'PER_ZONE' | 'PERCENTAGE' | 'TIERED'>;
  ProductStatus: ResolverTypeWrapper<'ACTIVE' | 'DISCONTINUED' | 'OBSOLETE' | 'INACTIVE'>;
  ProductType: ResolverTypeWrapper<'SERVICE' | 'GOOD' | 'DIGITAL' | 'SUBSCRIPTION'>;
  Products: ResolverTypeWrapper<Omit<Products, 'type'> & { type?: Maybe<ResolversTypes['ProductType']> }>;
  ProofOfDeliveries: ResolverTypeWrapper<Omit<ProofOfDeliveries, 'tripStop' | 'type'> & { tripStop: ResolversTypes['TripStops'], type?: Maybe<ResolversTypes['ProofType']> }>;
  ProofOfDeliveryType: ResolverTypeWrapper<'SIGNATURE' | 'PHOTO' | 'CODE_VERIFICATION' | 'CONTACTLESS_DELIVERY' | 'LEFT_AT_DOOR'>;
  ProofType: ResolverTypeWrapper<'SIGNATURE' | 'PHOTO' | 'BARCODE_SCAN' | 'PIN_VERIFICATION'>;
  PutawayRules: ResolverTypeWrapper<Omit<PutawayRules, 'client' | 'locationType' | 'preferredLocation' | 'product' | 'warehouse'> & { client?: Maybe<ResolversTypes['Companies']>, locationType?: Maybe<ResolversTypes['LocationType']>, preferredLocation?: Maybe<ResolversTypes['Locations']>, product: ResolversTypes['WmsProducts'], warehouse: ResolversTypes['Warehouses'] }>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  QuoteStatus: ResolverTypeWrapper<'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'CANCELLED' | 'CONVERTED'>;
  Quotes: ResolverTypeWrapper<Omit<Quotes, 'billingInvoices' | 'client' | 'status'> & { billingInvoices?: Maybe<Array<ResolversTypes['BillingInvoices']>>, client?: Maybe<ResolversTypes['Companies']>, status?: Maybe<ResolversTypes['QuoteStatus']> }>;
  RateCards: ResolverTypeWrapper<Omit<RateCards, 'rules' | 'serviceType'> & { rules?: Maybe<Array<ResolversTypes['RateRules']>>, serviceType: ResolversTypes['ServiceType'] }>;
  RateRules: ResolverTypeWrapper<Omit<RateRules, 'pricingModel' | 'rateCard'> & { pricingModel: ResolversTypes['PricingModel'], rateCard: ResolversTypes['RateCards'] }>;
  RecordType: ResolverTypeWrapper<'COMPANIES' | 'CONTACTS' | 'LEADS' | 'OPPORTUNITIES' | 'CASES' | 'INTERACTIONS' | 'CAMPAIGNS' | 'PRODUCTS' | 'INVOICES'>;
  ReorderPoints: ResolverTypeWrapper<Omit<ReorderPoints, 'product' | 'warehouse'> & { product: ResolversTypes['WmsProducts'], warehouse: ResolversTypes['Warehouses'] }>;
  ReturnItemCondition: ResolverTypeWrapper<'SELLABLE' | 'DAMAGED' | 'DEFECTIVE' | 'EXPIRED' | 'UNSELLABLE'>;
  ReturnItems: ResolverTypeWrapper<Omit<ReturnItems, 'condition' | 'product' | 'return'> & { condition?: Maybe<ResolversTypes['ReturnItemCondition']>, product: ResolversTypes['WmsProducts'], return: ResolversTypes['Returns'] }>;
  ReturnStatus: ResolverTypeWrapper<'REQUESTED' | 'APPROVED' | 'REJECTED' | 'RECEIVED' | 'PROCESSED'>;
  Returns: ResolverTypeWrapper<Omit<Returns, 'client' | 'items' | 'salesOrder' | 'status'> & { client: ResolversTypes['Companies'], items?: Maybe<Array<ResolversTypes['ReturnItems']>>, salesOrder?: Maybe<ResolversTypes['SalesOrders']>, status?: Maybe<ResolversTypes['ReturnStatus']> }>;
  Routes: ResolverTypeWrapper<Omit<Routes, 'trip'> & { trip: ResolversTypes['Trips'] }>;
  SalesOrderItems: ResolverTypeWrapper<Omit<SalesOrderItems, 'outboundShipmentItems' | 'product' | 'salesOrder'> & { outboundShipmentItems?: Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, product: ResolversTypes['WmsProducts'], salesOrder: ResolversTypes['SalesOrders'] }>;
  SalesOrderStatus: ResolverTypeWrapper<'PENDING' | 'PROCESSING' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'>;
  SalesOrders: ResolverTypeWrapper<Omit<SalesOrders, 'client' | 'crmOpportunity' | 'items' | 'outboundShipments' | 'packages' | 'pickBatchItems' | 'returns' | 'status'> & { client: ResolversTypes['Companies'], crmOpportunity?: Maybe<ResolversTypes['Opportunities']>, items?: Maybe<Array<ResolversTypes['SalesOrderItems']>>, outboundShipments?: Maybe<Array<ResolversTypes['OutboundShipments']>>, packages?: Maybe<Array<ResolversTypes['Packages']>>, pickBatchItems?: Maybe<Array<ResolversTypes['PickBatchItems']>>, returns?: Maybe<Array<ResolversTypes['Returns']>>, status?: Maybe<ResolversTypes['SalesOrderStatus']> }>;
  ServiceType: ResolverTypeWrapper<'SHIPPING' | 'STORAGE' | 'FULFILLMENT' | 'HANDLING' | 'INSURANCE' | 'CUSTOMS' | 'PACKAGING' | 'RETURNS'>;
  ShipmentLegEvents: ResolverTypeWrapper<Omit<ShipmentLegEvents, 'shipmentLeg'> & { shipmentLeg: ResolversTypes['ShipmentLegs'] }>;
  ShipmentLegStatus: ResolverTypeWrapper<'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED' | 'FAILED'>;
  ShipmentLegs: ResolverTypeWrapper<Omit<ShipmentLegs, 'carrier' | 'events' | 'internalTrip' | 'partnerInvoiceItems' | 'shipment' | 'status'> & { carrier?: Maybe<ResolversTypes['Carriers']>, events?: Maybe<Array<ResolversTypes['ShipmentLegEvents']>>, internalTrip?: Maybe<ResolversTypes['Trips']>, partnerInvoiceItems?: Maybe<Array<ResolversTypes['PartnerInvoiceItems']>>, shipment?: Maybe<ResolversTypes['OutboundShipments']>, status?: Maybe<ResolversTypes['ShipmentLegStatus']> }>;
  StockTransferStatus: ResolverTypeWrapper<'PENDING' | 'IN_TRANSIT' | 'RECEIVED' | 'CANCELLED'>;
  StockTransfers: ResolverTypeWrapper<Omit<StockTransfers, 'destinationWarehouse' | 'product' | 'sourceWarehouse' | 'status'> & { destinationWarehouse: ResolversTypes['Warehouses'], product: ResolversTypes['WmsProducts'], sourceWarehouse: ResolversTypes['Warehouses'], status?: Maybe<ResolversTypes['StockTransferStatus']> }>;
  Suppliers: ResolverTypeWrapper<Omit<Suppliers, 'products'> & { products?: Maybe<Array<ResolversTypes['WmsProducts']>> }>;
  SurchargeCalculationMethod: ResolverTypeWrapper<'PERCENTAGE' | 'FIXED' | 'PER_UNIT' | 'SLIDING_SCALE'>;
  Surcharges: ResolverTypeWrapper<Omit<Surcharges, 'calculationMethod'> & { calculationMethod: ResolversTypes['SurchargeCalculationMethod'] }>;
  SyncStatus: ResolverTypeWrapper<'PENDING' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILED' | 'RETRY'>;
  TaskEventStatus: ResolverTypeWrapper<'ASSIGNED' | 'STARTED' | 'ARRIVED' | 'DELIVERED' | 'FAILED' | 'EXCEPTION' | 'CANCELLED' | 'RESCHEDULED'>;
  TaskEvents: ResolverTypeWrapper<Omit<TaskEvents, 'deliveryTask' | 'status'> & { deliveryTask: ResolversTypes['DeliveryTasks'], status: ResolversTypes['TaskEventStatus'] }>;
  TaskItemStatus: ResolverTypeWrapper<'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SHORT_PICKED' | 'DAMAGED' | 'NOT_FOUND'>;
  TaskItems: ResolverTypeWrapper<Omit<TaskItems, 'batch' | 'destinationLocation' | 'product' | 'sourceLocation' | 'status' | 'task'> & { batch?: Maybe<ResolversTypes['InventoryBatches']>, destinationLocation?: Maybe<ResolversTypes['Locations']>, product: ResolversTypes['WmsProducts'], sourceLocation?: Maybe<ResolversTypes['Locations']>, status?: Maybe<ResolversTypes['TaskItemStatus']>, task: ResolversTypes['Tasks'] }>;
  TaskStatus: ResolverTypeWrapper<'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ERROR'>;
  TaskType: ResolverTypeWrapper<'PUTAWAY' | 'PICK' | 'PACK' | 'REPLENISHMENT' | 'CYCLE_COUNT' | 'CROSS_DOCK' | 'RETURNS_PROCESSING' | 'DAMAGE_INSPECTION' | 'QUALITY_CHECK'>;
  Tasks: ResolverTypeWrapper<Omit<Tasks, 'items' | 'pickBatch' | 'status' | 'type' | 'warehouse'> & { items?: Maybe<Array<ResolversTypes['TaskItems']>>, pickBatch?: Maybe<ResolversTypes['PickBatches']>, status?: Maybe<ResolversTypes['TaskStatus']>, type: ResolversTypes['TaskType'], warehouse: ResolversTypes['Warehouses'] }>;
  TmsMutation: ResolverTypeWrapper<Omit<TmsMutation, 'createCarrier' | 'createCarrierRate' | 'createDriver' | 'createDriverSchedule' | 'createExpense' | 'createGeofence' | 'createGeofenceEvent' | 'createGpsPing' | 'createPartnerInvoice' | 'createPartnerInvoiceItem' | 'createProofOfDelivery' | 'createRoute' | 'createShipmentLeg' | 'createShipmentLegEvent' | 'createTrip' | 'createTripStop' | 'createVehicle' | 'createVehicleMaintenance' | 'updateCarrier' | 'updateCarrierRate' | 'updateDriver' | 'updateDriverSchedule' | 'updateExpense' | 'updateGeofence' | 'updateGeofenceEvent' | 'updateGpsPing' | 'updatePartnerInvoice' | 'updatePartnerInvoiceItem' | 'updateProofOfDelivery' | 'updateRoute' | 'updateShipmentLeg' | 'updateShipmentLegEvent' | 'updateTrip' | 'updateTripStop' | 'updateVehicle' | 'updateVehicleMaintenance'> & { createCarrier: ResolversTypes['Carriers'], createCarrierRate: ResolversTypes['CarrierRates'], createDriver: ResolversTypes['Drivers'], createDriverSchedule: ResolversTypes['DriverSchedules'], createExpense: ResolversTypes['Expenses'], createGeofence: ResolversTypes['Geofences'], createGeofenceEvent: ResolversTypes['GeofenceEvents'], createGpsPing: ResolversTypes['GpsPings'], createPartnerInvoice: ResolversTypes['PartnerInvoices'], createPartnerInvoiceItem: ResolversTypes['PartnerInvoiceItems'], createProofOfDelivery: ResolversTypes['ProofOfDeliveries'], createRoute: ResolversTypes['Routes'], createShipmentLeg: ResolversTypes['ShipmentLegs'], createShipmentLegEvent: ResolversTypes['ShipmentLegEvents'], createTrip: ResolversTypes['Trips'], createTripStop: ResolversTypes['TripStops'], createVehicle: ResolversTypes['Vehicles'], createVehicleMaintenance: ResolversTypes['VehicleMaintenance'], updateCarrier: ResolversTypes['Carriers'], updateCarrierRate: ResolversTypes['CarrierRates'], updateDriver: ResolversTypes['Drivers'], updateDriverSchedule: ResolversTypes['DriverSchedules'], updateExpense: ResolversTypes['Expenses'], updateGeofence: ResolversTypes['Geofences'], updateGeofenceEvent: ResolversTypes['GeofenceEvents'], updateGpsPing: ResolversTypes['GpsPings'], updatePartnerInvoice: ResolversTypes['PartnerInvoices'], updatePartnerInvoiceItem: ResolversTypes['PartnerInvoiceItems'], updateProofOfDelivery: ResolversTypes['ProofOfDeliveries'], updateRoute: ResolversTypes['Routes'], updateShipmentLeg: ResolversTypes['ShipmentLegs'], updateShipmentLegEvent: ResolversTypes['ShipmentLegEvents'], updateTrip: ResolversTypes['Trips'], updateTripStop: ResolversTypes['TripStops'], updateVehicle: ResolversTypes['Vehicles'], updateVehicleMaintenance: ResolversTypes['VehicleMaintenance'] }>;
  TmsQuery: ResolverTypeWrapper<Omit<TmsQuery, 'carrier' | 'carriers' | 'driver' | 'drivers' | 'expense' | 'expenses' | 'geofence' | 'geofences' | 'gpsPing' | 'gpsPings' | 'partnerInvoice' | 'partnerInvoices' | 'proofOfDeliveries' | 'proofOfDelivery' | 'route' | 'routes' | 'shipmentLeg' | 'shipmentLegs' | 'trip' | 'trips' | 'vehicle' | 'vehicles'> & { carrier: ResolversTypes['Carriers'], carriers: Array<ResolversTypes['Carriers']>, driver: ResolversTypes['Drivers'], drivers: Array<ResolversTypes['Drivers']>, expense: ResolversTypes['Expenses'], expenses: Array<ResolversTypes['Expenses']>, geofence: ResolversTypes['Geofences'], geofences: Array<ResolversTypes['Geofences']>, gpsPing: ResolversTypes['GpsPings'], gpsPings: Array<ResolversTypes['GpsPings']>, partnerInvoice: ResolversTypes['PartnerInvoices'], partnerInvoices: Array<ResolversTypes['PartnerInvoices']>, proofOfDeliveries: Array<ResolversTypes['ProofOfDeliveries']>, proofOfDelivery: ResolversTypes['ProofOfDeliveries'], route: ResolversTypes['Routes'], routes: Array<ResolversTypes['Routes']>, shipmentLeg: ResolversTypes['ShipmentLegs'], shipmentLegs: Array<ResolversTypes['ShipmentLegs']>, trip: ResolversTypes['Trips'], trips: Array<ResolversTypes['Trips']>, vehicle: ResolversTypes['Vehicles'], vehicles: Array<ResolversTypes['Vehicles']> }>;
  TransactionType: ResolverTypeWrapper<'CREDIT' | 'DEBIT' | 'TOP_UP' | 'REFUND' | 'ADJUSTMENT' | 'FEE'>;
  TripStatus: ResolverTypeWrapper<'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'>;
  TripStopStatus: ResolverTypeWrapper<'PENDING' | 'ARRIVED' | 'COMPLETED' | 'SKIPPED'>;
  TripStops: ResolverTypeWrapper<Omit<TripStops, 'proofOfDeliveries' | 'shipment' | 'status' | 'trip'> & { proofOfDeliveries?: Maybe<Array<ResolversTypes['ProofOfDeliveries']>>, shipment?: Maybe<ResolversTypes['OutboundShipments']>, status?: Maybe<ResolversTypes['TripStopStatus']>, trip: ResolversTypes['Trips'] }>;
  Trips: ResolverTypeWrapper<Omit<Trips, 'driver' | 'expenses' | 'routes' | 'shipmentLegs' | 'status' | 'stops' | 'vehicle'> & { driver?: Maybe<ResolversTypes['Drivers']>, expenses?: Maybe<Array<ResolversTypes['Expenses']>>, routes?: Maybe<Array<ResolversTypes['Routes']>>, shipmentLegs?: Maybe<Array<ResolversTypes['ShipmentLegs']>>, status?: Maybe<ResolversTypes['TripStatus']>, stops?: Maybe<Array<ResolversTypes['TripStops']>>, vehicle?: Maybe<ResolversTypes['Vehicles']> }>;
  UpdateAccountTransactionInput: UpdateAccountTransactionInput;
  UpdateAccountingSyncLogInput: UpdateAccountingSyncLogInput;
  UpdateBillingInvoiceInput: UpdateBillingInvoiceInput;
  UpdateBinThresholdInput: UpdateBinThresholdInput;
  UpdateCampaignInput: UpdateCampaignInput;
  UpdateCarrierInput: UpdateCarrierInput;
  UpdateCarrierRateInput: UpdateCarrierRateInput;
  UpdateCaseInput: UpdateCaseInput;
  UpdateClientAccountInput: UpdateClientAccountInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateContactInput: UpdateContactInput;
  UpdateCreditNoteInput: UpdateCreditNoteInput;
  UpdateCustomerTrackingLinkInput: UpdateCustomerTrackingLinkInput;
  UpdateDeliveryRouteInput: UpdateDeliveryRouteInput;
  UpdateDeliveryTaskInput: UpdateDeliveryTaskInput;
  UpdateDisputeInput: UpdateDisputeInput;
  UpdateDmsProofOfDeliveryInput: UpdateDmsProofOfDeliveryInput;
  UpdateDocumentInput: UpdateDocumentInput;
  UpdateDriverInput: UpdateDriverInput;
  UpdateDriverLocationInput: UpdateDriverLocationInput;
  UpdateDriverScheduleInput: UpdateDriverScheduleInput;
  UpdateExpenseInput: UpdateExpenseInput;
  UpdateGeofenceEventInput: UpdateGeofenceEventInput;
  UpdateGeofenceInput: UpdateGeofenceInput;
  UpdateGpsPingInput: UpdateGpsPingInput;
  UpdateInboundShipmentInput: UpdateInboundShipmentInput;
  UpdateInboundShipmentItemInput: UpdateInboundShipmentItemInput;
  UpdateInteractionInput: UpdateInteractionInput;
  UpdateInventoryAdjustmentInput: UpdateInventoryAdjustmentInput;
  UpdateInventoryBatchInput: UpdateInventoryBatchInput;
  UpdateInventoryStockInput: UpdateInventoryStockInput;
  UpdateInvoiceInput: UpdateInvoiceInput;
  UpdateInvoiceItemInput: UpdateInvoiceItemInput;
  UpdateInvoiceLineItemInput: UpdateInvoiceLineItemInput;
  UpdateLeadInput: UpdateLeadInput;
  UpdateLocationInput: UpdateLocationInput;
  UpdateNotificationInput: UpdateNotificationInput;
  UpdateOpportunityInput: UpdateOpportunityInput;
  UpdateOpportunityProductInput: UpdateOpportunityProductInput;
  UpdateOutboundShipmentInput: UpdateOutboundShipmentInput;
  UpdateOutboundShipmentItemInput: UpdateOutboundShipmentItemInput;
  UpdatePackageInput: UpdatePackageInput;
  UpdatePackageItemInput: UpdatePackageItemInput;
  UpdatePartnerInvoiceInput: UpdatePartnerInvoiceInput;
  UpdatePartnerInvoiceItemInput: UpdatePartnerInvoiceItemInput;
  UpdatePaymentInput: UpdatePaymentInput;
  UpdatePickBatchInput: UpdatePickBatchInput;
  UpdatePickBatchItemInput: UpdatePickBatchItemInput;
  UpdateProductInput: UpdateProductInput;
  UpdateProofOfDeliveryInput: UpdateProofOfDeliveryInput;
  UpdatePutawayRuleInput: UpdatePutawayRuleInput;
  UpdateQuoteInput: UpdateQuoteInput;
  UpdateRateCardInput: UpdateRateCardInput;
  UpdateRateRuleInput: UpdateRateRuleInput;
  UpdateReorderPointInput: UpdateReorderPointInput;
  UpdateReturnInput: UpdateReturnInput;
  UpdateReturnItemInput: UpdateReturnItemInput;
  UpdateRouteInput: UpdateRouteInput;
  UpdateSalesOrderInput: UpdateSalesOrderInput;
  UpdateSalesOrderItemInput: UpdateSalesOrderItemInput;
  UpdateShipmentLegEventInput: UpdateShipmentLegEventInput;
  UpdateShipmentLegInput: UpdateShipmentLegInput;
  UpdateStockTransferInput: UpdateStockTransferInput;
  UpdateSupplierInput: UpdateSupplierInput;
  UpdateSurchargeInput: UpdateSurchargeInput;
  UpdateTaskEventInput: UpdateTaskEventInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskItemInput: UpdateTaskItemInput;
  UpdateTripInput: UpdateTripInput;
  UpdateTripStopInput: UpdateTripStopInput;
  UpdateVehicleInput: UpdateVehicleInput;
  UpdateVehicleMaintenanceInput: UpdateVehicleMaintenanceInput;
  UpdateWarehouseInput: UpdateWarehouseInput;
  UpdateWmsProductInput: UpdateWmsProductInput;
  User: ResolverTypeWrapper<User>;
  VehicleMaintenance: ResolverTypeWrapper<Omit<VehicleMaintenance, 'serviceType' | 'vehicle'> & { serviceType?: Maybe<ResolversTypes['VehicleServiceType']>, vehicle: ResolversTypes['Vehicles'] }>;
  VehicleServiceType: ResolverTypeWrapper<'ROUTINE_MAINTENANCE' | 'REPAIR' | 'INSPECTION' | 'OIL_CHANGE' | 'TIRE_REPLACEMENT' | 'BRAKE_SERVICE'>;
  VehicleStatus: ResolverTypeWrapper<'AVAILABLE' | 'IN_MAINTENANCE' | 'ON_TRIP' | 'OUT_OF_SERVICE'>;
  Vehicles: ResolverTypeWrapper<Omit<Vehicles, 'geofenceEvents' | 'gpsPings' | 'maintenances' | 'status' | 'trips'> & { geofenceEvents?: Maybe<Array<ResolversTypes['GeofenceEvents']>>, gpsPings?: Maybe<Array<ResolversTypes['GpsPings']>>, maintenances?: Maybe<Array<ResolversTypes['VehicleMaintenance']>>, status?: Maybe<ResolversTypes['VehicleStatus']>, trips?: Maybe<Array<ResolversTypes['Trips']>> }>;
  Warehouses: ResolverTypeWrapper<Omit<Warehouses, 'destinationStockTransfers' | 'inboundShipments' | 'locations' | 'outboundShipments' | 'packages' | 'pickBatches' | 'putawayRules' | 'sourceStockTransfers' | 'tasks'> & { destinationStockTransfers?: Maybe<Array<ResolversTypes['StockTransfers']>>, inboundShipments?: Maybe<Array<ResolversTypes['InboundShipments']>>, locations?: Maybe<Array<ResolversTypes['Locations']>>, outboundShipments?: Maybe<Array<ResolversTypes['OutboundShipments']>>, packages?: Maybe<Array<ResolversTypes['Packages']>>, pickBatches?: Maybe<Array<ResolversTypes['PickBatches']>>, putawayRules?: Maybe<Array<ResolversTypes['PutawayRules']>>, sourceStockTransfers?: Maybe<Array<ResolversTypes['StockTransfers']>>, tasks?: Maybe<Array<ResolversTypes['Tasks']>> }>;
  WmsMutation: ResolverTypeWrapper<Omit<WmsMutation, 'createBinThreshold' | 'createInboundShipment' | 'createInboundShipmentItem' | 'createInventoryAdjustment' | 'createInventoryBatch' | 'createInventoryStock' | 'createLocation' | 'createOutboundShipment' | 'createOutboundShipmentItem' | 'createPackage' | 'createPackageItem' | 'createPickBatch' | 'createPickBatchItem' | 'createPutawayRule' | 'createReorderPoint' | 'createReturn' | 'createReturnItem' | 'createSalesOrder' | 'createSalesOrderItem' | 'createStockTransfer' | 'createSupplier' | 'createTask' | 'createTaskItem' | 'createWarehouse' | 'createWmsProduct' | 'updateBinThreshold' | 'updateInboundShipment' | 'updateInboundShipmentItem' | 'updateInventoryAdjustment' | 'updateInventoryBatch' | 'updateInventoryStock' | 'updateLocation' | 'updateOutboundShipment' | 'updateOutboundShipmentItem' | 'updatePackage' | 'updatePackageItem' | 'updatePickBatch' | 'updatePickBatchItem' | 'updatePutawayRule' | 'updateReorderPoint' | 'updateReturn' | 'updateReturnItem' | 'updateSalesOrder' | 'updateSalesOrderItem' | 'updateStockTransfer' | 'updateSupplier' | 'updateTask' | 'updateTaskItem' | 'updateWarehouse' | 'updateWmsProduct'> & { createBinThreshold: ResolversTypes['BinThresholds'], createInboundShipment: ResolversTypes['InboundShipments'], createInboundShipmentItem: ResolversTypes['InboundShipmentItems'], createInventoryAdjustment: ResolversTypes['InventoryAdjustments'], createInventoryBatch: ResolversTypes['InventoryBatches'], createInventoryStock: ResolversTypes['InventoryStock'], createLocation: ResolversTypes['Locations'], createOutboundShipment: ResolversTypes['OutboundShipments'], createOutboundShipmentItem: ResolversTypes['OutboundShipmentItems'], createPackage: ResolversTypes['Packages'], createPackageItem: ResolversTypes['PackageItems'], createPickBatch: ResolversTypes['PickBatches'], createPickBatchItem: ResolversTypes['PickBatchItems'], createPutawayRule: ResolversTypes['PutawayRules'], createReorderPoint: ResolversTypes['ReorderPoints'], createReturn: ResolversTypes['Returns'], createReturnItem: ResolversTypes['ReturnItems'], createSalesOrder: ResolversTypes['SalesOrders'], createSalesOrderItem: ResolversTypes['SalesOrderItems'], createStockTransfer: ResolversTypes['StockTransfers'], createSupplier: ResolversTypes['Suppliers'], createTask: ResolversTypes['Tasks'], createTaskItem: ResolversTypes['TaskItems'], createWarehouse: ResolversTypes['Warehouses'], createWmsProduct: ResolversTypes['WmsProducts'], updateBinThreshold: ResolversTypes['BinThresholds'], updateInboundShipment: ResolversTypes['InboundShipments'], updateInboundShipmentItem: ResolversTypes['InboundShipmentItems'], updateInventoryAdjustment: ResolversTypes['InventoryAdjustments'], updateInventoryBatch: ResolversTypes['InventoryBatches'], updateInventoryStock: ResolversTypes['InventoryStock'], updateLocation: ResolversTypes['Locations'], updateOutboundShipment: ResolversTypes['OutboundShipments'], updateOutboundShipmentItem: ResolversTypes['OutboundShipmentItems'], updatePackage: ResolversTypes['Packages'], updatePackageItem: ResolversTypes['PackageItems'], updatePickBatch: ResolversTypes['PickBatches'], updatePickBatchItem: ResolversTypes['PickBatchItems'], updatePutawayRule: ResolversTypes['PutawayRules'], updateReorderPoint: ResolversTypes['ReorderPoints'], updateReturn: ResolversTypes['Returns'], updateReturnItem: ResolversTypes['ReturnItems'], updateSalesOrder: ResolversTypes['SalesOrders'], updateSalesOrderItem: ResolversTypes['SalesOrderItems'], updateStockTransfer: ResolversTypes['StockTransfers'], updateSupplier: ResolversTypes['Suppliers'], updateTask: ResolversTypes['Tasks'], updateTaskItem: ResolversTypes['TaskItems'], updateWarehouse: ResolversTypes['Warehouses'], updateWmsProduct: ResolversTypes['WmsProducts'] }>;
  WmsProducts: ResolverTypeWrapper<Omit<WmsProducts, 'adjustments' | 'batches' | 'binThresholds' | 'client' | 'inboundShipmentItems' | 'inventoryStock' | 'outboundShipmentItems' | 'packageItems' | 'putawayRules' | 'reorderPoints' | 'returnItems' | 'salesOrderItems' | 'status' | 'stockTransfers' | 'supplier' | 'taskItems'> & { adjustments?: Maybe<Array<ResolversTypes['InventoryAdjustments']>>, batches?: Maybe<Array<ResolversTypes['InventoryBatches']>>, binThresholds?: Maybe<Array<ResolversTypes['BinThresholds']>>, client?: Maybe<ResolversTypes['Companies']>, inboundShipmentItems?: Maybe<Array<ResolversTypes['InboundShipmentItems']>>, inventoryStock?: Maybe<Array<ResolversTypes['InventoryStock']>>, outboundShipmentItems?: Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, packageItems?: Maybe<Array<ResolversTypes['PackageItems']>>, putawayRules?: Maybe<Array<ResolversTypes['PutawayRules']>>, reorderPoints?: Maybe<Array<ResolversTypes['ReorderPoints']>>, returnItems?: Maybe<Array<ResolversTypes['ReturnItems']>>, salesOrderItems?: Maybe<Array<ResolversTypes['SalesOrderItems']>>, status?: Maybe<ResolversTypes['ProductStatus']>, stockTransfers?: Maybe<Array<ResolversTypes['StockTransfers']>>, supplier?: Maybe<ResolversTypes['Suppliers']>, taskItems?: Maybe<Array<ResolversTypes['TaskItems']>> }>;
  WmsQuery: ResolverTypeWrapper<Omit<WmsQuery, 'binThreshold' | 'binThresholds' | 'inboundShipment' | 'inboundShipments' | 'inventoryAdjustment' | 'inventoryAdjustments' | 'inventoryBatch' | 'inventoryBatches' | 'inventoryStock' | 'inventoryStocks' | 'location' | 'locations' | 'outboundShipment' | 'outboundShipments' | 'package' | 'packages' | 'pickBatch' | 'pickBatches' | 'putawayRule' | 'putawayRules' | 'reorderPoint' | 'reorderPoints' | 'return' | 'returns' | 'salesOrder' | 'salesOrders' | 'stockTransfer' | 'stockTransfers' | 'supplier' | 'suppliers' | 'task' | 'tasks' | 'warehouse' | 'warehouses' | 'wmsProduct' | 'wmsProducts'> & { binThreshold: ResolversTypes['BinThresholds'], binThresholds: Array<ResolversTypes['BinThresholds']>, inboundShipment: ResolversTypes['InboundShipments'], inboundShipments: Array<ResolversTypes['InboundShipments']>, inventoryAdjustment: ResolversTypes['InventoryAdjustments'], inventoryAdjustments: Array<ResolversTypes['InventoryAdjustments']>, inventoryBatch: ResolversTypes['InventoryBatches'], inventoryBatches: Array<ResolversTypes['InventoryBatches']>, inventoryStock: ResolversTypes['InventoryStock'], inventoryStocks: Array<ResolversTypes['InventoryStock']>, location: ResolversTypes['Locations'], locations: Array<ResolversTypes['Locations']>, outboundShipment: ResolversTypes['OutboundShipments'], outboundShipments: Array<ResolversTypes['OutboundShipments']>, package: ResolversTypes['Packages'], packages: Array<ResolversTypes['Packages']>, pickBatch: ResolversTypes['PickBatches'], pickBatches: Array<ResolversTypes['PickBatches']>, putawayRule: ResolversTypes['PutawayRules'], putawayRules: Array<ResolversTypes['PutawayRules']>, reorderPoint: ResolversTypes['ReorderPoints'], reorderPoints: Array<ResolversTypes['ReorderPoints']>, return: ResolversTypes['Returns'], returns: Array<ResolversTypes['Returns']>, salesOrder: ResolversTypes['SalesOrders'], salesOrders: Array<ResolversTypes['SalesOrders']>, stockTransfer: ResolversTypes['StockTransfers'], stockTransfers: Array<ResolversTypes['StockTransfers']>, supplier: ResolversTypes['Suppliers'], suppliers: Array<ResolversTypes['Suppliers']>, task: ResolversTypes['Tasks'], tasks: Array<ResolversTypes['Tasks']>, warehouse: ResolversTypes['Warehouses'], warehouses: Array<ResolversTypes['Warehouses']>, wmsProduct: ResolversTypes['WmsProducts'], wmsProducts: Array<ResolversTypes['WmsProducts']> }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccountTransactions: Omit<AccountTransactions, 'clientAccount'> & { clientAccount: ResolversParentTypes['ClientAccounts'] };
  Float: Scalars['Float']['output'];
  String: Scalars['String']['output'];
  ID: Scalars['ID']['output'];
  AccountingSyncLogs: AccountingSyncLogs;
  Int: Scalars['Int']['output'];
  Attachments: Attachments;
  BillingInvoices: Omit<BillingInvoices, 'client' | 'creditNotes' | 'lineItems' | 'payments' | 'quote'> & { client: ResolversParentTypes['Companies'], creditNotes?: Maybe<Array<ResolversParentTypes['CreditNotes']>>, lineItems?: Maybe<Array<ResolversParentTypes['InvoiceLineItems']>>, payments?: Maybe<Array<ResolversParentTypes['Payments']>>, quote?: Maybe<ResolversParentTypes['Quotes']> };
  BillingMutation: Omit<BillingMutation, 'createAccountTransaction' | 'createAccountingSyncLog' | 'createBillingInvoice' | 'createClientAccount' | 'createCreditNote' | 'createDispute' | 'createDocument' | 'createInvoiceLineItem' | 'createPayment' | 'createQuote' | 'createRateCard' | 'createRateRule' | 'createSurcharge' | 'updateAccountTransaction' | 'updateAccountingSyncLog' | 'updateBillingInvoice' | 'updateClientAccount' | 'updateCreditNote' | 'updateDispute' | 'updateDocument' | 'updateInvoiceLineItem' | 'updatePayment' | 'updateQuote' | 'updateRateCard' | 'updateRateRule' | 'updateSurcharge'> & { createAccountTransaction: ResolversParentTypes['AccountTransactions'], createAccountingSyncLog: ResolversParentTypes['AccountingSyncLogs'], createBillingInvoice: ResolversParentTypes['BillingInvoices'], createClientAccount: ResolversParentTypes['ClientAccounts'], createCreditNote: ResolversParentTypes['CreditNotes'], createDispute: ResolversParentTypes['Disputes'], createDocument: ResolversParentTypes['Documents'], createInvoiceLineItem: ResolversParentTypes['InvoiceLineItems'], createPayment: ResolversParentTypes['Payments'], createQuote: ResolversParentTypes['Quotes'], createRateCard: ResolversParentTypes['RateCards'], createRateRule: ResolversParentTypes['RateRules'], createSurcharge: ResolversParentTypes['Surcharges'], updateAccountTransaction: ResolversParentTypes['AccountTransactions'], updateAccountingSyncLog: ResolversParentTypes['AccountingSyncLogs'], updateBillingInvoice: ResolversParentTypes['BillingInvoices'], updateClientAccount: ResolversParentTypes['ClientAccounts'], updateCreditNote: ResolversParentTypes['CreditNotes'], updateDispute: ResolversParentTypes['Disputes'], updateDocument: ResolversParentTypes['Documents'], updateInvoiceLineItem: ResolversParentTypes['InvoiceLineItems'], updatePayment: ResolversParentTypes['Payments'], updateQuote: ResolversParentTypes['Quotes'], updateRateCard: ResolversParentTypes['RateCards'], updateRateRule: ResolversParentTypes['RateRules'], updateSurcharge: ResolversParentTypes['Surcharges'] };
  BillingQuery: Omit<BillingQuery, 'accountTransaction' | 'accountTransactions' | 'accountingSyncLog' | 'accountingSyncLogs' | 'billingInvoice' | 'billingInvoices' | 'clientAccount' | 'clientAccounts' | 'creditNote' | 'creditNotes' | 'dispute' | 'disputes' | 'document' | 'documents' | 'payment' | 'payments' | 'quote' | 'quotes' | 'rateCard' | 'rateCards' | 'rateRule' | 'rateRules' | 'surcharge' | 'surcharges'> & { accountTransaction: ResolversParentTypes['AccountTransactions'], accountTransactions: Array<ResolversParentTypes['AccountTransactions']>, accountingSyncLog: ResolversParentTypes['AccountingSyncLogs'], accountingSyncLogs: Array<ResolversParentTypes['AccountingSyncLogs']>, billingInvoice: ResolversParentTypes['BillingInvoices'], billingInvoices: Array<ResolversParentTypes['BillingInvoices']>, clientAccount: ResolversParentTypes['ClientAccounts'], clientAccounts: Array<ResolversParentTypes['ClientAccounts']>, creditNote: ResolversParentTypes['CreditNotes'], creditNotes: Array<ResolversParentTypes['CreditNotes']>, dispute: ResolversParentTypes['Disputes'], disputes: Array<ResolversParentTypes['Disputes']>, document: ResolversParentTypes['Documents'], documents: Array<ResolversParentTypes['Documents']>, payment: ResolversParentTypes['Payments'], payments: Array<ResolversParentTypes['Payments']>, quote: ResolversParentTypes['Quotes'], quotes: Array<ResolversParentTypes['Quotes']>, rateCard: ResolversParentTypes['RateCards'], rateCards: Array<ResolversParentTypes['RateCards']>, rateRule: ResolversParentTypes['RateRules'], rateRules: Array<ResolversParentTypes['RateRules']>, surcharge: ResolversParentTypes['Surcharges'], surcharges: Array<ResolversParentTypes['Surcharges']> };
  BinThresholds: Omit<BinThresholds, 'location' | 'product'> & { location: ResolversParentTypes['Locations'], product: ResolversParentTypes['WmsProducts'] };
  Boolean: Scalars['Boolean']['output'];
  Campaigns: Campaigns;
  CarrierRates: Omit<CarrierRates, 'carrier'> & { carrier: ResolversParentTypes['Carriers'] };
  Carriers: Omit<Carriers, 'partnerInvoices' | 'rates' | 'shipmentLegs'> & { partnerInvoices?: Maybe<Array<ResolversParentTypes['PartnerInvoices']>>, rates?: Maybe<Array<ResolversParentTypes['CarrierRates']>>, shipmentLegs?: Maybe<Array<ResolversParentTypes['ShipmentLegs']>> };
  Cases: Omit<Cases, 'contact'> & { contact?: Maybe<ResolversParentTypes['Contacts']> };
  ClientAccounts: Omit<ClientAccounts, 'client' | 'transactions'> & { client: ResolversParentTypes['Companies'], transactions?: Maybe<Array<ResolversParentTypes['AccountTransactions']>> };
  Companies: Omit<Companies, 'billingInvoices' | 'clientAccount' | 'disputes' | 'inboundShipments' | 'putawayRules' | 'quotes' | 'returns' | 'salesOrders'> & { billingInvoices?: Maybe<Array<ResolversParentTypes['BillingInvoices']>>, clientAccount?: Maybe<ResolversParentTypes['ClientAccounts']>, disputes?: Maybe<Array<ResolversParentTypes['Disputes']>>, inboundShipments?: Maybe<Array<ResolversParentTypes['InboundShipments']>>, putawayRules?: Maybe<Array<ResolversParentTypes['PutawayRules']>>, quotes?: Maybe<Array<ResolversParentTypes['Quotes']>>, returns?: Maybe<Array<ResolversParentTypes['Returns']>>, salesOrders?: Maybe<Array<ResolversParentTypes['SalesOrders']>> };
  Contacts: Omit<Contacts, 'company'> & { company?: Maybe<ResolversParentTypes['Companies']> };
  CreateAccountTransactionInput: CreateAccountTransactionInput;
  CreateAccountingSyncLogInput: CreateAccountingSyncLogInput;
  CreateAttachmentInput: CreateAttachmentInput;
  CreateBillingInvoiceInput: CreateBillingInvoiceInput;
  CreateBinThresholdInput: CreateBinThresholdInput;
  CreateCampaignInput: CreateCampaignInput;
  CreateCarrierInput: CreateCarrierInput;
  CreateCarrierRateInput: CreateCarrierRateInput;
  CreateCaseInput: CreateCaseInput;
  CreateClientAccountInput: CreateClientAccountInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateContactInput: CreateContactInput;
  CreateCreditNoteInput: CreateCreditNoteInput;
  CreateCustomerTrackingLinkInput: CreateCustomerTrackingLinkInput;
  CreateDeliveryRouteInput: CreateDeliveryRouteInput;
  CreateDeliveryTaskInput: CreateDeliveryTaskInput;
  CreateDisputeInput: CreateDisputeInput;
  CreateDmsProofOfDeliveryInput: CreateDmsProofOfDeliveryInput;
  CreateDocumentInput: CreateDocumentInput;
  CreateDriverInput: CreateDriverInput;
  CreateDriverLocationInput: CreateDriverLocationInput;
  CreateDriverScheduleInput: CreateDriverScheduleInput;
  CreateExpenseInput: CreateExpenseInput;
  CreateGeofenceEventInput: CreateGeofenceEventInput;
  CreateGeofenceInput: CreateGeofenceInput;
  CreateGpsPingInput: CreateGpsPingInput;
  CreateInboundShipmentInput: CreateInboundShipmentInput;
  CreateInboundShipmentItemInput: CreateInboundShipmentItemInput;
  CreateInteractionInput: CreateInteractionInput;
  CreateInventoryAdjustmentInput: CreateInventoryAdjustmentInput;
  CreateInventoryBatchInput: CreateInventoryBatchInput;
  CreateInventoryStockInput: CreateInventoryStockInput;
  CreateInvoiceInput: CreateInvoiceInput;
  CreateInvoiceItemInput: CreateInvoiceItemInput;
  CreateInvoiceLineItemInput: CreateInvoiceLineItemInput;
  CreateLeadInput: CreateLeadInput;
  CreateLocationInput: CreateLocationInput;
  CreateNotificationInput: CreateNotificationInput;
  CreateOpportunityInput: CreateOpportunityInput;
  CreateOpportunityProductInput: CreateOpportunityProductInput;
  CreateOutboundShipmentInput: CreateOutboundShipmentInput;
  CreateOutboundShipmentItemInput: CreateOutboundShipmentItemInput;
  CreatePackageInput: CreatePackageInput;
  CreatePackageItemInput: CreatePackageItemInput;
  CreatePartnerInvoiceInput: CreatePartnerInvoiceInput;
  CreatePartnerInvoiceItemInput: CreatePartnerInvoiceItemInput;
  CreatePaymentInput: CreatePaymentInput;
  CreatePickBatchInput: CreatePickBatchInput;
  CreatePickBatchItemInput: CreatePickBatchItemInput;
  CreateProductInput: CreateProductInput;
  CreateProofOfDeliveryInput: CreateProofOfDeliveryInput;
  CreatePutawayRuleInput: CreatePutawayRuleInput;
  CreateQuoteInput: CreateQuoteInput;
  CreateRateCardInput: CreateRateCardInput;
  CreateRateRuleInput: CreateRateRuleInput;
  CreateReorderPointInput: CreateReorderPointInput;
  CreateReturnInput: CreateReturnInput;
  CreateReturnItemInput: CreateReturnItemInput;
  CreateRouteInput: CreateRouteInput;
  CreateSalesOrderInput: CreateSalesOrderInput;
  CreateSalesOrderItemInput: CreateSalesOrderItemInput;
  CreateShipmentLegEventInput: CreateShipmentLegEventInput;
  CreateShipmentLegInput: CreateShipmentLegInput;
  CreateStockTransferInput: CreateStockTransferInput;
  CreateSupplierInput: CreateSupplierInput;
  CreateSurchargeInput: CreateSurchargeInput;
  CreateTaskEventInput: CreateTaskEventInput;
  CreateTaskInput: CreateTaskInput;
  CreateTaskItemInput: CreateTaskItemInput;
  CreateTripInput: CreateTripInput;
  CreateTripStopInput: CreateTripStopInput;
  CreateVehicleInput: CreateVehicleInput;
  CreateVehicleMaintenanceInput: CreateVehicleMaintenanceInput;
  CreateWarehouseInput: CreateWarehouseInput;
  CreateWmsProductInput: CreateWmsProductInput;
  CreditNotes: Omit<CreditNotes, 'dispute' | 'invoice'> & { dispute?: Maybe<ResolversParentTypes['Disputes']>, invoice: ResolversParentTypes['BillingInvoices'] };
  CrmMutation: Omit<CrmMutation, 'createAttachment' | 'createCase' | 'createCompany' | 'createContact' | 'createInteraction' | 'createInvoice' | 'createInvoiceItem' | 'createLead' | 'createOpportunity' | 'createOpportunityProduct' | 'createProduct' | 'updateCase' | 'updateCompany' | 'updateContact' | 'updateInteraction' | 'updateInvoice' | 'updateInvoiceItem' | 'updateLead' | 'updateOpportunity' | 'updateOpportunityProduct' | 'updateProduct'> & { createAttachment: ResolversParentTypes['Attachments'], createCase: ResolversParentTypes['Cases'], createCompany: ResolversParentTypes['Companies'], createContact: ResolversParentTypes['Contacts'], createInteraction: ResolversParentTypes['Interactions'], createInvoice: ResolversParentTypes['Invoices'], createInvoiceItem: ResolversParentTypes['InvoiceItems'], createLead: ResolversParentTypes['Leads'], createOpportunity: ResolversParentTypes['Opportunities'], createOpportunityProduct: ResolversParentTypes['OpportunityProducts'], createProduct: ResolversParentTypes['Products'], updateCase: ResolversParentTypes['Cases'], updateCompany: ResolversParentTypes['Companies'], updateContact: ResolversParentTypes['Contacts'], updateInteraction: ResolversParentTypes['Interactions'], updateInvoice: ResolversParentTypes['Invoices'], updateInvoiceItem: ResolversParentTypes['InvoiceItems'], updateLead: ResolversParentTypes['Leads'], updateOpportunity: ResolversParentTypes['Opportunities'], updateOpportunityProduct: ResolversParentTypes['OpportunityProducts'], updateProduct: ResolversParentTypes['Products'] };
  CrmQuery: Omit<CrmQuery, 'attachment' | 'attachments' | 'case' | 'cases' | 'companies' | 'company' | 'contact' | 'contacts' | 'interaction' | 'interactions' | 'invoice' | 'invoices' | 'lead' | 'leads' | 'opportunities' | 'opportunity' | 'product' | 'products'> & { attachment: ResolversParentTypes['Attachments'], attachments: Array<ResolversParentTypes['Attachments']>, case: ResolversParentTypes['Cases'], cases: Array<ResolversParentTypes['Cases']>, companies: Array<ResolversParentTypes['Companies']>, company: ResolversParentTypes['Companies'], contact: ResolversParentTypes['Contacts'], contacts: Array<ResolversParentTypes['Contacts']>, interaction: ResolversParentTypes['Interactions'], interactions: Array<ResolversParentTypes['Interactions']>, invoice: ResolversParentTypes['Invoices'], invoices: Array<ResolversParentTypes['Invoices']>, lead: ResolversParentTypes['Leads'], leads: Array<ResolversParentTypes['Leads']>, opportunities: Array<ResolversParentTypes['Opportunities']>, opportunity: ResolversParentTypes['Opportunities'], product: ResolversParentTypes['Products'], products: Array<ResolversParentTypes['Products']> };
  CustomerTrackingLinks: Omit<CustomerTrackingLinks, 'deliveryTask'> & { deliveryTask: ResolversParentTypes['DeliveryTasks'] };
  Date: Scalars['Date']['output'];
  DeleteResult: DeleteResult;
  DeliveryRoutes: Omit<DeliveryRoutes, 'driver' | 'tasks'> & { driver: ResolversParentTypes['Drivers'], tasks?: Maybe<Array<ResolversParentTypes['DeliveryTasks']>> };
  DeliveryTasks: Omit<DeliveryTasks, 'customerTrackingLinks' | 'deliveryRoute' | 'events' | 'package' | 'proofOfDeliveries'> & { customerTrackingLinks?: Maybe<Array<ResolversParentTypes['CustomerTrackingLinks']>>, deliveryRoute: ResolversParentTypes['DeliveryRoutes'], events?: Maybe<Array<ResolversParentTypes['TaskEvents']>>, package: ResolversParentTypes['Packages'], proofOfDeliveries?: Maybe<Array<ResolversParentTypes['DmsProofOfDeliveries']>> };
  Disputes: Omit<Disputes, 'client' | 'creditNotes' | 'lineItem'> & { client: ResolversParentTypes['Companies'], creditNotes?: Maybe<Array<ResolversParentTypes['CreditNotes']>>, lineItem: ResolversParentTypes['InvoiceLineItems'] };
  DmsMutation: Omit<DmsMutation, 'createCustomerTrackingLink' | 'createDeliveryRoute' | 'createDeliveryTask' | 'createDmsProofOfDelivery' | 'createDriverLocation' | 'createTaskEvent' | 'updateCustomerTrackingLink' | 'updateDeliveryRoute' | 'updateDeliveryTask' | 'updateDmsProofOfDelivery' | 'updateDriverLocation' | 'updateTaskEvent'> & { createCustomerTrackingLink: ResolversParentTypes['CustomerTrackingLinks'], createDeliveryRoute: ResolversParentTypes['DeliveryRoutes'], createDeliveryTask: ResolversParentTypes['DeliveryTasks'], createDmsProofOfDelivery: ResolversParentTypes['DmsProofOfDeliveries'], createDriverLocation: ResolversParentTypes['DriverLocations'], createTaskEvent: ResolversParentTypes['TaskEvents'], updateCustomerTrackingLink: ResolversParentTypes['CustomerTrackingLinks'], updateDeliveryRoute: ResolversParentTypes['DeliveryRoutes'], updateDeliveryTask: ResolversParentTypes['DeliveryTasks'], updateDmsProofOfDelivery: ResolversParentTypes['DmsProofOfDeliveries'], updateDriverLocation: ResolversParentTypes['DriverLocations'], updateTaskEvent: ResolversParentTypes['TaskEvents'] };
  DmsProofOfDeliveries: Omit<DmsProofOfDeliveries, 'deliveryTask'> & { deliveryTask: ResolversParentTypes['DeliveryTasks'] };
  DmsQuery: Omit<DmsQuery, 'customerTrackingLink' | 'customerTrackingLinks' | 'deliveryRoute' | 'deliveryRoutes' | 'deliveryTask' | 'deliveryTasks' | 'dmsProofOfDeliveries' | 'dmsProofOfDelivery' | 'driverLocation' | 'driverLocations' | 'taskEvent' | 'taskEvents'> & { customerTrackingLink: ResolversParentTypes['CustomerTrackingLinks'], customerTrackingLinks: Array<ResolversParentTypes['CustomerTrackingLinks']>, deliveryRoute: ResolversParentTypes['DeliveryRoutes'], deliveryRoutes: Array<ResolversParentTypes['DeliveryRoutes']>, deliveryTask: ResolversParentTypes['DeliveryTasks'], deliveryTasks: Array<ResolversParentTypes['DeliveryTasks']>, dmsProofOfDeliveries: Array<ResolversParentTypes['DmsProofOfDeliveries']>, dmsProofOfDelivery: ResolversParentTypes['DmsProofOfDeliveries'], driverLocation: ResolversParentTypes['DriverLocations'], driverLocations: Array<ResolversParentTypes['DriverLocations']>, taskEvent: ResolversParentTypes['TaskEvents'], taskEvents: Array<ResolversParentTypes['TaskEvents']> };
  Documents: Documents;
  DriverLocations: Omit<DriverLocations, 'driver'> & { driver: ResolversParentTypes['Drivers'] };
  DriverSchedules: Omit<DriverSchedules, 'driver'> & { driver: ResolversParentTypes['Drivers'] };
  Drivers: Omit<Drivers, 'deliveryRoutes' | 'driverLocations' | 'expenses' | 'schedules' | 'trips'> & { deliveryRoutes?: Maybe<Array<ResolversParentTypes['DeliveryRoutes']>>, driverLocations?: Maybe<Array<ResolversParentTypes['DriverLocations']>>, expenses?: Maybe<Array<ResolversParentTypes['Expenses']>>, schedules?: Maybe<Array<ResolversParentTypes['DriverSchedules']>>, trips?: Maybe<Array<ResolversParentTypes['Trips']>> };
  Expenses: Omit<Expenses, 'driver' | 'trip'> & { driver?: Maybe<ResolversParentTypes['Drivers']>, trip?: Maybe<ResolversParentTypes['Trips']> };
  File: Scalars['File']['output'];
  GeofenceEvents: Omit<GeofenceEvents, 'geofence' | 'vehicle'> & { geofence: ResolversParentTypes['Geofences'], vehicle: ResolversParentTypes['Vehicles'] };
  Geofences: Omit<Geofences, 'events'> & { events?: Maybe<Array<ResolversParentTypes['GeofenceEvents']>> };
  GpsPings: Omit<GpsPings, 'vehicle'> & { vehicle: ResolversParentTypes['Vehicles'] };
  InboundShipmentItems: Omit<InboundShipmentItems, 'inboundShipment' | 'product'> & { inboundShipment: ResolversParentTypes['InboundShipments'], product: ResolversParentTypes['WmsProducts'] };
  InboundShipments: Omit<InboundShipments, 'client' | 'items'> & { client?: Maybe<ResolversParentTypes['Companies']>, items?: Maybe<Array<ResolversParentTypes['InboundShipmentItems']>> };
  Interactions: Omit<Interactions, 'case' | 'contact'> & { case?: Maybe<ResolversParentTypes['Cases']>, contact: ResolversParentTypes['Contacts'] };
  InventoryAdjustments: Omit<InventoryAdjustments, 'product'> & { product: ResolversParentTypes['WmsProducts'] };
  InventoryBatches: Omit<InventoryBatches, 'inventoryStock' | 'outboundShipmentItems' | 'packageItems' | 'product' | 'taskItems'> & { inventoryStock?: Maybe<Array<ResolversParentTypes['InventoryStock']>>, outboundShipmentItems?: Maybe<Array<ResolversParentTypes['OutboundShipmentItems']>>, packageItems?: Maybe<Array<ResolversParentTypes['PackageItems']>>, product: ResolversParentTypes['WmsProducts'], taskItems?: Maybe<Array<ResolversParentTypes['TaskItems']>> };
  InventoryStock: Omit<InventoryStock, 'batch' | 'location' | 'product'> & { batch?: Maybe<ResolversParentTypes['InventoryBatches']>, location: ResolversParentTypes['Locations'], product: ResolversParentTypes['WmsProducts'] };
  InvoiceItems: Omit<InvoiceItems, 'invoice' | 'product'> & { invoice: ResolversParentTypes['Invoices'], product: ResolversParentTypes['Products'] };
  InvoiceLineItems: Omit<InvoiceLineItems, 'disputes' | 'invoice'> & { disputes?: Maybe<Array<ResolversParentTypes['Disputes']>>, invoice: ResolversParentTypes['BillingInvoices'] };
  Invoices: Omit<Invoices, 'items' | 'opportunity'> & { items?: Maybe<Array<ResolversParentTypes['InvoiceItems']>>, opportunity?: Maybe<ResolversParentTypes['Opportunities']> };
  Leads: Omit<Leads, 'convertedCompany' | 'convertedContact' | 'convertedOpportunity'> & { convertedCompany?: Maybe<ResolversParentTypes['Companies']>, convertedContact?: Maybe<ResolversParentTypes['Contacts']>, convertedOpportunity?: Maybe<ResolversParentTypes['Opportunities']> };
  Locations: Omit<Locations, 'binThresholds' | 'destinationTaskItems' | 'inventoryStock' | 'parentLocation' | 'putawayRules' | 'sourceTaskItems' | 'warehouse'> & { binThresholds?: Maybe<Array<ResolversParentTypes['BinThresholds']>>, destinationTaskItems?: Maybe<Array<ResolversParentTypes['TaskItems']>>, inventoryStock?: Maybe<Array<ResolversParentTypes['InventoryStock']>>, parentLocation?: Maybe<ResolversParentTypes['Locations']>, putawayRules?: Maybe<Array<ResolversParentTypes['PutawayRules']>>, sourceTaskItems?: Maybe<Array<ResolversParentTypes['TaskItems']>>, warehouse: ResolversParentTypes['Warehouses'] };
  Mutation: Record<PropertyKey, never>;
  Notifications: Notifications;
  Opportunities: Omit<Opportunities, 'company' | 'contact' | 'products' | 'salesOrders'> & { company?: Maybe<ResolversParentTypes['Companies']>, contact?: Maybe<ResolversParentTypes['Contacts']>, products?: Maybe<Array<ResolversParentTypes['OpportunityProducts']>>, salesOrders?: Maybe<Array<ResolversParentTypes['SalesOrders']>> };
  OpportunityProducts: Omit<OpportunityProducts, 'opportunity' | 'product'> & { opportunity: ResolversParentTypes['Opportunities'], product: ResolversParentTypes['Products'] };
  OutboundShipmentItems: Omit<OutboundShipmentItems, 'batch' | 'outboundShipment' | 'product' | 'salesOrderItem'> & { batch?: Maybe<ResolversParentTypes['InventoryBatches']>, outboundShipment: ResolversParentTypes['OutboundShipments'], product: ResolversParentTypes['WmsProducts'], salesOrderItem: ResolversParentTypes['SalesOrderItems'] };
  OutboundShipments: Omit<OutboundShipments, 'items' | 'salesOrder'> & { items?: Maybe<Array<ResolversParentTypes['OutboundShipmentItems']>>, salesOrder: ResolversParentTypes['SalesOrders'] };
  PackageItems: Omit<PackageItems, 'batch' | 'package' | 'product'> & { batch?: Maybe<ResolversParentTypes['InventoryBatches']>, package: ResolversParentTypes['Packages'], product: ResolversParentTypes['WmsProducts'] };
  Packages: Omit<Packages, 'deliveryTasks' | 'items' | 'salesOrder' | 'warehouse'> & { deliveryTasks?: Maybe<Array<ResolversParentTypes['DeliveryTasks']>>, items?: Maybe<Array<ResolversParentTypes['PackageItems']>>, salesOrder: ResolversParentTypes['SalesOrders'], warehouse: ResolversParentTypes['Warehouses'] };
  PartnerInvoiceItems: Omit<PartnerInvoiceItems, 'partnerInvoice' | 'shipmentLeg'> & { partnerInvoice: ResolversParentTypes['PartnerInvoices'], shipmentLeg: ResolversParentTypes['ShipmentLegs'] };
  PartnerInvoices: Omit<PartnerInvoices, 'carrier' | 'items'> & { carrier: ResolversParentTypes['Carriers'], items?: Maybe<Array<ResolversParentTypes['PartnerInvoiceItems']>> };
  Payments: Omit<Payments, 'invoice'> & { invoice: ResolversParentTypes['BillingInvoices'] };
  PickBatchItems: Omit<PickBatchItems, 'pickBatch' | 'salesOrder'> & { pickBatch: ResolversParentTypes['PickBatches'], salesOrder: ResolversParentTypes['SalesOrders'] };
  PickBatches: Omit<PickBatches, 'items' | 'tasks' | 'warehouse'> & { items?: Maybe<Array<ResolversParentTypes['PickBatchItems']>>, tasks?: Maybe<Array<ResolversParentTypes['Tasks']>>, warehouse: ResolversParentTypes['Warehouses'] };
  Products: Products;
  ProofOfDeliveries: Omit<ProofOfDeliveries, 'tripStop'> & { tripStop: ResolversParentTypes['TripStops'] };
  PutawayRules: Omit<PutawayRules, 'client' | 'preferredLocation' | 'product' | 'warehouse'> & { client?: Maybe<ResolversParentTypes['Companies']>, preferredLocation?: Maybe<ResolversParentTypes['Locations']>, product: ResolversParentTypes['WmsProducts'], warehouse: ResolversParentTypes['Warehouses'] };
  Query: Record<PropertyKey, never>;
  Quotes: Omit<Quotes, 'billingInvoices' | 'client'> & { billingInvoices?: Maybe<Array<ResolversParentTypes['BillingInvoices']>>, client?: Maybe<ResolversParentTypes['Companies']> };
  RateCards: Omit<RateCards, 'rules'> & { rules?: Maybe<Array<ResolversParentTypes['RateRules']>> };
  RateRules: Omit<RateRules, 'rateCard'> & { rateCard: ResolversParentTypes['RateCards'] };
  ReorderPoints: Omit<ReorderPoints, 'product' | 'warehouse'> & { product: ResolversParentTypes['WmsProducts'], warehouse: ResolversParentTypes['Warehouses'] };
  ReturnItems: Omit<ReturnItems, 'product' | 'return'> & { product: ResolversParentTypes['WmsProducts'], return: ResolversParentTypes['Returns'] };
  Returns: Omit<Returns, 'client' | 'items' | 'salesOrder'> & { client: ResolversParentTypes['Companies'], items?: Maybe<Array<ResolversParentTypes['ReturnItems']>>, salesOrder?: Maybe<ResolversParentTypes['SalesOrders']> };
  Routes: Omit<Routes, 'trip'> & { trip: ResolversParentTypes['Trips'] };
  SalesOrderItems: Omit<SalesOrderItems, 'outboundShipmentItems' | 'product' | 'salesOrder'> & { outboundShipmentItems?: Maybe<Array<ResolversParentTypes['OutboundShipmentItems']>>, product: ResolversParentTypes['WmsProducts'], salesOrder: ResolversParentTypes['SalesOrders'] };
  SalesOrders: Omit<SalesOrders, 'client' | 'crmOpportunity' | 'items' | 'outboundShipments' | 'packages' | 'pickBatchItems' | 'returns'> & { client: ResolversParentTypes['Companies'], crmOpportunity?: Maybe<ResolversParentTypes['Opportunities']>, items?: Maybe<Array<ResolversParentTypes['SalesOrderItems']>>, outboundShipments?: Maybe<Array<ResolversParentTypes['OutboundShipments']>>, packages?: Maybe<Array<ResolversParentTypes['Packages']>>, pickBatchItems?: Maybe<Array<ResolversParentTypes['PickBatchItems']>>, returns?: Maybe<Array<ResolversParentTypes['Returns']>> };
  ShipmentLegEvents: Omit<ShipmentLegEvents, 'shipmentLeg'> & { shipmentLeg: ResolversParentTypes['ShipmentLegs'] };
  ShipmentLegs: Omit<ShipmentLegs, 'carrier' | 'events' | 'internalTrip' | 'partnerInvoiceItems' | 'shipment'> & { carrier?: Maybe<ResolversParentTypes['Carriers']>, events?: Maybe<Array<ResolversParentTypes['ShipmentLegEvents']>>, internalTrip?: Maybe<ResolversParentTypes['Trips']>, partnerInvoiceItems?: Maybe<Array<ResolversParentTypes['PartnerInvoiceItems']>>, shipment?: Maybe<ResolversParentTypes['OutboundShipments']> };
  StockTransfers: Omit<StockTransfers, 'destinationWarehouse' | 'product' | 'sourceWarehouse'> & { destinationWarehouse: ResolversParentTypes['Warehouses'], product: ResolversParentTypes['WmsProducts'], sourceWarehouse: ResolversParentTypes['Warehouses'] };
  Suppliers: Omit<Suppliers, 'products'> & { products?: Maybe<Array<ResolversParentTypes['WmsProducts']>> };
  Surcharges: Surcharges;
  TaskEvents: Omit<TaskEvents, 'deliveryTask'> & { deliveryTask: ResolversParentTypes['DeliveryTasks'] };
  TaskItems: Omit<TaskItems, 'batch' | 'destinationLocation' | 'product' | 'sourceLocation' | 'task'> & { batch?: Maybe<ResolversParentTypes['InventoryBatches']>, destinationLocation?: Maybe<ResolversParentTypes['Locations']>, product: ResolversParentTypes['WmsProducts'], sourceLocation?: Maybe<ResolversParentTypes['Locations']>, task: ResolversParentTypes['Tasks'] };
  Tasks: Omit<Tasks, 'items' | 'pickBatch' | 'warehouse'> & { items?: Maybe<Array<ResolversParentTypes['TaskItems']>>, pickBatch?: Maybe<ResolversParentTypes['PickBatches']>, warehouse: ResolversParentTypes['Warehouses'] };
  TmsMutation: Omit<TmsMutation, 'createCarrier' | 'createCarrierRate' | 'createDriver' | 'createDriverSchedule' | 'createExpense' | 'createGeofence' | 'createGeofenceEvent' | 'createGpsPing' | 'createPartnerInvoice' | 'createPartnerInvoiceItem' | 'createProofOfDelivery' | 'createRoute' | 'createShipmentLeg' | 'createShipmentLegEvent' | 'createTrip' | 'createTripStop' | 'createVehicle' | 'createVehicleMaintenance' | 'updateCarrier' | 'updateCarrierRate' | 'updateDriver' | 'updateDriverSchedule' | 'updateExpense' | 'updateGeofence' | 'updateGeofenceEvent' | 'updateGpsPing' | 'updatePartnerInvoice' | 'updatePartnerInvoiceItem' | 'updateProofOfDelivery' | 'updateRoute' | 'updateShipmentLeg' | 'updateShipmentLegEvent' | 'updateTrip' | 'updateTripStop' | 'updateVehicle' | 'updateVehicleMaintenance'> & { createCarrier: ResolversParentTypes['Carriers'], createCarrierRate: ResolversParentTypes['CarrierRates'], createDriver: ResolversParentTypes['Drivers'], createDriverSchedule: ResolversParentTypes['DriverSchedules'], createExpense: ResolversParentTypes['Expenses'], createGeofence: ResolversParentTypes['Geofences'], createGeofenceEvent: ResolversParentTypes['GeofenceEvents'], createGpsPing: ResolversParentTypes['GpsPings'], createPartnerInvoice: ResolversParentTypes['PartnerInvoices'], createPartnerInvoiceItem: ResolversParentTypes['PartnerInvoiceItems'], createProofOfDelivery: ResolversParentTypes['ProofOfDeliveries'], createRoute: ResolversParentTypes['Routes'], createShipmentLeg: ResolversParentTypes['ShipmentLegs'], createShipmentLegEvent: ResolversParentTypes['ShipmentLegEvents'], createTrip: ResolversParentTypes['Trips'], createTripStop: ResolversParentTypes['TripStops'], createVehicle: ResolversParentTypes['Vehicles'], createVehicleMaintenance: ResolversParentTypes['VehicleMaintenance'], updateCarrier: ResolversParentTypes['Carriers'], updateCarrierRate: ResolversParentTypes['CarrierRates'], updateDriver: ResolversParentTypes['Drivers'], updateDriverSchedule: ResolversParentTypes['DriverSchedules'], updateExpense: ResolversParentTypes['Expenses'], updateGeofence: ResolversParentTypes['Geofences'], updateGeofenceEvent: ResolversParentTypes['GeofenceEvents'], updateGpsPing: ResolversParentTypes['GpsPings'], updatePartnerInvoice: ResolversParentTypes['PartnerInvoices'], updatePartnerInvoiceItem: ResolversParentTypes['PartnerInvoiceItems'], updateProofOfDelivery: ResolversParentTypes['ProofOfDeliveries'], updateRoute: ResolversParentTypes['Routes'], updateShipmentLeg: ResolversParentTypes['ShipmentLegs'], updateShipmentLegEvent: ResolversParentTypes['ShipmentLegEvents'], updateTrip: ResolversParentTypes['Trips'], updateTripStop: ResolversParentTypes['TripStops'], updateVehicle: ResolversParentTypes['Vehicles'], updateVehicleMaintenance: ResolversParentTypes['VehicleMaintenance'] };
  TmsQuery: Omit<TmsQuery, 'carrier' | 'carriers' | 'driver' | 'drivers' | 'expense' | 'expenses' | 'geofence' | 'geofences' | 'gpsPing' | 'gpsPings' | 'partnerInvoice' | 'partnerInvoices' | 'proofOfDeliveries' | 'proofOfDelivery' | 'route' | 'routes' | 'shipmentLeg' | 'shipmentLegs' | 'trip' | 'trips' | 'vehicle' | 'vehicles'> & { carrier: ResolversParentTypes['Carriers'], carriers: Array<ResolversParentTypes['Carriers']>, driver: ResolversParentTypes['Drivers'], drivers: Array<ResolversParentTypes['Drivers']>, expense: ResolversParentTypes['Expenses'], expenses: Array<ResolversParentTypes['Expenses']>, geofence: ResolversParentTypes['Geofences'], geofences: Array<ResolversParentTypes['Geofences']>, gpsPing: ResolversParentTypes['GpsPings'], gpsPings: Array<ResolversParentTypes['GpsPings']>, partnerInvoice: ResolversParentTypes['PartnerInvoices'], partnerInvoices: Array<ResolversParentTypes['PartnerInvoices']>, proofOfDeliveries: Array<ResolversParentTypes['ProofOfDeliveries']>, proofOfDelivery: ResolversParentTypes['ProofOfDeliveries'], route: ResolversParentTypes['Routes'], routes: Array<ResolversParentTypes['Routes']>, shipmentLeg: ResolversParentTypes['ShipmentLegs'], shipmentLegs: Array<ResolversParentTypes['ShipmentLegs']>, trip: ResolversParentTypes['Trips'], trips: Array<ResolversParentTypes['Trips']>, vehicle: ResolversParentTypes['Vehicles'], vehicles: Array<ResolversParentTypes['Vehicles']> };
  TripStops: Omit<TripStops, 'proofOfDeliveries' | 'shipment' | 'trip'> & { proofOfDeliveries?: Maybe<Array<ResolversParentTypes['ProofOfDeliveries']>>, shipment?: Maybe<ResolversParentTypes['OutboundShipments']>, trip: ResolversParentTypes['Trips'] };
  Trips: Omit<Trips, 'driver' | 'expenses' | 'routes' | 'shipmentLegs' | 'stops' | 'vehicle'> & { driver?: Maybe<ResolversParentTypes['Drivers']>, expenses?: Maybe<Array<ResolversParentTypes['Expenses']>>, routes?: Maybe<Array<ResolversParentTypes['Routes']>>, shipmentLegs?: Maybe<Array<ResolversParentTypes['ShipmentLegs']>>, stops?: Maybe<Array<ResolversParentTypes['TripStops']>>, vehicle?: Maybe<ResolversParentTypes['Vehicles']> };
  UpdateAccountTransactionInput: UpdateAccountTransactionInput;
  UpdateAccountingSyncLogInput: UpdateAccountingSyncLogInput;
  UpdateBillingInvoiceInput: UpdateBillingInvoiceInput;
  UpdateBinThresholdInput: UpdateBinThresholdInput;
  UpdateCampaignInput: UpdateCampaignInput;
  UpdateCarrierInput: UpdateCarrierInput;
  UpdateCarrierRateInput: UpdateCarrierRateInput;
  UpdateCaseInput: UpdateCaseInput;
  UpdateClientAccountInput: UpdateClientAccountInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateContactInput: UpdateContactInput;
  UpdateCreditNoteInput: UpdateCreditNoteInput;
  UpdateCustomerTrackingLinkInput: UpdateCustomerTrackingLinkInput;
  UpdateDeliveryRouteInput: UpdateDeliveryRouteInput;
  UpdateDeliveryTaskInput: UpdateDeliveryTaskInput;
  UpdateDisputeInput: UpdateDisputeInput;
  UpdateDmsProofOfDeliveryInput: UpdateDmsProofOfDeliveryInput;
  UpdateDocumentInput: UpdateDocumentInput;
  UpdateDriverInput: UpdateDriverInput;
  UpdateDriverLocationInput: UpdateDriverLocationInput;
  UpdateDriverScheduleInput: UpdateDriverScheduleInput;
  UpdateExpenseInput: UpdateExpenseInput;
  UpdateGeofenceEventInput: UpdateGeofenceEventInput;
  UpdateGeofenceInput: UpdateGeofenceInput;
  UpdateGpsPingInput: UpdateGpsPingInput;
  UpdateInboundShipmentInput: UpdateInboundShipmentInput;
  UpdateInboundShipmentItemInput: UpdateInboundShipmentItemInput;
  UpdateInteractionInput: UpdateInteractionInput;
  UpdateInventoryAdjustmentInput: UpdateInventoryAdjustmentInput;
  UpdateInventoryBatchInput: UpdateInventoryBatchInput;
  UpdateInventoryStockInput: UpdateInventoryStockInput;
  UpdateInvoiceInput: UpdateInvoiceInput;
  UpdateInvoiceItemInput: UpdateInvoiceItemInput;
  UpdateInvoiceLineItemInput: UpdateInvoiceLineItemInput;
  UpdateLeadInput: UpdateLeadInput;
  UpdateLocationInput: UpdateLocationInput;
  UpdateNotificationInput: UpdateNotificationInput;
  UpdateOpportunityInput: UpdateOpportunityInput;
  UpdateOpportunityProductInput: UpdateOpportunityProductInput;
  UpdateOutboundShipmentInput: UpdateOutboundShipmentInput;
  UpdateOutboundShipmentItemInput: UpdateOutboundShipmentItemInput;
  UpdatePackageInput: UpdatePackageInput;
  UpdatePackageItemInput: UpdatePackageItemInput;
  UpdatePartnerInvoiceInput: UpdatePartnerInvoiceInput;
  UpdatePartnerInvoiceItemInput: UpdatePartnerInvoiceItemInput;
  UpdatePaymentInput: UpdatePaymentInput;
  UpdatePickBatchInput: UpdatePickBatchInput;
  UpdatePickBatchItemInput: UpdatePickBatchItemInput;
  UpdateProductInput: UpdateProductInput;
  UpdateProofOfDeliveryInput: UpdateProofOfDeliveryInput;
  UpdatePutawayRuleInput: UpdatePutawayRuleInput;
  UpdateQuoteInput: UpdateQuoteInput;
  UpdateRateCardInput: UpdateRateCardInput;
  UpdateRateRuleInput: UpdateRateRuleInput;
  UpdateReorderPointInput: UpdateReorderPointInput;
  UpdateReturnInput: UpdateReturnInput;
  UpdateReturnItemInput: UpdateReturnItemInput;
  UpdateRouteInput: UpdateRouteInput;
  UpdateSalesOrderInput: UpdateSalesOrderInput;
  UpdateSalesOrderItemInput: UpdateSalesOrderItemInput;
  UpdateShipmentLegEventInput: UpdateShipmentLegEventInput;
  UpdateShipmentLegInput: UpdateShipmentLegInput;
  UpdateStockTransferInput: UpdateStockTransferInput;
  UpdateSupplierInput: UpdateSupplierInput;
  UpdateSurchargeInput: UpdateSurchargeInput;
  UpdateTaskEventInput: UpdateTaskEventInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskItemInput: UpdateTaskItemInput;
  UpdateTripInput: UpdateTripInput;
  UpdateTripStopInput: UpdateTripStopInput;
  UpdateVehicleInput: UpdateVehicleInput;
  UpdateVehicleMaintenanceInput: UpdateVehicleMaintenanceInput;
  UpdateWarehouseInput: UpdateWarehouseInput;
  UpdateWmsProductInput: UpdateWmsProductInput;
  User: User;
  VehicleMaintenance: Omit<VehicleMaintenance, 'vehicle'> & { vehicle: ResolversParentTypes['Vehicles'] };
  Vehicles: Omit<Vehicles, 'geofenceEvents' | 'gpsPings' | 'maintenances' | 'trips'> & { geofenceEvents?: Maybe<Array<ResolversParentTypes['GeofenceEvents']>>, gpsPings?: Maybe<Array<ResolversParentTypes['GpsPings']>>, maintenances?: Maybe<Array<ResolversParentTypes['VehicleMaintenance']>>, trips?: Maybe<Array<ResolversParentTypes['Trips']>> };
  Warehouses: Omit<Warehouses, 'destinationStockTransfers' | 'inboundShipments' | 'locations' | 'outboundShipments' | 'packages' | 'pickBatches' | 'putawayRules' | 'sourceStockTransfers' | 'tasks'> & { destinationStockTransfers?: Maybe<Array<ResolversParentTypes['StockTransfers']>>, inboundShipments?: Maybe<Array<ResolversParentTypes['InboundShipments']>>, locations?: Maybe<Array<ResolversParentTypes['Locations']>>, outboundShipments?: Maybe<Array<ResolversParentTypes['OutboundShipments']>>, packages?: Maybe<Array<ResolversParentTypes['Packages']>>, pickBatches?: Maybe<Array<ResolversParentTypes['PickBatches']>>, putawayRules?: Maybe<Array<ResolversParentTypes['PutawayRules']>>, sourceStockTransfers?: Maybe<Array<ResolversParentTypes['StockTransfers']>>, tasks?: Maybe<Array<ResolversParentTypes['Tasks']>> };
  WmsMutation: Omit<WmsMutation, 'createBinThreshold' | 'createInboundShipment' | 'createInboundShipmentItem' | 'createInventoryAdjustment' | 'createInventoryBatch' | 'createInventoryStock' | 'createLocation' | 'createOutboundShipment' | 'createOutboundShipmentItem' | 'createPackage' | 'createPackageItem' | 'createPickBatch' | 'createPickBatchItem' | 'createPutawayRule' | 'createReorderPoint' | 'createReturn' | 'createReturnItem' | 'createSalesOrder' | 'createSalesOrderItem' | 'createStockTransfer' | 'createSupplier' | 'createTask' | 'createTaskItem' | 'createWarehouse' | 'createWmsProduct' | 'updateBinThreshold' | 'updateInboundShipment' | 'updateInboundShipmentItem' | 'updateInventoryAdjustment' | 'updateInventoryBatch' | 'updateInventoryStock' | 'updateLocation' | 'updateOutboundShipment' | 'updateOutboundShipmentItem' | 'updatePackage' | 'updatePackageItem' | 'updatePickBatch' | 'updatePickBatchItem' | 'updatePutawayRule' | 'updateReorderPoint' | 'updateReturn' | 'updateReturnItem' | 'updateSalesOrder' | 'updateSalesOrderItem' | 'updateStockTransfer' | 'updateSupplier' | 'updateTask' | 'updateTaskItem' | 'updateWarehouse' | 'updateWmsProduct'> & { createBinThreshold: ResolversParentTypes['BinThresholds'], createInboundShipment: ResolversParentTypes['InboundShipments'], createInboundShipmentItem: ResolversParentTypes['InboundShipmentItems'], createInventoryAdjustment: ResolversParentTypes['InventoryAdjustments'], createInventoryBatch: ResolversParentTypes['InventoryBatches'], createInventoryStock: ResolversParentTypes['InventoryStock'], createLocation: ResolversParentTypes['Locations'], createOutboundShipment: ResolversParentTypes['OutboundShipments'], createOutboundShipmentItem: ResolversParentTypes['OutboundShipmentItems'], createPackage: ResolversParentTypes['Packages'], createPackageItem: ResolversParentTypes['PackageItems'], createPickBatch: ResolversParentTypes['PickBatches'], createPickBatchItem: ResolversParentTypes['PickBatchItems'], createPutawayRule: ResolversParentTypes['PutawayRules'], createReorderPoint: ResolversParentTypes['ReorderPoints'], createReturn: ResolversParentTypes['Returns'], createReturnItem: ResolversParentTypes['ReturnItems'], createSalesOrder: ResolversParentTypes['SalesOrders'], createSalesOrderItem: ResolversParentTypes['SalesOrderItems'], createStockTransfer: ResolversParentTypes['StockTransfers'], createSupplier: ResolversParentTypes['Suppliers'], createTask: ResolversParentTypes['Tasks'], createTaskItem: ResolversParentTypes['TaskItems'], createWarehouse: ResolversParentTypes['Warehouses'], createWmsProduct: ResolversParentTypes['WmsProducts'], updateBinThreshold: ResolversParentTypes['BinThresholds'], updateInboundShipment: ResolversParentTypes['InboundShipments'], updateInboundShipmentItem: ResolversParentTypes['InboundShipmentItems'], updateInventoryAdjustment: ResolversParentTypes['InventoryAdjustments'], updateInventoryBatch: ResolversParentTypes['InventoryBatches'], updateInventoryStock: ResolversParentTypes['InventoryStock'], updateLocation: ResolversParentTypes['Locations'], updateOutboundShipment: ResolversParentTypes['OutboundShipments'], updateOutboundShipmentItem: ResolversParentTypes['OutboundShipmentItems'], updatePackage: ResolversParentTypes['Packages'], updatePackageItem: ResolversParentTypes['PackageItems'], updatePickBatch: ResolversParentTypes['PickBatches'], updatePickBatchItem: ResolversParentTypes['PickBatchItems'], updatePutawayRule: ResolversParentTypes['PutawayRules'], updateReorderPoint: ResolversParentTypes['ReorderPoints'], updateReturn: ResolversParentTypes['Returns'], updateReturnItem: ResolversParentTypes['ReturnItems'], updateSalesOrder: ResolversParentTypes['SalesOrders'], updateSalesOrderItem: ResolversParentTypes['SalesOrderItems'], updateStockTransfer: ResolversParentTypes['StockTransfers'], updateSupplier: ResolversParentTypes['Suppliers'], updateTask: ResolversParentTypes['Tasks'], updateTaskItem: ResolversParentTypes['TaskItems'], updateWarehouse: ResolversParentTypes['Warehouses'], updateWmsProduct: ResolversParentTypes['WmsProducts'] };
  WmsProducts: Omit<WmsProducts, 'adjustments' | 'batches' | 'binThresholds' | 'client' | 'inboundShipmentItems' | 'inventoryStock' | 'outboundShipmentItems' | 'packageItems' | 'putawayRules' | 'reorderPoints' | 'returnItems' | 'salesOrderItems' | 'stockTransfers' | 'supplier' | 'taskItems'> & { adjustments?: Maybe<Array<ResolversParentTypes['InventoryAdjustments']>>, batches?: Maybe<Array<ResolversParentTypes['InventoryBatches']>>, binThresholds?: Maybe<Array<ResolversParentTypes['BinThresholds']>>, client?: Maybe<ResolversParentTypes['Companies']>, inboundShipmentItems?: Maybe<Array<ResolversParentTypes['InboundShipmentItems']>>, inventoryStock?: Maybe<Array<ResolversParentTypes['InventoryStock']>>, outboundShipmentItems?: Maybe<Array<ResolversParentTypes['OutboundShipmentItems']>>, packageItems?: Maybe<Array<ResolversParentTypes['PackageItems']>>, putawayRules?: Maybe<Array<ResolversParentTypes['PutawayRules']>>, reorderPoints?: Maybe<Array<ResolversParentTypes['ReorderPoints']>>, returnItems?: Maybe<Array<ResolversParentTypes['ReturnItems']>>, salesOrderItems?: Maybe<Array<ResolversParentTypes['SalesOrderItems']>>, stockTransfers?: Maybe<Array<ResolversParentTypes['StockTransfers']>>, supplier?: Maybe<ResolversParentTypes['Suppliers']>, taskItems?: Maybe<Array<ResolversParentTypes['TaskItems']>> };
  WmsQuery: Omit<WmsQuery, 'binThreshold' | 'binThresholds' | 'inboundShipment' | 'inboundShipments' | 'inventoryAdjustment' | 'inventoryAdjustments' | 'inventoryBatch' | 'inventoryBatches' | 'inventoryStock' | 'inventoryStocks' | 'location' | 'locations' | 'outboundShipment' | 'outboundShipments' | 'package' | 'packages' | 'pickBatch' | 'pickBatches' | 'putawayRule' | 'putawayRules' | 'reorderPoint' | 'reorderPoints' | 'return' | 'returns' | 'salesOrder' | 'salesOrders' | 'stockTransfer' | 'stockTransfers' | 'supplier' | 'suppliers' | 'task' | 'tasks' | 'warehouse' | 'warehouses' | 'wmsProduct' | 'wmsProducts'> & { binThreshold: ResolversParentTypes['BinThresholds'], binThresholds: Array<ResolversParentTypes['BinThresholds']>, inboundShipment: ResolversParentTypes['InboundShipments'], inboundShipments: Array<ResolversParentTypes['InboundShipments']>, inventoryAdjustment: ResolversParentTypes['InventoryAdjustments'], inventoryAdjustments: Array<ResolversParentTypes['InventoryAdjustments']>, inventoryBatch: ResolversParentTypes['InventoryBatches'], inventoryBatches: Array<ResolversParentTypes['InventoryBatches']>, inventoryStock: ResolversParentTypes['InventoryStock'], inventoryStocks: Array<ResolversParentTypes['InventoryStock']>, location: ResolversParentTypes['Locations'], locations: Array<ResolversParentTypes['Locations']>, outboundShipment: ResolversParentTypes['OutboundShipments'], outboundShipments: Array<ResolversParentTypes['OutboundShipments']>, package: ResolversParentTypes['Packages'], packages: Array<ResolversParentTypes['Packages']>, pickBatch: ResolversParentTypes['PickBatches'], pickBatches: Array<ResolversParentTypes['PickBatches']>, putawayRule: ResolversParentTypes['PutawayRules'], putawayRules: Array<ResolversParentTypes['PutawayRules']>, reorderPoint: ResolversParentTypes['ReorderPoints'], reorderPoints: Array<ResolversParentTypes['ReorderPoints']>, return: ResolversParentTypes['Returns'], returns: Array<ResolversParentTypes['Returns']>, salesOrder: ResolversParentTypes['SalesOrders'], salesOrders: Array<ResolversParentTypes['SalesOrders']>, stockTransfer: ResolversParentTypes['StockTransfers'], stockTransfers: Array<ResolversParentTypes['StockTransfers']>, supplier: ResolversParentTypes['Suppliers'], suppliers: Array<ResolversParentTypes['Suppliers']>, task: ResolversParentTypes['Tasks'], tasks: Array<ResolversParentTypes['Tasks']>, warehouse: ResolversParentTypes['Warehouses'], warehouses: Array<ResolversParentTypes['Warehouses']>, wmsProduct: ResolversParentTypes['WmsProducts'], wmsProducts: Array<ResolversParentTypes['WmsProducts']> };
};

export type AccountTransactionsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AccountTransactions'] = ResolversParentTypes['AccountTransactions']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  clientAccount?: Resolver<ResolversTypes['ClientAccounts'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  processedByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  referenceNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  runningBalance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sourceRecordId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  sourceRecordType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TransactionType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type AccountingSyncLogsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AccountingSyncLogs'] = ResolversParentTypes['AccountingSyncLogs']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  externalSystem?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastSyncAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextRetryAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recordId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  recordType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  requestPayload?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  responsePayload?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  retryCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['SyncStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type AttachmentsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Attachments'] = ResolversParentTypes['Attachments']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recordId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  recordType?: Resolver<Maybe<ResolversTypes['RecordType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type BillingInvoiceStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, DISPUTED?: any, DRAFT?: any, PAID?: any, PARTIAL_PAID?: any, PAST_DUE?: any, SENT?: any, VIEWED?: any, VOID?: any }, ResolversTypes['BillingInvoiceStatus']>;

export type BillingInvoicesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['BillingInvoices'] = ResolversParentTypes['BillingInvoices']> = {
  amountOutstanding?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountPaid?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Companies'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creditNotes?: Resolver<Maybe<Array<ResolversTypes['CreditNotes']>>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discountAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  dueDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invoiceNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issueDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lineItems?: Resolver<Maybe<Array<ResolversTypes['InvoiceLineItems']>>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentTerms?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  payments?: Resolver<Maybe<Array<ResolversTypes['Payments']>>, ParentType, ContextType>;
  quote?: Resolver<Maybe<ResolversTypes['Quotes']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['BillingInvoiceStatus']>, ParentType, ContextType>;
  subtotal?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  taxAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type BillingMutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['BillingMutation'] = ResolversParentTypes['BillingMutation']> = {
  createAccountTransaction?: Resolver<ResolversTypes['AccountTransactions'], ParentType, ContextType, RequireFields<BillingMutationCreateAccountTransactionArgs, 'value'>>;
  createAccountingSyncLog?: Resolver<ResolversTypes['AccountingSyncLogs'], ParentType, ContextType, RequireFields<BillingMutationCreateAccountingSyncLogArgs, 'value'>>;
  createBillingInvoice?: Resolver<ResolversTypes['BillingInvoices'], ParentType, ContextType, RequireFields<BillingMutationCreateBillingInvoiceArgs, 'value'>>;
  createClientAccount?: Resolver<ResolversTypes['ClientAccounts'], ParentType, ContextType, RequireFields<BillingMutationCreateClientAccountArgs, 'value'>>;
  createCreditNote?: Resolver<ResolversTypes['CreditNotes'], ParentType, ContextType, RequireFields<BillingMutationCreateCreditNoteArgs, 'value'>>;
  createDispute?: Resolver<ResolversTypes['Disputes'], ParentType, ContextType, RequireFields<BillingMutationCreateDisputeArgs, 'value'>>;
  createDocument?: Resolver<ResolversTypes['Documents'], ParentType, ContextType, RequireFields<BillingMutationCreateDocumentArgs, 'value'>>;
  createInvoiceLineItem?: Resolver<ResolversTypes['InvoiceLineItems'], ParentType, ContextType, RequireFields<BillingMutationCreateInvoiceLineItemArgs, 'value'>>;
  createPayment?: Resolver<ResolversTypes['Payments'], ParentType, ContextType, RequireFields<BillingMutationCreatePaymentArgs, 'value'>>;
  createQuote?: Resolver<ResolversTypes['Quotes'], ParentType, ContextType, RequireFields<BillingMutationCreateQuoteArgs, 'value'>>;
  createRateCard?: Resolver<ResolversTypes['RateCards'], ParentType, ContextType, RequireFields<BillingMutationCreateRateCardArgs, 'value'>>;
  createRateRule?: Resolver<ResolversTypes['RateRules'], ParentType, ContextType, RequireFields<BillingMutationCreateRateRuleArgs, 'value'>>;
  createSurcharge?: Resolver<ResolversTypes['Surcharges'], ParentType, ContextType, RequireFields<BillingMutationCreateSurchargeArgs, 'value'>>;
  removeAccountTransaction?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveAccountTransactionArgs, 'id'>>;
  removeAccountingSyncLog?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveAccountingSyncLogArgs, 'id'>>;
  removeBillingInvoice?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveBillingInvoiceArgs, 'id'>>;
  removeClientAccount?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveClientAccountArgs, 'id'>>;
  removeCreditNote?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveCreditNoteArgs, 'id'>>;
  removeDispute?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveDisputeArgs, 'id'>>;
  removeDocument?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveDocumentArgs, 'id'>>;
  removeInvoiceLineItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveInvoiceLineItemArgs, 'id'>>;
  removePayment?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemovePaymentArgs, 'id'>>;
  removeQuote?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveQuoteArgs, 'id'>>;
  removeRateCard?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveRateCardArgs, 'id'>>;
  removeRateRule?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveRateRuleArgs, 'id'>>;
  removeSurcharge?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<BillingMutationRemoveSurchargeArgs, 'id'>>;
  updateAccountTransaction?: Resolver<ResolversTypes['AccountTransactions'], ParentType, ContextType, RequireFields<BillingMutationUpdateAccountTransactionArgs, 'id'>>;
  updateAccountingSyncLog?: Resolver<ResolversTypes['AccountingSyncLogs'], ParentType, ContextType, RequireFields<BillingMutationUpdateAccountingSyncLogArgs, 'id'>>;
  updateBillingInvoice?: Resolver<ResolversTypes['BillingInvoices'], ParentType, ContextType, RequireFields<BillingMutationUpdateBillingInvoiceArgs, 'id'>>;
  updateClientAccount?: Resolver<ResolversTypes['ClientAccounts'], ParentType, ContextType, RequireFields<BillingMutationUpdateClientAccountArgs, 'id'>>;
  updateCreditNote?: Resolver<ResolversTypes['CreditNotes'], ParentType, ContextType, RequireFields<BillingMutationUpdateCreditNoteArgs, 'id'>>;
  updateDispute?: Resolver<ResolversTypes['Disputes'], ParentType, ContextType, RequireFields<BillingMutationUpdateDisputeArgs, 'id'>>;
  updateDocument?: Resolver<ResolversTypes['Documents'], ParentType, ContextType, RequireFields<BillingMutationUpdateDocumentArgs, 'id'>>;
  updateInvoiceLineItem?: Resolver<ResolversTypes['InvoiceLineItems'], ParentType, ContextType, RequireFields<BillingMutationUpdateInvoiceLineItemArgs, 'id'>>;
  updatePayment?: Resolver<ResolversTypes['Payments'], ParentType, ContextType, RequireFields<BillingMutationUpdatePaymentArgs, 'id'>>;
  updateQuote?: Resolver<ResolversTypes['Quotes'], ParentType, ContextType, RequireFields<BillingMutationUpdateQuoteArgs, 'id'>>;
  updateRateCard?: Resolver<ResolversTypes['RateCards'], ParentType, ContextType, RequireFields<BillingMutationUpdateRateCardArgs, 'id'>>;
  updateRateRule?: Resolver<ResolversTypes['RateRules'], ParentType, ContextType, RequireFields<BillingMutationUpdateRateRuleArgs, 'id'>>;
  updateSurcharge?: Resolver<ResolversTypes['Surcharges'], ParentType, ContextType, RequireFields<BillingMutationUpdateSurchargeArgs, 'id'>>;
};

export type BillingQueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['BillingQuery'] = ResolversParentTypes['BillingQuery']> = {
  accountTransaction?: Resolver<ResolversTypes['AccountTransactions'], ParentType, ContextType, RequireFields<BillingQueryAccountTransactionArgs, 'id'>>;
  accountTransactions?: Resolver<Array<ResolversTypes['AccountTransactions']>, ParentType, ContextType, Partial<BillingQueryAccountTransactionsArgs>>;
  accountingSyncLog?: Resolver<ResolversTypes['AccountingSyncLogs'], ParentType, ContextType, RequireFields<BillingQueryAccountingSyncLogArgs, 'id'>>;
  accountingSyncLogs?: Resolver<Array<ResolversTypes['AccountingSyncLogs']>, ParentType, ContextType, Partial<BillingQueryAccountingSyncLogsArgs>>;
  billingInvoice?: Resolver<ResolversTypes['BillingInvoices'], ParentType, ContextType, RequireFields<BillingQueryBillingInvoiceArgs, 'id'>>;
  billingInvoices?: Resolver<Array<ResolversTypes['BillingInvoices']>, ParentType, ContextType, Partial<BillingQueryBillingInvoicesArgs>>;
  clientAccount?: Resolver<ResolversTypes['ClientAccounts'], ParentType, ContextType, RequireFields<BillingQueryClientAccountArgs, 'id'>>;
  clientAccounts?: Resolver<Array<ResolversTypes['ClientAccounts']>, ParentType, ContextType, Partial<BillingQueryClientAccountsArgs>>;
  creditNote?: Resolver<ResolversTypes['CreditNotes'], ParentType, ContextType, RequireFields<BillingQueryCreditNoteArgs, 'id'>>;
  creditNotes?: Resolver<Array<ResolversTypes['CreditNotes']>, ParentType, ContextType, Partial<BillingQueryCreditNotesArgs>>;
  dispute?: Resolver<ResolversTypes['Disputes'], ParentType, ContextType, RequireFields<BillingQueryDisputeArgs, 'id'>>;
  disputes?: Resolver<Array<ResolversTypes['Disputes']>, ParentType, ContextType, Partial<BillingQueryDisputesArgs>>;
  document?: Resolver<ResolversTypes['Documents'], ParentType, ContextType, RequireFields<BillingQueryDocumentArgs, 'id'>>;
  documents?: Resolver<Array<ResolversTypes['Documents']>, ParentType, ContextType, Partial<BillingQueryDocumentsArgs>>;
  payment?: Resolver<ResolversTypes['Payments'], ParentType, ContextType, RequireFields<BillingQueryPaymentArgs, 'id'>>;
  payments?: Resolver<Array<ResolversTypes['Payments']>, ParentType, ContextType, Partial<BillingQueryPaymentsArgs>>;
  quote?: Resolver<ResolversTypes['Quotes'], ParentType, ContextType, RequireFields<BillingQueryQuoteArgs, 'id'>>;
  quotes?: Resolver<Array<ResolversTypes['Quotes']>, ParentType, ContextType, Partial<BillingQueryQuotesArgs>>;
  rateCard?: Resolver<ResolversTypes['RateCards'], ParentType, ContextType, RequireFields<BillingQueryRateCardArgs, 'id'>>;
  rateCards?: Resolver<Array<ResolversTypes['RateCards']>, ParentType, ContextType, Partial<BillingQueryRateCardsArgs>>;
  rateRule?: Resolver<ResolversTypes['RateRules'], ParentType, ContextType, RequireFields<BillingQueryRateRuleArgs, 'id'>>;
  rateRules?: Resolver<Array<ResolversTypes['RateRules']>, ParentType, ContextType, Partial<BillingQueryRateRulesArgs>>;
  surcharge?: Resolver<ResolversTypes['Surcharges'], ParentType, ContextType, RequireFields<BillingQuerySurchargeArgs, 'id'>>;
  surcharges?: Resolver<Array<ResolversTypes['Surcharges']>, ParentType, ContextType, Partial<BillingQuerySurchargesArgs>>;
};

export type BinThresholdsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['BinThresholds'] = ResolversParentTypes['BinThresholds']> = {
  alertThreshold?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Locations'], ParentType, ContextType>;
  maxQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  reorderQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CampaignsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Campaigns'] = ResolversParentTypes['Campaigns']> = {
  budget?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CarrierRateUnitResolvers = EnumResolverSignature<{ FLAT_RATE?: any, PER_CONTAINER?: any, PER_KG?: any, PER_KM?: any, PER_MILE?: any }, ResolversTypes['CarrierRateUnit']>;

export type CarrierRatesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CarrierRates'] = ResolversParentTypes['CarrierRates']> = {
  carrier?: Resolver<ResolversTypes['Carriers'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destination?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  serviceType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes['CarrierRateUnit']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CarriersResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Carriers'] = ResolversParentTypes['Carriers']> = {
  contactEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactPerson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  partnerInvoices?: Resolver<Maybe<Array<ResolversTypes['PartnerInvoices']>>, ParentType, ContextType>;
  rates?: Resolver<Maybe<Array<ResolversTypes['CarrierRates']>>, ParentType, ContextType>;
  servicesOffered?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shipmentLegs?: Resolver<Maybe<Array<ResolversTypes['ShipmentLegs']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CasePriorityResolvers = EnumResolverSignature<{ CRITICAL?: any, HIGH?: any, LOW?: any, MEDIUM?: any }, ResolversTypes['CasePriority']>;

export type CaseStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, CLOSED?: any, ESCALATED?: any, IN_PROGRESS?: any, NEW?: any, RESOLVED?: any, WAITING_FOR_CUSTOMER?: any, WAITING_FOR_INTERNAL?: any }, ResolversTypes['CaseStatus']>;

export type CaseTypeResolvers = EnumResolverSignature<{ BUG_REPORT?: any, COMPLAINT?: any, FEATURE_REQUEST?: any, PROBLEM?: any, QUESTION?: any, TECHNICAL_SUPPORT?: any }, ResolversTypes['CaseType']>;

export type CasesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Cases'] = ResolversParentTypes['Cases']> = {
  caseNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['Contacts']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['CasePriority']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['CaseStatus']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['CaseType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ClientAccountsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ClientAccounts'] = ResolversParentTypes['ClientAccounts']> = {
  availableCredit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Companies'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditLimit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isCreditApproved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastPaymentDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentTermsDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  transactions?: Resolver<Maybe<Array<ResolversTypes['AccountTransactions']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  walletBalance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type CompaniesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Companies'] = ResolversParentTypes['Companies']> = {
  annualRevenue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingInvoices?: Resolver<Maybe<Array<ResolversTypes['BillingInvoices']>>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientAccount?: Resolver<Maybe<ResolversTypes['ClientAccounts']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  disputes?: Resolver<Maybe<Array<ResolversTypes['Disputes']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inboundShipments?: Resolver<Maybe<Array<ResolversTypes['InboundShipments']>>, ParentType, ContextType>;
  industry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  putawayRules?: Resolver<Maybe<Array<ResolversTypes['PutawayRules']>>, ParentType, ContextType>;
  quotes?: Resolver<Maybe<Array<ResolversTypes['Quotes']>>, ParentType, ContextType>;
  returns?: Resolver<Maybe<Array<ResolversTypes['Returns']>>, ParentType, ContextType>;
  salesOrders?: Resolver<Maybe<Array<ResolversTypes['SalesOrders']>>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ContactsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Contacts'] = ResolversParentTypes['Contacts']> = {
  company?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jobTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CreditNotesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CreditNotes'] = ResolversParentTypes['CreditNotes']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  appliedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  creditNoteNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dispute?: Resolver<Maybe<ResolversTypes['Disputes']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invoice?: Resolver<ResolversTypes['BillingInvoices'], ParentType, ContextType>;
  issueDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CrmMutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CrmMutation'] = ResolversParentTypes['CrmMutation']> = {
  createAttachment?: Resolver<ResolversTypes['Attachments'], ParentType, ContextType, RequireFields<CrmMutationCreateAttachmentArgs, 'value'>>;
  createCampaign?: Resolver<ResolversTypes['Campaigns'], ParentType, ContextType, RequireFields<CrmMutationCreateCampaignArgs, 'value'>>;
  createCase?: Resolver<ResolversTypes['Cases'], ParentType, ContextType, RequireFields<CrmMutationCreateCaseArgs, 'value'>>;
  createCompany?: Resolver<ResolversTypes['Companies'], ParentType, ContextType, RequireFields<CrmMutationCreateCompanyArgs, 'value'>>;
  createContact?: Resolver<ResolversTypes['Contacts'], ParentType, ContextType, RequireFields<CrmMutationCreateContactArgs, 'value'>>;
  createInteraction?: Resolver<ResolversTypes['Interactions'], ParentType, ContextType, RequireFields<CrmMutationCreateInteractionArgs, 'value'>>;
  createInvoice?: Resolver<ResolversTypes['Invoices'], ParentType, ContextType, RequireFields<CrmMutationCreateInvoiceArgs, 'value'>>;
  createInvoiceItem?: Resolver<ResolversTypes['InvoiceItems'], ParentType, ContextType, RequireFields<CrmMutationCreateInvoiceItemArgs, 'value'>>;
  createLead?: Resolver<ResolversTypes['Leads'], ParentType, ContextType, RequireFields<CrmMutationCreateLeadArgs, 'value'>>;
  createNotification?: Resolver<ResolversTypes['Notifications'], ParentType, ContextType, RequireFields<CrmMutationCreateNotificationArgs, 'value'>>;
  createOpportunity?: Resolver<ResolversTypes['Opportunities'], ParentType, ContextType, RequireFields<CrmMutationCreateOpportunityArgs, 'value'>>;
  createOpportunityProduct?: Resolver<ResolversTypes['OpportunityProducts'], ParentType, ContextType, RequireFields<CrmMutationCreateOpportunityProductArgs, 'value'>>;
  createProduct?: Resolver<ResolversTypes['Products'], ParentType, ContextType, RequireFields<CrmMutationCreateProductArgs, 'value'>>;
  removeAttachment?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveAttachmentArgs, 'id'>>;
  removeCampaign?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveCampaignArgs, 'id'>>;
  removeCase?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveCaseArgs, 'id'>>;
  removeCompany?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveCompanyArgs, 'id'>>;
  removeContact?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveContactArgs, 'id'>>;
  removeInteraction?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveInteractionArgs, 'id'>>;
  removeInvoice?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveInvoiceArgs, 'id'>>;
  removeInvoiceItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveInvoiceItemArgs, 'id'>>;
  removeLead?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveLeadArgs, 'id'>>;
  removeNotification?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveNotificationArgs, 'id'>>;
  removeOpportunity?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveOpportunityArgs, 'id'>>;
  removeOpportunityProduct?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveOpportunityProductArgs, 'opportunityId' | 'productId'>>;
  removeProduct?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationRemoveProductArgs, 'id'>>;
  updateCampaign?: Resolver<ResolversTypes['Campaigns'], ParentType, ContextType, RequireFields<CrmMutationUpdateCampaignArgs, 'id'>>;
  updateCase?: Resolver<ResolversTypes['Cases'], ParentType, ContextType, RequireFields<CrmMutationUpdateCaseArgs, 'id'>>;
  updateCompany?: Resolver<ResolversTypes['Companies'], ParentType, ContextType, RequireFields<CrmMutationUpdateCompanyArgs, 'id'>>;
  updateContact?: Resolver<ResolversTypes['Contacts'], ParentType, ContextType, RequireFields<CrmMutationUpdateContactArgs, 'id'>>;
  updateInteraction?: Resolver<ResolversTypes['Interactions'], ParentType, ContextType, RequireFields<CrmMutationUpdateInteractionArgs, 'id'>>;
  updateInvoice?: Resolver<ResolversTypes['Invoices'], ParentType, ContextType, RequireFields<CrmMutationUpdateInvoiceArgs, 'id'>>;
  updateInvoiceItem?: Resolver<ResolversTypes['InvoiceItems'], ParentType, ContextType, RequireFields<CrmMutationUpdateInvoiceItemArgs, 'id'>>;
  updateLead?: Resolver<ResolversTypes['Leads'], ParentType, ContextType, RequireFields<CrmMutationUpdateLeadArgs, 'id'>>;
  updateNotification?: Resolver<ResolversTypes['Notifications'], ParentType, ContextType, RequireFields<CrmMutationUpdateNotificationArgs, 'id'>>;
  updateOpportunity?: Resolver<ResolversTypes['Opportunities'], ParentType, ContextType, RequireFields<CrmMutationUpdateOpportunityArgs, 'id'>>;
  updateOpportunityProduct?: Resolver<ResolversTypes['OpportunityProducts'], ParentType, ContextType, RequireFields<CrmMutationUpdateOpportunityProductArgs, 'opportunityId' | 'productId'>>;
  updateProduct?: Resolver<ResolversTypes['Products'], ParentType, ContextType, RequireFields<CrmMutationUpdateProductArgs, 'id'>>;
};

export type CrmQueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CrmQuery'] = ResolversParentTypes['CrmQuery']> = {
  attachment?: Resolver<ResolversTypes['Attachments'], ParentType, ContextType, RequireFields<CrmQueryAttachmentArgs, 'id'>>;
  attachments?: Resolver<Array<ResolversTypes['Attachments']>, ParentType, ContextType, Partial<CrmQueryAttachmentsArgs>>;
  campaign?: Resolver<ResolversTypes['Campaigns'], ParentType, ContextType, RequireFields<CrmQueryCampaignArgs, 'id'>>;
  campaigns?: Resolver<Array<ResolversTypes['Campaigns']>, ParentType, ContextType, Partial<CrmQueryCampaignsArgs>>;
  case?: Resolver<ResolversTypes['Cases'], ParentType, ContextType, RequireFields<CrmQueryCaseArgs, 'id'>>;
  cases?: Resolver<Array<ResolversTypes['Cases']>, ParentType, ContextType, Partial<CrmQueryCasesArgs>>;
  companies?: Resolver<Array<ResolversTypes['Companies']>, ParentType, ContextType, Partial<CrmQueryCompaniesArgs>>;
  company?: Resolver<ResolversTypes['Companies'], ParentType, ContextType, RequireFields<CrmQueryCompanyArgs, 'id'>>;
  contact?: Resolver<ResolversTypes['Contacts'], ParentType, ContextType, RequireFields<CrmQueryContactArgs, 'id'>>;
  contacts?: Resolver<Array<ResolversTypes['Contacts']>, ParentType, ContextType, Partial<CrmQueryContactsArgs>>;
  interaction?: Resolver<ResolversTypes['Interactions'], ParentType, ContextType, RequireFields<CrmQueryInteractionArgs, 'id'>>;
  interactions?: Resolver<Array<ResolversTypes['Interactions']>, ParentType, ContextType, Partial<CrmQueryInteractionsArgs>>;
  invoice?: Resolver<ResolversTypes['Invoices'], ParentType, ContextType, RequireFields<CrmQueryInvoiceArgs, 'id'>>;
  invoices?: Resolver<Array<ResolversTypes['Invoices']>, ParentType, ContextType, Partial<CrmQueryInvoicesArgs>>;
  lead?: Resolver<ResolversTypes['Leads'], ParentType, ContextType, RequireFields<CrmQueryLeadArgs, 'id'>>;
  leads?: Resolver<Array<ResolversTypes['Leads']>, ParentType, ContextType, Partial<CrmQueryLeadsArgs>>;
  notification?: Resolver<ResolversTypes['Notifications'], ParentType, ContextType, RequireFields<CrmQueryNotificationArgs, 'id'>>;
  notifications?: Resolver<Array<ResolversTypes['Notifications']>, ParentType, ContextType, Partial<CrmQueryNotificationsArgs>>;
  opportunities?: Resolver<Array<ResolversTypes['Opportunities']>, ParentType, ContextType, Partial<CrmQueryOpportunitiesArgs>>;
  opportunity?: Resolver<ResolversTypes['Opportunities'], ParentType, ContextType, RequireFields<CrmQueryOpportunityArgs, 'id'>>;
  product?: Resolver<ResolversTypes['Products'], ParentType, ContextType, RequireFields<CrmQueryProductArgs, 'id'>>;
  products?: Resolver<Array<ResolversTypes['Products']>, ParentType, ContextType, Partial<CrmQueryProductsArgs>>;
};

export type CurrencyResolvers = EnumResolverSignature<{ AUD?: any, CAD?: any, EUR?: any, GBP?: any, JPY?: any, PHP?: any, USD?: any }, ResolversTypes['Currency']>;

export type CustomerTrackingLinksResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CustomerTrackingLinks'] = ResolversParentTypes['CustomerTrackingLinks']> = {
  accessCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deliveryTask?: Resolver<ResolversTypes['DeliveryTasks'], ParentType, ContextType>;
  expiresAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastAccessedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trackingToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DeleteResult'] = ResolversParentTypes['DeleteResult']> = {
  numDeletedRows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type DeliveryFailureReasonResolvers = EnumResolverSignature<{ ACCESS_DENIED?: any, ADDRESS_NOT_FOUND?: any, DAMAGED_PACKAGE?: any, OTHER?: any, RECIPIENT_NOT_HOME?: any, REFUSED_DELIVERY?: any, VEHICLE_BREAKDOWN?: any, WEATHER_CONDITIONS?: any }, ResolversTypes['DeliveryFailureReason']>;

export type DeliveryRouteStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, COMPLETED?: any, IN_PROGRESS?: any, PAUSED?: any, PLANNED?: any }, ResolversTypes['DeliveryRouteStatus']>;

export type DeliveryRoutesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DeliveryRoutes'] = ResolversParentTypes['DeliveryRoutes']> = {
  actualDurationMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  driver?: Resolver<ResolversTypes['Drivers'], ParentType, ContextType>;
  estimatedDurationMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  optimizedRouteData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  routeDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['DeliveryRouteStatus']>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['DeliveryTasks']>>, ParentType, ContextType>;
  totalDistanceKm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type DeliveryTaskStatusResolvers = EnumResolverSignature<{ ASSIGNED?: any, CANCELLED?: any, DELIVERED?: any, FAILED?: any, OUT_FOR_DELIVERY?: any, PENDING?: any, RESCHEDULED?: any }, ResolversTypes['DeliveryTaskStatus']>;

export type DeliveryTasksResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DeliveryTasks'] = ResolversParentTypes['DeliveryTasks']> = {
  actualArrivalTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attemptCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerTrackingLinks?: Resolver<Maybe<Array<ResolversTypes['CustomerTrackingLinks']>>, ParentType, ContextType>;
  deliveryAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryInstructions?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deliveryRoute?: Resolver<ResolversTypes['DeliveryRoutes'], ParentType, ContextType>;
  deliveryTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedArrivalTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<ResolversTypes['TaskEvents']>>, ParentType, ContextType>;
  failureReason?: Resolver<Maybe<ResolversTypes['DeliveryFailureReason']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  package?: Resolver<ResolversTypes['Packages'], ParentType, ContextType>;
  proofOfDeliveries?: Resolver<Maybe<Array<ResolversTypes['DmsProofOfDeliveries']>>, ParentType, ContextType>;
  recipientName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recipientPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  routeSequence?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['DeliveryTaskStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type DisputeStatusResolvers = EnumResolverSignature<{ APPROVED?: any, CLOSED?: any, DENIED?: any, ESCALATED?: any, OPEN?: any, UNDER_REVIEW?: any }, ResolversTypes['DisputeStatus']>;

export type DisputesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Disputes'] = ResolversParentTypes['Disputes']> = {
  client?: Resolver<ResolversTypes['Companies'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditNotes?: Resolver<Maybe<Array<ResolversTypes['CreditNotes']>>, ParentType, ContextType>;
  disputedAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lineItem?: Resolver<ResolversTypes['InvoiceLineItems'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resolutionNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolvedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolvedByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['DisputeStatus']>, ParentType, ContextType>;
  submittedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type DmsMutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DmsMutation'] = ResolversParentTypes['DmsMutation']> = {
  createCustomerTrackingLink?: Resolver<ResolversTypes['CustomerTrackingLinks'], ParentType, ContextType, RequireFields<DmsMutationCreateCustomerTrackingLinkArgs, 'value'>>;
  createDeliveryRoute?: Resolver<ResolversTypes['DeliveryRoutes'], ParentType, ContextType, RequireFields<DmsMutationCreateDeliveryRouteArgs, 'value'>>;
  createDeliveryTask?: Resolver<ResolversTypes['DeliveryTasks'], ParentType, ContextType, RequireFields<DmsMutationCreateDeliveryTaskArgs, 'value'>>;
  createDmsProofOfDelivery?: Resolver<ResolversTypes['DmsProofOfDeliveries'], ParentType, ContextType, RequireFields<DmsMutationCreateDmsProofOfDeliveryArgs, 'value'>>;
  createDriverLocation?: Resolver<ResolversTypes['DriverLocations'], ParentType, ContextType, RequireFields<DmsMutationCreateDriverLocationArgs, 'value'>>;
  createTaskEvent?: Resolver<ResolversTypes['TaskEvents'], ParentType, ContextType, RequireFields<DmsMutationCreateTaskEventArgs, 'value'>>;
  removeCustomerTrackingLink?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<DmsMutationRemoveCustomerTrackingLinkArgs, 'id'>>;
  removeDeliveryRoute?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<DmsMutationRemoveDeliveryRouteArgs, 'id'>>;
  removeDeliveryTask?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<DmsMutationRemoveDeliveryTaskArgs, 'id'>>;
  removeDmsProofOfDelivery?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<DmsMutationRemoveDmsProofOfDeliveryArgs, 'id'>>;
  removeDriverLocation?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<DmsMutationRemoveDriverLocationArgs, 'id'>>;
  removeTaskEvent?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<DmsMutationRemoveTaskEventArgs, 'id'>>;
  updateCustomerTrackingLink?: Resolver<ResolversTypes['CustomerTrackingLinks'], ParentType, ContextType, RequireFields<DmsMutationUpdateCustomerTrackingLinkArgs, 'id'>>;
  updateDeliveryRoute?: Resolver<ResolversTypes['DeliveryRoutes'], ParentType, ContextType, RequireFields<DmsMutationUpdateDeliveryRouteArgs, 'id'>>;
  updateDeliveryTask?: Resolver<ResolversTypes['DeliveryTasks'], ParentType, ContextType, RequireFields<DmsMutationUpdateDeliveryTaskArgs, 'id'>>;
  updateDmsProofOfDelivery?: Resolver<ResolversTypes['DmsProofOfDeliveries'], ParentType, ContextType, RequireFields<DmsMutationUpdateDmsProofOfDeliveryArgs, 'id'>>;
  updateDriverLocation?: Resolver<ResolversTypes['DriverLocations'], ParentType, ContextType, RequireFields<DmsMutationUpdateDriverLocationArgs, 'id'>>;
  updateTaskEvent?: Resolver<ResolversTypes['TaskEvents'], ParentType, ContextType, RequireFields<DmsMutationUpdateTaskEventArgs, 'id'>>;
};

export type DmsProofOfDeliveriesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DmsProofOfDeliveries'] = ResolversParentTypes['DmsProofOfDeliveries']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deliveryTask?: Resolver<ResolversTypes['DeliveryTasks'], ParentType, ContextType>;
  filePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  recipientName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  signatureData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ProofOfDeliveryType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verificationCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type DmsQueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DmsQuery'] = ResolversParentTypes['DmsQuery']> = {
  customerTrackingLink?: Resolver<ResolversTypes['CustomerTrackingLinks'], ParentType, ContextType, RequireFields<DmsQueryCustomerTrackingLinkArgs, 'id'>>;
  customerTrackingLinks?: Resolver<Array<ResolversTypes['CustomerTrackingLinks']>, ParentType, ContextType, Partial<DmsQueryCustomerTrackingLinksArgs>>;
  deliveryRoute?: Resolver<ResolversTypes['DeliveryRoutes'], ParentType, ContextType, RequireFields<DmsQueryDeliveryRouteArgs, 'id'>>;
  deliveryRoutes?: Resolver<Array<ResolversTypes['DeliveryRoutes']>, ParentType, ContextType, Partial<DmsQueryDeliveryRoutesArgs>>;
  deliveryTask?: Resolver<ResolversTypes['DeliveryTasks'], ParentType, ContextType, RequireFields<DmsQueryDeliveryTaskArgs, 'id'>>;
  deliveryTasks?: Resolver<Array<ResolversTypes['DeliveryTasks']>, ParentType, ContextType, Partial<DmsQueryDeliveryTasksArgs>>;
  dmsProofOfDeliveries?: Resolver<Array<ResolversTypes['DmsProofOfDeliveries']>, ParentType, ContextType, Partial<DmsQueryDmsProofOfDeliveriesArgs>>;
  dmsProofOfDelivery?: Resolver<ResolversTypes['DmsProofOfDeliveries'], ParentType, ContextType, RequireFields<DmsQueryDmsProofOfDeliveryArgs, 'id'>>;
  driverLocation?: Resolver<ResolversTypes['DriverLocations'], ParentType, ContextType, RequireFields<DmsQueryDriverLocationArgs, 'id'>>;
  driverLocations?: Resolver<Array<ResolversTypes['DriverLocations']>, ParentType, ContextType, Partial<DmsQueryDriverLocationsArgs>>;
  taskEvent?: Resolver<ResolversTypes['TaskEvents'], ParentType, ContextType, RequireFields<DmsQueryTaskEventArgs, 'id'>>;
  taskEvents?: Resolver<Array<ResolversTypes['TaskEvents']>, ParentType, ContextType, Partial<DmsQueryTaskEventsArgs>>;
};

export type DocumentTypeResolvers = EnumResolverSignature<{ BOL?: any, COMMERCIAL_INVOICE?: any, CREDIT_NOTE?: any, CUSTOMS_DECLARATION?: any, PACKING_LIST?: any, PROOF_OF_DELIVERY?: any, RECEIPT?: any, SHIPPING_LABEL?: any }, ResolversTypes['DocumentType']>;

export type DocumentsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Documents'] = ResolversParentTypes['Documents']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  documentType?: Resolver<ResolversTypes['DocumentType'], ParentType, ContextType>;
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fileSize?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recordId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  recordType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uploadedByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type DriverLocationsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DriverLocations'] = ResolversParentTypes['DriverLocations']> = {
  accuracy?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  altitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  driver?: Resolver<ResolversTypes['Drivers'], ParentType, ContextType>;
  heading?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  speedKmh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type DriverScheduleReasonResolvers = EnumResolverSignature<{ PERSONAL_LEAVE?: any, SICK_LEAVE?: any, TRAINING?: any, VACATION?: any }, ResolversTypes['DriverScheduleReason']>;

export type DriverSchedulesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DriverSchedules'] = ResolversParentTypes['DriverSchedules']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  driver?: Resolver<ResolversTypes['Drivers'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['DriverScheduleReason']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type DriverStatusResolvers = EnumResolverSignature<{ ACTIVE?: any, INACTIVE?: any, ON_LEAVE?: any }, ResolversTypes['DriverStatus']>;

export type DriversResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Drivers'] = ResolversParentTypes['Drivers']> = {
  contactPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deliveryRoutes?: Resolver<Maybe<Array<ResolversTypes['DeliveryRoutes']>>, ParentType, ContextType>;
  driverLocations?: Resolver<Maybe<Array<ResolversTypes['DriverLocations']>>, ParentType, ContextType>;
  expenses?: Resolver<Maybe<Array<ResolversTypes['Expenses']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  licenseExpiryDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  licenseNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schedules?: Resolver<Maybe<Array<ResolversTypes['DriverSchedules']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['DriverStatus']>, ParentType, ContextType>;
  trips?: Resolver<Maybe<Array<ResolversTypes['Trips']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type ExpenseStatusResolvers = EnumResolverSignature<{ APPROVED?: any, PENDING?: any, REIMBURSED?: any, REJECTED?: any }, ResolversTypes['ExpenseStatus']>;

export type ExpenseTypeResolvers = EnumResolverSignature<{ ACCOMMODATION?: any, FUEL?: any, MAINTENANCE?: any, MEALS?: any, PARKING?: any, TOLLS?: any }, ResolversTypes['ExpenseType']>;

export type ExpensesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Expenses'] = ResolversParentTypes['Expenses']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['Currency']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  driver?: Resolver<Maybe<ResolversTypes['Drivers']>, ParentType, ContextType>;
  expenseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fuelQuantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  odometerReading?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  receiptUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ExpenseStatus']>, ParentType, ContextType>;
  trip?: Resolver<Maybe<ResolversTypes['Trips']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ExpenseType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface FileScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export type GeofenceEventTypeResolvers = EnumResolverSignature<{ ENTER?: any, EXIT?: any }, ResolversTypes['GeofenceEventType']>;

export type GeofenceEventsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['GeofenceEvents'] = ResolversParentTypes['GeofenceEvents']> = {
  eventType?: Resolver<ResolversTypes['GeofenceEventType'], ParentType, ContextType>;
  geofence?: Resolver<ResolversTypes['Geofences'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType>;
};

export type GeofencesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Geofences'] = ResolversParentTypes['Geofences']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<ResolversTypes['GeofenceEvents']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type GpsPingsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['GpsPings'] = ResolversParentTypes['GpsPings']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType>;
};

export type InboundShipmentItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InboundShipmentItems'] = ResolversParentTypes['InboundShipmentItems']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discrepancyNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discrepancyQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  expectedQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inboundShipment?: Resolver<ResolversTypes['InboundShipments'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  receivedQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type InboundShipmentStatusResolvers = EnumResolverSignature<{ ARRIVED?: any, CANCELLED?: any, COMPLETED?: any, PENDING?: any, PROCESSING?: any }, ResolversTypes['InboundShipmentStatus']>;

export type InboundShipmentsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InboundShipments'] = ResolversParentTypes['InboundShipments']> = {
  actualArrivalDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expectedArrivalDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['InboundShipmentItems']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['InboundShipmentStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type InteractionTypeResolvers = EnumResolverSignature<{ CALL?: any, EMAIL?: any, MEETING?: any, TEXT?: any }, ResolversTypes['InteractionType']>;

export type InteractionsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Interactions'] = ResolversParentTypes['Interactions']> = {
  case?: Resolver<Maybe<ResolversTypes['Cases']>, ParentType, ContextType>;
  contact?: Resolver<ResolversTypes['Contacts'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interactionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  outcome?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['InteractionType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type InventoryAdjustmentReasonResolvers = EnumResolverSignature<{ CYCLE_COUNT?: any, DAMAGED_GOODS?: any, EXPIRED?: any, MANUAL_CORRECTION?: any, RETURN_TO_VENDOR?: any, THEFT?: any }, ResolversTypes['InventoryAdjustmentReason']>;

export type InventoryAdjustmentsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InventoryAdjustments'] = ResolversParentTypes['InventoryAdjustments']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantityChange?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['InventoryAdjustmentReason']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type InventoryBatchesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InventoryBatches'] = ResolversParentTypes['InventoryBatches']> = {
  batchNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inventoryStock?: Resolver<Maybe<Array<ResolversTypes['InventoryStock']>>, ParentType, ContextType>;
  outboundShipmentItems?: Resolver<Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, ParentType, ContextType>;
  packageItems?: Resolver<Maybe<Array<ResolversTypes['PackageItems']>>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  taskItems?: Resolver<Maybe<Array<ResolversTypes['TaskItems']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type InventoryStockResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InventoryStock'] = ResolversParentTypes['InventoryStock']> = {
  availableQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  batch?: Resolver<Maybe<ResolversTypes['InventoryBatches']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastCountedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastMovementAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Locations'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reservedQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['InventoryStockStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type InventoryStockStatusResolvers = EnumResolverSignature<{ ALLOCATED?: any, AVAILABLE?: any, DAMAGED?: any, EXPIRED?: any, HOLD?: any, QUARANTINE?: any, SHIPPED?: any }, ResolversTypes['InventoryStockStatus']>;

export type InvoiceItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InvoiceItems'] = ResolversParentTypes['InvoiceItems']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invoice?: Resolver<ResolversTypes['Invoices'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Products'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type InvoiceLineItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InvoiceLineItems'] = ResolversParentTypes['InvoiceLineItems']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discountAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  discountRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  disputes?: Resolver<Maybe<Array<ResolversTypes['Disputes']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invoice?: Resolver<ResolversTypes['BillingInvoices'], ParentType, ContextType>;
  lineTotal?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sourceRecordId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  sourceRecordType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  taxRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  unitPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type InvoiceStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, DRAFT?: any, OVERDUE?: any, PAID?: any, SENT?: any }, ResolversTypes['InvoiceStatus']>;

export type InvoicesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Invoices'] = ResolversParentTypes['Invoices']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['InvoiceItems']>>, ParentType, ContextType>;
  opportunity?: Resolver<Maybe<ResolversTypes['Opportunities']>, ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentMethod?: Resolver<Maybe<ResolversTypes['PaymentMethod']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['InvoiceStatus']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type LeadSourceResolvers = EnumResolverSignature<{ ADVERTISEMENT?: any, COLD_CALL?: any, EMAIL_CAMPAIGN?: any, EVENT?: any, OTHER?: any, PARTNER?: any, REFERRAL?: any, SOCIAL_MEDIA?: any, WEBSITE?: any }, ResolversTypes['LeadSource']>;

export type LeadStatusResolvers = EnumResolverSignature<{ CONTACTED?: any, CONVERTED?: any, NEW?: any, QUALIFIED?: any, UNQUALIFIED?: any }, ResolversTypes['LeadStatus']>;

export type LeadsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Leads'] = ResolversParentTypes['Leads']> = {
  campaign?: Resolver<Maybe<ResolversTypes['Campaigns']>, ParentType, ContextType>;
  convertedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  convertedCompany?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  convertedContact?: Resolver<Maybe<ResolversTypes['Contacts']>, ParentType, ContextType>;
  convertedOpportunity?: Resolver<Maybe<ResolversTypes['Opportunities']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  leadScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  leadSource?: Resolver<Maybe<ResolversTypes['LeadSource']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['LeadStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type LocationTypeResolvers = EnumResolverSignature<{ BULK_STORAGE?: any, CROSS_DOCK_AREA?: any, DAMAGED_GOODS?: any, PACKING_STATION?: any, PICK_BIN?: any, QUALITY_CONTROL?: any, RECEIVING_DOCK?: any, RESERVE_STORAGE?: any, RETURNS_AREA?: any, STAGING_AREA?: any }, ResolversTypes['LocationType']>;

export type LocationsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Locations'] = ResolversParentTypes['Locations']> = {
  barcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  binThresholds?: Resolver<Maybe<Array<ResolversTypes['BinThresholds']>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationTaskItems?: Resolver<Maybe<Array<ResolversTypes['TaskItems']>>, ParentType, ContextType>;
  hazmatApproved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inventoryStock?: Resolver<Maybe<Array<ResolversTypes['InventoryStock']>>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPickable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isReceivable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxPallets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxVolume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxWeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentLocation?: Resolver<Maybe<ResolversTypes['Locations']>, ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  putawayRules?: Resolver<Maybe<Array<ResolversTypes['PutawayRules']>>, ParentType, ContextType>;
  sourceTaskItems?: Resolver<Maybe<Array<ResolversTypes['TaskItems']>>, ParentType, ContextType>;
  temperatureControlled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['LocationType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
  xCoordinate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yCoordinate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  zCoordinate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  billing?: Resolver<Maybe<ResolversTypes['BillingMutation']>, ParentType, ContextType>;
  crm?: Resolver<Maybe<ResolversTypes['CrmMutation']>, ParentType, ContextType>;
  dms?: Resolver<Maybe<ResolversTypes['DmsMutation']>, ParentType, ContextType>;
  tms?: Resolver<Maybe<ResolversTypes['TmsMutation']>, ParentType, ContextType>;
  wms?: Resolver<Maybe<ResolversTypes['WmsMutation']>, ParentType, ContextType>;
};

export type NotificationsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Notifications'] = ResolversParentTypes['Notifications']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isRead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type OpportunitiesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Opportunities'] = ResolversParentTypes['Opportunities']> = {
  campaign?: Resolver<Maybe<ResolversTypes['Campaigns']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['Contacts']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dealValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  expectedCloseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lostReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  probability?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['OpportunityProducts']>>, ParentType, ContextType>;
  salesOrders?: Resolver<Maybe<Array<ResolversTypes['SalesOrders']>>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['OpportunitySource']>, ParentType, ContextType>;
  stage?: Resolver<Maybe<ResolversTypes['OpportunityStage']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type OpportunityProductsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['OpportunityProducts'] = ResolversParentTypes['OpportunityProducts']> = {
  opportunity?: Resolver<ResolversTypes['Opportunities'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Products'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type OpportunitySourceResolvers = EnumResolverSignature<{ ADVERTISEMENT?: any, COLD_CALL?: any, EMAIL_CAMPAIGN?: any, EVENT?: any, EXISTING_CUSTOMER?: any, OTHER?: any, PARTNER?: any, REFERRAL?: any, SOCIAL_MEDIA?: any, WEBSITE?: any }, ResolversTypes['OpportunitySource']>;

export type OpportunityStageResolvers = EnumResolverSignature<{ CLOSED_LOST?: any, CLOSED_WON?: any, DEMO?: any, NEED_ANALYSIS?: any, NEGOTIATION?: any, PROPOSAL?: any, PROSPECTING?: any, QUALIFICATION?: any }, ResolversTypes['OpportunityStage']>;

export type OutboundShipmentItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['OutboundShipmentItems'] = ResolversParentTypes['OutboundShipmentItems']> = {
  batch?: Resolver<Maybe<ResolversTypes['InventoryBatches']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  outboundShipment?: Resolver<ResolversTypes['OutboundShipments'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantityShipped?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  salesOrderItem?: Resolver<ResolversTypes['SalesOrderItems'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type OutboundShipmentStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, DELIVERED?: any, PACKED?: any, PICKING?: any, SHIPPED?: any }, ResolversTypes['OutboundShipmentStatus']>;

export type OutboundShipmentsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['OutboundShipments'] = ResolversParentTypes['OutboundShipments']> = {
  carrier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, ParentType, ContextType>;
  salesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['OutboundShipmentStatus']>, ParentType, ContextType>;
  trackingNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PackageItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PackageItems'] = ResolversParentTypes['PackageItems']> = {
  batch?: Resolver<Maybe<ResolversTypes['InventoryBatches']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiryDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lotNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  package?: Resolver<ResolversTypes['Packages'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  serialNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  totalWeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  unitWeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PackagesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Packages'] = ResolversParentTypes['Packages']> = {
  carrier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deliveryTasks?: Resolver<Maybe<Array<ResolversTypes['DeliveryTasks']>>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  insuranceValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  isFragile?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isHazmat?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['PackageItems']>>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  packageNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  packageType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  packedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  packedByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  requiresSignature?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  salesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType>;
  serviceLevel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trackingNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type PartnerInvoiceItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PartnerInvoiceItems'] = ResolversParentTypes['PartnerInvoiceItems']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  partnerInvoice?: Resolver<ResolversTypes['PartnerInvoices'], ParentType, ContextType>;
  shipmentLeg?: Resolver<ResolversTypes['ShipmentLegs'], ParentType, ContextType>;
};

export type PartnerInvoiceStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, DISPUTED?: any, OVERDUE?: any, PAID?: any, PENDING?: any }, ResolversTypes['PartnerInvoiceStatus']>;

export type PartnerInvoicesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PartnerInvoices'] = ResolversParentTypes['PartnerInvoices']> = {
  carrier?: Resolver<ResolversTypes['Carriers'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invoiceDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invoiceNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['PartnerInvoiceItems']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['PartnerInvoiceStatus']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PaymentMethodResolvers = EnumResolverSignature<{ BANK_TRANSFER?: any, CASH?: any, CHECK?: any, CLIENT_CREDIT?: any, CREDIT_CARD?: any, DEBIT_CARD?: any, MAYA?: any, OTHER?: any, PAYPAL?: any, QR_PH?: any, STRIPE?: any, WALLET?: any, WIRE_TRANSFER?: any }, ResolversTypes['PaymentMethod']>;

export type PaymentStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, FAILED?: any, PENDING?: any, PROCESSING?: any, REFUNDED?: any, SUCCESSFUL?: any }, ResolversTypes['PaymentStatus']>;

export type PaymentsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Payments'] = ResolversParentTypes['Payments']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  exchangeRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  fees?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  gatewayReference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invoice?: Resolver<ResolversTypes['BillingInvoices'], ParentType, ContextType>;
  netAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentMethod?: Resolver<ResolversTypes['PaymentMethod'], ParentType, ContextType>;
  processedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processedByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['PaymentStatus']>, ParentType, ContextType>;
  transactionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PickBatchItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PickBatchItems'] = ResolversParentTypes['PickBatchItems']> = {
  actualPickTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedPickTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderPriority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pickBatch?: Resolver<ResolversTypes['PickBatches'], ParentType, ContextType>;
  salesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PickBatchStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, COMPLETED?: any, IN_PROGRESS?: any, OPEN?: any }, ResolversTypes['PickBatchStatus']>;

export type PickBatchesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PickBatches'] = ResolversParentTypes['PickBatches']> = {
  actualDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  assignedUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  batchNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedItems?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['PickBatchItems']>>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['PickBatchStatus']>, ParentType, ContextType>;
  strategy?: Resolver<ResolversTypes['PickStrategy'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['Tasks']>>, ParentType, ContextType>;
  totalItems?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
  waveId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoneRestrictions?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
};

export type PickStrategyResolvers = EnumResolverSignature<{ BATCH_PICKING?: any, CLUSTER_PICKING?: any, SINGLE_ORDER_PICKING?: any, WAVE_PICKING?: any, ZONE_PICKING?: any }, ResolversTypes['PickStrategy']>;

export type PricingModelResolvers = EnumResolverSignature<{ FLAT_RATE?: any, PERCENTAGE?: any, PER_CUBIC_METER?: any, PER_ITEM?: any, PER_KG?: any, PER_ZONE?: any, TIERED?: any }, ResolversTypes['PricingModel']>;

export type ProductStatusResolvers = EnumResolverSignature<{ ACTIVE?: any, DISCONTINUED?: any, INACTIVE?: any, OBSOLETE?: any }, ResolversTypes['ProductStatus']>;

export type ProductTypeResolvers = EnumResolverSignature<{ DIGITAL?: any, GOOD?: any, SERVICE?: any, SUBSCRIPTION?: any }, ResolversTypes['ProductType']>;

export type ProductsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Products'] = ResolversParentTypes['Products']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ProofOfDeliveriesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ProofOfDeliveries'] = ResolversParentTypes['ProofOfDeliveries']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  filePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tripStop?: Resolver<ResolversTypes['TripStops'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ProofType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ProofOfDeliveryTypeResolvers = EnumResolverSignature<{ CODE_VERIFICATION?: any, CONTACTLESS_DELIVERY?: any, LEFT_AT_DOOR?: any, PHOTO?: any, SIGNATURE?: any }, ResolversTypes['ProofOfDeliveryType']>;

export type ProofTypeResolvers = EnumResolverSignature<{ BARCODE_SCAN?: any, PHOTO?: any, PIN_VERIFICATION?: any, SIGNATURE?: any }, ResolversTypes['ProofType']>;

export type PutawayRulesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PutawayRules'] = ResolversParentTypes['PutawayRules']> = {
  client?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  locationType?: Resolver<Maybe<ResolversTypes['LocationType']>, ParentType, ContextType>;
  maxQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  preferredLocation?: Resolver<Maybe<ResolversTypes['Locations']>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  requiresHazmatApproval?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  requiresTemperatureControl?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volumeThreshold?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
  weightThreshold?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  billing?: Resolver<Maybe<ResolversTypes['BillingQuery']>, ParentType, ContextType>;
  crm?: Resolver<Maybe<ResolversTypes['CrmQuery']>, ParentType, ContextType>;
  dms?: Resolver<Maybe<ResolversTypes['DmsQuery']>, ParentType, ContextType>;
  tms?: Resolver<Maybe<ResolversTypes['TmsQuery']>, ParentType, ContextType>;
  wms?: Resolver<Maybe<ResolversTypes['WmsQuery']>, ParentType, ContextType>;
};

export type QuoteStatusResolvers = EnumResolverSignature<{ ACCEPTED?: any, CANCELLED?: any, CONVERTED?: any, EXPIRED?: any, PENDING?: any }, ResolversTypes['QuoteStatus']>;

export type QuotesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Quotes'] = ResolversParentTypes['Quotes']> = {
  billingInvoices?: Resolver<Maybe<Array<ResolversTypes['BillingInvoices']>>, ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  destinationDetails?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiresAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originDetails?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quoteNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quotedPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  serviceLevel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['QuoteStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type RateCardsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['RateCards'] = ResolversParentTypes['RateCards']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rules?: Resolver<Maybe<Array<ResolversTypes['RateRules']>>, ParentType, ContextType>;
  serviceType?: Resolver<ResolversTypes['ServiceType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validFrom?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  validTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type RateRulesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['RateRules'] = ResolversParentTypes['RateRules']> = {
  condition?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  maxValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  minValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  pricingModel?: Resolver<ResolversTypes['PricingModel'], ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rateCard?: Resolver<ResolversTypes['RateCards'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type RecordTypeResolvers = EnumResolverSignature<{ CAMPAIGNS?: any, CASES?: any, COMPANIES?: any, CONTACTS?: any, INTERACTIONS?: any, INVOICES?: any, LEADS?: any, OPPORTUNITIES?: any, PRODUCTS?: any }, ResolversTypes['RecordType']>;

export type ReorderPointsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ReorderPoints'] = ResolversParentTypes['ReorderPoints']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  threshold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
};

export type ReturnItemConditionResolvers = EnumResolverSignature<{ DAMAGED?: any, DEFECTIVE?: any, EXPIRED?: any, SELLABLE?: any, UNSELLABLE?: any }, ResolversTypes['ReturnItemCondition']>;

export type ReturnItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ReturnItems'] = ResolversParentTypes['ReturnItems']> = {
  condition?: Resolver<Maybe<ResolversTypes['ReturnItemCondition']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantityExpected?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityReceived?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantityVariance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  return?: Resolver<ResolversTypes['Returns'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ReturnStatusResolvers = EnumResolverSignature<{ APPROVED?: any, PROCESSED?: any, RECEIVED?: any, REJECTED?: any, REQUESTED?: any }, ResolversTypes['ReturnStatus']>;

export type ReturnsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Returns'] = ResolversParentTypes['Returns']> = {
  client?: Resolver<ResolversTypes['Companies'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['ReturnItems']>>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  returnNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  salesOrder?: Resolver<Maybe<ResolversTypes['SalesOrders']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ReturnStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type RoutesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Routes'] = ResolversParentTypes['Routes']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  optimizedRouteData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalDistance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalDuration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  trip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SalesOrderItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SalesOrderItems'] = ResolversParentTypes['SalesOrderItems']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  outboundShipmentItems?: Resolver<Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantityOrdered?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  salesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SalesOrderStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, COMPLETED?: any, PENDING?: any, PROCESSING?: any, SHIPPED?: any }, ResolversTypes['SalesOrderStatus']>;

export type SalesOrdersResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SalesOrders'] = ResolversParentTypes['SalesOrders']> = {
  client?: Resolver<ResolversTypes['Companies'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  crmOpportunity?: Resolver<Maybe<ResolversTypes['Opportunities']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['SalesOrderItems']>>, ParentType, ContextType>;
  orderNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outboundShipments?: Resolver<Maybe<Array<ResolversTypes['OutboundShipments']>>, ParentType, ContextType>;
  packages?: Resolver<Maybe<Array<ResolversTypes['Packages']>>, ParentType, ContextType>;
  pickBatchItems?: Resolver<Maybe<Array<ResolversTypes['PickBatchItems']>>, ParentType, ContextType>;
  returns?: Resolver<Maybe<Array<ResolversTypes['Returns']>>, ParentType, ContextType>;
  shippingAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['SalesOrderStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ServiceTypeResolvers = EnumResolverSignature<{ CUSTOMS?: any, FULFILLMENT?: any, HANDLING?: any, INSURANCE?: any, PACKAGING?: any, RETURNS?: any, SHIPPING?: any, STORAGE?: any }, ResolversTypes['ServiceType']>;

export type ShipmentLegEventsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ShipmentLegEvents'] = ResolversParentTypes['ShipmentLegEvents']> = {
  eventTimestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shipmentLeg?: Resolver<ResolversTypes['ShipmentLegs'], ParentType, ContextType>;
  statusMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ShipmentLegStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, DELIVERED?: any, FAILED?: any, IN_TRANSIT?: any, PENDING?: any }, ResolversTypes['ShipmentLegStatus']>;

export type ShipmentLegsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ShipmentLegs'] = ResolversParentTypes['ShipmentLegs']> = {
  carrier?: Resolver<Maybe<ResolversTypes['Carriers']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<ResolversTypes['ShipmentLegEvents']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  internalTrip?: Resolver<Maybe<ResolversTypes['Trips']>, ParentType, ContextType>;
  legSequence?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  partnerInvoiceItems?: Resolver<Maybe<Array<ResolversTypes['PartnerInvoiceItems']>>, ParentType, ContextType>;
  shipment?: Resolver<Maybe<ResolversTypes['OutboundShipments']>, ParentType, ContextType>;
  startLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ShipmentLegStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type StockTransferStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, IN_TRANSIT?: any, PENDING?: any, RECEIVED?: any }, ResolversTypes['StockTransferStatus']>;

export type StockTransfersResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['StockTransfers'] = ResolversParentTypes['StockTransfers']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationWarehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sourceWarehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['StockTransferStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SuppliersResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Suppliers'] = ResolversParentTypes['Suppliers']> = {
  contactPerson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['WmsProducts']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SurchargeCalculationMethodResolvers = EnumResolverSignature<{ FIXED?: any, PERCENTAGE?: any, PER_UNIT?: any, SLIDING_SCALE?: any }, ResolversTypes['SurchargeCalculationMethod']>;

export type SurchargesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Surcharges'] = ResolversParentTypes['Surcharges']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  calculationMethod?: Resolver<ResolversTypes['SurchargeCalculationMethod'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validFrom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SyncStatusResolvers = EnumResolverSignature<{ FAILED?: any, IN_PROGRESS?: any, PENDING?: any, RETRY?: any, SUCCESS?: any }, ResolversTypes['SyncStatus']>;

export type TaskEventStatusResolvers = EnumResolverSignature<{ ARRIVED?: any, ASSIGNED?: any, CANCELLED?: any, DELIVERED?: any, EXCEPTION?: any, FAILED?: any, RESCHEDULED?: any, STARTED?: any }, ResolversTypes['TaskEventStatus']>;

export type TaskEventsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TaskEvents'] = ResolversParentTypes['TaskEvents']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deliveryTask?: Resolver<ResolversTypes['DeliveryTasks'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TaskEventStatus'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TaskItemStatusResolvers = EnumResolverSignature<{ COMPLETED?: any, DAMAGED?: any, IN_PROGRESS?: any, NOT_FOUND?: any, PENDING?: any, SHORT_PICKED?: any }, ResolversTypes['TaskItemStatus']>;

export type TaskItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TaskItems'] = ResolversParentTypes['TaskItems']> = {
  batch?: Resolver<Maybe<ResolversTypes['InventoryBatches']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationLocation?: Resolver<Maybe<ResolversTypes['Locations']>, ParentType, ContextType>;
  expiryDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lotNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantityCompleted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityRemaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantityRequired?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  serialNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  sourceLocation?: Resolver<Maybe<ResolversTypes['Locations']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TaskItemStatus']>, ParentType, ContextType>;
  task?: Resolver<ResolversTypes['Tasks'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TaskStatusResolvers = EnumResolverSignature<{ ASSIGNED?: any, CANCELLED?: any, COMPLETED?: any, ERROR?: any, IN_PROGRESS?: any, PENDING?: any }, ResolversTypes['TaskStatus']>;

export type TaskTypeResolvers = EnumResolverSignature<{ CROSS_DOCK?: any, CYCLE_COUNT?: any, DAMAGE_INSPECTION?: any, PACK?: any, PICK?: any, PUTAWAY?: any, QUALITY_CHECK?: any, REPLENISHMENT?: any, RETURNS_PROCESSING?: any }, ResolversTypes['TaskType']>;

export type TasksResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Tasks'] = ResolversParentTypes['Tasks']> = {
  actualDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  durationSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instructions?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['TaskItems']>>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pickBatch?: Resolver<Maybe<ResolversTypes['PickBatches']>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sourceEntityId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  sourceEntityType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TaskStatus']>, ParentType, ContextType>;
  taskNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TaskType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
};

export type TmsMutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TmsMutation'] = ResolversParentTypes['TmsMutation']> = {
  createCarrier?: Resolver<ResolversTypes['Carriers'], ParentType, ContextType, RequireFields<TmsMutationCreateCarrierArgs, 'value'>>;
  createCarrierRate?: Resolver<ResolversTypes['CarrierRates'], ParentType, ContextType, RequireFields<TmsMutationCreateCarrierRateArgs, 'value'>>;
  createDriver?: Resolver<ResolversTypes['Drivers'], ParentType, ContextType, RequireFields<TmsMutationCreateDriverArgs, 'value'>>;
  createDriverSchedule?: Resolver<ResolversTypes['DriverSchedules'], ParentType, ContextType, RequireFields<TmsMutationCreateDriverScheduleArgs, 'value'>>;
  createExpense?: Resolver<ResolversTypes['Expenses'], ParentType, ContextType, RequireFields<TmsMutationCreateExpenseArgs, 'value'>>;
  createGeofence?: Resolver<ResolversTypes['Geofences'], ParentType, ContextType, RequireFields<TmsMutationCreateGeofenceArgs, 'value'>>;
  createGeofenceEvent?: Resolver<ResolversTypes['GeofenceEvents'], ParentType, ContextType, RequireFields<TmsMutationCreateGeofenceEventArgs, 'value'>>;
  createGpsPing?: Resolver<ResolversTypes['GpsPings'], ParentType, ContextType, RequireFields<TmsMutationCreateGpsPingArgs, 'value'>>;
  createPartnerInvoice?: Resolver<ResolversTypes['PartnerInvoices'], ParentType, ContextType, RequireFields<TmsMutationCreatePartnerInvoiceArgs, 'value'>>;
  createPartnerInvoiceItem?: Resolver<ResolversTypes['PartnerInvoiceItems'], ParentType, ContextType, RequireFields<TmsMutationCreatePartnerInvoiceItemArgs, 'value'>>;
  createProofOfDelivery?: Resolver<ResolversTypes['ProofOfDeliveries'], ParentType, ContextType, RequireFields<TmsMutationCreateProofOfDeliveryArgs, 'value'>>;
  createRoute?: Resolver<ResolversTypes['Routes'], ParentType, ContextType, RequireFields<TmsMutationCreateRouteArgs, 'value'>>;
  createShipmentLeg?: Resolver<ResolversTypes['ShipmentLegs'], ParentType, ContextType, RequireFields<TmsMutationCreateShipmentLegArgs, 'value'>>;
  createShipmentLegEvent?: Resolver<ResolversTypes['ShipmentLegEvents'], ParentType, ContextType, RequireFields<TmsMutationCreateShipmentLegEventArgs, 'value'>>;
  createTrip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType, RequireFields<TmsMutationCreateTripArgs, 'value'>>;
  createTripStop?: Resolver<ResolversTypes['TripStops'], ParentType, ContextType, RequireFields<TmsMutationCreateTripStopArgs, 'value'>>;
  createVehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType, RequireFields<TmsMutationCreateVehicleArgs, 'value'>>;
  createVehicleMaintenance?: Resolver<ResolversTypes['VehicleMaintenance'], ParentType, ContextType, RequireFields<TmsMutationCreateVehicleMaintenanceArgs, 'value'>>;
  removeCarrier?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveCarrierArgs, 'id'>>;
  removeCarrierRate?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveCarrierRateArgs, 'id'>>;
  removeDriver?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveDriverArgs, 'id'>>;
  removeDriverSchedule?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveDriverScheduleArgs, 'id'>>;
  removeExpense?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveExpenseArgs, 'id'>>;
  removeGeofence?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveGeofenceArgs, 'id'>>;
  removeGeofenceEvent?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveGeofenceEventArgs, 'id'>>;
  removeGpsPing?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveGpsPingArgs, 'id'>>;
  removePartnerInvoice?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemovePartnerInvoiceArgs, 'id'>>;
  removePartnerInvoiceItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemovePartnerInvoiceItemArgs, 'id'>>;
  removeProofOfDelivery?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveProofOfDeliveryArgs, 'id'>>;
  removeRoute?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveRouteArgs, 'id'>>;
  removeShipmentLeg?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveShipmentLegArgs, 'id'>>;
  removeShipmentLegEvent?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveShipmentLegEventArgs, 'id'>>;
  removeTrip?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveTripArgs, 'id'>>;
  removeTripStop?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveTripStopArgs, 'id'>>;
  removeVehicle?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveVehicleArgs, 'id'>>;
  removeVehicleMaintenance?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationRemoveVehicleMaintenanceArgs, 'id'>>;
  updateCarrier?: Resolver<ResolversTypes['Carriers'], ParentType, ContextType, RequireFields<TmsMutationUpdateCarrierArgs, 'id'>>;
  updateCarrierRate?: Resolver<ResolversTypes['CarrierRates'], ParentType, ContextType, RequireFields<TmsMutationUpdateCarrierRateArgs, 'id'>>;
  updateDriver?: Resolver<ResolversTypes['Drivers'], ParentType, ContextType, RequireFields<TmsMutationUpdateDriverArgs, 'id'>>;
  updateDriverSchedule?: Resolver<ResolversTypes['DriverSchedules'], ParentType, ContextType, RequireFields<TmsMutationUpdateDriverScheduleArgs, 'id'>>;
  updateExpense?: Resolver<ResolversTypes['Expenses'], ParentType, ContextType, RequireFields<TmsMutationUpdateExpenseArgs, 'id'>>;
  updateGeofence?: Resolver<ResolversTypes['Geofences'], ParentType, ContextType, RequireFields<TmsMutationUpdateGeofenceArgs, 'id'>>;
  updateGeofenceEvent?: Resolver<ResolversTypes['GeofenceEvents'], ParentType, ContextType, RequireFields<TmsMutationUpdateGeofenceEventArgs, 'id'>>;
  updateGpsPing?: Resolver<ResolversTypes['GpsPings'], ParentType, ContextType, RequireFields<TmsMutationUpdateGpsPingArgs, 'id'>>;
  updatePartnerInvoice?: Resolver<ResolversTypes['PartnerInvoices'], ParentType, ContextType, RequireFields<TmsMutationUpdatePartnerInvoiceArgs, 'id'>>;
  updatePartnerInvoiceItem?: Resolver<ResolversTypes['PartnerInvoiceItems'], ParentType, ContextType, RequireFields<TmsMutationUpdatePartnerInvoiceItemArgs, 'id'>>;
  updateProofOfDelivery?: Resolver<ResolversTypes['ProofOfDeliveries'], ParentType, ContextType, RequireFields<TmsMutationUpdateProofOfDeliveryArgs, 'id'>>;
  updateRoute?: Resolver<ResolversTypes['Routes'], ParentType, ContextType, RequireFields<TmsMutationUpdateRouteArgs, 'id'>>;
  updateShipmentLeg?: Resolver<ResolversTypes['ShipmentLegs'], ParentType, ContextType, RequireFields<TmsMutationUpdateShipmentLegArgs, 'id'>>;
  updateShipmentLegEvent?: Resolver<ResolversTypes['ShipmentLegEvents'], ParentType, ContextType, RequireFields<TmsMutationUpdateShipmentLegEventArgs, 'id'>>;
  updateTrip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType, RequireFields<TmsMutationUpdateTripArgs, 'id'>>;
  updateTripStop?: Resolver<ResolversTypes['TripStops'], ParentType, ContextType, RequireFields<TmsMutationUpdateTripStopArgs, 'id'>>;
  updateVehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType, RequireFields<TmsMutationUpdateVehicleArgs, 'id'>>;
  updateVehicleMaintenance?: Resolver<ResolversTypes['VehicleMaintenance'], ParentType, ContextType, RequireFields<TmsMutationUpdateVehicleMaintenanceArgs, 'id'>>;
};

export type TmsQueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TmsQuery'] = ResolversParentTypes['TmsQuery']> = {
  carrier?: Resolver<ResolversTypes['Carriers'], ParentType, ContextType, RequireFields<TmsQueryCarrierArgs, 'id'>>;
  carriers?: Resolver<Array<ResolversTypes['Carriers']>, ParentType, ContextType, Partial<TmsQueryCarriersArgs>>;
  driver?: Resolver<ResolversTypes['Drivers'], ParentType, ContextType, RequireFields<TmsQueryDriverArgs, 'id'>>;
  drivers?: Resolver<Array<ResolversTypes['Drivers']>, ParentType, ContextType, Partial<TmsQueryDriversArgs>>;
  expense?: Resolver<ResolversTypes['Expenses'], ParentType, ContextType, RequireFields<TmsQueryExpenseArgs, 'id'>>;
  expenses?: Resolver<Array<ResolversTypes['Expenses']>, ParentType, ContextType, Partial<TmsQueryExpensesArgs>>;
  geofence?: Resolver<ResolversTypes['Geofences'], ParentType, ContextType, RequireFields<TmsQueryGeofenceArgs, 'id'>>;
  geofences?: Resolver<Array<ResolversTypes['Geofences']>, ParentType, ContextType, Partial<TmsQueryGeofencesArgs>>;
  gpsPing?: Resolver<ResolversTypes['GpsPings'], ParentType, ContextType, RequireFields<TmsQueryGpsPingArgs, 'id'>>;
  gpsPings?: Resolver<Array<ResolversTypes['GpsPings']>, ParentType, ContextType, Partial<TmsQueryGpsPingsArgs>>;
  partnerInvoice?: Resolver<ResolversTypes['PartnerInvoices'], ParentType, ContextType, RequireFields<TmsQueryPartnerInvoiceArgs, 'id'>>;
  partnerInvoices?: Resolver<Array<ResolversTypes['PartnerInvoices']>, ParentType, ContextType, Partial<TmsQueryPartnerInvoicesArgs>>;
  proofOfDeliveries?: Resolver<Array<ResolversTypes['ProofOfDeliveries']>, ParentType, ContextType, Partial<TmsQueryProofOfDeliveriesArgs>>;
  proofOfDelivery?: Resolver<ResolversTypes['ProofOfDeliveries'], ParentType, ContextType, RequireFields<TmsQueryProofOfDeliveryArgs, 'id'>>;
  route?: Resolver<ResolversTypes['Routes'], ParentType, ContextType, RequireFields<TmsQueryRouteArgs, 'id'>>;
  routes?: Resolver<Array<ResolversTypes['Routes']>, ParentType, ContextType, Partial<TmsQueryRoutesArgs>>;
  shipmentLeg?: Resolver<ResolversTypes['ShipmentLegs'], ParentType, ContextType, RequireFields<TmsQueryShipmentLegArgs, 'id'>>;
  shipmentLegs?: Resolver<Array<ResolversTypes['ShipmentLegs']>, ParentType, ContextType, Partial<TmsQueryShipmentLegsArgs>>;
  trip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType, RequireFields<TmsQueryTripArgs, 'id'>>;
  trips?: Resolver<Array<ResolversTypes['Trips']>, ParentType, ContextType, Partial<TmsQueryTripsArgs>>;
  vehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType, RequireFields<TmsQueryVehicleArgs, 'id'>>;
  vehicles?: Resolver<Array<ResolversTypes['Vehicles']>, ParentType, ContextType, Partial<TmsQueryVehiclesArgs>>;
};

export type TransactionTypeResolvers = EnumResolverSignature<{ ADJUSTMENT?: any, CREDIT?: any, DEBIT?: any, FEE?: any, REFUND?: any, TOP_UP?: any }, ResolversTypes['TransactionType']>;

export type TripStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, COMPLETED?: any, IN_PROGRESS?: any, PLANNED?: any }, ResolversTypes['TripStatus']>;

export type TripStopStatusResolvers = EnumResolverSignature<{ ARRIVED?: any, COMPLETED?: any, PENDING?: any, SKIPPED?: any }, ResolversTypes['TripStopStatus']>;

export type TripStopsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TripStops'] = ResolversParentTypes['TripStops']> = {
  actualArrivalTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  actualDepartureTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedArrivalTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedDepartureTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  proofOfDeliveries?: Resolver<Maybe<Array<ResolversTypes['ProofOfDeliveries']>>, ParentType, ContextType>;
  sequence?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shipment?: Resolver<Maybe<ResolversTypes['OutboundShipments']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TripStopStatus']>, ParentType, ContextType>;
  trip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TripsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Trips'] = ResolversParentTypes['Trips']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  driver?: Resolver<Maybe<ResolversTypes['Drivers']>, ParentType, ContextType>;
  endLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expenses?: Resolver<Maybe<Array<ResolversTypes['Expenses']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  routes?: Resolver<Maybe<Array<ResolversTypes['Routes']>>, ParentType, ContextType>;
  shipmentLegs?: Resolver<Maybe<Array<ResolversTypes['ShipmentLegs']>>, ParentType, ContextType>;
  startLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TripStatus']>, ParentType, ContextType>;
  stops?: Resolver<Maybe<Array<ResolversTypes['TripStops']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vehicle?: Resolver<Maybe<ResolversTypes['Vehicles']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type VehicleMaintenanceResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['VehicleMaintenance'] = ResolversParentTypes['VehicleMaintenance']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serviceDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serviceType?: Resolver<Maybe<ResolversTypes['VehicleServiceType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType>;
};

export type VehicleServiceTypeResolvers = EnumResolverSignature<{ BRAKE_SERVICE?: any, INSPECTION?: any, OIL_CHANGE?: any, REPAIR?: any, ROUTINE_MAINTENANCE?: any, TIRE_REPLACEMENT?: any }, ResolversTypes['VehicleServiceType']>;

export type VehicleStatusResolvers = EnumResolverSignature<{ AVAILABLE?: any, IN_MAINTENANCE?: any, ON_TRIP?: any, OUT_OF_SERVICE?: any }, ResolversTypes['VehicleStatus']>;

export type VehiclesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Vehicles'] = ResolversParentTypes['Vehicles']> = {
  capacityVolume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  capacityWeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentMileage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  geofenceEvents?: Resolver<Maybe<Array<ResolversTypes['GeofenceEvents']>>, ParentType, ContextType>;
  gpsPings?: Resolver<Maybe<Array<ResolversTypes['GpsPings']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastMaintenanceDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maintenances?: Resolver<Maybe<Array<ResolversTypes['VehicleMaintenance']>>, ParentType, ContextType>;
  make?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  model?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registrationNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['VehicleStatus']>, ParentType, ContextType>;
  trips?: Resolver<Maybe<Array<ResolversTypes['Trips']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type WarehousesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Warehouses'] = ResolversParentTypes['Warehouses']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactPerson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationStockTransfers?: Resolver<Maybe<Array<ResolversTypes['StockTransfers']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inboundShipments?: Resolver<Maybe<Array<ResolversTypes['InboundShipments']>>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  locations?: Resolver<Maybe<Array<ResolversTypes['Locations']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outboundShipments?: Resolver<Maybe<Array<ResolversTypes['OutboundShipments']>>, ParentType, ContextType>;
  packages?: Resolver<Maybe<Array<ResolversTypes['Packages']>>, ParentType, ContextType>;
  pickBatches?: Resolver<Maybe<Array<ResolversTypes['PickBatches']>>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  putawayRules?: Resolver<Maybe<Array<ResolversTypes['PutawayRules']>>, ParentType, ContextType>;
  sourceStockTransfers?: Resolver<Maybe<Array<ResolversTypes['StockTransfers']>>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['Tasks']>>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type WmsMutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WmsMutation'] = ResolversParentTypes['WmsMutation']> = {
  createBinThreshold?: Resolver<ResolversTypes['BinThresholds'], ParentType, ContextType, RequireFields<WmsMutationCreateBinThresholdArgs, 'value'>>;
  createInboundShipment?: Resolver<ResolversTypes['InboundShipments'], ParentType, ContextType, RequireFields<WmsMutationCreateInboundShipmentArgs, 'value'>>;
  createInboundShipmentItem?: Resolver<ResolversTypes['InboundShipmentItems'], ParentType, ContextType, RequireFields<WmsMutationCreateInboundShipmentItemArgs, 'value'>>;
  createInventoryAdjustment?: Resolver<ResolversTypes['InventoryAdjustments'], ParentType, ContextType, RequireFields<WmsMutationCreateInventoryAdjustmentArgs, 'value'>>;
  createInventoryBatch?: Resolver<ResolversTypes['InventoryBatches'], ParentType, ContextType, RequireFields<WmsMutationCreateInventoryBatchArgs, 'value'>>;
  createInventoryStock?: Resolver<ResolversTypes['InventoryStock'], ParentType, ContextType, RequireFields<WmsMutationCreateInventoryStockArgs, 'value'>>;
  createLocation?: Resolver<ResolversTypes['Locations'], ParentType, ContextType, RequireFields<WmsMutationCreateLocationArgs, 'value'>>;
  createOutboundShipment?: Resolver<ResolversTypes['OutboundShipments'], ParentType, ContextType, RequireFields<WmsMutationCreateOutboundShipmentArgs, 'value'>>;
  createOutboundShipmentItem?: Resolver<ResolversTypes['OutboundShipmentItems'], ParentType, ContextType, RequireFields<WmsMutationCreateOutboundShipmentItemArgs, 'value'>>;
  createPackage?: Resolver<ResolversTypes['Packages'], ParentType, ContextType, RequireFields<WmsMutationCreatePackageArgs, 'value'>>;
  createPackageItem?: Resolver<ResolversTypes['PackageItems'], ParentType, ContextType, RequireFields<WmsMutationCreatePackageItemArgs, 'value'>>;
  createPickBatch?: Resolver<ResolversTypes['PickBatches'], ParentType, ContextType, RequireFields<WmsMutationCreatePickBatchArgs, 'value'>>;
  createPickBatchItem?: Resolver<ResolversTypes['PickBatchItems'], ParentType, ContextType, RequireFields<WmsMutationCreatePickBatchItemArgs, 'value'>>;
  createPutawayRule?: Resolver<ResolversTypes['PutawayRules'], ParentType, ContextType, RequireFields<WmsMutationCreatePutawayRuleArgs, 'value'>>;
  createReorderPoint?: Resolver<ResolversTypes['ReorderPoints'], ParentType, ContextType, RequireFields<WmsMutationCreateReorderPointArgs, 'value'>>;
  createReturn?: Resolver<ResolversTypes['Returns'], ParentType, ContextType, RequireFields<WmsMutationCreateReturnArgs, 'value'>>;
  createReturnItem?: Resolver<ResolversTypes['ReturnItems'], ParentType, ContextType, RequireFields<WmsMutationCreateReturnItemArgs, 'value'>>;
  createSalesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType, RequireFields<WmsMutationCreateSalesOrderArgs, 'value'>>;
  createSalesOrderItem?: Resolver<ResolversTypes['SalesOrderItems'], ParentType, ContextType, RequireFields<WmsMutationCreateSalesOrderItemArgs, 'value'>>;
  createStockTransfer?: Resolver<ResolversTypes['StockTransfers'], ParentType, ContextType, RequireFields<WmsMutationCreateStockTransferArgs, 'value'>>;
  createSupplier?: Resolver<ResolversTypes['Suppliers'], ParentType, ContextType, RequireFields<WmsMutationCreateSupplierArgs, 'value'>>;
  createTask?: Resolver<ResolversTypes['Tasks'], ParentType, ContextType, RequireFields<WmsMutationCreateTaskArgs, 'value'>>;
  createTaskItem?: Resolver<ResolversTypes['TaskItems'], ParentType, ContextType, RequireFields<WmsMutationCreateTaskItemArgs, 'value'>>;
  createWarehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType, RequireFields<WmsMutationCreateWarehouseArgs, 'value'>>;
  createWmsProduct?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType, RequireFields<WmsMutationCreateWmsProductArgs, 'value'>>;
  removeBinThreshold?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveBinThresholdArgs, 'id'>>;
  removeInboundShipment?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveInboundShipmentArgs, 'id'>>;
  removeInboundShipmentItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveInboundShipmentItemArgs, 'id'>>;
  removeInventoryAdjustment?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveInventoryAdjustmentArgs, 'id'>>;
  removeInventoryBatch?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveInventoryBatchArgs, 'id'>>;
  removeInventoryStock?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveInventoryStockArgs, 'id'>>;
  removeLocation?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveLocationArgs, 'id'>>;
  removeOutboundShipment?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveOutboundShipmentArgs, 'id'>>;
  removeOutboundShipmentItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveOutboundShipmentItemArgs, 'id'>>;
  removePackage?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemovePackageArgs, 'id'>>;
  removePackageItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemovePackageItemArgs, 'id'>>;
  removePickBatch?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemovePickBatchArgs, 'id'>>;
  removePickBatchItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemovePickBatchItemArgs, 'id'>>;
  removePutawayRule?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemovePutawayRuleArgs, 'id'>>;
  removeReorderPoint?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveReorderPointArgs, 'id'>>;
  removeReturn?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveReturnArgs, 'id'>>;
  removeReturnItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveReturnItemArgs, 'id'>>;
  removeSalesOrder?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveSalesOrderArgs, 'id'>>;
  removeSalesOrderItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveSalesOrderItemArgs, 'id'>>;
  removeStockTransfer?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveStockTransferArgs, 'id'>>;
  removeSupplier?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveSupplierArgs, 'id'>>;
  removeTask?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveTaskArgs, 'id'>>;
  removeTaskItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveTaskItemArgs, 'id'>>;
  removeWarehouse?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveWarehouseArgs, 'id'>>;
  removeWmsProduct?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationRemoveWmsProductArgs, 'id'>>;
  updateBinThreshold?: Resolver<ResolversTypes['BinThresholds'], ParentType, ContextType, RequireFields<WmsMutationUpdateBinThresholdArgs, 'id'>>;
  updateInboundShipment?: Resolver<ResolversTypes['InboundShipments'], ParentType, ContextType, RequireFields<WmsMutationUpdateInboundShipmentArgs, 'id'>>;
  updateInboundShipmentItem?: Resolver<ResolversTypes['InboundShipmentItems'], ParentType, ContextType, RequireFields<WmsMutationUpdateInboundShipmentItemArgs, 'id'>>;
  updateInventoryAdjustment?: Resolver<ResolversTypes['InventoryAdjustments'], ParentType, ContextType, RequireFields<WmsMutationUpdateInventoryAdjustmentArgs, 'id'>>;
  updateInventoryBatch?: Resolver<ResolversTypes['InventoryBatches'], ParentType, ContextType, RequireFields<WmsMutationUpdateInventoryBatchArgs, 'id'>>;
  updateInventoryStock?: Resolver<ResolversTypes['InventoryStock'], ParentType, ContextType, RequireFields<WmsMutationUpdateInventoryStockArgs, 'id'>>;
  updateLocation?: Resolver<ResolversTypes['Locations'], ParentType, ContextType, RequireFields<WmsMutationUpdateLocationArgs, 'id'>>;
  updateOutboundShipment?: Resolver<ResolversTypes['OutboundShipments'], ParentType, ContextType, RequireFields<WmsMutationUpdateOutboundShipmentArgs, 'id'>>;
  updateOutboundShipmentItem?: Resolver<ResolversTypes['OutboundShipmentItems'], ParentType, ContextType, RequireFields<WmsMutationUpdateOutboundShipmentItemArgs, 'id'>>;
  updatePackage?: Resolver<ResolversTypes['Packages'], ParentType, ContextType, RequireFields<WmsMutationUpdatePackageArgs, 'id'>>;
  updatePackageItem?: Resolver<ResolversTypes['PackageItems'], ParentType, ContextType, RequireFields<WmsMutationUpdatePackageItemArgs, 'id'>>;
  updatePickBatch?: Resolver<ResolversTypes['PickBatches'], ParentType, ContextType, RequireFields<WmsMutationUpdatePickBatchArgs, 'id'>>;
  updatePickBatchItem?: Resolver<ResolversTypes['PickBatchItems'], ParentType, ContextType, RequireFields<WmsMutationUpdatePickBatchItemArgs, 'id'>>;
  updatePutawayRule?: Resolver<ResolversTypes['PutawayRules'], ParentType, ContextType, RequireFields<WmsMutationUpdatePutawayRuleArgs, 'id'>>;
  updateReorderPoint?: Resolver<ResolversTypes['ReorderPoints'], ParentType, ContextType, RequireFields<WmsMutationUpdateReorderPointArgs, 'id'>>;
  updateReturn?: Resolver<ResolversTypes['Returns'], ParentType, ContextType, RequireFields<WmsMutationUpdateReturnArgs, 'id'>>;
  updateReturnItem?: Resolver<ResolversTypes['ReturnItems'], ParentType, ContextType, RequireFields<WmsMutationUpdateReturnItemArgs, 'id'>>;
  updateSalesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType, RequireFields<WmsMutationUpdateSalesOrderArgs, 'id'>>;
  updateSalesOrderItem?: Resolver<ResolversTypes['SalesOrderItems'], ParentType, ContextType, RequireFields<WmsMutationUpdateSalesOrderItemArgs, 'id'>>;
  updateStockTransfer?: Resolver<ResolversTypes['StockTransfers'], ParentType, ContextType, RequireFields<WmsMutationUpdateStockTransferArgs, 'id'>>;
  updateSupplier?: Resolver<ResolversTypes['Suppliers'], ParentType, ContextType, RequireFields<WmsMutationUpdateSupplierArgs, 'id'>>;
  updateTask?: Resolver<ResolversTypes['Tasks'], ParentType, ContextType, RequireFields<WmsMutationUpdateTaskArgs, 'id'>>;
  updateTaskItem?: Resolver<ResolversTypes['TaskItems'], ParentType, ContextType, RequireFields<WmsMutationUpdateTaskItemArgs, 'id'>>;
  updateWarehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType, RequireFields<WmsMutationUpdateWarehouseArgs, 'id'>>;
  updateWmsProduct?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType, RequireFields<WmsMutationUpdateWmsProductArgs, 'id'>>;
};

export type WmsProductsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WmsProducts'] = ResolversParentTypes['WmsProducts']> = {
  adjustments?: Resolver<Maybe<Array<ResolversTypes['InventoryAdjustments']>>, ParentType, ContextType>;
  barcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  batches?: Resolver<Maybe<Array<ResolversTypes['InventoryBatches']>>, ParentType, ContextType>;
  binThresholds?: Resolver<Maybe<Array<ResolversTypes['BinThresholds']>>, ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  costPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inboundShipmentItems?: Resolver<Maybe<Array<ResolversTypes['InboundShipmentItems']>>, ParentType, ContextType>;
  inventoryStock?: Resolver<Maybe<Array<ResolversTypes['InventoryStock']>>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outboundShipmentItems?: Resolver<Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, ParentType, ContextType>;
  packageItems?: Resolver<Maybe<Array<ResolversTypes['PackageItems']>>, ParentType, ContextType>;
  putawayRules?: Resolver<Maybe<Array<ResolversTypes['PutawayRules']>>, ParentType, ContextType>;
  reorderPoints?: Resolver<Maybe<Array<ResolversTypes['ReorderPoints']>>, ParentType, ContextType>;
  returnItems?: Resolver<Maybe<Array<ResolversTypes['ReturnItems']>>, ParentType, ContextType>;
  salesOrderItems?: Resolver<Maybe<Array<ResolversTypes['SalesOrderItems']>>, ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ProductStatus']>, ParentType, ContextType>;
  stockTransfers?: Resolver<Maybe<Array<ResolversTypes['StockTransfers']>>, ParentType, ContextType>;
  supplier?: Resolver<Maybe<ResolversTypes['Suppliers']>, ParentType, ContextType>;
  taskItems?: Resolver<Maybe<Array<ResolversTypes['TaskItems']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type WmsQueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WmsQuery'] = ResolversParentTypes['WmsQuery']> = {
  binThreshold?: Resolver<ResolversTypes['BinThresholds'], ParentType, ContextType, RequireFields<WmsQueryBinThresholdArgs, 'id'>>;
  binThresholds?: Resolver<Array<ResolversTypes['BinThresholds']>, ParentType, ContextType, Partial<WmsQueryBinThresholdsArgs>>;
  inboundShipment?: Resolver<ResolversTypes['InboundShipments'], ParentType, ContextType, RequireFields<WmsQueryInboundShipmentArgs, 'id'>>;
  inboundShipments?: Resolver<Array<ResolversTypes['InboundShipments']>, ParentType, ContextType, Partial<WmsQueryInboundShipmentsArgs>>;
  inventoryAdjustment?: Resolver<ResolversTypes['InventoryAdjustments'], ParentType, ContextType, RequireFields<WmsQueryInventoryAdjustmentArgs, 'id'>>;
  inventoryAdjustments?: Resolver<Array<ResolversTypes['InventoryAdjustments']>, ParentType, ContextType, Partial<WmsQueryInventoryAdjustmentsArgs>>;
  inventoryBatch?: Resolver<ResolversTypes['InventoryBatches'], ParentType, ContextType, RequireFields<WmsQueryInventoryBatchArgs, 'id'>>;
  inventoryBatches?: Resolver<Array<ResolversTypes['InventoryBatches']>, ParentType, ContextType, Partial<WmsQueryInventoryBatchesArgs>>;
  inventoryStock?: Resolver<ResolversTypes['InventoryStock'], ParentType, ContextType, RequireFields<WmsQueryInventoryStockArgs, 'id'>>;
  inventoryStocks?: Resolver<Array<ResolversTypes['InventoryStock']>, ParentType, ContextType, Partial<WmsQueryInventoryStocksArgs>>;
  location?: Resolver<ResolversTypes['Locations'], ParentType, ContextType, RequireFields<WmsQueryLocationArgs, 'id'>>;
  locations?: Resolver<Array<ResolversTypes['Locations']>, ParentType, ContextType, Partial<WmsQueryLocationsArgs>>;
  outboundShipment?: Resolver<ResolversTypes['OutboundShipments'], ParentType, ContextType, RequireFields<WmsQueryOutboundShipmentArgs, 'id'>>;
  outboundShipments?: Resolver<Array<ResolversTypes['OutboundShipments']>, ParentType, ContextType, Partial<WmsQueryOutboundShipmentsArgs>>;
  package?: Resolver<ResolversTypes['Packages'], ParentType, ContextType, RequireFields<WmsQueryPackageArgs, 'id'>>;
  packages?: Resolver<Array<ResolversTypes['Packages']>, ParentType, ContextType, Partial<WmsQueryPackagesArgs>>;
  pickBatch?: Resolver<ResolversTypes['PickBatches'], ParentType, ContextType, RequireFields<WmsQueryPickBatchArgs, 'id'>>;
  pickBatches?: Resolver<Array<ResolversTypes['PickBatches']>, ParentType, ContextType, Partial<WmsQueryPickBatchesArgs>>;
  putawayRule?: Resolver<ResolversTypes['PutawayRules'], ParentType, ContextType, RequireFields<WmsQueryPutawayRuleArgs, 'id'>>;
  putawayRules?: Resolver<Array<ResolversTypes['PutawayRules']>, ParentType, ContextType, Partial<WmsQueryPutawayRulesArgs>>;
  reorderPoint?: Resolver<ResolversTypes['ReorderPoints'], ParentType, ContextType, RequireFields<WmsQueryReorderPointArgs, 'id'>>;
  reorderPoints?: Resolver<Array<ResolversTypes['ReorderPoints']>, ParentType, ContextType, Partial<WmsQueryReorderPointsArgs>>;
  return?: Resolver<ResolversTypes['Returns'], ParentType, ContextType, RequireFields<WmsQueryReturnArgs, 'id'>>;
  returns?: Resolver<Array<ResolversTypes['Returns']>, ParentType, ContextType, Partial<WmsQueryReturnsArgs>>;
  salesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType, RequireFields<WmsQuerySalesOrderArgs, 'id'>>;
  salesOrders?: Resolver<Array<ResolversTypes['SalesOrders']>, ParentType, ContextType, Partial<WmsQuerySalesOrdersArgs>>;
  stockTransfer?: Resolver<ResolversTypes['StockTransfers'], ParentType, ContextType, RequireFields<WmsQueryStockTransferArgs, 'id'>>;
  stockTransfers?: Resolver<Array<ResolversTypes['StockTransfers']>, ParentType, ContextType, Partial<WmsQueryStockTransfersArgs>>;
  supplier?: Resolver<ResolversTypes['Suppliers'], ParentType, ContextType, RequireFields<WmsQuerySupplierArgs, 'id'>>;
  suppliers?: Resolver<Array<ResolversTypes['Suppliers']>, ParentType, ContextType, Partial<WmsQuerySuppliersArgs>>;
  task?: Resolver<ResolversTypes['Tasks'], ParentType, ContextType, RequireFields<WmsQueryTaskArgs, 'id'>>;
  tasks?: Resolver<Array<ResolversTypes['Tasks']>, ParentType, ContextType, Partial<WmsQueryTasksArgs>>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType, RequireFields<WmsQueryWarehouseArgs, 'id'>>;
  warehouses?: Resolver<Array<ResolversTypes['Warehouses']>, ParentType, ContextType, Partial<WmsQueryWarehousesArgs>>;
  wmsProduct?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType, RequireFields<WmsQueryWmsProductArgs, 'id'>>;
  wmsProducts?: Resolver<Array<ResolversTypes['WmsProducts']>, ParentType, ContextType, Partial<WmsQueryWmsProductsArgs>>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  AccountTransactions?: AccountTransactionsResolvers<ContextType>;
  AccountingSyncLogs?: AccountingSyncLogsResolvers<ContextType>;
  Attachments?: AttachmentsResolvers<ContextType>;
  BillingInvoiceStatus?: BillingInvoiceStatusResolvers;
  BillingInvoices?: BillingInvoicesResolvers<ContextType>;
  BillingMutation?: BillingMutationResolvers<ContextType>;
  BillingQuery?: BillingQueryResolvers<ContextType>;
  BinThresholds?: BinThresholdsResolvers<ContextType>;
  Campaigns?: CampaignsResolvers<ContextType>;
  CarrierRateUnit?: CarrierRateUnitResolvers;
  CarrierRates?: CarrierRatesResolvers<ContextType>;
  Carriers?: CarriersResolvers<ContextType>;
  CasePriority?: CasePriorityResolvers;
  CaseStatus?: CaseStatusResolvers;
  CaseType?: CaseTypeResolvers;
  Cases?: CasesResolvers<ContextType>;
  ClientAccounts?: ClientAccountsResolvers<ContextType>;
  Companies?: CompaniesResolvers<ContextType>;
  Contacts?: ContactsResolvers<ContextType>;
  CreditNotes?: CreditNotesResolvers<ContextType>;
  CrmMutation?: CrmMutationResolvers<ContextType>;
  CrmQuery?: CrmQueryResolvers<ContextType>;
  Currency?: CurrencyResolvers;
  CustomerTrackingLinks?: CustomerTrackingLinksResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteResult?: DeleteResultResolvers<ContextType>;
  DeliveryFailureReason?: DeliveryFailureReasonResolvers;
  DeliveryRouteStatus?: DeliveryRouteStatusResolvers;
  DeliveryRoutes?: DeliveryRoutesResolvers<ContextType>;
  DeliveryTaskStatus?: DeliveryTaskStatusResolvers;
  DeliveryTasks?: DeliveryTasksResolvers<ContextType>;
  DisputeStatus?: DisputeStatusResolvers;
  Disputes?: DisputesResolvers<ContextType>;
  DmsMutation?: DmsMutationResolvers<ContextType>;
  DmsProofOfDeliveries?: DmsProofOfDeliveriesResolvers<ContextType>;
  DmsQuery?: DmsQueryResolvers<ContextType>;
  DocumentType?: DocumentTypeResolvers;
  Documents?: DocumentsResolvers<ContextType>;
  DriverLocations?: DriverLocationsResolvers<ContextType>;
  DriverScheduleReason?: DriverScheduleReasonResolvers;
  DriverSchedules?: DriverSchedulesResolvers<ContextType>;
  DriverStatus?: DriverStatusResolvers;
  Drivers?: DriversResolvers<ContextType>;
  ExpenseStatus?: ExpenseStatusResolvers;
  ExpenseType?: ExpenseTypeResolvers;
  Expenses?: ExpensesResolvers<ContextType>;
  File?: GraphQLScalarType;
  GeofenceEventType?: GeofenceEventTypeResolvers;
  GeofenceEvents?: GeofenceEventsResolvers<ContextType>;
  Geofences?: GeofencesResolvers<ContextType>;
  GpsPings?: GpsPingsResolvers<ContextType>;
  InboundShipmentItems?: InboundShipmentItemsResolvers<ContextType>;
  InboundShipmentStatus?: InboundShipmentStatusResolvers;
  InboundShipments?: InboundShipmentsResolvers<ContextType>;
  InteractionType?: InteractionTypeResolvers;
  Interactions?: InteractionsResolvers<ContextType>;
  InventoryAdjustmentReason?: InventoryAdjustmentReasonResolvers;
  InventoryAdjustments?: InventoryAdjustmentsResolvers<ContextType>;
  InventoryBatches?: InventoryBatchesResolvers<ContextType>;
  InventoryStock?: InventoryStockResolvers<ContextType>;
  InventoryStockStatus?: InventoryStockStatusResolvers;
  InvoiceItems?: InvoiceItemsResolvers<ContextType>;
  InvoiceLineItems?: InvoiceLineItemsResolvers<ContextType>;
  InvoiceStatus?: InvoiceStatusResolvers;
  Invoices?: InvoicesResolvers<ContextType>;
  LeadSource?: LeadSourceResolvers;
  LeadStatus?: LeadStatusResolvers;
  Leads?: LeadsResolvers<ContextType>;
  LocationType?: LocationTypeResolvers;
  Locations?: LocationsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notifications?: NotificationsResolvers<ContextType>;
  Opportunities?: OpportunitiesResolvers<ContextType>;
  OpportunityProducts?: OpportunityProductsResolvers<ContextType>;
  OpportunitySource?: OpportunitySourceResolvers;
  OpportunityStage?: OpportunityStageResolvers;
  OutboundShipmentItems?: OutboundShipmentItemsResolvers<ContextType>;
  OutboundShipmentStatus?: OutboundShipmentStatusResolvers;
  OutboundShipments?: OutboundShipmentsResolvers<ContextType>;
  PackageItems?: PackageItemsResolvers<ContextType>;
  Packages?: PackagesResolvers<ContextType>;
  PartnerInvoiceItems?: PartnerInvoiceItemsResolvers<ContextType>;
  PartnerInvoiceStatus?: PartnerInvoiceStatusResolvers;
  PartnerInvoices?: PartnerInvoicesResolvers<ContextType>;
  PaymentMethod?: PaymentMethodResolvers;
  PaymentStatus?: PaymentStatusResolvers;
  Payments?: PaymentsResolvers<ContextType>;
  PickBatchItems?: PickBatchItemsResolvers<ContextType>;
  PickBatchStatus?: PickBatchStatusResolvers;
  PickBatches?: PickBatchesResolvers<ContextType>;
  PickStrategy?: PickStrategyResolvers;
  PricingModel?: PricingModelResolvers;
  ProductStatus?: ProductStatusResolvers;
  ProductType?: ProductTypeResolvers;
  Products?: ProductsResolvers<ContextType>;
  ProofOfDeliveries?: ProofOfDeliveriesResolvers<ContextType>;
  ProofOfDeliveryType?: ProofOfDeliveryTypeResolvers;
  ProofType?: ProofTypeResolvers;
  PutawayRules?: PutawayRulesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QuoteStatus?: QuoteStatusResolvers;
  Quotes?: QuotesResolvers<ContextType>;
  RateCards?: RateCardsResolvers<ContextType>;
  RateRules?: RateRulesResolvers<ContextType>;
  RecordType?: RecordTypeResolvers;
  ReorderPoints?: ReorderPointsResolvers<ContextType>;
  ReturnItemCondition?: ReturnItemConditionResolvers;
  ReturnItems?: ReturnItemsResolvers<ContextType>;
  ReturnStatus?: ReturnStatusResolvers;
  Returns?: ReturnsResolvers<ContextType>;
  Routes?: RoutesResolvers<ContextType>;
  SalesOrderItems?: SalesOrderItemsResolvers<ContextType>;
  SalesOrderStatus?: SalesOrderStatusResolvers;
  SalesOrders?: SalesOrdersResolvers<ContextType>;
  ServiceType?: ServiceTypeResolvers;
  ShipmentLegEvents?: ShipmentLegEventsResolvers<ContextType>;
  ShipmentLegStatus?: ShipmentLegStatusResolvers;
  ShipmentLegs?: ShipmentLegsResolvers<ContextType>;
  StockTransferStatus?: StockTransferStatusResolvers;
  StockTransfers?: StockTransfersResolvers<ContextType>;
  Suppliers?: SuppliersResolvers<ContextType>;
  SurchargeCalculationMethod?: SurchargeCalculationMethodResolvers;
  Surcharges?: SurchargesResolvers<ContextType>;
  SyncStatus?: SyncStatusResolvers;
  TaskEventStatus?: TaskEventStatusResolvers;
  TaskEvents?: TaskEventsResolvers<ContextType>;
  TaskItemStatus?: TaskItemStatusResolvers;
  TaskItems?: TaskItemsResolvers<ContextType>;
  TaskStatus?: TaskStatusResolvers;
  TaskType?: TaskTypeResolvers;
  Tasks?: TasksResolvers<ContextType>;
  TmsMutation?: TmsMutationResolvers<ContextType>;
  TmsQuery?: TmsQueryResolvers<ContextType>;
  TransactionType?: TransactionTypeResolvers;
  TripStatus?: TripStatusResolvers;
  TripStopStatus?: TripStopStatusResolvers;
  TripStops?: TripStopsResolvers<ContextType>;
  Trips?: TripsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VehicleMaintenance?: VehicleMaintenanceResolvers<ContextType>;
  VehicleServiceType?: VehicleServiceTypeResolvers;
  VehicleStatus?: VehicleStatusResolvers;
  Vehicles?: VehiclesResolvers<ContextType>;
  Warehouses?: WarehousesResolvers<ContextType>;
  WmsMutation?: WmsMutationResolvers<ContextType>;
  WmsProducts?: WmsProductsResolvers<ContextType>;
  WmsQuery?: WmsQueryResolvers<ContextType>;
};

