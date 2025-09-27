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

export type RemoveAttachmentMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveAttachmentMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeAttachment: string } };

export type UploadAttachmentMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  recordId: Scalars['UUID']['input'];
  recordType: RecordType;
}>;


export type UploadAttachmentMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', uploadAttachment: { __typename?: 'CrmAttachments', id: any, fileName: string, filePath: string, mimeType?: string | null, recordId?: any | null, recordType?: RecordType | null, createdAt?: any | null, updatedAt?: any | null } } };

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

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCompany: string } };

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
  payload: CreateInvoiceInput;
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
  payload: CreateInvoiceItemInput;
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


export type GetCaseQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', case?: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } | null } };

export type GetCasesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCasesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', cases: Array<{ __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null }> } };

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


export type GetContactQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contact?: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } | null } };

export type GetContactsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetContactsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contacts: Array<{ __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null }> } };

export type GetInteractionQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetInteractionQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interaction?: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } | null } };

export type GetInteractionsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetInteractionsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interactions: Array<{ __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null }> } };

export type GetInvoiceQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetInvoiceQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoice?: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } | null } };

export type GetInvoicesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetInvoicesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoices: Array<{ __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> }> } };

export type GetLeadQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetLeadQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', lead?: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } | null } };

export type GetLeadsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetLeadsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', leads: Array<{ __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null }> } };

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


export type GetOpportunityQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } | null } };

export type GetOpportunitiesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetOpportunitiesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunities: Array<{ __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> }> } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', product?: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetProductsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetProductsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', products: Array<{ __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null }> } };

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
export const RemoveAttachmentDocument = new TypedDocumentString(`
    mutation RemoveAttachment($id: UUID!) {
  crm {
    removeAttachment(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveAttachmentMutation, RemoveAttachmentMutationVariables>;
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
export const RemoveCompanyDocument = new TypedDocumentString(`
    mutation RemoveCompany($id: UUID!) {
  crm {
    removeCompany(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveCompanyMutation, RemoveCompanyMutationVariables>;
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
    mutation CreateInvoice($payload: CreateInvoiceInput!) {
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
    mutation AddInvoiceItem($id: UUID!, $payload: CreateInvoiceItemInput!) {
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
    `) as unknown as TypedDocumentString<GetCaseQuery, GetCaseQueryVariables>;
export const GetCasesDocument = new TypedDocumentString(`
    query GetCases($limit: Int!, $page: Int!) {
  crm {
    cases(limit: $limit, page: $page) {
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
    `) as unknown as TypedDocumentString<GetContactQuery, GetContactQueryVariables>;
export const GetContactsDocument = new TypedDocumentString(`
    query GetContacts($limit: Int!, $page: Int!) {
  crm {
    contacts(limit: $limit, page: $page) {
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
    `) as unknown as TypedDocumentString<GetContactsQuery, GetContactsQueryVariables>;
export const GetInteractionDocument = new TypedDocumentString(`
    query GetInteraction($id: UUID!) {
  crm {
    interaction(id: $id) {
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
    `) as unknown as TypedDocumentString<GetInteractionQuery, GetInteractionQueryVariables>;
export const GetInteractionsDocument = new TypedDocumentString(`
    query GetInteractions($limit: Int!, $page: Int!) {
  crm {
    interactions(limit: $limit, page: $page) {
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
    `) as unknown as TypedDocumentString<GetInteractionsQuery, GetInteractionsQueryVariables>;
export const GetInvoiceDocument = new TypedDocumentString(`
    query GetInvoice($id: UUID!) {
  crm {
    invoice(id: $id) {
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
    `) as unknown as TypedDocumentString<GetInvoiceQuery, GetInvoiceQueryVariables>;
export const GetInvoicesDocument = new TypedDocumentString(`
    query GetInvoices($limit: Int!, $page: Int!) {
  crm {
    invoices(limit: $limit, page: $page) {
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
    `) as unknown as TypedDocumentString<GetInvoicesQuery, GetInvoicesQueryVariables>;
export const GetLeadDocument = new TypedDocumentString(`
    query GetLead($id: UUID!) {
  crm {
    lead(id: $id) {
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
    `) as unknown as TypedDocumentString<GetLeadQuery, GetLeadQueryVariables>;
export const GetLeadsDocument = new TypedDocumentString(`
    query GetLeads($limit: Int!, $page: Int!) {
  crm {
    leads(limit: $limit, page: $page) {
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
    `) as unknown as TypedDocumentString<GetOpportunityQuery, GetOpportunityQueryVariables>;
export const GetOpportunitiesDocument = new TypedDocumentString(`
    query GetOpportunities($limit: Int!, $page: Int!) {
  crm {
    opportunities(limit: $limit, page: $page) {
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
    `) as unknown as TypedDocumentString<GetOpportunitiesQuery, GetOpportunitiesQueryVariables>;
export const GetProductDocument = new TypedDocumentString(`
    query GetProduct($id: UUID!) {
  crm {
    product(id: $id) {
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
    `) as unknown as TypedDocumentString<GetProductQuery, GetProductQueryVariables>;
export const GetProductsDocument = new TypedDocumentString(`
    query GetProducts($limit: Int!, $page: Int!) {
  crm {
    products(limit: $limit, page: $page) {
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

export type RemoveAttachmentMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveAttachmentMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeAttachment: string } };

export type UploadAttachmentMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  recordId: Scalars['UUID']['input'];
  recordType: RecordType;
}>;


export type UploadAttachmentMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', uploadAttachment: { __typename?: 'CrmAttachments', id: any, fileName: string, filePath: string, mimeType?: string | null, recordId?: any | null, recordType?: RecordType | null, createdAt?: any | null, updatedAt?: any | null } } };

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

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCompany: string } };

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
  payload: CreateInvoiceInput;
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
  payload: CreateInvoiceItemInput;
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


export type GetCaseQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', case?: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null } | null } };

export type GetCasesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCasesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', cases: Array<{ __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, status?: CaseStatus | null, priority?: CasePriority | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null }> } };

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


export type GetContactQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contact?: { __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null } | null } };

export type GetContactsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetContactsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contacts: Array<{ __typename?: 'CrmContacts', id: any, name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, ownerId: any, companyId?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null }> } };

export type GetInteractionQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetInteractionQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interaction?: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null } | null } };

export type GetInteractionsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetInteractionsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interactions: Array<{ __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', id: any, name: string }, contact: { __typename?: 'CrmContacts', id: any, name: string }, case?: { __typename?: 'CrmCases', id: any, caseNumber: string } | null }> } };

export type GetInvoiceQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetInvoiceQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoice?: { __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> } | null } };

export type GetInvoicesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetInvoicesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoices: Array<{ __typename?: 'CrmInvoices', id: any, dueDate?: any | null, issueDate?: any | null, paidAt?: any | null, sentAt?: any | null, status?: InvoiceStatus | null, total?: any | null, paymentMethod?: PaymentMethod | null, createdAt?: any | null, updatedAt?: any | null, opportunityId?: any | null, opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null, items: Array<{ __typename?: 'CrmInvoiceItems', id: any, price: any, quantity: number, product: { __typename?: 'CrmProducts', id: any, name: string } }> }> } };

export type GetLeadQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetLeadQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', lead?: { __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null } | null } };

export type GetLeadsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetLeadsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', leads: Array<{ __typename?: 'CrmLeads', id: any, name: string, email: string, leadScore?: number | null, leadSource?: LeadSource | null, status?: LeadStatus | null, convertedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, convertedContact?: { __typename?: 'CrmContacts', id: any, name: string } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', id: any, name: string } | null }> } };

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


export type GetOpportunityQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunity?: { __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> } | null } };

export type GetOpportunitiesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetOpportunitiesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunities: Array<{ __typename?: 'CrmOpportunities', id: any, name: string, dealValue?: any | null, probability?: number | null, expectedCloseDate?: any | null, lostReason?: string | null, stage?: OpportunityStage | null, source?: OpportunitySource | null, createdAt?: any | null, updatedAt?: any | null, owner: { __typename?: 'AuthUser', id: any, name: string }, campaign?: { __typename?: 'CrmCampaigns', id: any, name: string } | null, company?: { __typename?: 'CrmCompanies', id: any, name: string } | null, contact?: { __typename?: 'CrmContacts', id: any, name: string } | null, products: Array<{ __typename?: 'CrmProducts', id: any, name: string }> }> } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', product?: { __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetProductsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetProductsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', products: Array<{ __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null }> } };

export type GetTagQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetTagQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', tag?: { __typename?: 'CrmTags', id: any, name: string, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetTagsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetTagsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', tags: Array<{ __typename?: 'CrmTags', id: any, name: string, createdAt?: any | null, updatedAt?: any | null }> } };
