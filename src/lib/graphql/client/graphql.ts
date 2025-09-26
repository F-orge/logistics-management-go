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

export type CreateCampaignInput = {
  budget?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
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

export type CreateInteractionInput = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  contactId: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId: Scalars['UUID']['input'];
};

export type CreateInvoiceInput = {
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  items: Array<CreateInvoiceItemInput>;
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  total?: InputMaybe<Scalars['Decimal']['input']>;
};

export type CreateInvoiceItemInput = {
  price: Scalars['Decimal']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
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

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
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
  payload: CreateInvoiceItemInput;
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
  payload: CreateInvoiceInput;
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

export enum InteractionType {
  Call = 'CALL',
  Email = 'EMAIL',
  Meeting = 'MEETING',
  Text = 'TEXT'
}

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Sent = 'SENT'
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

export type Mutations = {
  __typename?: 'Mutations';
  auth: AuthMutation;
  crm: CrmMutations;
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

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  Check = 'CHECK',
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
  WireTransfer = 'WIRE_TRANSFER'
}

export enum ProductType {
  Digital = 'DIGITAL',
  Good = 'GOOD',
  Service = 'SERVICE',
  Subscription = 'SUBSCRIPTION'
}

export type Query = {
  __typename?: 'Query';
  auth: AuthQuery;
  crm: CrmQueries;
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

export type RefreshSessionResponse = {
  __typename?: 'RefreshSessionResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type RevokeSessionResponse = {
  __typename?: 'RevokeSessionResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

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

export type CreateCampaignInput = {
  budget?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
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

export type CreateInteractionInput = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  contactId: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId: Scalars['UUID']['input'];
};

export type CreateInvoiceInput = {
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  items: Array<CreateInvoiceItemInput>;
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  total?: InputMaybe<Scalars['Decimal']['input']>;
};

export type CreateInvoiceItemInput = {
  price: Scalars['Decimal']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
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

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
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
  payload: CreateInvoiceItemInput;
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
  payload: CreateInvoiceInput;
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

export enum InteractionType {
  Call = 'CALL',
  Email = 'EMAIL',
  Meeting = 'MEETING',
  Text = 'TEXT'
}

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Sent = 'SENT'
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

export type Mutations = {
  __typename?: 'Mutations';
  auth: AuthMutation;
  crm: CrmMutations;
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

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  Check = 'CHECK',
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
  WireTransfer = 'WIRE_TRANSFER'
}

export enum ProductType {
  Digital = 'DIGITAL',
  Good = 'GOOD',
  Service = 'SERVICE',
  Subscription = 'SUBSCRIPTION'
}

export type Query = {
  __typename?: 'Query';
  auth: AuthQuery;
  crm: CrmQueries;
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

export type RefreshSessionResponse = {
  __typename?: 'RefreshSessionResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type RevokeSessionResponse = {
  __typename?: 'RevokeSessionResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

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
