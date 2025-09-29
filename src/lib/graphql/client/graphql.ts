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
   * Implement the DateTime<Utc> scalar
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
  Upload: { input: any; output: any; }
};

export type AuthMutation = {
  __typename?: 'AuthMutation';
  changePassword: Scalars['String']['output'];
  refreshSession: RefreshSessionResponse;
  revokeSession: RevokeSessionResponse;
  signInEmail: SignInResponse;
  signUpEmail: SignUpResponse;
};


export type AuthMutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type AuthMutationRevokeSessionArgs = {
  token: Scalars['String']['input'];
};


export type AuthMutationSignInEmailArgs = {
  payload: SignInEmailInput;
};


export type AuthMutationSignUpEmailArgs = {
  payload: SignUpEmailInput;
};

export type AuthQuery = {
  __typename?: 'AuthQuery';
  me: AuthUser;
  user?: Maybe<AuthUser>;
  users: Array<AuthUser>;
};


export type AuthQueryUserArgs = {
  id: Scalars['UUID']['input'];
};


export type AuthQueryUsersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  banExpires?: Maybe<Scalars['DateTime']['output']>;
  banReason?: Maybe<Scalars['String']['output']>;
  banned?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['UUID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role?: Maybe<AuthUserRole>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum AuthUserRole {
  Accountant = 'ACCOUNTANT',
  AccountManager = 'ACCOUNT_MANAGER',
  Admin = 'ADMIN',
  Carrier = 'CARRIER',
  Client = 'CLIENT',
  ClientAdmin = 'CLIENT_ADMIN',
  CustomerSupportAgent = 'CUSTOMER_SUPPORT_AGENT',
  Developer = 'DEVELOPER',
  Dispatcher = 'DISPATCHER',
  Driver = 'DRIVER',
  EndCustomer = 'END_CUSTOMER',
  FinanceManager = 'FINANCE_MANAGER',
  FleetManager = 'FLEET_MANAGER',
  InventoryManager = 'INVENTORY_MANAGER',
  LogisticsCoordinator = 'LOGISTICS_COORDINATOR',
  LogisticsManager = 'LOGISTICS_MANAGER',
  LogisticsPlanner = 'LOGISTICS_PLANNER',
  MarketingManager = 'MARKETING_MANAGER',
  Packer = 'PACKER',
  Picker = 'PICKER',
  PricingAnalyst = 'PRICING_ANALYST',
  ProductManager = 'PRODUCT_MANAGER',
  QcManager = 'QC_MANAGER',
  ReceivingManager = 'RECEIVING_MANAGER',
  ReturnsProcessor = 'RETURNS_PROCESSOR',
  SalesManager = 'SALES_MANAGER',
  SalesRep = 'SALES_REP',
  Sdr = 'SDR',
  TransportManager = 'TRANSPORT_MANAGER',
  User = 'USER',
  WarehouseManager = 'WAREHOUSE_MANAGER',
  WarehouseOperator = 'WAREHOUSE_OPERATOR'
}

export type BillingAccountTransactions = {
  __typename?: 'BillingAccountTransactions';
  amount: Scalars['Float']['output'];
  clientAccount: BillingClientAccounts;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  processedByUser?: Maybe<AuthUser>;
  referenceNumber?: Maybe<Scalars['String']['output']>;
  runningBalance?: Maybe<Scalars['Float']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  transactionDate?: Maybe<Scalars['DateTime']['output']>;
  type: TransactionTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingAccountingSyncLog = {
  __typename?: 'BillingAccountingSyncLog';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  externalSystem: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastSyncAt?: Maybe<Scalars['DateTime']['output']>;
  nextRetryAt?: Maybe<Scalars['DateTime']['output']>;
  recordId: Scalars['UUID']['output'];
  recordType: Scalars['String']['output'];
  requestPayload?: Maybe<Scalars['String']['output']>;
  responsePayload?: Maybe<Scalars['String']['output']>;
  retryCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<SyncStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingClientAccounts = {
  __typename?: 'BillingClientAccounts';
  availableCredit?: Maybe<Scalars['Float']['output']>;
  client: CrmCompanies;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creditLimit?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isCreditApproved?: Maybe<Scalars['Boolean']['output']>;
  lastPaymentDate?: Maybe<Scalars['NaiveDate']['output']>;
  paymentTermsDays?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  walletBalance?: Maybe<Scalars['Float']['output']>;
};

export type BillingCreditNotes = {
  __typename?: 'BillingCreditNotes';
  amount: Scalars['Float']['output'];
  appliedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUser?: Maybe<AuthUser>;
  creditNoteNumber: Scalars['String']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  dispute?: Maybe<BillingDisputes>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoices;
  issueDate: Scalars['NaiveDate']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingDisputes = {
  __typename?: 'BillingDisputes';
  client: CrmCompanies;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  disputedAmount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  invoiceLineItem: BillingInvoiceLineItems;
  reason: Scalars['String']['output'];
  resolutionNotes?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['DateTime']['output']>;
  resolvedBy?: Maybe<AuthUser>;
  status: DisputeStatusEnum;
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingDocuments = {
  __typename?: 'BillingDocuments';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentType: DocumentTypeEnum;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  fileSize?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId: Scalars['UUID']['output'];
  recordType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uploadedBy?: Maybe<AuthUser>;
};

export type BillingInvoiceLineItems = {
  __typename?: 'BillingInvoiceLineItems';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountRate?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoices;
  lineTotal?: Maybe<Scalars['Float']['output']>;
  quantity: Scalars['Float']['output'];
  sourceRecordId?: Maybe<Scalars['UUID']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  taxAmount?: Maybe<Scalars['Float']['output']>;
  taxRate?: Maybe<Scalars['Float']['output']>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  unitPrice: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingInvoices = {
  __typename?: 'BillingInvoices';
  amountOutstanding: Scalars['Float']['output'];
  amountPaid: Scalars['Float']['output'];
  client: CrmCompanies;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<AuthUser>;
  currency?: Maybe<Scalars['String']['output']>;
  discountAmount: Scalars['Float']['output'];
  dueDate: Scalars['NaiveDate']['output'];
  id: Scalars['UUID']['output'];
  invoiceNumber: Scalars['String']['output'];
  issueDate: Scalars['NaiveDate']['output'];
  items: Array<BillingInvoiceLineItems>;
  notes?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentTerms?: Maybe<Scalars['String']['output']>;
  quote?: Maybe<BillingQuotes>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<InvoiceStatusEnum>;
  subtotal: Scalars['Float']['output'];
  taxAmount: Scalars['Float']['output'];
  totalAmount: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingMutations = {
  __typename?: 'BillingMutations';
  addInvoiceLineItem: BillingInvoices;
  createAccountTransaction: BillingAccountTransactions;
  createAccountingSyncLog: BillingAccountingSyncLog;
  createClientAccount: BillingClientAccounts;
  createCreditNote: BillingCreditNotes;
  createDispute: BillingDisputes;
  createDocument: BillingDocuments;
  createInvoice: BillingInvoices;
  createPayment: BillingPayments;
  createQuote: BillingQuotes;
  createRateCard: BillingRateCards;
  createRateRule: BillingRateRules;
  createSurcharge: BillingSurcharges;
  removeAccountTransaction: Scalars['String']['output'];
  removeAccountingSyncLog: Scalars['String']['output'];
  removeClientAccount: Scalars['String']['output'];
  removeCreditNote: Scalars['String']['output'];
  removeDispute: Scalars['String']['output'];
  removeDocument: Scalars['String']['output'];
  removeInvoice: Scalars['String']['output'];
  removeInvoiceLineItem: BillingInvoices;
  removePayment: Scalars['String']['output'];
  removeQuote: Scalars['String']['output'];
  removeRateCard: Scalars['String']['output'];
  removeRateRule: Scalars['String']['output'];
  removeSurcharge: Scalars['String']['output'];
  updateAccountTransactionAmount: BillingAccountTransactions;
  updateAccountTransactionClientAccountId: BillingAccountTransactions;
  updateAccountTransactionDescription: BillingAccountTransactions;
  updateAccountTransactionProcessedByUserId: BillingAccountTransactions;
  updateAccountTransactionReferenceNumber: BillingAccountTransactions;
  updateAccountTransactionRunningBalance: BillingAccountTransactions;
  updateAccountTransactionSourceRecordId: BillingAccountTransactions;
  updateAccountTransactionSourceRecordType: BillingAccountTransactions;
  updateAccountTransactionTransactionDate: BillingAccountTransactions;
  updateAccountTransactionType: BillingAccountTransactions;
  updateAccountingSyncLogErrorMessage: BillingAccountingSyncLog;
  updateAccountingSyncLogExternalId: BillingAccountingSyncLog;
  updateAccountingSyncLogExternalSystem: BillingAccountingSyncLog;
  updateAccountingSyncLogLastSyncAt: BillingAccountingSyncLog;
  updateAccountingSyncLogNextRetryAt: BillingAccountingSyncLog;
  updateAccountingSyncLogRecordId: BillingAccountingSyncLog;
  updateAccountingSyncLogRecordType: BillingAccountingSyncLog;
  updateAccountingSyncLogRequestPayload: BillingAccountingSyncLog;
  updateAccountingSyncLogResponsePayload: BillingAccountingSyncLog;
  updateAccountingSyncLogRetryCount: BillingAccountingSyncLog;
  updateAccountingSyncLogStatus: BillingAccountingSyncLog;
  updateClientAccountAvailableCredit: BillingClientAccounts;
  updateClientAccountClientId: BillingClientAccounts;
  updateClientAccountCreditLimit: BillingClientAccounts;
  updateClientAccountCurrency: BillingClientAccounts;
  updateClientAccountIsCreditApproved: BillingClientAccounts;
  updateClientAccountLastPaymentDate: BillingClientAccounts;
  updateClientAccountPaymentTermsDays: BillingClientAccounts;
  updateClientAccountWalletBalance: BillingClientAccounts;
  updateCreditNoteAmount: BillingCreditNotes;
  updateCreditNoteAppliedAt: BillingCreditNotes;
  updateCreditNoteCreatedByUserId: BillingCreditNotes;
  updateCreditNoteCreditNoteNumber: BillingCreditNotes;
  updateCreditNoteCurrency: BillingCreditNotes;
  updateCreditNoteDisputeId: BillingCreditNotes;
  updateCreditNoteInvoiceId: BillingCreditNotes;
  updateCreditNoteIssueDate: BillingCreditNotes;
  updateCreditNoteNotes: BillingCreditNotes;
  updateCreditNoteReason: BillingCreditNotes;
  updateDisputeClientId: BillingDisputes;
  updateDisputeDisputedAmount: BillingDisputes;
  updateDisputeLineItemId: BillingDisputes;
  updateDisputeReason: BillingDisputes;
  updateDisputeResolutionNotes: BillingDisputes;
  updateDisputeResolvedAt: BillingDisputes;
  updateDisputeResolvedByUserId: BillingDisputes;
  updateDisputeStatus: BillingDisputes;
  updateDisputeSubmittedAt: BillingDisputes;
  updateDocumentDocumentType: BillingDocuments;
  updateDocumentFileName: BillingDocuments;
  updateDocumentFilePath: BillingDocuments;
  updateDocumentFileSize: BillingDocuments;
  updateDocumentMimeType: BillingDocuments;
  updateDocumentRecordId: BillingDocuments;
  updateDocumentRecordType: BillingDocuments;
  updateDocumentUploadedByUserId: BillingDocuments;
  updateInvoiceAmountPaid: BillingInvoices;
  updateInvoiceClientId: BillingInvoices;
  updateInvoiceCreatedByUserId: BillingInvoices;
  updateInvoiceCurrency: BillingInvoices;
  updateInvoiceDiscountAmount: BillingInvoices;
  updateInvoiceDueDate: BillingInvoices;
  updateInvoiceInvoiceNumber: BillingInvoices;
  updateInvoiceIssueDate: BillingInvoices;
  updateInvoiceLineItemDescription: BillingInvoices;
  updateInvoiceLineItemDiscountRate: BillingInvoices;
  updateInvoiceLineItemProductId: BillingInvoices;
  updateInvoiceLineItemQuantity: BillingInvoices;
  updateInvoiceLineItemSourceRecordId: BillingInvoices;
  updateInvoiceLineItemSourceRecordType: BillingInvoices;
  updateInvoiceLineItemTaxRate: BillingInvoices;
  updateInvoiceLineItemUnitPrice: BillingInvoices;
  updateInvoiceNotes: BillingInvoices;
  updateInvoicePaidAt: BillingInvoices;
  updateInvoicePaymentTerms: BillingInvoices;
  updateInvoiceQuoteId: BillingInvoices;
  updateInvoiceSentAt: BillingInvoices;
  updateInvoiceStatus: BillingInvoices;
  updateInvoiceSubtotal: BillingInvoices;
  updateInvoiceTaxAmount: BillingInvoices;
  updateInvoiceTotalAmount: BillingInvoices;
  updatePaymentAmount: BillingPayments;
  updatePaymentCurrency: BillingPayments;
  updatePaymentExchangeRate: BillingPayments;
  updatePaymentFees: BillingPayments;
  updatePaymentGatewayReference: BillingPayments;
  updatePaymentInvoiceId: BillingPayments;
  updatePaymentNotes: BillingPayments;
  updatePaymentPaymentDate: BillingPayments;
  updatePaymentPaymentMethod: BillingPayments;
  updatePaymentProcessedAt: BillingPayments;
  updatePaymentProcessedByUserId: BillingPayments;
  updatePaymentStatus: BillingPayments;
  updatePaymentTransactionId: BillingPayments;
  updateQuoteClientId: BillingQuotes;
  updateQuoteCreatedByUserId: BillingQuotes;
  updateQuoteDestinationDetails: BillingQuotes;
  updateQuoteExpiresAt: BillingQuotes;
  updateQuoteHeight: BillingQuotes;
  updateQuoteLength: BillingQuotes;
  updateQuoteNotes: BillingQuotes;
  updateQuoteOriginDetails: BillingQuotes;
  updateQuoteQuoteNumber: BillingQuotes;
  updateQuoteQuotedPrice: BillingQuotes;
  updateQuoteServiceLevel: BillingQuotes;
  updateQuoteStatus: BillingQuotes;
  updateQuoteWeight: BillingQuotes;
  updateQuoteWidth: BillingQuotes;
  updateRateCardCreatedByUserId: BillingRateCards;
  updateRateCardDescription: BillingRateCards;
  updateRateCardIsActive: BillingRateCards;
  updateRateCardName: BillingRateCards;
  updateRateCardServiceType: BillingRateCards;
  updateRateCardValidFrom: BillingRateCards;
  updateRateCardValidTo: BillingRateCards;
  updateRateRuleCondition: BillingRateRules;
  updateRateRuleIsActive: BillingRateRules;
  updateRateRuleMaxValue: BillingRateRules;
  updateRateRuleMinValue: BillingRateRules;
  updateRateRulePrice: BillingRateRules;
  updateRateRulePricingModel: BillingRateRules;
  updateRateRulePriority: BillingRateRules;
  updateRateRuleRateCardId: BillingRateRules;
  updateRateRuleValue: BillingRateRules;
  updateSurchargeAmount: BillingSurcharges;
  updateSurchargeCalculationMethod: BillingSurcharges;
  updateSurchargeDescription: BillingSurcharges;
  updateSurchargeIsActive: BillingSurcharges;
  updateSurchargeName: BillingSurcharges;
  updateSurchargeType: BillingSurcharges;
  updateSurchargeValidFrom: BillingSurcharges;
  updateSurchargeValidTo: BillingSurcharges;
};


export type BillingMutationsAddInvoiceLineItemArgs = {
  invoiceId: Scalars['UUID']['input'];
  payload: CreateBillingInvoiceLineItemInput;
};


export type BillingMutationsCreateAccountTransactionArgs = {
  payload: CreateAccountTransactionInput;
};


export type BillingMutationsCreateAccountingSyncLogArgs = {
  payload: CreateAccountingSyncLogInput;
};


export type BillingMutationsCreateClientAccountArgs = {
  payload: CreateClientAccountInput;
};


export type BillingMutationsCreateCreditNoteArgs = {
  payload: CreateCreditNoteInput;
};


export type BillingMutationsCreateDisputeArgs = {
  payload: CreateDisputeInput;
};


export type BillingMutationsCreateDocumentArgs = {
  payload: CreateDocumentInput;
};


export type BillingMutationsCreateInvoiceArgs = {
  payload: CreateBillingInvoiceInput;
};


export type BillingMutationsCreatePaymentArgs = {
  payload: CreatePaymentInput;
};


export type BillingMutationsCreateQuoteArgs = {
  payload: CreateQuoteInput;
};


export type BillingMutationsCreateRateCardArgs = {
  payload: CreateRateCardInput;
};


export type BillingMutationsCreateRateRuleArgs = {
  payload: CreateRateRuleInput;
};


export type BillingMutationsCreateSurchargeArgs = {
  payload: CreateSurchargeInput;
};


export type BillingMutationsRemoveAccountTransactionArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveAccountingSyncLogArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveClientAccountArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveCreditNoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveDisputeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveDocumentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveInvoiceLineItemArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemovePaymentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveQuoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveRateCardArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveRateRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveSurchargeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountTransactionAmountArgs = {
  amount: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountTransactionClientAccountIdArgs = {
  clientAccountId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountTransactionDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountTransactionProcessedByUserIdArgs = {
  id: Scalars['UUID']['input'];
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateAccountTransactionReferenceNumberArgs = {
  id: Scalars['UUID']['input'];
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateAccountTransactionRunningBalanceArgs = {
  id: Scalars['UUID']['input'];
  runningBalance?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateAccountTransactionSourceRecordIdArgs = {
  id: Scalars['UUID']['input'];
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateAccountTransactionSourceRecordTypeArgs = {
  id: Scalars['UUID']['input'];
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateAccountTransactionTransactionDateArgs = {
  id: Scalars['UUID']['input'];
  transactionDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateAccountTransactionTypeArgs = {
  id: Scalars['UUID']['input'];
  type: TransactionTypeEnum;
};


export type BillingMutationsUpdateAccountingSyncLogErrorMessageArgs = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountingSyncLogExternalIdArgs = {
  externalId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountingSyncLogExternalSystemArgs = {
  externalSystem: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountingSyncLogLastSyncAtArgs = {
  id: Scalars['UUID']['input'];
  lastSyncAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateAccountingSyncLogNextRetryAtArgs = {
  id: Scalars['UUID']['input'];
  nextRetryAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateAccountingSyncLogRecordIdArgs = {
  id: Scalars['UUID']['input'];
  recordId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountingSyncLogRecordTypeArgs = {
  id: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
};


export type BillingMutationsUpdateAccountingSyncLogRequestPayloadArgs = {
  id: Scalars['UUID']['input'];
  requestPayload?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateAccountingSyncLogResponsePayloadArgs = {
  id: Scalars['UUID']['input'];
  responsePayload?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateAccountingSyncLogRetryCountArgs = {
  id: Scalars['UUID']['input'];
  retryCount?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingMutationsUpdateAccountingSyncLogStatusArgs = {
  id: Scalars['UUID']['input'];
  status: SyncStatusEnum;
};


export type BillingMutationsUpdateClientAccountAvailableCreditArgs = {
  availableCredit?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateClientAccountClientIdArgs = {
  clientId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateClientAccountCreditLimitArgs = {
  creditLimit?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateClientAccountCurrencyArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateClientAccountIsCreditApprovedArgs = {
  id: Scalars['UUID']['input'];
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BillingMutationsUpdateClientAccountLastPaymentDateArgs = {
  id: Scalars['UUID']['input'];
  lastPaymentDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};


export type BillingMutationsUpdateClientAccountPaymentTermsDaysArgs = {
  id: Scalars['UUID']['input'];
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingMutationsUpdateClientAccountWalletBalanceArgs = {
  id: Scalars['UUID']['input'];
  walletBalance?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateCreditNoteAmountArgs = {
  amount: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteAppliedAtArgs = {
  appliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteCreatedByUserIdArgs = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteCreditNoteNumberArgs = {
  creditNoteNumber: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteCurrencyArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteDisputeIdArgs = {
  disputeId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteInvoiceIdArgs = {
  id: Scalars['UUID']['input'];
  invoiceId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteIssueDateArgs = {
  id: Scalars['UUID']['input'];
  issueDate: Scalars['NaiveDate']['input'];
};


export type BillingMutationsUpdateCreditNoteNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateCreditNoteReasonArgs = {
  id: Scalars['UUID']['input'];
  reason: Scalars['String']['input'];
};


export type BillingMutationsUpdateDisputeClientIdArgs = {
  clientId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDisputeDisputedAmountArgs = {
  disputedAmount?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDisputeLineItemIdArgs = {
  id: Scalars['UUID']['input'];
  lineItemId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDisputeReasonArgs = {
  id: Scalars['UUID']['input'];
  reason: Scalars['String']['input'];
};


export type BillingMutationsUpdateDisputeResolutionNotesArgs = {
  id: Scalars['UUID']['input'];
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateDisputeResolvedAtArgs = {
  id: Scalars['UUID']['input'];
  resolvedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateDisputeResolvedByUserIdArgs = {
  id: Scalars['UUID']['input'];
  resolvedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateDisputeStatusArgs = {
  id: Scalars['UUID']['input'];
  status: DisputeStatusEnum;
};


export type BillingMutationsUpdateDisputeSubmittedAtArgs = {
  id: Scalars['UUID']['input'];
  submittedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateDocumentDocumentTypeArgs = {
  documentType: DocumentTypeEnum;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDocumentFileNameArgs = {
  fileName: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDocumentFilePathArgs = {
  filePath: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDocumentFileSizeArgs = {
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDocumentMimeTypeArgs = {
  id: Scalars['UUID']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateDocumentRecordIdArgs = {
  id: Scalars['UUID']['input'];
  recordId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDocumentRecordTypeArgs = {
  id: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
};


export type BillingMutationsUpdateDocumentUploadedByUserIdArgs = {
  id: Scalars['UUID']['input'];
  uploadedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateInvoiceAmountPaidArgs = {
  amountPaid: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceClientIdArgs = {
  clientId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceCreatedByUserIdArgs = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceCurrencyArgs = {
  currency: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceDiscountAmountArgs = {
  discountAmount: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceDueDateArgs = {
  dueDate: Scalars['NaiveDate']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceInvoiceNumberArgs = {
  id: Scalars['UUID']['input'];
  invoiceNumber: Scalars['String']['input'];
};


export type BillingMutationsUpdateInvoiceIssueDateArgs = {
  id: Scalars['UUID']['input'];
  issueDate: Scalars['NaiveDate']['input'];
};


export type BillingMutationsUpdateInvoiceLineItemDescriptionArgs = {
  description: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceLineItemDiscountRateArgs = {
  discountRate?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceLineItemProductIdArgs = {
  id: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceLineItemQuantityArgs = {
  id: Scalars['UUID']['input'];
  quantity: Scalars['Float']['input'];
};


export type BillingMutationsUpdateInvoiceLineItemSourceRecordIdArgs = {
  id: Scalars['UUID']['input'];
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateInvoiceLineItemSourceRecordTypeArgs = {
  id: Scalars['UUID']['input'];
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateInvoiceLineItemTaxRateArgs = {
  id: Scalars['UUID']['input'];
  taxRate?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateInvoiceLineItemUnitPriceArgs = {
  id: Scalars['UUID']['input'];
  unitPrice: Scalars['Float']['input'];
};


export type BillingMutationsUpdateInvoiceNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateInvoicePaidAtArgs = {
  id: Scalars['UUID']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateInvoicePaymentTermsArgs = {
  id: Scalars['UUID']['input'];
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateInvoiceQuoteIdArgs = {
  id: Scalars['UUID']['input'];
  quoteId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateInvoiceSentAtArgs = {
  id: Scalars['UUID']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateInvoiceStatusArgs = {
  id: Scalars['UUID']['input'];
  status: InvoiceStatusEnum;
};


export type BillingMutationsUpdateInvoiceSubtotalArgs = {
  id: Scalars['UUID']['input'];
  subtotal: Scalars['Float']['input'];
};


export type BillingMutationsUpdateInvoiceTaxAmountArgs = {
  id: Scalars['UUID']['input'];
  taxAmount: Scalars['Float']['input'];
};


export type BillingMutationsUpdateInvoiceTotalAmountArgs = {
  id: Scalars['UUID']['input'];
  totalAmount: Scalars['Float']['input'];
};


export type BillingMutationsUpdatePaymentAmountArgs = {
  amount: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentCurrencyArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentExchangeRateArgs = {
  exchangeRate?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentFeesArgs = {
  fees?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentGatewayReferenceArgs = {
  gatewayReference?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentInvoiceIdArgs = {
  id: Scalars['UUID']['input'];
  invoiceId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdatePaymentPaymentDateArgs = {
  id: Scalars['UUID']['input'];
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdatePaymentPaymentMethodArgs = {
  id: Scalars['UUID']['input'];
  paymentMethod: PaymentMethodEnum;
};


export type BillingMutationsUpdatePaymentProcessedAtArgs = {
  id: Scalars['UUID']['input'];
  processedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdatePaymentProcessedByUserIdArgs = {
  id: Scalars['UUID']['input'];
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdatePaymentStatusArgs = {
  id: Scalars['UUID']['input'];
  status: PaymentStatusEnum;
};


export type BillingMutationsUpdatePaymentTransactionIdArgs = {
  id: Scalars['UUID']['input'];
  transactionId?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateQuoteClientIdArgs = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateQuoteCreatedByUserIdArgs = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateQuoteDestinationDetailsArgs = {
  destinationDetails: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateQuoteExpiresAtArgs = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateQuoteHeightArgs = {
  height?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateQuoteLengthArgs = {
  id: Scalars['UUID']['input'];
  length?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateQuoteNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateQuoteOriginDetailsArgs = {
  id: Scalars['UUID']['input'];
  originDetails: Scalars['String']['input'];
};


export type BillingMutationsUpdateQuoteQuoteNumberArgs = {
  id: Scalars['UUID']['input'];
  quoteNumber?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateQuoteQuotedPriceArgs = {
  id: Scalars['UUID']['input'];
  quotedPrice: Scalars['Float']['input'];
};


export type BillingMutationsUpdateQuoteServiceLevelArgs = {
  id: Scalars['UUID']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateQuoteStatusArgs = {
  id: Scalars['UUID']['input'];
  status: QuoteStatusEnum;
};


export type BillingMutationsUpdateQuoteWeightArgs = {
  id: Scalars['UUID']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateQuoteWidthArgs = {
  id: Scalars['UUID']['input'];
  width?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateRateCardCreatedByUserIdArgs = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateRateCardDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateRateCardIsActiveArgs = {
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BillingMutationsUpdateRateCardNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type BillingMutationsUpdateRateCardServiceTypeArgs = {
  id: Scalars['UUID']['input'];
  serviceType: ServiceTypeEnum;
};


export type BillingMutationsUpdateRateCardValidFromArgs = {
  id: Scalars['UUID']['input'];
  validFrom: Scalars['NaiveDate']['input'];
};


export type BillingMutationsUpdateRateCardValidToArgs = {
  id: Scalars['UUID']['input'];
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};


export type BillingMutationsUpdateRateRuleConditionArgs = {
  condition: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateRateRuleIsActiveArgs = {
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BillingMutationsUpdateRateRuleMaxValueArgs = {
  id: Scalars['UUID']['input'];
  maxValue?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateRateRuleMinValueArgs = {
  id: Scalars['UUID']['input'];
  minValue?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateRateRulePriceArgs = {
  id: Scalars['UUID']['input'];
  price: Scalars['Float']['input'];
};


export type BillingMutationsUpdateRateRulePricingModelArgs = {
  id: Scalars['UUID']['input'];
  pricingModel: PricingModelEnum;
};


export type BillingMutationsUpdateRateRulePriorityArgs = {
  id: Scalars['UUID']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingMutationsUpdateRateRuleRateCardIdArgs = {
  id: Scalars['UUID']['input'];
  rateCardId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateRateRuleValueArgs = {
  id: Scalars['UUID']['input'];
  value: Scalars['String']['input'];
};


export type BillingMutationsUpdateSurchargeAmountArgs = {
  amount: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateSurchargeCalculationMethodArgs = {
  calculationMethod: SurchargeCalculationMethodEnum;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateSurchargeDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateSurchargeIsActiveArgs = {
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BillingMutationsUpdateSurchargeNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type BillingMutationsUpdateSurchargeTypeArgs = {
  id: Scalars['UUID']['input'];
  type: Scalars['String']['input'];
};


export type BillingMutationsUpdateSurchargeValidFromArgs = {
  id: Scalars['UUID']['input'];
  validFrom?: InputMaybe<Scalars['NaiveDate']['input']>;
};


export type BillingMutationsUpdateSurchargeValidToArgs = {
  id: Scalars['UUID']['input'];
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type BillingPayments = {
  __typename?: 'BillingPayments';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  exchangeRate?: Maybe<Scalars['Float']['output']>;
  fees?: Maybe<Scalars['Float']['output']>;
  gatewayReference?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoices;
  netAmount?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: PaymentMethodEnum;
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  processedByUser?: Maybe<AuthUser>;
  status?: Maybe<PaymentStatusEnum>;
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingQueries = {
  __typename?: 'BillingQueries';
  clientAccount?: Maybe<BillingClientAccounts>;
  clientAccounts: Array<BillingClientAccounts>;
  invoice?: Maybe<BillingInvoices>;
  invoices: Array<BillingInvoices>;
  quote?: Maybe<BillingQuotes>;
  quotes: Array<BillingQuotes>;
  rateCard?: Maybe<BillingRateCards>;
  rateCards: Array<BillingRateCards>;
  surcharge?: Maybe<BillingSurcharges>;
  surcharges: Array<BillingSurcharges>;
};


export type BillingQueriesClientAccountArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesClientAccountsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type BillingQueriesInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesInvoicesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type BillingQueriesQuoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesQuotesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type BillingQueriesRateCardArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesRateCardsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type BillingQueriesSurchargeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesSurchargesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type BillingQuotes = {
  __typename?: 'BillingQuotes';
  client?: Maybe<CrmCompanies>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUser?: Maybe<AuthUser>;
  destinationDetails: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  length?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  originDetails: Scalars['String']['output'];
  quoteNumber?: Maybe<Scalars['String']['output']>;
  quotedPrice: Scalars['Float']['output'];
  serviceLevel?: Maybe<Scalars['String']['output']>;
  status?: Maybe<QuoteStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type BillingRateCards = {
  __typename?: 'BillingRateCards';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUser?: Maybe<AuthUser>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  serviceType: ServiceTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  validFrom: Scalars['NaiveDate']['output'];
  validTo?: Maybe<Scalars['NaiveDate']['output']>;
};

export type BillingRateRules = {
  __typename?: 'BillingRateRules';
  condition: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  maxValue?: Maybe<Scalars['Float']['output']>;
  minValue?: Maybe<Scalars['Float']['output']>;
  price: Scalars['Float']['output'];
  pricingModel: PricingModelEnum;
  priority?: Maybe<Scalars['Int']['output']>;
  rateCard: BillingRateCards;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  value: Scalars['String']['output'];
};

export type BillingSurcharges = {
  __typename?: 'BillingSurcharges';
  amount: Scalars['Float']['output'];
  calculationMethod: SurchargeCalculationMethodEnum;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type CreateAccountTransactionInput = {
  amount: Scalars['Float']['input'];
  clientAccountId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
  runningBalance?: InputMaybe<Scalars['Float']['input']>;
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  transactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  type: TransactionTypeEnum;
};

export type CreateAccountingSyncLogInput = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  externalSystem: Scalars['String']['input'];
  lastSyncAt?: InputMaybe<Scalars['DateTime']['input']>;
  nextRetryAt?: InputMaybe<Scalars['DateTime']['input']>;
  recordId: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
  requestPayload?: InputMaybe<Scalars['String']['input']>;
  responsePayload?: InputMaybe<Scalars['String']['input']>;
  retryCount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<SyncStatusEnum>;
};

export type CreateBillingInvoiceInput = {
  amountPaid?: InputMaybe<Scalars['Float']['input']>;
  clientId: Scalars['UUID']['input'];
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  dueDate: Scalars['NaiveDate']['input'];
  invoiceNumber: Scalars['String']['input'];
  issueDate: Scalars['NaiveDate']['input'];
  items: Array<CreateBillingInvoiceLineItemInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['UUID']['input']>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<InvoiceStatusEnum>;
  subtotal?: InputMaybe<Scalars['Float']['input']>;
  taxAmount?: InputMaybe<Scalars['Float']['input']>;
  totalAmount: Scalars['Float']['input'];
};

export type CreateBillingInvoiceLineItemInput = {
  description: Scalars['String']['input'];
  discountRate?: InputMaybe<Scalars['Float']['input']>;
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Float']['input'];
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  taxRate?: InputMaybe<Scalars['Float']['input']>;
  unitPrice: Scalars['Float']['input'];
};

export type CreateBinThresholdInput = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationId: Scalars['UUID']['input'];
  maxQuantity: Scalars['Int']['input'];
  minQuantity: Scalars['Int']['input'];
  productId: Scalars['UUID']['input'];
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCampaignInput = {
  budget?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type CreateCarrierInput = {
  contactDetails?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rates: Array<CreateCarrierRateInput>;
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCarrierRateInput = {
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate: Scalars['Decimal']['input'];
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnitEnum>;
};

export type CreateCaseInput = {
  caseNumber: Scalars['String']['input'];
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type CreateClientAccountInput = {
  availableCredit?: InputMaybe<Scalars['Float']['input']>;
  clientId: Scalars['UUID']['input'];
  creditLimit?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
  walletBalance?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateCompanyInput = {
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

export type CreateContactInput = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  email: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCreditNoteInput = {
  amount: Scalars['Float']['input'];
  appliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  creditNoteNumber: Scalars['String']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  disputeId?: InputMaybe<Scalars['UUID']['input']>;
  invoiceId: Scalars['UUID']['input'];
  issueDate: Scalars['NaiveDate']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
};

export type CreateCrmInvoiceInput = {
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  items: Array<CreateCrmInvoiceItemInput>;
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  total?: InputMaybe<Scalars['Decimal']['input']>;
};

export type CreateCrmInvoiceItemInput = {
  price: Scalars['Decimal']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateCustomerTrackingLinkInput = {
  deliveryTaskId: Scalars['UUID']['input'];
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  trackingToken: Scalars['String']['input'];
};

export type CreateDeliveryRouteInput = {
  driverId: Scalars['UUID']['input'];
  estimatedDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  routeDate: Scalars['NaiveDate']['input'];
  status?: InputMaybe<DeliveryRouteStatusEnum>;
  totalDistanceKm?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateDeliveryTaskInput = {
  deliveryAddress: Scalars['String']['input'];
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryRouteId: Scalars['UUID']['input'];
  estimatedArrivalTime?: InputMaybe<Scalars['DateTime']['input']>;
  packageId: Scalars['UUID']['input'];
  recipientName?: InputMaybe<Scalars['String']['input']>;
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
  routeSequence: Scalars['Int']['input'];
};

export type CreateDisputeInput = {
  clientId: Scalars['UUID']['input'];
  disputedAmount?: InputMaybe<Scalars['Float']['input']>;
  lineItemId: Scalars['UUID']['input'];
  reason: Scalars['String']['input'];
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
  resolvedAt?: InputMaybe<Scalars['DateTime']['input']>;
  resolvedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<DisputeStatusEnum>;
  submittedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateDmsProofOfDeliveryInput = {
  deliveryTaskId: Scalars['UUID']['input'];
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  signatureData?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
  type: ProofOfDeliveryTypeEnum;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDocumentInput = {
  documentType: DocumentTypeEnum;
  fileName: Scalars['String']['input'];
  filePath: Scalars['String']['input'];
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
  uploadedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateDriverInput = {
  licenseExpiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  licenseNumber: Scalars['String']['input'];
  schedules: Array<CreateDriverScheduleInput>;
  status?: InputMaybe<DriverStatusEnum>;
  userId: Scalars['UUID']['input'];
};

export type CreateDriverLocationInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  driverId: Scalars['UUID']['input'];
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateDriverScheduleInput = {
  endDate: Scalars['NaiveDate']['input'];
  reason?: InputMaybe<DriverScheduleReasonEnum>;
  startDate: Scalars['NaiveDate']['input'];
};

export type CreateExpenseInput = {
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

export type CreateGeofenceEventInput = {
  eventType: GeofenceEventTypeEnum;
  geofenceId: Scalars['UUID']['input'];
  timestamp: Scalars['DateTime']['input'];
  vehicleId: Scalars['UUID']['input'];
};

export type CreateGeofenceInput = {
  coordinates?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateGpsPingInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  timestamp: Scalars['DateTime']['input'];
  vehicleId: Scalars['UUID']['input'];
};

export type CreateInteractionInput = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  contactId: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId: Scalars['UUID']['input'];
};

export type CreateInventoryStockInput = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  lastCountedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  locationId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
  reservedQuantity: Scalars['Int']['input'];
  status?: InputMaybe<InventoryStockStatusEnum>;
};

export type CreateLeadInput = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  convertedAt?: InputMaybe<Scalars['DateTime']['input']>;
  convertedCompanyId?: InputMaybe<Scalars['UUID']['input']>;
  convertedContactId?: InputMaybe<Scalars['UUID']['input']>;
  convertedOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  email: Scalars['String']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
  leadSource?: InputMaybe<LeadSource>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
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
  parentLocationId?: InputMaybe<Scalars['UUID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type: LocationTypeEnum;
  warehouseId: Scalars['UUID']['input'];
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

export type CreateOpportunityInput = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  dealValue?: InputMaybe<Scalars['Decimal']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lostReason?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
};

export type CreatePackageInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  insuranceValue?: InputMaybe<Scalars['Decimal']['input']>;
  isFragile?: InputMaybe<Scalars['Boolean']['input']>;
  isHazmat?: InputMaybe<Scalars['Boolean']['input']>;
  items: Array<CreatePackageItemInput>;
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
  warehouseId: Scalars['UUID']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type CreatePackageItemInput = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreatePartnerInvoiceInput = {
  carrierId: Scalars['UUID']['input'];
  invoiceDate: Scalars['NaiveDate']['input'];
  invoiceNumber: Scalars['String']['input'];
  items: Array<CreatePartnerInvoiceItemInput>;
  status?: InputMaybe<PartnerInvoiceStatusEnum>;
  totalAmount: Scalars['Decimal']['input'];
};

export type CreatePartnerInvoiceItemInput = {
  amount: Scalars['Decimal']['input'];
  shipmentLegId: Scalars['UUID']['input'];
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  exchangeRate?: InputMaybe<Scalars['Float']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  gatewayReference?: InputMaybe<Scalars['String']['input']>;
  invoiceId: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod: PaymentMethodEnum;
  processedAt?: InputMaybe<Scalars['DateTime']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<PaymentStatusEnum>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePickBatchInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['UUID']['input']>;
  batchNumber: Scalars['String']['input'];
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  items: Array<CreatePickBatchItemInput>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<PickBatchStatusEnum>;
  strategy: PickStrategyEnum;
  totalItems?: InputMaybe<Scalars['Int']['input']>;
  warehouseId: Scalars['UUID']['input'];
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreatePickBatchItemInput = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
  salesOrderId: Scalars['UUID']['input'];
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type CreatePutawayRuleInput = {
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

export type CreateQuoteInput = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  destinationDetails: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  originDetails: Scalars['String']['input'];
  quoteNumber?: InputMaybe<Scalars['String']['input']>;
  quotedPrice: Scalars['Float']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuoteStatusEnum>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateRateCardInput = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  serviceType: ServiceTypeEnum;
  validFrom: Scalars['NaiveDate']['input'];
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type CreateRateRuleInput = {
  condition: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxValue?: InputMaybe<Scalars['Float']['input']>;
  minValue?: InputMaybe<Scalars['Float']['input']>;
  price: Scalars['Float']['input'];
  pricingModel: PricingModelEnum;
  priority?: InputMaybe<Scalars['Int']['input']>;
  rateCardId: Scalars['UUID']['input'];
  value: Scalars['String']['input'];
};

export type CreateRouteInput = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId: Scalars['UUID']['input'];
};

export type CreateShipmentLegEventInput = {
  eventTimestamp: Scalars['DateTime']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type CreateShipmentLegInput = {
  carrierId?: InputMaybe<Scalars['UUID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  events: Array<CreateShipmentLegEventInput>;
  internalTripId?: InputMaybe<Scalars['UUID']['input']>;
  legSequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatusEnum>;
};

export type CreateSurchargeInput = {
  amount: Scalars['Float']['input'];
  calculationMethod: SurchargeCalculationMethodEnum;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  validFrom?: InputMaybe<Scalars['NaiveDate']['input']>;
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type CreateTaskEventInput = {
  deliveryTaskId: Scalars['UUID']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status: TaskEventStatusEnum;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateTaskInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  items: Array<CreateTaskItemInput>;
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

export type CreateTaskItemInput = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  destinationLocationId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['UUID']['input'];
  quantityCompleted: Scalars['Int']['input'];
  quantityRequired: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceLocationId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TaskItemStatusEnum>;
};

export type CreateTmsProofOfDeliveryInput = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp: Scalars['DateTime']['input'];
  tripStopId: Scalars['UUID']['input'];
  type?: InputMaybe<ProofTypeEnum>;
};

export type CreateTripInput = {
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStatusEnum>;
  stops: Array<CreateTripStopInput>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateTripStopInput = {
  actualArrivalTime?: InputMaybe<Scalars['DateTime']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['DateTime']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['DateTime']['input']>;
  sequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStopStatusEnum>;
};

export type CreateVehicleInput = {
  capacityVolume?: InputMaybe<Scalars['Float']['input']>;
  capacityWeight?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registrationNumber: Scalars['String']['input'];
  status?: InputMaybe<VehicleStatusEnum>;
};

export type CreateVehicleMaintenanceInput = {
  cost?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDate: Scalars['NaiveDate']['input'];
  serviceType?: InputMaybe<VehicleServiceTypeEnum>;
  vehicleId: Scalars['UUID']['input'];
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

export type CrmAttachments = {
  __typename?: 'CrmAttachments';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId?: Maybe<Scalars['UUID']['output']>;
  recordType?: Maybe<RecordType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCampaigns = {
  __typename?: 'CrmCampaigns';
  budget?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  startDate?: Maybe<Scalars['NaiveDate']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCases = {
  __typename?: 'CrmCases';
  caseNumber: Scalars['String']['output'];
  contact?: Maybe<CrmContacts>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  owner: AuthUser;
  priority?: Maybe<CasePriority>;
  status?: Maybe<CaseStatus>;
  type?: Maybe<CaseType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCompanies = {
  __typename?: 'CrmCompanies';
  annualRevenue?: Maybe<Scalars['Decimal']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<AuthUser>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type CrmContacts = {
  __typename?: 'CrmContacts';
  company?: Maybe<CrmCompanies>;
  companyId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInteractions = {
  __typename?: 'CrmInteractions';
  case?: Maybe<CrmCases>;
  contact: CrmContacts;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  interactionDate?: Maybe<Scalars['DateTime']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  type?: Maybe<InteractionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
};

export type CrmInvoiceItems = {
  __typename?: 'CrmInvoiceItems';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  invoice: CrmInvoices;
  price: Scalars['Decimal']['output'];
  product: CrmProducts;
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInvoices = {
  __typename?: 'CrmInvoices';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dueDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  issueDate?: Maybe<Scalars['NaiveDate']['output']>;
  items: Array<CrmInvoiceItems>;
  opportunity?: Maybe<CrmOpportunities>;
  opportunityId?: Maybe<Scalars['UUID']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<InvoiceStatus>;
  total?: Maybe<Scalars['Decimal']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CrmInvoicesItemsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmLeads = {
  __typename?: 'CrmLeads';
  campaign?: Maybe<CrmCampaigns>;
  convertedAt?: Maybe<Scalars['DateTime']['output']>;
  convertedContact?: Maybe<CrmContacts>;
  convertedOpportunity?: Maybe<CrmOpportunities>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  leadScore?: Maybe<Scalars['Int']['output']>;
  leadSource?: Maybe<LeadSource>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  status?: Maybe<LeadStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmMutations = {
  __typename?: 'CrmMutations';
  addInvoiceItem: CrmInvoices;
  createCampaign: CrmCampaigns;
  createCase: CrmCases;
  createCompany: CrmCompanies;
  createContact: CrmContacts;
  createInteraction: CrmInteractions;
  createInvoice: CrmInvoices;
  createLead: CrmLeads;
  createNotification: CrmNotifications;
  createOpportunity: CrmOpportunities;
  createProduct: CrmProducts;
  createTag: CrmTags;
  removeAttachment: Scalars['String']['output'];
  removeCampaign: Scalars['String']['output'];
  removeCase: Scalars['String']['output'];
  removeCompany: Scalars['String']['output'];
  removeContact: Scalars['String']['output'];
  removeInteraction: Scalars['String']['output'];
  removeInvoice: Scalars['String']['output'];
  removeInvoiceItem: CrmInvoices;
  removeLead: Scalars['String']['output'];
  removeNotification: Scalars['String']['output'];
  removeOpportunity: Scalars['String']['output'];
  removeProduct: Scalars['String']['output'];
  removeTag: Scalars['String']['output'];
  updateCampaignBudget: CrmCampaigns;
  updateCampaignEndDate: CrmCampaigns;
  updateCampaignName: CrmCampaigns;
  updateCampaignStartDate: CrmCampaigns;
  updateCaseContactId: CrmCases;
  updateCaseDescription: CrmCases;
  updateCaseNumber: CrmCases;
  updateCaseOwnerId: CrmCases;
  updateCasePriority: CrmCases;
  updateCaseStatus: CrmCases;
  updateCaseType: CrmCases;
  updateCompanyAnnualRevenue: CrmCompanies;
  updateCompanyCity: CrmCompanies;
  updateCompanyCountry: CrmCompanies;
  updateCompanyIndustry: CrmCompanies;
  updateCompanyName: CrmCompanies;
  updateCompanyOwnerId: CrmCompanies;
  updateCompanyPhoneNumber: CrmCompanies;
  updateCompanyPostalCode: CrmCompanies;
  updateCompanyState: CrmCompanies;
  updateCompanyStreet: CrmCompanies;
  updateCompanyWebsite: CrmCompanies;
  updateContactCompanyId: CrmContacts;
  updateContactEmail: CrmContacts;
  updateContactJobTitle: CrmContacts;
  updateContactName: CrmContacts;
  updateContactOwnerId: CrmContacts;
  updateContactPhoneNumber: CrmContacts;
  updateInteractionCaseId: CrmInteractions;
  updateInteractionContactId: CrmInteractions;
  updateInteractionInteractionDate: CrmInteractions;
  updateInteractionNotes: CrmInteractions;
  updateInteractionOutcome: CrmInteractions;
  updateInteractionType: CrmInteractions;
  updateInteractionUserId: CrmInteractions;
  updateInvoiceDueDate: CrmInvoices;
  updateInvoiceIssueDate: CrmInvoices;
  updateInvoiceOpportunityId: CrmInvoices;
  updateInvoicePaidAt: CrmInvoices;
  updateInvoicePaymentMethod: CrmInvoices;
  updateInvoiceSentAt: CrmInvoices;
  updateInvoiceStatus: CrmInvoices;
  updateInvoiceTotal: CrmInvoices;
  updateLeadCampaignId: CrmLeads;
  updateLeadConvertedAt: CrmLeads;
  updateLeadConvertedCompanyId: CrmLeads;
  updateLeadConvertedContactId: CrmLeads;
  updateLeadConvertedOpportunityId: CrmLeads;
  updateLeadEmail: CrmLeads;
  updateLeadLeadScore: CrmLeads;
  updateLeadLeadSource: CrmLeads;
  updateLeadName: CrmLeads;
  updateLeadOwnerId: CrmLeads;
  updateLeadStatus: CrmLeads;
  updateNotificationIsRead: CrmNotifications;
  updateNotificationLink: CrmNotifications;
  updateNotificationMessage: CrmNotifications;
  updateNotificationUserId: CrmNotifications;
  updateOpportunityCampaignId: CrmOpportunities;
  updateOpportunityCompanyId: CrmOpportunities;
  updateOpportunityContactId: CrmOpportunities;
  updateOpportunityDealValue: CrmOpportunities;
  updateOpportunityExpectedCloseDate: CrmOpportunities;
  updateOpportunityLostReason: CrmOpportunities;
  updateOpportunityName: CrmOpportunities;
  updateOpportunityOwnerId: CrmOpportunities;
  updateOpportunityProbability: CrmOpportunities;
  updateOpportunitySource: CrmOpportunities;
  updateOpportunityStage: CrmOpportunities;
  updateProductDescription: CrmProducts;
  updateProductName: CrmProducts;
  updateProductPrice: CrmProducts;
  updateProductSku: CrmProducts;
  updateProductType: CrmProducts;
  updateTagName: CrmTags;
  uploadAttachment: CrmAttachments;
};


export type CrmMutationsAddInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateCrmInvoiceItemInput;
};


export type CrmMutationsCreateCampaignArgs = {
  payload: CreateCampaignInput;
};


export type CrmMutationsCreateCaseArgs = {
  payload: CreateCaseInput;
};


export type CrmMutationsCreateCompanyArgs = {
  payload: CreateCompanyInput;
};


export type CrmMutationsCreateContactArgs = {
  payload: CreateContactInput;
};


export type CrmMutationsCreateInteractionArgs = {
  payload: CreateInteractionInput;
};


export type CrmMutationsCreateInvoiceArgs = {
  payload: CreateCrmInvoiceInput;
};


export type CrmMutationsCreateLeadArgs = {
  payload: CreateLeadInput;
};


export type CrmMutationsCreateNotificationArgs = {
  payload: CreateNotificationInput;
};


export type CrmMutationsCreateOpportunityArgs = {
  payload: CreateOpportunityInput;
};


export type CrmMutationsCreateProductArgs = {
  payload: CreateProductInput;
};


export type CrmMutationsCreateTagArgs = {
  payload: CreateTagInput;
};


export type CrmMutationsRemoveAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInvoiceItemArgs = {
  itemId: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveLeadArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveNotificationArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveOpportunityArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveProductArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveTagArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignBudgetArgs = {
  budget: Scalars['Decimal']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignEndDateArgs = {
  endDate: Scalars['NaiveDate']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateCampaignStartDateArgs = {
  id: Scalars['UUID']['input'];
  startDate: Scalars['NaiveDate']['input'];
};


export type CrmMutationsUpdateCaseContactIdArgs = {
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseNumberArgs = {
  caseNumber: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCasePriorityArgs = {
  id: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
};


export type CrmMutationsUpdateCaseStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<CaseStatus>;
};


export type CrmMutationsUpdateCaseTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<CaseType>;
};


export type CrmMutationsUpdateCompanyAnnualRevenueArgs = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyCityArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyCountryArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyIndustryArgs = {
  id: Scalars['UUID']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateCompanyOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
};


export type CrmMutationsUpdateCompanyPhoneNumberArgs = {
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyPostalCodeArgs = {
  id: Scalars['UUID']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyStateArgs = {
  id: Scalars['UUID']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyStreetArgs = {
  id: Scalars['UUID']['input'];
  street?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyWebsiteArgs = {
  id: Scalars['UUID']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateContactCompanyIdArgs = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactEmailArgs = {
  email: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactJobTitleArgs = {
  id: Scalars['UUID']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateContactNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateContactOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactPhoneNumberArgs = {
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionCaseIdArgs = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInteractionContactIdArgs = {
  contactId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInteractionInteractionDateArgs = {
  id: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInteractionNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionOutcomeArgs = {
  id: Scalars['UUID']['input'];
  outcome?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<InteractionType>;
};


export type CrmMutationsUpdateInteractionUserIdArgs = {
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInvoiceDueDateArgs = {
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInvoiceIssueDateArgs = {
  id: Scalars['UUID']['input'];
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};


export type CrmMutationsUpdateInvoiceOpportunityIdArgs = {
  id: Scalars['UUID']['input'];
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
};


export type CrmMutationsUpdateInvoicePaidAtArgs = {
  id: Scalars['UUID']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInvoicePaymentMethodArgs = {
  id: Scalars['UUID']['input'];
  paymentMethod?: InputMaybe<PaymentMethod>;
};


export type CrmMutationsUpdateInvoiceSentAtArgs = {
  id: Scalars['UUID']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInvoiceStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<InvoiceStatus>;
};


export type CrmMutationsUpdateInvoiceTotalArgs = {
  id: Scalars['UUID']['input'];
  total?: InputMaybe<Scalars['Decimal']['input']>;
};


export type CrmMutationsUpdateLeadCampaignIdArgs = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedAtArgs = {
  convertedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedCompanyIdArgs = {
  convertedCompanyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedContactIdArgs = {
  convertedContactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedOpportunityIdArgs = {
  convertedOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadEmailArgs = {
  email: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadLeadScoreArgs = {
  id: Scalars['UUID']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmMutationsUpdateLeadLeadSourceArgs = {
  id: Scalars['UUID']['input'];
  leadSource?: InputMaybe<LeadSource>;
};


export type CrmMutationsUpdateLeadNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateLeadOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<LeadStatus>;
};


export type CrmMutationsUpdateNotificationIsReadArgs = {
  id: Scalars['UUID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CrmMutationsUpdateNotificationLinkArgs = {
  id: Scalars['UUID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateNotificationMessageArgs = {
  id: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
};


export type CrmMutationsUpdateNotificationUserIdArgs = {
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityCampaignIdArgs = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityCompanyIdArgs = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityContactIdArgs = {
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityDealValueArgs = {
  dealValue?: InputMaybe<Scalars['Decimal']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityExpectedCloseDateArgs = {
  expectedCloseDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityLostReasonArgs = {
  id: Scalars['UUID']['input'];
  lostReason?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateOpportunityNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateOpportunityOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityProbabilityArgs = {
  id: Scalars['UUID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
};


export type CrmMutationsUpdateOpportunitySourceArgs = {
  id: Scalars['UUID']['input'];
  source?: InputMaybe<OpportunitySource>;
};


export type CrmMutationsUpdateOpportunityStageArgs = {
  id: Scalars['UUID']['input'];
  stage?: InputMaybe<OpportunityStage>;
};


export type CrmMutationsUpdateProductDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateProductNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateProductPriceArgs = {
  id: Scalars['UUID']['input'];
  price: Scalars['Decimal']['input'];
};


export type CrmMutationsUpdateProductSkuArgs = {
  id: Scalars['UUID']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateProductTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<ProductType>;
};


export type CrmMutationsUpdateTagNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUploadAttachmentArgs = {
  file: Scalars['Upload']['input'];
  recordId: Scalars['UUID']['input'];
  recordType: RecordType;
};

export type CrmNotifications = {
  __typename?: 'CrmNotifications';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isRead?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
};

export type CrmOpportunities = {
  __typename?: 'CrmOpportunities';
  campaign?: Maybe<CrmCampaigns>;
  company?: Maybe<CrmCompanies>;
  contact?: Maybe<CrmContacts>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dealValue?: Maybe<Scalars['Decimal']['output']>;
  expectedCloseDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lostReason?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  probability?: Maybe<Scalars['Float']['output']>;
  products: Array<CrmProducts>;
  source?: Maybe<OpportunitySource>;
  stage?: Maybe<OpportunityStage>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CrmOpportunitiesProductsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmProducts = {
  __typename?: 'CrmProducts';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmQueries = {
  __typename?: 'CrmQueries';
  attachment?: Maybe<CrmAttachments>;
  attachments: Array<CrmAttachments>;
  campaign?: Maybe<CrmCampaigns>;
  campaigns: Array<CrmCampaigns>;
  case?: Maybe<CrmCases>;
  cases: Array<CrmCases>;
  companies: Array<CrmCompanies>;
  company?: Maybe<CrmCompanies>;
  contact?: Maybe<CrmContacts>;
  contacts: Array<CrmContacts>;
  interaction?: Maybe<CrmInteractions>;
  interactions: Array<CrmInteractions>;
  invoice?: Maybe<CrmInvoices>;
  invoices: Array<CrmInvoices>;
  lead?: Maybe<CrmLeads>;
  leads: Array<CrmLeads>;
  notification?: Maybe<CrmNotifications>;
  notifications: Array<CrmNotifications>;
  opportunities: Array<CrmOpportunities>;
  opportunity?: Maybe<CrmOpportunities>;
  product?: Maybe<CrmProducts>;
  products: Array<CrmProducts>;
  tag?: Maybe<CrmTags>;
  tags: Array<CrmTags>;
};


export type CrmQueriesAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesAttachmentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCampaignsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCasesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCompaniesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesContactsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInteractionsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInvoicesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesLeadArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesLeadsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesNotificationArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesNotificationsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesOpportunitiesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesOpportunityArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesProductArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesProductsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesTagArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesTagsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmTags = {
  __typename?: 'CrmTags';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type DmsCustomerTrackingLinks = {
  __typename?: 'DmsCustomerTrackingLinks';
  accessCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryTask: DmsDeliveryTasks;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastAccessedAt?: Maybe<Scalars['DateTime']['output']>;
  trackingToken: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DmsDeliveryRoutes = {
  __typename?: 'DmsDeliveryRoutes';
  actualDurationMinutes?: Maybe<Scalars['Int']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driver: TmsDrivers;
  estimatedDurationMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  routeDate: Scalars['NaiveDate']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<DeliveryRouteStatusEnum>;
  totalDistanceKm?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DmsDeliveryTasks = {
  __typename?: 'DmsDeliveryTasks';
  actualArrivalTime?: Maybe<Scalars['DateTime']['output']>;
  attemptCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryAddress: Scalars['String']['output'];
  deliveryInstructions?: Maybe<Scalars['String']['output']>;
  deliveryRoute: DmsDeliveryRoutes;
  deliveryTime?: Maybe<Scalars['DateTime']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['DateTime']['output']>;
  failureReason?: Maybe<DeliveryFailureReasonEnum>;
  id: Scalars['UUID']['output'];
  package: WmsPackages;
  recipientName?: Maybe<Scalars['String']['output']>;
  recipientPhone?: Maybe<Scalars['String']['output']>;
  routeSequence: Scalars['Int']['output'];
  status?: Maybe<DeliveryTaskStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DmsDriverLocations = {
  __typename?: 'DmsDriverLocations';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driver: TmsDrivers;
  heading?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  speedKmh?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DmsMutations = {
  __typename?: 'DmsMutations';
  createCustomerTrackingLink: DmsCustomerTrackingLinks;
  createDeliveryRoute: DmsDeliveryRoutes;
  createDeliveryTask: DmsDeliveryTasks;
  createDriverLocation: DmsDriverLocations;
  createProofOfDelivery: DmsProofOfDeliveries;
  createTaskEvent: DmsTaskEvents;
  removeCustomerTrackingLink: Scalars['String']['output'];
  removeDeliveryRoute: Scalars['String']['output'];
  removeDeliveryTask: Scalars['String']['output'];
  removeDriverLocation: Scalars['String']['output'];
  removeProofOfDelivery: Scalars['String']['output'];
  removeTaskEvent: Scalars['String']['output'];
  updateCustomerTrackingLinkAccessCount: DmsCustomerTrackingLinks;
  updateCustomerTrackingLinkDeliveryTaskId: DmsCustomerTrackingLinks;
  updateCustomerTrackingLinkExpiresAt: DmsCustomerTrackingLinks;
  updateCustomerTrackingLinkIsActive: DmsCustomerTrackingLinks;
  updateCustomerTrackingLinkLastAccessedAt: DmsCustomerTrackingLinks;
  updateCustomerTrackingLinkTrackingToken: DmsCustomerTrackingLinks;
  updateDeliveryRouteActualDurationMinutes: DmsDeliveryRoutes;
  updateDeliveryRouteCompletedAt: DmsDeliveryRoutes;
  updateDeliveryRouteDriverId: DmsDeliveryRoutes;
  updateDeliveryRouteEstimatedDurationMinutes: DmsDeliveryRoutes;
  updateDeliveryRouteOptimizedRouteData: DmsDeliveryRoutes;
  updateDeliveryRouteRouteDate: DmsDeliveryRoutes;
  updateDeliveryRouteStartedAt: DmsDeliveryRoutes;
  updateDeliveryRouteStatus: DmsDeliveryRoutes;
  updateDeliveryRouteTotalDistanceKm: DmsDeliveryRoutes;
  updateDeliveryTaskActualArrivalTime: DmsDeliveryTasks;
  updateDeliveryTaskAttemptCount: DmsDeliveryTasks;
  updateDeliveryTaskDeliveryAddress: DmsDeliveryTasks;
  updateDeliveryTaskDeliveryInstructions: DmsDeliveryTasks;
  updateDeliveryTaskDeliveryRouteId: DmsDeliveryTasks;
  updateDeliveryTaskDeliveryTime: DmsDeliveryTasks;
  updateDeliveryTaskEstimatedArrivalTime: DmsDeliveryTasks;
  updateDeliveryTaskFailureReason: DmsDeliveryTasks;
  updateDeliveryTaskPackageId: DmsDeliveryTasks;
  updateDeliveryTaskRecipientName: DmsDeliveryTasks;
  updateDeliveryTaskRecipientPhone: DmsDeliveryTasks;
  updateDeliveryTaskRouteSequence: DmsDeliveryTasks;
  updateDeliveryTaskStatus: DmsDeliveryTasks;
  updateDriverLocationAccuracy: DmsDriverLocations;
  updateDriverLocationAltitude: DmsDriverLocations;
  updateDriverLocationDriverId: DmsDriverLocations;
  updateDriverLocationHeading: DmsDriverLocations;
  updateDriverLocationLatitude: DmsDriverLocations;
  updateDriverLocationLongitude: DmsDriverLocations;
  updateDriverLocationPosition: DmsDriverLocations;
  updateDriverLocationSpeedKmh: DmsDriverLocations;
  updateDriverLocationTimestamp: DmsDriverLocations;
  updateProofOfDeliveryDeliveryTaskId: DmsProofOfDeliveries;
  updateProofOfDeliveryFilePath: DmsProofOfDeliveries;
  updateProofOfDeliveryLatitude: DmsProofOfDeliveries;
  updateProofOfDeliveryLongitude: DmsProofOfDeliveries;
  updateProofOfDeliveryRecipientName: DmsProofOfDeliveries;
  updateProofOfDeliverySignatureData: DmsProofOfDeliveries;
  updateProofOfDeliveryTimestamp: DmsProofOfDeliveries;
  updateProofOfDeliveryType: DmsProofOfDeliveries;
  updateProofOfDeliveryVerificationCode: DmsProofOfDeliveries;
  updateTaskEventDeliveryTaskId: DmsTaskEvents;
  updateTaskEventLatitude: DmsTaskEvents;
  updateTaskEventLongitude: DmsTaskEvents;
  updateTaskEventNotes: DmsTaskEvents;
  updateTaskEventReason: DmsTaskEvents;
  updateTaskEventStatus: DmsTaskEvents;
  updateTaskEventTimestamp: DmsTaskEvents;
};


export type DmsMutationsCreateCustomerTrackingLinkArgs = {
  payload: CreateCustomerTrackingLinkInput;
};


export type DmsMutationsCreateDeliveryRouteArgs = {
  payload: CreateDeliveryRouteInput;
};


export type DmsMutationsCreateDeliveryTaskArgs = {
  payload: CreateDeliveryTaskInput;
};


export type DmsMutationsCreateDriverLocationArgs = {
  payload: CreateDriverLocationInput;
};


export type DmsMutationsCreateProofOfDeliveryArgs = {
  payload: CreateDmsProofOfDeliveryInput;
};


export type DmsMutationsCreateTaskEventArgs = {
  payload: CreateTaskEventInput;
};


export type DmsMutationsRemoveCustomerTrackingLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsRemoveDeliveryRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsRemoveDeliveryTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsRemoveDriverLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsRemoveProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsRemoveTaskEventArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateCustomerTrackingLinkAccessCountArgs = {
  accessCount?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateCustomerTrackingLinkDeliveryTaskIdArgs = {
  deliveryTaskId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateCustomerTrackingLinkExpiresAtArgs = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateCustomerTrackingLinkIsActiveArgs = {
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type DmsMutationsUpdateCustomerTrackingLinkLastAccessedAtArgs = {
  id: Scalars['UUID']['input'];
  lastAccessedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type DmsMutationsUpdateCustomerTrackingLinkTrackingTokenArgs = {
  id: Scalars['UUID']['input'];
  trackingToken: Scalars['String']['input'];
};


export type DmsMutationsUpdateDeliveryRouteActualDurationMinutesArgs = {
  actualDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryRouteCompletedAtArgs = {
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryRouteDriverIdArgs = {
  driverId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryRouteEstimatedDurationMinutesArgs = {
  estimatedDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryRouteOptimizedRouteDataArgs = {
  id: Scalars['UUID']['input'];
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateDeliveryRouteRouteDateArgs = {
  id: Scalars['UUID']['input'];
  routeDate: Scalars['NaiveDate']['input'];
};


export type DmsMutationsUpdateDeliveryRouteStartedAtArgs = {
  id: Scalars['UUID']['input'];
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type DmsMutationsUpdateDeliveryRouteStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<DeliveryRouteStatusEnum>;
};


export type DmsMutationsUpdateDeliveryRouteTotalDistanceKmArgs = {
  id: Scalars['UUID']['input'];
  totalDistanceKm?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateDeliveryTaskActualArrivalTimeArgs = {
  actualArrivalTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskAttemptCountArgs = {
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskDeliveryAddressArgs = {
  deliveryAddress: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskDeliveryInstructionsArgs = {
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskDeliveryRouteIdArgs = {
  deliveryRouteId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskDeliveryTimeArgs = {
  deliveryTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskEstimatedArrivalTimeArgs = {
  estimatedArrivalTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskFailureReasonArgs = {
  failureReason?: InputMaybe<DeliveryFailureReasonEnum>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskPackageIdArgs = {
  id: Scalars['UUID']['input'];
  packageId: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskRecipientNameArgs = {
  id: Scalars['UUID']['input'];
  recipientName?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateDeliveryTaskRecipientPhoneArgs = {
  id: Scalars['UUID']['input'];
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateDeliveryTaskRouteSequenceArgs = {
  id: Scalars['UUID']['input'];
  routeSequence: Scalars['Int']['input'];
};


export type DmsMutationsUpdateDeliveryTaskStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<DeliveryTaskStatusEnum>;
};


export type DmsMutationsUpdateDriverLocationAccuracyArgs = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDriverLocationAltitudeArgs = {
  altitude?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDriverLocationDriverIdArgs = {
  driverId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDriverLocationHeadingArgs = {
  heading?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDriverLocationLatitudeArgs = {
  id: Scalars['UUID']['input'];
  latitude: Scalars['Float']['input'];
};


export type DmsMutationsUpdateDriverLocationLongitudeArgs = {
  id: Scalars['UUID']['input'];
  longitude: Scalars['Float']['input'];
};


export type DmsMutationsUpdateDriverLocationPositionArgs = {
  altitude?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};


export type DmsMutationsUpdateDriverLocationSpeedKmhArgs = {
  id: Scalars['UUID']['input'];
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateDriverLocationTimestampArgs = {
  id: Scalars['UUID']['input'];
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};


export type DmsMutationsUpdateProofOfDeliveryDeliveryTaskIdArgs = {
  deliveryTaskId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateProofOfDeliveryFilePathArgs = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateProofOfDeliveryLatitudeArgs = {
  id: Scalars['UUID']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateProofOfDeliveryLongitudeArgs = {
  id: Scalars['UUID']['input'];
  longitude?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateProofOfDeliveryRecipientNameArgs = {
  id: Scalars['UUID']['input'];
  recipientName?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateProofOfDeliverySignatureDataArgs = {
  id: Scalars['UUID']['input'];
  signatureData?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateProofOfDeliveryTimestampArgs = {
  id: Scalars['UUID']['input'];
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};


export type DmsMutationsUpdateProofOfDeliveryTypeArgs = {
  id: Scalars['UUID']['input'];
  type: ProofOfDeliveryTypeEnum;
};


export type DmsMutationsUpdateProofOfDeliveryVerificationCodeArgs = {
  id: Scalars['UUID']['input'];
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateTaskEventDeliveryTaskIdArgs = {
  deliveryTaskId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateTaskEventLatitudeArgs = {
  id: Scalars['UUID']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateTaskEventLongitudeArgs = {
  id: Scalars['UUID']['input'];
  longitude?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateTaskEventNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateTaskEventReasonArgs = {
  id: Scalars['UUID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateTaskEventStatusArgs = {
  id: Scalars['UUID']['input'];
  status: TaskEventStatusEnum;
};


export type DmsMutationsUpdateTaskEventTimestampArgs = {
  id: Scalars['UUID']['input'];
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DmsProofOfDeliveries = {
  __typename?: 'DmsProofOfDeliveries';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryTask: DmsDeliveryTasks;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  recipientName?: Maybe<Scalars['String']['output']>;
  signatureData?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  type: ProofOfDeliveryTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  verificationCode?: Maybe<Scalars['String']['output']>;
};

export type DmsQueries = {
  __typename?: 'DmsQueries';
  customerTrackingLink?: Maybe<DmsCustomerTrackingLinks>;
  customerTrackingLinks: Array<DmsCustomerTrackingLinks>;
  deliveryRoute?: Maybe<DmsDeliveryRoutes>;
  deliveryRoutes: Array<DmsDeliveryRoutes>;
  deliveryTask?: Maybe<DmsDeliveryTasks>;
  deliveryTasks: Array<DmsDeliveryTasks>;
  driverLocation?: Maybe<DmsDriverLocations>;
  driverLocations: Array<DmsDriverLocations>;
  proofOfDeliveries: Array<DmsProofOfDeliveries>;
  proofOfDelivery?: Maybe<DmsProofOfDeliveries>;
  taskEvent?: Maybe<DmsTaskEvents>;
  taskEvents: Array<DmsTaskEvents>;
};


export type DmsQueriesCustomerTrackingLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesCustomerTrackingLinksArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type DmsQueriesDeliveryRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDeliveryRoutesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type DmsQueriesDeliveryTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDeliveryTasksArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type DmsQueriesDriverLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDriverLocationsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type DmsQueriesProofOfDeliveriesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type DmsQueriesProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesTaskEventArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesTaskEventsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type DmsTaskEvents = {
  __typename?: 'DmsTaskEvents';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryTask: DmsDeliveryTasks;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status: TaskEventStatusEnum;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type ImsInboundShipmentItems = {
  __typename?: 'ImsInboundShipmentItems';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  discrepancyNotes?: Maybe<Scalars['String']['output']>;
  discrepancyQuantity?: Maybe<Scalars['Int']['output']>;
  expectedQuantity: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  inboundShipment: ImsInboundShipments;
  product: ImsProducts;
  receivedQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsInboundShipments = {
  __typename?: 'ImsInboundShipments';
  actualArrivalDate?: Maybe<Scalars['NaiveDate']['output']>;
  client?: Maybe<CrmCompanies>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expectedArrivalDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  items: Array<ImsInboundShipmentItems>;
  status?: Maybe<InboundShipmentStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse: WmsWarehouses;
};

export type ImsInventoryAdjustments = {
  __typename?: 'ImsInventoryAdjustments';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  product: ImsProducts;
  quantityChange: Scalars['Int']['output'];
  reason?: Maybe<InventoryAdjustmentReasonEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
  warehouse: WmsWarehouses;
};

export type ImsInventoryBatches = {
  __typename?: 'ImsInventoryBatches';
  batchNumber: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expirationDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProducts;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsOutboundShipmentItems = {
  __typename?: 'ImsOutboundShipmentItems';
  batch?: Maybe<ImsInventoryBatches>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  outboundShipment: ImsOutboundShipments;
  product: ImsProducts;
  quantityShipped: Scalars['Int']['output'];
  salesOrderItem: ImsSalesOrderItems;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsOutboundShipments = {
  __typename?: 'ImsOutboundShipments';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  items: Array<ImsOutboundShipmentItems>;
  salesOrder: ImsSalesOrders;
  status?: Maybe<OutboundShipmentStatusEnum>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse: WmsWarehouses;
};

export type ImsProducts = {
  __typename?: 'ImsProducts';
  barcode?: Maybe<Scalars['String']['output']>;
  client?: Maybe<CrmCompanies>;
  costPrice?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  length?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  sku: Scalars['String']['output'];
  status?: Maybe<ProductStatusEnum>;
  supplier?: Maybe<ImsSuppliers>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type ImsReturns = {
  __typename?: 'ImsReturns';
  client: CrmCompanies;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  returnNumber: Scalars['String']['output'];
  salesOrder?: Maybe<ImsSalesOrders>;
  status?: Maybe<ReturnStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsSalesOrderItems = {
  __typename?: 'ImsSalesOrderItems';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProducts;
  quantityOrdered: Scalars['Int']['output'];
  salesOrder: ImsSalesOrders;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsSalesOrders = {
  __typename?: 'ImsSalesOrders';
  client: CrmCompanies;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  opportunities?: Maybe<CrmOpportunities>;
  orderNumber: Scalars['String']['output'];
  shippingAddress?: Maybe<Scalars['String']['output']>;
  status?: Maybe<SalesOrderStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsStockTransfer = {
  __typename?: 'ImsStockTransfer';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  destinationWarehouse: WmsWarehouses;
  id: Scalars['UUID']['output'];
  product: ImsProducts;
  quantity: Scalars['Int']['output'];
  sourceWarehouse: WmsWarehouses;
  status?: Maybe<StockTransferStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsSuppliers = {
  __typename?: 'ImsSuppliers';
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum InboundShipmentStatusEnum {
  Arrived = 'ARRIVED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

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

export type Model = {
  __typename?: 'Model';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  threshold: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutations = {
  __typename?: 'Mutations';
  auth: AuthMutation;
  billing: BillingMutations;
  crm: CrmMutations;
  dms: DmsMutations;
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

export type RefreshSessionResponse = {
  __typename?: 'RefreshSessionResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export enum ReturnStatusEnum {
  Approved = 'APPROVED',
  Processed = 'PROCESSED',
  Received = 'RECEIVED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export type RevokeSessionResponse = {
  __typename?: 'RevokeSessionResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

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

export type SignInEmailInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type SignUpEmailInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
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

export type TmsCarrierRates = {
  __typename?: 'TmsCarrierRates';
  carrier: TmsCarriers;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  destination?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  rate: Scalars['Decimal']['output'];
  serviceType?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<CarrierRateUnitEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsCarriers = {
  __typename?: 'TmsCarriers';
  contactDetails?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  rates: Array<TmsCarrierRates>;
  servicesOffered?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type TmsCarriersRatesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type TmsDriverSchedules = {
  __typename?: 'TmsDriverSchedules';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driver: TmsDrivers;
  endDate: Scalars['NaiveDate']['output'];
  id: Scalars['UUID']['output'];
  reason?: Maybe<DriverScheduleReasonEnum>;
  startDate: Scalars['NaiveDate']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsDrivers = {
  __typename?: 'TmsDrivers';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  licenseExpiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  licenseNumber: Scalars['String']['output'];
  status?: Maybe<DriverStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsExpenses = {
  __typename?: 'TmsExpenses';
  amount: Scalars['Decimal']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<CurrencyEnum>;
  fuelQuantity?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  odometerReading?: Maybe<Scalars['Int']['output']>;
  receiptUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ExpenseStatusEnum>;
  type?: Maybe<ExpenseTypeEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsGeofence = {
  __typename?: 'TmsGeofence';
  coordinates?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  events: Array<TmsGeofenceEvent>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type TmsGeofenceEventsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type TmsGeofenceEvent = {
  __typename?: 'TmsGeofenceEvent';
  eventType: GeofenceEventTypeEnum;
  id: Scalars['UUID']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type TmsGpsPings = {
  __typename?: 'TmsGpsPings';
  id: Scalars['UUID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type TmsMutations = {
  __typename?: 'TmsMutations';
  addCarrierRate: TmsCarriers;
  addDriverSchedule: TmsDrivers;
  addPartnerInvoiceItem: TmsPartnerInvoices;
  addShipmentLegEvent: TmsShipmentLegs;
  addTripStop: TmsTrips;
  createCarrier: TmsCarriers;
  createDriver: TmsDrivers;
  createExpense: TmsExpenses;
  createGeofence: TmsGeofence;
  createGeofenceEvent: TmsGeofenceEvent;
  createGpsPing: TmsGpsPings;
  createPartnerInvoice: TmsPartnerInvoices;
  createProofOfDelivery: TmsProofOfDeliveries;
  createRoute: TmsRoutes;
  createShipmentLeg: TmsShipmentLegs;
  createTrip: TmsTrips;
  createVehicle: TmsVehicles;
  createVehicleMaintenance: TmsVehicleMaintenance;
  removeCarrier: Scalars['String']['output'];
  removeCarrierRate: Scalars['String']['output'];
  removeDriver: Scalars['String']['output'];
  removeDriverSchedule: Scalars['String']['output'];
  removeExpense: Scalars['String']['output'];
  removeGeofence: Scalars['String']['output'];
  removeGeofenceEvent: Scalars['String']['output'];
  removeGpsPing: Scalars['String']['output'];
  removePartnerInvoice: Scalars['String']['output'];
  removePartnerInvoiceItem: Scalars['String']['output'];
  removeProofOfDelivery: Scalars['String']['output'];
  removeRoute: Scalars['String']['output'];
  removeShipmentLeg: Scalars['String']['output'];
  removeShipmentLegEvent: Scalars['String']['output'];
  removeTrip: Scalars['String']['output'];
  removeTripStop: Scalars['String']['output'];
  removeVehicle: Scalars['String']['output'];
  removeVehicleMaintenance: Scalars['String']['output'];
  updateCarrierContactDetails: TmsCarriers;
  updateCarrierName: TmsCarriers;
  updateCarrierRate: TmsCarrierRates;
  updateCarrierServicesOffered: TmsCarriers;
  updateDriverLicenseExpiryDate: TmsDrivers;
  updateDriverLicenseNumber: TmsDrivers;
  updateDriverSchedule: TmsDriverSchedules;
  updateDriverStatus: TmsDrivers;
  updateExpense: TmsExpenses;
  updateGeofence: TmsGeofence;
  updatePartnerInvoice: TmsPartnerInvoices;
  updatePartnerInvoiceItem: TmsPartnerInvoiceItems;
  updateProofOfDelivery: TmsProofOfDeliveries;
  updateRoute: TmsRoutes;
  updateShipmentLeg: TmsShipmentLegs;
  updateShipmentLegEvent: TmsShipmentLegEvents;
  updateTrip: TmsTrips;
  updateTripStop: TmsTripStops;
  updateVehicle: TmsVehicles;
  updateVehicleMaintenance: TmsVehicleMaintenance;
};


export type TmsMutationsAddCarrierRateArgs = {
  carrierId: Scalars['UUID']['input'];
  payload: CreateCarrierRateInput;
};


export type TmsMutationsAddDriverScheduleArgs = {
  driverId: Scalars['UUID']['input'];
  payload: CreateDriverScheduleInput;
};


export type TmsMutationsAddPartnerInvoiceItemArgs = {
  partnerInvoiceId: Scalars['UUID']['input'];
  payload: CreatePartnerInvoiceItemInput;
};


export type TmsMutationsAddShipmentLegEventArgs = {
  payload: CreateShipmentLegEventInput;
  shipmentLegId: Scalars['UUID']['input'];
};


export type TmsMutationsAddTripStopArgs = {
  payload: CreateTripStopInput;
  tripId: Scalars['UUID']['input'];
};


export type TmsMutationsCreateCarrierArgs = {
  payload: CreateCarrierInput;
};


export type TmsMutationsCreateDriverArgs = {
  payload: CreateDriverInput;
};


export type TmsMutationsCreateExpenseArgs = {
  payload: CreateExpenseInput;
};


export type TmsMutationsCreateGeofenceArgs = {
  payload: CreateGeofenceInput;
};


export type TmsMutationsCreateGeofenceEventArgs = {
  payload: CreateGeofenceEventInput;
};


export type TmsMutationsCreateGpsPingArgs = {
  payload: CreateGpsPingInput;
};


export type TmsMutationsCreatePartnerInvoiceArgs = {
  payload: CreatePartnerInvoiceInput;
};


export type TmsMutationsCreateProofOfDeliveryArgs = {
  payload: CreateTmsProofOfDeliveryInput;
};


export type TmsMutationsCreateRouteArgs = {
  payload: CreateRouteInput;
};


export type TmsMutationsCreateShipmentLegArgs = {
  payload: CreateShipmentLegInput;
};


export type TmsMutationsCreateTripArgs = {
  payload: CreateTripInput;
};


export type TmsMutationsCreateVehicleArgs = {
  payload: CreateVehicleInput;
};


export type TmsMutationsCreateVehicleMaintenanceArgs = {
  payload: CreateVehicleMaintenanceInput;
};


export type TmsMutationsRemoveCarrierArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveCarrierRateArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveDriverArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveDriverScheduleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveExpenseArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveGeofenceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveGeofenceEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveGpsPingArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemovePartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemovePartnerInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveShipmentLegArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveShipmentLegEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveTripArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveTripStopArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveVehicleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveVehicleMaintenanceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsUpdateCarrierContactDetailsArgs = {
  contactDetails: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type TmsMutationsUpdateCarrierNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type TmsMutationsUpdateCarrierRateArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateCarrierRateInput;
};


export type TmsMutationsUpdateCarrierServicesOfferedArgs = {
  id: Scalars['UUID']['input'];
  servicesOffered: Scalars['String']['input'];
};


export type TmsMutationsUpdateDriverLicenseExpiryDateArgs = {
  id: Scalars['UUID']['input'];
  licenseExpiryDate: Scalars['NaiveDate']['input'];
};


export type TmsMutationsUpdateDriverLicenseNumberArgs = {
  id: Scalars['UUID']['input'];
  licenseNumber: Scalars['String']['input'];
};


export type TmsMutationsUpdateDriverScheduleArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateDriverScheduleInput;
};


export type TmsMutationsUpdateDriverStatusArgs = {
  id: Scalars['UUID']['input'];
  status: DriverStatusEnum;
};


export type TmsMutationsUpdateExpenseArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateExpenseInput;
};


export type TmsMutationsUpdateGeofenceArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateGeofenceInput;
};


export type TmsMutationsUpdatePartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
  payload: CreatePartnerInvoiceInput;
};


export type TmsMutationsUpdatePartnerInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
  payload: CreatePartnerInvoiceItemInput;
};


export type TmsMutationsUpdateProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateTmsProofOfDeliveryInput;
};


export type TmsMutationsUpdateRouteArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateRouteInput;
};


export type TmsMutationsUpdateShipmentLegArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateShipmentLegInput;
};


export type TmsMutationsUpdateShipmentLegEventArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateShipmentLegEventInput;
};


export type TmsMutationsUpdateTripArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateTripInput;
};


export type TmsMutationsUpdateTripStopArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateTripStopInput;
};


export type TmsMutationsUpdateVehicleArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateVehicleInput;
};


export type TmsMutationsUpdateVehicleMaintenanceArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateVehicleMaintenanceInput;
};

export type TmsPartnerInvoiceItems = {
  __typename?: 'TmsPartnerInvoiceItems';
  amount: Scalars['Decimal']['output'];
  id: Scalars['UUID']['output'];
};

export type TmsPartnerInvoices = {
  __typename?: 'TmsPartnerInvoices';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  invoiceDate: Scalars['NaiveDate']['output'];
  invoiceNumber: Scalars['String']['output'];
  status?: Maybe<PartnerInvoiceStatusEnum>;
  totalAmount: Scalars['Decimal']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsProofOfDeliveries = {
  __typename?: 'TmsProofOfDeliveries';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp: Scalars['DateTime']['output'];
  type?: Maybe<ProofTypeEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsQueries = {
  __typename?: 'TmsQueries';
  carrier?: Maybe<TmsCarriers>;
  carriers: Array<TmsCarriers>;
  driver?: Maybe<TmsDrivers>;
  drivers: Array<TmsDrivers>;
  expense?: Maybe<TmsExpenses>;
  expenses: Array<TmsExpenses>;
  geofence?: Maybe<TmsGeofence>;
  geofences: Array<TmsGeofence>;
  gpsPing?: Maybe<TmsGpsPings>;
  gpsPings: Array<TmsGpsPings>;
  partnerInvoice?: Maybe<TmsPartnerInvoices>;
  partnerInvoices: Array<TmsPartnerInvoices>;
  proofOfDeliveries: Array<TmsProofOfDeliveries>;
  proofOfDelivery?: Maybe<TmsProofOfDeliveries>;
  route?: Maybe<TmsRoutes>;
  routes: Array<TmsRoutes>;
  shipmentLeg?: Maybe<TmsShipmentLegs>;
  shipmentLegs: Array<TmsShipmentLegs>;
  trip?: Maybe<TmsTrips>;
  trips: Array<TmsTrips>;
  vehicle?: Maybe<TmsVehicles>;
  vehicles: Array<TmsVehicles>;
};


export type TmsQueriesCarrierArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesCarriersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesDriverArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesDriversArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesExpenseArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesExpensesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesGeofenceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesGeofencesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesGpsPingArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesGpsPingsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesPartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesPartnerInvoicesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesProofOfDeliveriesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesRoutesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesShipmentLegArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesShipmentLegsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesTripArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesTripsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesVehicleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesVehiclesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type TmsRoutes = {
  __typename?: 'TmsRoutes';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  totalDistance?: Maybe<Scalars['Float']['output']>;
  totalDuration?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsShipmentLegEvents = {
  __typename?: 'TmsShipmentLegEvents';
  eventTimestamp: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  statusMessage?: Maybe<Scalars['String']['output']>;
};

export type TmsShipmentLegs = {
  __typename?: 'TmsShipmentLegs';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endLocation?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  legSequence: Scalars['Int']['output'];
  shipmentId?: Maybe<Scalars['UUID']['output']>;
  startLocation?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShipmentLegStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsTripStops = {
  __typename?: 'TmsTripStops';
  actualArrivalTime?: Maybe<Scalars['DateTime']['output']>;
  actualDepartureTime?: Maybe<Scalars['DateTime']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['DateTime']['output']>;
  estimatedDepartureTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  sequence: Scalars['Int']['output'];
  shipmentId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<TripStopStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsTrips = {
  __typename?: 'TmsTrips';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  status?: Maybe<TripStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsVehicleMaintenance = {
  __typename?: 'TmsVehicleMaintenance';
  cost?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  serviceDate: Scalars['NaiveDate']['output'];
  serviceType?: Maybe<VehicleServiceTypeEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsVehicles = {
  __typename?: 'TmsVehicles';
  capacityVolume?: Maybe<Scalars['Float']['output']>;
  capacityWeight?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  model?: Maybe<Scalars['String']['output']>;
  registrationNumber: Scalars['String']['output'];
  status?: Maybe<VehicleStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type WmsBinThresholds = {
  __typename?: 'WmsBinThresholds';
  alertThreshold?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  location: WmsLocations;
  maxQuantity: Scalars['Int']['output'];
  minQuantity: Scalars['Int']['output'];
  product: ImsProducts;
  reorderQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WmsInventoryStock = {
  __typename?: 'WmsInventoryStock';
  availableQuantity?: Maybe<Scalars['Int']['output']>;
  batch?: Maybe<ImsInventoryBatches>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  lastCountedAt?: Maybe<Scalars['DateTime']['output']>;
  lastMovementAt?: Maybe<Scalars['DateTime']['output']>;
  location: WmsLocations;
  product: ImsProducts;
  quantity: Scalars['Int']['output'];
  reservedQuantity: Scalars['Int']['output'];
  status?: Maybe<InventoryStockStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WmsLocations = {
  __typename?: 'WmsLocations';
  barcode?: Maybe<Scalars['String']['output']>;
  childrenLocations: Array<WmsLocations>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
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
  parentLocation?: Maybe<WmsLocations>;
  path?: Maybe<Scalars['String']['output']>;
  temperatureControlled?: Maybe<Scalars['Boolean']['output']>;
  type: LocationTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse: WmsWarehouses;
  xCoordinate?: Maybe<Scalars['Float']['output']>;
  yCoordinate?: Maybe<Scalars['Float']['output']>;
  zCoordinate?: Maybe<Scalars['Float']['output']>;
};

export type WmsMutations = {
  __typename?: 'WmsMutations';
  addPackageItem: WmsPackageItems;
  addPickBatchItem: WmsPickBatchItems;
  addTaskItem: WmsTaskItems;
  createBinThreshold: WmsBinThresholds;
  createInventoryStock: WmsInventoryStock;
  createLocation: WmsLocations;
  createPackage: WmsPackages;
  createPickBatch: WmsPickBatches;
  createPutawayRule: WmsPutawayRules;
  createTask: WmsTasks;
  createWarehouse: WmsWarehouses;
  removeBinThreshold: Scalars['String']['output'];
  removeInventoryStock: Scalars['String']['output'];
  removeLocation: Scalars['String']['output'];
  removePackage: Scalars['String']['output'];
  removePackageItem: Scalars['String']['output'];
  removePickBatch: Scalars['String']['output'];
  removePickBatchItem: Scalars['String']['output'];
  removePutawayRule: Scalars['String']['output'];
  removeTask: Scalars['String']['output'];
  removeTaskItem: Scalars['String']['output'];
  removeWarehouse: Scalars['String']['output'];
  updateBinThresholdMinQuantity: WmsBinThresholds;
  updateInventoryStockQuantity: WmsInventoryStock;
  updateLocationName: WmsLocations;
  updatePackageItemQuantity: WmsPackageItems;
  updatePackageTrackingNumber: WmsPackages;
  updatePickBatchItemPriority: WmsPickBatchItems;
  updatePickBatchStatus: WmsPickBatches;
  updatePutawayRulePriority: WmsPutawayRules;
  updateTaskItemStatus: WmsTaskItems;
  updateTaskStatus: WmsTasks;
  updateWarehouseName: WmsWarehouses;
};


export type WmsMutationsAddPackageItemArgs = {
  packageId: Scalars['UUID']['input'];
  payload: CreatePackageItemInput;
};


export type WmsMutationsAddPickBatchItemArgs = {
  payload: CreatePickBatchItemInput;
  pickBatchId: Scalars['UUID']['input'];
};


export type WmsMutationsAddTaskItemArgs = {
  payload: CreateTaskItemInput;
  taskId: Scalars['UUID']['input'];
};


export type WmsMutationsCreateBinThresholdArgs = {
  payload: CreateBinThresholdInput;
};


export type WmsMutationsCreateInventoryStockArgs = {
  payload: CreateInventoryStockInput;
};


export type WmsMutationsCreateLocationArgs = {
  payload: CreateLocationInput;
};


export type WmsMutationsCreatePackageArgs = {
  payload: CreatePackageInput;
};


export type WmsMutationsCreatePickBatchArgs = {
  payload: CreatePickBatchInput;
};


export type WmsMutationsCreatePutawayRuleArgs = {
  payload: CreatePutawayRuleInput;
};


export type WmsMutationsCreateTaskArgs = {
  payload: CreateTaskInput;
};


export type WmsMutationsCreateWarehouseArgs = {
  payload: CreateWarehouseInput;
};


export type WmsMutationsRemoveBinThresholdArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemoveInventoryStockArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemoveLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemovePackageArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemovePackageItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemovePickBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemovePickBatchItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemovePutawayRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemoveTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemoveTaskItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemoveWarehouseArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsUpdateBinThresholdMinQuantityArgs = {
  id: Scalars['UUID']['input'];
  minQuantity: Scalars['Int']['input'];
};


export type WmsMutationsUpdateInventoryStockQuantityArgs = {
  id: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};


export type WmsMutationsUpdateLocationNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type WmsMutationsUpdatePackageItemQuantityArgs = {
  id: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};


export type WmsMutationsUpdatePackageTrackingNumberArgs = {
  id: Scalars['UUID']['input'];
  trackingNumber: Scalars['String']['input'];
};


export type WmsMutationsUpdatePickBatchItemPriorityArgs = {
  id: Scalars['UUID']['input'];
  orderPriority: Scalars['Int']['input'];
};


export type WmsMutationsUpdatePickBatchStatusArgs = {
  id: Scalars['UUID']['input'];
  status: PickBatchStatusEnum;
};


export type WmsMutationsUpdatePutawayRulePriorityArgs = {
  id: Scalars['UUID']['input'];
  priority: Scalars['Int']['input'];
};


export type WmsMutationsUpdateTaskItemStatusArgs = {
  id: Scalars['UUID']['input'];
  status: TaskItemStatusEnum;
};


export type WmsMutationsUpdateTaskStatusArgs = {
  id: Scalars['UUID']['input'];
  status: TaskStatusEnum;
};


export type WmsMutationsUpdateWarehouseNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type WmsPackageItems = {
  __typename?: 'WmsPackageItems';
  batch?: Maybe<ImsInventoryBatches>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  package: WmsPackages;
  product: ImsProducts;
  quantity: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Scalars['String']['output']>>;
  totalWeight?: Maybe<Scalars['Float']['output']>;
  unitWeight?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WmsPackages = {
  __typename?: 'WmsPackages';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  insuranceValue?: Maybe<Scalars['Decimal']['output']>;
  isFragile?: Maybe<Scalars['Boolean']['output']>;
  isHazmat?: Maybe<Scalars['Boolean']['output']>;
  items: Array<WmsPackageItems>;
  length?: Maybe<Scalars['Float']['output']>;
  packageNumber: Scalars['String']['output'];
  packageType?: Maybe<Scalars['String']['output']>;
  packedAt?: Maybe<Scalars['DateTime']['output']>;
  packedByUser?: Maybe<AuthUser>;
  requiresSignature?: Maybe<Scalars['Boolean']['output']>;
  salesOrder: ImsSalesOrders;
  serviceLevel?: Maybe<Scalars['String']['output']>;
  shippedAt?: Maybe<Scalars['DateTime']['output']>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  warehouse: WmsWarehouses;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type WmsPickBatchItems = {
  __typename?: 'WmsPickBatchItems';
  actualPickTime?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  estimatedPickTime?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  orderPriority?: Maybe<Scalars['Int']['output']>;
  pickBatch: WmsPickBatches;
  salesOrder: ImsSalesOrders;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WmsPickBatches = {
  __typename?: 'WmsPickBatches';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  assignedUser?: Maybe<AuthUser>;
  batchNumber: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  completedItems?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  items: Array<WmsPickBatchItems>;
  priority?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<PickBatchStatusEnum>;
  strategy: PickStrategyEnum;
  totalItems?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse: WmsWarehouses;
  waveId?: Maybe<Scalars['String']['output']>;
  zoneRestrictions?: Maybe<Array<Scalars['String']['output']>>;
};

export type WmsPutawayRules = {
  __typename?: 'WmsPutawayRules';
  client?: Maybe<CrmCompanies>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locationType?: Maybe<LocationTypeEnum>;
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  minQuantity?: Maybe<Scalars['Int']['output']>;
  preferredLocation?: Maybe<WmsLocations>;
  priority: Scalars['Int']['output'];
  product: ImsProducts;
  requiresHazmatApproval?: Maybe<Scalars['Boolean']['output']>;
  requiresTemperatureControl?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  volumeThreshold?: Maybe<Scalars['Float']['output']>;
  warehouse: WmsWarehouses;
  weightThreshold?: Maybe<Scalars['Float']['output']>;
};

export type WmsQueries = {
  __typename?: 'WmsQueries';
  binThreshold?: Maybe<WmsBinThresholds>;
  binThresholds: Array<WmsBinThresholds>;
  inboundShipment?: Maybe<ImsInboundShipments>;
  inboundShipments: Array<ImsInboundShipments>;
  inventoryAdjustment?: Maybe<ImsInventoryAdjustments>;
  inventoryAdjustments: Array<ImsInventoryAdjustments>;
  inventoryBatch?: Maybe<ImsInventoryBatches>;
  inventoryBatches: Array<ImsInventoryBatches>;
  inventoryStock: Array<WmsInventoryStock>;
  inventoryStockItem?: Maybe<WmsInventoryStock>;
  location?: Maybe<WmsLocations>;
  locations: Array<WmsLocations>;
  outboundShipment?: Maybe<ImsOutboundShipments>;
  outboundShipments: Array<ImsOutboundShipments>;
  package?: Maybe<WmsPackages>;
  packages: Array<WmsPackages>;
  pickBatch?: Maybe<WmsPickBatches>;
  pickBatches: Array<WmsPickBatches>;
  product?: Maybe<ImsProducts>;
  products: Array<ImsProducts>;
  putawayRule?: Maybe<WmsPutawayRules>;
  putawayRules: Array<WmsPutawayRules>;
  reorderPoint?: Maybe<Model>;
  reorderPoints: Array<Model>;
  returnItem?: Maybe<ImsReturns>;
  returns: Array<ImsReturns>;
  salesOrder?: Maybe<ImsSalesOrders>;
  salesOrders: Array<ImsSalesOrders>;
  stockTransfer?: Maybe<ImsStockTransfer>;
  stockTransfers: Array<ImsStockTransfer>;
  supplier?: Maybe<ImsSuppliers>;
  suppliers: Array<ImsSuppliers>;
  task?: Maybe<WmsTasks>;
  tasks: Array<WmsTasks>;
  warehouse?: Maybe<WmsWarehouses>;
  warehouses: Array<WmsWarehouses>;
};


export type WmsQueriesBinThresholdArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesBinThresholdsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesInboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesInboundShipmentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesInventoryAdjustmentArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesInventoryAdjustmentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesInventoryBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesInventoryBatchesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesInventoryStockArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesInventoryStockItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesLocationsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesOutboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesOutboundShipmentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesPackageArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPackagesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesPickBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPickBatchesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesProductArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesProductsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesPutawayRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPutawayRulesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesReorderPointArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesReorderPointsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesReturnItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesReturnsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesSalesOrderArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesSalesOrdersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesStockTransferArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesStockTransfersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesSupplierArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesSuppliersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesTasksArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesWarehouseArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesWarehousesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type WmsTaskItems = {
  __typename?: 'WmsTaskItems';
  batch?: Maybe<ImsInventoryBatches>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  destinationLocation?: Maybe<WmsLocations>;
  expiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  product: ImsProducts;
  quantityCompleted: Scalars['Int']['output'];
  quantityRemaining?: Maybe<Scalars['Int']['output']>;
  quantityRequired: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Scalars['String']['output']>>;
  sourceLocation?: Maybe<WmsLocations>;
  status?: Maybe<TaskItemStatusEnum>;
  task: WmsTasks;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WmsTasks = {
  __typename?: 'WmsTasks';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  durationSeconds?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  items: Array<WmsTaskItems>;
  notes?: Maybe<Scalars['String']['output']>;
  pickBatch?: Maybe<WmsPickBatches>;
  priority?: Maybe<Scalars['Int']['output']>;
  sourceEntityId?: Maybe<Scalars['UUID']['output']>;
  sourceEntityType?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<TaskStatusEnum>;
  taskNumber: Scalars['String']['output'];
  type: TaskTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<AuthUser>;
  warehouse: WmsWarehouses;
};

export type WmsWarehouses = {
  __typename?: 'WmsWarehouses';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locations: Array<WmsLocations>;
  name: Scalars['String']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SignUpEmailMutationVariables = Exact<{
  payload: SignUpEmailInput;
}>;


export type SignUpEmailMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', signUpEmail: { __typename?: 'SignUpResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type SignInEmailMutationVariables = Exact<{
  payload: SignInEmailInput;
}>;


export type SignInEmailMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', signInEmail: { __typename?: 'SignInResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type RevokeSessionMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RevokeSessionMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', revokeSession: { __typename?: 'RevokeSessionResponse', message: string, success: boolean } } };

export type RefreshSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshSessionMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', refreshSession: { __typename?: 'RefreshSessionResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', changePassword: string } };

export type UploadAttachmentMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  recordId: Scalars['UUID']['input'];
  recordType: RecordType;
}>;


export type UploadAttachmentMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', uploadAttachment: { __typename?: 'CrmAttachments', id: any, fileName: string, filePath: string, mimeType?: string | null, recordId?: any | null, recordType?: RecordType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type RemoveAttachmentMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveAttachmentMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeAttachment: string } };

export type CreateCampaignMutationVariables = Exact<{
  payload: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCampaign: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateCampaignNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateCampaignNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCampaignName: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateCampaignBudgetMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  budget: Scalars['Decimal']['input'];
}>;


export type UpdateCampaignBudgetMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCampaignBudget: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateCampaignStartDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  startDate: Scalars['NaiveDate']['input'];
}>;


export type UpdateCampaignStartDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCampaignStartDate: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateCampaignEndDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  endDate: Scalars['NaiveDate']['input'];
}>;


export type UpdateCampaignEndDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCampaignEndDate: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type RemoveCampaignMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCampaignMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCampaign: string } };

export type CreateCaseMutationVariables = Exact<{
  payload: CreateCaseInput;
}>;


export type CreateCaseMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCase: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseNumberMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  caseNumber: Scalars['String']['input'];
}>;


export type UpdateCaseNumberMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseNumber: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseStatusMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  status?: InputMaybe<CaseStatus>;
}>;


export type UpdateCaseStatusMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseStatus: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCasePriorityMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
}>;


export type UpdateCasePriorityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCasePriority: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseTypeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  type?: InputMaybe<CaseType>;
}>;


export type UpdateCaseTypeMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseType: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseOwnerIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
}>;


export type UpdateCaseOwnerIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseOwnerId: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseContactIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  contactId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateCaseContactIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseContactId: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseDescriptionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCaseDescriptionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseDescription: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type RemoveCaseMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCaseMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCase: string } };

export type CreateCompanyMutationVariables = Exact<{
  payload: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCompany: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateCompanyNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyName: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCompany: string } };

export type UpdateCompanyStreetMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  street?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyStreetMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyStreet: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyCityMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  city?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyCityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyCity: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyStateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyStateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyState: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyPostalCodeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyPostalCodeMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyPostalCode: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyCountryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyCountryMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyCountry: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyPhoneNumberMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyPhoneNumberMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyPhoneNumber: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyIndustryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyIndustryMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyIndustry: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyWebsiteMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyWebsiteMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyWebsite: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyAnnualRevenueMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
}>;


export type UpdateCompanyAnnualRevenueMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyAnnualRevenue: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyOwnerIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateCompanyOwnerIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyOwnerId: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type CreateContactMutationVariables = Exact<{
  payload: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createContact: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateContactNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactName: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactEmailMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  email: Scalars['String']['input'];
}>;


export type UpdateContactEmailMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactEmail: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactPhoneNumberMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateContactPhoneNumberMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactPhoneNumber: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactJobTitleMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateContactJobTitleMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactJobTitle: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactCompanyIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  companyId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateContactCompanyIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactCompanyId: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactOwnerIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
}>;


export type UpdateContactOwnerIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactOwnerId: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type RemoveContactMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveContactMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeContact: string } };

export type CreateInteractionMutationVariables = Exact<{
  payload: CreateInteractionInput;
}>;


export type CreateInteractionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createInteraction: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionContactIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  contactId: Scalars['UUID']['input'];
}>;


export type UpdateInteractionContactIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionContactId: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionUserIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type UpdateInteractionUserIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionUserId: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionCaseIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  caseId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateInteractionCaseIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionCaseId: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionTypeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  type?: InputMaybe<InteractionType>;
}>;


export type UpdateInteractionTypeMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionType: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionOutcomeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  outcome?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateInteractionOutcomeMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionOutcome: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionNotesMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateInteractionNotesMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionNotes: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionInteractionDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateInteractionInteractionDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionInteractionDate: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type RemoveInteractionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveInteractionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeInteraction: string } };

export type CreateInvoiceMutationVariables = Exact<{
  payload: CreateCrmInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createInvoice: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceOpportunityIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateInvoiceOpportunityIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceOpportunityId: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceStatusMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  status?: InputMaybe<InvoiceStatus>;
}>;


export type UpdateInvoiceStatusMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceStatus: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceTotalMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  total?: InputMaybe<Scalars['Decimal']['input']>;
}>;


export type UpdateInvoiceTotalMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceTotal: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceIssueDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
}>;


export type UpdateInvoiceIssueDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceIssueDate: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceDueDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
}>;


export type UpdateInvoiceDueDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceDueDate: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceSentAtMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateInvoiceSentAtMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceSentAt: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoicePaidAtMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateInvoicePaidAtMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoicePaidAt: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoicePaymentMethodMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  paymentMethod?: InputMaybe<PaymentMethod>;
}>;


export type UpdateInvoicePaymentMethodMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoicePaymentMethod: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type AddInvoiceItemMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  payload: CreateCrmInvoiceItemInput;
}>;


export type AddInvoiceItemMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', addInvoiceItem: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type RemoveInvoiceItemMutationVariables = Exact<{
  itemId: Scalars['UUID']['input'];
}>;


export type RemoveInvoiceItemMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeInvoiceItem: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type RemoveInvoiceMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveInvoiceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeInvoice: string } };

export type CreateLeadMutationVariables = Exact<{
  payload: CreateLeadInput;
}>;


export type CreateLeadMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createLead: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateLeadNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadName: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadEmailMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  email: Scalars['String']['input'];
}>;


export type UpdateLeadEmailMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadEmail: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadLeadSourceMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  leadSource?: InputMaybe<LeadSource>;
}>;


export type UpdateLeadLeadSourceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadLeadSource: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadStatusMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  status?: InputMaybe<LeadStatus>;
}>;


export type UpdateLeadStatusMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadStatus: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadLeadScoreMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateLeadLeadScoreMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadLeadScore: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadOwnerIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
}>;


export type UpdateLeadOwnerIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadOwnerId: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadCampaignIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateLeadCampaignIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadCampaignId: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadConvertedAtMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  convertedAt?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateLeadConvertedAtMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadConvertedAt: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadConvertedContactIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  convertedContactId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateLeadConvertedContactIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadConvertedContactId: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadConvertedCompanyIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  convertedCompanyId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateLeadConvertedCompanyIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadConvertedCompanyId: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadConvertedOpportunityIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  convertedOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateLeadConvertedOpportunityIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadConvertedOpportunityId: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type RemoveLeadMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveLeadMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeLead: string } };

export type CreateNotificationMutationVariables = Exact<{
  payload: CreateNotificationInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createNotification: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } } };

export type UpdateNotificationUserIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type UpdateNotificationUserIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateNotificationUserId: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } } };

export type UpdateNotificationMessageMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
}>;


export type UpdateNotificationMessageMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateNotificationMessage: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } } };

export type UpdateNotificationIsReadMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateNotificationIsReadMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateNotificationIsRead: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } } };

export type UpdateNotificationLinkMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateNotificationLinkMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateNotificationLink: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } } };

export type RemoveNotificationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveNotificationMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeNotification: string } };

export type CreateOpportunityMutationVariables = Exact<{
  payload: CreateOpportunityInput;
}>;


export type CreateOpportunityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createOpportunity: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateOpportunityNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityName: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityStageMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  stage?: InputMaybe<OpportunityStage>;
}>;


export type UpdateOpportunityStageMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityStage: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityDealValueMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  dealValue?: InputMaybe<Scalars['Decimal']['input']>;
}>;


export type UpdateOpportunityDealValueMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityDealValue: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityProbabilityMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
}>;


export type UpdateOpportunityProbabilityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityProbability: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityExpectedCloseDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  expectedCloseDate?: InputMaybe<Scalars['NaiveDate']['input']>;
}>;


export type UpdateOpportunityExpectedCloseDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityExpectedCloseDate: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityLostReasonMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  lostReason?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateOpportunityLostReasonMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityLostReason: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunitySourceMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  source?: InputMaybe<OpportunitySource>;
}>;


export type UpdateOpportunitySourceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunitySource: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityOwnerIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
}>;


export type UpdateOpportunityOwnerIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityOwnerId: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityContactIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  contactId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateOpportunityContactIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityContactId: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityCompanyIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  companyId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateOpportunityCompanyIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityCompanyId: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityCampaignIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateOpportunityCampaignIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityCampaignId: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type RemoveOpportunityMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveOpportunityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeOpportunity: string } };

export type CreateProductMutationVariables = Exact<{
  payload: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createProduct: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateProductNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateProductNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateProductName: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateProductSkuMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProductSkuMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateProductSku: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateProductPriceMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  price: Scalars['Decimal']['input'];
}>;


export type UpdateProductPriceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateProductPrice: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateProductTypeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  type?: InputMaybe<ProductType>;
}>;


export type UpdateProductTypeMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateProductType: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateProductDescriptionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProductDescriptionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateProductDescription: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeProduct: string } };

export type CreateTagMutationVariables = Exact<{
  payload: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createTag: { __typename?: 'CrmTags', id: any, name: string, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateTagNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateTagNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateTagName: { __typename?: 'CrmTags', id: any, name: string, createdAt?: any | null, updatedAt?: any | null } } };

export type RemoveTagMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveTagMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeTag: string } };

export type GetAttachmentQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetAttachmentQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', attachment?: { __typename?: 'CrmAttachments', id: any, fileName: string, filePath: string, mimeType?: string | null, recordId?: any | null, recordType?: RecordType | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetAttachmentsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetAttachmentsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', attachments: Array<{ __typename?: 'CrmAttachments', id: any, fileName: string, filePath: string, mimeType?: string | null, recordId?: any | null, recordType?: RecordType | null, createdAt?: any | null, updatedAt?: any | null }> } };

export type GetCampaignQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetCampaignQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', campaign?: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetCampaignsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCampaignsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', campaigns: Array<{ __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null }> } };

export type GetCaseQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetCaseQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', case?: { __typename?: 'CrmCases', id: any, caseNumber: string, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } | null } };

export type GetCasesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCasesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', cases: Array<{ __typename?: 'CrmCases', id: any, caseNumber: string, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null }> } };

export type GetCompanyQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetCompanyQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', company?: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } | null } };

export type GetCompaniesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCompaniesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', companies: Array<{ __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null }> } };

export type GetContactQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetContactQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contact?: { __typename?: 'CrmContacts', id: any, name: string, email: string, phoneNumber?: string | null, jobTitle?: string | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } | null } };

export type GetContactsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetContactsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contacts: Array<{ __typename?: 'CrmContacts', id: any, name: string, email: string, phoneNumber?: string | null, jobTitle?: string | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null }> } };

export type GetInteractionQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetInteractionQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interaction?: { __typename?: 'CrmInteractions', id: any, type?: InteractionType | null, outcome?: string | null, notes?: string | null, interactionDate?: any | null, createdAt?: any | null, updatedAt?: any | null, contact: { __typename?: 'CrmContacts', id: any, name: string }, user: { __typename?: 'AuthUser', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } | null } };

export type GetInteractionsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetInteractionsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interactions: Array<{ __typename?: 'CrmInteractions', id: any, type?: InteractionType | null, outcome?: string | null, notes?: string | null, interactionDate?: any | null, createdAt?: any | null, updatedAt?: any | null, contact: { __typename?: 'CrmContacts', id: any, name: string }, user: { __typename?: 'AuthUser', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null }> } };

export type GetInvoiceQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetInvoiceQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoice?: { __typename?: 'CrmInvoices', id: any, status?: InvoiceStatus | null, total?: any | null, issueDate?: any | null, dueDate?: any | null, sentAt?: any | null, paidAt?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, quantity: number, price: any, product: { __typename?: 'CrmProducts', id: any, name: string } }> } | null } };

export type GetInvoicesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetInvoicesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoices: Array<{ __typename?: 'CrmInvoices', id: any, status?: InvoiceStatus | null, total?: any | null, issueDate?: any | null, dueDate?: any | null, sentAt?: any | null, paidAt?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null }> } };

export type GetLeadQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetLeadQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', lead?: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadSource?: LeadSource | null, status?: LeadStatus | null, leadScore?: number | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } | null } };

export type GetLeadsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetLeadsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', leads: Array<{ __typename?: 'CrmLeads', id: any, name: string, email: string, leadSource?: LeadSource | null, status?: LeadStatus | null, leadScore?: number | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string } }> } };

export type GetNotificationQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetNotificationQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', notification?: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } | null } };

export type GetNotificationsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetNotificationsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', notifications: Array<{ __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } }> } };

export type GetOpportunityQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetOpportunityQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string, stage?: OpportunityStage | null, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } | null } };

export type GetOpportunitiesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetOpportunitiesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunities: Array<{ __typename?: 'CrmOpportunities', id: any, name: string, stage?: OpportunityStage | null, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null }> } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', product?: { __typename?: 'CrmProducts', id: any, name: string, sku?: string | null, price: any, type?: ProductType | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetProductsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetProductsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', products: Array<{ __typename?: 'CrmProducts', id: any, name: string, sku?: string | null, price: any, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null }> } };

export type GetTagQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetTagQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', tag?: { __typename?: 'CrmTags', id: any, name: string, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetTagsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetTagsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', tags: Array<{ __typename?: 'CrmTags', id: any, name: string, createdAt?: any | null, updatedAt?: any | null }> } };

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

export const SignUpEmailDocument = new TypedDocumentString(`
    mutation SignUpEmail($payload: SignUpEmailInput!) {
  auth {
    signUpEmail(payload: $payload) {
      token
      user {
        name
        email
        emailVerified
        image
        role
      }
    }
  }
}
    `) as unknown as TypedDocumentString<SignUpEmailMutation, SignUpEmailMutationVariables>;
export const SignInEmailDocument = new TypedDocumentString(`
    mutation SignInEmail($payload: SignInEmailInput!) {
  auth {
    signInEmail(payload: $payload) {
      token
      user {
        name
        email
        emailVerified
        image
        role
      }
    }
  }
}
    `) as unknown as TypedDocumentString<SignInEmailMutation, SignInEmailMutationVariables>;
export const RevokeSessionDocument = new TypedDocumentString(`
    mutation RevokeSession($token: String!) {
  auth {
    revokeSession(token: $token) {
      message
      success
    }
  }
}
    `) as unknown as TypedDocumentString<RevokeSessionMutation, RevokeSessionMutationVariables>;
export const RefreshSessionDocument = new TypedDocumentString(`
    mutation RefreshSession {
  auth {
    refreshSession {
      token
      user {
        name
        email
        emailVerified
        image
        role
      }
    }
  }
}
    `) as unknown as TypedDocumentString<RefreshSessionMutation, RefreshSessionMutationVariables>;
export const ChangePasswordDocument = new TypedDocumentString(`
    mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
  auth {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
}
    `) as unknown as TypedDocumentString<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const UploadAttachmentDocument = new TypedDocumentString(`
    mutation UploadAttachment($file: Upload!, $recordId: UUID!, $recordType: RecordType!) {
  crm {
    uploadAttachment(file: $file, recordId: $recordId, recordType: $recordType) {
      id
      fileName
      filePath
      mimeType
      recordId
      recordType
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UploadAttachmentMutation, UploadAttachmentMutationVariables>;
export const RemoveAttachmentDocument = new TypedDocumentString(`
    mutation RemoveAttachment($id: UUID!) {
  crm {
    removeAttachment(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveAttachmentMutation, RemoveAttachmentMutationVariables>;
export const CreateCampaignDocument = new TypedDocumentString(`
    mutation CreateCampaign($payload: CreateCampaignInput!) {
  crm {
    createCampaign(payload: $payload) {
      id
      name
      budget
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCampaignMutation, CreateCampaignMutationVariables>;
export const UpdateCampaignNameDocument = new TypedDocumentString(`
    mutation UpdateCampaignName($id: UUID!, $name: String!) {
  crm {
    updateCampaignName(id: $id, name: $name) {
      id
      name
      budget
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCampaignNameMutation, UpdateCampaignNameMutationVariables>;
export const UpdateCampaignBudgetDocument = new TypedDocumentString(`
    mutation UpdateCampaignBudget($id: UUID!, $budget: Decimal!) {
  crm {
    updateCampaignBudget(id: $id, budget: $budget) {
      id
      name
      budget
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCampaignBudgetMutation, UpdateCampaignBudgetMutationVariables>;
export const UpdateCampaignStartDateDocument = new TypedDocumentString(`
    mutation UpdateCampaignStartDate($id: UUID!, $startDate: NaiveDate!) {
  crm {
    updateCampaignStartDate(id: $id, startDate: $startDate) {
      id
      name
      budget
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCampaignStartDateMutation, UpdateCampaignStartDateMutationVariables>;
export const UpdateCampaignEndDateDocument = new TypedDocumentString(`
    mutation UpdateCampaignEndDate($id: UUID!, $endDate: NaiveDate!) {
  crm {
    updateCampaignEndDate(id: $id, endDate: $endDate) {
      id
      name
      budget
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCampaignEndDateMutation, UpdateCampaignEndDateMutationVariables>;
export const RemoveCampaignDocument = new TypedDocumentString(`
    mutation RemoveCampaign($id: UUID!) {
  crm {
    removeCampaign(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveCampaignMutation, RemoveCampaignMutationVariables>;
export const CreateCaseDocument = new TypedDocumentString(`
    mutation CreateCase($payload: CreateCaseInput!) {
  crm {
    createCase(payload: $payload) {
      id
      caseNumber
      description
      status
      priority
      type
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCaseMutation, CreateCaseMutationVariables>;
export const UpdateCaseNumberDocument = new TypedDocumentString(`
    mutation UpdateCaseNumber($id: UUID!, $caseNumber: String!) {
  crm {
    updateCaseNumber(id: $id, caseNumber: $caseNumber) {
      id
      caseNumber
      description
      status
      priority
      type
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCaseNumberMutation, UpdateCaseNumberMutationVariables>;
export const UpdateCaseStatusDocument = new TypedDocumentString(`
    mutation UpdateCaseStatus($id: UUID!, $status: CaseStatus) {
  crm {
    updateCaseStatus(id: $id, status: $status) {
      id
      caseNumber
      description
      status
      priority
      type
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCaseStatusMutation, UpdateCaseStatusMutationVariables>;
export const UpdateCasePriorityDocument = new TypedDocumentString(`
    mutation UpdateCasePriority($id: UUID!, $priority: CasePriority) {
  crm {
    updateCasePriority(id: $id, priority: $priority) {
      id
      caseNumber
      description
      status
      priority
      type
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCasePriorityMutation, UpdateCasePriorityMutationVariables>;
export const UpdateCaseTypeDocument = new TypedDocumentString(`
    mutation UpdateCaseType($id: UUID!, $type: CaseType) {
  crm {
    updateCaseType(id: $id, type: $type) {
      id
      caseNumber
      description
      status
      priority
      type
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCaseTypeMutation, UpdateCaseTypeMutationVariables>;
export const UpdateCaseOwnerIdDocument = new TypedDocumentString(`
    mutation UpdateCaseOwnerId($id: UUID!, $ownerId: UUID!) {
  crm {
    updateCaseOwnerId(id: $id, ownerId: $ownerId) {
      id
      caseNumber
      description
      status
      priority
      type
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCaseOwnerIdMutation, UpdateCaseOwnerIdMutationVariables>;
export const UpdateCaseContactIdDocument = new TypedDocumentString(`
    mutation UpdateCaseContactId($id: UUID!, $contactId: UUID) {
  crm {
    updateCaseContactId(id: $id, contactId: $contactId) {
      id
      caseNumber
      description
      status
      priority
      type
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCaseContactIdMutation, UpdateCaseContactIdMutationVariables>;
export const UpdateCaseDescriptionDocument = new TypedDocumentString(`
    mutation UpdateCaseDescription($id: UUID!, $description: String) {
  crm {
    updateCaseDescription(id: $id, description: $description) {
      id
      caseNumber
      description
      status
      priority
      type
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCaseDescriptionMutation, UpdateCaseDescriptionMutationVariables>;
export const RemoveCaseDocument = new TypedDocumentString(`
    mutation RemoveCase($id: UUID!) {
  crm {
    removeCase(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveCaseMutation, RemoveCaseMutationVariables>;
export const CreateCompanyDocument = new TypedDocumentString(`
    mutation CreateCompany($payload: CreateCompanyInput!) {
  crm {
    createCompany(payload: $payload) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const UpdateCompanyNameDocument = new TypedDocumentString(`
    mutation UpdateCompanyName($id: UUID!, $name: String!) {
  crm {
    updateCompanyName(id: $id, name: $name) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyNameMutation, UpdateCompanyNameMutationVariables>;
export const RemoveCompanyDocument = new TypedDocumentString(`
    mutation RemoveCompany($id: UUID!) {
  crm {
    removeCompany(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveCompanyMutation, RemoveCompanyMutationVariables>;
export const UpdateCompanyStreetDocument = new TypedDocumentString(`
    mutation UpdateCompanyStreet($id: UUID!, $street: String) {
  crm {
    updateCompanyStreet(id: $id, street: $street) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyStreetMutation, UpdateCompanyStreetMutationVariables>;
export const UpdateCompanyCityDocument = new TypedDocumentString(`
    mutation UpdateCompanyCity($id: UUID!, $city: String) {
  crm {
    updateCompanyCity(id: $id, city: $city) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyCityMutation, UpdateCompanyCityMutationVariables>;
export const UpdateCompanyStateDocument = new TypedDocumentString(`
    mutation UpdateCompanyState($id: UUID!, $state: String) {
  crm {
    updateCompanyState(id: $id, state: $state) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyStateMutation, UpdateCompanyStateMutationVariables>;
export const UpdateCompanyPostalCodeDocument = new TypedDocumentString(`
    mutation UpdateCompanyPostalCode($id: UUID!, $postalCode: String) {
  crm {
    updateCompanyPostalCode(id: $id, postalCode: $postalCode) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyPostalCodeMutation, UpdateCompanyPostalCodeMutationVariables>;
export const UpdateCompanyCountryDocument = new TypedDocumentString(`
    mutation UpdateCompanyCountry($id: UUID!, $country: String) {
  crm {
    updateCompanyCountry(id: $id, country: $country) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyCountryMutation, UpdateCompanyCountryMutationVariables>;
export const UpdateCompanyPhoneNumberDocument = new TypedDocumentString(`
    mutation UpdateCompanyPhoneNumber($id: UUID!, $phoneNumber: String) {
  crm {
    updateCompanyPhoneNumber(id: $id, phoneNumber: $phoneNumber) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyPhoneNumberMutation, UpdateCompanyPhoneNumberMutationVariables>;
export const UpdateCompanyIndustryDocument = new TypedDocumentString(`
    mutation UpdateCompanyIndustry($id: UUID!, $industry: String) {
  crm {
    updateCompanyIndustry(id: $id, industry: $industry) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyIndustryMutation, UpdateCompanyIndustryMutationVariables>;
export const UpdateCompanyWebsiteDocument = new TypedDocumentString(`
    mutation UpdateCompanyWebsite($id: UUID!, $website: String) {
  crm {
    updateCompanyWebsite(id: $id, website: $website) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyWebsiteMutation, UpdateCompanyWebsiteMutationVariables>;
export const UpdateCompanyAnnualRevenueDocument = new TypedDocumentString(`
    mutation UpdateCompanyAnnualRevenue($id: UUID!, $annualRevenue: Decimal) {
  crm {
    updateCompanyAnnualRevenue(id: $id, annualRevenue: $annualRevenue) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyAnnualRevenueMutation, UpdateCompanyAnnualRevenueMutationVariables>;
export const UpdateCompanyOwnerIdDocument = new TypedDocumentString(`
    mutation UpdateCompanyOwnerId($id: UUID!, $ownerId: UUID) {
  crm {
    updateCompanyOwnerId(id: $id, ownerId: $ownerId) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCompanyOwnerIdMutation, UpdateCompanyOwnerIdMutationVariables>;
export const CreateContactDocument = new TypedDocumentString(`
    mutation CreateContact($payload: CreateContactInput!) {
  crm {
    createContact(payload: $payload) {
      id
      name
      email
      jobTitle
      phoneNumber
      createdAt
      updatedAt
      ownerId
      owner {
        id
        name
      }
      companyId
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateContactMutation, CreateContactMutationVariables>;
export const UpdateContactNameDocument = new TypedDocumentString(`
    mutation UpdateContactName($id: UUID!, $name: String!) {
  crm {
    updateContactName(id: $id, name: $name) {
      id
      name
      email
      jobTitle
      phoneNumber
      createdAt
      updatedAt
      ownerId
      owner {
        id
        name
      }
      companyId
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateContactNameMutation, UpdateContactNameMutationVariables>;
export const UpdateContactEmailDocument = new TypedDocumentString(`
    mutation UpdateContactEmail($id: UUID!, $email: String!) {
  crm {
    updateContactEmail(id: $id, email: $email) {
      id
      name
      email
      jobTitle
      phoneNumber
      createdAt
      updatedAt
      ownerId
      owner {
        id
        name
      }
      companyId
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateContactEmailMutation, UpdateContactEmailMutationVariables>;
export const UpdateContactPhoneNumberDocument = new TypedDocumentString(`
    mutation UpdateContactPhoneNumber($id: UUID!, $phoneNumber: String) {
  crm {
    updateContactPhoneNumber(id: $id, phoneNumber: $phoneNumber) {
      id
      name
      email
      jobTitle
      phoneNumber
      createdAt
      updatedAt
      ownerId
      owner {
        id
        name
      }
      companyId
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateContactPhoneNumberMutation, UpdateContactPhoneNumberMutationVariables>;
export const UpdateContactJobTitleDocument = new TypedDocumentString(`
    mutation UpdateContactJobTitle($id: UUID!, $jobTitle: String) {
  crm {
    updateContactJobTitle(id: $id, jobTitle: $jobTitle) {
      id
      name
      email
      jobTitle
      phoneNumber
      createdAt
      updatedAt
      ownerId
      owner {
        id
        name
      }
      companyId
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateContactJobTitleMutation, UpdateContactJobTitleMutationVariables>;
export const UpdateContactCompanyIdDocument = new TypedDocumentString(`
    mutation UpdateContactCompanyId($id: UUID!, $companyId: UUID) {
  crm {
    updateContactCompanyId(id: $id, companyId: $companyId) {
      id
      name
      email
      jobTitle
      phoneNumber
      createdAt
      updatedAt
      ownerId
      owner {
        id
        name
      }
      companyId
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateContactCompanyIdMutation, UpdateContactCompanyIdMutationVariables>;
export const UpdateContactOwnerIdDocument = new TypedDocumentString(`
    mutation UpdateContactOwnerId($id: UUID!, $ownerId: UUID!) {
  crm {
    updateContactOwnerId(id: $id, ownerId: $ownerId) {
      id
      name
      email
      jobTitle
      phoneNumber
      createdAt
      updatedAt
      ownerId
      owner {
        id
        name
      }
      companyId
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateContactOwnerIdMutation, UpdateContactOwnerIdMutationVariables>;
export const RemoveContactDocument = new TypedDocumentString(`
    mutation RemoveContact($id: UUID!) {
  crm {
    removeContact(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveContactMutation, RemoveContactMutationVariables>;
export const CreateInteractionDocument = new TypedDocumentString(`
    mutation CreateInteraction($payload: CreateInteractionInput!) {
  crm {
    createInteraction(payload: $payload) {
      id
      interactionDate
      notes
      outcome
      type
      createdAt
      updatedAt
      user {
        id
        name
      }
      contact {
        id
        name
      }
      case {
        id
        caseNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInteractionMutation, CreateInteractionMutationVariables>;
export const UpdateInteractionContactIdDocument = new TypedDocumentString(`
    mutation UpdateInteractionContactId($id: UUID!, $contactId: UUID!) {
  crm {
    updateInteractionContactId(id: $id, contactId: $contactId) {
      id
      interactionDate
      notes
      outcome
      type
      createdAt
      updatedAt
      user {
        id
        name
      }
      contact {
        id
        name
      }
      case {
        id
        caseNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInteractionContactIdMutation, UpdateInteractionContactIdMutationVariables>;
export const UpdateInteractionUserIdDocument = new TypedDocumentString(`
    mutation UpdateInteractionUserId($id: UUID!, $userId: UUID!) {
  crm {
    updateInteractionUserId(id: $id, userId: $userId) {
      id
      interactionDate
      notes
      outcome
      type
      createdAt
      updatedAt
      user {
        id
        name
      }
      contact {
        id
        name
      }
      case {
        id
        caseNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInteractionUserIdMutation, UpdateInteractionUserIdMutationVariables>;
export const UpdateInteractionCaseIdDocument = new TypedDocumentString(`
    mutation UpdateInteractionCaseId($id: UUID!, $caseId: UUID) {
  crm {
    updateInteractionCaseId(id: $id, caseId: $caseId) {
      id
      interactionDate
      notes
      outcome
      type
      createdAt
      updatedAt
      user {
        id
        name
      }
      contact {
        id
        name
      }
      case {
        id
        caseNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInteractionCaseIdMutation, UpdateInteractionCaseIdMutationVariables>;
export const UpdateInteractionTypeDocument = new TypedDocumentString(`
    mutation UpdateInteractionType($id: UUID!, $type: InteractionType) {
  crm {
    updateInteractionType(id: $id, type: $type) {
      id
      interactionDate
      notes
      outcome
      type
      createdAt
      updatedAt
      user {
        id
        name
      }
      contact {
        id
        name
      }
      case {
        id
        caseNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInteractionTypeMutation, UpdateInteractionTypeMutationVariables>;
export const UpdateInteractionOutcomeDocument = new TypedDocumentString(`
    mutation UpdateInteractionOutcome($id: UUID!, $outcome: String) {
  crm {
    updateInteractionOutcome(id: $id, outcome: $outcome) {
      id
      interactionDate
      notes
      outcome
      type
      createdAt
      updatedAt
      user {
        id
        name
      }
      contact {
        id
        name
      }
      case {
        id
        caseNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInteractionOutcomeMutation, UpdateInteractionOutcomeMutationVariables>;
export const UpdateInteractionNotesDocument = new TypedDocumentString(`
    mutation UpdateInteractionNotes($id: UUID!, $notes: String) {
  crm {
    updateInteractionNotes(id: $id, notes: $notes) {
      id
      interactionDate
      notes
      outcome
      type
      createdAt
      updatedAt
      user {
        id
        name
      }
      contact {
        id
        name
      }
      case {
        id
        caseNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInteractionNotesMutation, UpdateInteractionNotesMutationVariables>;
export const UpdateInteractionInteractionDateDocument = new TypedDocumentString(`
    mutation UpdateInteractionInteractionDate($id: UUID!, $interactionDate: DateTime) {
  crm {
    updateInteractionInteractionDate(id: $id, interactionDate: $interactionDate) {
      id
      interactionDate
      notes
      outcome
      type
      createdAt
      updatedAt
      user {
        id
        name
      }
      contact {
        id
        name
      }
      case {
        id
        caseNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInteractionInteractionDateMutation, UpdateInteractionInteractionDateMutationVariables>;
export const RemoveInteractionDocument = new TypedDocumentString(`
    mutation RemoveInteraction($id: UUID!) {
  crm {
    removeInteraction(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveInteractionMutation, RemoveInteractionMutationVariables>;
export const CreateInvoiceDocument = new TypedDocumentString(`
    mutation CreateInvoice($payload: CreateCrmInvoiceInput!) {
  crm {
    createInvoice(payload: $payload) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const UpdateInvoiceOpportunityIdDocument = new TypedDocumentString(`
    mutation UpdateInvoiceOpportunityId($id: UUID!, $opportunityId: UUID) {
  crm {
    updateInvoiceOpportunityId(id: $id, opportunityId: $opportunityId) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceOpportunityIdMutation, UpdateInvoiceOpportunityIdMutationVariables>;
export const UpdateInvoiceStatusDocument = new TypedDocumentString(`
    mutation UpdateInvoiceStatus($id: UUID!, $status: InvoiceStatus) {
  crm {
    updateInvoiceStatus(id: $id, status: $status) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceStatusMutation, UpdateInvoiceStatusMutationVariables>;
export const UpdateInvoiceTotalDocument = new TypedDocumentString(`
    mutation UpdateInvoiceTotal($id: UUID!, $total: Decimal) {
  crm {
    updateInvoiceTotal(id: $id, total: $total) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceTotalMutation, UpdateInvoiceTotalMutationVariables>;
export const UpdateInvoiceIssueDateDocument = new TypedDocumentString(`
    mutation UpdateInvoiceIssueDate($id: UUID!, $issueDate: NaiveDate) {
  crm {
    updateInvoiceIssueDate(id: $id, issueDate: $issueDate) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceIssueDateMutation, UpdateInvoiceIssueDateMutationVariables>;
export const UpdateInvoiceDueDateDocument = new TypedDocumentString(`
    mutation UpdateInvoiceDueDate($id: UUID!, $dueDate: NaiveDate) {
  crm {
    updateInvoiceDueDate(id: $id, dueDate: $dueDate) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceDueDateMutation, UpdateInvoiceDueDateMutationVariables>;
export const UpdateInvoiceSentAtDocument = new TypedDocumentString(`
    mutation UpdateInvoiceSentAt($id: UUID!, $sentAt: DateTime) {
  crm {
    updateInvoiceSentAt(id: $id, sentAt: $sentAt) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceSentAtMutation, UpdateInvoiceSentAtMutationVariables>;
export const UpdateInvoicePaidAtDocument = new TypedDocumentString(`
    mutation UpdateInvoicePaidAt($id: UUID!, $paidAt: DateTime) {
  crm {
    updateInvoicePaidAt(id: $id, paidAt: $paidAt) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoicePaidAtMutation, UpdateInvoicePaidAtMutationVariables>;
export const UpdateInvoicePaymentMethodDocument = new TypedDocumentString(`
    mutation UpdateInvoicePaymentMethod($id: UUID!, $paymentMethod: PaymentMethod) {
  crm {
    updateInvoicePaymentMethod(id: $id, paymentMethod: $paymentMethod) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoicePaymentMethodMutation, UpdateInvoicePaymentMethodMutationVariables>;
export const AddInvoiceItemDocument = new TypedDocumentString(`
    mutation AddInvoiceItem($id: UUID!, $payload: CreateCrmInvoiceItemInput!) {
  crm {
    addInvoiceItem(id: $id, payload: $payload) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AddInvoiceItemMutation, AddInvoiceItemMutationVariables>;
export const RemoveInvoiceItemDocument = new TypedDocumentString(`
    mutation RemoveInvoiceItem($itemId: UUID!) {
  crm {
    removeInvoiceItem(itemId: $itemId) {
      id
      dueDate
      issueDate
      paidAt
      sentAt
      status
      total
      paymentMethod
      createdAt
      updatedAt
      opportunityId
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        price
        quantity
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveInvoiceItemMutation, RemoveInvoiceItemMutationVariables>;
export const RemoveInvoiceDocument = new TypedDocumentString(`
    mutation RemoveInvoice($id: UUID!) {
  crm {
    removeInvoice(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveInvoiceMutation, RemoveInvoiceMutationVariables>;
export const CreateLeadDocument = new TypedDocumentString(`
    mutation CreateLead($payload: CreateLeadInput!) {
  crm {
    createLead(payload: $payload) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateLeadMutation, CreateLeadMutationVariables>;
export const UpdateLeadNameDocument = new TypedDocumentString(`
    mutation UpdateLeadName($id: UUID!, $name: String!) {
  crm {
    updateLeadName(id: $id, name: $name) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadNameMutation, UpdateLeadNameMutationVariables>;
export const UpdateLeadEmailDocument = new TypedDocumentString(`
    mutation UpdateLeadEmail($id: UUID!, $email: String!) {
  crm {
    updateLeadEmail(id: $id, email: $email) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadEmailMutation, UpdateLeadEmailMutationVariables>;
export const UpdateLeadLeadSourceDocument = new TypedDocumentString(`
    mutation UpdateLeadLeadSource($id: UUID!, $leadSource: LeadSource) {
  crm {
    updateLeadLeadSource(id: $id, leadSource: $leadSource) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadLeadSourceMutation, UpdateLeadLeadSourceMutationVariables>;
export const UpdateLeadStatusDocument = new TypedDocumentString(`
    mutation UpdateLeadStatus($id: UUID!, $status: LeadStatus) {
  crm {
    updateLeadStatus(id: $id, status: $status) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadStatusMutation, UpdateLeadStatusMutationVariables>;
export const UpdateLeadLeadScoreDocument = new TypedDocumentString(`
    mutation UpdateLeadLeadScore($id: UUID!, $leadScore: Int) {
  crm {
    updateLeadLeadScore(id: $id, leadScore: $leadScore) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadLeadScoreMutation, UpdateLeadLeadScoreMutationVariables>;
export const UpdateLeadOwnerIdDocument = new TypedDocumentString(`
    mutation UpdateLeadOwnerId($id: UUID!, $ownerId: UUID!) {
  crm {
    updateLeadOwnerId(id: $id, ownerId: $ownerId) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadOwnerIdMutation, UpdateLeadOwnerIdMutationVariables>;
export const UpdateLeadCampaignIdDocument = new TypedDocumentString(`
    mutation UpdateLeadCampaignId($id: UUID!, $campaignId: UUID) {
  crm {
    updateLeadCampaignId(id: $id, campaignId: $campaignId) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadCampaignIdMutation, UpdateLeadCampaignIdMutationVariables>;
export const UpdateLeadConvertedAtDocument = new TypedDocumentString(`
    mutation UpdateLeadConvertedAt($id: UUID!, $convertedAt: DateTime) {
  crm {
    updateLeadConvertedAt(id: $id, convertedAt: $convertedAt) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadConvertedAtMutation, UpdateLeadConvertedAtMutationVariables>;
export const UpdateLeadConvertedContactIdDocument = new TypedDocumentString(`
    mutation UpdateLeadConvertedContactId($id: UUID!, $convertedContactId: UUID) {
  crm {
    updateLeadConvertedContactId(id: $id, convertedContactId: $convertedContactId) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadConvertedContactIdMutation, UpdateLeadConvertedContactIdMutationVariables>;
export const UpdateLeadConvertedCompanyIdDocument = new TypedDocumentString(`
    mutation UpdateLeadConvertedCompanyId($id: UUID!, $convertedCompanyId: UUID) {
  crm {
    updateLeadConvertedCompanyId(id: $id, convertedCompanyId: $convertedCompanyId) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadConvertedCompanyIdMutation, UpdateLeadConvertedCompanyIdMutationVariables>;
export const UpdateLeadConvertedOpportunityIdDocument = new TypedDocumentString(`
    mutation UpdateLeadConvertedOpportunityId($id: UUID!, $convertedOpportunityId: UUID) {
  crm {
    updateLeadConvertedOpportunityId(
      id: $id
      convertedOpportunityId: $convertedOpportunityId
    ) {
      id
      name
      email
      leadScore
      leadSource
      status
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateLeadConvertedOpportunityIdMutation, UpdateLeadConvertedOpportunityIdMutationVariables>;
export const RemoveLeadDocument = new TypedDocumentString(`
    mutation RemoveLead($id: UUID!) {
  crm {
    removeLead(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveLeadMutation, RemoveLeadMutationVariables>;
export const CreateNotificationDocument = new TypedDocumentString(`
    mutation CreateNotification($payload: CreateNotificationInput!) {
  crm {
    createNotification(payload: $payload) {
      id
      message
      isRead
      link
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateNotificationMutation, CreateNotificationMutationVariables>;
export const UpdateNotificationUserIdDocument = new TypedDocumentString(`
    mutation UpdateNotificationUserId($id: UUID!, $userId: UUID!) {
  crm {
    updateNotificationUserId(id: $id, userId: $userId) {
      id
      message
      isRead
      link
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateNotificationUserIdMutation, UpdateNotificationUserIdMutationVariables>;
export const UpdateNotificationMessageDocument = new TypedDocumentString(`
    mutation UpdateNotificationMessage($id: UUID!, $message: String!) {
  crm {
    updateNotificationMessage(id: $id, message: $message) {
      id
      message
      isRead
      link
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateNotificationMessageMutation, UpdateNotificationMessageMutationVariables>;
export const UpdateNotificationIsReadDocument = new TypedDocumentString(`
    mutation UpdateNotificationIsRead($id: UUID!, $isRead: Boolean) {
  crm {
    updateNotificationIsRead(id: $id, isRead: $isRead) {
      id
      message
      isRead
      link
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateNotificationIsReadMutation, UpdateNotificationIsReadMutationVariables>;
export const UpdateNotificationLinkDocument = new TypedDocumentString(`
    mutation UpdateNotificationLink($id: UUID!, $link: String) {
  crm {
    updateNotificationLink(id: $id, link: $link) {
      id
      message
      isRead
      link
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateNotificationLinkMutation, UpdateNotificationLinkMutationVariables>;
export const RemoveNotificationDocument = new TypedDocumentString(`
    mutation RemoveNotification($id: UUID!) {
  crm {
    removeNotification(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveNotificationMutation, RemoveNotificationMutationVariables>;
export const CreateOpportunityDocument = new TypedDocumentString(`
    mutation CreateOpportunity($payload: CreateOpportunityInput!) {
  crm {
    createOpportunity(payload: $payload) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateOpportunityMutation, CreateOpportunityMutationVariables>;
export const UpdateOpportunityNameDocument = new TypedDocumentString(`
    mutation UpdateOpportunityName($id: UUID!, $name: String!) {
  crm {
    updateOpportunityName(id: $id, name: $name) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityNameMutation, UpdateOpportunityNameMutationVariables>;
export const UpdateOpportunityStageDocument = new TypedDocumentString(`
    mutation UpdateOpportunityStage($id: UUID!, $stage: OpportunityStage) {
  crm {
    updateOpportunityStage(id: $id, stage: $stage) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityStageMutation, UpdateOpportunityStageMutationVariables>;
export const UpdateOpportunityDealValueDocument = new TypedDocumentString(`
    mutation UpdateOpportunityDealValue($id: UUID!, $dealValue: Decimal) {
  crm {
    updateOpportunityDealValue(id: $id, dealValue: $dealValue) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityDealValueMutation, UpdateOpportunityDealValueMutationVariables>;
export const UpdateOpportunityProbabilityDocument = new TypedDocumentString(`
    mutation UpdateOpportunityProbability($id: UUID!, $probability: Float) {
  crm {
    updateOpportunityProbability(id: $id, probability: $probability) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityProbabilityMutation, UpdateOpportunityProbabilityMutationVariables>;
export const UpdateOpportunityExpectedCloseDateDocument = new TypedDocumentString(`
    mutation UpdateOpportunityExpectedCloseDate($id: UUID!, $expectedCloseDate: NaiveDate) {
  crm {
    updateOpportunityExpectedCloseDate(
      id: $id
      expectedCloseDate: $expectedCloseDate
    ) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityExpectedCloseDateMutation, UpdateOpportunityExpectedCloseDateMutationVariables>;
export const UpdateOpportunityLostReasonDocument = new TypedDocumentString(`
    mutation UpdateOpportunityLostReason($id: UUID!, $lostReason: String) {
  crm {
    updateOpportunityLostReason(id: $id, lostReason: $lostReason) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityLostReasonMutation, UpdateOpportunityLostReasonMutationVariables>;
export const UpdateOpportunitySourceDocument = new TypedDocumentString(`
    mutation UpdateOpportunitySource($id: UUID!, $source: OpportunitySource) {
  crm {
    updateOpportunitySource(id: $id, source: $source) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunitySourceMutation, UpdateOpportunitySourceMutationVariables>;
export const UpdateOpportunityOwnerIdDocument = new TypedDocumentString(`
    mutation UpdateOpportunityOwnerId($id: UUID!, $ownerId: UUID!) {
  crm {
    updateOpportunityOwnerId(id: $id, ownerId: $ownerId) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityOwnerIdMutation, UpdateOpportunityOwnerIdMutationVariables>;
export const UpdateOpportunityContactIdDocument = new TypedDocumentString(`
    mutation UpdateOpportunityContactId($id: UUID!, $contactId: UUID) {
  crm {
    updateOpportunityContactId(id: $id, contactId: $contactId) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityContactIdMutation, UpdateOpportunityContactIdMutationVariables>;
export const UpdateOpportunityCompanyIdDocument = new TypedDocumentString(`
    mutation UpdateOpportunityCompanyId($id: UUID!, $companyId: UUID) {
  crm {
    updateOpportunityCompanyId(id: $id, companyId: $companyId) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityCompanyIdMutation, UpdateOpportunityCompanyIdMutationVariables>;
export const UpdateOpportunityCampaignIdDocument = new TypedDocumentString(`
    mutation UpdateOpportunityCampaignId($id: UUID!, $campaignId: UUID) {
  crm {
    updateOpportunityCampaignId(id: $id, campaignId: $campaignId) {
      id
      name
      dealValue
      probability
      expectedCloseDate
      lostReason
      stage
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      company {
        id
        name
      }
      contact {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOpportunityCampaignIdMutation, UpdateOpportunityCampaignIdMutationVariables>;
export const RemoveOpportunityDocument = new TypedDocumentString(`
    mutation RemoveOpportunity($id: UUID!) {
  crm {
    removeOpportunity(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveOpportunityMutation, RemoveOpportunityMutationVariables>;
export const CreateProductDocument = new TypedDocumentString(`
    mutation CreateProduct($payload: CreateProductInput!) {
  crm {
    createProduct(payload: $payload) {
      id
      name
      description
      price
      sku
      type
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductNameDocument = new TypedDocumentString(`
    mutation UpdateProductName($id: UUID!, $name: String!) {
  crm {
    updateProductName(id: $id, name: $name) {
      id
      name
      description
      price
      sku
      type
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateProductNameMutation, UpdateProductNameMutationVariables>;
export const UpdateProductSkuDocument = new TypedDocumentString(`
    mutation UpdateProductSku($id: UUID!, $sku: String) {
  crm {
    updateProductSku(id: $id, sku: $sku) {
      id
      name
      description
      price
      sku
      type
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateProductSkuMutation, UpdateProductSkuMutationVariables>;
export const UpdateProductPriceDocument = new TypedDocumentString(`
    mutation UpdateProductPrice($id: UUID!, $price: Decimal!) {
  crm {
    updateProductPrice(id: $id, price: $price) {
      id
      name
      description
      price
      sku
      type
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateProductPriceMutation, UpdateProductPriceMutationVariables>;
export const UpdateProductTypeDocument = new TypedDocumentString(`
    mutation UpdateProductType($id: UUID!, $type: ProductType) {
  crm {
    updateProductType(id: $id, type: $type) {
      id
      name
      description
      price
      sku
      type
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateProductTypeMutation, UpdateProductTypeMutationVariables>;
export const UpdateProductDescriptionDocument = new TypedDocumentString(`
    mutation UpdateProductDescription($id: UUID!, $description: String) {
  crm {
    updateProductDescription(id: $id, description: $description) {
      id
      name
      description
      price
      sku
      type
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateProductDescriptionMutation, UpdateProductDescriptionMutationVariables>;
export const RemoveProductDocument = new TypedDocumentString(`
    mutation RemoveProduct($id: UUID!) {
  crm {
    removeProduct(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveProductMutation, RemoveProductMutationVariables>;
export const CreateTagDocument = new TypedDocumentString(`
    mutation CreateTag($payload: CreateTagInput!) {
  crm {
    createTag(payload: $payload) {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateTagMutation, CreateTagMutationVariables>;
export const UpdateTagNameDocument = new TypedDocumentString(`
    mutation UpdateTagName($id: UUID!, $name: String!) {
  crm {
    updateTagName(id: $id, name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateTagNameMutation, UpdateTagNameMutationVariables>;
export const RemoveTagDocument = new TypedDocumentString(`
    mutation RemoveTag($id: UUID!) {
  crm {
    removeTag(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveTagMutation, RemoveTagMutationVariables>;
export const GetAttachmentDocument = new TypedDocumentString(`
    query GetAttachment($id: UUID!) {
  crm {
    attachment(id: $id) {
      id
      fileName
      filePath
      mimeType
      recordId
      recordType
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetAttachmentQuery, GetAttachmentQueryVariables>;
export const GetAttachmentsDocument = new TypedDocumentString(`
    query GetAttachments($limit: Int!, $page: Int!) {
  crm {
    attachments(limit: $limit, page: $page) {
      id
      fileName
      filePath
      mimeType
      recordId
      recordType
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetAttachmentsQuery, GetAttachmentsQueryVariables>;
export const GetCampaignDocument = new TypedDocumentString(`
    query GetCampaign($id: UUID!) {
  crm {
    campaign(id: $id) {
      id
      name
      budget
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetCampaignQuery, GetCampaignQueryVariables>;
export const GetCampaignsDocument = new TypedDocumentString(`
    query GetCampaigns($limit: Int!, $page: Int!) {
  crm {
    campaigns(limit: $limit, page: $page) {
      id
      name
      budget
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetCampaignsQuery, GetCampaignsQueryVariables>;
export const GetCaseDocument = new TypedDocumentString(`
    query GetCase($id: UUID!) {
  crm {
    case(id: $id) {
      id
      caseNumber
      status
      priority
      type
      description
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetCaseQuery, GetCaseQueryVariables>;
export const GetCasesDocument = new TypedDocumentString(`
    query GetCases($limit: Int!, $page: Int!) {
  crm {
    cases(limit: $limit, page: $page) {
      id
      caseNumber
      status
      priority
      type
      description
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetCasesQuery, GetCasesQueryVariables>;
export const GetCompanyDocument = new TypedDocumentString(`
    query GetCompany($id: UUID!) {
  crm {
    company(id: $id) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetCompanyQuery, GetCompanyQueryVariables>;
export const GetCompaniesDocument = new TypedDocumentString(`
    query GetCompanies($limit: Int!, $page: Int!) {
  crm {
    companies(limit: $limit, page: $page) {
      id
      name
      industry
      annualRevenue
      phoneNumber
      website
      street
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetCompaniesQuery, GetCompaniesQueryVariables>;
export const GetContactDocument = new TypedDocumentString(`
    query GetContact($id: UUID!) {
  crm {
    contact(id: $id) {
      id
      name
      email
      phoneNumber
      jobTitle
      createdAt
      updatedAt
      owner {
        id
        name
      }
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetContactQuery, GetContactQueryVariables>;
export const GetContactsDocument = new TypedDocumentString(`
    query GetContacts($limit: Int!, $page: Int!) {
  crm {
    contacts(limit: $limit, page: $page) {
      id
      name
      email
      phoneNumber
      jobTitle
      createdAt
      updatedAt
      owner {
        id
        name
      }
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetContactsQuery, GetContactsQueryVariables>;
export const GetInteractionDocument = new TypedDocumentString(`
    query GetInteraction($id: UUID!) {
  crm {
    interaction(id: $id) {
      id
      type
      outcome
      notes
      interactionDate
      createdAt
      updatedAt
      contact {
        id
        name
      }
      user {
        id
        name
      }
      case {
        id
        caseNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetInteractionQuery, GetInteractionQueryVariables>;
export const GetInteractionsDocument = new TypedDocumentString(`
    query GetInteractions($limit: Int!, $page: Int!) {
  crm {
    interactions(limit: $limit, page: $page) {
      id
      type
      outcome
      notes
      interactionDate
      createdAt
      updatedAt
      contact {
        id
        name
      }
      user {
        id
        name
      }
      case {
        id
        caseNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetInteractionsQuery, GetInteractionsQueryVariables>;
export const GetInvoiceDocument = new TypedDocumentString(`
    query GetInvoice($id: UUID!) {
  crm {
    invoice(id: $id) {
      id
      status
      total
      issueDate
      dueDate
      sentAt
      paidAt
      paymentMethod
      createdAt
      updatedAt
      opportunity {
        id
        name
      }
      items(limit: 10, page: 1) {
        id
        quantity
        price
        product {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetInvoiceQuery, GetInvoiceQueryVariables>;
export const GetInvoicesDocument = new TypedDocumentString(`
    query GetInvoices($limit: Int!, $page: Int!) {
  crm {
    invoices(limit: $limit, page: $page) {
      id
      status
      total
      issueDate
      dueDate
      sentAt
      paidAt
      paymentMethod
      createdAt
      updatedAt
      opportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetInvoicesQuery, GetInvoicesQueryVariables>;
export const GetLeadDocument = new TypedDocumentString(`
    query GetLead($id: UUID!) {
  crm {
    lead(id: $id) {
      id
      name
      email
      leadSource
      status
      leadScore
      convertedAt
      createdAt
      updatedAt
      owner {
        id
        name
      }
      campaign {
        id
        name
      }
      convertedContact {
        id
        name
      }
      convertedOpportunity {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetLeadQuery, GetLeadQueryVariables>;
export const GetLeadsDocument = new TypedDocumentString(`
    query GetLeads($limit: Int!, $page: Int!) {
  crm {
    leads(limit: $limit, page: $page) {
      id
      name
      email
      leadSource
      status
      leadScore
      createdAt
      updatedAt
      owner {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetLeadsQuery, GetLeadsQueryVariables>;
export const GetNotificationDocument = new TypedDocumentString(`
    query GetNotification($id: UUID!) {
  crm {
    notification(id: $id) {
      id
      message
      isRead
      link
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetNotificationQuery, GetNotificationQueryVariables>;
export const GetNotificationsDocument = new TypedDocumentString(`
    query GetNotifications($limit: Int!, $page: Int!) {
  crm {
    notifications(limit: $limit, page: $page) {
      id
      message
      isRead
      link
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetOpportunityDocument = new TypedDocumentString(`
    query GetOpportunity($id: UUID!) {
  crm {
    opportunity(id: $id) {
      id
      name
      stage
      dealValue
      probability
      expectedCloseDate
      lostReason
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      contact {
        id
        name
      }
      company {
        id
        name
      }
      campaign {
        id
        name
      }
      products(limit: 10, page: 1) {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetOpportunityQuery, GetOpportunityQueryVariables>;
export const GetOpportunitiesDocument = new TypedDocumentString(`
    query GetOpportunities($limit: Int!, $page: Int!) {
  crm {
    opportunities(limit: $limit, page: $page) {
      id
      name
      stage
      dealValue
      probability
      expectedCloseDate
      source
      createdAt
      updatedAt
      owner {
        id
        name
      }
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetOpportunitiesQuery, GetOpportunitiesQueryVariables>;
export const GetProductDocument = new TypedDocumentString(`
    query GetProduct($id: UUID!) {
  crm {
    product(id: $id) {
      id
      name
      sku
      price
      type
      description
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetProductQuery, GetProductQueryVariables>;
export const GetProductsDocument = new TypedDocumentString(`
    query GetProducts($limit: Int!, $page: Int!) {
  crm {
    products(limit: $limit, page: $page) {
      id
      name
      sku
      price
      type
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetProductsQuery, GetProductsQueryVariables>;
export const GetTagDocument = new TypedDocumentString(`
    query GetTag($id: UUID!) {
  crm {
    tag(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetTagQuery, GetTagQueryVariables>;
export const GetTagsDocument = new TypedDocumentString(`
    query GetTags($limit: Int!, $page: Int!) {
  crm {
    tags(limit: $limit, page: $page) {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<GetTagsQuery, GetTagsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Implement the DateTime<Utc> scalar
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
  Upload: { input: any; output: any; }
};

export type AuthMutation = {
  __typename?: 'AuthMutation';
  changePassword: Scalars['String']['output'];
  refreshSession: RefreshSessionResponse;
  revokeSession: RevokeSessionResponse;
  signInEmail: SignInResponse;
  signUpEmail: SignUpResponse;
};


export type AuthMutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type AuthMutationRevokeSessionArgs = {
  token: Scalars['String']['input'];
};


export type AuthMutationSignInEmailArgs = {
  payload: SignInEmailInput;
};


export type AuthMutationSignUpEmailArgs = {
  payload: SignUpEmailInput;
};

export type AuthQuery = {
  __typename?: 'AuthQuery';
  me: AuthUser;
  user?: Maybe<AuthUser>;
  users: Array<AuthUser>;
};


export type AuthQueryUserArgs = {
  id: Scalars['UUID']['input'];
};


export type AuthQueryUsersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  banExpires?: Maybe<Scalars['DateTime']['output']>;
  banReason?: Maybe<Scalars['String']['output']>;
  banned?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['UUID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role?: Maybe<AuthUserRole>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum AuthUserRole {
  Accountant = 'ACCOUNTANT',
  AccountManager = 'ACCOUNT_MANAGER',
  Admin = 'ADMIN',
  Carrier = 'CARRIER',
  Client = 'CLIENT',
  ClientAdmin = 'CLIENT_ADMIN',
  CustomerSupportAgent = 'CUSTOMER_SUPPORT_AGENT',
  Developer = 'DEVELOPER',
  Dispatcher = 'DISPATCHER',
  Driver = 'DRIVER',
  EndCustomer = 'END_CUSTOMER',
  FinanceManager = 'FINANCE_MANAGER',
  FleetManager = 'FLEET_MANAGER',
  InventoryManager = 'INVENTORY_MANAGER',
  LogisticsCoordinator = 'LOGISTICS_COORDINATOR',
  LogisticsManager = 'LOGISTICS_MANAGER',
  LogisticsPlanner = 'LOGISTICS_PLANNER',
  MarketingManager = 'MARKETING_MANAGER',
  Packer = 'PACKER',
  Picker = 'PICKER',
  PricingAnalyst = 'PRICING_ANALYST',
  ProductManager = 'PRODUCT_MANAGER',
  QcManager = 'QC_MANAGER',
  ReceivingManager = 'RECEIVING_MANAGER',
  ReturnsProcessor = 'RETURNS_PROCESSOR',
  SalesManager = 'SALES_MANAGER',
  SalesRep = 'SALES_REP',
  Sdr = 'SDR',
  TransportManager = 'TRANSPORT_MANAGER',
  User = 'USER',
  WarehouseManager = 'WAREHOUSE_MANAGER',
  WarehouseOperator = 'WAREHOUSE_OPERATOR'
}

export type BillingAccountTransactions = {
  __typename?: 'BillingAccountTransactions';
  amount: Scalars['Float']['output'];
  clientAccount: BillingClientAccounts;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  processedByUser?: Maybe<AuthUser>;
  referenceNumber?: Maybe<Scalars['String']['output']>;
  runningBalance?: Maybe<Scalars['Float']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  transactionDate?: Maybe<Scalars['DateTime']['output']>;
  type: TransactionTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingAccountingSyncLog = {
  __typename?: 'BillingAccountingSyncLog';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  externalSystem: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastSyncAt?: Maybe<Scalars['DateTime']['output']>;
  nextRetryAt?: Maybe<Scalars['DateTime']['output']>;
  recordId: Scalars['UUID']['output'];
  recordType: Scalars['String']['output'];
  requestPayload?: Maybe<Scalars['String']['output']>;
  responsePayload?: Maybe<Scalars['String']['output']>;
  retryCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<SyncStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingClientAccounts = {
  __typename?: 'BillingClientAccounts';
  availableCredit?: Maybe<Scalars['Float']['output']>;
  client: CrmCompanies;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creditLimit?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isCreditApproved?: Maybe<Scalars['Boolean']['output']>;
  lastPaymentDate?: Maybe<Scalars['NaiveDate']['output']>;
  paymentTermsDays?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  walletBalance?: Maybe<Scalars['Float']['output']>;
};

export type BillingCreditNotes = {
  __typename?: 'BillingCreditNotes';
  amount: Scalars['Float']['output'];
  appliedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUser?: Maybe<AuthUser>;
  creditNoteNumber: Scalars['String']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  dispute?: Maybe<BillingDisputes>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoices;
  issueDate: Scalars['NaiveDate']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingDisputes = {
  __typename?: 'BillingDisputes';
  client: CrmCompanies;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  disputedAmount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  invoiceLineItem: BillingInvoiceLineItems;
  reason: Scalars['String']['output'];
  resolutionNotes?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['DateTime']['output']>;
  resolvedBy?: Maybe<AuthUser>;
  status: DisputeStatusEnum;
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingDocuments = {
  __typename?: 'BillingDocuments';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentType: DocumentTypeEnum;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  fileSize?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId: Scalars['UUID']['output'];
  recordType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uploadedBy?: Maybe<AuthUser>;
};

export type BillingInvoiceLineItems = {
  __typename?: 'BillingInvoiceLineItems';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountRate?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoices;
  lineTotal?: Maybe<Scalars['Float']['output']>;
  quantity: Scalars['Float']['output'];
  sourceRecordId?: Maybe<Scalars['UUID']['output']>;
  sourceRecordType?: Maybe<Scalars['String']['output']>;
  taxAmount?: Maybe<Scalars['Float']['output']>;
  taxRate?: Maybe<Scalars['Float']['output']>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  unitPrice: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingInvoices = {
  __typename?: 'BillingInvoices';
  amountOutstanding: Scalars['Float']['output'];
  amountPaid: Scalars['Float']['output'];
  client: CrmCompanies;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<AuthUser>;
  currency?: Maybe<Scalars['String']['output']>;
  discountAmount: Scalars['Float']['output'];
  dueDate: Scalars['NaiveDate']['output'];
  id: Scalars['UUID']['output'];
  invoiceNumber: Scalars['String']['output'];
  issueDate: Scalars['NaiveDate']['output'];
  items: Array<BillingInvoiceLineItems>;
  notes?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentTerms?: Maybe<Scalars['String']['output']>;
  quote?: Maybe<BillingQuotes>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<InvoiceStatusEnum>;
  subtotal: Scalars['Float']['output'];
  taxAmount: Scalars['Float']['output'];
  totalAmount: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingMutations = {
  __typename?: 'BillingMutations';
  addInvoiceLineItem: BillingInvoices;
  createAccountTransaction: BillingAccountTransactions;
  createAccountingSyncLog: BillingAccountingSyncLog;
  createClientAccount: BillingClientAccounts;
  createCreditNote: BillingCreditNotes;
  createDispute: BillingDisputes;
  createDocument: BillingDocuments;
  createInvoice: BillingInvoices;
  createPayment: BillingPayments;
  createQuote: BillingQuotes;
  createRateCard: BillingRateCards;
  createRateRule: BillingRateRules;
  createSurcharge: BillingSurcharges;
  removeAccountTransaction: Scalars['String']['output'];
  removeAccountingSyncLog: Scalars['String']['output'];
  removeClientAccount: Scalars['String']['output'];
  removeCreditNote: Scalars['String']['output'];
  removeDispute: Scalars['String']['output'];
  removeDocument: Scalars['String']['output'];
  removeInvoice: Scalars['String']['output'];
  removeInvoiceLineItem: BillingInvoices;
  removePayment: Scalars['String']['output'];
  removeQuote: Scalars['String']['output'];
  removeRateCard: Scalars['String']['output'];
  removeRateRule: Scalars['String']['output'];
  removeSurcharge: Scalars['String']['output'];
  updateAccountTransactionAmount: BillingAccountTransactions;
  updateAccountTransactionClientAccountId: BillingAccountTransactions;
  updateAccountTransactionDescription: BillingAccountTransactions;
  updateAccountTransactionProcessedByUserId: BillingAccountTransactions;
  updateAccountTransactionReferenceNumber: BillingAccountTransactions;
  updateAccountTransactionRunningBalance: BillingAccountTransactions;
  updateAccountTransactionSourceRecordId: BillingAccountTransactions;
  updateAccountTransactionSourceRecordType: BillingAccountTransactions;
  updateAccountTransactionTransactionDate: BillingAccountTransactions;
  updateAccountTransactionType: BillingAccountTransactions;
  updateAccountingSyncLogErrorMessage: BillingAccountingSyncLog;
  updateAccountingSyncLogExternalId: BillingAccountingSyncLog;
  updateAccountingSyncLogExternalSystem: BillingAccountingSyncLog;
  updateAccountingSyncLogLastSyncAt: BillingAccountingSyncLog;
  updateAccountingSyncLogNextRetryAt: BillingAccountingSyncLog;
  updateAccountingSyncLogRecordId: BillingAccountingSyncLog;
  updateAccountingSyncLogRecordType: BillingAccountingSyncLog;
  updateAccountingSyncLogRequestPayload: BillingAccountingSyncLog;
  updateAccountingSyncLogResponsePayload: BillingAccountingSyncLog;
  updateAccountingSyncLogRetryCount: BillingAccountingSyncLog;
  updateAccountingSyncLogStatus: BillingAccountingSyncLog;
  updateClientAccountAvailableCredit: BillingClientAccounts;
  updateClientAccountClientId: BillingClientAccounts;
  updateClientAccountCreditLimit: BillingClientAccounts;
  updateClientAccountCurrency: BillingClientAccounts;
  updateClientAccountIsCreditApproved: BillingClientAccounts;
  updateClientAccountLastPaymentDate: BillingClientAccounts;
  updateClientAccountPaymentTermsDays: BillingClientAccounts;
  updateClientAccountWalletBalance: BillingClientAccounts;
  updateCreditNoteAmount: BillingCreditNotes;
  updateCreditNoteAppliedAt: BillingCreditNotes;
  updateCreditNoteCreatedByUserId: BillingCreditNotes;
  updateCreditNoteCreditNoteNumber: BillingCreditNotes;
  updateCreditNoteCurrency: BillingCreditNotes;
  updateCreditNoteDisputeId: BillingCreditNotes;
  updateCreditNoteInvoiceId: BillingCreditNotes;
  updateCreditNoteIssueDate: BillingCreditNotes;
  updateCreditNoteNotes: BillingCreditNotes;
  updateCreditNoteReason: BillingCreditNotes;
  updateDisputeClientId: BillingDisputes;
  updateDisputeDisputedAmount: BillingDisputes;
  updateDisputeLineItemId: BillingDisputes;
  updateDisputeReason: BillingDisputes;
  updateDisputeResolutionNotes: BillingDisputes;
  updateDisputeResolvedAt: BillingDisputes;
  updateDisputeResolvedByUserId: BillingDisputes;
  updateDisputeStatus: BillingDisputes;
  updateDisputeSubmittedAt: BillingDisputes;
  updateDocumentDocumentType: BillingDocuments;
  updateDocumentFileName: BillingDocuments;
  updateDocumentFilePath: BillingDocuments;
  updateDocumentFileSize: BillingDocuments;
  updateDocumentMimeType: BillingDocuments;
  updateDocumentRecordId: BillingDocuments;
  updateDocumentRecordType: BillingDocuments;
  updateDocumentUploadedByUserId: BillingDocuments;
  updateInvoiceAmountPaid: BillingInvoices;
  updateInvoiceClientId: BillingInvoices;
  updateInvoiceCreatedByUserId: BillingInvoices;
  updateInvoiceCurrency: BillingInvoices;
  updateInvoiceDiscountAmount: BillingInvoices;
  updateInvoiceDueDate: BillingInvoices;
  updateInvoiceInvoiceNumber: BillingInvoices;
  updateInvoiceIssueDate: BillingInvoices;
  updateInvoiceLineItemDescription: BillingInvoices;
  updateInvoiceLineItemDiscountRate: BillingInvoices;
  updateInvoiceLineItemProductId: BillingInvoices;
  updateInvoiceLineItemQuantity: BillingInvoices;
  updateInvoiceLineItemSourceRecordId: BillingInvoices;
  updateInvoiceLineItemSourceRecordType: BillingInvoices;
  updateInvoiceLineItemTaxRate: BillingInvoices;
  updateInvoiceLineItemUnitPrice: BillingInvoices;
  updateInvoiceNotes: BillingInvoices;
  updateInvoicePaidAt: BillingInvoices;
  updateInvoicePaymentTerms: BillingInvoices;
  updateInvoiceQuoteId: BillingInvoices;
  updateInvoiceSentAt: BillingInvoices;
  updateInvoiceStatus: BillingInvoices;
  updateInvoiceSubtotal: BillingInvoices;
  updateInvoiceTaxAmount: BillingInvoices;
  updateInvoiceTotalAmount: BillingInvoices;
  updatePaymentAmount: BillingPayments;
  updatePaymentCurrency: BillingPayments;
  updatePaymentExchangeRate: BillingPayments;
  updatePaymentFees: BillingPayments;
  updatePaymentGatewayReference: BillingPayments;
  updatePaymentInvoiceId: BillingPayments;
  updatePaymentNotes: BillingPayments;
  updatePaymentPaymentDate: BillingPayments;
  updatePaymentPaymentMethod: BillingPayments;
  updatePaymentProcessedAt: BillingPayments;
  updatePaymentProcessedByUserId: BillingPayments;
  updatePaymentStatus: BillingPayments;
  updatePaymentTransactionId: BillingPayments;
  updateQuoteClientId: BillingQuotes;
  updateQuoteCreatedByUserId: BillingQuotes;
  updateQuoteDestinationDetails: BillingQuotes;
  updateQuoteExpiresAt: BillingQuotes;
  updateQuoteHeight: BillingQuotes;
  updateQuoteLength: BillingQuotes;
  updateQuoteNotes: BillingQuotes;
  updateQuoteOriginDetails: BillingQuotes;
  updateQuoteQuoteNumber: BillingQuotes;
  updateQuoteQuotedPrice: BillingQuotes;
  updateQuoteServiceLevel: BillingQuotes;
  updateQuoteStatus: BillingQuotes;
  updateQuoteWeight: BillingQuotes;
  updateQuoteWidth: BillingQuotes;
  updateRateCardCreatedByUserId: BillingRateCards;
  updateRateCardDescription: BillingRateCards;
  updateRateCardIsActive: BillingRateCards;
  updateRateCardName: BillingRateCards;
  updateRateCardServiceType: BillingRateCards;
  updateRateCardValidFrom: BillingRateCards;
  updateRateCardValidTo: BillingRateCards;
  updateRateRuleCondition: BillingRateRules;
  updateRateRuleIsActive: BillingRateRules;
  updateRateRuleMaxValue: BillingRateRules;
  updateRateRuleMinValue: BillingRateRules;
  updateRateRulePrice: BillingRateRules;
  updateRateRulePricingModel: BillingRateRules;
  updateRateRulePriority: BillingRateRules;
  updateRateRuleRateCardId: BillingRateRules;
  updateRateRuleValue: BillingRateRules;
  updateSurchargeAmount: BillingSurcharges;
  updateSurchargeCalculationMethod: BillingSurcharges;
  updateSurchargeDescription: BillingSurcharges;
  updateSurchargeIsActive: BillingSurcharges;
  updateSurchargeName: BillingSurcharges;
  updateSurchargeType: BillingSurcharges;
  updateSurchargeValidFrom: BillingSurcharges;
  updateSurchargeValidTo: BillingSurcharges;
};


export type BillingMutationsAddInvoiceLineItemArgs = {
  invoiceId: Scalars['UUID']['input'];
  payload: CreateBillingInvoiceLineItemInput;
};


export type BillingMutationsCreateAccountTransactionArgs = {
  payload: CreateAccountTransactionInput;
};


export type BillingMutationsCreateAccountingSyncLogArgs = {
  payload: CreateAccountingSyncLogInput;
};


export type BillingMutationsCreateClientAccountArgs = {
  payload: CreateClientAccountInput;
};


export type BillingMutationsCreateCreditNoteArgs = {
  payload: CreateCreditNoteInput;
};


export type BillingMutationsCreateDisputeArgs = {
  payload: CreateDisputeInput;
};


export type BillingMutationsCreateDocumentArgs = {
  payload: CreateDocumentInput;
};


export type BillingMutationsCreateInvoiceArgs = {
  payload: CreateBillingInvoiceInput;
};


export type BillingMutationsCreatePaymentArgs = {
  payload: CreatePaymentInput;
};


export type BillingMutationsCreateQuoteArgs = {
  payload: CreateQuoteInput;
};


export type BillingMutationsCreateRateCardArgs = {
  payload: CreateRateCardInput;
};


export type BillingMutationsCreateRateRuleArgs = {
  payload: CreateRateRuleInput;
};


export type BillingMutationsCreateSurchargeArgs = {
  payload: CreateSurchargeInput;
};


export type BillingMutationsRemoveAccountTransactionArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveAccountingSyncLogArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveClientAccountArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveCreditNoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveDisputeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveDocumentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveInvoiceLineItemArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemovePaymentArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveQuoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveRateCardArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveRateRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsRemoveSurchargeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountTransactionAmountArgs = {
  amount: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountTransactionClientAccountIdArgs = {
  clientAccountId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountTransactionDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountTransactionProcessedByUserIdArgs = {
  id: Scalars['UUID']['input'];
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateAccountTransactionReferenceNumberArgs = {
  id: Scalars['UUID']['input'];
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateAccountTransactionRunningBalanceArgs = {
  id: Scalars['UUID']['input'];
  runningBalance?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateAccountTransactionSourceRecordIdArgs = {
  id: Scalars['UUID']['input'];
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateAccountTransactionSourceRecordTypeArgs = {
  id: Scalars['UUID']['input'];
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateAccountTransactionTransactionDateArgs = {
  id: Scalars['UUID']['input'];
  transactionDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateAccountTransactionTypeArgs = {
  id: Scalars['UUID']['input'];
  type: TransactionTypeEnum;
};


export type BillingMutationsUpdateAccountingSyncLogErrorMessageArgs = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountingSyncLogExternalIdArgs = {
  externalId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountingSyncLogExternalSystemArgs = {
  externalSystem: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountingSyncLogLastSyncAtArgs = {
  id: Scalars['UUID']['input'];
  lastSyncAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateAccountingSyncLogNextRetryAtArgs = {
  id: Scalars['UUID']['input'];
  nextRetryAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateAccountingSyncLogRecordIdArgs = {
  id: Scalars['UUID']['input'];
  recordId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateAccountingSyncLogRecordTypeArgs = {
  id: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
};


export type BillingMutationsUpdateAccountingSyncLogRequestPayloadArgs = {
  id: Scalars['UUID']['input'];
  requestPayload?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateAccountingSyncLogResponsePayloadArgs = {
  id: Scalars['UUID']['input'];
  responsePayload?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateAccountingSyncLogRetryCountArgs = {
  id: Scalars['UUID']['input'];
  retryCount?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingMutationsUpdateAccountingSyncLogStatusArgs = {
  id: Scalars['UUID']['input'];
  status: SyncStatusEnum;
};


export type BillingMutationsUpdateClientAccountAvailableCreditArgs = {
  availableCredit?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateClientAccountClientIdArgs = {
  clientId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateClientAccountCreditLimitArgs = {
  creditLimit?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateClientAccountCurrencyArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateClientAccountIsCreditApprovedArgs = {
  id: Scalars['UUID']['input'];
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BillingMutationsUpdateClientAccountLastPaymentDateArgs = {
  id: Scalars['UUID']['input'];
  lastPaymentDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};


export type BillingMutationsUpdateClientAccountPaymentTermsDaysArgs = {
  id: Scalars['UUID']['input'];
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingMutationsUpdateClientAccountWalletBalanceArgs = {
  id: Scalars['UUID']['input'];
  walletBalance?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateCreditNoteAmountArgs = {
  amount: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteAppliedAtArgs = {
  appliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteCreatedByUserIdArgs = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteCreditNoteNumberArgs = {
  creditNoteNumber: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteCurrencyArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteDisputeIdArgs = {
  disputeId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteInvoiceIdArgs = {
  id: Scalars['UUID']['input'];
  invoiceId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateCreditNoteIssueDateArgs = {
  id: Scalars['UUID']['input'];
  issueDate: Scalars['NaiveDate']['input'];
};


export type BillingMutationsUpdateCreditNoteNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateCreditNoteReasonArgs = {
  id: Scalars['UUID']['input'];
  reason: Scalars['String']['input'];
};


export type BillingMutationsUpdateDisputeClientIdArgs = {
  clientId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDisputeDisputedAmountArgs = {
  disputedAmount?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDisputeLineItemIdArgs = {
  id: Scalars['UUID']['input'];
  lineItemId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDisputeReasonArgs = {
  id: Scalars['UUID']['input'];
  reason: Scalars['String']['input'];
};


export type BillingMutationsUpdateDisputeResolutionNotesArgs = {
  id: Scalars['UUID']['input'];
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateDisputeResolvedAtArgs = {
  id: Scalars['UUID']['input'];
  resolvedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateDisputeResolvedByUserIdArgs = {
  id: Scalars['UUID']['input'];
  resolvedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateDisputeStatusArgs = {
  id: Scalars['UUID']['input'];
  status: DisputeStatusEnum;
};


export type BillingMutationsUpdateDisputeSubmittedAtArgs = {
  id: Scalars['UUID']['input'];
  submittedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateDocumentDocumentTypeArgs = {
  documentType: DocumentTypeEnum;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDocumentFileNameArgs = {
  fileName: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDocumentFilePathArgs = {
  filePath: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDocumentFileSizeArgs = {
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDocumentMimeTypeArgs = {
  id: Scalars['UUID']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateDocumentRecordIdArgs = {
  id: Scalars['UUID']['input'];
  recordId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateDocumentRecordTypeArgs = {
  id: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
};


export type BillingMutationsUpdateDocumentUploadedByUserIdArgs = {
  id: Scalars['UUID']['input'];
  uploadedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateInvoiceAmountPaidArgs = {
  amountPaid: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceClientIdArgs = {
  clientId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceCreatedByUserIdArgs = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceCurrencyArgs = {
  currency: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceDiscountAmountArgs = {
  discountAmount: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceDueDateArgs = {
  dueDate: Scalars['NaiveDate']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceInvoiceNumberArgs = {
  id: Scalars['UUID']['input'];
  invoiceNumber: Scalars['String']['input'];
};


export type BillingMutationsUpdateInvoiceIssueDateArgs = {
  id: Scalars['UUID']['input'];
  issueDate: Scalars['NaiveDate']['input'];
};


export type BillingMutationsUpdateInvoiceLineItemDescriptionArgs = {
  description: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceLineItemDiscountRateArgs = {
  discountRate?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceLineItemProductIdArgs = {
  id: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateInvoiceLineItemQuantityArgs = {
  id: Scalars['UUID']['input'];
  quantity: Scalars['Float']['input'];
};


export type BillingMutationsUpdateInvoiceLineItemSourceRecordIdArgs = {
  id: Scalars['UUID']['input'];
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateInvoiceLineItemSourceRecordTypeArgs = {
  id: Scalars['UUID']['input'];
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateInvoiceLineItemTaxRateArgs = {
  id: Scalars['UUID']['input'];
  taxRate?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateInvoiceLineItemUnitPriceArgs = {
  id: Scalars['UUID']['input'];
  unitPrice: Scalars['Float']['input'];
};


export type BillingMutationsUpdateInvoiceNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateInvoicePaidAtArgs = {
  id: Scalars['UUID']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateInvoicePaymentTermsArgs = {
  id: Scalars['UUID']['input'];
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateInvoiceQuoteIdArgs = {
  id: Scalars['UUID']['input'];
  quoteId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdateInvoiceSentAtArgs = {
  id: Scalars['UUID']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdateInvoiceStatusArgs = {
  id: Scalars['UUID']['input'];
  status: InvoiceStatusEnum;
};


export type BillingMutationsUpdateInvoiceSubtotalArgs = {
  id: Scalars['UUID']['input'];
  subtotal: Scalars['Float']['input'];
};


export type BillingMutationsUpdateInvoiceTaxAmountArgs = {
  id: Scalars['UUID']['input'];
  taxAmount: Scalars['Float']['input'];
};


export type BillingMutationsUpdateInvoiceTotalAmountArgs = {
  id: Scalars['UUID']['input'];
  totalAmount: Scalars['Float']['input'];
};


export type BillingMutationsUpdatePaymentAmountArgs = {
  amount: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentCurrencyArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentExchangeRateArgs = {
  exchangeRate?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentFeesArgs = {
  fees?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentGatewayReferenceArgs = {
  gatewayReference?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentInvoiceIdArgs = {
  id: Scalars['UUID']['input'];
  invoiceId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdatePaymentNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdatePaymentPaymentDateArgs = {
  id: Scalars['UUID']['input'];
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdatePaymentPaymentMethodArgs = {
  id: Scalars['UUID']['input'];
  paymentMethod: PaymentMethodEnum;
};


export type BillingMutationsUpdatePaymentProcessedAtArgs = {
  id: Scalars['UUID']['input'];
  processedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type BillingMutationsUpdatePaymentProcessedByUserIdArgs = {
  id: Scalars['UUID']['input'];
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};


export type BillingMutationsUpdatePaymentStatusArgs = {
  id: Scalars['UUID']['input'];
  status: PaymentStatusEnum;
};


export type BillingMutationsUpdatePaymentTransactionIdArgs = {
  id: Scalars['UUID']['input'];
  transactionId?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateQuoteClientIdArgs = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateQuoteCreatedByUserIdArgs = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateQuoteDestinationDetailsArgs = {
  destinationDetails: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateQuoteExpiresAtArgs = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateQuoteHeightArgs = {
  height?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateQuoteLengthArgs = {
  id: Scalars['UUID']['input'];
  length?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateQuoteNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateQuoteOriginDetailsArgs = {
  id: Scalars['UUID']['input'];
  originDetails: Scalars['String']['input'];
};


export type BillingMutationsUpdateQuoteQuoteNumberArgs = {
  id: Scalars['UUID']['input'];
  quoteNumber?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateQuoteQuotedPriceArgs = {
  id: Scalars['UUID']['input'];
  quotedPrice: Scalars['Float']['input'];
};


export type BillingMutationsUpdateQuoteServiceLevelArgs = {
  id: Scalars['UUID']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
};


export type BillingMutationsUpdateQuoteStatusArgs = {
  id: Scalars['UUID']['input'];
  status: QuoteStatusEnum;
};


export type BillingMutationsUpdateQuoteWeightArgs = {
  id: Scalars['UUID']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateQuoteWidthArgs = {
  id: Scalars['UUID']['input'];
  width?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateRateCardCreatedByUserIdArgs = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateRateCardDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateRateCardIsActiveArgs = {
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BillingMutationsUpdateRateCardNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type BillingMutationsUpdateRateCardServiceTypeArgs = {
  id: Scalars['UUID']['input'];
  serviceType: ServiceTypeEnum;
};


export type BillingMutationsUpdateRateCardValidFromArgs = {
  id: Scalars['UUID']['input'];
  validFrom: Scalars['NaiveDate']['input'];
};


export type BillingMutationsUpdateRateCardValidToArgs = {
  id: Scalars['UUID']['input'];
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};


export type BillingMutationsUpdateRateRuleConditionArgs = {
  condition: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateRateRuleIsActiveArgs = {
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BillingMutationsUpdateRateRuleMaxValueArgs = {
  id: Scalars['UUID']['input'];
  maxValue?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateRateRuleMinValueArgs = {
  id: Scalars['UUID']['input'];
  minValue?: InputMaybe<Scalars['Float']['input']>;
};


export type BillingMutationsUpdateRateRulePriceArgs = {
  id: Scalars['UUID']['input'];
  price: Scalars['Float']['input'];
};


export type BillingMutationsUpdateRateRulePricingModelArgs = {
  id: Scalars['UUID']['input'];
  pricingModel: PricingModelEnum;
};


export type BillingMutationsUpdateRateRulePriorityArgs = {
  id: Scalars['UUID']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
};


export type BillingMutationsUpdateRateRuleRateCardIdArgs = {
  id: Scalars['UUID']['input'];
  rateCardId: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateRateRuleValueArgs = {
  id: Scalars['UUID']['input'];
  value: Scalars['String']['input'];
};


export type BillingMutationsUpdateSurchargeAmountArgs = {
  amount: Scalars['Float']['input'];
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateSurchargeCalculationMethodArgs = {
  calculationMethod: SurchargeCalculationMethodEnum;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateSurchargeDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type BillingMutationsUpdateSurchargeIsActiveArgs = {
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BillingMutationsUpdateSurchargeNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type BillingMutationsUpdateSurchargeTypeArgs = {
  id: Scalars['UUID']['input'];
  type: Scalars['String']['input'];
};


export type BillingMutationsUpdateSurchargeValidFromArgs = {
  id: Scalars['UUID']['input'];
  validFrom?: InputMaybe<Scalars['NaiveDate']['input']>;
};


export type BillingMutationsUpdateSurchargeValidToArgs = {
  id: Scalars['UUID']['input'];
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type BillingPayments = {
  __typename?: 'BillingPayments';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  exchangeRate?: Maybe<Scalars['Float']['output']>;
  fees?: Maybe<Scalars['Float']['output']>;
  gatewayReference?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  invoice: BillingInvoices;
  netAmount?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: PaymentMethodEnum;
  processedAt?: Maybe<Scalars['DateTime']['output']>;
  processedByUser?: Maybe<AuthUser>;
  status?: Maybe<PaymentStatusEnum>;
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type BillingQueries = {
  __typename?: 'BillingQueries';
  clientAccount?: Maybe<BillingClientAccounts>;
  clientAccounts: Array<BillingClientAccounts>;
  invoice?: Maybe<BillingInvoices>;
  invoices: Array<BillingInvoices>;
  quote?: Maybe<BillingQuotes>;
  quotes: Array<BillingQuotes>;
  rateCard?: Maybe<BillingRateCards>;
  rateCards: Array<BillingRateCards>;
  surcharge?: Maybe<BillingSurcharges>;
  surcharges: Array<BillingSurcharges>;
};


export type BillingQueriesClientAccountArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesClientAccountsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type BillingQueriesInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesInvoicesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type BillingQueriesQuoteArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesQuotesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type BillingQueriesRateCardArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesRateCardsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type BillingQueriesSurchargeArgs = {
  id: Scalars['UUID']['input'];
};


export type BillingQueriesSurchargesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type BillingQuotes = {
  __typename?: 'BillingQuotes';
  client?: Maybe<CrmCompanies>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUser?: Maybe<AuthUser>;
  destinationDetails: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  length?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  originDetails: Scalars['String']['output'];
  quoteNumber?: Maybe<Scalars['String']['output']>;
  quotedPrice: Scalars['Float']['output'];
  serviceLevel?: Maybe<Scalars['String']['output']>;
  status?: Maybe<QuoteStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type BillingRateCards = {
  __typename?: 'BillingRateCards';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUser?: Maybe<AuthUser>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  serviceType: ServiceTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  validFrom: Scalars['NaiveDate']['output'];
  validTo?: Maybe<Scalars['NaiveDate']['output']>;
};

export type BillingRateRules = {
  __typename?: 'BillingRateRules';
  condition: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  maxValue?: Maybe<Scalars['Float']['output']>;
  minValue?: Maybe<Scalars['Float']['output']>;
  price: Scalars['Float']['output'];
  pricingModel: PricingModelEnum;
  priority?: Maybe<Scalars['Int']['output']>;
  rateCard: BillingRateCards;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  value: Scalars['String']['output'];
};

export type BillingSurcharges = {
  __typename?: 'BillingSurcharges';
  amount: Scalars['Float']['output'];
  calculationMethod: SurchargeCalculationMethodEnum;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type CreateAccountTransactionInput = {
  amount: Scalars['Float']['input'];
  clientAccountId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
  runningBalance?: InputMaybe<Scalars['Float']['input']>;
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  transactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  type: TransactionTypeEnum;
};

export type CreateAccountingSyncLogInput = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  externalSystem: Scalars['String']['input'];
  lastSyncAt?: InputMaybe<Scalars['DateTime']['input']>;
  nextRetryAt?: InputMaybe<Scalars['DateTime']['input']>;
  recordId: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
  requestPayload?: InputMaybe<Scalars['String']['input']>;
  responsePayload?: InputMaybe<Scalars['String']['input']>;
  retryCount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<SyncStatusEnum>;
};

export type CreateBillingInvoiceInput = {
  amountPaid?: InputMaybe<Scalars['Float']['input']>;
  clientId: Scalars['UUID']['input'];
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  dueDate: Scalars['NaiveDate']['input'];
  invoiceNumber: Scalars['String']['input'];
  issueDate: Scalars['NaiveDate']['input'];
  items: Array<CreateBillingInvoiceLineItemInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymentTerms?: InputMaybe<Scalars['String']['input']>;
  quoteId?: InputMaybe<Scalars['UUID']['input']>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<InvoiceStatusEnum>;
  subtotal?: InputMaybe<Scalars['Float']['input']>;
  taxAmount?: InputMaybe<Scalars['Float']['input']>;
  totalAmount: Scalars['Float']['input'];
};

export type CreateBillingInvoiceLineItemInput = {
  description: Scalars['String']['input'];
  discountRate?: InputMaybe<Scalars['Float']['input']>;
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Float']['input'];
  sourceRecordId?: InputMaybe<Scalars['UUID']['input']>;
  sourceRecordType?: InputMaybe<Scalars['String']['input']>;
  taxRate?: InputMaybe<Scalars['Float']['input']>;
  unitPrice: Scalars['Float']['input'];
};

export type CreateBinThresholdInput = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationId: Scalars['UUID']['input'];
  maxQuantity: Scalars['Int']['input'];
  minQuantity: Scalars['Int']['input'];
  productId: Scalars['UUID']['input'];
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCampaignInput = {
  budget?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type CreateCarrierInput = {
  contactDetails?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rates: Array<CreateCarrierRateInput>;
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCarrierRateInput = {
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate: Scalars['Decimal']['input'];
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnitEnum>;
};

export type CreateCaseInput = {
  caseNumber: Scalars['String']['input'];
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type CreateClientAccountInput = {
  availableCredit?: InputMaybe<Scalars['Float']['input']>;
  clientId: Scalars['UUID']['input'];
  creditLimit?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  isCreditApproved?: InputMaybe<Scalars['Boolean']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  paymentTermsDays?: InputMaybe<Scalars['Int']['input']>;
  walletBalance?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateCompanyInput = {
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

export type CreateContactInput = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  email: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCreditNoteInput = {
  amount: Scalars['Float']['input'];
  appliedAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  creditNoteNumber: Scalars['String']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  disputeId?: InputMaybe<Scalars['UUID']['input']>;
  invoiceId: Scalars['UUID']['input'];
  issueDate: Scalars['NaiveDate']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
};

export type CreateCrmInvoiceInput = {
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  items: Array<CreateCrmInvoiceItemInput>;
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  total?: InputMaybe<Scalars['Decimal']['input']>;
};

export type CreateCrmInvoiceItemInput = {
  price: Scalars['Decimal']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateCustomerTrackingLinkInput = {
  deliveryTaskId: Scalars['UUID']['input'];
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  trackingToken: Scalars['String']['input'];
};

export type CreateDeliveryRouteInput = {
  driverId: Scalars['UUID']['input'];
  estimatedDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  routeDate: Scalars['NaiveDate']['input'];
  status?: InputMaybe<DeliveryRouteStatusEnum>;
  totalDistanceKm?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateDeliveryTaskInput = {
  deliveryAddress: Scalars['String']['input'];
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  deliveryRouteId: Scalars['UUID']['input'];
  estimatedArrivalTime?: InputMaybe<Scalars['DateTime']['input']>;
  packageId: Scalars['UUID']['input'];
  recipientName?: InputMaybe<Scalars['String']['input']>;
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
  routeSequence: Scalars['Int']['input'];
};

export type CreateDisputeInput = {
  clientId: Scalars['UUID']['input'];
  disputedAmount?: InputMaybe<Scalars['Float']['input']>;
  lineItemId: Scalars['UUID']['input'];
  reason: Scalars['String']['input'];
  resolutionNotes?: InputMaybe<Scalars['String']['input']>;
  resolvedAt?: InputMaybe<Scalars['DateTime']['input']>;
  resolvedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<DisputeStatusEnum>;
  submittedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateDmsProofOfDeliveryInput = {
  deliveryTaskId: Scalars['UUID']['input'];
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  signatureData?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
  type: ProofOfDeliveryTypeEnum;
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDocumentInput = {
  documentType: DocumentTypeEnum;
  fileName: Scalars['String']['input'];
  filePath: Scalars['String']['input'];
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId: Scalars['UUID']['input'];
  recordType: Scalars['String']['input'];
  uploadedByUserId?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateDriverInput = {
  licenseExpiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  licenseNumber: Scalars['String']['input'];
  schedules: Array<CreateDriverScheduleInput>;
  status?: InputMaybe<DriverStatusEnum>;
  userId: Scalars['UUID']['input'];
};

export type CreateDriverLocationInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  driverId: Scalars['UUID']['input'];
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateDriverScheduleInput = {
  endDate: Scalars['NaiveDate']['input'];
  reason?: InputMaybe<DriverScheduleReasonEnum>;
  startDate: Scalars['NaiveDate']['input'];
};

export type CreateExpenseInput = {
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

export type CreateGeofenceEventInput = {
  eventType: GeofenceEventTypeEnum;
  geofenceId: Scalars['UUID']['input'];
  timestamp: Scalars['DateTime']['input'];
  vehicleId: Scalars['UUID']['input'];
};

export type CreateGeofenceInput = {
  coordinates?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateGpsPingInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  timestamp: Scalars['DateTime']['input'];
  vehicleId: Scalars['UUID']['input'];
};

export type CreateInteractionInput = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  contactId: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId: Scalars['UUID']['input'];
};

export type CreateInventoryStockInput = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  lastCountedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  locationId: Scalars['UUID']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
  reservedQuantity: Scalars['Int']['input'];
  status?: InputMaybe<InventoryStockStatusEnum>;
};

export type CreateLeadInput = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  convertedAt?: InputMaybe<Scalars['DateTime']['input']>;
  convertedCompanyId?: InputMaybe<Scalars['UUID']['input']>;
  convertedContactId?: InputMaybe<Scalars['UUID']['input']>;
  convertedOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  email: Scalars['String']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
  leadSource?: InputMaybe<LeadSource>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
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
  parentLocationId?: InputMaybe<Scalars['UUID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type: LocationTypeEnum;
  warehouseId: Scalars['UUID']['input'];
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

export type CreateOpportunityInput = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  dealValue?: InputMaybe<Scalars['Decimal']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lostReason?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
};

export type CreatePackageInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  insuranceValue?: InputMaybe<Scalars['Decimal']['input']>;
  isFragile?: InputMaybe<Scalars['Boolean']['input']>;
  isHazmat?: InputMaybe<Scalars['Boolean']['input']>;
  items: Array<CreatePackageItemInput>;
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
  warehouseId: Scalars['UUID']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type CreatePackageItemInput = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreatePartnerInvoiceInput = {
  carrierId: Scalars['UUID']['input'];
  invoiceDate: Scalars['NaiveDate']['input'];
  invoiceNumber: Scalars['String']['input'];
  items: Array<CreatePartnerInvoiceItemInput>;
  status?: InputMaybe<PartnerInvoiceStatusEnum>;
  totalAmount: Scalars['Decimal']['input'];
};

export type CreatePartnerInvoiceItemInput = {
  amount: Scalars['Decimal']['input'];
  shipmentLegId: Scalars['UUID']['input'];
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  exchangeRate?: InputMaybe<Scalars['Float']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  gatewayReference?: InputMaybe<Scalars['String']['input']>;
  invoiceId: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod: PaymentMethodEnum;
  processedAt?: InputMaybe<Scalars['DateTime']['input']>;
  processedByUserId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<PaymentStatusEnum>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePickBatchInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['UUID']['input']>;
  batchNumber: Scalars['String']['input'];
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  items: Array<CreatePickBatchItemInput>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  status?: InputMaybe<PickBatchStatusEnum>;
  strategy: PickStrategyEnum;
  totalItems?: InputMaybe<Scalars['Int']['input']>;
  warehouseId: Scalars['UUID']['input'];
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreatePickBatchItemInput = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
  salesOrderId: Scalars['UUID']['input'];
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type CreatePutawayRuleInput = {
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

export type CreateQuoteInput = {
  clientId?: InputMaybe<Scalars['UUID']['input']>;
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  destinationDetails: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  originDetails: Scalars['String']['input'];
  quoteNumber?: InputMaybe<Scalars['String']['input']>;
  quotedPrice: Scalars['Float']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuoteStatusEnum>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateRateCardInput = {
  createdByUserId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  serviceType: ServiceTypeEnum;
  validFrom: Scalars['NaiveDate']['input'];
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type CreateRateRuleInput = {
  condition: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  maxValue?: InputMaybe<Scalars['Float']['input']>;
  minValue?: InputMaybe<Scalars['Float']['input']>;
  price: Scalars['Float']['input'];
  pricingModel: PricingModelEnum;
  priority?: InputMaybe<Scalars['Int']['input']>;
  rateCardId: Scalars['UUID']['input'];
  value: Scalars['String']['input'];
};

export type CreateRouteInput = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId: Scalars['UUID']['input'];
};

export type CreateShipmentLegEventInput = {
  eventTimestamp: Scalars['DateTime']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type CreateShipmentLegInput = {
  carrierId?: InputMaybe<Scalars['UUID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  events: Array<CreateShipmentLegEventInput>;
  internalTripId?: InputMaybe<Scalars['UUID']['input']>;
  legSequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatusEnum>;
};

export type CreateSurchargeInput = {
  amount: Scalars['Float']['input'];
  calculationMethod: SurchargeCalculationMethodEnum;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  validFrom?: InputMaybe<Scalars['NaiveDate']['input']>;
  validTo?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type CreateTaskEventInput = {
  deliveryTaskId: Scalars['UUID']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  status: TaskEventStatusEnum;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateTaskInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  items: Array<CreateTaskItemInput>;
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

export type CreateTaskItemInput = {
  batchId?: InputMaybe<Scalars['UUID']['input']>;
  completedAt?: InputMaybe<Scalars['NaiveDateTime']['input']>;
  destinationLocationId?: InputMaybe<Scalars['UUID']['input']>;
  expiryDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['UUID']['input'];
  quantityCompleted: Scalars['Int']['input'];
  quantityRequired: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<Scalars['String']['input']>>;
  sourceLocationId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TaskItemStatusEnum>;
};

export type CreateTmsProofOfDeliveryInput = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp: Scalars['DateTime']['input'];
  tripStopId: Scalars['UUID']['input'];
  type?: InputMaybe<ProofTypeEnum>;
};

export type CreateTripInput = {
  driverId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStatusEnum>;
  stops: Array<CreateTripStopInput>;
  vehicleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateTripStopInput = {
  actualArrivalTime?: InputMaybe<Scalars['DateTime']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['DateTime']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['DateTime']['input']>;
  sequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<TripStopStatusEnum>;
};

export type CreateVehicleInput = {
  capacityVolume?: InputMaybe<Scalars['Float']['input']>;
  capacityWeight?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registrationNumber: Scalars['String']['input'];
  status?: InputMaybe<VehicleStatusEnum>;
};

export type CreateVehicleMaintenanceInput = {
  cost?: InputMaybe<Scalars['Decimal']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDate: Scalars['NaiveDate']['input'];
  serviceType?: InputMaybe<VehicleServiceTypeEnum>;
  vehicleId: Scalars['UUID']['input'];
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

export type CrmAttachments = {
  __typename?: 'CrmAttachments';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId?: Maybe<Scalars['UUID']['output']>;
  recordType?: Maybe<RecordType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCampaigns = {
  __typename?: 'CrmCampaigns';
  budget?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  startDate?: Maybe<Scalars['NaiveDate']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCases = {
  __typename?: 'CrmCases';
  caseNumber: Scalars['String']['output'];
  contact?: Maybe<CrmContacts>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  owner: AuthUser;
  priority?: Maybe<CasePriority>;
  status?: Maybe<CaseStatus>;
  type?: Maybe<CaseType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCompanies = {
  __typename?: 'CrmCompanies';
  annualRevenue?: Maybe<Scalars['Decimal']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<AuthUser>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type CrmContacts = {
  __typename?: 'CrmContacts';
  company?: Maybe<CrmCompanies>;
  companyId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInteractions = {
  __typename?: 'CrmInteractions';
  case?: Maybe<CrmCases>;
  contact: CrmContacts;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  interactionDate?: Maybe<Scalars['DateTime']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  type?: Maybe<InteractionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
};

export type CrmInvoiceItems = {
  __typename?: 'CrmInvoiceItems';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  invoice: CrmInvoices;
  price: Scalars['Decimal']['output'];
  product: CrmProducts;
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInvoices = {
  __typename?: 'CrmInvoices';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dueDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  issueDate?: Maybe<Scalars['NaiveDate']['output']>;
  items: Array<CrmInvoiceItems>;
  opportunity?: Maybe<CrmOpportunities>;
  opportunityId?: Maybe<Scalars['UUID']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<InvoiceStatus>;
  total?: Maybe<Scalars['Decimal']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CrmInvoicesItemsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmLeads = {
  __typename?: 'CrmLeads';
  campaign?: Maybe<CrmCampaigns>;
  convertedAt?: Maybe<Scalars['DateTime']['output']>;
  convertedContact?: Maybe<CrmContacts>;
  convertedOpportunity?: Maybe<CrmOpportunities>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  leadScore?: Maybe<Scalars['Int']['output']>;
  leadSource?: Maybe<LeadSource>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  status?: Maybe<LeadStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmMutations = {
  __typename?: 'CrmMutations';
  addInvoiceItem: CrmInvoices;
  createCampaign: CrmCampaigns;
  createCase: CrmCases;
  createCompany: CrmCompanies;
  createContact: CrmContacts;
  createInteraction: CrmInteractions;
  createInvoice: CrmInvoices;
  createLead: CrmLeads;
  createNotification: CrmNotifications;
  createOpportunity: CrmOpportunities;
  createProduct: CrmProducts;
  createTag: CrmTags;
  removeAttachment: Scalars['String']['output'];
  removeCampaign: Scalars['String']['output'];
  removeCase: Scalars['String']['output'];
  removeCompany: Scalars['String']['output'];
  removeContact: Scalars['String']['output'];
  removeInteraction: Scalars['String']['output'];
  removeInvoice: Scalars['String']['output'];
  removeInvoiceItem: CrmInvoices;
  removeLead: Scalars['String']['output'];
  removeNotification: Scalars['String']['output'];
  removeOpportunity: Scalars['String']['output'];
  removeProduct: Scalars['String']['output'];
  removeTag: Scalars['String']['output'];
  updateCampaignBudget: CrmCampaigns;
  updateCampaignEndDate: CrmCampaigns;
  updateCampaignName: CrmCampaigns;
  updateCampaignStartDate: CrmCampaigns;
  updateCaseContactId: CrmCases;
  updateCaseDescription: CrmCases;
  updateCaseNumber: CrmCases;
  updateCaseOwnerId: CrmCases;
  updateCasePriority: CrmCases;
  updateCaseStatus: CrmCases;
  updateCaseType: CrmCases;
  updateCompanyAnnualRevenue: CrmCompanies;
  updateCompanyCity: CrmCompanies;
  updateCompanyCountry: CrmCompanies;
  updateCompanyIndustry: CrmCompanies;
  updateCompanyName: CrmCompanies;
  updateCompanyOwnerId: CrmCompanies;
  updateCompanyPhoneNumber: CrmCompanies;
  updateCompanyPostalCode: CrmCompanies;
  updateCompanyState: CrmCompanies;
  updateCompanyStreet: CrmCompanies;
  updateCompanyWebsite: CrmCompanies;
  updateContactCompanyId: CrmContacts;
  updateContactEmail: CrmContacts;
  updateContactJobTitle: CrmContacts;
  updateContactName: CrmContacts;
  updateContactOwnerId: CrmContacts;
  updateContactPhoneNumber: CrmContacts;
  updateInteractionCaseId: CrmInteractions;
  updateInteractionContactId: CrmInteractions;
  updateInteractionInteractionDate: CrmInteractions;
  updateInteractionNotes: CrmInteractions;
  updateInteractionOutcome: CrmInteractions;
  updateInteractionType: CrmInteractions;
  updateInteractionUserId: CrmInteractions;
  updateInvoiceDueDate: CrmInvoices;
  updateInvoiceIssueDate: CrmInvoices;
  updateInvoiceOpportunityId: CrmInvoices;
  updateInvoicePaidAt: CrmInvoices;
  updateInvoicePaymentMethod: CrmInvoices;
  updateInvoiceSentAt: CrmInvoices;
  updateInvoiceStatus: CrmInvoices;
  updateInvoiceTotal: CrmInvoices;
  updateLeadCampaignId: CrmLeads;
  updateLeadConvertedAt: CrmLeads;
  updateLeadConvertedCompanyId: CrmLeads;
  updateLeadConvertedContactId: CrmLeads;
  updateLeadConvertedOpportunityId: CrmLeads;
  updateLeadEmail: CrmLeads;
  updateLeadLeadScore: CrmLeads;
  updateLeadLeadSource: CrmLeads;
  updateLeadName: CrmLeads;
  updateLeadOwnerId: CrmLeads;
  updateLeadStatus: CrmLeads;
  updateNotificationIsRead: CrmNotifications;
  updateNotificationLink: CrmNotifications;
  updateNotificationMessage: CrmNotifications;
  updateNotificationUserId: CrmNotifications;
  updateOpportunityCampaignId: CrmOpportunities;
  updateOpportunityCompanyId: CrmOpportunities;
  updateOpportunityContactId: CrmOpportunities;
  updateOpportunityDealValue: CrmOpportunities;
  updateOpportunityExpectedCloseDate: CrmOpportunities;
  updateOpportunityLostReason: CrmOpportunities;
  updateOpportunityName: CrmOpportunities;
  updateOpportunityOwnerId: CrmOpportunities;
  updateOpportunityProbability: CrmOpportunities;
  updateOpportunitySource: CrmOpportunities;
  updateOpportunityStage: CrmOpportunities;
  updateProductDescription: CrmProducts;
  updateProductName: CrmProducts;
  updateProductPrice: CrmProducts;
  updateProductSku: CrmProducts;
  updateProductType: CrmProducts;
  updateTagName: CrmTags;
  uploadAttachment: CrmAttachments;
};


export type CrmMutationsAddInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateCrmInvoiceItemInput;
};


export type CrmMutationsCreateCampaignArgs = {
  payload: CreateCampaignInput;
};


export type CrmMutationsCreateCaseArgs = {
  payload: CreateCaseInput;
};


export type CrmMutationsCreateCompanyArgs = {
  payload: CreateCompanyInput;
};


export type CrmMutationsCreateContactArgs = {
  payload: CreateContactInput;
};


export type CrmMutationsCreateInteractionArgs = {
  payload: CreateInteractionInput;
};


export type CrmMutationsCreateInvoiceArgs = {
  payload: CreateCrmInvoiceInput;
};


export type CrmMutationsCreateLeadArgs = {
  payload: CreateLeadInput;
};


export type CrmMutationsCreateNotificationArgs = {
  payload: CreateNotificationInput;
};


export type CrmMutationsCreateOpportunityArgs = {
  payload: CreateOpportunityInput;
};


export type CrmMutationsCreateProductArgs = {
  payload: CreateProductInput;
};


export type CrmMutationsCreateTagArgs = {
  payload: CreateTagInput;
};


export type CrmMutationsRemoveAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInvoiceItemArgs = {
  itemId: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveLeadArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveNotificationArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveOpportunityArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveProductArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveTagArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignBudgetArgs = {
  budget: Scalars['Decimal']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignEndDateArgs = {
  endDate: Scalars['NaiveDate']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateCampaignStartDateArgs = {
  id: Scalars['UUID']['input'];
  startDate: Scalars['NaiveDate']['input'];
};


export type CrmMutationsUpdateCaseContactIdArgs = {
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseNumberArgs = {
  caseNumber: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCasePriorityArgs = {
  id: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
};


export type CrmMutationsUpdateCaseStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<CaseStatus>;
};


export type CrmMutationsUpdateCaseTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<CaseType>;
};


export type CrmMutationsUpdateCompanyAnnualRevenueArgs = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyCityArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyCountryArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyIndustryArgs = {
  id: Scalars['UUID']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateCompanyOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
};


export type CrmMutationsUpdateCompanyPhoneNumberArgs = {
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyPostalCodeArgs = {
  id: Scalars['UUID']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyStateArgs = {
  id: Scalars['UUID']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyStreetArgs = {
  id: Scalars['UUID']['input'];
  street?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyWebsiteArgs = {
  id: Scalars['UUID']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateContactCompanyIdArgs = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactEmailArgs = {
  email: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactJobTitleArgs = {
  id: Scalars['UUID']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateContactNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateContactOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactPhoneNumberArgs = {
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionCaseIdArgs = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInteractionContactIdArgs = {
  contactId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInteractionInteractionDateArgs = {
  id: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInteractionNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionOutcomeArgs = {
  id: Scalars['UUID']['input'];
  outcome?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<InteractionType>;
};


export type CrmMutationsUpdateInteractionUserIdArgs = {
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInvoiceDueDateArgs = {
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInvoiceIssueDateArgs = {
  id: Scalars['UUID']['input'];
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};


export type CrmMutationsUpdateInvoiceOpportunityIdArgs = {
  id: Scalars['UUID']['input'];
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
};


export type CrmMutationsUpdateInvoicePaidAtArgs = {
  id: Scalars['UUID']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInvoicePaymentMethodArgs = {
  id: Scalars['UUID']['input'];
  paymentMethod?: InputMaybe<PaymentMethod>;
};


export type CrmMutationsUpdateInvoiceSentAtArgs = {
  id: Scalars['UUID']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInvoiceStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<InvoiceStatus>;
};


export type CrmMutationsUpdateInvoiceTotalArgs = {
  id: Scalars['UUID']['input'];
  total?: InputMaybe<Scalars['Decimal']['input']>;
};


export type CrmMutationsUpdateLeadCampaignIdArgs = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedAtArgs = {
  convertedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedCompanyIdArgs = {
  convertedCompanyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedContactIdArgs = {
  convertedContactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedOpportunityIdArgs = {
  convertedOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadEmailArgs = {
  email: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadLeadScoreArgs = {
  id: Scalars['UUID']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmMutationsUpdateLeadLeadSourceArgs = {
  id: Scalars['UUID']['input'];
  leadSource?: InputMaybe<LeadSource>;
};


export type CrmMutationsUpdateLeadNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateLeadOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<LeadStatus>;
};


export type CrmMutationsUpdateNotificationIsReadArgs = {
  id: Scalars['UUID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CrmMutationsUpdateNotificationLinkArgs = {
  id: Scalars['UUID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateNotificationMessageArgs = {
  id: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
};


export type CrmMutationsUpdateNotificationUserIdArgs = {
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityCampaignIdArgs = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityCompanyIdArgs = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityContactIdArgs = {
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityDealValueArgs = {
  dealValue?: InputMaybe<Scalars['Decimal']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityExpectedCloseDateArgs = {
  expectedCloseDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityLostReasonArgs = {
  id: Scalars['UUID']['input'];
  lostReason?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateOpportunityNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateOpportunityOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityProbabilityArgs = {
  id: Scalars['UUID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
};


export type CrmMutationsUpdateOpportunitySourceArgs = {
  id: Scalars['UUID']['input'];
  source?: InputMaybe<OpportunitySource>;
};


export type CrmMutationsUpdateOpportunityStageArgs = {
  id: Scalars['UUID']['input'];
  stage?: InputMaybe<OpportunityStage>;
};


export type CrmMutationsUpdateProductDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateProductNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateProductPriceArgs = {
  id: Scalars['UUID']['input'];
  price: Scalars['Decimal']['input'];
};


export type CrmMutationsUpdateProductSkuArgs = {
  id: Scalars['UUID']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateProductTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<ProductType>;
};


export type CrmMutationsUpdateTagNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUploadAttachmentArgs = {
  file: Scalars['Upload']['input'];
  recordId: Scalars['UUID']['input'];
  recordType: RecordType;
};

export type CrmNotifications = {
  __typename?: 'CrmNotifications';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isRead?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
};

export type CrmOpportunities = {
  __typename?: 'CrmOpportunities';
  campaign?: Maybe<CrmCampaigns>;
  company?: Maybe<CrmCompanies>;
  contact?: Maybe<CrmContacts>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dealValue?: Maybe<Scalars['Decimal']['output']>;
  expectedCloseDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lostReason?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  probability?: Maybe<Scalars['Float']['output']>;
  products: Array<CrmProducts>;
  source?: Maybe<OpportunitySource>;
  stage?: Maybe<OpportunityStage>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CrmOpportunitiesProductsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmProducts = {
  __typename?: 'CrmProducts';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmQueries = {
  __typename?: 'CrmQueries';
  attachment?: Maybe<CrmAttachments>;
  attachments: Array<CrmAttachments>;
  campaign?: Maybe<CrmCampaigns>;
  campaigns: Array<CrmCampaigns>;
  case?: Maybe<CrmCases>;
  cases: Array<CrmCases>;
  companies: Array<CrmCompanies>;
  company?: Maybe<CrmCompanies>;
  contact?: Maybe<CrmContacts>;
  contacts: Array<CrmContacts>;
  interaction?: Maybe<CrmInteractions>;
  interactions: Array<CrmInteractions>;
  invoice?: Maybe<CrmInvoices>;
  invoices: Array<CrmInvoices>;
  lead?: Maybe<CrmLeads>;
  leads: Array<CrmLeads>;
  notification?: Maybe<CrmNotifications>;
  notifications: Array<CrmNotifications>;
  opportunities: Array<CrmOpportunities>;
  opportunity?: Maybe<CrmOpportunities>;
  product?: Maybe<CrmProducts>;
  products: Array<CrmProducts>;
  tag?: Maybe<CrmTags>;
  tags: Array<CrmTags>;
};


export type CrmQueriesAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesAttachmentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCampaignsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCasesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCompaniesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesContactsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInteractionsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInvoicesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesLeadArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesLeadsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesNotificationArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesNotificationsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesOpportunitiesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesOpportunityArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesProductArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesProductsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesTagArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesTagsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmTags = {
  __typename?: 'CrmTags';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type DmsCustomerTrackingLinks = {
  __typename?: 'DmsCustomerTrackingLinks';
  accessCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryTask: DmsDeliveryTasks;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastAccessedAt?: Maybe<Scalars['DateTime']['output']>;
  trackingToken: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DmsDeliveryRoutes = {
  __typename?: 'DmsDeliveryRoutes';
  actualDurationMinutes?: Maybe<Scalars['Int']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driver: TmsDrivers;
  estimatedDurationMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  routeDate: Scalars['NaiveDate']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<DeliveryRouteStatusEnum>;
  totalDistanceKm?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DmsDeliveryTasks = {
  __typename?: 'DmsDeliveryTasks';
  actualArrivalTime?: Maybe<Scalars['DateTime']['output']>;
  attemptCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryAddress: Scalars['String']['output'];
  deliveryInstructions?: Maybe<Scalars['String']['output']>;
  deliveryRoute: DmsDeliveryRoutes;
  deliveryTime?: Maybe<Scalars['DateTime']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['DateTime']['output']>;
  failureReason?: Maybe<DeliveryFailureReasonEnum>;
  id: Scalars['UUID']['output'];
  package: WmsPackages;
  recipientName?: Maybe<Scalars['String']['output']>;
  recipientPhone?: Maybe<Scalars['String']['output']>;
  routeSequence: Scalars['Int']['output'];
  status?: Maybe<DeliveryTaskStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DmsDriverLocations = {
  __typename?: 'DmsDriverLocations';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driver: TmsDrivers;
  heading?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  speedKmh?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DmsMutations = {
  __typename?: 'DmsMutations';
  createCustomerTrackingLink: DmsCustomerTrackingLinks;
  createDeliveryRoute: DmsDeliveryRoutes;
  createDeliveryTask: DmsDeliveryTasks;
  createDriverLocation: DmsDriverLocations;
  createProofOfDelivery: DmsProofOfDeliveries;
  createTaskEvent: DmsTaskEvents;
  removeCustomerTrackingLink: Scalars['String']['output'];
  removeDeliveryRoute: Scalars['String']['output'];
  removeDeliveryTask: Scalars['String']['output'];
  removeDriverLocation: Scalars['String']['output'];
  removeProofOfDelivery: Scalars['String']['output'];
  removeTaskEvent: Scalars['String']['output'];
  updateCustomerTrackingLinkAccessCount: DmsCustomerTrackingLinks;
  updateCustomerTrackingLinkDeliveryTaskId: DmsCustomerTrackingLinks;
  updateCustomerTrackingLinkExpiresAt: DmsCustomerTrackingLinks;
  updateCustomerTrackingLinkIsActive: DmsCustomerTrackingLinks;
  updateCustomerTrackingLinkLastAccessedAt: DmsCustomerTrackingLinks;
  updateCustomerTrackingLinkTrackingToken: DmsCustomerTrackingLinks;
  updateDeliveryRouteActualDurationMinutes: DmsDeliveryRoutes;
  updateDeliveryRouteCompletedAt: DmsDeliveryRoutes;
  updateDeliveryRouteDriverId: DmsDeliveryRoutes;
  updateDeliveryRouteEstimatedDurationMinutes: DmsDeliveryRoutes;
  updateDeliveryRouteOptimizedRouteData: DmsDeliveryRoutes;
  updateDeliveryRouteRouteDate: DmsDeliveryRoutes;
  updateDeliveryRouteStartedAt: DmsDeliveryRoutes;
  updateDeliveryRouteStatus: DmsDeliveryRoutes;
  updateDeliveryRouteTotalDistanceKm: DmsDeliveryRoutes;
  updateDeliveryTaskActualArrivalTime: DmsDeliveryTasks;
  updateDeliveryTaskAttemptCount: DmsDeliveryTasks;
  updateDeliveryTaskDeliveryAddress: DmsDeliveryTasks;
  updateDeliveryTaskDeliveryInstructions: DmsDeliveryTasks;
  updateDeliveryTaskDeliveryRouteId: DmsDeliveryTasks;
  updateDeliveryTaskDeliveryTime: DmsDeliveryTasks;
  updateDeliveryTaskEstimatedArrivalTime: DmsDeliveryTasks;
  updateDeliveryTaskFailureReason: DmsDeliveryTasks;
  updateDeliveryTaskPackageId: DmsDeliveryTasks;
  updateDeliveryTaskRecipientName: DmsDeliveryTasks;
  updateDeliveryTaskRecipientPhone: DmsDeliveryTasks;
  updateDeliveryTaskRouteSequence: DmsDeliveryTasks;
  updateDeliveryTaskStatus: DmsDeliveryTasks;
  updateDriverLocationAccuracy: DmsDriverLocations;
  updateDriverLocationAltitude: DmsDriverLocations;
  updateDriverLocationDriverId: DmsDriverLocations;
  updateDriverLocationHeading: DmsDriverLocations;
  updateDriverLocationLatitude: DmsDriverLocations;
  updateDriverLocationLongitude: DmsDriverLocations;
  updateDriverLocationPosition: DmsDriverLocations;
  updateDriverLocationSpeedKmh: DmsDriverLocations;
  updateDriverLocationTimestamp: DmsDriverLocations;
  updateProofOfDeliveryDeliveryTaskId: DmsProofOfDeliveries;
  updateProofOfDeliveryFilePath: DmsProofOfDeliveries;
  updateProofOfDeliveryLatitude: DmsProofOfDeliveries;
  updateProofOfDeliveryLongitude: DmsProofOfDeliveries;
  updateProofOfDeliveryRecipientName: DmsProofOfDeliveries;
  updateProofOfDeliverySignatureData: DmsProofOfDeliveries;
  updateProofOfDeliveryTimestamp: DmsProofOfDeliveries;
  updateProofOfDeliveryType: DmsProofOfDeliveries;
  updateProofOfDeliveryVerificationCode: DmsProofOfDeliveries;
  updateTaskEventDeliveryTaskId: DmsTaskEvents;
  updateTaskEventLatitude: DmsTaskEvents;
  updateTaskEventLongitude: DmsTaskEvents;
  updateTaskEventNotes: DmsTaskEvents;
  updateTaskEventReason: DmsTaskEvents;
  updateTaskEventStatus: DmsTaskEvents;
  updateTaskEventTimestamp: DmsTaskEvents;
};


export type DmsMutationsCreateCustomerTrackingLinkArgs = {
  payload: CreateCustomerTrackingLinkInput;
};


export type DmsMutationsCreateDeliveryRouteArgs = {
  payload: CreateDeliveryRouteInput;
};


export type DmsMutationsCreateDeliveryTaskArgs = {
  payload: CreateDeliveryTaskInput;
};


export type DmsMutationsCreateDriverLocationArgs = {
  payload: CreateDriverLocationInput;
};


export type DmsMutationsCreateProofOfDeliveryArgs = {
  payload: CreateDmsProofOfDeliveryInput;
};


export type DmsMutationsCreateTaskEventArgs = {
  payload: CreateTaskEventInput;
};


export type DmsMutationsRemoveCustomerTrackingLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsRemoveDeliveryRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsRemoveDeliveryTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsRemoveDriverLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsRemoveProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsRemoveTaskEventArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateCustomerTrackingLinkAccessCountArgs = {
  accessCount?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateCustomerTrackingLinkDeliveryTaskIdArgs = {
  deliveryTaskId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateCustomerTrackingLinkExpiresAtArgs = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateCustomerTrackingLinkIsActiveArgs = {
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};


export type DmsMutationsUpdateCustomerTrackingLinkLastAccessedAtArgs = {
  id: Scalars['UUID']['input'];
  lastAccessedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type DmsMutationsUpdateCustomerTrackingLinkTrackingTokenArgs = {
  id: Scalars['UUID']['input'];
  trackingToken: Scalars['String']['input'];
};


export type DmsMutationsUpdateDeliveryRouteActualDurationMinutesArgs = {
  actualDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryRouteCompletedAtArgs = {
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryRouteDriverIdArgs = {
  driverId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryRouteEstimatedDurationMinutesArgs = {
  estimatedDurationMinutes?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryRouteOptimizedRouteDataArgs = {
  id: Scalars['UUID']['input'];
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateDeliveryRouteRouteDateArgs = {
  id: Scalars['UUID']['input'];
  routeDate: Scalars['NaiveDate']['input'];
};


export type DmsMutationsUpdateDeliveryRouteStartedAtArgs = {
  id: Scalars['UUID']['input'];
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type DmsMutationsUpdateDeliveryRouteStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<DeliveryRouteStatusEnum>;
};


export type DmsMutationsUpdateDeliveryRouteTotalDistanceKmArgs = {
  id: Scalars['UUID']['input'];
  totalDistanceKm?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateDeliveryTaskActualArrivalTimeArgs = {
  actualArrivalTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskAttemptCountArgs = {
  attemptCount?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskDeliveryAddressArgs = {
  deliveryAddress: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskDeliveryInstructionsArgs = {
  deliveryInstructions?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskDeliveryRouteIdArgs = {
  deliveryRouteId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskDeliveryTimeArgs = {
  deliveryTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskEstimatedArrivalTimeArgs = {
  estimatedArrivalTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskFailureReasonArgs = {
  failureReason?: InputMaybe<DeliveryFailureReasonEnum>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskPackageIdArgs = {
  id: Scalars['UUID']['input'];
  packageId: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDeliveryTaskRecipientNameArgs = {
  id: Scalars['UUID']['input'];
  recipientName?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateDeliveryTaskRecipientPhoneArgs = {
  id: Scalars['UUID']['input'];
  recipientPhone?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateDeliveryTaskRouteSequenceArgs = {
  id: Scalars['UUID']['input'];
  routeSequence: Scalars['Int']['input'];
};


export type DmsMutationsUpdateDeliveryTaskStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<DeliveryTaskStatusEnum>;
};


export type DmsMutationsUpdateDriverLocationAccuracyArgs = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDriverLocationAltitudeArgs = {
  altitude?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDriverLocationDriverIdArgs = {
  driverId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDriverLocationHeadingArgs = {
  heading?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateDriverLocationLatitudeArgs = {
  id: Scalars['UUID']['input'];
  latitude: Scalars['Float']['input'];
};


export type DmsMutationsUpdateDriverLocationLongitudeArgs = {
  id: Scalars['UUID']['input'];
  longitude: Scalars['Float']['input'];
};


export type DmsMutationsUpdateDriverLocationPositionArgs = {
  altitude?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['UUID']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};


export type DmsMutationsUpdateDriverLocationSpeedKmhArgs = {
  id: Scalars['UUID']['input'];
  speedKmh?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateDriverLocationTimestampArgs = {
  id: Scalars['UUID']['input'];
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};


export type DmsMutationsUpdateProofOfDeliveryDeliveryTaskIdArgs = {
  deliveryTaskId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateProofOfDeliveryFilePathArgs = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateProofOfDeliveryLatitudeArgs = {
  id: Scalars['UUID']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateProofOfDeliveryLongitudeArgs = {
  id: Scalars['UUID']['input'];
  longitude?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateProofOfDeliveryRecipientNameArgs = {
  id: Scalars['UUID']['input'];
  recipientName?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateProofOfDeliverySignatureDataArgs = {
  id: Scalars['UUID']['input'];
  signatureData?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateProofOfDeliveryTimestampArgs = {
  id: Scalars['UUID']['input'];
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};


export type DmsMutationsUpdateProofOfDeliveryTypeArgs = {
  id: Scalars['UUID']['input'];
  type: ProofOfDeliveryTypeEnum;
};


export type DmsMutationsUpdateProofOfDeliveryVerificationCodeArgs = {
  id: Scalars['UUID']['input'];
  verificationCode?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateTaskEventDeliveryTaskIdArgs = {
  deliveryTaskId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type DmsMutationsUpdateTaskEventLatitudeArgs = {
  id: Scalars['UUID']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateTaskEventLongitudeArgs = {
  id: Scalars['UUID']['input'];
  longitude?: InputMaybe<Scalars['Float']['input']>;
};


export type DmsMutationsUpdateTaskEventNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateTaskEventReasonArgs = {
  id: Scalars['UUID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type DmsMutationsUpdateTaskEventStatusArgs = {
  id: Scalars['UUID']['input'];
  status: TaskEventStatusEnum;
};


export type DmsMutationsUpdateTaskEventTimestampArgs = {
  id: Scalars['UUID']['input'];
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DmsProofOfDeliveries = {
  __typename?: 'DmsProofOfDeliveries';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryTask: DmsDeliveryTasks;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  recipientName?: Maybe<Scalars['String']['output']>;
  signatureData?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  type: ProofOfDeliveryTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  verificationCode?: Maybe<Scalars['String']['output']>;
};

export type DmsQueries = {
  __typename?: 'DmsQueries';
  customerTrackingLink?: Maybe<DmsCustomerTrackingLinks>;
  customerTrackingLinks: Array<DmsCustomerTrackingLinks>;
  deliveryRoute?: Maybe<DmsDeliveryRoutes>;
  deliveryRoutes: Array<DmsDeliveryRoutes>;
  deliveryTask?: Maybe<DmsDeliveryTasks>;
  deliveryTasks: Array<DmsDeliveryTasks>;
  driverLocation?: Maybe<DmsDriverLocations>;
  driverLocations: Array<DmsDriverLocations>;
  proofOfDeliveries: Array<DmsProofOfDeliveries>;
  proofOfDelivery?: Maybe<DmsProofOfDeliveries>;
  taskEvent?: Maybe<DmsTaskEvents>;
  taskEvents: Array<DmsTaskEvents>;
};


export type DmsQueriesCustomerTrackingLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesCustomerTrackingLinksArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type DmsQueriesDeliveryRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDeliveryRoutesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type DmsQueriesDeliveryTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDeliveryTasksArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type DmsQueriesDriverLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesDriverLocationsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type DmsQueriesProofOfDeliveriesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type DmsQueriesProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesTaskEventArgs = {
  id: Scalars['UUID']['input'];
};


export type DmsQueriesTaskEventsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type DmsTaskEvents = {
  __typename?: 'DmsTaskEvents';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryTask: DmsDeliveryTasks;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status: TaskEventStatusEnum;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type ImsInboundShipmentItems = {
  __typename?: 'ImsInboundShipmentItems';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  discrepancyNotes?: Maybe<Scalars['String']['output']>;
  discrepancyQuantity?: Maybe<Scalars['Int']['output']>;
  expectedQuantity: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  inboundShipment: ImsInboundShipments;
  product: ImsProducts;
  receivedQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsInboundShipments = {
  __typename?: 'ImsInboundShipments';
  actualArrivalDate?: Maybe<Scalars['NaiveDate']['output']>;
  client?: Maybe<CrmCompanies>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expectedArrivalDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  items: Array<ImsInboundShipmentItems>;
  status?: Maybe<InboundShipmentStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse: WmsWarehouses;
};

export type ImsInventoryAdjustments = {
  __typename?: 'ImsInventoryAdjustments';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  product: ImsProducts;
  quantityChange: Scalars['Int']['output'];
  reason?: Maybe<InventoryAdjustmentReasonEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
  warehouse: WmsWarehouses;
};

export type ImsInventoryBatches = {
  __typename?: 'ImsInventoryBatches';
  batchNumber: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expirationDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProducts;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsOutboundShipmentItems = {
  __typename?: 'ImsOutboundShipmentItems';
  batch?: Maybe<ImsInventoryBatches>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  outboundShipment: ImsOutboundShipments;
  product: ImsProducts;
  quantityShipped: Scalars['Int']['output'];
  salesOrderItem: ImsSalesOrderItems;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsOutboundShipments = {
  __typename?: 'ImsOutboundShipments';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  items: Array<ImsOutboundShipmentItems>;
  salesOrder: ImsSalesOrders;
  status?: Maybe<OutboundShipmentStatusEnum>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse: WmsWarehouses;
};

export type ImsProducts = {
  __typename?: 'ImsProducts';
  barcode?: Maybe<Scalars['String']['output']>;
  client?: Maybe<CrmCompanies>;
  costPrice?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  length?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  sku: Scalars['String']['output'];
  status?: Maybe<ProductStatusEnum>;
  supplier?: Maybe<ImsSuppliers>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type ImsReturns = {
  __typename?: 'ImsReturns';
  client: CrmCompanies;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  returnNumber: Scalars['String']['output'];
  salesOrder?: Maybe<ImsSalesOrders>;
  status?: Maybe<ReturnStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsSalesOrderItems = {
  __typename?: 'ImsSalesOrderItems';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  product: ImsProducts;
  quantityOrdered: Scalars['Int']['output'];
  salesOrder: ImsSalesOrders;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsSalesOrders = {
  __typename?: 'ImsSalesOrders';
  client: CrmCompanies;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  opportunities?: Maybe<CrmOpportunities>;
  orderNumber: Scalars['String']['output'];
  shippingAddress?: Maybe<Scalars['String']['output']>;
  status?: Maybe<SalesOrderStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsStockTransfer = {
  __typename?: 'ImsStockTransfer';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  destinationWarehouse: WmsWarehouses;
  id: Scalars['UUID']['output'];
  product: ImsProducts;
  quantity: Scalars['Int']['output'];
  sourceWarehouse: WmsWarehouses;
  status?: Maybe<StockTransferStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ImsSuppliers = {
  __typename?: 'ImsSuppliers';
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum InboundShipmentStatusEnum {
  Arrived = 'ARRIVED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

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

export type Model = {
  __typename?: 'Model';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  threshold: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutations = {
  __typename?: 'Mutations';
  auth: AuthMutation;
  billing: BillingMutations;
  crm: CrmMutations;
  dms: DmsMutations;
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

export type RefreshSessionResponse = {
  __typename?: 'RefreshSessionResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export enum ReturnStatusEnum {
  Approved = 'APPROVED',
  Processed = 'PROCESSED',
  Received = 'RECEIVED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export type RevokeSessionResponse = {
  __typename?: 'RevokeSessionResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

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

export type SignInEmailInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type SignUpEmailInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
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

export type TmsCarrierRates = {
  __typename?: 'TmsCarrierRates';
  carrier: TmsCarriers;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  destination?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  rate: Scalars['Decimal']['output'];
  serviceType?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<CarrierRateUnitEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsCarriers = {
  __typename?: 'TmsCarriers';
  contactDetails?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  rates: Array<TmsCarrierRates>;
  servicesOffered?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type TmsCarriersRatesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type TmsDriverSchedules = {
  __typename?: 'TmsDriverSchedules';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driver: TmsDrivers;
  endDate: Scalars['NaiveDate']['output'];
  id: Scalars['UUID']['output'];
  reason?: Maybe<DriverScheduleReasonEnum>;
  startDate: Scalars['NaiveDate']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsDrivers = {
  __typename?: 'TmsDrivers';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  licenseExpiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  licenseNumber: Scalars['String']['output'];
  status?: Maybe<DriverStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsExpenses = {
  __typename?: 'TmsExpenses';
  amount: Scalars['Decimal']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<CurrencyEnum>;
  fuelQuantity?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  odometerReading?: Maybe<Scalars['Int']['output']>;
  receiptUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ExpenseStatusEnum>;
  type?: Maybe<ExpenseTypeEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsGeofence = {
  __typename?: 'TmsGeofence';
  coordinates?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  events: Array<TmsGeofenceEvent>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type TmsGeofenceEventsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type TmsGeofenceEvent = {
  __typename?: 'TmsGeofenceEvent';
  eventType: GeofenceEventTypeEnum;
  id: Scalars['UUID']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type TmsGpsPings = {
  __typename?: 'TmsGpsPings';
  id: Scalars['UUID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type TmsMutations = {
  __typename?: 'TmsMutations';
  addCarrierRate: TmsCarriers;
  addDriverSchedule: TmsDrivers;
  addPartnerInvoiceItem: TmsPartnerInvoices;
  addShipmentLegEvent: TmsShipmentLegs;
  addTripStop: TmsTrips;
  createCarrier: TmsCarriers;
  createDriver: TmsDrivers;
  createExpense: TmsExpenses;
  createGeofence: TmsGeofence;
  createGeofenceEvent: TmsGeofenceEvent;
  createGpsPing: TmsGpsPings;
  createPartnerInvoice: TmsPartnerInvoices;
  createProofOfDelivery: TmsProofOfDeliveries;
  createRoute: TmsRoutes;
  createShipmentLeg: TmsShipmentLegs;
  createTrip: TmsTrips;
  createVehicle: TmsVehicles;
  createVehicleMaintenance: TmsVehicleMaintenance;
  removeCarrier: Scalars['String']['output'];
  removeCarrierRate: Scalars['String']['output'];
  removeDriver: Scalars['String']['output'];
  removeDriverSchedule: Scalars['String']['output'];
  removeExpense: Scalars['String']['output'];
  removeGeofence: Scalars['String']['output'];
  removeGeofenceEvent: Scalars['String']['output'];
  removeGpsPing: Scalars['String']['output'];
  removePartnerInvoice: Scalars['String']['output'];
  removePartnerInvoiceItem: Scalars['String']['output'];
  removeProofOfDelivery: Scalars['String']['output'];
  removeRoute: Scalars['String']['output'];
  removeShipmentLeg: Scalars['String']['output'];
  removeShipmentLegEvent: Scalars['String']['output'];
  removeTrip: Scalars['String']['output'];
  removeTripStop: Scalars['String']['output'];
  removeVehicle: Scalars['String']['output'];
  removeVehicleMaintenance: Scalars['String']['output'];
  updateCarrierContactDetails: TmsCarriers;
  updateCarrierName: TmsCarriers;
  updateCarrierRate: TmsCarrierRates;
  updateCarrierServicesOffered: TmsCarriers;
  updateDriverLicenseExpiryDate: TmsDrivers;
  updateDriverLicenseNumber: TmsDrivers;
  updateDriverSchedule: TmsDriverSchedules;
  updateDriverStatus: TmsDrivers;
  updateExpense: TmsExpenses;
  updateGeofence: TmsGeofence;
  updatePartnerInvoice: TmsPartnerInvoices;
  updatePartnerInvoiceItem: TmsPartnerInvoiceItems;
  updateProofOfDelivery: TmsProofOfDeliveries;
  updateRoute: TmsRoutes;
  updateShipmentLeg: TmsShipmentLegs;
  updateShipmentLegEvent: TmsShipmentLegEvents;
  updateTrip: TmsTrips;
  updateTripStop: TmsTripStops;
  updateVehicle: TmsVehicles;
  updateVehicleMaintenance: TmsVehicleMaintenance;
};


export type TmsMutationsAddCarrierRateArgs = {
  carrierId: Scalars['UUID']['input'];
  payload: CreateCarrierRateInput;
};


export type TmsMutationsAddDriverScheduleArgs = {
  driverId: Scalars['UUID']['input'];
  payload: CreateDriverScheduleInput;
};


export type TmsMutationsAddPartnerInvoiceItemArgs = {
  partnerInvoiceId: Scalars['UUID']['input'];
  payload: CreatePartnerInvoiceItemInput;
};


export type TmsMutationsAddShipmentLegEventArgs = {
  payload: CreateShipmentLegEventInput;
  shipmentLegId: Scalars['UUID']['input'];
};


export type TmsMutationsAddTripStopArgs = {
  payload: CreateTripStopInput;
  tripId: Scalars['UUID']['input'];
};


export type TmsMutationsCreateCarrierArgs = {
  payload: CreateCarrierInput;
};


export type TmsMutationsCreateDriverArgs = {
  payload: CreateDriverInput;
};


export type TmsMutationsCreateExpenseArgs = {
  payload: CreateExpenseInput;
};


export type TmsMutationsCreateGeofenceArgs = {
  payload: CreateGeofenceInput;
};


export type TmsMutationsCreateGeofenceEventArgs = {
  payload: CreateGeofenceEventInput;
};


export type TmsMutationsCreateGpsPingArgs = {
  payload: CreateGpsPingInput;
};


export type TmsMutationsCreatePartnerInvoiceArgs = {
  payload: CreatePartnerInvoiceInput;
};


export type TmsMutationsCreateProofOfDeliveryArgs = {
  payload: CreateTmsProofOfDeliveryInput;
};


export type TmsMutationsCreateRouteArgs = {
  payload: CreateRouteInput;
};


export type TmsMutationsCreateShipmentLegArgs = {
  payload: CreateShipmentLegInput;
};


export type TmsMutationsCreateTripArgs = {
  payload: CreateTripInput;
};


export type TmsMutationsCreateVehicleArgs = {
  payload: CreateVehicleInput;
};


export type TmsMutationsCreateVehicleMaintenanceArgs = {
  payload: CreateVehicleMaintenanceInput;
};


export type TmsMutationsRemoveCarrierArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveCarrierRateArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveDriverArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveDriverScheduleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveExpenseArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveGeofenceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveGeofenceEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveGpsPingArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemovePartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemovePartnerInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveShipmentLegArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveShipmentLegEventArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveTripArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveTripStopArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveVehicleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsRemoveVehicleMaintenanceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsMutationsUpdateCarrierContactDetailsArgs = {
  contactDetails: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type TmsMutationsUpdateCarrierNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type TmsMutationsUpdateCarrierRateArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateCarrierRateInput;
};


export type TmsMutationsUpdateCarrierServicesOfferedArgs = {
  id: Scalars['UUID']['input'];
  servicesOffered: Scalars['String']['input'];
};


export type TmsMutationsUpdateDriverLicenseExpiryDateArgs = {
  id: Scalars['UUID']['input'];
  licenseExpiryDate: Scalars['NaiveDate']['input'];
};


export type TmsMutationsUpdateDriverLicenseNumberArgs = {
  id: Scalars['UUID']['input'];
  licenseNumber: Scalars['String']['input'];
};


export type TmsMutationsUpdateDriverScheduleArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateDriverScheduleInput;
};


export type TmsMutationsUpdateDriverStatusArgs = {
  id: Scalars['UUID']['input'];
  status: DriverStatusEnum;
};


export type TmsMutationsUpdateExpenseArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateExpenseInput;
};


export type TmsMutationsUpdateGeofenceArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateGeofenceInput;
};


export type TmsMutationsUpdatePartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
  payload: CreatePartnerInvoiceInput;
};


export type TmsMutationsUpdatePartnerInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
  payload: CreatePartnerInvoiceItemInput;
};


export type TmsMutationsUpdateProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateTmsProofOfDeliveryInput;
};


export type TmsMutationsUpdateRouteArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateRouteInput;
};


export type TmsMutationsUpdateShipmentLegArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateShipmentLegInput;
};


export type TmsMutationsUpdateShipmentLegEventArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateShipmentLegEventInput;
};


export type TmsMutationsUpdateTripArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateTripInput;
};


export type TmsMutationsUpdateTripStopArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateTripStopInput;
};


export type TmsMutationsUpdateVehicleArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateVehicleInput;
};


export type TmsMutationsUpdateVehicleMaintenanceArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateVehicleMaintenanceInput;
};

export type TmsPartnerInvoiceItems = {
  __typename?: 'TmsPartnerInvoiceItems';
  amount: Scalars['Decimal']['output'];
  id: Scalars['UUID']['output'];
};

export type TmsPartnerInvoices = {
  __typename?: 'TmsPartnerInvoices';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  invoiceDate: Scalars['NaiveDate']['output'];
  invoiceNumber: Scalars['String']['output'];
  status?: Maybe<PartnerInvoiceStatusEnum>;
  totalAmount: Scalars['Decimal']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsProofOfDeliveries = {
  __typename?: 'TmsProofOfDeliveries';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp: Scalars['DateTime']['output'];
  type?: Maybe<ProofTypeEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsQueries = {
  __typename?: 'TmsQueries';
  carrier?: Maybe<TmsCarriers>;
  carriers: Array<TmsCarriers>;
  driver?: Maybe<TmsDrivers>;
  drivers: Array<TmsDrivers>;
  expense?: Maybe<TmsExpenses>;
  expenses: Array<TmsExpenses>;
  geofence?: Maybe<TmsGeofence>;
  geofences: Array<TmsGeofence>;
  gpsPing?: Maybe<TmsGpsPings>;
  gpsPings: Array<TmsGpsPings>;
  partnerInvoice?: Maybe<TmsPartnerInvoices>;
  partnerInvoices: Array<TmsPartnerInvoices>;
  proofOfDeliveries: Array<TmsProofOfDeliveries>;
  proofOfDelivery?: Maybe<TmsProofOfDeliveries>;
  route?: Maybe<TmsRoutes>;
  routes: Array<TmsRoutes>;
  shipmentLeg?: Maybe<TmsShipmentLegs>;
  shipmentLegs: Array<TmsShipmentLegs>;
  trip?: Maybe<TmsTrips>;
  trips: Array<TmsTrips>;
  vehicle?: Maybe<TmsVehicles>;
  vehicles: Array<TmsVehicles>;
};


export type TmsQueriesCarrierArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesCarriersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesDriverArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesDriversArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesExpenseArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesExpensesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesGeofenceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesGeofencesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesGpsPingArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesGpsPingsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesPartnerInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesPartnerInvoicesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesProofOfDeliveriesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesProofOfDeliveryArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesRouteArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesRoutesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesShipmentLegArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesShipmentLegsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesTripArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesTripsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type TmsQueriesVehicleArgs = {
  id: Scalars['UUID']['input'];
};


export type TmsQueriesVehiclesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type TmsRoutes = {
  __typename?: 'TmsRoutes';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  totalDistance?: Maybe<Scalars['Float']['output']>;
  totalDuration?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsShipmentLegEvents = {
  __typename?: 'TmsShipmentLegEvents';
  eventTimestamp: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  statusMessage?: Maybe<Scalars['String']['output']>;
};

export type TmsShipmentLegs = {
  __typename?: 'TmsShipmentLegs';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endLocation?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  legSequence: Scalars['Int']['output'];
  shipmentId?: Maybe<Scalars['UUID']['output']>;
  startLocation?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShipmentLegStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsTripStops = {
  __typename?: 'TmsTripStops';
  actualArrivalTime?: Maybe<Scalars['DateTime']['output']>;
  actualDepartureTime?: Maybe<Scalars['DateTime']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['DateTime']['output']>;
  estimatedDepartureTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  sequence: Scalars['Int']['output'];
  shipmentId?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<TripStopStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsTrips = {
  __typename?: 'TmsTrips';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  status?: Maybe<TripStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsVehicleMaintenance = {
  __typename?: 'TmsVehicleMaintenance';
  cost?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  serviceDate: Scalars['NaiveDate']['output'];
  serviceType?: Maybe<VehicleServiceTypeEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TmsVehicles = {
  __typename?: 'TmsVehicles';
  capacityVolume?: Maybe<Scalars['Float']['output']>;
  capacityWeight?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  model?: Maybe<Scalars['String']['output']>;
  registrationNumber: Scalars['String']['output'];
  status?: Maybe<VehicleStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type WmsBinThresholds = {
  __typename?: 'WmsBinThresholds';
  alertThreshold?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  location: WmsLocations;
  maxQuantity: Scalars['Int']['output'];
  minQuantity: Scalars['Int']['output'];
  product: ImsProducts;
  reorderQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WmsInventoryStock = {
  __typename?: 'WmsInventoryStock';
  availableQuantity?: Maybe<Scalars['Int']['output']>;
  batch?: Maybe<ImsInventoryBatches>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  lastCountedAt?: Maybe<Scalars['DateTime']['output']>;
  lastMovementAt?: Maybe<Scalars['DateTime']['output']>;
  location: WmsLocations;
  product: ImsProducts;
  quantity: Scalars['Int']['output'];
  reservedQuantity: Scalars['Int']['output'];
  status?: Maybe<InventoryStockStatusEnum>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WmsLocations = {
  __typename?: 'WmsLocations';
  barcode?: Maybe<Scalars['String']['output']>;
  childrenLocations: Array<WmsLocations>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
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
  parentLocation?: Maybe<WmsLocations>;
  path?: Maybe<Scalars['String']['output']>;
  temperatureControlled?: Maybe<Scalars['Boolean']['output']>;
  type: LocationTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse: WmsWarehouses;
  xCoordinate?: Maybe<Scalars['Float']['output']>;
  yCoordinate?: Maybe<Scalars['Float']['output']>;
  zCoordinate?: Maybe<Scalars['Float']['output']>;
};

export type WmsMutations = {
  __typename?: 'WmsMutations';
  addPackageItem: WmsPackageItems;
  addPickBatchItem: WmsPickBatchItems;
  addTaskItem: WmsTaskItems;
  createBinThreshold: WmsBinThresholds;
  createInventoryStock: WmsInventoryStock;
  createLocation: WmsLocations;
  createPackage: WmsPackages;
  createPickBatch: WmsPickBatches;
  createPutawayRule: WmsPutawayRules;
  createTask: WmsTasks;
  createWarehouse: WmsWarehouses;
  removeBinThreshold: Scalars['String']['output'];
  removeInventoryStock: Scalars['String']['output'];
  removeLocation: Scalars['String']['output'];
  removePackage: Scalars['String']['output'];
  removePackageItem: Scalars['String']['output'];
  removePickBatch: Scalars['String']['output'];
  removePickBatchItem: Scalars['String']['output'];
  removePutawayRule: Scalars['String']['output'];
  removeTask: Scalars['String']['output'];
  removeTaskItem: Scalars['String']['output'];
  removeWarehouse: Scalars['String']['output'];
  updateBinThresholdMinQuantity: WmsBinThresholds;
  updateInventoryStockQuantity: WmsInventoryStock;
  updateLocationName: WmsLocations;
  updatePackageItemQuantity: WmsPackageItems;
  updatePackageTrackingNumber: WmsPackages;
  updatePickBatchItemPriority: WmsPickBatchItems;
  updatePickBatchStatus: WmsPickBatches;
  updatePutawayRulePriority: WmsPutawayRules;
  updateTaskItemStatus: WmsTaskItems;
  updateTaskStatus: WmsTasks;
  updateWarehouseName: WmsWarehouses;
};


export type WmsMutationsAddPackageItemArgs = {
  packageId: Scalars['UUID']['input'];
  payload: CreatePackageItemInput;
};


export type WmsMutationsAddPickBatchItemArgs = {
  payload: CreatePickBatchItemInput;
  pickBatchId: Scalars['UUID']['input'];
};


export type WmsMutationsAddTaskItemArgs = {
  payload: CreateTaskItemInput;
  taskId: Scalars['UUID']['input'];
};


export type WmsMutationsCreateBinThresholdArgs = {
  payload: CreateBinThresholdInput;
};


export type WmsMutationsCreateInventoryStockArgs = {
  payload: CreateInventoryStockInput;
};


export type WmsMutationsCreateLocationArgs = {
  payload: CreateLocationInput;
};


export type WmsMutationsCreatePackageArgs = {
  payload: CreatePackageInput;
};


export type WmsMutationsCreatePickBatchArgs = {
  payload: CreatePickBatchInput;
};


export type WmsMutationsCreatePutawayRuleArgs = {
  payload: CreatePutawayRuleInput;
};


export type WmsMutationsCreateTaskArgs = {
  payload: CreateTaskInput;
};


export type WmsMutationsCreateWarehouseArgs = {
  payload: CreateWarehouseInput;
};


export type WmsMutationsRemoveBinThresholdArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemoveInventoryStockArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemoveLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemovePackageArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemovePackageItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemovePickBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemovePickBatchItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemovePutawayRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemoveTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemoveTaskItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsRemoveWarehouseArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsMutationsUpdateBinThresholdMinQuantityArgs = {
  id: Scalars['UUID']['input'];
  minQuantity: Scalars['Int']['input'];
};


export type WmsMutationsUpdateInventoryStockQuantityArgs = {
  id: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};


export type WmsMutationsUpdateLocationNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type WmsMutationsUpdatePackageItemQuantityArgs = {
  id: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};


export type WmsMutationsUpdatePackageTrackingNumberArgs = {
  id: Scalars['UUID']['input'];
  trackingNumber: Scalars['String']['input'];
};


export type WmsMutationsUpdatePickBatchItemPriorityArgs = {
  id: Scalars['UUID']['input'];
  orderPriority: Scalars['Int']['input'];
};


export type WmsMutationsUpdatePickBatchStatusArgs = {
  id: Scalars['UUID']['input'];
  status: PickBatchStatusEnum;
};


export type WmsMutationsUpdatePutawayRulePriorityArgs = {
  id: Scalars['UUID']['input'];
  priority: Scalars['Int']['input'];
};


export type WmsMutationsUpdateTaskItemStatusArgs = {
  id: Scalars['UUID']['input'];
  status: TaskItemStatusEnum;
};


export type WmsMutationsUpdateTaskStatusArgs = {
  id: Scalars['UUID']['input'];
  status: TaskStatusEnum;
};


export type WmsMutationsUpdateWarehouseNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};

export type WmsPackageItems = {
  __typename?: 'WmsPackageItems';
  batch?: Maybe<ImsInventoryBatches>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  package: WmsPackages;
  product: ImsProducts;
  quantity: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Scalars['String']['output']>>;
  totalWeight?: Maybe<Scalars['Float']['output']>;
  unitWeight?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WmsPackages = {
  __typename?: 'WmsPackages';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['UUID']['output'];
  insuranceValue?: Maybe<Scalars['Decimal']['output']>;
  isFragile?: Maybe<Scalars['Boolean']['output']>;
  isHazmat?: Maybe<Scalars['Boolean']['output']>;
  items: Array<WmsPackageItems>;
  length?: Maybe<Scalars['Float']['output']>;
  packageNumber: Scalars['String']['output'];
  packageType?: Maybe<Scalars['String']['output']>;
  packedAt?: Maybe<Scalars['DateTime']['output']>;
  packedByUser?: Maybe<AuthUser>;
  requiresSignature?: Maybe<Scalars['Boolean']['output']>;
  salesOrder: ImsSalesOrders;
  serviceLevel?: Maybe<Scalars['String']['output']>;
  shippedAt?: Maybe<Scalars['DateTime']['output']>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  warehouse: WmsWarehouses;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type WmsPickBatchItems = {
  __typename?: 'WmsPickBatchItems';
  actualPickTime?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  estimatedPickTime?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  orderPriority?: Maybe<Scalars['Int']['output']>;
  pickBatch: WmsPickBatches;
  salesOrder: ImsSalesOrders;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WmsPickBatches = {
  __typename?: 'WmsPickBatches';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  assignedUser?: Maybe<AuthUser>;
  batchNumber: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  completedItems?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  items: Array<WmsPickBatchItems>;
  priority?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<PickBatchStatusEnum>;
  strategy: PickStrategyEnum;
  totalItems?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  warehouse: WmsWarehouses;
  waveId?: Maybe<Scalars['String']['output']>;
  zoneRestrictions?: Maybe<Array<Scalars['String']['output']>>;
};

export type WmsPutawayRules = {
  __typename?: 'WmsPutawayRules';
  client?: Maybe<CrmCompanies>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locationType?: Maybe<LocationTypeEnum>;
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  minQuantity?: Maybe<Scalars['Int']['output']>;
  preferredLocation?: Maybe<WmsLocations>;
  priority: Scalars['Int']['output'];
  product: ImsProducts;
  requiresHazmatApproval?: Maybe<Scalars['Boolean']['output']>;
  requiresTemperatureControl?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  volumeThreshold?: Maybe<Scalars['Float']['output']>;
  warehouse: WmsWarehouses;
  weightThreshold?: Maybe<Scalars['Float']['output']>;
};

export type WmsQueries = {
  __typename?: 'WmsQueries';
  binThreshold?: Maybe<WmsBinThresholds>;
  binThresholds: Array<WmsBinThresholds>;
  inboundShipment?: Maybe<ImsInboundShipments>;
  inboundShipments: Array<ImsInboundShipments>;
  inventoryAdjustment?: Maybe<ImsInventoryAdjustments>;
  inventoryAdjustments: Array<ImsInventoryAdjustments>;
  inventoryBatch?: Maybe<ImsInventoryBatches>;
  inventoryBatches: Array<ImsInventoryBatches>;
  inventoryStock: Array<WmsInventoryStock>;
  inventoryStockItem?: Maybe<WmsInventoryStock>;
  location?: Maybe<WmsLocations>;
  locations: Array<WmsLocations>;
  outboundShipment?: Maybe<ImsOutboundShipments>;
  outboundShipments: Array<ImsOutboundShipments>;
  package?: Maybe<WmsPackages>;
  packages: Array<WmsPackages>;
  pickBatch?: Maybe<WmsPickBatches>;
  pickBatches: Array<WmsPickBatches>;
  product?: Maybe<ImsProducts>;
  products: Array<ImsProducts>;
  putawayRule?: Maybe<WmsPutawayRules>;
  putawayRules: Array<WmsPutawayRules>;
  reorderPoint?: Maybe<Model>;
  reorderPoints: Array<Model>;
  returnItem?: Maybe<ImsReturns>;
  returns: Array<ImsReturns>;
  salesOrder?: Maybe<ImsSalesOrders>;
  salesOrders: Array<ImsSalesOrders>;
  stockTransfer?: Maybe<ImsStockTransfer>;
  stockTransfers: Array<ImsStockTransfer>;
  supplier?: Maybe<ImsSuppliers>;
  suppliers: Array<ImsSuppliers>;
  task?: Maybe<WmsTasks>;
  tasks: Array<WmsTasks>;
  warehouse?: Maybe<WmsWarehouses>;
  warehouses: Array<WmsWarehouses>;
};


export type WmsQueriesBinThresholdArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesBinThresholdsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesInboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesInboundShipmentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesInventoryAdjustmentArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesInventoryAdjustmentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesInventoryBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesInventoryBatchesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesInventoryStockArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesInventoryStockItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesLocationArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesLocationsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesOutboundShipmentArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesOutboundShipmentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesPackageArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPackagesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesPickBatchArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPickBatchesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesProductArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesProductsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesPutawayRuleArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesPutawayRulesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesReorderPointArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesReorderPointsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesReturnItemArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesReturnsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesSalesOrderArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesSalesOrdersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesStockTransferArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesStockTransfersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesSupplierArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesSuppliersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesTaskArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesTasksArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type WmsQueriesWarehouseArgs = {
  id: Scalars['UUID']['input'];
};


export type WmsQueriesWarehousesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type WmsTaskItems = {
  __typename?: 'WmsTaskItems';
  batch?: Maybe<ImsInventoryBatches>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  destinationLocation?: Maybe<WmsLocations>;
  expiryDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  product: ImsProducts;
  quantityCompleted: Scalars['Int']['output'];
  quantityRemaining?: Maybe<Scalars['Int']['output']>;
  quantityRequired: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Scalars['String']['output']>>;
  sourceLocation?: Maybe<WmsLocations>;
  status?: Maybe<TaskItemStatusEnum>;
  task: WmsTasks;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WmsTasks = {
  __typename?: 'WmsTasks';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  durationSeconds?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  items: Array<WmsTaskItems>;
  notes?: Maybe<Scalars['String']['output']>;
  pickBatch?: Maybe<WmsPickBatches>;
  priority?: Maybe<Scalars['Int']['output']>;
  sourceEntityId?: Maybe<Scalars['UUID']['output']>;
  sourceEntityType?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<TaskStatusEnum>;
  taskNumber: Scalars['String']['output'];
  type: TaskTypeEnum;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<AuthUser>;
  warehouse: WmsWarehouses;
};

export type WmsWarehouses = {
  __typename?: 'WmsWarehouses';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locations: Array<WmsLocations>;
  name: Scalars['String']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SignUpEmailMutationVariables = Exact<{
  payload: SignUpEmailInput;
}>;


export type SignUpEmailMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', signUpEmail: { __typename?: 'SignUpResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type SignInEmailMutationVariables = Exact<{
  payload: SignInEmailInput;
}>;


export type SignInEmailMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', signInEmail: { __typename?: 'SignInResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type RevokeSessionMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RevokeSessionMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', revokeSession: { __typename?: 'RevokeSessionResponse', message: string, success: boolean } } };

export type RefreshSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshSessionMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', refreshSession: { __typename?: 'RefreshSessionResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', changePassword: string } };

export type UploadAttachmentMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  recordId: Scalars['UUID']['input'];
  recordType: RecordType;
}>;


export type UploadAttachmentMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', uploadAttachment: { __typename?: 'CrmAttachments', id: any, fileName: string, filePath: string, mimeType?: string | null, recordId?: any | null, recordType?: RecordType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type RemoveAttachmentMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveAttachmentMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeAttachment: string } };

export type CreateCampaignMutationVariables = Exact<{
  payload: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCampaign: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateCampaignNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateCampaignNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCampaignName: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateCampaignBudgetMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  budget: Scalars['Decimal']['input'];
}>;


export type UpdateCampaignBudgetMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCampaignBudget: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateCampaignStartDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  startDate: Scalars['NaiveDate']['input'];
}>;


export type UpdateCampaignStartDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCampaignStartDate: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateCampaignEndDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  endDate: Scalars['NaiveDate']['input'];
}>;


export type UpdateCampaignEndDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCampaignEndDate: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type RemoveCampaignMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCampaignMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCampaign: string } };

export type CreateCaseMutationVariables = Exact<{
  payload: CreateCaseInput;
}>;


export type CreateCaseMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCase: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseNumberMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  caseNumber: Scalars['String']['input'];
}>;


export type UpdateCaseNumberMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseNumber: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseStatusMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  status?: InputMaybe<CaseStatus>;
}>;


export type UpdateCaseStatusMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseStatus: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCasePriorityMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
}>;


export type UpdateCasePriorityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCasePriority: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseTypeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  type?: InputMaybe<CaseType>;
}>;


export type UpdateCaseTypeMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseType: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseOwnerIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
}>;


export type UpdateCaseOwnerIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseOwnerId: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseContactIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  contactId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateCaseContactIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseContactId: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type UpdateCaseDescriptionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCaseDescriptionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCaseDescription: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } } };

export type RemoveCaseMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCaseMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCase: string } };

export type CreateCompanyMutationVariables = Exact<{
  payload: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCompany: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateCompanyNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyName: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCompany: string } };

export type UpdateCompanyStreetMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  street?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyStreetMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyStreet: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyCityMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  city?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyCityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyCity: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyStateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyStateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyState: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyPostalCodeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyPostalCodeMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyPostalCode: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyCountryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyCountryMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyCountry: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyPhoneNumberMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyPhoneNumberMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyPhoneNumber: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyIndustryMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyIndustryMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyIndustry: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyWebsiteMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCompanyWebsiteMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyWebsite: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyAnnualRevenueMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
}>;


export type UpdateCompanyAnnualRevenueMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyAnnualRevenue: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type UpdateCompanyOwnerIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateCompanyOwnerIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateCompanyOwnerId: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } } };

export type CreateContactMutationVariables = Exact<{
  payload: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createContact: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateContactNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactName: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactEmailMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  email: Scalars['String']['input'];
}>;


export type UpdateContactEmailMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactEmail: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactPhoneNumberMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateContactPhoneNumberMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactPhoneNumber: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactJobTitleMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateContactJobTitleMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactJobTitle: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactCompanyIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  companyId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateContactCompanyIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactCompanyId: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type UpdateContactOwnerIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
}>;


export type UpdateContactOwnerIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateContactOwnerId: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } } };

export type RemoveContactMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveContactMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeContact: string } };

export type CreateInteractionMutationVariables = Exact<{
  payload: CreateInteractionInput;
}>;


export type CreateInteractionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createInteraction: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionContactIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  contactId: Scalars['UUID']['input'];
}>;


export type UpdateInteractionContactIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionContactId: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionUserIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type UpdateInteractionUserIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionUserId: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionCaseIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  caseId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateInteractionCaseIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionCaseId: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionTypeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  type?: InputMaybe<InteractionType>;
}>;


export type UpdateInteractionTypeMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionType: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionOutcomeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  outcome?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateInteractionOutcomeMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionOutcome: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionNotesMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateInteractionNotesMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionNotes: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type UpdateInteractionInteractionDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateInteractionInteractionDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInteractionInteractionDate: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } } };

export type RemoveInteractionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveInteractionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeInteraction: string } };

export type CreateInvoiceMutationVariables = Exact<{
  payload: CreateCrmInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createInvoice: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceOpportunityIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateInvoiceOpportunityIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceOpportunityId: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceStatusMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  status?: InputMaybe<InvoiceStatus>;
}>;


export type UpdateInvoiceStatusMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceStatus: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceTotalMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  total?: InputMaybe<Scalars['Decimal']['input']>;
}>;


export type UpdateInvoiceTotalMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceTotal: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceIssueDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
}>;


export type UpdateInvoiceIssueDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceIssueDate: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceDueDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
}>;


export type UpdateInvoiceDueDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceDueDate: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoiceSentAtMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateInvoiceSentAtMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoiceSentAt: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoicePaidAtMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateInvoicePaidAtMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoicePaidAt: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type UpdateInvoicePaymentMethodMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  paymentMethod?: InputMaybe<PaymentMethod>;
}>;


export type UpdateInvoicePaymentMethodMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateInvoicePaymentMethod: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type AddInvoiceItemMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  payload: CreateCrmInvoiceItemInput;
}>;


export type AddInvoiceItemMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', addInvoiceItem: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type RemoveInvoiceItemMutationVariables = Exact<{
  itemId: Scalars['UUID']['input'];
}>;


export type RemoveInvoiceItemMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeInvoiceItem: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } } };

export type RemoveInvoiceMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveInvoiceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeInvoice: string } };

export type CreateLeadMutationVariables = Exact<{
  payload: CreateLeadInput;
}>;


export type CreateLeadMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createLead: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateLeadNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadName: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadEmailMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  email: Scalars['String']['input'];
}>;


export type UpdateLeadEmailMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadEmail: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadLeadSourceMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  leadSource?: InputMaybe<LeadSource>;
}>;


export type UpdateLeadLeadSourceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadLeadSource: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadStatusMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  status?: InputMaybe<LeadStatus>;
}>;


export type UpdateLeadStatusMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadStatus: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadLeadScoreMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateLeadLeadScoreMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadLeadScore: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadOwnerIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
}>;


export type UpdateLeadOwnerIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadOwnerId: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadCampaignIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateLeadCampaignIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadCampaignId: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadConvertedAtMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  convertedAt?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateLeadConvertedAtMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadConvertedAt: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadConvertedContactIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  convertedContactId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateLeadConvertedContactIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadConvertedContactId: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadConvertedCompanyIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  convertedCompanyId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateLeadConvertedCompanyIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadConvertedCompanyId: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type UpdateLeadConvertedOpportunityIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  convertedOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateLeadConvertedOpportunityIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateLeadConvertedOpportunityId: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } } };

export type RemoveLeadMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveLeadMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeLead: string } };

export type CreateNotificationMutationVariables = Exact<{
  payload: CreateNotificationInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createNotification: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } } };

export type UpdateNotificationUserIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type UpdateNotificationUserIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateNotificationUserId: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } } };

export type UpdateNotificationMessageMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
}>;


export type UpdateNotificationMessageMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateNotificationMessage: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } } };

export type UpdateNotificationIsReadMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateNotificationIsReadMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateNotificationIsRead: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } } };

export type UpdateNotificationLinkMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateNotificationLinkMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateNotificationLink: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } } };

export type RemoveNotificationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveNotificationMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeNotification: string } };

export type CreateOpportunityMutationVariables = Exact<{
  payload: CreateOpportunityInput;
}>;


export type CreateOpportunityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createOpportunity: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateOpportunityNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityName: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityStageMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  stage?: InputMaybe<OpportunityStage>;
}>;


export type UpdateOpportunityStageMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityStage: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityDealValueMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  dealValue?: InputMaybe<Scalars['Decimal']['input']>;
}>;


export type UpdateOpportunityDealValueMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityDealValue: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityProbabilityMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
}>;


export type UpdateOpportunityProbabilityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityProbability: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityExpectedCloseDateMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  expectedCloseDate?: InputMaybe<Scalars['NaiveDate']['input']>;
}>;


export type UpdateOpportunityExpectedCloseDateMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityExpectedCloseDate: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityLostReasonMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  lostReason?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateOpportunityLostReasonMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityLostReason: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunitySourceMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  source?: InputMaybe<OpportunitySource>;
}>;


export type UpdateOpportunitySourceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunitySource: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityOwnerIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
}>;


export type UpdateOpportunityOwnerIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityOwnerId: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityContactIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  contactId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateOpportunityContactIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityContactId: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityCompanyIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  companyId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateOpportunityCompanyIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityCompanyId: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type UpdateOpportunityCampaignIdMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateOpportunityCampaignIdMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateOpportunityCampaignId: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } } };

export type RemoveOpportunityMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveOpportunityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeOpportunity: string } };

export type CreateProductMutationVariables = Exact<{
  payload: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createProduct: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateProductNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateProductNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateProductName: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateProductSkuMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProductSkuMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateProductSku: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateProductPriceMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  price: Scalars['Decimal']['input'];
}>;


export type UpdateProductPriceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateProductPrice: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateProductTypeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  type?: InputMaybe<ProductType>;
}>;


export type UpdateProductTypeMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateProductType: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateProductDescriptionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateProductDescriptionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateProductDescription: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeProduct: string } };

export type CreateTagMutationVariables = Exact<{
  payload: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createTag: { __typename?: 'CrmTags', id: any, name: string, createdAt?: any | null, updatedAt?: any | null } } };

export type UpdateTagNameMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateTagNameMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', updateTagName: { __typename?: 'CrmTags', id: any, name: string, createdAt?: any | null, updatedAt?: any | null } } };

export type RemoveTagMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveTagMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeTag: string } };

export type GetAttachmentQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetAttachmentQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', attachment?: { __typename?: 'CrmAttachments', id: any, fileName: string, filePath: string, mimeType?: string | null, recordId?: any | null, recordType?: RecordType | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetAttachmentsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetAttachmentsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', attachments: Array<{ __typename?: 'CrmAttachments', id: any, fileName: string, filePath: string, mimeType?: string | null, recordId?: any | null, recordType?: RecordType | null, createdAt?: any | null, updatedAt?: any | null }> } };

export type GetCampaignQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetCampaignQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', campaign?: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetCampaignsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCampaignsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', campaigns: Array<{ __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, startDate?: any | null, endDate?: any | null, createdAt?: any | null, updatedAt?: any | null }> } };

export type GetCaseQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetCaseQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', case?: { __typename?: 'CrmCases', id: any, caseNumber: string, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } | null } };

export type GetCasesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCasesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', cases: Array<{ __typename?: 'CrmCases', id: any, caseNumber: string, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null }> } };

export type GetCompanyQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetCompanyQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', company?: { __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null } | null } };

export type GetCompaniesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCompaniesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', companies: Array<{ __typename?: 'CrmCompanies', id: any, name: string, industry?: string | null, annualRevenue?: any | null, phoneNumber?: string | null, website?: string | null, street?: string | null, city?: string | null, state?: string | null, postalCode?: string | null, country?: string | null, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'AuthUser', id: any, name: string } | null }> } };

export type GetContactQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetContactQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contact?: { __typename?: 'CrmContacts', id: any, name: string, email: string, phoneNumber?: string | null, jobTitle?: string | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } | null } };

export type GetContactsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetContactsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contacts: Array<{ __typename?: 'CrmContacts', id: any, name: string, email: string, phoneNumber?: string | null, jobTitle?: string | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null }> } };

export type GetInteractionQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetInteractionQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interaction?: { __typename?: 'CrmInteractions', id: any, type?: InteractionType | null, outcome?: string | null, notes?: string | null, interactionDate?: any | null, createdAt?: any | null, updatedAt?: any | null, contact: { __typename?: 'CrmContacts', id: any, name: string }, user: { __typename?: 'AuthUser', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } | null } };

export type GetInteractionsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetInteractionsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interactions: Array<{ __typename?: 'CrmInteractions', id: any, type?: InteractionType | null, outcome?: string | null, notes?: string | null, interactionDate?: any | null, createdAt?: any | null, updatedAt?: any | null, contact: { __typename?: 'CrmContacts', id: any, name: string }, user: { __typename?: 'AuthUser', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null }> } };

export type GetInvoiceQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetInvoiceQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoice?: { __typename?: 'CrmInvoices', id: any, status?: InvoiceStatus | null, total?: any | null, issueDate?: any | null, dueDate?: any | null, sentAt?: any | null, paidAt?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, quantity: number, price: any, product: { __typename?: 'CrmProducts', id: any, name: string } }> } | null } };

export type GetInvoicesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetInvoicesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoices: Array<{ __typename?: 'CrmInvoices', id: any, status?: InvoiceStatus | null, total?: any | null, issueDate?: any | null, dueDate?: any | null, sentAt?: any | null, paidAt?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null }> } };

export type GetLeadQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetLeadQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', lead?: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadSource?: LeadSource | null, status?: LeadStatus | null, leadScore?: number | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } | null } };

export type GetLeadsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetLeadsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', leads: Array<{ __typename?: 'CrmLeads', id: any, name: string, email: string, leadSource?: LeadSource | null, status?: LeadStatus | null, leadScore?: number | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string } }> } };

export type GetNotificationQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetNotificationQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', notification?: { __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } } | null } };

export type GetNotificationsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetNotificationsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', notifications: Array<{ __typename?: 'CrmNotifications', id: any, message: string, isRead?: boolean | null, link?: string | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string } }> } };

export type GetOpportunityQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetOpportunityQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string, stage?: OpportunityStage | null, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } | null } };

export type GetOpportunitiesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetOpportunitiesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunities: Array<{ __typename?: 'CrmOpportunities', id: any, name: string, stage?: OpportunityStage | null, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null }> } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', product?: { __typename?: 'CrmProducts', id: any, name: string, sku?: string | null, price: any, type?: ProductType | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetProductsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetProductsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', products: Array<{ __typename?: 'CrmProducts', id: any, name: string, sku?: string | null, price: any, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null }> } };

export type GetTagQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetTagQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', tag?: { __typename?: 'CrmTags', id: any, name: string, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetTagsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetTagsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', tags: Array<{ __typename?: 'CrmTags', id: any, name: string, createdAt?: any | null, updatedAt?: any | null }> } };
