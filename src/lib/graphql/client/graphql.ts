/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
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
  /**
   * Implement the DateTime<FixedOffset> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  /**
   * ISO 8601 calendar date without timezone.
   * Format: %Y-%m-%d
   *
   * # Examples
   *
   * * `1994-11-13`
   * * `2000-02-24`
   */
  NaiveDate: { input: any; output: any; }
  /**
   * ISO 8601 combined date and time without timezone.
   *
   * # Examples
   *
   * * `2015-07-01T08:59:60.123`,
   */
  NaiveDateTime: { input: any; output: any; }
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
   * Strings within GraphQL. UUIDs are used to assign unique identifiers to
   * entities without requiring a central allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique Identifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: { input: any; output: any; }
  /** URL is a String implementing the [URL Standard](http://url.spec.whatwg.org/) */
  Url: { input: any; output: any; }
};

export type AuthMutations = {
  __typename?: 'AuthMutations';
  refreshToken: Users;
  signInEmail: SignInResponse;
  signUpEmail: AuthUser;
};


export type AuthMutationsSignInEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type AuthMutationsSignUpEmailArgs = {
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['Url']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};

export type AuthQuery = {
  __typename?: 'AuthQuery';
  user?: Maybe<AuthUser>;
  users: Array<AuthUser>;
};


export type AuthQueryUserArgs = {
  id: Scalars['UUID']['input'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  banExpires?: Maybe<Scalars['NaiveDateTime']['output']>;
  banReason?: Maybe<Scalars['String']['output']>;
  banned?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['NaiveDateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['UUID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['NaiveDateTime']['output'];
};

export type BillingAccountTransaction = {
  __typename?: 'BillingAccountTransaction';
  amount: Scalars['Decimal']['output'];
  clientAccount: BillingClientAccount;
  clientAccountId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  processedByUserId?: Maybe<Scalars['UUID']['output']>;
  referenceNumber?: Maybe<Scalars['String']['output']>;
  runningBalance?: Maybe<Scalars['Decimal']['output']>;
  sourceRecordId?: Maybe<Scalars['UUID']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  transactionDate?: Maybe<Scalars['NaiveDateTime']['output']>;
  type: TransactionTypeEnum;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingAccountingSyncLog = {
  __typename?: 'BillingAccountingSyncLog';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  externalSystem: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastSyncAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  nextRetryAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  recordId: Scalars['UUID']['output'];
  recordType: Scalars['String']['output'];
  requestPayload?: Maybe<Scalars['String']['output']>;
  responsePayload?: Maybe<Scalars['String']['output']>;
  retryCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<SyncStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingClientAccount = {
  __typename?: 'BillingClientAccount';
  accountTransactions: Array<BillingAccountTransaction>;
  availableCredit?: Maybe<Scalars['Decimal']['output']>;
  client: CrmCompany;
  clientId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  creditLimit?: Maybe<Scalars['Decimal']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isCreditApproved?: Maybe<Scalars['Boolean']['output']>;
  lastPaymentDate?: Maybe<Scalars['NaiveDate']['output']>;
  paymentTermsDays?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  walletBalance?: Maybe<Scalars['Decimal']['output']>;
};

export type BillingCreditNote = {
  __typename?: 'BillingCreditNote';
  amount: Scalars['Decimal']['output'];
  appliedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdByUserId?: Maybe<Scalars['UUID']['output']>;
  creditNoteNumber: Scalars['String']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  dispute?: Maybe<BillingDispute>;
  disputeId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoice;
  invoiceId: Scalars['UUID']['output'];
  issueDate: Scalars['NaiveDate']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingDispute = {
  __typename?: 'BillingDispute';
  client: CrmCompany;
  clientId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  creditNotes: Array<BillingCreditNote>;
  disputedAmount?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['UUID']['output'];
  lineItem: BillingInvoiceLineItem;
  lineItemId: Scalars['UUID']['output'];
  reason: Scalars['String']['output'];
  resolutionNotes?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  resolvedByUser?: Maybe<AuthUser>;
  resolvedByUserId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<DisputeStatusEnum>;
  submittedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingDocument = {
  __typename?: 'BillingDocument';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  documentType: DocumentTypeEnum;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  fileSize?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId: Scalars['UUID']['output'];
  recordType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  uploadedByUser?: Maybe<AuthUser>;
  uploadedByUserId?: Maybe<Scalars['UUID']['output']>;
};

export type BillingInvoice = {
  __typename?: 'BillingInvoice';
  amountOutstanding?: Maybe<Scalars['Decimal']['output']>;
  amountPaid?: Maybe<Scalars['Decimal']['output']>;
  client: CrmCompany;
  clientId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdByUserId?: Maybe<Scalars['UUID']['output']>;
  creditNotes: Array<BillingCreditNote>;
  currency?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['Decimal']['output']>;
  dueDate: Scalars['NaiveDate']['output'];
  id: Scalars['UUID']['output'];
  invoiceLineItems: Array<BillingInvoiceLineItem>;
  invoiceNumber: Scalars['String']['output'];
  issueDate: Scalars['NaiveDate']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  paymentTerms?: Maybe<Scalars['String']['output']>;
  payments: Array<BillingPayment>;
  quote?: Maybe<BillingQuote>;
  quoteId?: Maybe<Scalars['UUID']['output']>;
  sentAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  status?: Maybe<InvoiceStatusEnum>;
  subtotal?: Maybe<Scalars['Decimal']['output']>;
  taxAmount?: Maybe<Scalars['Decimal']['output']>;
  totalAmount: Scalars['Decimal']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingInvoiceLineItem = {
  __typename?: 'BillingInvoiceLineItem';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  description: Scalars['String']['output'];
  discountAmount?: Maybe<Scalars['Decimal']['output']>;
  discountRate?: Maybe<Scalars['Decimal']['output']>;
  disputes: Array<BillingDispute>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoice;
  invoiceId: Scalars['UUID']['output'];
  lineTotal?: Maybe<Scalars['Decimal']['output']>;
  quantity: Scalars['Decimal']['output'];
  sourceRecordId?: Maybe<Scalars['UUID']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  taxAmount?: Maybe<Scalars['Decimal']['output']>;
  taxRate?: Maybe<Scalars['Decimal']['output']>;
  totalPrice?: Maybe<Scalars['Decimal']['output']>;
  unitPrice: Scalars['Decimal']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingMutations = {
  __typename?: 'BillingMutations';
  createAccountTransaction: BillingAccountTransaction;
  createAccountingSyncLog: BillingAccountingSyncLog;
  createClientAccount: BillingClientAccount;
  createCreditNote: BillingCreditNote;
  createDispute: BillingDispute;
  createDocument: BillingDocument;
  createInvoice: BillingInvoice;
  createInvoiceLineItem: BillingInvoiceLineItem;
  createPayment: BillingPayment;
  createQuote: BillingQuote;
  createRateCard: BillingRateCard;
  createRateRule: BillingRateRule;
  createSurcharge: BillingSurcharge;
  deleteAccountTransaction: Scalars['Boolean']['output'];
  deleteAccountingSyncLog: Scalars['Boolean']['output'];
  deleteClientAccount: Scalars['Boolean']['output'];
  deleteCreditNote: Scalars['Boolean']['output'];
  deleteDispute: Scalars['Boolean']['output'];
  deleteDocument: Scalars['Boolean']['output'];
  deleteInvoice: Scalars['Boolean']['output'];
  deleteInvoiceLineItem: Scalars['Boolean']['output'];
  deletePayment: Scalars['Boolean']['output'];
  deleteQuote: Scalars['Boolean']['output'];
  deleteRateCard: Scalars['Boolean']['output'];
  deleteRateRule: Scalars['Boolean']['output'];
  deleteSurcharge: Scalars['Boolean']['output'];
  updateAccountTransaction: BillingAccountTransaction;
  updateAccountingSyncLog: BillingAccountingSyncLog;
  updateClientAccount: BillingClientAccount;
  updateCreditNote: BillingCreditNote;
  updateDispute: BillingDispute;
  updateDocument: BillingDocument;
  updateInvoice: BillingInvoice;
  updateInvoiceLineItem: BillingInvoiceLineItem;
  updatePayment: BillingPayment;
  updateQuote: BillingQuote;
  updateRateCard: BillingRateCard;
  updateRateRule: BillingRateRule;
  updateSurcharge: BillingSurcharge;
};


export type BillingMutationsCreateAccountTransactionArgs = {
  value: InsertAccountTransaction;
};


export type BillingMutationsCreateAccountingSyncLogArgs = {
  value: InsertAccountingSyncLog;
};


export type BillingMutationsCreateClientAccountArgs = {
  value: InsertClientAccount;
};


export type BillingMutationsCreateCreditNoteArgs = {
  value: InsertCreditNote;
};


export type BillingMutationsCreateDisputeArgs = {
  value: InsertDispute;
};


export type BillingMutationsCreateDocumentArgs = {
  value: InsertDocument;
};


export type BillingMutationsCreateInvoiceArgs = {
  value: InsertInvoice;
};


export type BillingMutationsCreateInvoiceLineItemArgs = {
  value: InsertInvoiceLineItem;
};


export type BillingMutationsCreatePaymentArgs = {
  value: InsertPayment;
};


export type BillingMutationsCreateQuoteArgs = {
  value: InsertQuote;
};


export type BillingMutationsCreateRateCardArgs = {
  value: InsertRateCard;
};


export type BillingMutationsCreateRateRuleArgs = {
  value: InsertRateRule;
};


export type BillingMutationsCreateSurchargeArgs = {
  value: InsertSurcharge;
};


export type BillingMutationsDeleteAccountTransactionArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteAccountingSyncLogArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteClientAccountArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteCreditNoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteDisputeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteDocumentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteInvoiceLineItemArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeletePaymentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteQuoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteRateCardArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteRateRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteSurchargeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountTransactionArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateAccountTransaction;
};


export type BillingMutationsUpdateAccountingSyncLogArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateAccountingSyncLog;
};


export type BillingMutationsUpdateClientAccountArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateClientAccount;
};


export type BillingMutationsUpdateCreditNoteArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCreditNote;
};


export type BillingMutationsUpdateDisputeArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDispute;
};


export type BillingMutationsUpdateDocumentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDocument;
};


export type BillingMutationsUpdateInvoiceArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInvoice;
};


export type BillingMutationsUpdateInvoiceLineItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInvoiceLineItem;
};


export type BillingMutationsUpdatePaymentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePayment;
};


export type BillingMutationsUpdateQuoteArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateQuote;
};


export type BillingMutationsUpdateRateCardArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateRateCard;
};


export type BillingMutationsUpdateRateRuleArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateRateRule;
};


export type BillingMutationsUpdateSurchargeArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateSurcharge;
};

export type BillingPayment = {
  __typename?: 'BillingPayment';
  amount: Scalars['Decimal']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  exchangeRate?: Maybe<Scalars['Decimal']['output']>;
  fees?: Maybe<Scalars['Decimal']['output']>;
  gatewayReference?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoice;
  invoiceId: Scalars['UUID']['output'];
  netAmount?: Maybe<Scalars['Decimal']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  paymentDate?: Maybe<Scalars['NaiveDateTime']['output']>;
  paymentMethod: PaymentMethodEnum;
  processedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  processedByUserId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<PaymentStatusEnum>;
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingQueries = {
  __typename?: 'BillingQueries';
  accountTransaction?: Maybe<BillingAccountTransaction>;
  accountTransactions: Array<BillingAccountTransaction>;
  accountingSyncLog?: Maybe<BillingAccountingSyncLog>;
  accountingSyncLogs: Array<BillingAccountingSyncLog>;
  clientAccount?: Maybe<BillingClientAccount>;
  clientAccounts: Array<BillingClientAccount>;
  creditNote?: Maybe<BillingCreditNote>;
  creditNotes: Array<BillingCreditNote>;
  dispute?: Maybe<BillingDispute>;
  disputes: Array<BillingDispute>;
  document?: Maybe<BillingDocument>;
  documents: Array<BillingDocument>;
  invoice?: Maybe<BillingInvoice>;
  invoiceLineItem?: Maybe<BillingInvoiceLineItem>;
  invoiceLineItems: Array<BillingInvoiceLineItem>;
  invoices: Array<BillingInvoice>;
  payment?: Maybe<BillingPayment>;
  payments: Array<BillingPayment>;
  quote?: Maybe<BillingQuote>;
  quotes: Array<BillingQuote>;
  rateCard?: Maybe<BillingRateCard>;
  rateCards: Array<BillingRateCard>;
  rateRule?: Maybe<BillingRateRule>;
  rateRules: Array<BillingRateRule>;
  surcharge?: Maybe<BillingSurcharge>;
  surcharges: Array<BillingSurcharge>;
};


export type BillingQueriesAccountTransactionArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesAccountingSyncLogArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesClientAccountArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesCreditNoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesDisputeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesDocumentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesInvoiceLineItemArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesPaymentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesQuoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesRateCardArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesRateRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesSurchargeArgs = {
  id: Scalars['UUID']['input'];
};

export type BillingQuote = {
  __typename?: 'BillingQuote';
  client?: Maybe<CrmCompany>;
  clientId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdByUser?: Maybe<AuthUser>;
  createdByUserId?: Maybe<Scalars['UUID']['output']>;
  destinationDetails: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  height?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['UUID']['output'];
  invoices: Array<BillingInvoice>;
  length?: Maybe<Scalars['Decimal']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  originDetails: Scalars['String']['output'];
  quoteNumber?: Maybe<Scalars['String']['output']>;
  quotedPrice: Scalars['Decimal']['output'];
  serviceLevel?: Maybe<Scalars['String']['output']>;
  status?: Maybe<QuoteStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  volume?: Maybe<Scalars['Decimal']['output']>;
  weight?: Maybe<Scalars['Decimal']['output']>;
  width?: Maybe<Scalars['Decimal']['output']>;
};

export type BillingRateCard = {
  __typename?: 'BillingRateCard';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdByUser?: Maybe<AuthUser>;
  createdByUserId?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  rateRules: Array<BillingRateRule>;
  serviceType: ServiceTypeEnum;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  validFrom: Scalars['NaiveDate']['output'];
  validTo?: Maybe<Scalars['NaiveDate']['output']>;
};

export type BillingRateRule = {
  __typename?: 'BillingRateRule';
  condition: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  maxValue?: Maybe<Scalars['Decimal']['output']>;
  minValue?: Maybe<Scalars['Decimal']['output']>;
  price: Scalars['Decimal']['output'];
  pricingModel: PricingModelEnum;
  priority?: Maybe<Scalars['Int']['output']>;
  rateCard: BillingRateCard;
  rateCardId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  value: Scalars['String']['output'];
};

export type BillingSurcharge = {
  __typename?: 'BillingSurcharge';
  amount: Scalars['Decimal']['output'];
  calculationMethod: SurchargeCalculationMethodEnum;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  validFrom?: Maybe<Scalars['NaiveDate']['output']>;
  validTo?: Maybe<Scalars['NaiveDate']['output']>;
};

export enum CarrierRateUnitEnum {
  FlatRate = 'FLAT_RATE',
  PerContainer = 'PER_CONTAINER',
  PerKg = 'PER_KG',
  PerKm = 'PER_KM',
  PerMile = 'PER_MILE'
}

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

export type CrmAttachment = {
  __typename?: 'CrmAttachment';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId?: Maybe<Scalars['UUID']['output']>;
  recordType?: Maybe<RecordType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCampaign = {
  __typename?: 'CrmCampaign';
  budget?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  leads: Array<CrmLead>;
  name: Scalars['String']['output'];
  opportunities: Array<CrmOpportunity>;
  startDate?: Maybe<Scalars['NaiveDate']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCase = {
  __typename?: 'CrmCase';
  caseNumber: Scalars['String']['output'];
  contact?: Maybe<CrmContact>;
  contactId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  interactions: Array<CrmInteraction>;
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  priority?: Maybe<CasePriority>;
  status?: Maybe<CaseStatus>;
  type?: Maybe<CaseType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCompany = {
  __typename?: 'CrmCompany';
  annualRevenue?: Maybe<Scalars['Decimal']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  contacts: Array<CrmContact>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  leads: Array<CrmLead>;
  name: Scalars['String']['output'];
  opportunities: Array<CrmOpportunity>;
  ownerId?: Maybe<Scalars['UUID']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<AuthUser>;
  website?: Maybe<Scalars['String']['output']>;
};

export type CrmContact = {
  __typename?: 'CrmContact';
  cases: Array<CrmCase>;
  company?: Maybe<CrmCompany>;
  companyId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  interactions: Array<CrmInteraction>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  leads: Array<CrmLead>;
  name: Scalars['String']['output'];
  opportunities: Array<CrmOpportunity>;
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInteraction = {
  __typename?: 'CrmInteraction';
  case?: Maybe<CrmCase>;
  caseId?: Maybe<Scalars['UUID']['output']>;
  contact: CrmContact;
  contactId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  interactionDate?: Maybe<Scalars['DateTime']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  type?: Maybe<InteractionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
  userId: Scalars['UUID']['output'];
};

export type CrmInvoice = {
  __typename?: 'CrmInvoice';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dueDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  invoiceItems: Array<CrmInvoiceItem>;
  issueDate?: Maybe<Scalars['NaiveDate']['output']>;
  opportunity?: Maybe<CrmOpportunity>;
  opportunityId?: Maybe<Scalars['UUID']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<InvoiceStatus>;
  total?: Maybe<Scalars['Decimal']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInvoiceItem = {
  __typename?: 'CrmInvoiceItem';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  invoice: CrmInvoice;
  invoiceId: Scalars['UUID']['output'];
  price: Scalars['Decimal']['output'];
  product: CrmProduct;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmLead = {
  __typename?: 'CrmLead';
  campaign?: Maybe<CrmCampaign>;
  campaignId?: Maybe<Scalars['UUID']['output']>;
  company?: Maybe<CrmCompany>;
  contact?: Maybe<CrmContact>;
  convertedAt?: Maybe<Scalars['DateTime']['output']>;
  convertedCompanyId?: Maybe<Scalars['UUID']['output']>;
  convertedContactId?: Maybe<Scalars['UUID']['output']>;
  convertedOpportunityId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  leadScore?: Maybe<Scalars['Int']['output']>;
  leadSource?: Maybe<LeadSource>;
  name: Scalars['String']['output'];
  opportunity?: Maybe<CrmOpportunity>;
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  status?: Maybe<LeadStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmMutations = {
  __typename?: 'CrmMutations';
  createAttachment: CrmAttachment;
  createCampaign: CrmCampaign;
  createCase: CrmCase;
  createCompany: CrmCompany;
  createContact: CrmContact;
  createInteraction: CrmInteraction;
  createInvoiceItem: CrmInvoiceItem;
  deleteAttachment: Scalars['Boolean']['output'];
  deleteCampaign: Scalars['Boolean']['output'];
  deleteCase: Scalars['Boolean']['output'];
  deleteCompany: Scalars['Boolean']['output'];
  deleteContact: Scalars['Boolean']['output'];
  deleteInteraction: Scalars['Boolean']['output'];
  deleteInvoiceItem: Scalars['Boolean']['output'];
  updateAttachment: CrmAttachment;
  updateCampaign: CrmCampaign;
  updateCase: CrmCase;
  updateCompany: CrmCompany;
  updateContact: CrmContact;
  updateInteraction: CrmInteraction;
  updateInvoiceItem: CrmInvoiceItem;
};


export type CrmMutationsCreateAttachmentArgs = {
  value: InsertAttachment;
};


export type CrmMutationsCreateCampaignArgs = {
  value: InsertCampaign;
};


export type CrmMutationsCreateCaseArgs = {
  value: InsertCase;
};


export type CrmMutationsCreateCompanyArgs = {
  value: InsertCompany;
};


export type CrmMutationsCreateContactArgs = {
  value: InsertContact;
};


export type CrmMutationsCreateInteractionArgs = {
  value: InsertInteraction;
};


export type CrmMutationsCreateInvoiceItemArgs = {
  value: InsertInvoiceItem;
};


export type CrmMutationsDeleteAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateAttachmentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateAttachment;
};


export type CrmMutationsUpdateCampaignArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCampaign;
};


export type CrmMutationsUpdateCaseArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCase;
};


export type CrmMutationsUpdateCompanyArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCompany;
};


export type CrmMutationsUpdateContactArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateContact;
};


export type CrmMutationsUpdateInteractionArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInteraction;
};


export type CrmMutationsUpdateInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInvoiceItem;
};

export type CrmOpportunity = {
  __typename?: 'CrmOpportunity';
  campaign?: Maybe<CrmCampaign>;
  campaignId?: Maybe<Scalars['UUID']['output']>;
  company?: Maybe<CrmCompany>;
  companyId?: Maybe<Scalars['UUID']['output']>;
  contact?: Maybe<CrmContact>;
  contactId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dealValue?: Maybe<Scalars['Decimal']['output']>;
  expectedCloseDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  invoices: Array<CrmInvoice>;
  leads: Array<CrmLead>;
  lostReason?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  opportunityProducts: Array<CrmOpportunityProduct>;
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  probability?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<OpportunitySource>;
  stage?: Maybe<OpportunityStage>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmOpportunityProduct = {
  __typename?: 'CrmOpportunityProduct';
  opportunity: CrmOpportunity;
  opportunityId: Scalars['UUID']['output'];
  product: CrmProduct;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
};

export type CrmProduct = {
  __typename?: 'CrmProduct';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  invoiceItems: Array<CrmInvoiceItem>;
  name: Scalars['String']['output'];
  opportunityProducts: Array<CrmOpportunityProduct>;
  price: Scalars['Decimal']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmQueries = {
  __typename?: 'CrmQueries';
  attachment?: Maybe<CrmAttachment>;
  attachments: Array<CrmAttachment>;
  campaign?: Maybe<CrmCampaign>;
  campaigns: Array<CrmCampaign>;
  case?: Maybe<CrmCase>;
  cases: Array<CrmCase>;
  companies: Array<CrmCompany>;
  company?: Maybe<CrmCompany>;
  contact?: Maybe<CrmContact>;
  contacts: Array<CrmContact>;
  interaction?: Maybe<CrmInteraction>;
  interactions: Array<CrmInteraction>;
  invoiceItem?: Maybe<CrmInvoiceItem>;
  invoiceItems: Array<CrmInvoiceItem>;
};


export type CrmQueriesAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
};

export enum CurrencyEnum {
  Aud = 'AUD',
  Cad = 'CAD',
  Eur = 'EUR',
  Gbp = 'GBP',
  Jpy = 'JPY',
  Php = 'PHP',
  Usd = 'USD'
}

export enum DeliveryFailureReasonEnum {
  AccessDenied = 'ACCESS_DENIED',
  AddressNotFound = 'ADDRESS_NOT_FOUND',
  DamagedPackage = 'DAMAGED_PACKAGE',
  Other = 'OTHER',
  RecipientNotHome = 'RECIPIENT_NOT_HOME',
  RefusedDelivery = 'REFUSED_DELIVERY',
  VehicleBreakdown = 'VEHICLE_BREAKDOWN',
  WeatherConditions = 'WEATHER_CONDITIONS'
}

export enum DeliveryRouteStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Paused = 'PAUSED',
  Planned = 'PLANNED'
}

export enum DeliveryTaskStatusEnum {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  Pending = 'PENDING',
  Rescheduled = 'RESCHEDULED'
}

export enum DisputeStatusEnum {
  Approved = 'APPROVED',
  Closed = 'CLOSED',
  Denied = 'DENIED',
  Escalated = 'ESCALATED',
  Open = 'OPEN',
  UnderReview = 'UNDER_REVIEW'
}

export type DmsCustomerTrackingLink = {
  __typename?: 'DmsCustomerTrackingLink';
  accessCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  deliveryTask: DmsDeliveryTask;
  deliveryTaskId: Scalars['UUID']['output'];
  expiresAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastAccessedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  trackingToken: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type DmsDeliveryRoute = {
  __typename?: 'DmsDeliveryRoute';
  actualDurationMinutes?: Maybe<Scalars['Int']['output']>;
  completedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  deliveryTasks: Array<DmsDeliveryTask>;
  driver: TmsDriver;
  driverId: Scalars['UUID']['output'];
  estimatedDurationMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  routeDate: Scalars['NaiveDate']['output'];
  startedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  status?: Maybe<DeliveryRouteStatusEnum>;
  totalDistanceKm?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type DmsDeliveryTask = {
  __typename?: 'DmsDeliveryTask';
  actualArrivalTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  attemptCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  customerTrackingLinks: Array<DmsCustomerTrackingLink>;
  deliveryAddress: Scalars['String']['output'];
  deliveryInstructions?: Maybe<Scalars['String']['output']>;
  deliveryRoute: DmsDeliveryRoute;
  deliveryRouteId: Scalars['UUID']['output'];
  deliveryTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  failureReason?: Maybe<DeliveryFailureReasonEnum>;
  id: Scalars['UUID']['output'];
  package: WmsPackage;
  packageId: Scalars['UUID']['output'];
  proofOfDeliveries: Array<DmsProofOfDelivery>;
  recipientName?: Maybe<Scalars['String']['output']>;
  recipientPhone?: Maybe<Scalars['String']['output']>;
  routeSequence: Scalars['Int']['output'];
  status?: Maybe<DeliveryTaskStatusEnum>;
  taskEvents: Array<DmsTaskEvent>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type DmsDriverLocation = {
  __typename?: 'DmsDriverLocation';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  driver: TmsDriver;
  driverId: Scalars['UUID']['output'];
  heading?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  speedKmh?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['NaiveDateTime']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type DmsInsertProofOfDelivery = {
  deliveryTaskId: Scalars['UUID']['input'];
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  signatureData?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  type: ProofOfDeliveryTypeEnum;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export type DmsMutations = {
  __typename?: 'DmsMutations';
  createCustomerTrackingLink: DmsCustomerTrackingLink;
  createDeliveryRoute: DmsDeliveryRoute;
  createDeliveryTask: DmsDeliveryTask;
  createDriverLocation: DmsDriverLocation;
  createProofOfDelivery: DmsProofOfDelivery;
  createTaskEvent: DmsTaskEvent;
  deleteCustomerTrackingLink: Scalars['Boolean']['output'];
  deleteDeliveryRoute: Scalars['Boolean']['output'];
  deleteDeliveryTask: Scalars['Boolean']['output'];
  deleteDriverLocation: Scalars['Boolean']['output'];
  deleteProofOfDelivery: Scalars['Boolean']['output'];
  deleteTaskEvent: Scalars['Boolean']['output'];
  updateCustomerTrackingLink: DmsCustomerTrackingLink;
  updateDeliveryRoute: DmsDeliveryRoute;
  updateDeliveryTask: DmsDeliveryTask;
  updateDriverLocation: DmsDriverLocation;
  updateProofOfDelivery: DmsProofOfDelivery;
  updateTaskEvent: DmsTaskEvent;
};


export type DmsMutationsCreateCustomerTrackingLinkArgs = {
  value: InsertCustomerTrackingLink;
};


export type DmsMutationsCreateDeliveryRouteArgs = {
  value: InsertDeliveryRoute;
};


export type DmsMutationsCreateDeliveryTaskArgs = {
  value: InsertDeliveryTask;
};


export type DmsMutationsCreateDriverLocationArgs = {
  value: InsertDriverLocation;
};


export type DmsMutationsCreateProofOfDeliveryArgs = {
  value: DmsInsertProofOfDelivery;
};


export type DmsMutationsCreateTaskEventArgs = {
  value: InsertTaskEvent;
};


export type DmsMutationsDeleteCustomerTrackingLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsDeleteDeliveryRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsDeleteDeliveryTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsDeleteDriverLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsDeleteProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsDeleteTaskEventArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateCustomerTrackingLinkArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCustomerTrackingLink;
};


export type DmsMutationsUpdateDeliveryRouteArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDeliveryRoute;
};


export type DmsMutationsUpdateDeliveryTaskArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDeliveryTask;
};


export type DmsMutationsUpdateDriverLocationArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDriverLocation;
};


export type DmsMutationsUpdateProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
  value: DmsUpdateProofOfDelivery;
};


export type DmsMutationsUpdateTaskEventArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateTaskEvent;
};

export type DmsProofOfDelivery = {
  __typename?: 'DmsProofOfDelivery';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  deliveryTask: DmsDeliveryTask;
  deliveryTaskId: Scalars['UUID']['output'];
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  recipientName?: Maybe<Scalars['String']['output']>;
  signatureData?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['NaiveDateTime']['output']>;
  type: ProofOfDeliveryTypeEnum;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  verificationCode?: Maybe<Scalars['String']['output']>;
};

export type DmsQueries = {
  __typename?: 'DmsQueries';
  customerTrackingLink?: Maybe<DmsCustomerTrackingLink>;
  customerTrackingLinks: Array<DmsCustomerTrackingLink>;
  deliveryRoute?: Maybe<DmsDeliveryRoute>;
  deliveryRoutes: Array<DmsDeliveryRoute>;
  deliveryTask?: Maybe<DmsDeliveryTask>;
  deliveryTasks: Array<DmsDeliveryTask>;
  driverLocation?: Maybe<DmsDriverLocation>;
  driverLocations: Array<DmsDriverLocation>;
  proofOfDeliveries: Array<DmsProofOfDelivery>;
  proofOfDelivery?: Maybe<DmsProofOfDelivery>;
  taskEvent?: Maybe<DmsTaskEvent>;
  taskEvents: Array<DmsTaskEvent>;
};


export type DmsQueriesCustomerTrackingLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDeliveryRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDeliveryTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDriverLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesTaskEventArgs = {
  id: Scalars['UUID']['input'];
};

export type DmsTaskEvent = {
  __typename?: 'DmsTaskEvent';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  deliveryTask: DmsDeliveryTask;
  deliveryTaskId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status: TaskEventStatusEnum;
  timestamp?: Maybe<Scalars['NaiveDateTime']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type DmsUpdateProofOfDelivery = {
  deliveryTaskId?: InputMaybe<Scalars['UUID']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  signatureData?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  type?: InputMaybe<ProofOfDeliveryTypeEnum>;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export enum DocumentTypeEnum {
  Bol = 'BOL',
  CommercialInvoice = 'COMMERCIAL_INVOICE',
  CreditNote = 'CREDIT_NOTE',
  CustomsDeclaration = 'CUSTOMS_DECLARATION',
  PackingList = 'PACKING_LIST',
  ProofOfDelivery = 'PROOF_OF_DELIVERY',
  Receipt = 'RECEIPT',
  ShippingLabel = 'SHIPPING_LABEL'
}

export enum DriverScheduleReasonEnum {
  PersonalLeave = 'PERSONAL_LEAVE',
  SickLeave = 'SICK_LEAVE',
  Training = 'TRAINING',
  Vacation = 'VACATION'
}

export enum DriverStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  OnLeave = 'ON_LEAVE'
}

export enum ExpenseStatusEnum {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Reimbursed = 'REIMBURSED',
  Rejected = 'REJECTED'
}

export enum ExpenseTypeEnum {
  Accommodation = 'ACCOMMODATION',
  Fuel = 'FUEL',
  Maintenance = 'MAINTENANCE',
  Meals = 'MEALS',
  Parking = 'PARKING',
  Tolls = 'TOLLS'
}

export enum GeofenceEventTypeEnum {
  Enter = 'ENTER',
  Exit = 'EXIT'
}

export type ImsInboundShipment = {
  __typename?: 'ImsInboundShipment';
  actualArrivalDate?: Maybe<Scalars['NaiveDate']['output']>;
  client?: Maybe<CrmCompany>;
  clientId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  expectedArrivalDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  inboundShipmentItems: Array<ImsInboundShipmentItem>;
  status?: Maybe<InboundShipmentStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  warehouseId: Scalars['UUID']['output'];
};

export type ImsInboundShipmentItem = {
  __typename?: 'ImsInboundShipmentItem';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  discrepancyNotes?: Maybe<Scalars['String']['output']>;
  discrepancyQuantity?: Maybe<Scalars['Int']['output']>;
  expectedQuantity: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  inboundShipment: ImsInboundShipment;
  inboundShipmentId: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  receivedQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsInventoryAdjustment = {
  __typename?: 'ImsInventoryAdjustment';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantityChange: Scalars['Int']['output'];
  reason?: Maybe<InventoryAdjustmentReasonEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  user: AuthUser;
  userId: Scalars['UUID']['output'];
  warehouseId: Scalars['UUID']['output'];
};

export type ImsInventoryBatch = {
  __typename?: 'ImsInventoryBatch';
  batchNumber: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  expirationDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsMutations = {
  __typename?: 'ImsMutations';
  createInboundShipment: ImsInboundShipment;
  createInboundShipmentItem: ImsInboundShipmentItem;
  createInventoryAdjustment: ImsInventoryAdjustment;
  createInventoryBatch: ImsInventoryBatch;
  createOutboundShipment: ImsOutboundShipment;
  createOutboundShipmentItem: ImsOutboundShipmentItem;
  createProduct: ImsProduct;
  createReorderPoint: ImsReorderPoint;
  createReturn: ImsReturn;
  createReturnItem: ImsReturnItem;
  createSalesOrder: ImsSalesOrder;
  createSalesOrderItem: ImsSalesOrderItem;
  createStockTransfer: ImsStockTransfer;
  createSupplier: ImsSupplier;
  deleteInboundShipment: Scalars['Boolean']['output'];
  deleteInboundShipmentItem: Scalars['Boolean']['output'];
  deleteInventoryAdjustment: Scalars['Boolean']['output'];
  deleteInventoryBatch: Scalars['Boolean']['output'];
  deleteOutboundShipment: Scalars['Boolean']['output'];
  deleteOutboundShipmentItem: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteReorderPoint: Scalars['Boolean']['output'];
  deleteReturn: Scalars['Boolean']['output'];
  deleteReturnItem: Scalars['Boolean']['output'];
  deleteSalesOrder: Scalars['Boolean']['output'];
  deleteSalesOrderItem: Scalars['Boolean']['output'];
  deleteStockTransfer: Scalars['Boolean']['output'];
  deleteSupplier: Scalars['Boolean']['output'];
  updateInboundShipment: ImsInboundShipment;
  updateInboundShipmentItem: ImsInboundShipmentItem;
  updateInventoryAdjustment: ImsInventoryAdjustment;
  updateInventoryBatch: ImsInventoryBatch;
  updateOutboundShipment: ImsOutboundShipment;
  updateOutboundShipmentItem: ImsOutboundShipmentItem;
  updateProduct: ImsProduct;
  updateReorderPoint: ImsReorderPoint;
  updateReturn: ImsReturn;
  updateReturnItem: ImsReturnItem;
  updateSalesOrder: ImsSalesOrder;
  updateSalesOrderItem: ImsSalesOrderItem;
  updateStockTransfer: ImsStockTransfer;
  updateSupplier: ImsSupplier;
};


export type ImsMutationsCreateInboundShipmentArgs = {
  value: InsertInboundShipment;
};


export type ImsMutationsCreateInboundShipmentItemArgs = {
  value: InsertInboundShipmentItem;
};


export type ImsMutationsCreateInventoryAdjustmentArgs = {
  value: InsertInventoryAdjustment;
};


export type ImsMutationsCreateInventoryBatchArgs = {
  value: InsertInventoryBatch;
};


export type ImsMutationsCreateOutboundShipmentArgs = {
  value: InsertOutboundShipment;
};


export type ImsMutationsCreateOutboundShipmentItemArgs = {
  value: InsertOutboundShipmentItem;
};


export type ImsMutationsCreateProductArgs = {
  value: InsertProduct;
};


export type ImsMutationsCreateReorderPointArgs = {
  value: InsertReorderPoint;
};


export type ImsMutationsCreateReturnArgs = {
  value: InsertReturn;
};


export type ImsMutationsCreateReturnItemArgs = {
  value: InsertReturnItem;
};


export type ImsMutationsCreateSalesOrderArgs = {
  value: InsertSalesOrder;
};


export type ImsMutationsCreateSalesOrderItemArgs = {
  value: InsertSalesOrderItem;
};


export type ImsMutationsCreateStockTransferArgs = {
  value: InsertStockTransfer;
};


export type ImsMutationsCreateSupplierArgs = {
  value: InsertSupplier;
};


export type ImsMutationsDeleteInboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteInboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteInventoryAdjustmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteInventoryBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteOutboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteOutboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteProductArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteReorderPointArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteReturnArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteReturnItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteSalesOrderArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteSalesOrderItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteStockTransferArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteSupplierArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsUpdateInboundShipmentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInboundShipment;
};


export type ImsMutationsUpdateInboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInboundShipmentItem;
};


export type ImsMutationsUpdateInventoryAdjustmentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInventoryAdjustment;
};


export type ImsMutationsUpdateInventoryBatchArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInventoryBatch;
};


export type ImsMutationsUpdateOutboundShipmentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateOutboundShipment;
};


export type ImsMutationsUpdateOutboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateOutboundShipmentItem;
};


export type ImsMutationsUpdateProductArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateProduct;
};


export type ImsMutationsUpdateReorderPointArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateReorderPoint;
};


export type ImsMutationsUpdateReturnArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateReturn;
};


export type ImsMutationsUpdateReturnItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateReturnItem;
};


export type ImsMutationsUpdateSalesOrderArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateSalesOrder;
};


export type ImsMutationsUpdateSalesOrderItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateSalesOrderItem;
};


export type ImsMutationsUpdateStockTransferArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateStockTransfer;
};


export type ImsMutationsUpdateSupplierArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateSupplier;
};

export type ImsOutboundShipment = {
  __typename?: 'ImsOutboundShipment';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  outboundShipmentItems: Array<ImsOutboundShipmentItem>;
  salesOrder: ImsSalesOrder;
  salesOrderId: Scalars['UUID']['output'];
  status?: Maybe<OutboundShipmentStatusEnum>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  warehouseId: Scalars['UUID']['output'];
};

export type ImsOutboundShipmentItem = {
  __typename?: 'ImsOutboundShipmentItem';
  batch?: Maybe<ImsInventoryBatch>;
  batchId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  outboundShipment: ImsOutboundShipment;
  outboundShipmentId: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantityShipped: Scalars['Int']['output'];
  salesOrderItem: ImsSalesOrderItem;
  salesOrderItemId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsProduct = {
  __typename?: 'ImsProduct';
  barcode?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['UUID']['output']>;
  company?: Maybe<CrmCompany>;
  costPrice?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  inboundShipmentItems: Array<ImsInboundShipmentItem>;
  inventoryAdjustments: Array<ImsInventoryAdjustment>;
  inventoryBatches: Array<ImsInventoryBatch>;
  length?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  outboundShipmentItems: Array<ImsOutboundShipmentItem>;
  reorderPoints: Array<ImsReorderPoint>;
  returnItems: Array<ImsReturnItem>;
  salesOrderItems: Array<ImsSalesOrderItem>;
  sku: Scalars['String']['output'];
  status?: Maybe<ProductStatusEnum>;
  stockTransfers: Array<ImsStockTransfer>;
  supplier?: Maybe<ImsSupplier>;
  supplierId?: Maybe<Scalars['UUID']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type ImsQueries = {
  __typename?: 'ImsQueries';
  inboundShipment?: Maybe<ImsInboundShipment>;
  inboundShipmentItem?: Maybe<ImsInboundShipmentItem>;
  inboundShipmentItems: Array<ImsInboundShipmentItem>;
  inboundShipments: Array<ImsInboundShipment>;
  inventoryAdjustment?: Maybe<ImsInventoryAdjustment>;
  inventoryAdjustments: Array<ImsInventoryAdjustment>;
  inventoryBatch?: Maybe<ImsInventoryBatch>;
  inventoryBatches: Array<ImsInventoryBatch>;
  outboundShipment?: Maybe<ImsOutboundShipment>;
  outboundShipmentItem?: Maybe<ImsOutboundShipmentItem>;
  outboundShipmentItems: Array<ImsOutboundShipmentItem>;
  outboundShipments: Array<ImsOutboundShipment>;
  product?: Maybe<ImsProduct>;
  products: Array<ImsProduct>;
  reorderPoint?: Maybe<ImsReorderPoint>;
  reorderPoints: Array<ImsReorderPoint>;
  return?: Maybe<ImsReturn>;
  returnItem?: Maybe<ImsReturnItem>;
  returnItems: Array<ImsReturnItem>;
  returns: Array<ImsReturn>;
  salesOrder?: Maybe<ImsSalesOrder>;
  salesOrderItem?: Maybe<ImsSalesOrderItem>;
  salesOrderItems: Array<ImsSalesOrderItem>;
  salesOrders: Array<ImsSalesOrder>;
  stockTransfer?: Maybe<ImsStockTransfer>;
  stockTransfers: Array<ImsStockTransfer>;
  supplier?: Maybe<ImsSupplier>;
  suppliers: Array<ImsSupplier>;
};


export type ImsQueriesInboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesInboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesInventoryAdjustmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesInventoryBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesOutboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesOutboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesProductArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesReorderPointArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesReturnArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesReturnItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesSalesOrderArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesSalesOrderItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesStockTransferArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesSupplierArgs = {
  id: Scalars['UUID']['input'];
};

export type ImsReorderPoint = {
  __typename?: 'ImsReorderPoint';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  threshold: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  warehouseId: Scalars['UUID']['output'];
};

export type ImsReturn = {
  __typename?: 'ImsReturn';
  client: CrmCompany;
  clientId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  returnItems: Array<ImsReturnItem>;
  returnNumber: Scalars['String']['output'];
  salesOrder?: Maybe<ImsSalesOrder>;
  salesOrderId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<ReturnStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsReturnItem = {
  __typename?: 'ImsReturnItem';
  condition?: Maybe<ReturnItemConditionEnum>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantityExpected: Scalars['Int']['output'];
  quantityReceived?: Maybe<Scalars['Int']['output']>;
  quantityVariance?: Maybe<Scalars['Int']['output']>;
  return: ImsReturn;
  returnId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsSalesOrder = {
  __typename?: 'ImsSalesOrder';
  client: CrmCompany;
  clientId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  crmOpportunityId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  opportunity?: Maybe<CrmOpportunity>;
  orderNumber: Scalars['String']['output'];
  outboundShipments: Array<ImsOutboundShipment>;
  returns: Array<ImsReturn>;
  salesOrderItems: Array<ImsSalesOrderItem>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  status?: Maybe<SalesOrderStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsSalesOrderItem = {
  __typename?: 'ImsSalesOrderItem';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantityOrdered: Scalars['Int']['output'];
  salesOrder: ImsSalesOrder;
  salesOrderId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsStockTransfer = {
  __typename?: 'ImsStockTransfer';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  destinationWarehouseId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
  sourceWarehouseId: Scalars['UUID']['output'];
  status?: Maybe<StockTransferStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsSupplier = {
  __typename?: 'ImsSupplier';
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  products: Array<ImsProduct>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export enum InboundShipmentStatusEnum {
  Arrived = 'ARRIVED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export type InsertAccountTransaction = {
  amount: Scalars['Decimal']['input'];
  clientAccountId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
  runningBalance?: InputMaybe<Scalars['Decimal']['input']>;
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  transactionDate?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  type: TransactionTypeEnum;
};

export type InsertAccountingSyncLog = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  externalSystem: Scalars['String']['input'];
  lastSyncAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  nextRetryAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  recordId: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
  requestPayload?: InputMaybe<Scalars['String']['input']>;
  responsePayload?: InputMaybe<Scalars['String']['input']>;
  retryCount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<SyncStatusEnum>;
};

export type InsertAttachment = {
  fileName: Scalars['String']['input'];
  filePath: Scalars['String']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['UUID']['input']>;
  recordType?: InputMaybe<RecordType>;
};

export type InsertBinThreshold = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationId: Scalars['UUID']['input'];
  maxQuantity: Scalars['Int']['input'];
  minQuantity: Scalars['Int']['input'];
  productId: Scalars['UUID']['input'];
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type InsertCampaign = {
  budget?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type InsertCarrier = {
  contactDetails?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type InsertCarrierRate = {
  carrierId: Scalars['UUID']['input'];
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate: Scalars['Decimal']['input'];
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnitEnum>;
};

export type InsertCase = {
  caseNumber: Scalars['String']['input'];
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type InsertClientAccount = {
  availableCredit?: InputMaybe<Scalars['Decimal']['input']>;
  clientId: Scalars['UUID']['input'];
  creditLimit?: InputMaybe<Scalars['Decimal']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
  walletBalance?: InputMaybe<Scalars['Decimal']['input']>;
};

export type InsertCompany = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type InsertContact = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  email: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type InsertCreditNote = {
  amount: Scalars['Decimal']['input'];
  appliedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  creditNoteNumber: Scalars['String']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  disputeId?: InputMaybe<Scalars['UUID']['input']>;
  invoiceId: Scalars['UUID']['input'];
  issueDate: Scalars['NaiveDate']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
};

export type InsertCustomerTrackingLink = {
  accessCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryTaskId: Scalars['UUID']['input'];
  expiresAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastAccessedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  trackingToken: Scalars['String']['input'];
};

export type InsertDeliveryRoute = {
  actualDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  driverId: Scalars['UUID']['input'];
  estimatedDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  routeDate: Scalars['NaiveDate']['input'];
  startedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<DeliveryRouteStatusEnum>;
  totalDistanceKm?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertDeliveryTask = {
  actualArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryAddress: Scalars['String']['input'];
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryRouteId: Scalars['UUID']['input'];
  deliveryTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  failureReason?: InputMaybe<DeliveryFailureReasonEnum>;
  packageId: Scalars['UUID']['input'];
  recipientName?: InputMaybe<Scalars['String']['input']>;
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
  routeSequence: Scalars['Int']['input'];
  status?: InputMaybe<DeliveryTaskStatusEnum>;
};

export type InsertDispute = {
  clientId: Scalars['UUID']['input'];
  disputedAmount?: InputMaybe<Scalars['Decimal']['input']>;
  lineItemId: Scalars['UUID']['input'];
  reason: Scalars['String']['input'];
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
  resolvedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  resolvedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<DisputeStatusEnum>;
  submittedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type InsertDocument = {
  documentType: DocumentTypeEnum;
  fileName: Scalars['String']['input'];
  filePath: Scalars['String']['input'];
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
  uploadedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};

export type InsertDriver = {
  licenseExpiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  licenseNumber: Scalars['String']['input'];
  status?: InputMaybe<DriverStatusEnum>;
  userId: Scalars['UUID']['input'];
};

export type InsertDriverLocation = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  driverId: Scalars['UUID']['input'];
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type InsertDriverSchedule = {
  driverId: Scalars['UUID']['input'];
  endDate: Scalars['NaiveDate']['input'];
  reason?: InputMaybe<DriverScheduleReasonEnum>;
  startDate: Scalars['NaiveDate']['input'];
};

export type InsertExpense = {
  amount: Scalars['Decimal']['input'];
  currency?: InputMaybe<CurrencyEnum>;
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  fuelQuantity?: InputMaybe<Scalars['Float']['input']>;
  odometerReading?: InputMaybe<Scalars['Int']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatusEnum>;
  tripId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<ExpenseTypeEnum>;
};

export type InsertGeofence = {
  coordinates?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type InsertGeofenceEvent = {
  eventType: GeofenceEventTypeEnum;
  geofenceId: Scalars['UUID']['input'];
  timestamp: Scalars['NaiveDateTime']['input'];
  vehicleId: Scalars['UUID']['input'];
};

export type InsertGpsPing = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  timestamp: Scalars['NaiveDateTime']['input'];
  vehicleId: Scalars['UUID']['input'];
};

export type InsertInboundShipment = {
  actualArrivalDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  expectedArrivalDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  status?: InputMaybe<InboundShipmentStatusEnum>;
  warehouseId: Scalars['UUID']['input'];
};

export type InsertInboundShipmentItem = {
  discrepancyNotes?: InputMaybe<Scalars['String']['input']>;
  discrepancyQuantity?: InputMaybe<Scalars['Int']['input']>;
  expectedQuantity: Scalars['Int']['input'];
  inboundShipmentId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  receivedQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type InsertInteraction = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  contactId: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId: Scalars['UUID']['input'];
};

export type InsertInventoryAdjustment = {
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['UUID']['input'];
  quantityChange: Scalars['Int']['input'];
  reason?: InputMaybe<InventoryAdjustmentReasonEnum>;
  userId: Scalars['UUID']['input'];
  warehouseId: Scalars['UUID']['input'];
};

export type InsertInventoryBatch = {
  batchNumber: Scalars['String']['input'];
  expirationDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  productId: Scalars['UUID']['input'];
};

export type InsertInventoryStock = {
  availableQuantity?: InputMaybe<Scalars['Int']['input']>;
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  lastCountedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  lastMovementAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  locationId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
  reservedQuantity: Scalars['Int']['input'];
  status?: InputMaybe<InventoryStockStatusEnum>;
};

export type InsertInvoice = {
  amountOutstanding?: InputMaybe<Scalars['Decimal']['input']>;
  amountPaid?: InputMaybe<Scalars['Decimal']['input']>;
  clientId: Scalars['UUID']['input'];
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  dueDate: Scalars['NaiveDate']['input'];
  invoiceNumber: Scalars['String']['input'];
  issueDate: Scalars['NaiveDate']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paidAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['UUID']['input']>;
  sentAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<InvoiceStatusEnum>;
  subtotal?: InputMaybe<Scalars['Decimal']['input']>;
  taxAmount?: InputMaybe<Scalars['Decimal']['input']>;
  totalAmount: Scalars['Decimal']['input'];
};

export type InsertInvoiceItem = {
  invoiceId: Scalars['UUID']['input'];
  price: Scalars['Decimal']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};

export type InsertInvoiceLineItem = {
  description: Scalars['String']['input'];
  discountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  discountRate?: InputMaybe<Scalars['Decimal']['input']>;
  invoiceId: Scalars['UUID']['input'];
  lineTotal?: InputMaybe<Scalars['Decimal']['input']>;
  quantity: Scalars['Decimal']['input'];
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  taxAmount?: InputMaybe<Scalars['Decimal']['input']>;
  taxRate?: InputMaybe<Scalars['Decimal']['input']>;
  totalPrice?: InputMaybe<Scalars['Decimal']['input']>;
  unitPrice: Scalars['Decimal']['input'];
};

export type InsertLocation = {
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
  parentLocationId?: InputMaybe<Scalars['UUID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type: LocationTypeEnum;
  warehouseId: Scalars['UUID']['input'];
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertOutboundShipment = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  salesOrderId: Scalars['UUID']['input'];
  status?: InputMaybe<OutboundShipmentStatusEnum>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId: Scalars['UUID']['input'];
};

export type InsertOutboundShipmentItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  outboundShipmentId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  quantityShipped: Scalars['Int']['input'];
  salesOrderItemId: Scalars['UUID']['input'];
};

export type InsertPackage = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  insuranceValue?: InputMaybe<Scalars['Decimal']['input']>;
  isFragile?: InputMaybe<Scalars['Boolean']['input']>;
  isHazmat?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  packageNumber: Scalars['String']['input'];
  packageType?: InputMaybe<Scalars['String']['input']>;
  packedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  packedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  requiresSignature?: InputMaybe<Scalars['Boolean']['input']>;
  salesOrderId: Scalars['UUID']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  warehouseId: Scalars['UUID']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertPackageItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  packageId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  totalWeight?: InputMaybe<Scalars['Float']['input']>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertPartnerInvoice = {
  carrierId: Scalars['UUID']['input'];
  invoiceDate: Scalars['NaiveDate']['input'];
  invoiceNumber: Scalars['String']['input'];
  status?: InputMaybe<PartnerInvoiceStatusEnum>;
  totalAmount: Scalars['Decimal']['input'];
};

export type InsertPartnerInvoiceItem = {
  amount: Scalars['Decimal']['input'];
  partnerInvoiceId: Scalars['UUID']['input'];
  shipmentLegId: Scalars['UUID']['input'];
};

export type InsertPayment = {
  amount: Scalars['Decimal']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  exchangeRate?: InputMaybe<Scalars['Decimal']['input']>;
  fees?: InputMaybe<Scalars['Decimal']['input']>;
  gatewayReference?: InputMaybe<Scalars['String']['input']>;
  invoiceId: Scalars['UUID']['input'];
  netAmount?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  paymentMethod: PaymentMethodEnum;
  processedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<PaymentStatusEnum>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

export type InsertPickBatch = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['UUID']['input']>;
  batchNumber: Scalars['String']['input'];
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<PickBatchStatusEnum>;
  strategy: PickStrategyEnum;
  totalItems?: InputMaybe<Scalars['Int']['input']>;
  warehouseId: Scalars['UUID']['input'];
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type InsertPickBatchItem = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
  pickBatchId: Scalars['UUID']['input'];
  salesOrderId: Scalars['UUID']['input'];
};

export type InsertProduct = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  costPrice?: InputMaybe<Scalars['Decimal']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  sku: Scalars['String']['input'];
  status?: InputMaybe<ProductStatusEnum>;
  supplierId?: InputMaybe<Scalars['UUID']['input']>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertProofOfDelivery = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp: Scalars['NaiveDateTime']['input'];
  tripStopId: Scalars['UUID']['input'];
  type?: InputMaybe<ProofTypeEnum>;
};

export type InsertPutawayRule = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationType?: InputMaybe<LocationTypeEnum>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  preferredLocationId?: InputMaybe<Scalars['UUID']['input']>;
  priority: Scalars['Int']['input'];
  productId: Scalars['UUID']['input'];
  requiresHazmatApproval?: InputMaybe<Scalars['Boolean']['input']>;
  requiresTemperatureControl?: InputMaybe<Scalars['Boolean']['input']>;
  volumeThreshold?: InputMaybe<Scalars['Float']['input']>;
  warehouseId: Scalars['UUID']['input'];
  weightThreshold?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertQuote = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  destinationDetails: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  height?: InputMaybe<Scalars['Decimal']['input']>;
  length?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  originDetails: Scalars['String']['input'];
  quoteNumber?: InputMaybe<Scalars['String']['input']>;
  quotedPrice: Scalars['Decimal']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuoteStatusEnum>;
  volume?: InputMaybe<Scalars['Decimal']['input']>;
  weight?: InputMaybe<Scalars['Decimal']['input']>;
  width?: InputMaybe<Scalars['Decimal']['input']>;
};

export type InsertRateCard = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  serviceType: ServiceTypeEnum;
  validFrom: Scalars['NaiveDate']['input'];
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type InsertRateRule = {
  condition: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxValue?: InputMaybe<Scalars['Decimal']['input']>;
  minValue?: InputMaybe<Scalars['Decimal']['input']>;
  price: Scalars['Decimal']['input'];
  pricingModel: PricingModelEnum;
  priority?: InputMaybe<Scalars['Int']['input']>;
  rateCardId: Scalars['UUID']['input'];
  value: Scalars['String']['input'];
};

export type InsertReorderPoint = {
  productId: Scalars['UUID']['input'];
  threshold: Scalars['Int']['input'];
  warehouseId: Scalars['UUID']['input'];
};

export type InsertReturn = {
  clientId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  returnNumber: Scalars['String']['input'];
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<ReturnStatusEnum>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InsertReturnItem = {
  condition?: InputMaybe<ReturnItemConditionEnum>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  productId: Scalars['UUID']['input'];
  quantityExpected: Scalars['Int']['input'];
  quantityReceived?: InputMaybe<Scalars['Int']['input']>;
  quantityVariance?: InputMaybe<Scalars['Int']['input']>;
  returnId: Scalars['UUID']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InsertRoute = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId: Scalars['UUID']['input'];
};

export type InsertSalesOrder = {
  clientId: Scalars['UUID']['input'];
  crmOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  orderNumber: Scalars['String']['input'];
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatusEnum>;
};

export type InsertSalesOrderItem = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  productId: Scalars['UUID']['input'];
  quantityOrdered: Scalars['Int']['input'];
  salesOrderId: Scalars['UUID']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InsertShipmentLeg = {
  carrierId?: InputMaybe<Scalars['UUID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  internalTripId?: InputMaybe<Scalars['UUID']['input']>;
  legSequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatusEnum>;
};

export type InsertShipmentLegEvent = {
  eventTimestamp: Scalars['NaiveDateTime']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  shipmentLegId: Scalars['UUID']['input'];
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type InsertStockTransfer = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  destinationWarehouseId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
  sourceWarehouseId: Scalars['UUID']['input'];
  status?: InputMaybe<StockTransferStatusEnum>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InsertSupplier = {
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InsertSurcharge = {
  amount: Scalars['Decimal']['input'];
  calculationMethod: SurchargeCalculationMethodEnum;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  validFrom?: InputMaybe<Scalars['NaiveDate']['input']>;
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type InsertTask = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  durationSeconds?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pickBatchId?: InputMaybe<Scalars['UUID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  sourceEntityId?: InputMaybe<Scalars['UUID']['input']>;
  sourceEntityType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<TaskStatusEnum>;
  taskNumber: Scalars['String']['input'];
  type: TaskTypeEnum;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  warehouseId: Scalars['UUID']['input'];
};

export type InsertTaskEvent = {
  deliveryTaskId: Scalars['UUID']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status: TaskEventStatusEnum;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type InsertTaskItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  destinationLocationId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['UUID']['input'];
  quantityCompleted: Scalars['Int']['input'];
  quantityRemaining?: InputMaybe<Scalars['Int']['input']>;
  quantityRequired: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceLocationId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TaskItemStatusEnum>;
  taskId: Scalars['UUID']['input'];
};

export type InsertTrip = {
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStatusEnum>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type InsertTripStop = {
  actualArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  sequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStopStatusEnum>;
  tripId: Scalars['UUID']['input'];
};

export type InsertVehicle = {
  capacityVolume?: InputMaybe<Scalars['Float']['input']>;
  capacityWeight?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registrationNumber: Scalars['String']['input'];
  status?: InputMaybe<VehicleStatusEnum>;
};

export type InsertVehicleMaintenance = {
  cost?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDate: Scalars['NaiveDate']['input'];
  serviceType?: InputMaybe<VehicleServiceTypeEnum>;
  vehicleId: Scalars['UUID']['input'];
};

export type InsertWarehouse = {
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

export enum InteractionType {
  Call = 'CALL',
  Email = 'EMAIL',
  Meeting = 'MEETING',
  Text = 'TEXT'
}

export enum InventoryAdjustmentReasonEnum {
  CycleCount = 'CYCLE_COUNT',
  DamagedGoods = 'DAMAGED_GOODS',
  Expired = 'EXPIRED',
  ManualCorrection = 'MANUAL_CORRECTION',
  ReturnToVendor = 'RETURN_TO_VENDOR',
  Theft = 'THEFT'
}

export enum InventoryStockStatusEnum {
  Allocated = 'ALLOCATED',
  Available = 'AVAILABLE',
  Damaged = 'DAMAGED',
  Expired = 'EXPIRED',
  Hold = 'HOLD',
  Quarantine = 'QUARANTINE',
  Shipped = 'SHIPPED'
}

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Sent = 'SENT'
}

export enum InvoiceStatusEnum {
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

export enum LocationTypeEnum {
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

export type Mutations = {
  __typename?: 'Mutations';
  auth: AuthMutations;
  billing: BillingMutations;
  crm: CrmMutations;
  dms: DmsMutations;
  ims: ImsMutations;
  tms: TmsMutations;
  wms: WmsMutations;
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

export enum OutboundShipmentStatusEnum {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Packed = 'PACKED',
  Picking = 'PICKING',
  Shipped = 'SHIPPED'
}

export enum PartnerInvoiceStatusEnum {
  Cancelled = 'CANCELLED',
  Disputed = 'DISPUTED',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  Check = 'CHECK',
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
  WireTransfer = 'WIRE_TRANSFER'
}

export enum PaymentMethodEnum {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  Check = 'CHECK',
  ClientCredit = 'CLIENT_CREDIT',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  QrPh = 'QR_PH',
  Wallet = 'WALLET'
}

export enum PaymentStatusEnum {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED',
  Successful = 'SUCCESSFUL'
}

export enum PickBatchStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN'
}

export enum PickStrategyEnum {
  BatchPicking = 'BATCH_PICKING',
  ClusterPicking = 'CLUSTER_PICKING',
  SingleOrderPicking = 'SINGLE_ORDER_PICKING',
  WavePicking = 'WAVE_PICKING',
  ZonePicking = 'ZONE_PICKING'
}

export enum PricingModelEnum {
  FlatRate = 'FLAT_RATE',
  Percentage = 'PERCENTAGE',
  PerCubicMeter = 'PER_CUBIC_METER',
  PerItem = 'PER_ITEM',
  PerKg = 'PER_KG',
  PerZone = 'PER_ZONE',
  Tiered = 'TIERED'
}

export enum ProductStatusEnum {
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

export enum ProofOfDeliveryTypeEnum {
  CodeVerification = 'CODE_VERIFICATION',
  ContactlessDelivery = 'CONTACTLESS_DELIVERY',
  LeftAtDoor = 'LEFT_AT_DOOR',
  Photo = 'PHOTO',
  Signature = 'SIGNATURE'
}

export enum ProofTypeEnum {
  BarcodeScan = 'BARCODE_SCAN',
  Photo = 'PHOTO',
  PinVerification = 'PIN_VERIFICATION',
  Signature = 'SIGNATURE'
}

export type Query = {
  __typename?: 'Query';
  auth: AuthQuery;
  billing: BillingQueries;
  crm: CrmQueries;
  dms: DmsQueries;
  ims: ImsQueries;
  tms: TmsQueries;
  wms: WmsQueries;
};

export enum QuoteStatusEnum {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Converted = 'CONVERTED',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
}

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

export enum ReturnItemConditionEnum {
  Damaged = 'DAMAGED',
  Defective = 'DEFECTIVE',
  Expired = 'EXPIRED',
  Sellable = 'SELLABLE',
  Unsellable = 'UNSELLABLE'
}

export enum ReturnStatusEnum {
  Approved = 'APPROVED',
  Processed = 'PROCESSED',
  Received = 'RECEIVED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export enum SalesOrderStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED'
}

export enum ServiceTypeEnum {
  Customs = 'CUSTOMS',
  Fulfillment = 'FULFILLMENT',
  Handling = 'HANDLING',
  Insurance = 'INSURANCE',
  Packaging = 'PACKAGING',
  Returns = 'RETURNS',
  Shipping = 'SHIPPING',
  Storage = 'STORAGE'
}

export enum ShipmentLegStatusEnum {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  InTransit = 'IN_TRANSIT',
  Pending = 'PENDING'
}

export type SignInResponse = {
  __typename?: 'SignInResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export enum StockTransferStatusEnum {
  Cancelled = 'CANCELLED',
  InTransit = 'IN_TRANSIT',
  Pending = 'PENDING',
  Received = 'RECEIVED'
}

export enum SurchargeCalculationMethodEnum {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE',
  PerUnit = 'PER_UNIT',
  SlidingScale = 'SLIDING_SCALE'
}

export enum SyncStatusEnum {
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Retry = 'RETRY',
  Success = 'SUCCESS'
}

export enum TaskEventStatusEnum {
  Arrived = 'ARRIVED',
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Exception = 'EXCEPTION',
  Failed = 'FAILED',
  Rescheduled = 'RESCHEDULED',
  Started = 'STARTED'
}

export enum TaskItemStatusEnum {
  Completed = 'COMPLETED',
  Damaged = 'DAMAGED',
  InProgress = 'IN_PROGRESS',
  NotFound = 'NOT_FOUND',
  Pending = 'PENDING',
  ShortPicked = 'SHORT_PICKED'
}

export enum TaskStatusEnum {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Error = 'ERROR',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export enum TaskTypeEnum {
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

export type TmsCarrier = {
  __typename?: 'TmsCarrier';
  contactDetails?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  servicesOffered?: Maybe<Scalars['String']['output']>;
  shipmentLegs: Array<TmsShipmentLeg>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsCarrierRate = {
  __typename?: 'TmsCarrierRate';
  carrier: TmsCarrier;
  carrierId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  destination?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  rate: Scalars['Decimal']['output'];
  serviceType?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<CarrierRateUnitEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsDriver = {
  __typename?: 'TmsDriver';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  driverSchedules: Array<TmsDriverSchedule>;
  expenses: Array<TmsExpense>;
  id: Scalars['UUID']['output'];
  licenseExpiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  licenseNumber: Scalars['String']['output'];
  status?: Maybe<DriverStatusEnum>;
  trips: Array<TmsTrip>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  user: AuthUser;
  userId: Scalars['UUID']['output'];
};

export type TmsDriverSchedule = {
  __typename?: 'TmsDriverSchedule';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  driver: TmsDriver;
  driverId: Scalars['UUID']['output'];
  endDate: Scalars['NaiveDate']['output'];
  id: Scalars['UUID']['output'];
  reason?: Maybe<DriverScheduleReasonEnum>;
  startDate: Scalars['NaiveDate']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsExpense = {
  __typename?: 'TmsExpense';
  amount: Scalars['Decimal']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  currency?: Maybe<CurrencyEnum>;
  driver?: Maybe<TmsDriver>;
  driverId?: Maybe<Scalars['UUID']['output']>;
  fuelQuantity?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  odometerReading?: Maybe<Scalars['Int']['output']>;
  receiptUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ExpenseStatusEnum>;
  trip?: Maybe<TmsTrip>;
  tripId?: Maybe<Scalars['UUID']['output']>;
  type?: Maybe<ExpenseTypeEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsGeofence = {
  __typename?: 'TmsGeofence';
  coordinates?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  geofenceEvents: Array<TmsGeofenceEvent>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsGeofenceEvent = {
  __typename?: 'TmsGeofenceEvent';
  eventType: GeofenceEventTypeEnum;
  geofence: TmsGeofence;
  geofenceId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  timestamp: Scalars['NaiveDateTime']['output'];
  vehicle: TmsVehicle;
  vehicleId: Scalars['UUID']['output'];
};

export type TmsGpsPing = {
  __typename?: 'TmsGpsPing';
  id: Scalars['UUID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  timestamp: Scalars['NaiveDateTime']['output'];
  vehicle: TmsVehicle;
  vehicleId: Scalars['UUID']['output'];
};

export type TmsMutations = {
  __typename?: 'TmsMutations';
  createCarrier: TmsCarrier;
  createCarrierRate: TmsCarrierRate;
  createDriver: TmsDriver;
  createDriverSchedule: TmsDriverSchedule;
  createExpense: TmsExpense;
  createGeofence: TmsGeofence;
  createGeofenceEvent: TmsGeofenceEvent;
  createGpsPing: TmsGpsPing;
  createPartnerInvoice: TmsPartnerInvoice;
  createPartnerInvoiceItem: TmsPartnerInvoiceItem;
  createProofOfDelivery: TmsProofOfDelivery;
  createRoute: TmsRoute;
  createShipmentLeg: TmsShipmentLeg;
  createShipmentLegEvent: TmsShipmentLegEvent;
  createTrip: TmsTrip;
  createTripStop: TmsTripStop;
  createVehicle: TmsVehicle;
  createVehicleMaintenance: TmsVehicleMaintenance;
  deleteCarrier: Scalars['Boolean']['output'];
  deleteCarrierRate: Scalars['Boolean']['output'];
  deleteDriver: Scalars['Boolean']['output'];
  deleteDriverSchedule: Scalars['Boolean']['output'];
  deleteExpense: Scalars['Boolean']['output'];
  deleteGeofence: Scalars['Boolean']['output'];
  deleteGeofenceEvent: Scalars['Boolean']['output'];
  deleteGpsPing: Scalars['Boolean']['output'];
  deletePartnerInvoice: Scalars['Boolean']['output'];
  deletePartnerInvoiceItem: Scalars['Boolean']['output'];
  deleteProofOfDelivery: Scalars['Boolean']['output'];
  deleteRoute: Scalars['Boolean']['output'];
  deleteShipmentLeg: Scalars['Boolean']['output'];
  deleteShipmentLegEvent: Scalars['Boolean']['output'];
  deleteTrip: Scalars['Boolean']['output'];
  deleteTripStop: Scalars['Boolean']['output'];
  deleteVehicle: Scalars['Boolean']['output'];
  deleteVehicleMaintenance: Scalars['Boolean']['output'];
  updateCarrier: TmsCarrier;
  updateCarrierRate: TmsCarrierRate;
  updateDriver: TmsDriver;
  updateDriverSchedule: TmsDriverSchedule;
  updateExpense: TmsExpense;
  updateGeofence: TmsGeofence;
  updateGeofenceEvent: TmsGeofenceEvent;
  updateGpsPing: TmsGpsPing;
  updatePartnerInvoice: TmsPartnerInvoice;
  updatePartnerInvoiceItem: TmsPartnerInvoiceItem;
  updateProofOfDelivery: TmsProofOfDelivery;
  updateRoute: TmsRoute;
  updateShipmentLeg: TmsShipmentLeg;
  updateShipmentLegEvent: TmsShipmentLegEvent;
  updateTrip: TmsTrip;
  updateTripStop: TmsTripStop;
  updateVehicle: TmsVehicle;
  updateVehicleMaintenance: TmsVehicleMaintenance;
};


export type TmsMutationsCreateCarrierArgs = {
  value: InsertCarrier;
};


export type TmsMutationsCreateCarrierRateArgs = {
  value: InsertCarrierRate;
};


export type TmsMutationsCreateDriverArgs = {
  value: InsertDriver;
};


export type TmsMutationsCreateDriverScheduleArgs = {
  value: InsertDriverSchedule;
};


export type TmsMutationsCreateExpenseArgs = {
  value: InsertExpense;
};


export type TmsMutationsCreateGeofenceArgs = {
  value: InsertGeofence;
};


export type TmsMutationsCreateGeofenceEventArgs = {
  value: InsertGeofenceEvent;
};


export type TmsMutationsCreateGpsPingArgs = {
  value: InsertGpsPing;
};


export type TmsMutationsCreatePartnerInvoiceArgs = {
  value: InsertPartnerInvoice;
};


export type TmsMutationsCreatePartnerInvoiceItemArgs = {
  value: InsertPartnerInvoiceItem;
};


export type TmsMutationsCreateProofOfDeliveryArgs = {
  value: InsertProofOfDelivery;
};


export type TmsMutationsCreateRouteArgs = {
  value: InsertRoute;
};


export type TmsMutationsCreateShipmentLegArgs = {
  value: InsertShipmentLeg;
};


export type TmsMutationsCreateShipmentLegEventArgs = {
  value: InsertShipmentLegEvent;
};


export type TmsMutationsCreateTripArgs = {
  value: InsertTrip;
};


export type TmsMutationsCreateTripStopArgs = {
  value: InsertTripStop;
};


export type TmsMutationsCreateVehicleArgs = {
  value: InsertVehicle;
};


export type TmsMutationsCreateVehicleMaintenanceArgs = {
  value: InsertVehicleMaintenance;
};


export type TmsMutationsDeleteCarrierArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteCarrierRateArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteDriverArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteDriverScheduleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteExpenseArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteGeofenceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteGeofenceEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteGpsPingArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeletePartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeletePartnerInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteShipmentLegArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteShipmentLegEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteTripArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteTripStopArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteVehicleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteVehicleMaintenanceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsUpdateCarrierArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCarrier;
};


export type TmsMutationsUpdateCarrierRateArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCarrierRate;
};


export type TmsMutationsUpdateDriverArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDriver;
};


export type TmsMutationsUpdateDriverScheduleArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDriverSchedule;
};


export type TmsMutationsUpdateExpenseArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateExpense;
};


export type TmsMutationsUpdateGeofenceArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateGeofence;
};


export type TmsMutationsUpdateGeofenceEventArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateGeofenceEvent;
};


export type TmsMutationsUpdateGpsPingArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateGpsPing;
};


export type TmsMutationsUpdatePartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePartnerInvoice;
};


export type TmsMutationsUpdatePartnerInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePartnerInvoiceItem;
};


export type TmsMutationsUpdateProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateProofOfDelivery;
};


export type TmsMutationsUpdateRouteArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateRoute;
};


export type TmsMutationsUpdateShipmentLegArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateShipmentLeg;
};


export type TmsMutationsUpdateShipmentLegEventArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateShipmentLegEvent;
};


export type TmsMutationsUpdateTripArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateTrip;
};


export type TmsMutationsUpdateTripStopArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateTripStop;
};


export type TmsMutationsUpdateVehicleArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateVehicle;
};


export type TmsMutationsUpdateVehicleMaintenanceArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateVehicleMaintenance;
};

export type TmsPartnerInvoice = {
  __typename?: 'TmsPartnerInvoice';
  carrierId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  invoiceDate: Scalars['NaiveDate']['output'];
  invoiceNumber: Scalars['String']['output'];
  partnerInvoiceItems: Array<TmsPartnerInvoiceItem>;
  status?: Maybe<PartnerInvoiceStatusEnum>;
  totalAmount: Scalars['Decimal']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsPartnerInvoiceItem = {
  __typename?: 'TmsPartnerInvoiceItem';
  amount: Scalars['Decimal']['output'];
  id: Scalars['UUID']['output'];
  partnerInvoice: TmsPartnerInvoice;
  partnerInvoiceId: Scalars['UUID']['output'];
  shipmentLeg: TmsShipmentLeg;
  shipmentLegId: Scalars['UUID']['output'];
};

export type TmsProofOfDelivery = {
  __typename?: 'TmsProofOfDelivery';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp: Scalars['NaiveDateTime']['output'];
  tripStop: TmsTripStop;
  tripStopId: Scalars['UUID']['output'];
  type?: Maybe<ProofTypeEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsQueries = {
  __typename?: 'TmsQueries';
  carrier?: Maybe<TmsCarrier>;
  carrierRate?: Maybe<TmsCarrierRate>;
  carrierRates: Array<TmsCarrierRate>;
  carriers: Array<TmsCarrier>;
  driver?: Maybe<TmsDriver>;
  driverSchedule?: Maybe<TmsDriverSchedule>;
  driverSchedules: Array<TmsDriverSchedule>;
  drivers: Array<TmsDriver>;
  expense?: Maybe<TmsExpense>;
  expenses: Array<TmsExpense>;
  geofence?: Maybe<TmsGeofence>;
  geofenceEvent?: Maybe<TmsGeofenceEvent>;
  geofenceEvents: Array<TmsGeofenceEvent>;
  geofences: Array<TmsGeofence>;
  gpsPing?: Maybe<TmsGpsPing>;
  gpsPings: Array<TmsGpsPing>;
  partnerInvoice?: Maybe<TmsPartnerInvoice>;
  partnerInvoiceItem?: Maybe<TmsPartnerInvoiceItem>;
  partnerInvoiceItems: Array<TmsPartnerInvoiceItem>;
  partnerInvoices: Array<TmsPartnerInvoice>;
  proofOfDeliveries: Array<TmsProofOfDelivery>;
  proofOfDelivery?: Maybe<TmsProofOfDelivery>;
  route?: Maybe<TmsRoute>;
  routes: Array<TmsRoute>;
  shipmentLeg?: Maybe<TmsShipmentLeg>;
  shipmentLegEvent?: Maybe<TmsShipmentLegEvent>;
  shipmentLegEvents: Array<TmsShipmentLegEvent>;
  shipmentLegs: Array<TmsShipmentLeg>;
  trip?: Maybe<TmsTrip>;
  tripStop?: Maybe<TmsTripStop>;
  tripStops: Array<TmsTripStop>;
  trips: Array<TmsTrip>;
  vehicle?: Maybe<TmsVehicle>;
  vehicleMaintenance: Array<TmsVehicleMaintenance>;
  vehicleMaintenanceItem?: Maybe<TmsVehicleMaintenance>;
  vehicles: Array<TmsVehicle>;
};


export type TmsQueriesCarrierArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesCarrierRateArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesDriverArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesDriverScheduleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesExpenseArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesGeofenceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesGeofenceEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesGpsPingArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesPartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesPartnerInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesShipmentLegArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesShipmentLegEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesTripArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesTripStopArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesVehicleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesVehicleMaintenanceItemArgs = {
  id: Scalars['UUID']['input'];
};

export type TmsRoute = {
  __typename?: 'TmsRoute';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  totalDistance?: Maybe<Scalars['Float']['output']>;
  totalDuration?: Maybe<Scalars['Float']['output']>;
  trip: TmsTrip;
  tripId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsShipmentLeg = {
  __typename?: 'TmsShipmentLeg';
  carrier?: Maybe<TmsCarrier>;
  carrierId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  endLocation?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  internalTripId?: Maybe<Scalars['UUID']['output']>;
  legSequence: Scalars['Int']['output'];
  outboundShipment?: Maybe<ImsOutboundShipment>;
  partnerInvoiceItems: Array<TmsPartnerInvoiceItem>;
  shipmentId?: Maybe<Scalars['UUID']['output']>;
  shipmentLegEvents: Array<TmsShipmentLegEvent>;
  startLocation?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShipmentLegStatusEnum>;
  trip?: Maybe<TmsTrip>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsShipmentLegEvent = {
  __typename?: 'TmsShipmentLegEvent';
  eventTimestamp: Scalars['NaiveDateTime']['output'];
  id: Scalars['UUID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  shipmentLeg: TmsShipmentLeg;
  shipmentLegId: Scalars['UUID']['output'];
  statusMessage?: Maybe<Scalars['String']['output']>;
};

export type TmsTrip = {
  __typename?: 'TmsTrip';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  driver?: Maybe<TmsDriver>;
  driverId?: Maybe<Scalars['UUID']['output']>;
  expenses: Array<TmsExpense>;
  id: Scalars['UUID']['output'];
  routes: Array<TmsRoute>;
  shipmentLegs: Array<TmsShipmentLeg>;
  status?: Maybe<TripStatusEnum>;
  tripStops: Array<TmsTripStop>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  vehicle?: Maybe<TmsVehicle>;
  vehicleId?: Maybe<Scalars['UUID']['output']>;
};

export type TmsTripStop = {
  __typename?: 'TmsTripStop';
  actualArrivalTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  actualDepartureTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedDepartureTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  proofOfDeliveries: Array<TmsProofOfDelivery>;
  sequence: Scalars['Int']['output'];
  shipment?: Maybe<ImsOutboundShipment>;
  shipmentId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<TripStopStatusEnum>;
  trip: TmsTrip;
  tripId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsVehicle = {
  __typename?: 'TmsVehicle';
  capacityVolume?: Maybe<Scalars['Float']['output']>;
  capacityWeight?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  geofenceEvents: Array<TmsGeofenceEvent>;
  gpsPings: Array<TmsGpsPing>;
  id: Scalars['UUID']['output'];
  model?: Maybe<Scalars['String']['output']>;
  registrationNumber: Scalars['String']['output'];
  status?: Maybe<VehicleStatusEnum>;
  trips: Array<TmsTrip>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  vehicleMaintenance: Array<TmsVehicleMaintenance>;
};

export type TmsVehicleMaintenance = {
  __typename?: 'TmsVehicleMaintenance';
  cost?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  serviceDate: Scalars['NaiveDate']['output'];
  serviceType?: Maybe<VehicleServiceTypeEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  vehicle: TmsVehicle;
  vehicleId: Scalars['UUID']['output'];
};

export enum TransactionTypeEnum {
  Adjustment = 'ADJUSTMENT',
  Credit = 'CREDIT',
  Debit = 'DEBIT',
  Fee = 'FEE',
  Refund = 'REFUND',
  TopUp = 'TOP_UP'
}

export enum TripStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Planned = 'PLANNED'
}

export enum TripStopStatusEnum {
  Arrived = 'ARRIVED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Skipped = 'SKIPPED'
}

export type UpdateAccountTransaction = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  clientAccountId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
  runningBalance?: InputMaybe<Scalars['Decimal']['input']>;
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  transactionDate?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  type?: InputMaybe<TransactionTypeEnum>;
};

export type UpdateAccountingSyncLog = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  externalSystem?: InputMaybe<Scalars['String']['input']>;
  lastSyncAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  nextRetryAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  recordId?: InputMaybe<Scalars['UUID']['input']>;
  recordType?: InputMaybe<Scalars['String']['input']>;
  requestPayload?: InputMaybe<Scalars['String']['input']>;
  responsePayload?: InputMaybe<Scalars['String']['input']>;
  retryCount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<SyncStatusEnum>;
};

export type UpdateAttachment = {
  fileName?: InputMaybe<Scalars['String']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['UUID']['input']>;
  recordType?: InputMaybe<RecordType>;
};

export type UpdateBinThreshold = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationId?: InputMaybe<Scalars['UUID']['input']>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCampaign = {
  budget?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type UpdateCarrier = {
  contactDetails?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCarrierRate = {
  carrierId?: InputMaybe<Scalars['UUID']['input']>;
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Decimal']['input']>;
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnitEnum>;
};

export type UpdateCase = {
  caseNumber?: InputMaybe<Scalars['String']['input']>;
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type UpdateClientAccount = {
  availableCredit?: InputMaybe<Scalars['Decimal']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  creditLimit?: InputMaybe<Scalars['Decimal']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
  walletBalance?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateCompany = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContact = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCreditNote = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  appliedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  creditNoteNumber?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  disputeId?: InputMaybe<Scalars['UUID']['input']>;
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerTrackingLink = {
  accessCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryTaskId?: InputMaybe<Scalars['UUID']['input']>;
  expiresAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastAccessedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  trackingToken?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDeliveryRoute = {
  actualDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  estimatedDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  routeDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  startedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<DeliveryRouteStatusEnum>;
  totalDistanceKm?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateDeliveryTask = {
  actualArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryAddress?: InputMaybe<Scalars['String']['input']>;
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryRouteId?: InputMaybe<Scalars['UUID']['input']>;
  deliveryTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  failureReason?: InputMaybe<DeliveryFailureReasonEnum>;
  packageId?: InputMaybe<Scalars['UUID']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
  routeSequence?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<DeliveryTaskStatusEnum>;
};

export type UpdateDispute = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  disputedAmount?: InputMaybe<Scalars['Decimal']['input']>;
  lineItemId?: InputMaybe<Scalars['UUID']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
  resolvedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  resolvedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<DisputeStatusEnum>;
  submittedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type UpdateDocument = {
  documentType?: InputMaybe<DocumentTypeEnum>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['UUID']['input']>;
  recordType?: InputMaybe<Scalars['String']['input']>;
  uploadedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateDriver = {
  licenseExpiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  licenseNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DriverStatusEnum>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateDriverLocation = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type UpdateDriverSchedule = {
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  reason?: InputMaybe<DriverScheduleReasonEnum>;
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type UpdateExpense = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  currency?: InputMaybe<CurrencyEnum>;
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  fuelQuantity?: InputMaybe<Scalars['Float']['input']>;
  odometerReading?: InputMaybe<Scalars['Int']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatusEnum>;
  tripId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<ExpenseTypeEnum>;
};

export type UpdateGeofence = {
  coordinates?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGeofenceEvent = {
  eventType?: InputMaybe<GeofenceEventTypeEnum>;
  geofenceId?: InputMaybe<Scalars['UUID']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateGpsPing = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateInboundShipment = {
  actualArrivalDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  expectedArrivalDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  status?: InputMaybe<InboundShipmentStatusEnum>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateInboundShipmentItem = {
  discrepancyNotes?: InputMaybe<Scalars['String']['input']>;
  discrepancyQuantity?: InputMaybe<Scalars['Int']['input']>;
  expectedQuantity?: InputMaybe<Scalars['Int']['input']>;
  inboundShipmentId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  receivedQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateInteraction = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateInventoryAdjustment = {
  notes?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantityChange?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<InventoryAdjustmentReasonEnum>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateInventoryBatch = {
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  expirationDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateInventoryStock = {
  availableQuantity?: InputMaybe<Scalars['Int']['input']>;
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  lastCountedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  lastMovementAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  locationId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  reservedQuantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InventoryStockStatusEnum>;
};

export type UpdateInvoice = {
  amountOutstanding?: InputMaybe<Scalars['Decimal']['input']>;
  amountPaid?: InputMaybe<Scalars['Decimal']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paidAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['UUID']['input']>;
  sentAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<InvoiceStatusEnum>;
  subtotal?: InputMaybe<Scalars['Decimal']['input']>;
  taxAmount?: InputMaybe<Scalars['Decimal']['input']>;
  totalAmount?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateInvoiceItem = {
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateInvoiceLineItem = {
  description?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  discountRate?: InputMaybe<Scalars['Decimal']['input']>;
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  lineTotal?: InputMaybe<Scalars['Decimal']['input']>;
  quantity?: InputMaybe<Scalars['Decimal']['input']>;
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  taxAmount?: InputMaybe<Scalars['Decimal']['input']>;
  taxRate?: InputMaybe<Scalars['Decimal']['input']>;
  totalPrice?: InputMaybe<Scalars['Decimal']['input']>;
  unitPrice?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateLocation = {
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
  parentLocationId?: InputMaybe<Scalars['UUID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<LocationTypeEnum>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateOutboundShipment = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<OutboundShipmentStatusEnum>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateOutboundShipmentItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  outboundShipmentId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantityShipped?: InputMaybe<Scalars['Int']['input']>;
  salesOrderItemId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdatePackage = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  insuranceValue?: InputMaybe<Scalars['Decimal']['input']>;
  isFragile?: InputMaybe<Scalars['Boolean']['input']>;
  isHazmat?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  packageNumber?: InputMaybe<Scalars['String']['input']>;
  packageType?: InputMaybe<Scalars['String']['input']>;
  packedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  packedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  requiresSignature?: InputMaybe<Scalars['Boolean']['input']>;
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePackageItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  packageId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  totalWeight?: InputMaybe<Scalars['Float']['input']>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePartnerInvoice = {
  carrierId?: InputMaybe<Scalars['UUID']['input']>;
  invoiceDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PartnerInvoiceStatusEnum>;
  totalAmount?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdatePartnerInvoiceItem = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  partnerInvoiceId?: InputMaybe<Scalars['UUID']['input']>;
  shipmentLegId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdatePayment = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  exchangeRate?: InputMaybe<Scalars['Decimal']['input']>;
  fees?: InputMaybe<Scalars['Decimal']['input']>;
  gatewayReference?: InputMaybe<Scalars['String']['input']>;
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  netAmount?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethodEnum>;
  processedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<PaymentStatusEnum>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePickBatch = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['UUID']['input']>;
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<PickBatchStatusEnum>;
  strategy?: InputMaybe<PickStrategyEnum>;
  totalItems?: InputMaybe<Scalars['Int']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdatePickBatchItem = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
  pickBatchId?: InputMaybe<Scalars['UUID']['input']>;
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateProduct = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  costPrice?: InputMaybe<Scalars['Decimal']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatusEnum>;
  supplierId?: InputMaybe<Scalars['UUID']['input']>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateProofOfDelivery = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  tripStopId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<ProofTypeEnum>;
};

export type UpdatePutawayRule = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationType?: InputMaybe<LocationTypeEnum>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  preferredLocationId?: InputMaybe<Scalars['UUID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  requiresHazmatApproval?: InputMaybe<Scalars['Boolean']['input']>;
  requiresTemperatureControl?: InputMaybe<Scalars['Boolean']['input']>;
  volumeThreshold?: InputMaybe<Scalars['Float']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
  weightThreshold?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateQuote = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  destinationDetails?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  height?: InputMaybe<Scalars['Decimal']['input']>;
  length?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  originDetails?: InputMaybe<Scalars['String']['input']>;
  quoteNumber?: InputMaybe<Scalars['String']['input']>;
  quotedPrice?: InputMaybe<Scalars['Decimal']['input']>;
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuoteStatusEnum>;
  volume?: InputMaybe<Scalars['Decimal']['input']>;
  weight?: InputMaybe<Scalars['Decimal']['input']>;
  width?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateRateCard = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<ServiceTypeEnum>;
  validFrom?: InputMaybe<Scalars['NaiveDate']['input']>;
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type UpdateRateRule = {
  condition?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxValue?: InputMaybe<Scalars['Decimal']['input']>;
  minValue?: InputMaybe<Scalars['Decimal']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  pricingModel?: InputMaybe<PricingModelEnum>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  rateCardId?: InputMaybe<Scalars['UUID']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReorderPoint = {
  productId?: InputMaybe<Scalars['UUID']['input']>;
  threshold?: InputMaybe<Scalars['Int']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateReturn = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  returnNumber?: InputMaybe<Scalars['String']['input']>;
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<ReturnStatusEnum>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateReturnItem = {
  condition?: InputMaybe<ReturnItemConditionEnum>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantityExpected?: InputMaybe<Scalars['Int']['input']>;
  quantityReceived?: InputMaybe<Scalars['Int']['input']>;
  quantityVariance?: InputMaybe<Scalars['Int']['input']>;
  returnId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateRoute = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateSalesOrder = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  crmOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatusEnum>;
};

export type UpdateSalesOrderItem = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantityOrdered?: InputMaybe<Scalars['Int']['input']>;
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateShipmentLeg = {
  carrierId?: InputMaybe<Scalars['UUID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  internalTripId?: InputMaybe<Scalars['UUID']['input']>;
  legSequence?: InputMaybe<Scalars['Int']['input']>;
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatusEnum>;
};

export type UpdateShipmentLegEvent = {
  eventTimestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  shipmentLegId?: InputMaybe<Scalars['UUID']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStockTransfer = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  destinationWarehouseId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  sourceWarehouseId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<StockTransferStatusEnum>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSupplier = {
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSurcharge = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  calculationMethod?: InputMaybe<SurchargeCalculationMethodEnum>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  validFrom?: InputMaybe<Scalars['NaiveDate']['input']>;
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type UpdateTask = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  durationSeconds?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pickBatchId?: InputMaybe<Scalars['UUID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  sourceEntityId?: InputMaybe<Scalars['UUID']['input']>;
  sourceEntityType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<TaskStatusEnum>;
  taskNumber?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TaskTypeEnum>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateTaskEvent = {
  deliveryTaskId?: InputMaybe<Scalars['UUID']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskEventStatusEnum>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type UpdateTaskItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  destinationLocationId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantityCompleted?: InputMaybe<Scalars['Int']['input']>;
  quantityRemaining?: InputMaybe<Scalars['Int']['input']>;
  quantityRequired?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceLocationId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TaskItemStatusEnum>;
  taskId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateTrip = {
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStatusEnum>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateTripStop = {
  actualArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStopStatusEnum>;
  tripId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateVehicle = {
  capacityVolume?: InputMaybe<Scalars['Float']['input']>;
  capacityWeight?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<VehicleStatusEnum>;
};

export type UpdateVehicleMaintenance = {
  cost?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  serviceType?: InputMaybe<VehicleServiceTypeEnum>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateWarehouse = {
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

export type Users = {
  __typename?: 'Users';
  user?: Maybe<AuthUser>;
  users: Array<AuthUser>;
};


export type UsersUserArgs = {
  id: Scalars['UUID']['input'];
};

export enum VehicleServiceTypeEnum {
  BrakeService = 'BRAKE_SERVICE',
  Inspection = 'INSPECTION',
  OilChange = 'OIL_CHANGE',
  Repair = 'REPAIR',
  RoutineMaintenance = 'ROUTINE_MAINTENANCE',
  TireReplacement = 'TIRE_REPLACEMENT'
}

export enum VehicleStatusEnum {
  Available = 'AVAILABLE',
  InMaintenance = 'IN_MAINTENANCE',
  OnTrip = 'ON_TRIP',
  OutOfService = 'OUT_OF_SERVICE'
}

export type WmsBinThreshold = {
  __typename?: 'WmsBinThreshold';
  alertThreshold?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  location: WmsLocation;
  locationId: Scalars['UUID']['output'];
  maxQuantity: Scalars['Int']['output'];
  minQuantity: Scalars['Int']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  reorderQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type WmsInventoryStock = {
  __typename?: 'WmsInventoryStock';
  availableQuantity?: Maybe<Scalars['Int']['output']>;
  batch?: Maybe<ImsInventoryBatch>;
  batchId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  lastCountedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  lastMovementAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  location: WmsLocation;
  locationId: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
  reservedQuantity: Scalars['Int']['output'];
  status?: Maybe<InventoryStockStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type WmsLocation = {
  __typename?: 'WmsLocation';
  barcode?: Maybe<Scalars['String']['output']>;
  binThresholds: Array<WmsBinThreshold>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  hazmatApproved?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['UUID']['output'];
  inventoryStock: Array<WmsInventoryStock>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isPickable?: Maybe<Scalars['Boolean']['output']>;
  isReceivable?: Maybe<Scalars['Boolean']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  maxPallets?: Maybe<Scalars['Int']['output']>;
  maxVolume?: Maybe<Scalars['Float']['output']>;
  maxWeight?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  parentLocation?: Maybe<WmsLocation>;
  parentLocationId?: Maybe<Scalars['UUID']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  putawayRules: Array<WmsPutawayRule>;
  temperatureControlled?: Maybe<Scalars['Boolean']['output']>;
  type: LocationTypeEnum;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  warehouse: WmsWarehouse;
  warehouseId: Scalars['UUID']['output'];
  xCoordinate?: Maybe<Scalars['Float']['output']>;
  yCoordinate?: Maybe<Scalars['Float']['output']>;
  zCoordinate?: Maybe<Scalars['Float']['output']>;
};

export type WmsMutations = {
  __typename?: 'WmsMutations';
  createBinThreshold: WmsBinThreshold;
  createInventoryStock: WmsInventoryStock;
  createLocation: WmsLocation;
  createPackage: WmsPackage;
  createPackageItem: WmsPackageItem;
  createPickBatch: WmsPickBatch;
  createPickBatchItem: WmsPickBatchItem;
  createPutawayRule: WmsPutawayRule;
  createTask: WmsTask;
  createTaskItem: WmsTaskItem;
  createWarehouse: WmsWarehouse;
  deleteBinThreshold: Scalars['Boolean']['output'];
  deleteInventoryStock: Scalars['Boolean']['output'];
  deleteLocation: Scalars['Boolean']['output'];
  deletePackage: Scalars['Boolean']['output'];
  deletePackageItem: Scalars['Boolean']['output'];
  deletePickBatch: Scalars['Boolean']['output'];
  deletePickBatchItem: Scalars['Boolean']['output'];
  deletePutawayRule: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
  deleteTaskItem: Scalars['Boolean']['output'];
  deleteWarehouse: Scalars['Boolean']['output'];
  updateBinThreshold: WmsBinThreshold;
  updateInventoryStock: WmsInventoryStock;
  updateLocation: WmsLocation;
  updatePackage: WmsPackage;
  updatePackageItem: WmsPackageItem;
  updatePickBatch: WmsPickBatch;
  updatePickBatchItem: WmsPickBatchItem;
  updatePutawayRule: WmsPutawayRule;
  updateTask: WmsTask;
  updateTaskItem: WmsTaskItem;
  updateWarehouse: WmsWarehouse;
};


export type WmsMutationsCreateBinThresholdArgs = {
  value: InsertBinThreshold;
};


export type WmsMutationsCreateInventoryStockArgs = {
  value: InsertInventoryStock;
};


export type WmsMutationsCreateLocationArgs = {
  value: InsertLocation;
};


export type WmsMutationsCreatePackageArgs = {
  value: InsertPackage;
};


export type WmsMutationsCreatePackageItemArgs = {
  value: InsertPackageItem;
};


export type WmsMutationsCreatePickBatchArgs = {
  value: InsertPickBatch;
};


export type WmsMutationsCreatePickBatchItemArgs = {
  value: InsertPickBatchItem;
};


export type WmsMutationsCreatePutawayRuleArgs = {
  value: InsertPutawayRule;
};


export type WmsMutationsCreateTaskArgs = {
  value: InsertTask;
};


export type WmsMutationsCreateTaskItemArgs = {
  value: InsertTaskItem;
};


export type WmsMutationsCreateWarehouseArgs = {
  value: InsertWarehouse;
};


export type WmsMutationsDeleteBinThresholdArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeleteInventoryStockArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeleteLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeletePackageArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeletePackageItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeletePickBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeletePickBatchItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeletePutawayRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeleteTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeleteTaskItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeleteWarehouseArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsUpdateBinThresholdArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateBinThreshold;
};


export type WmsMutationsUpdateInventoryStockArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInventoryStock;
};


export type WmsMutationsUpdateLocationArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateLocation;
};


export type WmsMutationsUpdatePackageArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePackage;
};


export type WmsMutationsUpdatePackageItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePackageItem;
};


export type WmsMutationsUpdatePickBatchArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePickBatch;
};


export type WmsMutationsUpdatePickBatchItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePickBatchItem;
};


export type WmsMutationsUpdatePutawayRuleArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePutawayRule;
};


export type WmsMutationsUpdateTaskArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateTask;
};


export type WmsMutationsUpdateTaskItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateTaskItem;
};


export type WmsMutationsUpdateWarehouseArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateWarehouse;
};

export type WmsPackage = {
  __typename?: 'WmsPackage';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  insuranceValue?: Maybe<Scalars['Decimal']['output']>;
  isFragile?: Maybe<Scalars['Boolean']['output']>;
  isHazmat?: Maybe<Scalars['Boolean']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  packageItems: Array<WmsPackageItem>;
  packageNumber: Scalars['String']['output'];
  packageType?: Maybe<Scalars['String']['output']>;
  packedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  packedBy?: Maybe<AuthUser>;
  packedByUserId?: Maybe<Scalars['UUID']['output']>;
  requiresSignature?: Maybe<Scalars['Boolean']['output']>;
  salesOrder: ImsSalesOrder;
  salesOrderId: Scalars['UUID']['output'];
  serviceLevel?: Maybe<Scalars['String']['output']>;
  shippedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  warehouse: WmsWarehouse;
  warehouseId: Scalars['UUID']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type WmsPackageItem = {
  __typename?: 'WmsPackageItem';
  batch?: Maybe<ImsInventoryBatch>;
  batchId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  expiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  package: WmsPackage;
  packageId: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Scalars['String']['output']>>;
  totalWeight?: Maybe<Scalars['Float']['output']>;
  unitWeight?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type WmsPickBatch = {
  __typename?: 'WmsPickBatch';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  assignedUser?: Maybe<AuthUser>;
  assignedUserId?: Maybe<Scalars['UUID']['output']>;
  batchNumber: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  completedItems?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  pickBatchItems: Array<WmsPickBatchItem>;
  priority?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  status?: Maybe<PickBatchStatusEnum>;
  strategy: PickStrategyEnum;
  tasks: Array<WmsTask>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  warehouse: WmsWarehouse;
  warehouseId: Scalars['UUID']['output'];
  waveId?: Maybe<Scalars['String']['output']>;
  zoneRestrictions?: Maybe<Array<Scalars['String']['output']>>;
};

export type WmsPickBatchItem = {
  __typename?: 'WmsPickBatchItem';
  actualPickTime?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedPickTime?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  orderPriority?: Maybe<Scalars['Int']['output']>;
  pickBatch: WmsPickBatch;
  pickBatchId: Scalars['UUID']['output'];
  salesOrder: ImsSalesOrder;
  salesOrderId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type WmsPutawayRule = {
  __typename?: 'WmsPutawayRule';
  client?: Maybe<CrmCompany>;
  clientId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locationType?: Maybe<LocationTypeEnum>;
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  minQuantity?: Maybe<Scalars['Int']['output']>;
  preferredLocation?: Maybe<WmsLocation>;
  preferredLocationId?: Maybe<Scalars['UUID']['output']>;
  priority: Scalars['Int']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  requiresHazmatApproval?: Maybe<Scalars['Boolean']['output']>;
  requiresTemperatureControl?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  volumeThreshold?: Maybe<Scalars['Float']['output']>;
  warehouse: WmsWarehouse;
  warehouseId: Scalars['UUID']['output'];
  weightThreshold?: Maybe<Scalars['Float']['output']>;
};

export type WmsQueries = {
  __typename?: 'WmsQueries';
  binThreshold?: Maybe<WmsBinThreshold>;
  binThresholds: Array<WmsBinThreshold>;
  inventoryStock?: Maybe<WmsInventoryStock>;
  inventoryStocks: Array<WmsInventoryStock>;
  location?: Maybe<WmsLocation>;
  locations: Array<WmsLocation>;
  package?: Maybe<WmsPackage>;
  packageItem?: Maybe<WmsPackageItem>;
  packageItems: Array<WmsPackageItem>;
  packages: Array<WmsPackage>;
  pickBatch?: Maybe<WmsPickBatch>;
  pickBatchItem?: Maybe<WmsPickBatchItem>;
  pickBatchItems: Array<WmsPickBatchItem>;
  pickBatches: Array<WmsPickBatch>;
  putawayRule?: Maybe<WmsPutawayRule>;
  putawayRules: Array<WmsPutawayRule>;
  task?: Maybe<WmsTask>;
  taskItem?: Maybe<WmsTaskItem>;
  taskItems: Array<WmsTaskItem>;
  tasks: Array<WmsTask>;
  warehouse?: Maybe<WmsWarehouse>;
  warehouses: Array<WmsWarehouse>;
};


export type WmsQueriesBinThresholdArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesInventoryStockArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPackageArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPackageItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPickBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPickBatchItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPutawayRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesTaskItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesWarehouseArgs = {
  id: Scalars['UUID']['input'];
};

export type WmsTask = {
  __typename?: 'WmsTask';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  durationSeconds?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  pickBatch?: Maybe<WmsPickBatch>;
  pickBatchId?: Maybe<Scalars['UUID']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
  sourceEntityId?: Maybe<Scalars['UUID']['output']>;
  sourceEntityType?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  status?: Maybe<TaskStatusEnum>;
  taskItems: Array<WmsTaskItem>;
  taskNumber: Scalars['String']['output'];
  type: TaskTypeEnum;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  user?: Maybe<AuthUser>;
  userId?: Maybe<Scalars['UUID']['output']>;
  warehouse: WmsWarehouse;
  warehouseId: Scalars['UUID']['output'];
};

export type WmsTaskItem = {
  __typename?: 'WmsTaskItem';
  batch?: Maybe<ImsInventoryBatch>;
  batchId?: Maybe<Scalars['UUID']['output']>;
  completedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  destinationLocation?: Maybe<WmsLocation>;
  destinationLocationId?: Maybe<Scalars['UUID']['output']>;
  expiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantityCompleted: Scalars['Int']['output'];
  quantityRemaining?: Maybe<Scalars['Int']['output']>;
  quantityRequired: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Scalars['String']['output']>>;
  sourceLocation?: Maybe<WmsLocation>;
  sourceLocationId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<TaskItemStatusEnum>;
  task: WmsTask;
  taskId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type WmsWarehouse = {
  __typename?: 'WmsWarehouse';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locations: Array<WmsLocation>;
  name: Scalars['String']['output'];
  packages: Array<WmsPackage>;
  pickBatches: Array<WmsPickBatch>;
  postalCode?: Maybe<Scalars['String']['output']>;
  putawayRules: Array<WmsPutawayRule>;
  state?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutations', signInEmail: { __typename?: 'SignInResponse', token: string, user: { __typename?: 'AuthUser', id: any, name: string, email: string, emailVerified?: boolean | null } } } };

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

export const SignInDocument = new TypedDocumentString(`
    mutation SignIn($email: String!, $password: String!) {
  auth {
    signInEmail(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        emailVerified
      }
    }
  }
}
    `) as unknown as TypedDocumentString<SignInMutation, SignInMutationVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Implement the DateTime<FixedOffset> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  /**
   * ISO 8601 calendar date without timezone.
   * Format: %Y-%m-%d
   *
   * # Examples
   *
   * * `1994-11-13`
   * * `2000-02-24`
   */
  NaiveDate: { input: any; output: any; }
  /**
   * ISO 8601 combined date and time without timezone.
   *
   * # Examples
   *
   * * `2015-07-01T08:59:60.123`,
   */
  NaiveDateTime: { input: any; output: any; }
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
   * Strings within GraphQL. UUIDs are used to assign unique identifiers to
   * entities without requiring a central allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique Identifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: { input: any; output: any; }
  /** URL is a String implementing the [URL Standard](http://url.spec.whatwg.org/) */
  Url: { input: any; output: any; }
};

export type AuthMutations = {
  __typename?: 'AuthMutations';
  refreshToken: Users;
  signInEmail: SignInResponse;
  signUpEmail: AuthUser;
};


export type AuthMutationsSignInEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type AuthMutationsSignUpEmailArgs = {
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['Url']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};

export type AuthQuery = {
  __typename?: 'AuthQuery';
  user?: Maybe<AuthUser>;
  users: Array<AuthUser>;
};


export type AuthQueryUserArgs = {
  id: Scalars['UUID']['input'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  banExpires?: Maybe<Scalars['NaiveDateTime']['output']>;
  banReason?: Maybe<Scalars['String']['output']>;
  banned?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['NaiveDateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['UUID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['NaiveDateTime']['output'];
};

export type BillingAccountTransaction = {
  __typename?: 'BillingAccountTransaction';
  amount: Scalars['Decimal']['output'];
  clientAccount: BillingClientAccount;
  clientAccountId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  processedByUserId?: Maybe<Scalars['UUID']['output']>;
  referenceNumber?: Maybe<Scalars['String']['output']>;
  runningBalance?: Maybe<Scalars['Decimal']['output']>;
  sourceRecordId?: Maybe<Scalars['UUID']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  transactionDate?: Maybe<Scalars['NaiveDateTime']['output']>;
  type: TransactionTypeEnum;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingAccountingSyncLog = {
  __typename?: 'BillingAccountingSyncLog';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  externalSystem: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastSyncAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  nextRetryAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  recordId: Scalars['UUID']['output'];
  recordType: Scalars['String']['output'];
  requestPayload?: Maybe<Scalars['String']['output']>;
  responsePayload?: Maybe<Scalars['String']['output']>;
  retryCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<SyncStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingClientAccount = {
  __typename?: 'BillingClientAccount';
  accountTransactions: Array<BillingAccountTransaction>;
  availableCredit?: Maybe<Scalars['Decimal']['output']>;
  client: CrmCompany;
  clientId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  creditLimit?: Maybe<Scalars['Decimal']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isCreditApproved?: Maybe<Scalars['Boolean']['output']>;
  lastPaymentDate?: Maybe<Scalars['NaiveDate']['output']>;
  paymentTermsDays?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  walletBalance?: Maybe<Scalars['Decimal']['output']>;
};

export type BillingCreditNote = {
  __typename?: 'BillingCreditNote';
  amount: Scalars['Decimal']['output'];
  appliedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdByUserId?: Maybe<Scalars['UUID']['output']>;
  creditNoteNumber: Scalars['String']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  dispute?: Maybe<BillingDispute>;
  disputeId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoice;
  invoiceId: Scalars['UUID']['output'];
  issueDate: Scalars['NaiveDate']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingDispute = {
  __typename?: 'BillingDispute';
  client: CrmCompany;
  clientId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  creditNotes: Array<BillingCreditNote>;
  disputedAmount?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['UUID']['output'];
  lineItem: BillingInvoiceLineItem;
  lineItemId: Scalars['UUID']['output'];
  reason: Scalars['String']['output'];
  resolutionNotes?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  resolvedByUser?: Maybe<AuthUser>;
  resolvedByUserId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<DisputeStatusEnum>;
  submittedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingDocument = {
  __typename?: 'BillingDocument';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  documentType: DocumentTypeEnum;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  fileSize?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId: Scalars['UUID']['output'];
  recordType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  uploadedByUser?: Maybe<AuthUser>;
  uploadedByUserId?: Maybe<Scalars['UUID']['output']>;
};

export type BillingInvoice = {
  __typename?: 'BillingInvoice';
  amountOutstanding?: Maybe<Scalars['Decimal']['output']>;
  amountPaid?: Maybe<Scalars['Decimal']['output']>;
  client: CrmCompany;
  clientId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdByUserId?: Maybe<Scalars['UUID']['output']>;
  creditNotes: Array<BillingCreditNote>;
  currency?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['Decimal']['output']>;
  dueDate: Scalars['NaiveDate']['output'];
  id: Scalars['UUID']['output'];
  invoiceLineItems: Array<BillingInvoiceLineItem>;
  invoiceNumber: Scalars['String']['output'];
  issueDate: Scalars['NaiveDate']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  paymentTerms?: Maybe<Scalars['String']['output']>;
  payments: Array<BillingPayment>;
  quote?: Maybe<BillingQuote>;
  quoteId?: Maybe<Scalars['UUID']['output']>;
  sentAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  status?: Maybe<InvoiceStatusEnum>;
  subtotal?: Maybe<Scalars['Decimal']['output']>;
  taxAmount?: Maybe<Scalars['Decimal']['output']>;
  totalAmount: Scalars['Decimal']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingInvoiceLineItem = {
  __typename?: 'BillingInvoiceLineItem';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  description: Scalars['String']['output'];
  discountAmount?: Maybe<Scalars['Decimal']['output']>;
  discountRate?: Maybe<Scalars['Decimal']['output']>;
  disputes: Array<BillingDispute>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoice;
  invoiceId: Scalars['UUID']['output'];
  lineTotal?: Maybe<Scalars['Decimal']['output']>;
  quantity: Scalars['Decimal']['output'];
  sourceRecordId?: Maybe<Scalars['UUID']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  taxAmount?: Maybe<Scalars['Decimal']['output']>;
  taxRate?: Maybe<Scalars['Decimal']['output']>;
  totalPrice?: Maybe<Scalars['Decimal']['output']>;
  unitPrice: Scalars['Decimal']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingMutations = {
  __typename?: 'BillingMutations';
  createAccountTransaction: BillingAccountTransaction;
  createAccountingSyncLog: BillingAccountingSyncLog;
  createClientAccount: BillingClientAccount;
  createCreditNote: BillingCreditNote;
  createDispute: BillingDispute;
  createDocument: BillingDocument;
  createInvoice: BillingInvoice;
  createInvoiceLineItem: BillingInvoiceLineItem;
  createPayment: BillingPayment;
  createQuote: BillingQuote;
  createRateCard: BillingRateCard;
  createRateRule: BillingRateRule;
  createSurcharge: BillingSurcharge;
  deleteAccountTransaction: Scalars['Boolean']['output'];
  deleteAccountingSyncLog: Scalars['Boolean']['output'];
  deleteClientAccount: Scalars['Boolean']['output'];
  deleteCreditNote: Scalars['Boolean']['output'];
  deleteDispute: Scalars['Boolean']['output'];
  deleteDocument: Scalars['Boolean']['output'];
  deleteInvoice: Scalars['Boolean']['output'];
  deleteInvoiceLineItem: Scalars['Boolean']['output'];
  deletePayment: Scalars['Boolean']['output'];
  deleteQuote: Scalars['Boolean']['output'];
  deleteRateCard: Scalars['Boolean']['output'];
  deleteRateRule: Scalars['Boolean']['output'];
  deleteSurcharge: Scalars['Boolean']['output'];
  updateAccountTransaction: BillingAccountTransaction;
  updateAccountingSyncLog: BillingAccountingSyncLog;
  updateClientAccount: BillingClientAccount;
  updateCreditNote: BillingCreditNote;
  updateDispute: BillingDispute;
  updateDocument: BillingDocument;
  updateInvoice: BillingInvoice;
  updateInvoiceLineItem: BillingInvoiceLineItem;
  updatePayment: BillingPayment;
  updateQuote: BillingQuote;
  updateRateCard: BillingRateCard;
  updateRateRule: BillingRateRule;
  updateSurcharge: BillingSurcharge;
};


export type BillingMutationsCreateAccountTransactionArgs = {
  value: InsertAccountTransaction;
};


export type BillingMutationsCreateAccountingSyncLogArgs = {
  value: InsertAccountingSyncLog;
};


export type BillingMutationsCreateClientAccountArgs = {
  value: InsertClientAccount;
};


export type BillingMutationsCreateCreditNoteArgs = {
  value: InsertCreditNote;
};


export type BillingMutationsCreateDisputeArgs = {
  value: InsertDispute;
};


export type BillingMutationsCreateDocumentArgs = {
  value: InsertDocument;
};


export type BillingMutationsCreateInvoiceArgs = {
  value: InsertInvoice;
};


export type BillingMutationsCreateInvoiceLineItemArgs = {
  value: InsertInvoiceLineItem;
};


export type BillingMutationsCreatePaymentArgs = {
  value: InsertPayment;
};


export type BillingMutationsCreateQuoteArgs = {
  value: InsertQuote;
};


export type BillingMutationsCreateRateCardArgs = {
  value: InsertRateCard;
};


export type BillingMutationsCreateRateRuleArgs = {
  value: InsertRateRule;
};


export type BillingMutationsCreateSurchargeArgs = {
  value: InsertSurcharge;
};


export type BillingMutationsDeleteAccountTransactionArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteAccountingSyncLogArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteClientAccountArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteCreditNoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteDisputeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteDocumentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteInvoiceLineItemArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeletePaymentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteQuoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteRateCardArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteRateRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsDeleteSurchargeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountTransactionArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateAccountTransaction;
};


export type BillingMutationsUpdateAccountingSyncLogArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateAccountingSyncLog;
};


export type BillingMutationsUpdateClientAccountArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateClientAccount;
};


export type BillingMutationsUpdateCreditNoteArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCreditNote;
};


export type BillingMutationsUpdateDisputeArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDispute;
};


export type BillingMutationsUpdateDocumentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDocument;
};


export type BillingMutationsUpdateInvoiceArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInvoice;
};


export type BillingMutationsUpdateInvoiceLineItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInvoiceLineItem;
};


export type BillingMutationsUpdatePaymentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePayment;
};


export type BillingMutationsUpdateQuoteArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateQuote;
};


export type BillingMutationsUpdateRateCardArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateRateCard;
};


export type BillingMutationsUpdateRateRuleArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateRateRule;
};


export type BillingMutationsUpdateSurchargeArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateSurcharge;
};

export type BillingPayment = {
  __typename?: 'BillingPayment';
  amount: Scalars['Decimal']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  exchangeRate?: Maybe<Scalars['Decimal']['output']>;
  fees?: Maybe<Scalars['Decimal']['output']>;
  gatewayReference?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoice;
  invoiceId: Scalars['UUID']['output'];
  netAmount?: Maybe<Scalars['Decimal']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  paymentDate?: Maybe<Scalars['NaiveDateTime']['output']>;
  paymentMethod: PaymentMethodEnum;
  processedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  processedByUserId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<PaymentStatusEnum>;
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type BillingQueries = {
  __typename?: 'BillingQueries';
  accountTransaction?: Maybe<BillingAccountTransaction>;
  accountTransactions: Array<BillingAccountTransaction>;
  accountingSyncLog?: Maybe<BillingAccountingSyncLog>;
  accountingSyncLogs: Array<BillingAccountingSyncLog>;
  clientAccount?: Maybe<BillingClientAccount>;
  clientAccounts: Array<BillingClientAccount>;
  creditNote?: Maybe<BillingCreditNote>;
  creditNotes: Array<BillingCreditNote>;
  dispute?: Maybe<BillingDispute>;
  disputes: Array<BillingDispute>;
  document?: Maybe<BillingDocument>;
  documents: Array<BillingDocument>;
  invoice?: Maybe<BillingInvoice>;
  invoiceLineItem?: Maybe<BillingInvoiceLineItem>;
  invoiceLineItems: Array<BillingInvoiceLineItem>;
  invoices: Array<BillingInvoice>;
  payment?: Maybe<BillingPayment>;
  payments: Array<BillingPayment>;
  quote?: Maybe<BillingQuote>;
  quotes: Array<BillingQuote>;
  rateCard?: Maybe<BillingRateCard>;
  rateCards: Array<BillingRateCard>;
  rateRule?: Maybe<BillingRateRule>;
  rateRules: Array<BillingRateRule>;
  surcharge?: Maybe<BillingSurcharge>;
  surcharges: Array<BillingSurcharge>;
};


export type BillingQueriesAccountTransactionArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesAccountingSyncLogArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesClientAccountArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesCreditNoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesDisputeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesDocumentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesInvoiceLineItemArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesPaymentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesQuoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesRateCardArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesRateRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesSurchargeArgs = {
  id: Scalars['UUID']['input'];
};

export type BillingQuote = {
  __typename?: 'BillingQuote';
  client?: Maybe<CrmCompany>;
  clientId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdByUser?: Maybe<AuthUser>;
  createdByUserId?: Maybe<Scalars['UUID']['output']>;
  destinationDetails: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  height?: Maybe<Scalars['Decimal']['output']>;
  id: Scalars['UUID']['output'];
  invoices: Array<BillingInvoice>;
  length?: Maybe<Scalars['Decimal']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  originDetails: Scalars['String']['output'];
  quoteNumber?: Maybe<Scalars['String']['output']>;
  quotedPrice: Scalars['Decimal']['output'];
  serviceLevel?: Maybe<Scalars['String']['output']>;
  status?: Maybe<QuoteStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  volume?: Maybe<Scalars['Decimal']['output']>;
  weight?: Maybe<Scalars['Decimal']['output']>;
  width?: Maybe<Scalars['Decimal']['output']>;
};

export type BillingRateCard = {
  __typename?: 'BillingRateCard';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdByUser?: Maybe<AuthUser>;
  createdByUserId?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  rateRules: Array<BillingRateRule>;
  serviceType: ServiceTypeEnum;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  validFrom: Scalars['NaiveDate']['output'];
  validTo?: Maybe<Scalars['NaiveDate']['output']>;
};

export type BillingRateRule = {
  __typename?: 'BillingRateRule';
  condition: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  maxValue?: Maybe<Scalars['Decimal']['output']>;
  minValue?: Maybe<Scalars['Decimal']['output']>;
  price: Scalars['Decimal']['output'];
  pricingModel: PricingModelEnum;
  priority?: Maybe<Scalars['Int']['output']>;
  rateCard: BillingRateCard;
  rateCardId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  value: Scalars['String']['output'];
};

export type BillingSurcharge = {
  __typename?: 'BillingSurcharge';
  amount: Scalars['Decimal']['output'];
  calculationMethod: SurchargeCalculationMethodEnum;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  validFrom?: Maybe<Scalars['NaiveDate']['output']>;
  validTo?: Maybe<Scalars['NaiveDate']['output']>;
};

export enum CarrierRateUnitEnum {
  FlatRate = 'FLAT_RATE',
  PerContainer = 'PER_CONTAINER',
  PerKg = 'PER_KG',
  PerKm = 'PER_KM',
  PerMile = 'PER_MILE'
}

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

export type CrmAttachment = {
  __typename?: 'CrmAttachment';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId?: Maybe<Scalars['UUID']['output']>;
  recordType?: Maybe<RecordType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCampaign = {
  __typename?: 'CrmCampaign';
  budget?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  leads: Array<CrmLead>;
  name: Scalars['String']['output'];
  opportunities: Array<CrmOpportunity>;
  startDate?: Maybe<Scalars['NaiveDate']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCase = {
  __typename?: 'CrmCase';
  caseNumber: Scalars['String']['output'];
  contact?: Maybe<CrmContact>;
  contactId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  interactions: Array<CrmInteraction>;
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  priority?: Maybe<CasePriority>;
  status?: Maybe<CaseStatus>;
  type?: Maybe<CaseType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCompany = {
  __typename?: 'CrmCompany';
  annualRevenue?: Maybe<Scalars['Decimal']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  contacts: Array<CrmContact>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  leads: Array<CrmLead>;
  name: Scalars['String']['output'];
  opportunities: Array<CrmOpportunity>;
  ownerId?: Maybe<Scalars['UUID']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<AuthUser>;
  website?: Maybe<Scalars['String']['output']>;
};

export type CrmContact = {
  __typename?: 'CrmContact';
  cases: Array<CrmCase>;
  company?: Maybe<CrmCompany>;
  companyId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  interactions: Array<CrmInteraction>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  leads: Array<CrmLead>;
  name: Scalars['String']['output'];
  opportunities: Array<CrmOpportunity>;
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInteraction = {
  __typename?: 'CrmInteraction';
  case?: Maybe<CrmCase>;
  caseId?: Maybe<Scalars['UUID']['output']>;
  contact: CrmContact;
  contactId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  interactionDate?: Maybe<Scalars['DateTime']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  type?: Maybe<InteractionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
  userId: Scalars['UUID']['output'];
};

export type CrmInvoice = {
  __typename?: 'CrmInvoice';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dueDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  invoiceItems: Array<CrmInvoiceItem>;
  issueDate?: Maybe<Scalars['NaiveDate']['output']>;
  opportunity?: Maybe<CrmOpportunity>;
  opportunityId?: Maybe<Scalars['UUID']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<InvoiceStatus>;
  total?: Maybe<Scalars['Decimal']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInvoiceItem = {
  __typename?: 'CrmInvoiceItem';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  invoice: CrmInvoice;
  invoiceId: Scalars['UUID']['output'];
  price: Scalars['Decimal']['output'];
  product: CrmProduct;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmLead = {
  __typename?: 'CrmLead';
  campaign?: Maybe<CrmCampaign>;
  campaignId?: Maybe<Scalars['UUID']['output']>;
  company?: Maybe<CrmCompany>;
  contact?: Maybe<CrmContact>;
  convertedAt?: Maybe<Scalars['DateTime']['output']>;
  convertedCompanyId?: Maybe<Scalars['UUID']['output']>;
  convertedContactId?: Maybe<Scalars['UUID']['output']>;
  convertedOpportunityId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  leadScore?: Maybe<Scalars['Int']['output']>;
  leadSource?: Maybe<LeadSource>;
  name: Scalars['String']['output'];
  opportunity?: Maybe<CrmOpportunity>;
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  status?: Maybe<LeadStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmMutations = {
  __typename?: 'CrmMutations';
  createAttachment: CrmAttachment;
  createCampaign: CrmCampaign;
  createCase: CrmCase;
  createCompany: CrmCompany;
  createContact: CrmContact;
  createInteraction: CrmInteraction;
  createInvoiceItem: CrmInvoiceItem;
  deleteAttachment: Scalars['Boolean']['output'];
  deleteCampaign: Scalars['Boolean']['output'];
  deleteCase: Scalars['Boolean']['output'];
  deleteCompany: Scalars['Boolean']['output'];
  deleteContact: Scalars['Boolean']['output'];
  deleteInteraction: Scalars['Boolean']['output'];
  deleteInvoiceItem: Scalars['Boolean']['output'];
  updateAttachment: CrmAttachment;
  updateCampaign: CrmCampaign;
  updateCase: CrmCase;
  updateCompany: CrmCompany;
  updateContact: CrmContact;
  updateInteraction: CrmInteraction;
  updateInvoiceItem: CrmInvoiceItem;
};


export type CrmMutationsCreateAttachmentArgs = {
  value: InsertAttachment;
};


export type CrmMutationsCreateCampaignArgs = {
  value: InsertCampaign;
};


export type CrmMutationsCreateCaseArgs = {
  value: InsertCase;
};


export type CrmMutationsCreateCompanyArgs = {
  value: InsertCompany;
};


export type CrmMutationsCreateContactArgs = {
  value: InsertContact;
};


export type CrmMutationsCreateInteractionArgs = {
  value: InsertInteraction;
};


export type CrmMutationsCreateInvoiceItemArgs = {
  value: InsertInvoiceItem;
};


export type CrmMutationsDeleteAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsDeleteInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateAttachmentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateAttachment;
};


export type CrmMutationsUpdateCampaignArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCampaign;
};


export type CrmMutationsUpdateCaseArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCase;
};


export type CrmMutationsUpdateCompanyArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCompany;
};


export type CrmMutationsUpdateContactArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateContact;
};


export type CrmMutationsUpdateInteractionArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInteraction;
};


export type CrmMutationsUpdateInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInvoiceItem;
};

export type CrmOpportunity = {
  __typename?: 'CrmOpportunity';
  campaign?: Maybe<CrmCampaign>;
  campaignId?: Maybe<Scalars['UUID']['output']>;
  company?: Maybe<CrmCompany>;
  companyId?: Maybe<Scalars['UUID']['output']>;
  contact?: Maybe<CrmContact>;
  contactId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dealValue?: Maybe<Scalars['Decimal']['output']>;
  expectedCloseDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  invoices: Array<CrmInvoice>;
  leads: Array<CrmLead>;
  lostReason?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  opportunityProducts: Array<CrmOpportunityProduct>;
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  probability?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<OpportunitySource>;
  stage?: Maybe<OpportunityStage>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmOpportunityProduct = {
  __typename?: 'CrmOpportunityProduct';
  opportunity: CrmOpportunity;
  opportunityId: Scalars['UUID']['output'];
  product: CrmProduct;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
};

export type CrmProduct = {
  __typename?: 'CrmProduct';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  invoiceItems: Array<CrmInvoiceItem>;
  name: Scalars['String']['output'];
  opportunityProducts: Array<CrmOpportunityProduct>;
  price: Scalars['Decimal']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmQueries = {
  __typename?: 'CrmQueries';
  attachment?: Maybe<CrmAttachment>;
  attachments: Array<CrmAttachment>;
  campaign?: Maybe<CrmCampaign>;
  campaigns: Array<CrmCampaign>;
  case?: Maybe<CrmCase>;
  cases: Array<CrmCase>;
  companies: Array<CrmCompany>;
  company?: Maybe<CrmCompany>;
  contact?: Maybe<CrmContact>;
  contacts: Array<CrmContact>;
  interaction?: Maybe<CrmInteraction>;
  interactions: Array<CrmInteraction>;
  invoiceItem?: Maybe<CrmInvoiceItem>;
  invoiceItems: Array<CrmInvoiceItem>;
};


export type CrmQueriesAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
};

export enum CurrencyEnum {
  Aud = 'AUD',
  Cad = 'CAD',
  Eur = 'EUR',
  Gbp = 'GBP',
  Jpy = 'JPY',
  Php = 'PHP',
  Usd = 'USD'
}

export enum DeliveryFailureReasonEnum {
  AccessDenied = 'ACCESS_DENIED',
  AddressNotFound = 'ADDRESS_NOT_FOUND',
  DamagedPackage = 'DAMAGED_PACKAGE',
  Other = 'OTHER',
  RecipientNotHome = 'RECIPIENT_NOT_HOME',
  RefusedDelivery = 'REFUSED_DELIVERY',
  VehicleBreakdown = 'VEHICLE_BREAKDOWN',
  WeatherConditions = 'WEATHER_CONDITIONS'
}

export enum DeliveryRouteStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Paused = 'PAUSED',
  Planned = 'PLANNED'
}

export enum DeliveryTaskStatusEnum {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  Pending = 'PENDING',
  Rescheduled = 'RESCHEDULED'
}

export enum DisputeStatusEnum {
  Approved = 'APPROVED',
  Closed = 'CLOSED',
  Denied = 'DENIED',
  Escalated = 'ESCALATED',
  Open = 'OPEN',
  UnderReview = 'UNDER_REVIEW'
}

export type DmsCustomerTrackingLink = {
  __typename?: 'DmsCustomerTrackingLink';
  accessCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  deliveryTask: DmsDeliveryTask;
  deliveryTaskId: Scalars['UUID']['output'];
  expiresAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastAccessedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  trackingToken: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type DmsDeliveryRoute = {
  __typename?: 'DmsDeliveryRoute';
  actualDurationMinutes?: Maybe<Scalars['Int']['output']>;
  completedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  deliveryTasks: Array<DmsDeliveryTask>;
  driver: TmsDriver;
  driverId: Scalars['UUID']['output'];
  estimatedDurationMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  routeDate: Scalars['NaiveDate']['output'];
  startedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  status?: Maybe<DeliveryRouteStatusEnum>;
  totalDistanceKm?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type DmsDeliveryTask = {
  __typename?: 'DmsDeliveryTask';
  actualArrivalTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  attemptCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  customerTrackingLinks: Array<DmsCustomerTrackingLink>;
  deliveryAddress: Scalars['String']['output'];
  deliveryInstructions?: Maybe<Scalars['String']['output']>;
  deliveryRoute: DmsDeliveryRoute;
  deliveryRouteId: Scalars['UUID']['output'];
  deliveryTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  failureReason?: Maybe<DeliveryFailureReasonEnum>;
  id: Scalars['UUID']['output'];
  package: WmsPackage;
  packageId: Scalars['UUID']['output'];
  proofOfDeliveries: Array<DmsProofOfDelivery>;
  recipientName?: Maybe<Scalars['String']['output']>;
  recipientPhone?: Maybe<Scalars['String']['output']>;
  routeSequence: Scalars['Int']['output'];
  status?: Maybe<DeliveryTaskStatusEnum>;
  taskEvents: Array<DmsTaskEvent>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type DmsDriverLocation = {
  __typename?: 'DmsDriverLocation';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  driver: TmsDriver;
  driverId: Scalars['UUID']['output'];
  heading?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  speedKmh?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['NaiveDateTime']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type DmsInsertProofOfDelivery = {
  deliveryTaskId: Scalars['UUID']['input'];
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  signatureData?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  type: ProofOfDeliveryTypeEnum;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export type DmsMutations = {
  __typename?: 'DmsMutations';
  createCustomerTrackingLink: DmsCustomerTrackingLink;
  createDeliveryRoute: DmsDeliveryRoute;
  createDeliveryTask: DmsDeliveryTask;
  createDriverLocation: DmsDriverLocation;
  createProofOfDelivery: DmsProofOfDelivery;
  createTaskEvent: DmsTaskEvent;
  deleteCustomerTrackingLink: Scalars['Boolean']['output'];
  deleteDeliveryRoute: Scalars['Boolean']['output'];
  deleteDeliveryTask: Scalars['Boolean']['output'];
  deleteDriverLocation: Scalars['Boolean']['output'];
  deleteProofOfDelivery: Scalars['Boolean']['output'];
  deleteTaskEvent: Scalars['Boolean']['output'];
  updateCustomerTrackingLink: DmsCustomerTrackingLink;
  updateDeliveryRoute: DmsDeliveryRoute;
  updateDeliveryTask: DmsDeliveryTask;
  updateDriverLocation: DmsDriverLocation;
  updateProofOfDelivery: DmsProofOfDelivery;
  updateTaskEvent: DmsTaskEvent;
};


export type DmsMutationsCreateCustomerTrackingLinkArgs = {
  value: InsertCustomerTrackingLink;
};


export type DmsMutationsCreateDeliveryRouteArgs = {
  value: InsertDeliveryRoute;
};


export type DmsMutationsCreateDeliveryTaskArgs = {
  value: InsertDeliveryTask;
};


export type DmsMutationsCreateDriverLocationArgs = {
  value: InsertDriverLocation;
};


export type DmsMutationsCreateProofOfDeliveryArgs = {
  value: DmsInsertProofOfDelivery;
};


export type DmsMutationsCreateTaskEventArgs = {
  value: InsertTaskEvent;
};


export type DmsMutationsDeleteCustomerTrackingLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsDeleteDeliveryRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsDeleteDeliveryTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsDeleteDriverLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsDeleteProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsDeleteTaskEventArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateCustomerTrackingLinkArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCustomerTrackingLink;
};


export type DmsMutationsUpdateDeliveryRouteArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDeliveryRoute;
};


export type DmsMutationsUpdateDeliveryTaskArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDeliveryTask;
};


export type DmsMutationsUpdateDriverLocationArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDriverLocation;
};


export type DmsMutationsUpdateProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
  value: DmsUpdateProofOfDelivery;
};


export type DmsMutationsUpdateTaskEventArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateTaskEvent;
};

export type DmsProofOfDelivery = {
  __typename?: 'DmsProofOfDelivery';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  deliveryTask: DmsDeliveryTask;
  deliveryTaskId: Scalars['UUID']['output'];
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  recipientName?: Maybe<Scalars['String']['output']>;
  signatureData?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['NaiveDateTime']['output']>;
  type: ProofOfDeliveryTypeEnum;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  verificationCode?: Maybe<Scalars['String']['output']>;
};

export type DmsQueries = {
  __typename?: 'DmsQueries';
  customerTrackingLink?: Maybe<DmsCustomerTrackingLink>;
  customerTrackingLinks: Array<DmsCustomerTrackingLink>;
  deliveryRoute?: Maybe<DmsDeliveryRoute>;
  deliveryRoutes: Array<DmsDeliveryRoute>;
  deliveryTask?: Maybe<DmsDeliveryTask>;
  deliveryTasks: Array<DmsDeliveryTask>;
  driverLocation?: Maybe<DmsDriverLocation>;
  driverLocations: Array<DmsDriverLocation>;
  proofOfDeliveries: Array<DmsProofOfDelivery>;
  proofOfDelivery?: Maybe<DmsProofOfDelivery>;
  taskEvent?: Maybe<DmsTaskEvent>;
  taskEvents: Array<DmsTaskEvent>;
};


export type DmsQueriesCustomerTrackingLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDeliveryRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDeliveryTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDriverLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesTaskEventArgs = {
  id: Scalars['UUID']['input'];
};

export type DmsTaskEvent = {
  __typename?: 'DmsTaskEvent';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  deliveryTask: DmsDeliveryTask;
  deliveryTaskId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status: TaskEventStatusEnum;
  timestamp?: Maybe<Scalars['NaiveDateTime']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type DmsUpdateProofOfDelivery = {
  deliveryTaskId?: InputMaybe<Scalars['UUID']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  signatureData?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  type?: InputMaybe<ProofOfDeliveryTypeEnum>;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export enum DocumentTypeEnum {
  Bol = 'BOL',
  CommercialInvoice = 'COMMERCIAL_INVOICE',
  CreditNote = 'CREDIT_NOTE',
  CustomsDeclaration = 'CUSTOMS_DECLARATION',
  PackingList = 'PACKING_LIST',
  ProofOfDelivery = 'PROOF_OF_DELIVERY',
  Receipt = 'RECEIPT',
  ShippingLabel = 'SHIPPING_LABEL'
}

export enum DriverScheduleReasonEnum {
  PersonalLeave = 'PERSONAL_LEAVE',
  SickLeave = 'SICK_LEAVE',
  Training = 'TRAINING',
  Vacation = 'VACATION'
}

export enum DriverStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  OnLeave = 'ON_LEAVE'
}

export enum ExpenseStatusEnum {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Reimbursed = 'REIMBURSED',
  Rejected = 'REJECTED'
}

export enum ExpenseTypeEnum {
  Accommodation = 'ACCOMMODATION',
  Fuel = 'FUEL',
  Maintenance = 'MAINTENANCE',
  Meals = 'MEALS',
  Parking = 'PARKING',
  Tolls = 'TOLLS'
}

export enum GeofenceEventTypeEnum {
  Enter = 'ENTER',
  Exit = 'EXIT'
}

export type ImsInboundShipment = {
  __typename?: 'ImsInboundShipment';
  actualArrivalDate?: Maybe<Scalars['NaiveDate']['output']>;
  client?: Maybe<CrmCompany>;
  clientId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  expectedArrivalDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  inboundShipmentItems: Array<ImsInboundShipmentItem>;
  status?: Maybe<InboundShipmentStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  warehouseId: Scalars['UUID']['output'];
};

export type ImsInboundShipmentItem = {
  __typename?: 'ImsInboundShipmentItem';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  discrepancyNotes?: Maybe<Scalars['String']['output']>;
  discrepancyQuantity?: Maybe<Scalars['Int']['output']>;
  expectedQuantity: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  inboundShipment: ImsInboundShipment;
  inboundShipmentId: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  receivedQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsInventoryAdjustment = {
  __typename?: 'ImsInventoryAdjustment';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantityChange: Scalars['Int']['output'];
  reason?: Maybe<InventoryAdjustmentReasonEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  user: AuthUser;
  userId: Scalars['UUID']['output'];
  warehouseId: Scalars['UUID']['output'];
};

export type ImsInventoryBatch = {
  __typename?: 'ImsInventoryBatch';
  batchNumber: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  expirationDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsMutations = {
  __typename?: 'ImsMutations';
  createInboundShipment: ImsInboundShipment;
  createInboundShipmentItem: ImsInboundShipmentItem;
  createInventoryAdjustment: ImsInventoryAdjustment;
  createInventoryBatch: ImsInventoryBatch;
  createOutboundShipment: ImsOutboundShipment;
  createOutboundShipmentItem: ImsOutboundShipmentItem;
  createProduct: ImsProduct;
  createReorderPoint: ImsReorderPoint;
  createReturn: ImsReturn;
  createReturnItem: ImsReturnItem;
  createSalesOrder: ImsSalesOrder;
  createSalesOrderItem: ImsSalesOrderItem;
  createStockTransfer: ImsStockTransfer;
  createSupplier: ImsSupplier;
  deleteInboundShipment: Scalars['Boolean']['output'];
  deleteInboundShipmentItem: Scalars['Boolean']['output'];
  deleteInventoryAdjustment: Scalars['Boolean']['output'];
  deleteInventoryBatch: Scalars['Boolean']['output'];
  deleteOutboundShipment: Scalars['Boolean']['output'];
  deleteOutboundShipmentItem: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteReorderPoint: Scalars['Boolean']['output'];
  deleteReturn: Scalars['Boolean']['output'];
  deleteReturnItem: Scalars['Boolean']['output'];
  deleteSalesOrder: Scalars['Boolean']['output'];
  deleteSalesOrderItem: Scalars['Boolean']['output'];
  deleteStockTransfer: Scalars['Boolean']['output'];
  deleteSupplier: Scalars['Boolean']['output'];
  updateInboundShipment: ImsInboundShipment;
  updateInboundShipmentItem: ImsInboundShipmentItem;
  updateInventoryAdjustment: ImsInventoryAdjustment;
  updateInventoryBatch: ImsInventoryBatch;
  updateOutboundShipment: ImsOutboundShipment;
  updateOutboundShipmentItem: ImsOutboundShipmentItem;
  updateProduct: ImsProduct;
  updateReorderPoint: ImsReorderPoint;
  updateReturn: ImsReturn;
  updateReturnItem: ImsReturnItem;
  updateSalesOrder: ImsSalesOrder;
  updateSalesOrderItem: ImsSalesOrderItem;
  updateStockTransfer: ImsStockTransfer;
  updateSupplier: ImsSupplier;
};


export type ImsMutationsCreateInboundShipmentArgs = {
  value: InsertInboundShipment;
};


export type ImsMutationsCreateInboundShipmentItemArgs = {
  value: InsertInboundShipmentItem;
};


export type ImsMutationsCreateInventoryAdjustmentArgs = {
  value: InsertInventoryAdjustment;
};


export type ImsMutationsCreateInventoryBatchArgs = {
  value: InsertInventoryBatch;
};


export type ImsMutationsCreateOutboundShipmentArgs = {
  value: InsertOutboundShipment;
};


export type ImsMutationsCreateOutboundShipmentItemArgs = {
  value: InsertOutboundShipmentItem;
};


export type ImsMutationsCreateProductArgs = {
  value: InsertProduct;
};


export type ImsMutationsCreateReorderPointArgs = {
  value: InsertReorderPoint;
};


export type ImsMutationsCreateReturnArgs = {
  value: InsertReturn;
};


export type ImsMutationsCreateReturnItemArgs = {
  value: InsertReturnItem;
};


export type ImsMutationsCreateSalesOrderArgs = {
  value: InsertSalesOrder;
};


export type ImsMutationsCreateSalesOrderItemArgs = {
  value: InsertSalesOrderItem;
};


export type ImsMutationsCreateStockTransferArgs = {
  value: InsertStockTransfer;
};


export type ImsMutationsCreateSupplierArgs = {
  value: InsertSupplier;
};


export type ImsMutationsDeleteInboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteInboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteInventoryAdjustmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteInventoryBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteOutboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteOutboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteProductArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteReorderPointArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteReturnArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteReturnItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteSalesOrderArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteSalesOrderItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteStockTransferArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsDeleteSupplierArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsMutationsUpdateInboundShipmentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInboundShipment;
};


export type ImsMutationsUpdateInboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInboundShipmentItem;
};


export type ImsMutationsUpdateInventoryAdjustmentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInventoryAdjustment;
};


export type ImsMutationsUpdateInventoryBatchArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInventoryBatch;
};


export type ImsMutationsUpdateOutboundShipmentArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateOutboundShipment;
};


export type ImsMutationsUpdateOutboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateOutboundShipmentItem;
};


export type ImsMutationsUpdateProductArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateProduct;
};


export type ImsMutationsUpdateReorderPointArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateReorderPoint;
};


export type ImsMutationsUpdateReturnArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateReturn;
};


export type ImsMutationsUpdateReturnItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateReturnItem;
};


export type ImsMutationsUpdateSalesOrderArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateSalesOrder;
};


export type ImsMutationsUpdateSalesOrderItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateSalesOrderItem;
};


export type ImsMutationsUpdateStockTransferArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateStockTransfer;
};


export type ImsMutationsUpdateSupplierArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateSupplier;
};

export type ImsOutboundShipment = {
  __typename?: 'ImsOutboundShipment';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  outboundShipmentItems: Array<ImsOutboundShipmentItem>;
  salesOrder: ImsSalesOrder;
  salesOrderId: Scalars['UUID']['output'];
  status?: Maybe<OutboundShipmentStatusEnum>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  warehouseId: Scalars['UUID']['output'];
};

export type ImsOutboundShipmentItem = {
  __typename?: 'ImsOutboundShipmentItem';
  batch?: Maybe<ImsInventoryBatch>;
  batchId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  outboundShipment: ImsOutboundShipment;
  outboundShipmentId: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantityShipped: Scalars['Int']['output'];
  salesOrderItem: ImsSalesOrderItem;
  salesOrderItemId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsProduct = {
  __typename?: 'ImsProduct';
  barcode?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['UUID']['output']>;
  company?: Maybe<CrmCompany>;
  costPrice?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  inboundShipmentItems: Array<ImsInboundShipmentItem>;
  inventoryAdjustments: Array<ImsInventoryAdjustment>;
  inventoryBatches: Array<ImsInventoryBatch>;
  length?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  outboundShipmentItems: Array<ImsOutboundShipmentItem>;
  reorderPoints: Array<ImsReorderPoint>;
  returnItems: Array<ImsReturnItem>;
  salesOrderItems: Array<ImsSalesOrderItem>;
  sku: Scalars['String']['output'];
  status?: Maybe<ProductStatusEnum>;
  stockTransfers: Array<ImsStockTransfer>;
  supplier?: Maybe<ImsSupplier>;
  supplierId?: Maybe<Scalars['UUID']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type ImsQueries = {
  __typename?: 'ImsQueries';
  inboundShipment?: Maybe<ImsInboundShipment>;
  inboundShipmentItem?: Maybe<ImsInboundShipmentItem>;
  inboundShipmentItems: Array<ImsInboundShipmentItem>;
  inboundShipments: Array<ImsInboundShipment>;
  inventoryAdjustment?: Maybe<ImsInventoryAdjustment>;
  inventoryAdjustments: Array<ImsInventoryAdjustment>;
  inventoryBatch?: Maybe<ImsInventoryBatch>;
  inventoryBatches: Array<ImsInventoryBatch>;
  outboundShipment?: Maybe<ImsOutboundShipment>;
  outboundShipmentItem?: Maybe<ImsOutboundShipmentItem>;
  outboundShipmentItems: Array<ImsOutboundShipmentItem>;
  outboundShipments: Array<ImsOutboundShipment>;
  product?: Maybe<ImsProduct>;
  products: Array<ImsProduct>;
  reorderPoint?: Maybe<ImsReorderPoint>;
  reorderPoints: Array<ImsReorderPoint>;
  return?: Maybe<ImsReturn>;
  returnItem?: Maybe<ImsReturnItem>;
  returnItems: Array<ImsReturnItem>;
  returns: Array<ImsReturn>;
  salesOrder?: Maybe<ImsSalesOrder>;
  salesOrderItem?: Maybe<ImsSalesOrderItem>;
  salesOrderItems: Array<ImsSalesOrderItem>;
  salesOrders: Array<ImsSalesOrder>;
  stockTransfer?: Maybe<ImsStockTransfer>;
  stockTransfers: Array<ImsStockTransfer>;
  supplier?: Maybe<ImsSupplier>;
  suppliers: Array<ImsSupplier>;
};


export type ImsQueriesInboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesInboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesInventoryAdjustmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesInventoryBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesOutboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesOutboundShipmentItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesProductArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesReorderPointArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesReturnArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesReturnItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesSalesOrderArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesSalesOrderItemArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesStockTransferArgs = {
  id: Scalars['UUID']['input'];
};


export type ImsQueriesSupplierArgs = {
  id: Scalars['UUID']['input'];
};

export type ImsReorderPoint = {
  __typename?: 'ImsReorderPoint';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  threshold: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  warehouseId: Scalars['UUID']['output'];
};

export type ImsReturn = {
  __typename?: 'ImsReturn';
  client: CrmCompany;
  clientId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  returnItems: Array<ImsReturnItem>;
  returnNumber: Scalars['String']['output'];
  salesOrder?: Maybe<ImsSalesOrder>;
  salesOrderId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<ReturnStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsReturnItem = {
  __typename?: 'ImsReturnItem';
  condition?: Maybe<ReturnItemConditionEnum>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantityExpected: Scalars['Int']['output'];
  quantityReceived?: Maybe<Scalars['Int']['output']>;
  quantityVariance?: Maybe<Scalars['Int']['output']>;
  return: ImsReturn;
  returnId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsSalesOrder = {
  __typename?: 'ImsSalesOrder';
  client: CrmCompany;
  clientId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  crmOpportunityId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  opportunity?: Maybe<CrmOpportunity>;
  orderNumber: Scalars['String']['output'];
  outboundShipments: Array<ImsOutboundShipment>;
  returns: Array<ImsReturn>;
  salesOrderItems: Array<ImsSalesOrderItem>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  status?: Maybe<SalesOrderStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsSalesOrderItem = {
  __typename?: 'ImsSalesOrderItem';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantityOrdered: Scalars['Int']['output'];
  salesOrder: ImsSalesOrder;
  salesOrderId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsStockTransfer = {
  __typename?: 'ImsStockTransfer';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  destinationWarehouseId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
  sourceWarehouseId: Scalars['UUID']['output'];
  status?: Maybe<StockTransferStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type ImsSupplier = {
  __typename?: 'ImsSupplier';
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  products: Array<ImsProduct>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export enum InboundShipmentStatusEnum {
  Arrived = 'ARRIVED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export type InsertAccountTransaction = {
  amount: Scalars['Decimal']['input'];
  clientAccountId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
  runningBalance?: InputMaybe<Scalars['Decimal']['input']>;
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  transactionDate?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  type: TransactionTypeEnum;
};

export type InsertAccountingSyncLog = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  externalSystem: Scalars['String']['input'];
  lastSyncAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  nextRetryAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  recordId: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
  requestPayload?: InputMaybe<Scalars['String']['input']>;
  responsePayload?: InputMaybe<Scalars['String']['input']>;
  retryCount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<SyncStatusEnum>;
};

export type InsertAttachment = {
  fileName: Scalars['String']['input'];
  filePath: Scalars['String']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['UUID']['input']>;
  recordType?: InputMaybe<RecordType>;
};

export type InsertBinThreshold = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationId: Scalars['UUID']['input'];
  maxQuantity: Scalars['Int']['input'];
  minQuantity: Scalars['Int']['input'];
  productId: Scalars['UUID']['input'];
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type InsertCampaign = {
  budget?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type InsertCarrier = {
  contactDetails?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type InsertCarrierRate = {
  carrierId: Scalars['UUID']['input'];
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate: Scalars['Decimal']['input'];
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnitEnum>;
};

export type InsertCase = {
  caseNumber: Scalars['String']['input'];
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type InsertClientAccount = {
  availableCredit?: InputMaybe<Scalars['Decimal']['input']>;
  clientId: Scalars['UUID']['input'];
  creditLimit?: InputMaybe<Scalars['Decimal']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
  walletBalance?: InputMaybe<Scalars['Decimal']['input']>;
};

export type InsertCompany = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type InsertContact = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  email: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type InsertCreditNote = {
  amount: Scalars['Decimal']['input'];
  appliedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  creditNoteNumber: Scalars['String']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  disputeId?: InputMaybe<Scalars['UUID']['input']>;
  invoiceId: Scalars['UUID']['input'];
  issueDate: Scalars['NaiveDate']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
};

export type InsertCustomerTrackingLink = {
  accessCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryTaskId: Scalars['UUID']['input'];
  expiresAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastAccessedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  trackingToken: Scalars['String']['input'];
};

export type InsertDeliveryRoute = {
  actualDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  driverId: Scalars['UUID']['input'];
  estimatedDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  routeDate: Scalars['NaiveDate']['input'];
  startedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<DeliveryRouteStatusEnum>;
  totalDistanceKm?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertDeliveryTask = {
  actualArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryAddress: Scalars['String']['input'];
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryRouteId: Scalars['UUID']['input'];
  deliveryTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  failureReason?: InputMaybe<DeliveryFailureReasonEnum>;
  packageId: Scalars['UUID']['input'];
  recipientName?: InputMaybe<Scalars['String']['input']>;
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
  routeSequence: Scalars['Int']['input'];
  status?: InputMaybe<DeliveryTaskStatusEnum>;
};

export type InsertDispute = {
  clientId: Scalars['UUID']['input'];
  disputedAmount?: InputMaybe<Scalars['Decimal']['input']>;
  lineItemId: Scalars['UUID']['input'];
  reason: Scalars['String']['input'];
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
  resolvedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  resolvedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<DisputeStatusEnum>;
  submittedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type InsertDocument = {
  documentType: DocumentTypeEnum;
  fileName: Scalars['String']['input'];
  filePath: Scalars['String']['input'];
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
  uploadedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};

export type InsertDriver = {
  licenseExpiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  licenseNumber: Scalars['String']['input'];
  status?: InputMaybe<DriverStatusEnum>;
  userId: Scalars['UUID']['input'];
};

export type InsertDriverLocation = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  driverId: Scalars['UUID']['input'];
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type InsertDriverSchedule = {
  driverId: Scalars['UUID']['input'];
  endDate: Scalars['NaiveDate']['input'];
  reason?: InputMaybe<DriverScheduleReasonEnum>;
  startDate: Scalars['NaiveDate']['input'];
};

export type InsertExpense = {
  amount: Scalars['Decimal']['input'];
  currency?: InputMaybe<CurrencyEnum>;
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  fuelQuantity?: InputMaybe<Scalars['Float']['input']>;
  odometerReading?: InputMaybe<Scalars['Int']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatusEnum>;
  tripId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<ExpenseTypeEnum>;
};

export type InsertGeofence = {
  coordinates?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type InsertGeofenceEvent = {
  eventType: GeofenceEventTypeEnum;
  geofenceId: Scalars['UUID']['input'];
  timestamp: Scalars['NaiveDateTime']['input'];
  vehicleId: Scalars['UUID']['input'];
};

export type InsertGpsPing = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  timestamp: Scalars['NaiveDateTime']['input'];
  vehicleId: Scalars['UUID']['input'];
};

export type InsertInboundShipment = {
  actualArrivalDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  expectedArrivalDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  status?: InputMaybe<InboundShipmentStatusEnum>;
  warehouseId: Scalars['UUID']['input'];
};

export type InsertInboundShipmentItem = {
  discrepancyNotes?: InputMaybe<Scalars['String']['input']>;
  discrepancyQuantity?: InputMaybe<Scalars['Int']['input']>;
  expectedQuantity: Scalars['Int']['input'];
  inboundShipmentId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  receivedQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type InsertInteraction = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  contactId: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId: Scalars['UUID']['input'];
};

export type InsertInventoryAdjustment = {
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['UUID']['input'];
  quantityChange: Scalars['Int']['input'];
  reason?: InputMaybe<InventoryAdjustmentReasonEnum>;
  userId: Scalars['UUID']['input'];
  warehouseId: Scalars['UUID']['input'];
};

export type InsertInventoryBatch = {
  batchNumber: Scalars['String']['input'];
  expirationDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  productId: Scalars['UUID']['input'];
};

export type InsertInventoryStock = {
  availableQuantity?: InputMaybe<Scalars['Int']['input']>;
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  lastCountedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  lastMovementAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  locationId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
  reservedQuantity: Scalars['Int']['input'];
  status?: InputMaybe<InventoryStockStatusEnum>;
};

export type InsertInvoice = {
  amountOutstanding?: InputMaybe<Scalars['Decimal']['input']>;
  amountPaid?: InputMaybe<Scalars['Decimal']['input']>;
  clientId: Scalars['UUID']['input'];
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  dueDate: Scalars['NaiveDate']['input'];
  invoiceNumber: Scalars['String']['input'];
  issueDate: Scalars['NaiveDate']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paidAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['UUID']['input']>;
  sentAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<InvoiceStatusEnum>;
  subtotal?: InputMaybe<Scalars['Decimal']['input']>;
  taxAmount?: InputMaybe<Scalars['Decimal']['input']>;
  totalAmount: Scalars['Decimal']['input'];
};

export type InsertInvoiceItem = {
  invoiceId: Scalars['UUID']['input'];
  price: Scalars['Decimal']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};

export type InsertInvoiceLineItem = {
  description: Scalars['String']['input'];
  discountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  discountRate?: InputMaybe<Scalars['Decimal']['input']>;
  invoiceId: Scalars['UUID']['input'];
  lineTotal?: InputMaybe<Scalars['Decimal']['input']>;
  quantity: Scalars['Decimal']['input'];
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  taxAmount?: InputMaybe<Scalars['Decimal']['input']>;
  taxRate?: InputMaybe<Scalars['Decimal']['input']>;
  totalPrice?: InputMaybe<Scalars['Decimal']['input']>;
  unitPrice: Scalars['Decimal']['input'];
};

export type InsertLocation = {
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
  parentLocationId?: InputMaybe<Scalars['UUID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type: LocationTypeEnum;
  warehouseId: Scalars['UUID']['input'];
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertOutboundShipment = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  salesOrderId: Scalars['UUID']['input'];
  status?: InputMaybe<OutboundShipmentStatusEnum>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId: Scalars['UUID']['input'];
};

export type InsertOutboundShipmentItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  outboundShipmentId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  quantityShipped: Scalars['Int']['input'];
  salesOrderItemId: Scalars['UUID']['input'];
};

export type InsertPackage = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  insuranceValue?: InputMaybe<Scalars['Decimal']['input']>;
  isFragile?: InputMaybe<Scalars['Boolean']['input']>;
  isHazmat?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  packageNumber: Scalars['String']['input'];
  packageType?: InputMaybe<Scalars['String']['input']>;
  packedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  packedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  requiresSignature?: InputMaybe<Scalars['Boolean']['input']>;
  salesOrderId: Scalars['UUID']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  warehouseId: Scalars['UUID']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertPackageItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  packageId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  totalWeight?: InputMaybe<Scalars['Float']['input']>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertPartnerInvoice = {
  carrierId: Scalars['UUID']['input'];
  invoiceDate: Scalars['NaiveDate']['input'];
  invoiceNumber: Scalars['String']['input'];
  status?: InputMaybe<PartnerInvoiceStatusEnum>;
  totalAmount: Scalars['Decimal']['input'];
};

export type InsertPartnerInvoiceItem = {
  amount: Scalars['Decimal']['input'];
  partnerInvoiceId: Scalars['UUID']['input'];
  shipmentLegId: Scalars['UUID']['input'];
};

export type InsertPayment = {
  amount: Scalars['Decimal']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  exchangeRate?: InputMaybe<Scalars['Decimal']['input']>;
  fees?: InputMaybe<Scalars['Decimal']['input']>;
  gatewayReference?: InputMaybe<Scalars['String']['input']>;
  invoiceId: Scalars['UUID']['input'];
  netAmount?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  paymentMethod: PaymentMethodEnum;
  processedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<PaymentStatusEnum>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

export type InsertPickBatch = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['UUID']['input']>;
  batchNumber: Scalars['String']['input'];
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<PickBatchStatusEnum>;
  strategy: PickStrategyEnum;
  totalItems?: InputMaybe<Scalars['Int']['input']>;
  warehouseId: Scalars['UUID']['input'];
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type InsertPickBatchItem = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
  pickBatchId: Scalars['UUID']['input'];
  salesOrderId: Scalars['UUID']['input'];
};

export type InsertProduct = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  costPrice?: InputMaybe<Scalars['Decimal']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  sku: Scalars['String']['input'];
  status?: InputMaybe<ProductStatusEnum>;
  supplierId?: InputMaybe<Scalars['UUID']['input']>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertProofOfDelivery = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp: Scalars['NaiveDateTime']['input'];
  tripStopId: Scalars['UUID']['input'];
  type?: InputMaybe<ProofTypeEnum>;
};

export type InsertPutawayRule = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationType?: InputMaybe<LocationTypeEnum>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  preferredLocationId?: InputMaybe<Scalars['UUID']['input']>;
  priority: Scalars['Int']['input'];
  productId: Scalars['UUID']['input'];
  requiresHazmatApproval?: InputMaybe<Scalars['Boolean']['input']>;
  requiresTemperatureControl?: InputMaybe<Scalars['Boolean']['input']>;
  volumeThreshold?: InputMaybe<Scalars['Float']['input']>;
  warehouseId: Scalars['UUID']['input'];
  weightThreshold?: InputMaybe<Scalars['Float']['input']>;
};

export type InsertQuote = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  destinationDetails: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  height?: InputMaybe<Scalars['Decimal']['input']>;
  length?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  originDetails: Scalars['String']['input'];
  quoteNumber?: InputMaybe<Scalars['String']['input']>;
  quotedPrice: Scalars['Decimal']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuoteStatusEnum>;
  volume?: InputMaybe<Scalars['Decimal']['input']>;
  weight?: InputMaybe<Scalars['Decimal']['input']>;
  width?: InputMaybe<Scalars['Decimal']['input']>;
};

export type InsertRateCard = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  serviceType: ServiceTypeEnum;
  validFrom: Scalars['NaiveDate']['input'];
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type InsertRateRule = {
  condition: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxValue?: InputMaybe<Scalars['Decimal']['input']>;
  minValue?: InputMaybe<Scalars['Decimal']['input']>;
  price: Scalars['Decimal']['input'];
  pricingModel: PricingModelEnum;
  priority?: InputMaybe<Scalars['Int']['input']>;
  rateCardId: Scalars['UUID']['input'];
  value: Scalars['String']['input'];
};

export type InsertReorderPoint = {
  productId: Scalars['UUID']['input'];
  threshold: Scalars['Int']['input'];
  warehouseId: Scalars['UUID']['input'];
};

export type InsertReturn = {
  clientId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  returnNumber: Scalars['String']['input'];
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<ReturnStatusEnum>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InsertReturnItem = {
  condition?: InputMaybe<ReturnItemConditionEnum>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  productId: Scalars['UUID']['input'];
  quantityExpected: Scalars['Int']['input'];
  quantityReceived?: InputMaybe<Scalars['Int']['input']>;
  quantityVariance?: InputMaybe<Scalars['Int']['input']>;
  returnId: Scalars['UUID']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InsertRoute = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId: Scalars['UUID']['input'];
};

export type InsertSalesOrder = {
  clientId: Scalars['UUID']['input'];
  crmOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  orderNumber: Scalars['String']['input'];
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatusEnum>;
};

export type InsertSalesOrderItem = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  productId: Scalars['UUID']['input'];
  quantityOrdered: Scalars['Int']['input'];
  salesOrderId: Scalars['UUID']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InsertShipmentLeg = {
  carrierId?: InputMaybe<Scalars['UUID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  internalTripId?: InputMaybe<Scalars['UUID']['input']>;
  legSequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatusEnum>;
};

export type InsertShipmentLegEvent = {
  eventTimestamp: Scalars['NaiveDateTime']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  shipmentLegId: Scalars['UUID']['input'];
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type InsertStockTransfer = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  destinationWarehouseId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
  sourceWarehouseId: Scalars['UUID']['input'];
  status?: InputMaybe<StockTransferStatusEnum>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InsertSupplier = {
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InsertSurcharge = {
  amount: Scalars['Decimal']['input'];
  calculationMethod: SurchargeCalculationMethodEnum;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  validFrom?: InputMaybe<Scalars['NaiveDate']['input']>;
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type InsertTask = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  durationSeconds?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pickBatchId?: InputMaybe<Scalars['UUID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  sourceEntityId?: InputMaybe<Scalars['UUID']['input']>;
  sourceEntityType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<TaskStatusEnum>;
  taskNumber: Scalars['String']['input'];
  type: TaskTypeEnum;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  warehouseId: Scalars['UUID']['input'];
};

export type InsertTaskEvent = {
  deliveryTaskId: Scalars['UUID']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status: TaskEventStatusEnum;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type InsertTaskItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  destinationLocationId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['UUID']['input'];
  quantityCompleted: Scalars['Int']['input'];
  quantityRemaining?: InputMaybe<Scalars['Int']['input']>;
  quantityRequired: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceLocationId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TaskItemStatusEnum>;
  taskId: Scalars['UUID']['input'];
};

export type InsertTrip = {
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStatusEnum>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type InsertTripStop = {
  actualArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  sequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStopStatusEnum>;
  tripId: Scalars['UUID']['input'];
};

export type InsertVehicle = {
  capacityVolume?: InputMaybe<Scalars['Float']['input']>;
  capacityWeight?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registrationNumber: Scalars['String']['input'];
  status?: InputMaybe<VehicleStatusEnum>;
};

export type InsertVehicleMaintenance = {
  cost?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDate: Scalars['NaiveDate']['input'];
  serviceType?: InputMaybe<VehicleServiceTypeEnum>;
  vehicleId: Scalars['UUID']['input'];
};

export type InsertWarehouse = {
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

export enum InteractionType {
  Call = 'CALL',
  Email = 'EMAIL',
  Meeting = 'MEETING',
  Text = 'TEXT'
}

export enum InventoryAdjustmentReasonEnum {
  CycleCount = 'CYCLE_COUNT',
  DamagedGoods = 'DAMAGED_GOODS',
  Expired = 'EXPIRED',
  ManualCorrection = 'MANUAL_CORRECTION',
  ReturnToVendor = 'RETURN_TO_VENDOR',
  Theft = 'THEFT'
}

export enum InventoryStockStatusEnum {
  Allocated = 'ALLOCATED',
  Available = 'AVAILABLE',
  Damaged = 'DAMAGED',
  Expired = 'EXPIRED',
  Hold = 'HOLD',
  Quarantine = 'QUARANTINE',
  Shipped = 'SHIPPED'
}

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Sent = 'SENT'
}

export enum InvoiceStatusEnum {
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

export enum LocationTypeEnum {
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

export type Mutations = {
  __typename?: 'Mutations';
  auth: AuthMutations;
  billing: BillingMutations;
  crm: CrmMutations;
  dms: DmsMutations;
  ims: ImsMutations;
  tms: TmsMutations;
  wms: WmsMutations;
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

export enum OutboundShipmentStatusEnum {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Packed = 'PACKED',
  Picking = 'PICKING',
  Shipped = 'SHIPPED'
}

export enum PartnerInvoiceStatusEnum {
  Cancelled = 'CANCELLED',
  Disputed = 'DISPUTED',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  Check = 'CHECK',
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
  WireTransfer = 'WIRE_TRANSFER'
}

export enum PaymentMethodEnum {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  Check = 'CHECK',
  ClientCredit = 'CLIENT_CREDIT',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  QrPh = 'QR_PH',
  Wallet = 'WALLET'
}

export enum PaymentStatusEnum {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED',
  Successful = 'SUCCESSFUL'
}

export enum PickBatchStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN'
}

export enum PickStrategyEnum {
  BatchPicking = 'BATCH_PICKING',
  ClusterPicking = 'CLUSTER_PICKING',
  SingleOrderPicking = 'SINGLE_ORDER_PICKING',
  WavePicking = 'WAVE_PICKING',
  ZonePicking = 'ZONE_PICKING'
}

export enum PricingModelEnum {
  FlatRate = 'FLAT_RATE',
  Percentage = 'PERCENTAGE',
  PerCubicMeter = 'PER_CUBIC_METER',
  PerItem = 'PER_ITEM',
  PerKg = 'PER_KG',
  PerZone = 'PER_ZONE',
  Tiered = 'TIERED'
}

export enum ProductStatusEnum {
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

export enum ProofOfDeliveryTypeEnum {
  CodeVerification = 'CODE_VERIFICATION',
  ContactlessDelivery = 'CONTACTLESS_DELIVERY',
  LeftAtDoor = 'LEFT_AT_DOOR',
  Photo = 'PHOTO',
  Signature = 'SIGNATURE'
}

export enum ProofTypeEnum {
  BarcodeScan = 'BARCODE_SCAN',
  Photo = 'PHOTO',
  PinVerification = 'PIN_VERIFICATION',
  Signature = 'SIGNATURE'
}

export type Query = {
  __typename?: 'Query';
  auth: AuthQuery;
  billing: BillingQueries;
  crm: CrmQueries;
  dms: DmsQueries;
  ims: ImsQueries;
  tms: TmsQueries;
  wms: WmsQueries;
};

export enum QuoteStatusEnum {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Converted = 'CONVERTED',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
}

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

export enum ReturnItemConditionEnum {
  Damaged = 'DAMAGED',
  Defective = 'DEFECTIVE',
  Expired = 'EXPIRED',
  Sellable = 'SELLABLE',
  Unsellable = 'UNSELLABLE'
}

export enum ReturnStatusEnum {
  Approved = 'APPROVED',
  Processed = 'PROCESSED',
  Received = 'RECEIVED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export enum SalesOrderStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED'
}

export enum ServiceTypeEnum {
  Customs = 'CUSTOMS',
  Fulfillment = 'FULFILLMENT',
  Handling = 'HANDLING',
  Insurance = 'INSURANCE',
  Packaging = 'PACKAGING',
  Returns = 'RETURNS',
  Shipping = 'SHIPPING',
  Storage = 'STORAGE'
}

export enum ShipmentLegStatusEnum {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  InTransit = 'IN_TRANSIT',
  Pending = 'PENDING'
}

export type SignInResponse = {
  __typename?: 'SignInResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export enum StockTransferStatusEnum {
  Cancelled = 'CANCELLED',
  InTransit = 'IN_TRANSIT',
  Pending = 'PENDING',
  Received = 'RECEIVED'
}

export enum SurchargeCalculationMethodEnum {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE',
  PerUnit = 'PER_UNIT',
  SlidingScale = 'SLIDING_SCALE'
}

export enum SyncStatusEnum {
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Retry = 'RETRY',
  Success = 'SUCCESS'
}

export enum TaskEventStatusEnum {
  Arrived = 'ARRIVED',
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Exception = 'EXCEPTION',
  Failed = 'FAILED',
  Rescheduled = 'RESCHEDULED',
  Started = 'STARTED'
}

export enum TaskItemStatusEnum {
  Completed = 'COMPLETED',
  Damaged = 'DAMAGED',
  InProgress = 'IN_PROGRESS',
  NotFound = 'NOT_FOUND',
  Pending = 'PENDING',
  ShortPicked = 'SHORT_PICKED'
}

export enum TaskStatusEnum {
  Assigned = 'ASSIGNED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Error = 'ERROR',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export enum TaskTypeEnum {
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

export type TmsCarrier = {
  __typename?: 'TmsCarrier';
  contactDetails?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  servicesOffered?: Maybe<Scalars['String']['output']>;
  shipmentLegs: Array<TmsShipmentLeg>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsCarrierRate = {
  __typename?: 'TmsCarrierRate';
  carrier: TmsCarrier;
  carrierId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  destination?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  rate: Scalars['Decimal']['output'];
  serviceType?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<CarrierRateUnitEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsDriver = {
  __typename?: 'TmsDriver';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  driverSchedules: Array<TmsDriverSchedule>;
  expenses: Array<TmsExpense>;
  id: Scalars['UUID']['output'];
  licenseExpiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  licenseNumber: Scalars['String']['output'];
  status?: Maybe<DriverStatusEnum>;
  trips: Array<TmsTrip>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  user: AuthUser;
  userId: Scalars['UUID']['output'];
};

export type TmsDriverSchedule = {
  __typename?: 'TmsDriverSchedule';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  driver: TmsDriver;
  driverId: Scalars['UUID']['output'];
  endDate: Scalars['NaiveDate']['output'];
  id: Scalars['UUID']['output'];
  reason?: Maybe<DriverScheduleReasonEnum>;
  startDate: Scalars['NaiveDate']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsExpense = {
  __typename?: 'TmsExpense';
  amount: Scalars['Decimal']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  currency?: Maybe<CurrencyEnum>;
  driver?: Maybe<TmsDriver>;
  driverId?: Maybe<Scalars['UUID']['output']>;
  fuelQuantity?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  odometerReading?: Maybe<Scalars['Int']['output']>;
  receiptUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ExpenseStatusEnum>;
  trip?: Maybe<TmsTrip>;
  tripId?: Maybe<Scalars['UUID']['output']>;
  type?: Maybe<ExpenseTypeEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsGeofence = {
  __typename?: 'TmsGeofence';
  coordinates?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  geofenceEvents: Array<TmsGeofenceEvent>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsGeofenceEvent = {
  __typename?: 'TmsGeofenceEvent';
  eventType: GeofenceEventTypeEnum;
  geofence: TmsGeofence;
  geofenceId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  timestamp: Scalars['NaiveDateTime']['output'];
  vehicle: TmsVehicle;
  vehicleId: Scalars['UUID']['output'];
};

export type TmsGpsPing = {
  __typename?: 'TmsGpsPing';
  id: Scalars['UUID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  timestamp: Scalars['NaiveDateTime']['output'];
  vehicle: TmsVehicle;
  vehicleId: Scalars['UUID']['output'];
};

export type TmsMutations = {
  __typename?: 'TmsMutations';
  createCarrier: TmsCarrier;
  createCarrierRate: TmsCarrierRate;
  createDriver: TmsDriver;
  createDriverSchedule: TmsDriverSchedule;
  createExpense: TmsExpense;
  createGeofence: TmsGeofence;
  createGeofenceEvent: TmsGeofenceEvent;
  createGpsPing: TmsGpsPing;
  createPartnerInvoice: TmsPartnerInvoice;
  createPartnerInvoiceItem: TmsPartnerInvoiceItem;
  createProofOfDelivery: TmsProofOfDelivery;
  createRoute: TmsRoute;
  createShipmentLeg: TmsShipmentLeg;
  createShipmentLegEvent: TmsShipmentLegEvent;
  createTrip: TmsTrip;
  createTripStop: TmsTripStop;
  createVehicle: TmsVehicle;
  createVehicleMaintenance: TmsVehicleMaintenance;
  deleteCarrier: Scalars['Boolean']['output'];
  deleteCarrierRate: Scalars['Boolean']['output'];
  deleteDriver: Scalars['Boolean']['output'];
  deleteDriverSchedule: Scalars['Boolean']['output'];
  deleteExpense: Scalars['Boolean']['output'];
  deleteGeofence: Scalars['Boolean']['output'];
  deleteGeofenceEvent: Scalars['Boolean']['output'];
  deleteGpsPing: Scalars['Boolean']['output'];
  deletePartnerInvoice: Scalars['Boolean']['output'];
  deletePartnerInvoiceItem: Scalars['Boolean']['output'];
  deleteProofOfDelivery: Scalars['Boolean']['output'];
  deleteRoute: Scalars['Boolean']['output'];
  deleteShipmentLeg: Scalars['Boolean']['output'];
  deleteShipmentLegEvent: Scalars['Boolean']['output'];
  deleteTrip: Scalars['Boolean']['output'];
  deleteTripStop: Scalars['Boolean']['output'];
  deleteVehicle: Scalars['Boolean']['output'];
  deleteVehicleMaintenance: Scalars['Boolean']['output'];
  updateCarrier: TmsCarrier;
  updateCarrierRate: TmsCarrierRate;
  updateDriver: TmsDriver;
  updateDriverSchedule: TmsDriverSchedule;
  updateExpense: TmsExpense;
  updateGeofence: TmsGeofence;
  updateGeofenceEvent: TmsGeofenceEvent;
  updateGpsPing: TmsGpsPing;
  updatePartnerInvoice: TmsPartnerInvoice;
  updatePartnerInvoiceItem: TmsPartnerInvoiceItem;
  updateProofOfDelivery: TmsProofOfDelivery;
  updateRoute: TmsRoute;
  updateShipmentLeg: TmsShipmentLeg;
  updateShipmentLegEvent: TmsShipmentLegEvent;
  updateTrip: TmsTrip;
  updateTripStop: TmsTripStop;
  updateVehicle: TmsVehicle;
  updateVehicleMaintenance: TmsVehicleMaintenance;
};


export type TmsMutationsCreateCarrierArgs = {
  value: InsertCarrier;
};


export type TmsMutationsCreateCarrierRateArgs = {
  value: InsertCarrierRate;
};


export type TmsMutationsCreateDriverArgs = {
  value: InsertDriver;
};


export type TmsMutationsCreateDriverScheduleArgs = {
  value: InsertDriverSchedule;
};


export type TmsMutationsCreateExpenseArgs = {
  value: InsertExpense;
};


export type TmsMutationsCreateGeofenceArgs = {
  value: InsertGeofence;
};


export type TmsMutationsCreateGeofenceEventArgs = {
  value: InsertGeofenceEvent;
};


export type TmsMutationsCreateGpsPingArgs = {
  value: InsertGpsPing;
};


export type TmsMutationsCreatePartnerInvoiceArgs = {
  value: InsertPartnerInvoice;
};


export type TmsMutationsCreatePartnerInvoiceItemArgs = {
  value: InsertPartnerInvoiceItem;
};


export type TmsMutationsCreateProofOfDeliveryArgs = {
  value: InsertProofOfDelivery;
};


export type TmsMutationsCreateRouteArgs = {
  value: InsertRoute;
};


export type TmsMutationsCreateShipmentLegArgs = {
  value: InsertShipmentLeg;
};


export type TmsMutationsCreateShipmentLegEventArgs = {
  value: InsertShipmentLegEvent;
};


export type TmsMutationsCreateTripArgs = {
  value: InsertTrip;
};


export type TmsMutationsCreateTripStopArgs = {
  value: InsertTripStop;
};


export type TmsMutationsCreateVehicleArgs = {
  value: InsertVehicle;
};


export type TmsMutationsCreateVehicleMaintenanceArgs = {
  value: InsertVehicleMaintenance;
};


export type TmsMutationsDeleteCarrierArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteCarrierRateArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteDriverArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteDriverScheduleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteExpenseArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteGeofenceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteGeofenceEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteGpsPingArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeletePartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeletePartnerInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteShipmentLegArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteShipmentLegEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteTripArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteTripStopArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteVehicleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsDeleteVehicleMaintenanceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsUpdateCarrierArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCarrier;
};


export type TmsMutationsUpdateCarrierRateArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateCarrierRate;
};


export type TmsMutationsUpdateDriverArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDriver;
};


export type TmsMutationsUpdateDriverScheduleArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateDriverSchedule;
};


export type TmsMutationsUpdateExpenseArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateExpense;
};


export type TmsMutationsUpdateGeofenceArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateGeofence;
};


export type TmsMutationsUpdateGeofenceEventArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateGeofenceEvent;
};


export type TmsMutationsUpdateGpsPingArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateGpsPing;
};


export type TmsMutationsUpdatePartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePartnerInvoice;
};


export type TmsMutationsUpdatePartnerInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePartnerInvoiceItem;
};


export type TmsMutationsUpdateProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateProofOfDelivery;
};


export type TmsMutationsUpdateRouteArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateRoute;
};


export type TmsMutationsUpdateShipmentLegArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateShipmentLeg;
};


export type TmsMutationsUpdateShipmentLegEventArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateShipmentLegEvent;
};


export type TmsMutationsUpdateTripArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateTrip;
};


export type TmsMutationsUpdateTripStopArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateTripStop;
};


export type TmsMutationsUpdateVehicleArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateVehicle;
};


export type TmsMutationsUpdateVehicleMaintenanceArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateVehicleMaintenance;
};

export type TmsPartnerInvoice = {
  __typename?: 'TmsPartnerInvoice';
  carrierId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  invoiceDate: Scalars['NaiveDate']['output'];
  invoiceNumber: Scalars['String']['output'];
  partnerInvoiceItems: Array<TmsPartnerInvoiceItem>;
  status?: Maybe<PartnerInvoiceStatusEnum>;
  totalAmount: Scalars['Decimal']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsPartnerInvoiceItem = {
  __typename?: 'TmsPartnerInvoiceItem';
  amount: Scalars['Decimal']['output'];
  id: Scalars['UUID']['output'];
  partnerInvoice: TmsPartnerInvoice;
  partnerInvoiceId: Scalars['UUID']['output'];
  shipmentLeg: TmsShipmentLeg;
  shipmentLegId: Scalars['UUID']['output'];
};

export type TmsProofOfDelivery = {
  __typename?: 'TmsProofOfDelivery';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp: Scalars['NaiveDateTime']['output'];
  tripStop: TmsTripStop;
  tripStopId: Scalars['UUID']['output'];
  type?: Maybe<ProofTypeEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsQueries = {
  __typename?: 'TmsQueries';
  carrier?: Maybe<TmsCarrier>;
  carrierRate?: Maybe<TmsCarrierRate>;
  carrierRates: Array<TmsCarrierRate>;
  carriers: Array<TmsCarrier>;
  driver?: Maybe<TmsDriver>;
  driverSchedule?: Maybe<TmsDriverSchedule>;
  driverSchedules: Array<TmsDriverSchedule>;
  drivers: Array<TmsDriver>;
  expense?: Maybe<TmsExpense>;
  expenses: Array<TmsExpense>;
  geofence?: Maybe<TmsGeofence>;
  geofenceEvent?: Maybe<TmsGeofenceEvent>;
  geofenceEvents: Array<TmsGeofenceEvent>;
  geofences: Array<TmsGeofence>;
  gpsPing?: Maybe<TmsGpsPing>;
  gpsPings: Array<TmsGpsPing>;
  partnerInvoice?: Maybe<TmsPartnerInvoice>;
  partnerInvoiceItem?: Maybe<TmsPartnerInvoiceItem>;
  partnerInvoiceItems: Array<TmsPartnerInvoiceItem>;
  partnerInvoices: Array<TmsPartnerInvoice>;
  proofOfDeliveries: Array<TmsProofOfDelivery>;
  proofOfDelivery?: Maybe<TmsProofOfDelivery>;
  route?: Maybe<TmsRoute>;
  routes: Array<TmsRoute>;
  shipmentLeg?: Maybe<TmsShipmentLeg>;
  shipmentLegEvent?: Maybe<TmsShipmentLegEvent>;
  shipmentLegEvents: Array<TmsShipmentLegEvent>;
  shipmentLegs: Array<TmsShipmentLeg>;
  trip?: Maybe<TmsTrip>;
  tripStop?: Maybe<TmsTripStop>;
  tripStops: Array<TmsTripStop>;
  trips: Array<TmsTrip>;
  vehicle?: Maybe<TmsVehicle>;
  vehicleMaintenance: Array<TmsVehicleMaintenance>;
  vehicleMaintenanceItem?: Maybe<TmsVehicleMaintenance>;
  vehicles: Array<TmsVehicle>;
};


export type TmsQueriesCarrierArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesCarrierRateArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesDriverArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesDriverScheduleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesExpenseArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesGeofenceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesGeofenceEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesGpsPingArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesPartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesPartnerInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesShipmentLegArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesShipmentLegEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesTripArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesTripStopArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesVehicleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesVehicleMaintenanceItemArgs = {
  id: Scalars['UUID']['input'];
};

export type TmsRoute = {
  __typename?: 'TmsRoute';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  totalDistance?: Maybe<Scalars['Float']['output']>;
  totalDuration?: Maybe<Scalars['Float']['output']>;
  trip: TmsTrip;
  tripId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsShipmentLeg = {
  __typename?: 'TmsShipmentLeg';
  carrier?: Maybe<TmsCarrier>;
  carrierId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  endLocation?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  internalTripId?: Maybe<Scalars['UUID']['output']>;
  legSequence: Scalars['Int']['output'];
  outboundShipment?: Maybe<ImsOutboundShipment>;
  partnerInvoiceItems: Array<TmsPartnerInvoiceItem>;
  shipmentId?: Maybe<Scalars['UUID']['output']>;
  shipmentLegEvents: Array<TmsShipmentLegEvent>;
  startLocation?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShipmentLegStatusEnum>;
  trip?: Maybe<TmsTrip>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsShipmentLegEvent = {
  __typename?: 'TmsShipmentLegEvent';
  eventTimestamp: Scalars['NaiveDateTime']['output'];
  id: Scalars['UUID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  shipmentLeg: TmsShipmentLeg;
  shipmentLegId: Scalars['UUID']['output'];
  statusMessage?: Maybe<Scalars['String']['output']>;
};

export type TmsTrip = {
  __typename?: 'TmsTrip';
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  driver?: Maybe<TmsDriver>;
  driverId?: Maybe<Scalars['UUID']['output']>;
  expenses: Array<TmsExpense>;
  id: Scalars['UUID']['output'];
  routes: Array<TmsRoute>;
  shipmentLegs: Array<TmsShipmentLeg>;
  status?: Maybe<TripStatusEnum>;
  tripStops: Array<TmsTripStop>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  vehicle?: Maybe<TmsVehicle>;
  vehicleId?: Maybe<Scalars['UUID']['output']>;
};

export type TmsTripStop = {
  __typename?: 'TmsTripStop';
  actualArrivalTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  actualDepartureTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedDepartureTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  proofOfDeliveries: Array<TmsProofOfDelivery>;
  sequence: Scalars['Int']['output'];
  shipment?: Maybe<ImsOutboundShipment>;
  shipmentId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<TripStopStatusEnum>;
  trip: TmsTrip;
  tripId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type TmsVehicle = {
  __typename?: 'TmsVehicle';
  capacityVolume?: Maybe<Scalars['Float']['output']>;
  capacityWeight?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  geofenceEvents: Array<TmsGeofenceEvent>;
  gpsPings: Array<TmsGpsPing>;
  id: Scalars['UUID']['output'];
  model?: Maybe<Scalars['String']['output']>;
  registrationNumber: Scalars['String']['output'];
  status?: Maybe<VehicleStatusEnum>;
  trips: Array<TmsTrip>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  vehicleMaintenance: Array<TmsVehicleMaintenance>;
};

export type TmsVehicleMaintenance = {
  __typename?: 'TmsVehicleMaintenance';
  cost?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  serviceDate: Scalars['NaiveDate']['output'];
  serviceType?: Maybe<VehicleServiceTypeEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  vehicle: TmsVehicle;
  vehicleId: Scalars['UUID']['output'];
};

export enum TransactionTypeEnum {
  Adjustment = 'ADJUSTMENT',
  Credit = 'CREDIT',
  Debit = 'DEBIT',
  Fee = 'FEE',
  Refund = 'REFUND',
  TopUp = 'TOP_UP'
}

export enum TripStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Planned = 'PLANNED'
}

export enum TripStopStatusEnum {
  Arrived = 'ARRIVED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Skipped = 'SKIPPED'
}

export type UpdateAccountTransaction = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  clientAccountId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
  runningBalance?: InputMaybe<Scalars['Decimal']['input']>;
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  transactionDate?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  type?: InputMaybe<TransactionTypeEnum>;
};

export type UpdateAccountingSyncLog = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  externalSystem?: InputMaybe<Scalars['String']['input']>;
  lastSyncAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  nextRetryAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  recordId?: InputMaybe<Scalars['UUID']['input']>;
  recordType?: InputMaybe<Scalars['String']['input']>;
  requestPayload?: InputMaybe<Scalars['String']['input']>;
  responsePayload?: InputMaybe<Scalars['String']['input']>;
  retryCount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<SyncStatusEnum>;
};

export type UpdateAttachment = {
  fileName?: InputMaybe<Scalars['String']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['UUID']['input']>;
  recordType?: InputMaybe<RecordType>;
};

export type UpdateBinThreshold = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationId?: InputMaybe<Scalars['UUID']['input']>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCampaign = {
  budget?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type UpdateCarrier = {
  contactDetails?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCarrierRate = {
  carrierId?: InputMaybe<Scalars['UUID']['input']>;
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Decimal']['input']>;
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnitEnum>;
};

export type UpdateCase = {
  caseNumber?: InputMaybe<Scalars['String']['input']>;
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type UpdateClientAccount = {
  availableCredit?: InputMaybe<Scalars['Decimal']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  creditLimit?: InputMaybe<Scalars['Decimal']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
  walletBalance?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateCompany = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContact = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCreditNote = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  appliedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  creditNoteNumber?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  disputeId?: InputMaybe<Scalars['UUID']['input']>;
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerTrackingLink = {
  accessCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryTaskId?: InputMaybe<Scalars['UUID']['input']>;
  expiresAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastAccessedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  trackingToken?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDeliveryRoute = {
  actualDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  estimatedDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  routeDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  startedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<DeliveryRouteStatusEnum>;
  totalDistanceKm?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateDeliveryTask = {
  actualArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  deliveryAddress?: InputMaybe<Scalars['String']['input']>;
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryRouteId?: InputMaybe<Scalars['UUID']['input']>;
  deliveryTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  failureReason?: InputMaybe<DeliveryFailureReasonEnum>;
  packageId?: InputMaybe<Scalars['UUID']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
  routeSequence?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<DeliveryTaskStatusEnum>;
};

export type UpdateDispute = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  disputedAmount?: InputMaybe<Scalars['Decimal']['input']>;
  lineItemId?: InputMaybe<Scalars['UUID']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
  resolvedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  resolvedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<DisputeStatusEnum>;
  submittedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type UpdateDocument = {
  documentType?: InputMaybe<DocumentTypeEnum>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['UUID']['input']>;
  recordType?: InputMaybe<Scalars['String']['input']>;
  uploadedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateDriver = {
  licenseExpiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  licenseNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DriverStatusEnum>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateDriverLocation = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type UpdateDriverSchedule = {
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  reason?: InputMaybe<DriverScheduleReasonEnum>;
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type UpdateExpense = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  currency?: InputMaybe<CurrencyEnum>;
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  fuelQuantity?: InputMaybe<Scalars['Float']['input']>;
  odometerReading?: InputMaybe<Scalars['Int']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatusEnum>;
  tripId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<ExpenseTypeEnum>;
};

export type UpdateGeofence = {
  coordinates?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGeofenceEvent = {
  eventType?: InputMaybe<GeofenceEventTypeEnum>;
  geofenceId?: InputMaybe<Scalars['UUID']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateGpsPing = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateInboundShipment = {
  actualArrivalDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  expectedArrivalDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  status?: InputMaybe<InboundShipmentStatusEnum>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateInboundShipmentItem = {
  discrepancyNotes?: InputMaybe<Scalars['String']['input']>;
  discrepancyQuantity?: InputMaybe<Scalars['Int']['input']>;
  expectedQuantity?: InputMaybe<Scalars['Int']['input']>;
  inboundShipmentId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  receivedQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateInteraction = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateInventoryAdjustment = {
  notes?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantityChange?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<InventoryAdjustmentReasonEnum>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateInventoryBatch = {
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  expirationDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateInventoryStock = {
  availableQuantity?: InputMaybe<Scalars['Int']['input']>;
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  lastCountedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  lastMovementAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  locationId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  reservedQuantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InventoryStockStatusEnum>;
};

export type UpdateInvoice = {
  amountOutstanding?: InputMaybe<Scalars['Decimal']['input']>;
  amountPaid?: InputMaybe<Scalars['Decimal']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paidAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['UUID']['input']>;
  sentAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<InvoiceStatusEnum>;
  subtotal?: InputMaybe<Scalars['Decimal']['input']>;
  taxAmount?: InputMaybe<Scalars['Decimal']['input']>;
  totalAmount?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateInvoiceItem = {
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateInvoiceLineItem = {
  description?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Decimal']['input']>;
  discountRate?: InputMaybe<Scalars['Decimal']['input']>;
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  lineTotal?: InputMaybe<Scalars['Decimal']['input']>;
  quantity?: InputMaybe<Scalars['Decimal']['input']>;
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  taxAmount?: InputMaybe<Scalars['Decimal']['input']>;
  taxRate?: InputMaybe<Scalars['Decimal']['input']>;
  totalPrice?: InputMaybe<Scalars['Decimal']['input']>;
  unitPrice?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateLocation = {
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
  parentLocationId?: InputMaybe<Scalars['UUID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<LocationTypeEnum>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateOutboundShipment = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<OutboundShipmentStatusEnum>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateOutboundShipmentItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  outboundShipmentId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantityShipped?: InputMaybe<Scalars['Int']['input']>;
  salesOrderItemId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdatePackage = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  insuranceValue?: InputMaybe<Scalars['Decimal']['input']>;
  isFragile?: InputMaybe<Scalars['Boolean']['input']>;
  isHazmat?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  packageNumber?: InputMaybe<Scalars['String']['input']>;
  packageType?: InputMaybe<Scalars['String']['input']>;
  packedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  packedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  requiresSignature?: InputMaybe<Scalars['Boolean']['input']>;
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePackageItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  packageId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  totalWeight?: InputMaybe<Scalars['Float']['input']>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePartnerInvoice = {
  carrierId?: InputMaybe<Scalars['UUID']['input']>;
  invoiceDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PartnerInvoiceStatusEnum>;
  totalAmount?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdatePartnerInvoiceItem = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  partnerInvoiceId?: InputMaybe<Scalars['UUID']['input']>;
  shipmentLegId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdatePayment = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  exchangeRate?: InputMaybe<Scalars['Decimal']['input']>;
  fees?: InputMaybe<Scalars['Decimal']['input']>;
  gatewayReference?: InputMaybe<Scalars['String']['input']>;
  invoiceId?: InputMaybe<Scalars['UUID']['input']>;
  netAmount?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethodEnum>;
  processedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<PaymentStatusEnum>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePickBatch = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['UUID']['input']>;
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<PickBatchStatusEnum>;
  strategy?: InputMaybe<PickStrategyEnum>;
  totalItems?: InputMaybe<Scalars['Int']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdatePickBatchItem = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
  pickBatchId?: InputMaybe<Scalars['UUID']['input']>;
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateProduct = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  costPrice?: InputMaybe<Scalars['Decimal']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatusEnum>;
  supplierId?: InputMaybe<Scalars['UUID']['input']>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateProofOfDelivery = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  tripStopId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<ProofTypeEnum>;
};

export type UpdatePutawayRule = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationType?: InputMaybe<LocationTypeEnum>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  preferredLocationId?: InputMaybe<Scalars['UUID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  requiresHazmatApproval?: InputMaybe<Scalars['Boolean']['input']>;
  requiresTemperatureControl?: InputMaybe<Scalars['Boolean']['input']>;
  volumeThreshold?: InputMaybe<Scalars['Float']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
  weightThreshold?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateQuote = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  destinationDetails?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  height?: InputMaybe<Scalars['Decimal']['input']>;
  length?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  originDetails?: InputMaybe<Scalars['String']['input']>;
  quoteNumber?: InputMaybe<Scalars['String']['input']>;
  quotedPrice?: InputMaybe<Scalars['Decimal']['input']>;
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuoteStatusEnum>;
  volume?: InputMaybe<Scalars['Decimal']['input']>;
  weight?: InputMaybe<Scalars['Decimal']['input']>;
  width?: InputMaybe<Scalars['Decimal']['input']>;
};

export type UpdateRateCard = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<ServiceTypeEnum>;
  validFrom?: InputMaybe<Scalars['NaiveDate']['input']>;
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type UpdateRateRule = {
  condition?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxValue?: InputMaybe<Scalars['Decimal']['input']>;
  minValue?: InputMaybe<Scalars['Decimal']['input']>;
  price?: InputMaybe<Scalars['Decimal']['input']>;
  pricingModel?: InputMaybe<PricingModelEnum>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  rateCardId?: InputMaybe<Scalars['UUID']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReorderPoint = {
  productId?: InputMaybe<Scalars['UUID']['input']>;
  threshold?: InputMaybe<Scalars['Int']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateReturn = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  returnNumber?: InputMaybe<Scalars['String']['input']>;
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<ReturnStatusEnum>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateReturnItem = {
  condition?: InputMaybe<ReturnItemConditionEnum>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantityExpected?: InputMaybe<Scalars['Int']['input']>;
  quantityReceived?: InputMaybe<Scalars['Int']['input']>;
  quantityVariance?: InputMaybe<Scalars['Int']['input']>;
  returnId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateRoute = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateSalesOrder = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  crmOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatusEnum>;
};

export type UpdateSalesOrderItem = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantityOrdered?: InputMaybe<Scalars['Int']['input']>;
  salesOrderId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateShipmentLeg = {
  carrierId?: InputMaybe<Scalars['UUID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  internalTripId?: InputMaybe<Scalars['UUID']['input']>;
  legSequence?: InputMaybe<Scalars['Int']['input']>;
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatusEnum>;
};

export type UpdateShipmentLegEvent = {
  eventTimestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  shipmentLegId?: InputMaybe<Scalars['UUID']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStockTransfer = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  destinationWarehouseId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  sourceWarehouseId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<StockTransferStatusEnum>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSupplier = {
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSurcharge = {
  amount?: InputMaybe<Scalars['Decimal']['input']>;
  calculationMethod?: InputMaybe<SurchargeCalculationMethodEnum>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  validFrom?: InputMaybe<Scalars['NaiveDate']['input']>;
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type UpdateTask = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  durationSeconds?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pickBatchId?: InputMaybe<Scalars['UUID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  sourceEntityId?: InputMaybe<Scalars['UUID']['input']>;
  sourceEntityType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<TaskStatusEnum>;
  taskNumber?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TaskTypeEnum>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  warehouseId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateTaskEvent = {
  deliveryTaskId?: InputMaybe<Scalars['UUID']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskEventStatusEnum>;
  timestamp?: InputMaybe<Scalars['NaiveDateTime']['input']>;
};

export type UpdateTaskItem = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  destinationLocationId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantityCompleted?: InputMaybe<Scalars['Int']['input']>;
  quantityRemaining?: InputMaybe<Scalars['Int']['input']>;
  quantityRequired?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceLocationId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TaskItemStatusEnum>;
  taskId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateTrip = {
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStatusEnum>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateTripStop = {
  actualArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStopStatusEnum>;
  tripId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateVehicle = {
  capacityVolume?: InputMaybe<Scalars['Float']['input']>;
  capacityWeight?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<VehicleStatusEnum>;
};

export type UpdateVehicleMaintenance = {
  cost?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  serviceType?: InputMaybe<VehicleServiceTypeEnum>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateWarehouse = {
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

export type Users = {
  __typename?: 'Users';
  user?: Maybe<AuthUser>;
  users: Array<AuthUser>;
};


export type UsersUserArgs = {
  id: Scalars['UUID']['input'];
};

export enum VehicleServiceTypeEnum {
  BrakeService = 'BRAKE_SERVICE',
  Inspection = 'INSPECTION',
  OilChange = 'OIL_CHANGE',
  Repair = 'REPAIR',
  RoutineMaintenance = 'ROUTINE_MAINTENANCE',
  TireReplacement = 'TIRE_REPLACEMENT'
}

export enum VehicleStatusEnum {
  Available = 'AVAILABLE',
  InMaintenance = 'IN_MAINTENANCE',
  OnTrip = 'ON_TRIP',
  OutOfService = 'OUT_OF_SERVICE'
}

export type WmsBinThreshold = {
  __typename?: 'WmsBinThreshold';
  alertThreshold?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  location: WmsLocation;
  locationId: Scalars['UUID']['output'];
  maxQuantity: Scalars['Int']['output'];
  minQuantity: Scalars['Int']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  reorderQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type WmsInventoryStock = {
  __typename?: 'WmsInventoryStock';
  availableQuantity?: Maybe<Scalars['Int']['output']>;
  batch?: Maybe<ImsInventoryBatch>;
  batchId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  lastCountedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  lastMovementAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  location: WmsLocation;
  locationId: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
  reservedQuantity: Scalars['Int']['output'];
  status?: Maybe<InventoryStockStatusEnum>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type WmsLocation = {
  __typename?: 'WmsLocation';
  barcode?: Maybe<Scalars['String']['output']>;
  binThresholds: Array<WmsBinThreshold>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  hazmatApproved?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['UUID']['output'];
  inventoryStock: Array<WmsInventoryStock>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isPickable?: Maybe<Scalars['Boolean']['output']>;
  isReceivable?: Maybe<Scalars['Boolean']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  maxPallets?: Maybe<Scalars['Int']['output']>;
  maxVolume?: Maybe<Scalars['Float']['output']>;
  maxWeight?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  parentLocation?: Maybe<WmsLocation>;
  parentLocationId?: Maybe<Scalars['UUID']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  putawayRules: Array<WmsPutawayRule>;
  temperatureControlled?: Maybe<Scalars['Boolean']['output']>;
  type: LocationTypeEnum;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  warehouse: WmsWarehouse;
  warehouseId: Scalars['UUID']['output'];
  xCoordinate?: Maybe<Scalars['Float']['output']>;
  yCoordinate?: Maybe<Scalars['Float']['output']>;
  zCoordinate?: Maybe<Scalars['Float']['output']>;
};

export type WmsMutations = {
  __typename?: 'WmsMutations';
  createBinThreshold: WmsBinThreshold;
  createInventoryStock: WmsInventoryStock;
  createLocation: WmsLocation;
  createPackage: WmsPackage;
  createPackageItem: WmsPackageItem;
  createPickBatch: WmsPickBatch;
  createPickBatchItem: WmsPickBatchItem;
  createPutawayRule: WmsPutawayRule;
  createTask: WmsTask;
  createTaskItem: WmsTaskItem;
  createWarehouse: WmsWarehouse;
  deleteBinThreshold: Scalars['Boolean']['output'];
  deleteInventoryStock: Scalars['Boolean']['output'];
  deleteLocation: Scalars['Boolean']['output'];
  deletePackage: Scalars['Boolean']['output'];
  deletePackageItem: Scalars['Boolean']['output'];
  deletePickBatch: Scalars['Boolean']['output'];
  deletePickBatchItem: Scalars['Boolean']['output'];
  deletePutawayRule: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
  deleteTaskItem: Scalars['Boolean']['output'];
  deleteWarehouse: Scalars['Boolean']['output'];
  updateBinThreshold: WmsBinThreshold;
  updateInventoryStock: WmsInventoryStock;
  updateLocation: WmsLocation;
  updatePackage: WmsPackage;
  updatePackageItem: WmsPackageItem;
  updatePickBatch: WmsPickBatch;
  updatePickBatchItem: WmsPickBatchItem;
  updatePutawayRule: WmsPutawayRule;
  updateTask: WmsTask;
  updateTaskItem: WmsTaskItem;
  updateWarehouse: WmsWarehouse;
};


export type WmsMutationsCreateBinThresholdArgs = {
  value: InsertBinThreshold;
};


export type WmsMutationsCreateInventoryStockArgs = {
  value: InsertInventoryStock;
};


export type WmsMutationsCreateLocationArgs = {
  value: InsertLocation;
};


export type WmsMutationsCreatePackageArgs = {
  value: InsertPackage;
};


export type WmsMutationsCreatePackageItemArgs = {
  value: InsertPackageItem;
};


export type WmsMutationsCreatePickBatchArgs = {
  value: InsertPickBatch;
};


export type WmsMutationsCreatePickBatchItemArgs = {
  value: InsertPickBatchItem;
};


export type WmsMutationsCreatePutawayRuleArgs = {
  value: InsertPutawayRule;
};


export type WmsMutationsCreateTaskArgs = {
  value: InsertTask;
};


export type WmsMutationsCreateTaskItemArgs = {
  value: InsertTaskItem;
};


export type WmsMutationsCreateWarehouseArgs = {
  value: InsertWarehouse;
};


export type WmsMutationsDeleteBinThresholdArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeleteInventoryStockArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeleteLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeletePackageArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeletePackageItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeletePickBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeletePickBatchItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeletePutawayRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeleteTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeleteTaskItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsDeleteWarehouseArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsUpdateBinThresholdArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateBinThreshold;
};


export type WmsMutationsUpdateInventoryStockArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateInventoryStock;
};


export type WmsMutationsUpdateLocationArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateLocation;
};


export type WmsMutationsUpdatePackageArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePackage;
};


export type WmsMutationsUpdatePackageItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePackageItem;
};


export type WmsMutationsUpdatePickBatchArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePickBatch;
};


export type WmsMutationsUpdatePickBatchItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePickBatchItem;
};


export type WmsMutationsUpdatePutawayRuleArgs = {
  id: Scalars['UUID']['input'];
  value: UpdatePutawayRule;
};


export type WmsMutationsUpdateTaskArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateTask;
};


export type WmsMutationsUpdateTaskItemArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateTaskItem;
};


export type WmsMutationsUpdateWarehouseArgs = {
  id: Scalars['UUID']['input'];
  value: UpdateWarehouse;
};

export type WmsPackage = {
  __typename?: 'WmsPackage';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  insuranceValue?: Maybe<Scalars['Decimal']['output']>;
  isFragile?: Maybe<Scalars['Boolean']['output']>;
  isHazmat?: Maybe<Scalars['Boolean']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  packageItems: Array<WmsPackageItem>;
  packageNumber: Scalars['String']['output'];
  packageType?: Maybe<Scalars['String']['output']>;
  packedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  packedBy?: Maybe<AuthUser>;
  packedByUserId?: Maybe<Scalars['UUID']['output']>;
  requiresSignature?: Maybe<Scalars['Boolean']['output']>;
  salesOrder: ImsSalesOrder;
  salesOrderId: Scalars['UUID']['output'];
  serviceLevel?: Maybe<Scalars['String']['output']>;
  shippedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  warehouse: WmsWarehouse;
  warehouseId: Scalars['UUID']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type WmsPackageItem = {
  __typename?: 'WmsPackageItem';
  batch?: Maybe<ImsInventoryBatch>;
  batchId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  expiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  package: WmsPackage;
  packageId: Scalars['UUID']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Scalars['String']['output']>>;
  totalWeight?: Maybe<Scalars['Float']['output']>;
  unitWeight?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type WmsPickBatch = {
  __typename?: 'WmsPickBatch';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  assignedUser?: Maybe<AuthUser>;
  assignedUserId?: Maybe<Scalars['UUID']['output']>;
  batchNumber: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  completedItems?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  pickBatchItems: Array<WmsPickBatchItem>;
  priority?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  status?: Maybe<PickBatchStatusEnum>;
  strategy: PickStrategyEnum;
  tasks: Array<WmsTask>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  warehouse: WmsWarehouse;
  warehouseId: Scalars['UUID']['output'];
  waveId?: Maybe<Scalars['String']['output']>;
  zoneRestrictions?: Maybe<Array<Scalars['String']['output']>>;
};

export type WmsPickBatchItem = {
  __typename?: 'WmsPickBatchItem';
  actualPickTime?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedPickTime?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  orderPriority?: Maybe<Scalars['Int']['output']>;
  pickBatch: WmsPickBatch;
  pickBatchId: Scalars['UUID']['output'];
  salesOrder: ImsSalesOrder;
  salesOrderId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type WmsPutawayRule = {
  __typename?: 'WmsPutawayRule';
  client?: Maybe<CrmCompany>;
  clientId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locationType?: Maybe<LocationTypeEnum>;
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  minQuantity?: Maybe<Scalars['Int']['output']>;
  preferredLocation?: Maybe<WmsLocation>;
  preferredLocationId?: Maybe<Scalars['UUID']['output']>;
  priority: Scalars['Int']['output'];
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  requiresHazmatApproval?: Maybe<Scalars['Boolean']['output']>;
  requiresTemperatureControl?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  volumeThreshold?: Maybe<Scalars['Float']['output']>;
  warehouse: WmsWarehouse;
  warehouseId: Scalars['UUID']['output'];
  weightThreshold?: Maybe<Scalars['Float']['output']>;
};

export type WmsQueries = {
  __typename?: 'WmsQueries';
  binThreshold?: Maybe<WmsBinThreshold>;
  binThresholds: Array<WmsBinThreshold>;
  inventoryStock?: Maybe<WmsInventoryStock>;
  inventoryStocks: Array<WmsInventoryStock>;
  location?: Maybe<WmsLocation>;
  locations: Array<WmsLocation>;
  package?: Maybe<WmsPackage>;
  packageItem?: Maybe<WmsPackageItem>;
  packageItems: Array<WmsPackageItem>;
  packages: Array<WmsPackage>;
  pickBatch?: Maybe<WmsPickBatch>;
  pickBatchItem?: Maybe<WmsPickBatchItem>;
  pickBatchItems: Array<WmsPickBatchItem>;
  pickBatches: Array<WmsPickBatch>;
  putawayRule?: Maybe<WmsPutawayRule>;
  putawayRules: Array<WmsPutawayRule>;
  task?: Maybe<WmsTask>;
  taskItem?: Maybe<WmsTaskItem>;
  taskItems: Array<WmsTaskItem>;
  tasks: Array<WmsTask>;
  warehouse?: Maybe<WmsWarehouse>;
  warehouses: Array<WmsWarehouse>;
};


export type WmsQueriesBinThresholdArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesInventoryStockArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPackageArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPackageItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPickBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPickBatchItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPutawayRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesTaskItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesWarehouseArgs = {
  id: Scalars['UUID']['input'];
};

export type WmsTask = {
  __typename?: 'WmsTask';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  durationSeconds?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  pickBatch?: Maybe<WmsPickBatch>;
  pickBatchId?: Maybe<Scalars['UUID']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
  sourceEntityId?: Maybe<Scalars['UUID']['output']>;
  sourceEntityType?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['NaiveDateTime']['output']>;
  status?: Maybe<TaskStatusEnum>;
  taskItems: Array<WmsTaskItem>;
  taskNumber: Scalars['String']['output'];
  type: TaskTypeEnum;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  user?: Maybe<AuthUser>;
  userId?: Maybe<Scalars['UUID']['output']>;
  warehouse: WmsWarehouse;
  warehouseId: Scalars['UUID']['output'];
};

export type WmsTaskItem = {
  __typename?: 'WmsTaskItem';
  batch?: Maybe<ImsInventoryBatch>;
  batchId?: Maybe<Scalars['UUID']['output']>;
  completedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  destinationLocation?: Maybe<WmsLocation>;
  destinationLocationId?: Maybe<Scalars['UUID']['output']>;
  expiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  product: ImsProduct;
  productId: Scalars['UUID']['output'];
  quantityCompleted: Scalars['Int']['output'];
  quantityRemaining?: Maybe<Scalars['Int']['output']>;
  quantityRequired: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Scalars['String']['output']>>;
  sourceLocation?: Maybe<WmsLocation>;
  sourceLocationId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<TaskItemStatusEnum>;
  task: WmsTask;
  taskId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type WmsWarehouse = {
  __typename?: 'WmsWarehouse';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['NaiveDateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locations: Array<WmsLocation>;
  name: Scalars['String']['output'];
  packages: Array<WmsPackage>;
  pickBatches: Array<WmsPickBatch>;
  postalCode?: Maybe<Scalars['String']['output']>;
  putawayRules: Array<WmsPutawayRule>;
  state?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']['output']>;
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutations', signInEmail: { __typename?: 'SignInResponse', token: string, user: { __typename?: 'AuthUser', id: any, name: string, email: string, emailVerified?: boolean | null } } } };
